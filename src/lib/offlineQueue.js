// lib/offlineQueue.js
// New feature: real offline resilience for test results.
//
// Previously (see testResults.js), a leaderboard submission that failed
// because the device was offline was just silently dropped — the local
// "testHistory" copy survived, but the server-side leaderboard/streak
// never found out a test was completed. This queues any failed submission
// in localStorage and retries it automatically once the browser is back
// online (or on the next periodic flush), so nothing is lost.
import { apiRequest } from './api'

const QUEUE_KEY = 'ecsprep_offline_queue'
const MAX_QUEUE = 100
const listeners = new Set()

function load() {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]')
  } catch {
    return []
  }
}

function save(queue) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-MAX_QUEUE)))
  } catch {
    // ignore quota errors — worst case, a very old queued item gets dropped
  }
  listeners.forEach((fn) => fn(queue.length))
}

// Any component (e.g. the offline status banner) can subscribe to the
// pending-count so it updates live as items are queued/flushed, without
// polling localStorage itself.
export function subscribeQueueCount(fn) {
  listeners.add(fn)
  fn(load().length)
  return () => listeners.delete(fn)
}

export function getQueueCount() {
  return load().length
}

// path/body mirror apiRequest's own signature so flushQueue can just
// replay the exact same call later.
export function enqueueRequest(path, options) {
  const queue = load()
  queue.push({ path, options, queuedAt: new Date().toISOString() })
  save(queue)
}

let flushing = false
export async function flushQueue() {
  if (flushing) return
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return
  flushing = true
  try {
    const queue = load()
    if (queue.length === 0) return
    // Replay in order; stop at the first failure (still offline, or a
    // transient server error) and leave it — and everything after it —
    // queued for the next flush rather than attempting them out of order.
    let stoppedAt = queue.length
    for (let i = 0; i < queue.length; i++) {
      try {
        await apiRequest(queue[i].path, queue[i].options)
      } catch {
        stoppedAt = i
        break
      }
    }
    save(queue.slice(stoppedAt))
  } finally {
    flushing = false
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => { flushQueue() })
  // Periodic safety-net flush in case the 'online' event is missed (some
  // mobile browsers are unreliable about firing it after a signal drop).
  setInterval(() => { flushQueue() }, 30_000)
  // Try once on load too, in case items were queued in a previous session.
  window.addEventListener('load', () => { flushQueue() })
}

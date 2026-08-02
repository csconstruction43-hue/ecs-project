// lib/forumStore.js
// Basic client-side Community/Forum store, persisted to localStorage.
// There's no backend forum API yet, so this mirrors the pattern already
// used elsewhere in the app (e.g. Study Guide progress) — good enough for
// a "basic version" while keeping the door open for a real backend later
// (the shape here maps 1:1 onto simple threads/replies tables).
const STORAGE_KEY = 'ecsprep_forum_threads_v1'

export const FORUM_CATEGORIES = ['General', 'H&S Test', 'Installation Electrician', 'Approved Electrician', 'FESS', 'Network & Telecoms', 'Study Tips', 'Exam Day']

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeAll(threads) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(threads)) } catch { /* storage unavailable */ }
}

export function getThreads() {
  return readAll().sort((a, b) => b.createdAt - a.createdAt)
}

export function getThread(id) {
  return readAll().find((t) => t.id === id) || null
}

export function createThread({ title, body, category, author }) {
  const threads = readAll()
  const thread = {
    id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: title.trim(),
    body: body.trim(),
    category: category || 'General',
    author: author || 'Guest',
    createdAt: Date.now(),
    upvotes: 0,
    replies: [],
  }
  threads.push(thread)
  writeAll(threads)
  return thread
}

export function addReply(threadId, { body, author }) {
  const threads = readAll()
  const thread = threads.find((t) => t.id === threadId)
  if (!thread) return null
  const reply = {
    id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    body: body.trim(),
    author: author || 'Guest',
    createdAt: Date.now(),
  }
  thread.replies.push(reply)
  writeAll(threads)
  return reply
}

export function upvoteThread(threadId) {
  const threads = readAll()
  const thread = threads.find((t) => t.id === threadId)
  if (!thread) return
  thread.upvotes = (thread.upvotes || 0) + 1
  writeAll(threads)
}

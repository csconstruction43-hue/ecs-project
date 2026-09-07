// components/OfflineStatusBanner.jsx
// New feature: offline mode indicator. Mock tests and flashcards already
// keep working with no signal (their question data is bundled into the
// app, not fetched live), but until now a candidate had no way to know
// that, or that their results were safely queued rather than lost. This
// shows a small, unobtrusive banner when offline, and a brief "synced"
// confirmation once queued results flush back to the server.
import React, { useEffect, useState } from 'react'
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react'
import { subscribeQueueCount } from '../lib/offlineQueue'

export default function OfflineStatusBanner() {
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine)
  const [pending, setPending] = useState(0)
  const [justSynced, setJustSynced] = useState(false)

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  useEffect(() => {
    let prev = 0
    const unsubscribe = subscribeQueueCount((count) => {
      if (prev > 0 && count === 0) {
        setJustSynced(true)
        setTimeout(() => setJustSynced(false), 4000)
      }
      prev = count
      setPending(count)
    })
    return unsubscribe
  }, [])

  if (online && pending === 0 && !justSynced) return null

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-sm font-medium
        ${!online ? 'bg-slate-900 text-white' : justSynced ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'}`}
      role="status"
    >
      {!online ? (
        <>
          <WifiOff size={16} />
          You're offline — tests and flashcards still work, results will sync automatically
        </>
      ) : justSynced ? (
        <>
          <CheckCircle2 size={16} />
          Back online — your results have synced
        </>
      ) : (
        <>
          <RefreshCw size={16} className="animate-spin" />
          Syncing {pending} saved {pending === 1 ? 'result' : 'results'}…
        </>
      )}
    </div>
  )
}

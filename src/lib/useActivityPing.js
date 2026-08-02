// lib/useActivityPing.js
// While a user is signed in and has this tab open, quietly tell the backend
// "I'm still here, on this page" every PING_INTERVAL_MS. The admin panel
// uses this (see /api/admin/users and /api/admin/activity) to show who's
// online right now and what they're doing — no extra infra (no sockets)
// needed for a small app; just swap this for a WebSocket/SSE later if you
// need truer real-time updates at scale.
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { apiRequest, getToken } from './api'

const PING_INTERVAL_MS = 20_000

export function useActivityPing() {
  const location = useLocation()
  const pageRef = useRef(location.pathname)
  pageRef.current = location.pathname

  useEffect(() => {
    if (!getToken()) return undefined // only ping for signed-in users

    let cancelled = false
    const ping = () => {
      if (!getToken() || cancelled) return
      apiRequest('/api/activity/ping', { method: 'POST', body: { page: pageRef.current } }).catch(() => {
        // Silent — a missed ping just means the admin dashboard shows the
        // user as "offline" a bit sooner. Never surface this to the user.
      })
    }

    ping() // fire once immediately on mount / route change into a protected page
    const id = setInterval(ping, PING_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
    // Re-arm on every path change so the "current page" ping is fresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
}

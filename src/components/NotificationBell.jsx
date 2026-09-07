// components/NotificationBell.jsx
// Bell icon shown in the site header for logged-in users. Polls the unread
// count, and opens a dropdown of recent in-app notifications sent from
// Admin > Notifications (server: /api/notifications*). Renders nothing
// when nobody is logged in.
import React, { useEffect, useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../lib/api'

const TYPE_DOT = { info: 'bg-blue-500', success: 'bg-green-500', warning: 'bg-amber-500' }

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const NotificationBell = () => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState([])
  const [loaded, setLoaded] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    const pollUnread = async () => {
      try {
        const { count } = await apiRequest('/api/notifications/unread-count')
        if (!cancelled) setUnreadCount(count)
      } catch {
        // Silent — the bell just won't show a badge if this fails.
      }
    }
    pollUnread()
    const interval = setInterval(pollUnread, 60000)
    return () => { cancelled = true; clearInterval(interval) }
  }, [user])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const toggleOpen = async () => {
    const next = !open
    setOpen(next)
    if (next && !loaded) {
      try {
        const { notifications } = await apiRequest('/api/notifications')
        setNotifications(notifications)
        setLoaded(true)
      } catch {
        // Leave the dropdown showing an empty state on failure.
      }
    }
  }

  const markRead = async (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
    setUnreadCount((c) => Math.max(0, c - 1))
    try {
      await apiRequest(`/api/notifications/${id}/read`, { method: 'POST' })
    } catch {
      // Best-effort — the count will self-correct on the next poll.
    }
  }

  if (!user) return null

  return (
    <div className="relative" ref={boxRef}>
      <button
        onClick={toggleOpen}
        className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={19} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white rounded-xl shadow-lg border border-gray-100 z-30 max-h-96 overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">Notifications</p>
          </div>
          {notifications.length === 0 ? (
            <p className="px-4 py-6 text-sm text-gray-400 text-center">Nothing here yet.</p>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => !n.isRead && markRead(n.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 ${!n.isRead ? 'bg-blue-50/50' : ''}`}
              >
                <div className="flex items-start gap-2">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${TYPE_DOT[n.type] || 'bg-blue-500'}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationBell

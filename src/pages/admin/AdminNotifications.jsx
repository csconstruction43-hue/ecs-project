// pages/admin/AdminNotifications.jsx
// Send in-app notifications to everyone or to a single user (shown via the
// bell icon in the site header — see components/NotificationBell.jsx), and
// see who has actually read each one. Different from Broadcast Email: these
// show up inside the app itself rather than landing in someone's inbox.
import React, { useEffect, useState } from 'react'
import { Bell, Loader2, Send, Trash2, CheckCheck, Users, User as UserIcon } from 'lucide-react'
import { apiRequest } from '../../lib/api'

const TYPES = [
  { value: 'info', label: 'Info', dot: 'bg-blue-500' },
  { value: 'success', label: 'Success', dot: 'bg-green-500' },
  { value: 'warning', label: 'Warning', dot: 'bg-amber-500' },
]

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('info')
  const [audience, setAudience] = useState('all')
  const [userQuery, setUserQuery] = useState('')
  const [userResults, setUserResults] = useState([])
  const [pickedUser, setPickedUser] = useState(null)
  const [sending, setSending] = useState(false)
  const [searching, setSearching] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { notifications } = await apiRequest('/api/admin/notifications')
      setNotifications(notifications)
    } catch (err) {
      setError(err.message || 'Could not load notifications.')
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  // Debounced user search, same idea as the admin sidebar quick-search.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: resets results/loading as the query changes
    if (audience !== 'user' || userQuery.trim().length < 2) { setUserResults([]); return }
    setSearching(true)
    const id = setTimeout(async () => {
      try {
        const { users } = await apiRequest(`/api/admin/users/search?q=${encodeURIComponent(userQuery.trim())}`)
        setUserResults(users)
      } catch {
        setUserResults([])
      } finally {
        setSearching(false)
      }
    }, 300)
    return () => clearTimeout(id)
  }, [userQuery, audience])

  const canSend = title.trim() && message.trim() && (audience === 'all' || pickedUser)

  const send = async () => {
    setSending(true)
    setError('')
    try {
      await apiRequest('/api/admin/notifications', {
        method: 'POST',
        body: { title: title.trim(), message: message.trim(), type, audience, userId: pickedUser?.id },
      })
      setTitle(''); setMessage(''); setType('info'); setAudience('all'); setPickedUser(null); setUserQuery('')
      await load()
    } catch (err) {
      setError(err.message || 'Could not send the notification.')
    } finally {
      setSending(false)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this notification? Users who haven\'t seen it yet won\'t see it anymore.')) return
    try {
      await apiRequest(`/api/admin/notifications/${id}`, { method: 'DELETE' })
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      setError(err.message || 'Could not delete the notification.')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <Bell className="text-blue-600" size={24} />
        Notifications
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Send an in-app notification — it shows up under the bell icon in the site header, for everyone or for one specific user.
      </p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>}

      {/* Compose */}
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-1">Send to</label>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => { setAudience('all'); setPickedUser(null) }}
            className={`flex-1 flex items-center justify-center gap-2 border rounded-lg px-3 py-2 text-sm ${audience === 'all' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'}`}
          >
            <Users size={15} /> All users
          </button>
          <button
            type="button"
            onClick={() => setAudience('user')}
            className={`flex-1 flex items-center justify-center gap-2 border rounded-lg px-3 py-2 text-sm ${audience === 'user' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'}`}
          >
            <UserIcon size={15} /> One user
          </button>
        </div>

        {audience === 'user' && (
          <div className="mb-4 relative">
            {pickedUser ? (
              <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50">
                <span><strong>{pickedUser.name || 'Unnamed'}</strong> — {pickedUser.email}</span>
                <button onClick={() => setPickedUser(null)} className="text-gray-400 hover:text-gray-600 text-xs">Change</button>
              </div>
            ) : (
              <>
                <input
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
                {searching && <Loader2 size={14} className="animate-spin absolute right-3 top-2.5 text-gray-400" />}
                {userResults.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 max-h-56 overflow-y-auto">
                    {userResults.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => { setPickedUser(u); setUserResults([]) }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-800">{u.name || 'Unnamed'}</span>
                        <span className="text-gray-400"> — {u.email}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <div className="flex gap-2 mb-4">
          {TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs font-medium ${type === t.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'}`}
            >
              <span className={`w-2 h-2 rounded-full ${t.dot}`} /> {t.label}
            </button>
          ))}
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          placeholder="e.g. Your invoice is ready"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          maxLength={500}
          placeholder="Keep it short — this appears in a dropdown, not an email."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-1"
        />
        <p className="text-xs text-gray-400 mb-4">{message.length}/500 characters</p>

        <button
          onClick={send}
          disabled={!canSend || sending}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          Send notification
        </button>
      </div>

      {/* Sent history */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Sent notifications</h2>
      {loading ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>
      ) : notifications.length === 0 ? (
        <p className="text-sm text-gray-400">No notifications sent yet.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
          {notifications.map((n) => (
            <div key={n.id} className="p-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`w-2 h-2 rounded-full ${TYPES.find((t) => t.value === n.type)?.dot || 'bg-blue-500'}`} />
                  <p className="font-medium text-gray-900 text-sm truncate">{n.title}</p>
                </div>
                <p className="text-sm text-gray-500 mb-1 break-words">{n.message}</p>
                <p className="text-xs text-gray-400">
                  {n.audience === 'all' ? 'All users' : `One user`} · sent {new Date(n.createdAt).toLocaleString('en-GB')} by {n.createdBy}
                  {' · '}
                  <span className="inline-flex items-center gap-1"><CheckCheck size={12} /> {n.readCount} read</span>
                </p>
              </div>
              <button onClick={() => remove(n.id)} className="text-gray-400 hover:text-red-600 shrink-0" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminNotifications

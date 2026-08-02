// pages/admin/AdminDashboard.jsx
// Live overview for admins: how many users total, who's online right now,
// and a rolling feed of what everyone's doing across the app. Polls the
// backend every few seconds so it stays fresh without needing websockets.
import React, { useState, useEffect, useCallback } from 'react'
import { Users, Wifi, Activity, Loader2, RefreshCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../../lib/api'

const REFRESH_MS = 8_000

function timeAgo(iso) {
  if (!iso) return 'never'
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 5) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

const ACTIVITY_LABELS = {
  login: 'logged in',
  signup: 'signed up',
  ping: 'is browsing',
  test_submit: 'submitted a test',
}

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const [usersRes, activityRes] = await Promise.all([
        apiRequest('/api/admin/users'),
        apiRequest('/api/admin/activity?limit=30'),
      ])
      setUsers(usersRes.users)
      setEvents(activityRes.events)
      setError('')
    } catch (err) {
      setError(err.message || 'Could not load dashboard data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => clearInterval(id)
  }, [load])

  const onlineCount = users.filter((u) => u.online).length
  const proCount = users.filter((u) => u.isPro).length

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-500 py-12">
        <Loader2 className="animate-spin" size={20} /> Loading dashboard...
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={load}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <RefreshCcw size={18} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Users className="text-blue-600" size={22} />
          </div>
          <div>
            <div className="text-2xl font-bold">{users.length}</div>
            <div className="text-sm text-gray-500">Total users</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Wifi className="text-green-600" size={22} />
          </div>
          <div>
            <div className="text-2xl font-bold">{onlineCount}</div>
            <div className="text-sm text-gray-500">Online right now</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <Activity className="text-slate-600" size={22} />
          </div>
          <div>
            <div className="text-2xl font-bold">{proCount}</div>
            <div className="text-sm text-gray-500">Pro users</div>
          </div>
        </div>
      </div>

      {/* Live activity feed */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Live activity</h2>
        {events.length === 0 && (
          <p className="text-gray-400 text-sm">No activity yet — it'll show up here as users sign in and use the app.</p>
        )}
        <ul className="divide-y divide-gray-100">
          {events.map((e) => (
            <li key={e.id} className="py-3 flex items-center justify-between text-sm">
              <div>
                <Link to={`/admin/users/${e.userId}`} className="font-medium text-blue-600 hover:underline">
                  {e.userName}
                </Link>
                <span className="text-gray-600">
                  {' '}
                  {ACTIVITY_LABELS[e.type] || e.type}
                  {e.page ? ` (${e.page})` : ''}
                  {e.type === 'test_submit' && e.meta ? ` — ${e.meta.percentage}%` : ''}
                </span>
              </div>
              <span className="text-gray-400">{timeAgo(e.at)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminDashboard

// pages/admin/AdminUsers.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Loader2, RefreshCcw, Download, Eye } from 'lucide-react'
import { apiRequest, apiRequestBlob } from '../../lib/api'

const AUTO_REFRESH_MS = 10_000

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

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadUsers = () => {
    setError('')
    apiRequest('/api/admin/users')
      .then((data) => setUsers(data.users))
      .catch((err) => setError(err.message || 'Could not load users.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
    setLoading(true)
    loadUsers()
    // Keep the table live — online status / last-active update every few seconds.
    const id = setInterval(loadUsers, AUTO_REFRESH_MS)
    return () => clearInterval(id)
  }, [])

  const [downloadingId, setDownloadingId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  const changePlan = async (user, plan) => {
    setUpdatingId(user.id)
    setError('')
    try {
      const data = await apiRequest(`/api/admin/users/${user.id}/plan`, { method: 'PATCH', body: { plan } })
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...data.user } : u)))
    } catch (err) {
      setError(err.message || 'Could not update this user\'s plan.')
    } finally {
      setUpdatingId(null)
    }
  }

  // The export endpoint requires the admin's auth header, so we can't just
  // link straight to it (a plain <a href> can't attach headers). Instead we
  // fetch it as a blob and trigger the browser's save dialog ourselves.
  const downloadUser = async (user) => {
    setDownloadingId(user.id)
    try {
      const blob = await apiRequestBlob(`/api/admin/users/${user.id}/export`)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `user-${user.id}-export.json`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err.message || 'Could not download this user\'s data.')
    } finally {
      setDownloadingId(null)
    }
  }

  const filtered = users.filter((u) => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return true
    return u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <button
          onClick={loadUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <RefreshCcw size={18} />
          Refresh
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 text-gray-500 py-12">
          <Loader2 className="animate-spin" size={20} /> Loading real users from the server...
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signed up via</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                    No users yet — they'll show up here as soon as someone signs up.
                  </td>
                </tr>
              )}
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{user.provider || 'password'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <select
                        value={user.isPro ? (user.plan || 'lifetime') : 'free'}
                        disabled={updatingId === user.id}
                        onChange={(e) => changePlan(user, e.target.value)}
                        className={`text-xs rounded-full px-2 py-1 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 ${
                          user.isPro ? 'bg-slate-100 text-slate-800' : 'bg-gray-100 text-gray-600'
                        }`}
                        title="Change this user's plan — takes effect immediately, no payment needed"
                      >
                        <option value="free">Free</option>
                        <option value="weekly">Pro — Weekly</option>
                        <option value="monthly">Pro — Monthly</option>
                        <option value="lifetime">Pro — Lifetime</option>
                      </select>
                      {updatingId === user.id && <Loader2 size={14} className="animate-spin text-gray-400" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full ${
                      user.online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-400'}`} />
                      {user.online ? 'Online now' : `Last seen ${timeAgo(user.lastActive)}`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/users/${user.id}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                        title="View activity"
                      >
                        <Eye size={16} /> View
                      </Link>
                      <button
                        onClick={() => downloadUser(user)}
                        disabled={downloadingId === user.id}
                        className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm disabled:opacity-50"
                        title="Download this user's data"
                      >
                        {downloadingId === user.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminUsers

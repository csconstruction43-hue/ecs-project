// pages/admin/AdminUserDetail.jsx
// Deep-dive view for one user: profile, live online status, and their full
// activity history (logins, page views, test submissions) — plus a button
// to download all of it as a JSON file.
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Loader2, RefreshCcw } from 'lucide-react'
import { apiRequest, apiRequestBlob } from '../../lib/api'

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
  login: 'Logged in',
  signup: 'Signed up',
  ping: 'Viewed page',
  test_submit: 'Submitted a test',
  plan_changed: 'Plan changed by admin',
}

const AdminUserDetail = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [updatingPlan, setUpdatingPlan] = useState(false)

  const changePlan = async (plan) => {
    setUpdatingPlan(true)
    setError('')
    try {
      const data = await apiRequest(`/api/admin/users/${id}/plan`, { method: 'PATCH', body: { plan } })
      setUser((prev) => ({ ...prev, ...data.user }))
    } catch (err) {
      setError(err.message || 'Could not update this user\'s plan.')
    } finally {
      setUpdatingPlan(false)
    }
  }

  const load = useCallback(() => {
    apiRequest(`/api/admin/users/${id}`)
      .then((data) => {
        setUser(data.user)
        setActivity(data.activity)
        setError('')
      })
      .catch((err) => setError(err.message || 'Could not load this user.'))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
    setLoading(true)
    load()
    const timer = setInterval(load, REFRESH_MS)
    return () => clearInterval(timer)
  }, [load])

  const download = async () => {
    setDownloading(true)
    try {
      const blob = await apiRequestBlob(`/api/admin/users/${id}/export`)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `user-${id}-export.json`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err.message || "Could not download this user's data.")
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-500 py-12">
        <Loader2 className="animate-spin" size={20} /> Loading user...
      </div>
    )
  }

  if (error && !user) {
    return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
  }

  return (
    <div>
      <Link to="/admin/users" className="inline-flex items-center gap-1 text-blue-600 hover:underline mb-4 text-sm">
        <ArrowLeft size={16} /> Back to Users
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full ${
              user.online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-400'}`} />
              {user.online ? 'Online now' : `Last seen ${timeAgo(user.lastActive)}`}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 capitalize">{user.role}</span>
            <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800">
              {user.isPro ? (user.plan || 'Pro') : 'Free'}
            </span>
          </div>
          {user.currentPage && (
            <p className="text-sm text-gray-500 mt-2">Currently on: <code className="bg-gray-100 px-1 rounded">{user.currentPage}</code></p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Best score: {user.bestScore ?? '—'}% · Tests completed: {user.testsCompleted ?? 0}
          </p>
        </div>
        <button
          onClick={download}
          disabled={downloading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50 whitespace-nowrap"
        >
          {downloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          Download data
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Plan control</h2>
        <p className="text-sm text-gray-500 mb-4">
          Manually activate or deactivate Pro for this user — takes effect immediately, no Stripe payment involved.
          {user.planSource === 'admin' && ' (Currently set by an admin, not a real purchase.)'}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { value: 'free', label: 'Free (deactivate)' },
            { value: 'weekly', label: 'Pro — Weekly' },
            { value: 'monthly', label: 'Pro — Monthly' },
            { value: 'lifetime', label: 'Pro — Lifetime' },
          ].map((opt) => {
            const active = (user.isPro ? user.plan || 'lifetime' : 'free') === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => changePlan(opt.value)}
                disabled={updatingPlan || active}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition disabled:cursor-default ${
                  active
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {active ? `✓ ${opt.label}` : opt.label}
              </button>
            )
          })}
          {updatingPlan && <Loader2 size={18} className="animate-spin text-gray-400" />}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Activity history</h2>
          <button onClick={load} className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm">
            <RefreshCcw size={14} /> Refresh
          </button>
        </div>
        {activity.length === 0 && <p className="text-gray-400 text-sm">No activity recorded yet.</p>}
        <ul className="divide-y divide-gray-100">
          {activity.map((e) => (
            <li key={e.id} className="py-3 flex items-center justify-between text-sm">
              <span>
                {ACTIVITY_LABELS[e.type] || e.type}
                {e.page ? ` — ${e.page}` : ''}
                {e.type === 'test_submit' && e.meta ? ` (${e.meta.testType}, ${e.meta.percentage}%)` : ''}
                {e.type === 'plan_changed' && e.meta ? ` → ${e.meta.plan} (by ${e.meta.by})` : ''}
              </span>
              <span className="text-gray-400">{timeAgo(e.at)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminUserDetail

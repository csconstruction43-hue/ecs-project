// pages/admin/AdminUserDetail.jsx
// Deep-dive view for one user: profile, live online status, and their full
// activity history (logins, page views, test submissions) — plus a button
// to download all of it as a JSON file.
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Download, Loader2, RefreshCcw, ShieldOff, ShieldCheck, StickyNote, Eye, UserCog } from 'lucide-react'
import { apiRequest, apiRequestBlob } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

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
  suspended: 'Account suspended',
  unsuspended: 'Account reinstated',
}

const AdminUserDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { startImpersonation } = useAuth()
  const [user, setUser] = useState(null)
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [updatingPlan, setUpdatingPlan] = useState(false)
  const [updatingSuspend, setUpdatingSuspend] = useState(false)
  const [suspendReason, setSuspendReason] = useState('')
  const [notesDraft, setNotesDraft] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)
  const [impersonating, setImpersonating] = useState(false)
  const [updatingRole, setUpdatingRole] = useState(false)

  const handleImpersonate = async () => {
    setError('')
    setImpersonating(true)
    try {
      await startImpersonation(user.id)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Could not start impersonation.')
      setImpersonating(false)
    }
  }

  const changeRole = async (role) => {
    setUpdatingRole(true)
    setError('')
    try {
      const { user: updated } = await apiRequest(`/api/admin/users/${id}/role`, { method: 'PATCH', body: { role } })
      setUser(updated)
    } catch (err) {
      setError(err.message || 'Could not update role.')
    } finally {
      setUpdatingRole(false)
    }
  }

  const toggleSuspend = async (suspended) => {
    setUpdatingSuspend(true)
    setError('')
    try {
      const data = await apiRequest(`/api/admin/users/${id}/suspend`, { method: 'PATCH', body: { suspended, reason: suspendReason } })
      setUser((prev) => ({ ...prev, ...data.user }))
      setSuspendReason('')
    } catch (err) {
      setError(err.message || 'Could not update suspension status.')
    } finally {
      setUpdatingSuspend(false)
    }
  }

  const saveNotes = async () => {
    setSavingNotes(true)
    setError('')
    try {
      const data = await apiRequest(`/api/admin/users/${id}/notes`, { method: 'PATCH', body: { notes: notesDraft } })
      setUser((prev) => ({ ...prev, ...data.user }))
    } catch (err) {
      setError(err.message || 'Could not save notes.')
    } finally {
      setSavingNotes(false)
    }
  }

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

  useEffect(() => {
    // Only sync the notes textarea when we land on a (new) user, not on
    // every poll refresh — otherwise an admin mid-typing would get overwritten.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional, see comment above
    if (user?.id) setNotesDraft(user.adminNotes || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

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
            {user.suspended && (
              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium">Suspended</span>
            )}
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

      {/* New feature: granular admin roles + user impersonation */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <UserCog size={18} className="text-indigo-500" />
          Admin role & support access
        </h2>
        <div className="flex items-center gap-3 flex-wrap mb-4">
          {[
            { value: 'user', label: 'User' },
            { value: 'support_agent', label: 'Support Agent' },
            { value: 'content_editor', label: 'Content Editor' },
            { value: 'admin', label: 'Full Admin' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => changeRole(opt.value)}
              disabled={updatingRole || user.role === opt.value}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition disabled:cursor-default ${
                user.role === opt.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {user.role === opt.value ? `✓ ${opt.label}` : opt.label}
            </button>
          ))}
          {updatingRole && <Loader2 size={16} className="animate-spin text-gray-400" />}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-500 mb-3">
            See the app exactly as this person does — useful for support debugging. Your own admin session is
            unaffected and you can return to it any time.
          </p>
          <button
            onClick={handleImpersonate}
            disabled={impersonating || user.role === 'admin'}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50 flex items-center gap-2"
          >
            {impersonating ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
            Log in as this user
          </button>
          {user.role === 'admin' && <p className="text-xs text-gray-400 mt-2">You can't impersonate another admin account.</p>}
        </div>
      </div>

      {/* Suspend / reinstate */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          {user.suspended ? <ShieldOff size={18} className="text-red-500" /> : <ShieldCheck size={18} className="text-gray-400" />}
          Account access
        </h2>
        {user.role === 'admin' ? (
          <p className="text-sm text-gray-500">Admin accounts can't be suspended.</p>
        ) : user.suspended ? (
          <div>
            <p className="text-sm text-gray-500 mb-3">
              Suspended {timeAgo(user.suspendedAt)} by {user.suspendedBy || 'an admin'}.
              {user.suspendedReason && <> Reason: <span className="text-gray-700">{user.suspendedReason}</span></>}
              <br />They can't log in until you reinstate them.
            </p>
            <button
              onClick={() => toggleSuspend(false)}
              disabled={updatingSuspend}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 flex items-center gap-2"
            >
              {updatingSuspend && <Loader2 size={16} className="animate-spin" />}
              Reinstate account
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-500 mb-3">Suspending blocks this user from logging in immediately, without deleting their data.</p>
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="text"
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Reason (optional, only visible to admins)"
                className="flex-1 min-w-[240px] border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={() => toggleSuspend(true)}
                disabled={updatingSuspend}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 flex items-center gap-2"
              >
                {updatingSuspend && <Loader2 size={16} className="animate-spin" />}
                Suspend account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Internal admin notes */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <StickyNote size={18} className="text-amber-500" />
          Internal notes
        </h2>
        <p className="text-sm text-gray-500 mb-3">Only visible to admins — never shown to the user. Good for support context ("asked for a refund, resolved 12 Sep").</p>
        <textarea
          value={notesDraft}
          onChange={(e) => setNotesDraft(e.target.value)}
          rows={3}
          maxLength={4000}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {user.adminNotesUpdatedAt ? `Last saved ${timeAgo(user.adminNotesUpdatedAt)} by ${user.adminNotesUpdatedBy || 'an admin'}` : 'No notes saved yet.'}
          </span>
          <button
            onClick={saveNotes}
            disabled={savingNotes}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2"
          >
            {savingNotes && <Loader2 size={16} className="animate-spin" />}
            Save notes
          </button>
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
                {(e.type === 'suspended' || e.type === 'unsuspended') && e.meta?.by ? ` (by ${e.meta.by}${e.meta.reason ? ` — ${e.meta.reason}` : ''})` : ''}
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

// pages/admin/AdminAuditLog.jsx
// A simple "who changed what" trail for the admin panel: plan changes,
// settings edits, invoice/quote/RAMS created or deleted, bulk user exports.
// Backed by GET /api/admin/audit (server/index.js -> store.js admin_audit table).
import React, { useState, useEffect, useCallback } from 'react'
import { Loader2, RefreshCcw, ShieldCheck } from 'lucide-react'
import { apiRequest } from '../../lib/api'

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

const ACTION_LABELS = {
  settings_updated: 'updated site settings',
  plan_changed: 'changed a user\u2019s plan',
  users_exported: 'exported all users to CSV',
  invoice_created: 'created an invoice',
  invoice_deleted: 'deleted an invoice',
  quote_created: 'created a quote',
  quote_deleted: 'deleted a quote',
  rams_created: 'created a RAMS document',
  rams_deleted: 'deleted a RAMS document',
  user_suspended: 'suspended a user',
  user_unsuspended: 'reinstated a user',
  broadcast_email_sent: 'sent a broadcast email',
  blog_post_created: 'wrote a new blog post',
  blog_post_updated: 'edited a blog post',
  blog_post_deleted: 'deleted a blog post',
  blog_post_hidden: 'removed a blog post from the site',
  blog_post_unhidden: 'restored a blog post to the site',
  page_created: 'created a new page',
  page_updated: 'edited a page',
  page_deleted: 'deleted a page',
}

function describeMeta(action, meta) {
  if (!meta) return ''
  if (action === 'plan_changed') return `\u2192 ${meta.plan} (${meta.userEmail || ''})`
  if (action === 'settings_updated') return `(${Object.keys(meta.changed || {}).join(', ')})`
  if (action === 'users_exported') return `(${meta.count} users)`
  if (action === 'user_suspended' || action === 'user_unsuspended') return `(${meta.userEmail || ''}${meta.reason ? ` — ${meta.reason}` : ''})`
  if (action === 'broadcast_email_sent') return `"${meta.subject}" \u2192 ${meta.audience} (${meta.count} recipients)`
  if (action === 'blog_post_created' || action === 'page_created') return meta.title ? `"${meta.title}"` : ''
  if (action === 'blog_post_hidden' || action === 'blog_post_unhidden') return meta.slug ? `(/blog/${meta.slug})` : ''
  if (meta.number) return `${meta.number}${meta.client ? ` \u2014 ${meta.client}` : ''}${meta.projectName ? ` \u2014 ${meta.projectName}` : ''}`
  return ''
}

const ACTIONS = ['all', ...Object.keys(ACTION_LABELS)]

const AdminAuditLog = () => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  const load = useCallback(async () => {
    try {
      const { entries } = await apiRequest('/api/admin/audit?limit=200')
      setEntries(entries)
      setError('')
    } catch (err) {
      setError(err.message || 'Could not load the audit log.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
    load()
  }, [load])

  const visible = filter === 'all' ? entries : entries.filter((e) => e.action === filter)

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-500 py-12">
        <Loader2 className="animate-spin" size={20} /> Loading audit log...
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="text-blue-600" size={24} />
          Audit log
        </h1>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            {ACTIONS.map((a) => (
              <option key={a} value={a}>{a === 'all' ? 'All actions' : (ACTION_LABELS[a] || a)}</option>
            ))}
          </select>
          <button onClick={load} className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 text-sm">
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        {visible.length === 0 && (
          <p className="text-gray-400 text-sm">No admin actions recorded yet — they'll show up here as admins make changes.</p>
        )}
        <ul className="divide-y divide-gray-100">
          {visible.map((e) => (
            <li key={e.id} className="py-3 flex items-center justify-between text-sm gap-4">
              <div className="min-w-0">
                <span className="font-medium text-gray-800">{e.adminEmail || 'Unknown admin'}</span>
                <span className="text-gray-600"> {ACTION_LABELS[e.action] || e.action}</span>
                <span className="text-gray-400"> {describeMeta(e.action, e.meta)}</span>
              </div>
              <span className="text-gray-400 shrink-0">{timeAgo(e.at)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminAuditLog

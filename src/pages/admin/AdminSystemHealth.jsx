// pages/admin/AdminSystemHealth.jsx
// New feature: System Health & Backup Center. Read-only dashboard showing
// whether the database is reachable, how many rows each table holds, and
// how long the API server has been running — plus a one-click full JSON
// backup download for disaster recovery / migration.
import React, { useEffect, useState, useCallback } from 'react'
import {
  Activity, Database, Server, RefreshCw, Download, Loader2,
  CheckCircle2, AlertTriangle, Clock,
} from 'lucide-react'
import { apiRequest, getToken } from '../../lib/api'

const TABLE_LABELS = {
  users: 'Users',
  activity: 'Activity log',
  invoices: 'Invoices',
  quotes: 'Quotes',
  rams: 'RAMS documents',
  tickets: 'Support tickets',
  notifications: 'Notifications',
  blog_posts: 'Blog posts',
  pages: 'Pages',
  question_reports: 'Question reports',
  card_applications: 'Card applications',
  team_invites: 'Team invites',
  coupons: 'Coupons',
  admin_audit: 'Admin audit entries',
}

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const parts = []
  if (d) parts.push(`${d}d`)
  if (h) parts.push(`${h}h`)
  parts.push(`${m}m`)
  return parts.join(' ')
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function AdminSystemHealth() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [backingUp, setBackingUp] = useState(false)
  const [backupError, setBackupError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiRequest('/api/admin/system-health')
      setHealth(data)
    } catch (e) {
      setError(e.message || 'Could not load system health.')
    } finally {
      setLoading(false)
    }
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [load])

  const downloadBackup = async () => {
    setBackingUp(true)
    setBackupError('')
    try {
      const res = await fetch(`${API_URL}/api/admin/backup`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      if (!res.ok) throw new Error('Backup request failed.')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ecsprep-backup-${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      setBackupError(e.message || 'Could not download backup.')
    } finally {
      setBackingUp(false)
    }
  }

  const totalRows = health ? Object.values(health.counts || {}).reduce((sum, n) => sum + n, 0) : 0

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Activity size={24} /> System Health</h1>
          <p className="text-gray-500 text-sm mt-0.5">Database connectivity, table sizes, and a downloadable full backup</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button
            onClick={downloadBackup}
            disabled={backingUp}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-secondary rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {backingUp ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />} Download Full Backup
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>
      )}
      {backupError && (
        <div className="mb-4 px-4 py-3 bg-red-50 text-red-600 text-sm rounded-xl">{backupError}</div>
      )}

      {loading && !health ? (
        <div className="text-center py-12 text-gray-400">Checking system health…</div>
      ) : health ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className={`rounded-2xl border p-5 ${health.dbOk ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Database size={18} className={health.dbOk ? 'text-green-600' : 'text-red-600'} />
                <p className="text-sm font-semibold text-gray-900">Database</p>
              </div>
              <p className={`text-lg font-bold flex items-center gap-1.5 ${health.dbOk ? 'text-green-700' : 'text-red-700'}`}>
                {health.dbOk ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                {health.dbOk ? 'Connected' : 'Unreachable'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {health.dbOk ? `Responded in ${health.dbLatencyMs}ms` : (health.dbError || 'See server logs for details')}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-1">
                <Server size={18} className="text-blue-500" />
                <p className="text-sm font-semibold text-gray-900">API Server</p>
              </div>
              <p className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
                <Clock size={16} className="text-gray-400" /> {formatUptime(health.serverUptimeSeconds)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Uptime · Node {health.nodeVersion}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-1">
                <Database size={18} className="text-purple-500" />
                <p className="text-sm font-semibold text-gray-900">Total Rows</p>
              </div>
              <p className="text-lg font-bold text-gray-900">{totalRows.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Across {Object.keys(health.counts || {}).length} tables</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Table</th>
                  <th className="text-right px-5 py-3 font-semibold">Row count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.entries(health.counts || {}).map(([table, count]) => (
                  <tr key={table} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-gray-900">{TABLE_LABELS[table] || table}</td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900">{count.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">Last checked {new Date(health.checkedAt).toLocaleString('en-GB')}</p>
        </>
      ) : null}
    </div>
  )
}

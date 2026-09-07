// pages/admin/AdminAnalytics.jsx
// Charts for the admin panel: signups over time, plan mix, daily activity by
// type, and test submissions + average score. All numbers come from
// GET /api/admin/analytics/summary (server/index.js), which aggregates the
// users/activity tables in Postgres so this stays fast even as data grows.
import React, { useEffect, useState, useCallback } from 'react'
import { Loader2, RefreshCcw, TrendingUp } from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { apiRequest } from '../../lib/api'

const RANGE_OPTIONS = [
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: '90 days', value: 90 },
]

const PLAN_COLORS = { free: '#94a3b8', weekly: '#38bdf8', monthly: '#6366f1', lifetime: '#16a34a', pro: '#6366f1' }
const ACTIVITY_COLORS = { login: '#6366f1', signup: '#16a34a', ping: '#94a3b8', test_submit: '#f59e0b', plan_changed: '#ec4899' }

function fillMissingDays(rows, days, valueKeys) {
  // The backend only returns rows for days that actually had events, which
  // makes line charts look jagged with gaps. Fill every day in the window
  // with zeroes so the chart reads as a continuous timeline.
  const byDay = Object.fromEntries(rows.map((r) => [r.day, r]))
  const out = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const existing = byDay[key] || {}
    const entry = { day: key.slice(5) } // MM-DD for compact axis labels
    for (const k of valueKeys) entry[k] = existing[k] ?? 0
    out.push(entry)
  }
  return out
}

// Pivots activityByDay (one row per day+type) into one row per day with a
// column per activity type, which is what recharts' <Bar> series need.
function pivotActivity(rows, days) {
  const types = [...new Set(rows.map((r) => r.type).filter(Boolean))]
  const byDay = {}
  for (const r of rows) {
    byDay[r.day] = byDay[r.day] || {}
    byDay[r.day][r.type] = r.count
  }
  const out = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const entry = { day: key.slice(5) }
    for (const t of types) entry[t] = byDay[key]?.[t] || 0
    out.push(entry)
  }
  return { data: out, types }
}

const AdminAnalytics = () => {
  const [days, setDays] = useState(30)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await apiRequest(`/api/admin/analytics/summary?days=${days}`)
      setSummary(data)
      setError('')
    } catch (err) {
      setError(err.message || 'Could not load analytics.')
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount/range change
    load()
  }, [load])

  const signups = summary ? fillMissingDays(summary.signupsByDay, days, ['count']) : []
  const tests = summary ? fillMissingDays(summary.testsByDay, days, ['submissions']) : []
  const { data: activityData, types: activityTypes } = summary
    ? pivotActivity(summary.activityByDay, days)
    : { data: [], types: [] }

  const totalSignups = signups.reduce((sum, r) => sum + r.count, 0)
  const totalTests = tests.reduce((sum, r) => sum + r.submissions, 0)
  const scoredDays = summary?.testsByDay.filter((r) => r.avgScore !== null) || []
  const avgScoreOverall = scoredDays.length
    ? Math.round(scoredDays.reduce((sum, r) => sum + r.avgScore, 0) / scoredDays.length)
    : null

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex items-center gap-2">
          <div className="flex bg-white rounded-lg shadow-sm p-1">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDays(opt.value)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  days === opt.value ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button onClick={load} className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 text-sm">
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>
      )}

      {loading && !summary ? (
        <div className="flex items-center justify-center gap-2 text-gray-500 py-12">
          <Loader2 className="animate-spin" size={20} /> Loading analytics...
        </div>
      ) : (
        <>
          {/* Quick stat strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-gray-500 mb-1">New signups ({days}d)</div>
              <div className="text-2xl font-bold">{totalSignups}</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-gray-500 mb-1">Tests submitted ({days}d)</div>
              <div className="text-2xl font-bold">{totalTests}</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-gray-500 mb-1">Average score ({days}d)</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                {avgScoreOverall !== null ? `${avgScoreOverall}%` : '—'}
                <TrendingUp size={18} className="text-green-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Signups over time */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Signups over time</h2>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={signups}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" name="Signups" stroke="#6366f1" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Plan distribution */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Users by plan</h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={summary?.planDistribution || []}
                    dataKey="count"
                    nameKey="plan"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={(entry) => `${entry.plan}: ${entry.count}`}
                  >
                    {(summary?.planDistribution || []).map((entry) => (
                      <Cell key={entry.plan} fill={PLAN_COLORS[entry.plan] || '#cbd5e1'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Daily activity by type */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Daily activity by type</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  {activityTypes.map((t) => (
                    <Bar key={t} dataKey={t} stackId="activity" fill={ACTIVITY_COLORS[t] || '#cbd5e1'} name={t.replace('_', ' ')} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
              {activityTypes.length === 0 && (
                <p className="text-gray-400 text-sm text-center mt-2">No activity recorded in this range yet.</p>
              )}
            </div>

            {/* Test submissions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Test submissions per day</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={tests}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="submissions" name="Submissions" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminAnalytics

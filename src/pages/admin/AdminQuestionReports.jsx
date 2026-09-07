// pages/admin/AdminQuestionReports.jsx
// New feature: moderation queue for "Report an issue" submissions from
// ReportQuestionButton (see src/components/ReportQuestionButton.jsx),
// fed by POST /api/questions/report. Lets the team fix wrong answer keys,
// typos, or outdated questions quickly instead of these only ever landing
// in an inbox somewhere.
import React, { useEffect, useState } from 'react'
import { Flag, Loader2, Trash2, CheckCircle2, Circle, XCircle } from 'lucide-react'
import { apiRequest } from '../../lib/api'

const STATUS_STYLES = {
  open: { label: 'Open', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  resolved: { label: 'Resolved', className: 'bg-green-50 text-green-700 border-green-200' },
  dismissed: { label: 'Dismissed', className: 'bg-gray-100 text-gray-500 border-gray-200' },
}

const REASON_LABELS = {
  wrong_answer: 'Wrong answer',
  typo_or_unclear: 'Typo / unclear',
  outdated_info: 'Outdated info',
  duplicate: 'Duplicate',
  other: 'Other',
}

const FILTERS = ['all', 'open', 'resolved', 'dismissed']

const AdminQuestionReports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { reports } = await apiRequest('/api/admin/question-reports')
      setReports(reports)
    } catch (err) {
      setError(err.message || 'Could not load question reports.')
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  const selected = reports.find((r) => r.id === selectedId) || null
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: resets the note draft when the selected report changes
    setNoteDraft(selected?.adminNote || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  const visible = reports.filter((r) => filter === 'all' || r.status === filter)
  const openCount = reports.filter((r) => r.status === 'open').length

  const setStatus = async (id, status) => {
    setSaving(true)
    try {
      const { report } = await apiRequest(`/api/admin/question-reports/${id}`, { method: 'PATCH', body: { status } })
      setReports((prev) => prev.map((r) => (r.id === id ? report : r)))
    } catch (err) {
      setError(err.message || 'Could not update the report.')
    } finally {
      setSaving(false)
    }
  }

  const saveNote = async () => {
    if (!selected) return
    setSaving(true)
    try {
      const { report } = await apiRequest(`/api/admin/question-reports/${selected.id}`, { method: 'PATCH', body: { adminNote: noteDraft.trim() } })
      setReports((prev) => prev.map((r) => (r.id === report.id ? report : r)))
    } catch (err) {
      setError(err.message || 'Could not save the note.')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this report permanently?')) return
    try {
      await apiRequest(`/api/admin/question-reports/${id}`, { method: 'DELETE' })
      setReports((prev) => prev.filter((r) => r.id !== id))
      if (selectedId === id) setSelectedId(null)
    } catch (err) {
      setError(err.message || 'Could not delete the report.')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <Flag className="text-red-500" size={24} />
        Question Reports
        {openCount > 0 && <span className="text-xs font-bold bg-red-500 text-white rounded-full px-2 py-0.5 ml-1">{openCount} open</span>}
      </h1>
      <p className="text-sm text-gray-500 mb-6">Issues candidates flagged on individual test questions — wrong answers, typos, or outdated info.</p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>}

      <div className="flex gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border ${filter === f ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-600 border-gray-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-4">
          {/* List */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
            {visible.length === 0 ? (
              <p className="p-4 text-sm text-gray-400">No reports here.</p>
            ) : (
              visible.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 ${selectedId === r.id ? 'bg-red-50' : ''}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm">{REASON_LABELS[r.reason] || r.reason}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ${STATUS_STYLES[r.status]?.className}`}>
                      {STATUS_STYLES[r.status]?.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{r.questionText}</p>
                  {r.testLabel && <p className="text-xs text-gray-400 truncate mt-0.5">{r.testLabel}</p>}
                  <p className="text-[11px] text-gray-300 mt-1">{new Date(r.createdAt).toLocaleString('en-GB')}</p>
                </button>
              ))
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
            {!selected ? (
              <p className="text-sm text-gray-400">Select a report to view it.</p>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{REASON_LABELS[selected.reason] || selected.reason}</p>
                    {selected.reportedByEmail && <p className="text-sm text-gray-500">Reported by {selected.reportedByEmail}</p>}
                    <p className="text-xs text-gray-400 mt-1">{selected.testLabel || 'Unspecified test'} · {new Date(selected.createdAt).toLocaleString('en-GB')}</p>
                  </div>
                  <button onClick={() => remove(selected.id)} className="text-gray-400 hover:text-red-600" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 mb-3">
                  <p className="font-medium mb-2">{selected.questionText}</p>
                  {Array.isArray(selected.options) && selected.options.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                      {selected.options.map((o, i) => <li key={i}>{o}</li>)}
                    </ul>
                  )}
                </div>

                {selected.comment && (
                  <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800 whitespace-pre-wrap mb-5">"{selected.comment}"</div>
                )}

                <div className="flex items-center gap-2 mb-5">
                  <button
                    onClick={() => setStatus(selected.id, 'open')}
                    disabled={saving}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${selected.status === 'open' ? 'bg-amber-50 border-amber-300 text-amber-700' : 'border-gray-200 text-gray-500'}`}
                  >
                    <Circle size={12} /> Open
                  </button>
                  <button
                    onClick={() => setStatus(selected.id, 'resolved')}
                    disabled={saving}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${selected.status === 'resolved' ? 'bg-green-50 border-green-300 text-green-700' : 'border-gray-200 text-gray-500'}`}
                  >
                    <CheckCircle2 size={12} /> Resolved
                  </button>
                  <button
                    onClick={() => setStatus(selected.id, 'dismissed')}
                    disabled={saving}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${selected.status === 'dismissed' ? 'bg-gray-100 border-gray-300 text-gray-600' : 'border-gray-200 text-gray-500'}`}
                  >
                    <XCircle size={12} /> Dismissed
                  </button>
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-1">Internal note</label>
                <textarea
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  rows={4}
                  placeholder="e.g. Confirmed correct answer is B, question bank updated on 12/09..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3"
                />
                <button
                  onClick={saveNote}
                  disabled={saving}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 disabled:opacity-50"
                >
                  Save note
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminQuestionReports

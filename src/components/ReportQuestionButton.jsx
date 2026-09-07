// components/ReportQuestionButton.jsx
// New feature: "Report an issue" on any test question — a small flag icon
// that opens a quick modal (reason + optional comment) and posts to
// POST /api/questions/report. Feeds the new Admin > Question Reports queue,
// so a wrong answer key or a typo gets fixed quickly instead of quietly
// costing candidates marks.
import React, { useState } from 'react'
import { Flag, X, CheckCircle2 } from 'lucide-react'
import { apiRequest } from '../lib/api'

const REASONS = [
  { value: 'wrong_answer', label: 'The marked answer looks wrong' },
  { value: 'typo_or_unclear', label: 'Typo or unclear wording' },
  { value: 'outdated_info', label: 'Outdated information' },
  { value: 'duplicate', label: 'Duplicate question' },
  { value: 'other', label: 'Something else' },
]

function ReportQuestionButton({ questionId, questionText, options, testLabel, className = '' }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('wrong_answer')
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const reset = () => {
    setOpen(false)
    setReason('wrong_answer')
    setComment('')
    setError('')
    setDone(false)
  }

  const handleSubmit = async () => {
    setError('')
    setSubmitting(true)
    try {
      await apiRequest('/api/questions/report', {
        method: 'POST',
        body: { questionId, questionText, options, reason, comment, testLabel },
      })
      setDone(true)
    } catch (err) {
      setError(err.message || 'Could not send your report. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition ${className}`}
      >
        <Flag size={13} /> Report an issue
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={reset}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {done ? (
              <div className="text-center py-4">
                <CheckCircle2 className="mx-auto text-green-500 mb-2" size={32} />
                <p className="font-semibold text-gray-800">Thanks — reported</p>
                <p className="text-sm text-gray-500 mt-1">Our team will take a look at this question.</p>
                <button
                  onClick={reset}
                  className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-800 text-sm">Report an issue with this question</p>
                  <button onClick={reset} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-1.5 mb-3">
                  {REASONS.map((r) => (
                    <label
                      key={r.value}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition ${
                        reason === r.value ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="report-reason"
                        value={r.value}
                        checked={reason === r.value}
                        onChange={() => setReason(r.value)}
                        className="accent-red-500"
                      />
                      {r.label}
                    </label>
                  ))}
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Optional: add any detail (e.g. what you think the correct answer should be)"
                  rows={3}
                  maxLength={1000}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                />

                {error && <p className="text-red-600 text-xs mt-2">{error}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Send report'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ReportQuestionButton

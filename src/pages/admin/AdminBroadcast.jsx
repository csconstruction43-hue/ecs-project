// pages/admin/AdminBroadcast.jsx
// Send a one-off email announcement to all users, or just Free / Pro users.
// Backed by POST /api/admin/broadcast-email (server/index.js), which queues
// the sends in the background and returns immediately with the recipient count.
import React, { useState } from 'react'
import { Send, Loader2, Mail, CheckCircle2 } from 'lucide-react'
import { apiRequest } from '../../lib/api'

const AUDIENCES = [
  { value: 'all', label: 'All users' },
  { value: 'free', label: 'Free users only' },
  { value: 'pro', label: 'Pro users only' },
]

const AdminBroadcast = () => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [audience, setAudience] = useState('all')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [confirming, setConfirming] = useState(false)

  const send = async () => {
    setSending(true)
    setError('')
    setResult(null)
    try {
      const data = await apiRequest('/api/admin/broadcast-email', { method: 'POST', body: { subject, message, audience } })
      setResult(data.recipientCount)
      setConfirming(false)
    } catch (err) {
      setError(err.message || 'Could not send the broadcast.')
    } finally {
      setSending(false)
    }
  }

  const canSend = subject.trim().length > 0 && message.trim().length > 0

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <Mail className="text-blue-600" size={24} />
        Broadcast email
      </h1>
      <p className="text-sm text-gray-500 mb-6">Send an announcement, promo, or update to your users by email — e.g. new test slots, a price change, or a maintenance heads-up.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>
      )}

      {result !== null && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm mb-6 flex items-center gap-2">
          <CheckCircle2 size={18} />
          Queued for {result} recipient{result === 1 ? '' : 's'} — sending in the background.
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
        <label className="block text-sm font-medium text-gray-700 mb-1">Send to</label>
        <select
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
        >
          {AUDIENCES.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>

        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={150}
          placeholder="e.g. New CITB test slots are open for March"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={7}
          maxLength={3000}
          placeholder="Write your announcement here. Each new line becomes a new paragraph."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-1"
        />
        <p className="text-xs text-gray-400 mb-4">{message.length}/3000 characters</p>

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            disabled={!canSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Send size={16} />
            Review & send
          </button>
        ) : (
          <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-amber-800 mb-3">
              This will email <strong>{AUDIENCES.find((a) => a.value === audience)?.label.toLowerCase()}</strong> with the subject "<strong>{subject}</strong>". This can't be undone — send it?
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={send}
                disabled={sending}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-60 flex items-center gap-2"
              >
                {sending && <Loader2 size={16} className="animate-spin" />}
                Yes, send now
              </button>
              <button
                onClick={() => setConfirming(false)}
                disabled={sending}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminBroadcast

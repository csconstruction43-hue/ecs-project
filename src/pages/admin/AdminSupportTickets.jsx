// pages/admin/AdminSupportTickets.jsx
// Inbox for messages submitted through the public Contact page (see
// pages/ContactPage.jsx -> POST /api/contact). Reply here to email the
// person back directly, and track open/replied/closed status.
import React, { useEffect, useState } from 'react'
import { Inbox, Loader2, Mail, Send, Trash2, CheckCircle2, Circle, Archive } from 'lucide-react'
import { apiRequest } from '../../lib/api'

const STATUS_STYLES = {
  open: { label: 'Open', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  replied: { label: 'Replied', className: 'bg-green-50 text-green-700 border-green-200' },
  closed: { label: 'Closed', className: 'bg-gray-100 text-gray-500 border-gray-200' },
}

const FILTERS = ['all', 'open', 'replied', 'closed']

const AdminSupportTickets = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [replyDraft, setReplyDraft] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { tickets } = await apiRequest('/api/admin/tickets')
      setTickets(tickets)
    } catch (err) {
      setError(err.message || 'Could not load messages.')
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  const selected = tickets.find((t) => t.id === selectedId) || null
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: resets the reply draft when the selected ticket changes
    setReplyDraft(selected?.adminReply || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when switching tickets, not on every poll refresh
  }, [selectedId])

  const visible = tickets.filter((t) => filter === 'all' || t.status === filter)

  const setStatus = async (id, status) => {
    setSaving(true)
    try {
      const { ticket } = await apiRequest(`/api/admin/tickets/${id}`, { method: 'PATCH', body: { status } })
      setTickets((prev) => prev.map((t) => (t.id === id ? ticket : t)))
    } catch (err) {
      setError(err.message || 'Could not update the message.')
    } finally {
      setSaving(false)
    }
  }

  const sendReply = async () => {
    if (!selected || !replyDraft.trim()) return
    setSaving(true)
    setError('')
    try {
      const { ticket } = await apiRequest(`/api/admin/tickets/${selected.id}`, { method: 'PATCH', body: { adminReply: replyDraft.trim() } })
      setTickets((prev) => prev.map((t) => (t.id === ticket.id ? ticket : t)))
    } catch (err) {
      setError(err.message || 'Could not send the reply.')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return
    try {
      await apiRequest(`/api/admin/tickets/${id}`, { method: 'DELETE' })
      setTickets((prev) => prev.filter((t) => t.id !== id))
      if (selectedId === id) setSelectedId(null)
    } catch (err) {
      setError(err.message || 'Could not delete the message.')
    }
  }

  const openCount = tickets.filter((t) => t.status === 'open').length

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <Inbox className="text-blue-600" size={24} />
        Support Tickets
        {openCount > 0 && <span className="text-xs font-bold bg-red-500 text-white rounded-full px-2 py-0.5 ml-1">{openCount} open</span>}
      </h1>
      <p className="text-sm text-gray-500 mb-6">Messages submitted through the Contact page. Reply here to email the sender back directly.</p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>}

      <div className="flex gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border ${filter === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}
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
              <p className="p-4 text-sm text-gray-400">No messages here.</p>
            ) : (
              visible.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 ${selectedId === t.id ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm truncate">{t.name}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ${STATUS_STYLES[t.status]?.className}`}>
                      {STATUS_STYLES[t.status]?.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{t.topic}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{t.message}</p>
                  <p className="text-[11px] text-gray-300 mt-1">{new Date(t.createdAt).toLocaleString('en-GB')}</p>
                </button>
              ))
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
            {!selected ? (
              <p className="text-sm text-gray-400">Select a message to view it.</p>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{selected.name}</p>
                    <a href={`mailto:${selected.email}`} className="text-sm text-blue-600 flex items-center gap-1"><Mail size={13} /> {selected.email}</a>
                    <p className="text-xs text-gray-400 mt-1">{selected.topic} · {new Date(selected.createdAt).toLocaleString('en-GB')}</p>
                  </div>
                  <button onClick={() => remove(selected.id)} className="text-gray-400 hover:text-red-600" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap mb-5">{selected.message}</div>

                <div className="flex items-center gap-2 mb-5">
                  <button
                    onClick={() => setStatus(selected.id, 'open')}
                    disabled={saving}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${selected.status === 'open' ? 'bg-amber-50 border-amber-300 text-amber-700' : 'border-gray-200 text-gray-500'}`}
                  >
                    <Circle size={12} /> Open
                  </button>
                  <button
                    onClick={() => setStatus(selected.id, 'closed')}
                    disabled={saving}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${selected.status === 'closed' ? 'bg-gray-100 border-gray-300 text-gray-600' : 'border-gray-200 text-gray-500'}`}
                  >
                    <Archive size={12} /> Closed
                  </button>
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-1">Reply (emails the sender)</label>
                <textarea
                  value={replyDraft}
                  onChange={(e) => setReplyDraft(e.target.value)}
                  rows={6}
                  placeholder="Write your reply..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3"
                />
                <button
                  onClick={sendReply}
                  disabled={saving || !replyDraft.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  Send reply
                </button>
                {selected.status === 'replied' && (
                  <p className="text-xs text-green-700 flex items-center gap-1 mt-3"><CheckCircle2 size={13} /> Already replied to this message.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSupportTickets

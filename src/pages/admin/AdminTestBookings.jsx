// pages/admin/AdminTestBookings.jsx
// New feature: management queue for ECS test booking requests submitted
// via the "Book Your ECS Test" form (see pages/ECSTestBookingPage.jsx ->
// POST /api/book-test). Previously that form only ever sent an email —
// nothing was tracked here in the admin panel. Mirrors AdminCardApplications.jsx
// so every booking (test AND card) reaches the admin, not just an inbox.
import React, { useEffect, useState } from 'react'
import { ClipboardCheck, Loader2, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { apiRequest } from '../../lib/api'

const STATUSES = [
  { value: 'new', label: 'New', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'contacted', label: 'Contacted', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { value: 'slot_confirmed', label: 'Slot confirmed', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'payment_received', label: 'Payment received', className: 'bg-teal-50 text-teal-700 border-teal-200' },
  { value: 'completed', label: 'Completed', className: 'bg-green-50 text-green-700 border-green-200' },
  { value: 'cancelled', label: 'Cancelled', className: 'bg-red-50 text-red-700 border-red-200' },
]
const statusMeta = (value) => STATUSES.find((s) => s.value === value) || { label: value, className: 'bg-gray-100 text-gray-600 border-gray-200' }

const FILTERS = ['all', ...STATUSES.map((s) => s.value)]

const AdminTestBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { bookings } = await apiRequest('/api/admin/test-bookings')
      setBookings(bookings)
    } catch (err) {
      setError(err.message || 'Could not load test bookings.')
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  const selected = bookings.find((b) => b.id === selectedId) || null

  const visible = bookings.filter((b) => filter === 'all' || b.status === filter)
  const newCount = bookings.filter((b) => b.status === 'new').length

  const advanceStatus = async (status) => {
    if (!selected) return
    setSaving(true)
    setError('')
    try {
      const { booking } = await apiRequest(`/api/admin/test-bookings/${selected.id}`, {
        method: 'PATCH',
        body: { status, note: noteDraft.trim() },
      })
      setBookings((prev) => prev.map((b) => (b.id === booking.id ? booking : b)))
      setNoteDraft('')
    } catch (err) {
      setError(err.message || 'Could not update the booking.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <ClipboardCheck className="text-blue-600" size={24} />
        Test Bookings
        {newCount > 0 && <span className="text-xs font-bold bg-blue-500 text-white rounded-full px-2 py-0.5 ml-1">{newCount} new</span>}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Every ECS test booking request submitted through the site. Moving a candidate to a new
        status automatically emails them an update.
      </p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>}

      <div className="flex gap-2 mb-4 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${filter === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}
          >
            {f === 'all' ? 'All' : statusMeta(f).label}
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
              <p className="p-4 text-sm text-gray-400">No bookings here.</p>
            ) : (
              visible.map((b) => (
                <button
                  key={b.id}
                  onClick={() => { setSelectedId(b.id); setNoteDraft('') }}
                  className={`w-full text-left p-4 hover:bg-gray-50 ${selectedId === b.id ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm truncate">{b.fullName}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ${statusMeta(b.status).className}`}>
                      {statusMeta(b.status).label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{b.testCategory}</p>
                  <p className="text-[11px] text-gray-300 mt-1">{new Date(b.createdAt).toLocaleString('en-GB')}</p>
                </button>
              ))
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
            {!selected ? (
              <p className="text-sm text-gray-400">Select a booking to view it.</p>
            ) : (
              <div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 text-lg">{selected.fullName}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                    <a href={`mailto:${selected.email}`} className="flex items-center gap-1 text-blue-600"><Mail size={13} /> {selected.email}</a>
                    {selected.phone && <span className="flex items-center gap-1"><Phone size={13} /> {selected.phone}</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>{selected.testCategory}</span>
                    {selected.preferredCentre && <span className="flex items-center gap-1"><MapPin size={12} /> {selected.preferredCentre}</span>}
                    {selected.preferredDate && <span className="flex items-center gap-1"><Calendar size={12} /> {selected.preferredDate}</span>}
                  </p>
                  {selected.notes && <p className="text-sm text-gray-600 mt-2 italic">"{selected.notes}"</p>}
                </div>

                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Move to status</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => advanceStatus(s.value)}
                        disabled={saving || selected.status === s.value}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                          selected.status === s.value ? `${s.className} cursor-default` : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-1">Note to include in the update email (optional)</label>
                <textarea
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  rows={3}
                  placeholder="e.g. Your slot at Manchester is confirmed for 12 June."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-5"
                />

                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Timeline</p>
                <ul className="space-y-2">
                  {(selected.statusHistory || []).slice().reverse().map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ${statusMeta(h.status).className}`}>
                        {statusMeta(h.status).label}
                      </span>
                      <span className="text-gray-400 text-xs">{new Date(h.at).toLocaleString('en-GB')}</span>
                      {h.note && <span className="text-gray-600 text-xs italic">— {h.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminTestBookings

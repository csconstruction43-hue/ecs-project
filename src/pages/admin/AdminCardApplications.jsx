// pages/admin/AdminCardApplications.jsx
// New feature: management queue for CSCS/ECS card applications submitted
// via the "Book Your ECS Card" form (see pages/ECSCardBookingPage.jsx ->
// POST /api/book-card). Previously that form only ever sent an email —
// nothing was tracked. Moving a candidate through a stage here emails them
// an update automatically (see PATCH /api/admin/card-applications/:id).
import React, { useEffect, useState } from 'react'
import { CreditCard, Loader2, Mail, Phone, Eye, X, FileText, Download } from 'lucide-react'
import { apiRequest } from '../../lib/api'

const STAGES = [
  { value: 'submitted', label: 'Submitted', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'documents_verified', label: 'Docs verified', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { value: 'test_booked', label: 'Test booked', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'test_passed', label: 'Test passed', className: 'bg-teal-50 text-teal-700 border-teal-200' },
  { value: 'card_ordered', label: 'Card ordered', className: 'bg-purple-50 text-purple-700 border-purple-200' },
  { value: 'dispatched', label: 'Dispatched', className: 'bg-green-50 text-green-700 border-green-200' },
]
const SIDE_STAGES = [
  { value: 'on_hold', label: 'On hold', className: 'bg-orange-50 text-orange-700 border-orange-200' },
  { value: 'rejected', label: 'Rejected', className: 'bg-red-50 text-red-700 border-red-200' },
]
const ALL_STAGES = [...STAGES, ...SIDE_STAGES]
const stageMeta = (value) => ALL_STAGES.find((s) => s.value === value) || { label: value, className: 'bg-gray-100 text-gray-600 border-gray-200' }

const FILTERS = ['all', ...STAGES.map((s) => s.value), ...SIDE_STAGES.map((s) => s.value)]

const AdminCardApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [saving, setSaving] = useState(false)
  const [viewFullId, setViewFullId] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const { applications } = await apiRequest('/api/admin/card-applications')
      setApplications(applications)
    } catch (err) {
      setError(err.message || 'Could not load card applications.')
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  const selected = applications.find((a) => a.id === selectedId) || null
  const viewFullApp = applications.find((a) => a.id === viewFullId) || null

  const visible = applications.filter((a) => filter === 'all' || a.stage === filter)
  const pendingCount = applications.filter((a) => a.stage === 'submitted').length

  const advanceStage = async (stage) => {
    if (!selected) return
    setSaving(true)
    setError('')
    try {
      const { application } = await apiRequest(`/api/admin/card-applications/${selected.id}`, {
        method: 'PATCH',
        body: { stage, note: noteDraft.trim() },
      })
      setApplications((prev) => prev.map((a) => (a.id === application.id ? application : a)))
      setNoteDraft('')
    } catch (err) {
      setError(err.message || 'Could not update the application.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <CreditCard className="text-purple-600" size={24} />
        Card Applications
        {pendingCount > 0 && <span className="text-xs font-bold bg-blue-500 text-white rounded-full px-2 py-0.5 ml-1">{pendingCount} new</span>}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Every ECS card booking submitted through the site, with a status timeline. Moving a candidate to a new
        stage automatically emails them an update.
      </p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>}

      <div className="flex gap-2 mb-4 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${filter === f ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-200'}`}
          >
            {f === 'all' ? 'All' : stageMeta(f).label}
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
              <p className="p-4 text-sm text-gray-400">No applications here.</p>
            ) : (
              visible.map((a) => (
                <button
                  key={a.id}
                  onClick={() => { setSelectedId(a.id); setNoteDraft('') }}
                  className={`w-full text-left p-4 hover:bg-gray-50 ${selectedId === a.id ? 'bg-purple-50' : ''}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm truncate">{a.fullName}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ${stageMeta(a.stage).className}`}>
                      {stageMeta(a.stage).label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{a.cardType} · {a.applicationType}</p>
                  <p className="text-[11px] text-gray-300 mt-1">{new Date(a.createdAt).toLocaleString('en-GB')}</p>
                </button>
              ))
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
            {!selected ? (
              <p className="text-sm text-gray-400">Select an application to view it.</p>
            ) : (
              <div>
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{selected.fullName}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                        <a href={`mailto:${selected.email}`} className="flex items-center gap-1 text-blue-600"><Mail size={13} /> {selected.email}</a>
                        {selected.phone && <span className="flex items-center gap-1"><Phone size={13} /> {selected.phone}</span>}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {selected.cardType} · {selected.applicationType} · {selected.jobTitle}
                        {selected.employer ? ` at ${selected.employer}` : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => setViewFullId(selected.id)}
                      className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 transition"
                    >
                      <Eye size={14} /> View Full Details
                    </button>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Move to stage</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_STAGES.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => advanceStage(s.value)}
                        disabled={saving || selected.stage === s.value}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                          selected.stage === s.value ? `${s.className} cursor-default` : 'border-gray-200 text-gray-500 hover:bg-gray-50'
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
                  placeholder="e.g. We need a clearer photo of your ID to proceed."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-5"
                />

                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Timeline</p>
                <ul className="space-y-2">
                  {(selected.stageHistory || []).slice().reverse().map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ${stageMeta(h.stage).className}`}>
                        {stageMeta(h.stage).label}
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

      {/* Full application detail modal — shows every field the candidate
          filled in on the booking form, plus their uploaded documents,
          not just the summary shown in the list/detail panel above. */}
      {viewFullApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setViewFullId(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Full Application — {viewFullApp.fullName}</h2>
              <button onClick={() => setViewFullId(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <Section title="Personal details">
                <DetailRow label="Full name" value={viewFullApp.fullName} />
                <DetailRow label="Date of birth" value={viewFullApp.dob} />
                <DetailRow label="NI number" value={viewFullApp.niNumber} />
                <DetailRow label="Gender" value={viewFullApp.gender} />
              </Section>

              <Section title="Contact & address">
                <DetailRow label="Email" value={viewFullApp.email} />
                <DetailRow label="Mobile" value={viewFullApp.phone} />
                <DetailRow label="Street address" value={viewFullApp.streetAddress} />
                <DetailRow label="Town / City" value={viewFullApp.townCity} />
                <DetailRow label="Postcode" value={viewFullApp.postcode} />
              </Section>

              <Section title="Application">
                <DetailRow label="Application type" value={viewFullApp.applicationType} />
                {viewFullApp.applicationType === 'Renewal' && (
                  <>
                    <DetailRow label="Previous card number" value={viewFullApp.previousCardNumber} />
                    <DetailRow label="Previous expiry date" value={viewFullApp.previousExpiryDate} />
                  </>
                )}
                <DetailRow label="Card type" value={viewFullApp.cardType} />
                <DetailRow label="Job title / occupation" value={viewFullApp.jobTitle} />
                <DetailRow label="Employer" value={viewFullApp.employer} />
                <DetailRow label="Qualification" value={viewFullApp.qualification} />
                <DetailRow label="Passed H&S/HS&E test?" value={viewFullApp.hasPassedTest} />
              </Section>

              {viewFullApp.notes && (
                <Section title="Notes from candidate">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{viewFullApp.notes}</p>
                </Section>
              )}

              <Section title="Uploaded documents">
                <div className="grid sm:grid-cols-3 gap-3">
                  <DocumentTile label="Passport photo" doc={viewFullApp.documents?.passportPhoto} />
                  <DocumentTile label="Identity proof" doc={viewFullApp.documents?.idProof} />
                  <DocumentTile label="H&S/HS&E proof" doc={viewFullApp.documents?.hseProof} />
                </div>
              </Section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function DetailRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-wrap gap-x-2 text-sm">
      <span className="text-gray-500 min-w-[160px]">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  )
}

function DocumentTile({ label, doc }) {
  if (!doc?.dataUri) {
    return (
      <div className="border border-dashed border-gray-200 rounded-xl p-3 text-center">
        <FileText size={20} className="mx-auto text-gray-300 mb-1" />
        <p className="text-[11px] text-gray-400">{label}</p>
        <p className="text-[10px] text-gray-300">Not provided</p>
      </div>
    )
  }
  const isImage = doc.contentType?.startsWith('image/')
  return (
    <a
      href={doc.dataUri}
      download={doc.filename}
      className="block border border-gray-200 rounded-xl p-2 hover:border-purple-300 hover:bg-purple-50/40 transition"
    >
      {isImage ? (
        <img src={doc.dataUri} alt={label} className="w-full h-24 object-cover rounded-lg mb-2" />
      ) : (
        <div className="w-full h-24 flex items-center justify-center bg-gray-50 rounded-lg mb-2">
          <FileText size={28} className="text-gray-400" />
        </div>
      )}
      <p className="text-[11px] font-medium text-gray-700 truncate">{label}</p>
      <p className="text-[10px] text-purple-600 flex items-center gap-1 mt-0.5"><Download size={10} /> Download</p>
    </a>
  )
}

export default AdminCardApplications

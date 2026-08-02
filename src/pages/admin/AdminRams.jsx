// pages/admin/AdminRams.jsx
// RAMS Generator — create, edit, list and print/download Risk Assessment &
// Method Statement documents for jobs/sites. Persisted through the backend
// (see server/index.js `/api/admin/rams*` + server/store.js), the same
// pattern used by the Invoice Builder and Quote Generator.
import React, { useEffect, useMemo, useState } from 'react'
import {
  ShieldAlert, Plus, Trash2, Printer, Download, Pencil, X, Search,
  FileText, ChevronLeft, Save, Send, CheckCircle2, Clock, ListChecks,
} from 'lucide-react'
import { apiRequest } from '../../lib/api'

const STATUS_STYLES = {
  draft: { label: 'Draft', cls: 'text-gray-600 bg-gray-100', icon: FileText },
  issued: { label: 'Issued', cls: 'text-green-600 bg-green-50', icon: CheckCircle2 },
  review: { label: 'Under Review', cls: 'text-blue-600 bg-blue-50', icon: Clock },
}

const PPE_OPTIONS = [
  'Hard hat', 'Hi-vis vest/jacket', 'Safety boots', 'Safety gloves',
  'Eye protection', 'Ear protection', 'Dust mask / respirator',
  'Fall arrest harness', 'Face shield', 'Insulated tools / gloves (electrical)',
]

const uid = (p) => `${p}_${Math.random().toString(36).slice(2, 8)}`

const emptyHazard = () => ({
  id: uid('hz'),
  hazard: '',
  whoAtRisk: 'Operatives, others on site',
  existingControls: '',
  likelihood: 3,
  severity: 3,
  additionalControls: '',
  residualLikelihood: 1,
  residualSeverity: 3,
})

const emptyStep = () => ({ id: uid('st'), text: '' })

function safeParse(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

const emptyRams = () => ({
  projectName: '',
  siteAddress: '',
  preparedBy: safeParse('ecsprep_rams_preparedBy') || '',
  assessmentDate: new Date().toISOString().slice(0, 10),
  reviewDate: '',
  activityDescription: '',
  ppe: [],
  hazards: [emptyHazard()],
  methodSteps: [emptyStep()],
  emergencyProcedures: '',
  status: 'draft',
})

// Risk = Likelihood (1-5) x Severity (1-5)
function riskBand(likelihood, severity) {
  const score = (Number(likelihood) || 0) * (Number(severity) || 0)
  if (score >= 15) return { score, label: 'Very High', cls: 'text-white bg-red-600' }
  if (score >= 10) return { score, label: 'High', cls: 'text-white bg-orange-500' }
  if (score >= 5) return { score, label: 'Medium', cls: 'text-gray-900 bg-yellow-300' }
  return { score, label: 'Low', cls: 'text-white bg-green-600' }
}

export default function AdminRams() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // 'list' | 'builder'
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyRams())
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const { rams: list } = await apiRequest('/api/admin/rams')
      setDocs(list)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return docs
    return docs.filter(d =>
      d.number?.toLowerCase().includes(q) ||
      d.projectName?.toLowerCase().includes(q) ||
      d.siteAddress?.toLowerCase().includes(q)
    )
  }, [docs, search])

  const startNew = () => {
    setForm(emptyRams())
    setEditingId(null)
    setError('')
    setView('builder')
  }

  const startEdit = (d) => {
    setForm({
      projectName: d.projectName || '',
      siteAddress: d.siteAddress || '',
      preparedBy: d.preparedBy || '',
      assessmentDate: d.assessmentDate ? d.assessmentDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
      reviewDate: d.reviewDate ? d.reviewDate.slice(0, 10) : '',
      activityDescription: d.activityDescription || '',
      ppe: d.ppe || [],
      hazards: d.hazards?.length ? d.hazards : [emptyHazard()],
      methodSteps: d.methodSteps?.length ? d.methodSteps : [emptyStep()],
      emergencyProcedures: d.emergencyProcedures || '',
      status: d.status || 'draft',
    })
    setEditingId(d.id)
    setError('')
    setView('builder')
  }

  const togglePpe = (item) => {
    setForm(f => ({
      ...f,
      ppe: f.ppe.includes(item) ? f.ppe.filter(p => p !== item) : [...f.ppe, item],
    }))
  }

  const updateHazard = (id, patch) => {
    setForm(f => ({ ...f, hazards: f.hazards.map(h => (h.id === id ? { ...h, ...patch } : h)) }))
  }
  const addHazard = () => setForm(f => ({ ...f, hazards: [...f.hazards, emptyHazard()] }))
  const removeHazard = (id) => setForm(f => ({ ...f, hazards: f.hazards.length > 1 ? f.hazards.filter(h => h.id !== id) : f.hazards }))

  const updateStep = (id, text) => {
    setForm(f => ({ ...f, methodSteps: f.methodSteps.map(s => (s.id === id ? { ...s, text } : s)) }))
  }
  const addStep = () => setForm(f => ({ ...f, methodSteps: [...f.methodSteps, emptyStep()] }))
  const removeStep = (id) => setForm(f => ({ ...f, methodSteps: f.methodSteps.length > 1 ? f.methodSteps.filter(s => s.id !== id) : f.methodSteps }))

  const saveRams = async (statusOverride) => {
    setError('')
    if (!form.projectName.trim()) { setError('Project / site name is required.'); return }
    if (!form.hazards.some(h => h.hazard.trim())) { setError('Add at least one hazard.'); return }

    localStorage.setItem('ecsprep_rams_preparedBy', JSON.stringify(form.preparedBy))
    setSaving(true)
    try {
      const payload = { ...form, status: statusOverride || form.status }
      if (editingId) {
        const { rams } = await apiRequest(`/api/admin/rams/${editingId}`, { method: 'PATCH', body: payload })
        setDocs(list => list.map(d => (d.id === rams.id ? rams : d)))
      } else {
        const { rams } = await apiRequest('/api/admin/rams', { method: 'POST', body: payload })
        setDocs(list => [rams, ...list])
        setEditingId(rams.id)
      }
      setView('list')
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const deleteRams = async (id) => {
    if (!confirm('Delete this RAMS document? This cannot be undone.')) return
    try {
      await apiRequest(`/api/admin/rams/${id}`, { method: 'DELETE' })
      setDocs(list => list.filter(d => d.id !== id))
    } catch (e) { alert(e.message) }
  }

  const printRams = (d) => {
    startEdit(d)
    setTimeout(() => window.print(), 150)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .rams-print-area, .rams-print-area * { visibility: visible; }
          .rams-print-area { position: absolute; top: 0; left: 0; width: 100%; padding: 24px; }
          .no-print { display: none !important; }
        }
      `}</style>

      {view === 'list' ? (
        <>
          <div className="flex items-center justify-between mb-6 no-print">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><ShieldAlert size={24} /> RAMS Generator</h1>
              <p className="text-gray-500 text-sm mt-0.5">Create, manage and print Risk Assessment &amp; Method Statements for jobs or sites</p>
            </div>
            <button
              onClick={startNew}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-secondary rounded-xl hover:opacity-90 transition-opacity"
            >
              <Plus size={16} /> New RAMS
            </button>
          </div>

          <div className="relative mb-4 no-print">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by RAMS number, project or site address…"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400 no-print">Loading RAMS documents…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl no-print">
              <ShieldAlert size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No RAMS documents yet</p>
              <p className="text-gray-400 text-sm mt-1">Create your first Risk Assessment &amp; Method Statement to get started.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden no-print">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold">RAMS No.</th>
                    <th className="text-left px-5 py-3 font-semibold">Project / Site</th>
                    <th className="text-left px-5 py-3 font-semibold">Assessment Date</th>
                    <th className="text-left px-5 py-3 font-semibold">Status</th>
                    <th className="text-right px-5 py-3 font-semibold">Hazards</th>
                    <th className="text-right px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((d) => {
                    const st = STATUS_STYLES[d.status] || STATUS_STYLES.draft
                    const StIcon = st.icon
                    return (
                      <tr key={d.id} className="hover:bg-gray-50">
                        <td className="px-5 py-3 font-semibold text-gray-900">{d.number}</td>
                        <td className="px-5 py-3">
                          <p className="text-gray-900">{d.projectName}</p>
                          <p className="text-gray-400 text-xs">{d.siteAddress}</p>
                        </td>
                        <td className="px-5 py-3 text-gray-500">{d.assessmentDate ? new Date(d.assessmentDate).toLocaleDateString('en-GB') : '—'}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${st.cls}`}>
                            <StIcon size={12} /> {st.label}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-gray-900">{d.hazards?.length || 0}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => printRams(d)} title="Print / Save as PDF" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Printer size={16} /></button>
                            <button onClick={() => startEdit(d)} title="Edit" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={16} /></button>
                            <button onClick={() => deleteRams(d.id)} title="Delete" className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Builder toolbar */}
          <div className="flex items-center justify-between mb-6 no-print">
            <button onClick={() => setView('list')} className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900">
              <ChevronLeft size={16} /> Back to RAMS
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                <Download size={15} /> Print / Save PDF
              </button>
              <button onClick={() => saveRams('draft')} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50">
                <Save size={15} /> Save Draft
              </button>
              <button onClick={() => saveRams('issued')} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-secondary rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
                <Send size={15} /> {saving ? 'Saving…' : 'Save & Issue'}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 text-red-600 text-sm rounded-xl no-print">{error}</div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editable form */}
            <div className="lg:col-span-1 space-y-4 no-print">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Project Details</h3>
                <div className="space-y-2">
                  <input value={form.projectName} onChange={(e) => setForm(f => ({ ...f, projectName: e.target.value }))} placeholder="Project / site name *" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <textarea value={form.siteAddress} onChange={(e) => setForm(f => ({ ...f, siteAddress: e.target.value }))} placeholder="Site address" rows={2} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input value={form.preparedBy} onChange={(e) => setForm(f => ({ ...f, preparedBy: e.target.value }))} placeholder="Prepared by" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500">Assessment date</label>
                      <input type="date" value={form.assessmentDate} onChange={(e) => setForm(f => ({ ...f, assessmentDate: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Review date</label>
                      <input type="date" value={form.reviewDate} onChange={(e) => setForm(f => ({ ...f, reviewDate: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <label className="block text-xs text-gray-500 pt-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {Object.entries(STATUS_STYLES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                  <label className="block text-xs text-gray-500 pt-1">Activity / task description</label>
                  <textarea value={form.activityDescription} onChange={(e) => setForm(f => ({ ...f, activityDescription: e.target.value }))} placeholder="Describe the work being carried out…" rows={3} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Required PPE</h3>
                <div className="grid grid-cols-1 gap-1.5">
                  {PPE_OPTIONS.map((item) => (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" checked={form.ppe.includes(item)} onChange={() => togglePpe(item)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Emergency Procedures</h3>
                <textarea value={form.emergencyProcedures} onChange={(e) => setForm(f => ({ ...f, emergencyProcedures: e.target.value }))} placeholder="First aid, fire, nearest hospital, emergency contacts…" rows={4} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* Live preview / printable document */}
            <div className="lg:col-span-2">
              <div className="rams-print-area bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{form.projectName || 'Project / Site Name'}</h2>
                    {form.siteAddress && <p className="text-sm text-gray-500 whitespace-pre-line mt-1">{form.siteAddress}</p>}
                    {form.preparedBy && <p className="text-sm text-gray-500 mt-1">Prepared by: {form.preparedBy}</p>}
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-gray-900">RAMS</h3>
                    <p className="text-sm text-gray-500 mt-1">{editingId ? docs.find(d => d.id === editingId)?.number : 'Draft — number on save'}</p>
                    {form.assessmentDate && <p className="text-sm text-gray-500">Dated {new Date(form.assessmentDate).toLocaleDateString('en-GB')}</p>}
                    {form.reviewDate && <p className="text-sm text-gray-500">Review by {new Date(form.reviewDate).toLocaleDateString('en-GB')}</p>}
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 mt-2 rounded-full text-xs font-bold ${(STATUS_STYLES[form.status] || STATUS_STYLES.draft).cls}`}>
                      {(STATUS_STYLES[form.status] || STATUS_STYLES.draft).label}
                    </span>
                  </div>
                </div>

                {form.activityDescription && (
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Description of Works</p>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{form.activityDescription}</p>
                  </div>
                )}

                {form.ppe.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1.5">Required PPE</p>
                    <div className="flex flex-wrap gap-1.5">
                      {form.ppe.map((item) => (
                        <span key={item} className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">{item}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risk assessment table */}
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Risk Assessment</p>
                </div>
                <div className="overflow-x-auto -mx-1 mb-2">
                  <table className="w-full text-xs mb-1 min-w-[720px]">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-gray-500 uppercase tracking-wide">
                        <th className="text-left py-2 px-1 font-semibold">Hazard</th>
                        <th className="text-left py-2 px-1 font-semibold">Who's at risk</th>
                        <th className="text-left py-2 px-1 font-semibold">Existing controls</th>
                        <th className="text-center py-2 px-1 font-semibold w-24">Initial Risk<br/>(L×S)</th>
                        <th className="text-left py-2 px-1 font-semibold">Additional controls</th>
                        <th className="text-center py-2 px-1 font-semibold w-24">Residual Risk<br/>(L×S)</th>
                        <th className="w-6 no-print"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.hazards.map((h) => {
                        const initial = riskBand(h.likelihood, h.severity)
                        const residual = riskBand(h.residualLikelihood, h.residualSeverity)
                        return (
                          <tr key={h.id} className="border-b border-gray-100 align-top">
                            <td className="py-2 px-1">
                              <input value={h.hazard} onChange={(e) => updateHazard(h.id, { hazard: e.target.value })} placeholder="e.g. Working at height" className="w-full px-2 py-1.5 text-xs border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg" />
                            </td>
                            <td className="py-2 px-1">
                              <input value={h.whoAtRisk} onChange={(e) => updateHazard(h.id, { whoAtRisk: e.target.value })} className="w-full px-2 py-1.5 text-xs border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg" />
                            </td>
                            <td className="py-2 px-1">
                              <textarea value={h.existingControls} onChange={(e) => updateHazard(h.id, { existingControls: e.target.value })} rows={2} className="w-full px-2 py-1.5 text-xs border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg" />
                            </td>
                            <td className="py-2 px-1">
                              <div className="flex items-center justify-center gap-1 no-print">
                                <select value={h.likelihood} onChange={(e) => updateHazard(h.id, { likelihood: Number(e.target.value) })} className="w-12 px-1 py-1 text-xs border border-gray-200 rounded">
                                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <span>×</span>
                                <select value={h.severity} onChange={(e) => updateHazard(h.id, { severity: Number(e.target.value) })} className="w-12 px-1 py-1 text-xs border border-gray-200 rounded">
                                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                              </div>
                              <div className={`mt-1 mx-auto w-fit px-2 py-0.5 rounded-full font-bold text-center ${initial.cls}`}>{initial.score} · {initial.label}</div>
                            </td>
                            <td className="py-2 px-1">
                              <textarea value={h.additionalControls} onChange={(e) => updateHazard(h.id, { additionalControls: e.target.value })} rows={2} className="w-full px-2 py-1.5 text-xs border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg" />
                            </td>
                            <td className="py-2 px-1">
                              <div className="flex items-center justify-center gap-1 no-print">
                                <select value={h.residualLikelihood} onChange={(e) => updateHazard(h.id, { residualLikelihood: Number(e.target.value) })} className="w-12 px-1 py-1 text-xs border border-gray-200 rounded">
                                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <span>×</span>
                                <select value={h.residualSeverity} onChange={(e) => updateHazard(h.id, { residualSeverity: Number(e.target.value) })} className="w-12 px-1 py-1 text-xs border border-gray-200 rounded">
                                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                              </div>
                              <div className={`mt-1 mx-auto w-fit px-2 py-0.5 rounded-full font-bold text-center ${residual.cls}`}>{residual.score} · {residual.label}</div>
                            </td>
                            <td className="py-2 no-print">
                              <button onClick={() => removeHazard(h.id)} className="p-1 text-gray-400 hover:text-red-600"><X size={14} /></button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <button onClick={addHazard} className="no-print flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 mb-6">
                  <Plus size={14} /> Add hazard
                </button>

                {/* Method statement steps */}
                <div className="mb-2 flex items-center gap-2">
                  <ListChecks size={14} className="text-gray-400" />
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Method Statement — Sequence of Work</p>
                </div>
                <ol className="space-y-2 mb-2 list-decimal list-inside">
                  {form.methodSteps.map((s, idx) => (
                    <li key={s.id} className="flex items-start gap-2 text-sm">
                      <span className="text-gray-400 font-semibold pt-1.5 w-5 text-right no-print">{idx + 1}.</span>
                      <input
                        value={s.text}
                        onChange={(e) => updateStep(s.id, e.target.value)}
                        placeholder={`Step ${idx + 1} — describe the task in sequence`}
                        className="flex-1 px-2 py-1.5 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      />
                      <button onClick={() => removeStep(s.id)} className="no-print p-1 text-gray-400 hover:text-red-600 mt-1"><X size={14} /></button>
                    </li>
                  ))}
                </ol>
                <button onClick={addStep} className="no-print flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 mb-6">
                  <Plus size={14} /> Add step
                </button>

                {form.emergencyProcedures && (
                  <div className="mt-2 mb-6 pt-4 border-t border-gray-100">
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Emergency Procedures</p>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{form.emergencyProcedures}</p>
                  </div>
                )}

                <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-3">Prepared By</p>
                    <p className="text-gray-900">{form.preparedBy || '—'}</p>
                    <div className="mt-6 border-t border-gray-300 pt-1 text-gray-400 text-xs">Signature / Date</div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-3">Read &amp; Understood By (Operative)</p>
                    <p className="text-gray-400">Name: ______________________</p>
                    <div className="mt-6 border-t border-gray-300 pt-1 text-gray-400 text-xs">Signature / Date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

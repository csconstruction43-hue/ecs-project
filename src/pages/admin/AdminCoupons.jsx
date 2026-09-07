// pages/admin/AdminCoupons.jsx
// New feature: Coupon / Discount Code Manager. Create % or flat-amount
// discount codes for the Pro plan, optionally limited by plan, use count,
// or expiry date. Applied by learners on the Checkout page, and by the
// backend at /api/stripe/create-checkout-session (see server/index.js).
import React, { useEffect, useMemo, useState } from 'react'
import {
  Tag, Plus, Trash2, Pencil, X, Search, Percent, PoundSterling,
  Loader2, CheckCircle2, XCircle, Copy,
} from 'lucide-react'
import { apiRequest } from '../../lib/api'

const PLAN_OPTIONS = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'lifetime', label: 'Lifetime' },
]

const emptyForm = () => ({
  code: '',
  type: 'percent',
  value: '',
  maxUses: '',
  expiresAt: '',
  plans: [], // empty = all plans
  active: true,
  note: '',
})

function statusOf(c) {
  if (!c.active) return { label: 'Disabled', cls: 'text-gray-500 bg-gray-100', icon: XCircle }
  if (c.expiresAt && new Date(c.expiresAt).getTime() < Date.now()) return { label: 'Expired', cls: 'text-red-600 bg-red-50', icon: XCircle }
  if (c.maxUses && (c.usedCount || 0) >= c.maxUses) return { label: 'Limit reached', cls: 'text-orange-600 bg-orange-50', icon: XCircle }
  return { label: 'Active', cls: 'text-green-600 bg-green-50', icon: CheckCircle2 }
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [copiedCode, setCopiedCode] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const { coupons: list } = await apiRequest('/api/admin/coupons')
      setCoupons(list)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return coupons
    return coupons.filter(c => c.code?.toLowerCase().includes(q) || c.note?.toLowerCase().includes(q))
  }, [coupons, search])

  const startNew = () => {
    setForm(emptyForm())
    setEditingId(null)
    setError('')
    setShowForm(true)
  }

  const startEdit = (c) => {
    setForm({
      code: c.code,
      type: c.type,
      value: String(c.value),
      maxUses: c.maxUses ? String(c.maxUses) : '',
      expiresAt: c.expiresAt ? c.expiresAt.slice(0, 10) : '',
      plans: c.plans === 'all' ? [] : (c.plans || []),
      active: c.active !== false,
      note: c.note || '',
    })
    setEditingId(c.id)
    setError('')
    setShowForm(true)
  }

  const togglePlan = (planId) => {
    setForm(f => ({
      ...f,
      plans: f.plans.includes(planId) ? f.plans.filter(p => p !== planId) : [...f.plans, planId],
    }))
  }

  const save = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.code.trim()) { setError('Code is required.'); return }
    if (!form.value || Number(form.value) <= 0) { setError('Enter a discount value greater than 0.'); return }
    if (form.type === 'percent' && Number(form.value) > 100) { setError('Percent discount cannot exceed 100.'); return }

    const payload = {
      code: form.code.trim().toUpperCase(),
      type: form.type,
      value: Number(form.value),
      maxUses: form.maxUses ? Number(form.maxUses) : null,
      expiresAt: form.expiresAt || null,
      plans: form.plans,
      active: form.active,
      note: form.note,
    }

    setSaving(true)
    try {
      if (editingId) {
        const { coupon } = await apiRequest(`/api/admin/coupons/${editingId}`, { method: 'PATCH', body: payload })
        setCoupons(list => list.map(c => (c.id === coupon.id ? coupon : c)))
      } else {
        const { coupon } = await apiRequest('/api/admin/coupons', { method: 'POST', body: payload })
        setCoupons(list => [coupon, ...list])
      }
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (c) => {
    if (!confirm(`Delete coupon "${c.code}"? This cannot be undone.`)) return
    try {
      await apiRequest(`/api/admin/coupons/${c.id}`, { method: 'DELETE' })
      setCoupons(list => list.filter(x => x.id !== c.id))
    } catch (e) { alert(e.message) }
  }

  const toggleActive = async (c) => {
    try {
      const { coupon } = await apiRequest(`/api/admin/coupons/${c.id}`, { method: 'PATCH', body: { active: !c.active } })
      setCoupons(list => list.map(x => (x.id === coupon.id ? coupon : x)))
    } catch (e) { alert(e.message) }
  }

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 1500)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Tag size={24} /> Coupons</h1>
          <p className="text-gray-500 text-sm mt-0.5">Create and manage discount codes for the Pro plan checkout</p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-secondary rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> New Coupon
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by code or note…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && !showForm && (
        <div className="mb-4 px-4 py-3 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading coupons…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <Tag size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No coupons yet</p>
          <p className="text-gray-400 text-sm mt-1">Create your first discount code to run a promotion.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Code</th>
                <th className="text-left px-5 py-3 font-semibold">Discount</th>
                <th className="text-left px-5 py-3 font-semibold">Plans</th>
                <th className="text-left px-5 py-3 font-semibold">Uses</th>
                <th className="text-left px-5 py-3 font-semibold">Expires</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
                <th className="text-right px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => {
                const st = statusOf(c)
                const StIcon = st.icon
                return (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-semibold text-gray-900">{c.code}</span>
                        <button onClick={() => copyCode(c.code)} title="Copy code" className="p-1 text-gray-400 hover:text-blue-600">
                          {copiedCode === c.code ? <CheckCircle2 size={13} className="text-green-500" /> : <Copy size={13} />}
                        </button>
                      </div>
                      {c.note && <p className="text-gray-400 text-xs mt-0.5">{c.note}</p>}
                    </td>
                    <td className="px-5 py-3 text-gray-900">
                      <span className="inline-flex items-center gap-1 font-semibold">
                        {c.type === 'percent' ? <Percent size={13} /> : <PoundSterling size={13} />}
                        {c.type === 'percent' ? `${c.value}%` : `£${c.value}`} off
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{c.plans === 'all' ? 'All plans' : c.plans.join(', ')}</td>
                    <td className="px-5 py-3 text-gray-500">{c.usedCount || 0}{c.maxUses ? ` / ${c.maxUses}` : ''}</td>
                    <td className="px-5 py-3 text-gray-500">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('en-GB') : '—'}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => toggleActive(c)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${st.cls}`}
                        title="Click to toggle active/disabled"
                      >
                        <StIcon size={12} /> {st.label}
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEdit(c)} title="Edit" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={16} /></button>
                        <button onClick={() => remove(c)} title="Delete" className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">{editingId ? 'Edit Coupon' : 'New Coupon'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <form onSubmit={save} className="p-6 space-y-4">
              {error && <div className="px-4 py-3 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>}

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Code</label>
                <input
                  value={form.code}
                  onChange={(e) => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                  placeholder="e.g. WELCOME20"
                  className="w-full px-3 py-2 text-sm font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Discount type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="percent">Percent off</option>
                    <option value="flat">Flat amount off (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Value</label>
                  <input
                    type="number" min="1" step="0.01"
                    value={form.value}
                    onChange={(e) => setForm(f => ({ ...f, value: e.target.value }))}
                    placeholder={form.type === 'percent' ? 'e.g. 20' : 'e.g. 5.00'}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Max uses (optional)</label>
                  <input
                    type="number" min="1"
                    value={form.maxUses}
                    onChange={(e) => setForm(f => ({ ...f, maxUses: e.target.value }))}
                    placeholder="Unlimited"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Expires (optional)</label>
                  <input
                    type="date"
                    value={form.expiresAt}
                    onChange={(e) => setForm(f => ({ ...f, expiresAt: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Applies to</label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-1.5 text-sm text-gray-700">
                    <input type="checkbox" checked={form.plans.length === 0} onChange={() => setForm(f => ({ ...f, plans: [] }))} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    All plans
                  </label>
                  {PLAN_OPTIONS.map((p) => (
                    <label key={p.id} className="flex items-center gap-1.5 text-sm text-gray-700">
                      <input type="checkbox" checked={form.plans.includes(p.id)} onChange={() => togglePlan(p.id)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      {p.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Internal note (optional)</label>
                <input
                  value={form.note}
                  onChange={(e) => setForm(f => ({ ...f, note: e.target.value }))}
                  placeholder="e.g. Instagram promo, Sept 2026"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm(f => ({ ...f, active: e.target.checked }))} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Active (visible / usable at checkout)
              </label>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-secondary rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
                  {saving && <Loader2 size={15} className="animate-spin" />} {editingId ? 'Save Changes' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

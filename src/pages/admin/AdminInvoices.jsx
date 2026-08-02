// pages/admin/AdminInvoices.jsx
// Invoice Builder — create, edit, list and print/download invoices for
// students/clients. Invoices are persisted through the backend (see
// server/index.js `/api/admin/invoices*` + server/store.js), the same
// pattern used by every other admin resource in this app.
import React, { useEffect, useMemo, useState } from 'react'
import {
  Receipt, Plus, Trash2, Printer, Download, Pencil, X, Search,
  FileText, ChevronLeft, Save, Send, CheckCircle2, Clock, AlertCircle,
} from 'lucide-react'
import { apiRequest } from '../../lib/api'

const CURRENCIES = { GBP: '£', USD: '$', EUR: '€' }

const STATUS_STYLES = {
  draft: { label: 'Draft', cls: 'text-gray-600 bg-gray-100', icon: FileText },
  sent: { label: 'Sent', cls: 'text-blue-600 bg-blue-50', icon: Clock },
  paid: { label: 'Paid', cls: 'text-green-600 bg-green-50', icon: CheckCircle2 },
  overdue: { label: 'Overdue', cls: 'text-red-600 bg-red-50', icon: AlertCircle },
}

const emptyItem = () => ({ id: `it_${Math.random().toString(36).slice(2, 8)}`, desc: '', qty: 1, price: 0 })

function safeParse(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

const emptyInvoice = () => ({
  from: safeParse('ecsprep_invoice_from') || {
    name: 'ECSPrep Ltd', address: '', email: 'support@electricianprep.co.uk', phone: '',
  },
  client: { name: '', email: '', address: '' },
  items: [emptyItem()],
  taxRate: 0,
  discount: 0,
  currency: 'GBP',
  notes: '',
  dueDate: '',
  status: 'draft',
})

function money(amount, currency) {
  const symbol = CURRENCIES[currency] || '£'
  return `${symbol}${(Number(amount) || 0).toFixed(2)}`
}

function calcTotals(invoice) {
  const subtotal = invoice.items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.price) || 0), 0)
  const discountAmount = subtotal * ((Number(invoice.discount) || 0) / 100)
  const taxable = subtotal - discountAmount
  const taxAmount = taxable * ((Number(invoice.taxRate) || 0) / 100)
  const total = taxable + taxAmount
  return { subtotal, discountAmount, taxAmount, total }
}

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // 'list' | 'builder'
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyInvoice())
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const { invoices: list } = await apiRequest('/api/admin/invoices')
      setInvoices(list)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  const totals = useMemo(() => calcTotals(form), [form])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return invoices
    return invoices.filter(inv =>
      inv.number?.toLowerCase().includes(q) ||
      inv.client?.name?.toLowerCase().includes(q) ||
      inv.client?.email?.toLowerCase().includes(q)
    )
  }, [invoices, search])

  const startNew = () => {
    setForm(emptyInvoice())
    setEditingId(null)
    setError('')
    setView('builder')
  }

  const startEdit = (inv) => {
    setForm({
      from: inv.from || emptyInvoice().from,
      client: inv.client || { name: '', email: '', address: '' },
      items: inv.items?.length ? inv.items : [emptyItem()],
      taxRate: inv.taxRate || 0,
      discount: inv.discount || 0,
      currency: inv.currency || 'GBP',
      notes: inv.notes || '',
      dueDate: inv.dueDate ? inv.dueDate.slice(0, 10) : '',
      status: inv.status || 'draft',
    })
    setEditingId(inv.id)
    setError('')
    setView('builder')
  }

  const updateItem = (id, patch) => {
    setForm(f => ({ ...f, items: f.items.map(it => (it.id === id ? { ...it, ...patch } : it)) }))
  }
  const addItem = () => setForm(f => ({ ...f, items: [...f.items, emptyItem()] }))
  const removeItem = (id) => setForm(f => ({ ...f, items: f.items.length > 1 ? f.items.filter(it => it.id !== id) : f.items }))

  const saveInvoice = async (statusOverride) => {
    setError('')
    if (!form.client.name.trim()) { setError('Client name is required.'); return }
    if (!form.items.some(it => it.desc.trim())) { setError('Add at least one line item with a description.'); return }

    localStorage.setItem('ecsprep_invoice_from', JSON.stringify(form.from))
    setSaving(true)
    try {
      const payload = { ...form, status: statusOverride || form.status }
      if (editingId) {
        const { invoice } = await apiRequest(`/api/admin/invoices/${editingId}`, { method: 'PATCH', body: payload })
        setInvoices(list => list.map(i => (i.id === invoice.id ? invoice : i)))
      } else {
        const { invoice } = await apiRequest('/api/admin/invoices', { method: 'POST', body: payload })
        setInvoices(list => [invoice, ...list])
        setEditingId(invoice.id)
      }
      setView('list')
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const deleteInvoice = async (id) => {
    if (!confirm('Delete this invoice? This cannot be undone.')) return
    try {
      await apiRequest(`/api/admin/invoices/${id}`, { method: 'DELETE' })
      setInvoices(list => list.filter(i => i.id !== id))
    } catch (e) { alert(e.message) }
  }

  const printInvoice = (inv) => {
    startEdit(inv)
    // Wait for the builder (and its print view) to render, then open the
    // browser's print dialog — the .invoice-print-area is the only thing
    // visible thanks to the @media print rules below, so "Save as PDF" in
    // the print dialog produces a clean invoice PDF with no extra setup.
    setTimeout(() => window.print(), 150)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .invoice-print-area, .invoice-print-area * { visibility: visible; }
          .invoice-print-area { position: absolute; top: 0; left: 0; width: 100%; padding: 24px; }
          .no-print { display: none !important; }
        }
      `}</style>

      {view === 'list' ? (
        <>
          <div className="flex items-center justify-between mb-6 no-print">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Receipt size={24} /> Invoice Builder</h1>
              <p className="text-gray-500 text-sm mt-0.5">Create, manage and print invoices for students or clients</p>
            </div>
            <button
              onClick={startNew}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-secondary rounded-xl hover:opacity-90 transition-opacity"
            >
              <Plus size={16} /> New Invoice
            </button>
          </div>

          <div className="relative mb-4 no-print">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by invoice number, client name or email…"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400 no-print">Loading invoices…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl no-print">
              <Receipt size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No invoices yet</p>
              <p className="text-gray-400 text-sm mt-1">Create your first invoice to get started.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden no-print">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold">Invoice</th>
                    <th className="text-left px-5 py-3 font-semibold">Client</th>
                    <th className="text-left px-5 py-3 font-semibold">Due</th>
                    <th className="text-left px-5 py-3 font-semibold">Status</th>
                    <th className="text-right px-5 py-3 font-semibold">Total</th>
                    <th className="text-right px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((inv) => {
                    const t = calcTotals({ ...inv, items: inv.items || [] })
                    const st = STATUS_STYLES[inv.status] || STATUS_STYLES.draft
                    const StIcon = st.icon
                    return (
                      <tr key={inv.id} className="hover:bg-gray-50">
                        <td className="px-5 py-3 font-semibold text-gray-900">{inv.number}</td>
                        <td className="px-5 py-3">
                          <p className="text-gray-900">{inv.client?.name}</p>
                          <p className="text-gray-400 text-xs">{inv.client?.email}</p>
                        </td>
                        <td className="px-5 py-3 text-gray-500">{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString('en-GB') : '—'}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${st.cls}`}>
                            <StIcon size={12} /> {st.label}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-gray-900">{money(t.total, inv.currency)}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => printInvoice(inv)} title="Print / Save as PDF" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Printer size={16} /></button>
                            <button onClick={() => startEdit(inv)} title="Edit" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={16} /></button>
                            <button onClick={() => deleteInvoice(inv.id)} title="Delete" className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
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
              <ChevronLeft size={16} /> Back to invoices
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                <Download size={15} /> Print / Save PDF
              </button>
              <button onClick={() => saveInvoice('draft')} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50">
                <Save size={15} /> Save Draft
              </button>
              <button onClick={() => saveInvoice('sent')} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-secondary rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
                <Send size={15} /> {saving ? 'Saving…' : 'Save & Mark Sent'}
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
                <h3 className="font-semibold text-gray-900 mb-3">From</h3>
                <div className="space-y-2">
                  <input value={form.from.name} onChange={(e) => setForm(f => ({ ...f, from: { ...f.from, name: e.target.value } }))} placeholder="Business name" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input value={form.from.email} onChange={(e) => setForm(f => ({ ...f, from: { ...f.from, email: e.target.value } }))} placeholder="Email" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input value={form.from.phone} onChange={(e) => setForm(f => ({ ...f, from: { ...f.from, phone: e.target.value } }))} placeholder="Phone" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <textarea value={form.from.address} onChange={(e) => setForm(f => ({ ...f, from: { ...f.from, address: e.target.value } }))} placeholder="Address" rows={2} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Bill To</h3>
                <div className="space-y-2">
                  <input value={form.client.name} onChange={(e) => setForm(f => ({ ...f, client: { ...f.client, name: e.target.value } }))} placeholder="Client name *" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input value={form.client.email} onChange={(e) => setForm(f => ({ ...f, client: { ...f.client, email: e.target.value } }))} placeholder="Client email" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <textarea value={form.client.address} onChange={(e) => setForm(f => ({ ...f, client: { ...f.client, address: e.target.value } }))} placeholder="Client address" rows={2} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Details</h3>
                <div className="space-y-2">
                  <label className="block text-xs text-gray-500">Due date</label>
                  <input type="date" value={form.dueDate} onChange={(e) => setForm(f => ({ ...f, dueDate: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <label className="block text-xs text-gray-500 pt-1">Currency</label>
                  <select value={form.currency} onChange={(e) => setForm(f => ({ ...f, currency: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {Object.keys(CURRENCIES).map(c => <option key={c} value={c}>{c} ({CURRENCIES[c]})</option>)}
                  </select>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-xs text-gray-500">Tax %</label>
                      <input type="number" min="0" step="0.1" value={form.taxRate} onChange={(e) => setForm(f => ({ ...f, taxRate: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Discount %</label>
                      <input type="number" min="0" step="0.1" value={form.discount} onChange={(e) => setForm(f => ({ ...f, discount: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <label className="block text-xs text-gray-500 pt-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {Object.entries(STATUS_STYLES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                  <label className="block text-xs text-gray-500 pt-1">Notes</label>
                  <textarea value={form.notes} onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Payment terms, thank-you note, etc." rows={3} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Live preview / printable invoice */}
            <div className="lg:col-span-2">
              <div className="invoice-print-area bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{form.from.name || 'Your Business'}</h2>
                    {form.from.address && <p className="text-sm text-gray-500 whitespace-pre-line mt-1">{form.from.address}</p>}
                    {form.from.email && <p className="text-sm text-gray-500">{form.from.email}</p>}
                    {form.from.phone && <p className="text-sm text-gray-500">{form.from.phone}</p>}
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-gray-900">INVOICE</h3>
                    <p className="text-sm text-gray-500 mt-1">{editingId ? invoices.find(i => i.id === editingId)?.number : 'Draft — number on save'}</p>
                    {form.dueDate && <p className="text-sm text-gray-500">Due {new Date(form.dueDate).toLocaleDateString('en-GB')}</p>}
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 mt-2 rounded-full text-xs font-bold ${(STATUS_STYLES[form.status] || STATUS_STYLES.draft).cls}`}>
                      {(STATUS_STYLES[form.status] || STATUS_STYLES.draft).label}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Bill To</p>
                  <p className="font-semibold text-gray-900">{form.client.name || 'Client name'}</p>
                  {form.client.email && <p className="text-sm text-gray-500">{form.client.email}</p>}
                  {form.client.address && <p className="text-sm text-gray-500 whitespace-pre-line">{form.client.address}</p>}
                </div>

                <table className="w-full text-sm mb-4">
                  <thead>
                    <tr className="border-b-2 border-gray-200 text-gray-500 text-xs uppercase tracking-wide">
                      <th className="text-left py-2 font-semibold">Description</th>
                      <th className="text-right py-2 font-semibold w-20">Qty</th>
                      <th className="text-right py-2 font-semibold w-28">Price</th>
                      <th className="text-right py-2 font-semibold w-28">Amount</th>
                      <th className="w-8 no-print"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.items.map((it) => (
                      <tr key={it.id} className="border-b border-gray-100">
                        <td className="py-2 pr-2">
                          <input
                            value={it.desc}
                            onChange={(e) => updateItem(it.id, { desc: e.target.value })}
                            placeholder="Item description"
                            className="w-full px-2 py-1.5 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg print:border-0"
                          />
                        </td>
                        <td className="py-2">
                          <input
                            type="number" min="0" step="1"
                            value={it.qty}
                            onChange={(e) => updateItem(it.id, { qty: e.target.value })}
                            className="w-20 px-2 py-1.5 text-sm text-right border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                          />
                        </td>
                        <td className="py-2">
                          <input
                            type="number" min="0" step="0.01"
                            value={it.price}
                            onChange={(e) => updateItem(it.id, { price: e.target.value })}
                            className="w-28 px-2 py-1.5 text-sm text-right border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                          />
                        </td>
                        <td className="py-2 text-right font-medium text-gray-900">{money((Number(it.qty) || 0) * (Number(it.price) || 0), form.currency)}</td>
                        <td className="py-2 no-print">
                          <button onClick={() => removeItem(it.id)} className="p-1 text-gray-400 hover:text-red-600"><X size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button onClick={addItem} className="no-print flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 mb-6">
                  <Plus size={14} /> Add line item
                </button>

                <div className="flex justify-end">
                  <div className="w-64 space-y-1.5 text-sm">
                    <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{money(totals.subtotal, form.currency)}</span></div>
                    {Number(form.discount) > 0 && (
                      <div className="flex justify-between text-gray-500"><span>Discount ({form.discount}%)</span><span>-{money(totals.discountAmount, form.currency)}</span></div>
                    )}
                    {Number(form.taxRate) > 0 && (
                      <div className="flex justify-between text-gray-500"><span>Tax ({form.taxRate}%)</span><span>{money(totals.taxAmount, form.currency)}</span></div>
                    )}
                    <div className="flex justify-between text-base font-bold text-gray-900 pt-1.5 border-t border-gray-200">
                      <span>Total</span><span>{money(totals.total, form.currency)}</span>
                    </div>
                  </div>
                </div>

                {form.notes && (
                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Notes</p>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{form.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

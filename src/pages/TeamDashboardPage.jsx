// pages/TeamDashboardPage.jsx
// Team / Employer Card Tracker (Pro feature).
// UK construction/electrical employers who book training for a whole crew
// need one place to see whose ECS card is about to lapse — losing a card
// mid-contract means that worker can be turned away from site. This is a
// lightweight, no-backend-required tracker: data lives per-account in
// localStorage (same pattern as the Study Plan and Card Renewal features),
// so a site manager can keep a private roster without us standing up a
// full multi-user backend for it.
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users, UserPlus, Trash2, Pencil, Download, Upload, X, Save, Building2,
  AlertTriangle, CheckCircle2, Clock, ShieldAlert, Mail, Printer, Send, Loader2,
} from 'lucide-react'
import Seo from '../components/Seo'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../lib/api'
import { daysUntil, renewalStatus } from '../lib/cardRenewal'

const STATUS_STYLES = {
  expired: { label: 'Expired', cls: 'text-red-700 bg-red-50 border-red-200', icon: ShieldAlert },
  urgent: { label: 'Renew urgently', cls: 'text-orange-700 bg-orange-50 border-orange-200', icon: AlertTriangle },
  soon: { label: 'Renew soon', cls: 'text-amber-700 bg-amber-50 border-amber-200', icon: Clock },
  ok: { label: 'Valid', cls: 'text-green-700 bg-green-50 border-green-200', icon: CheckCircle2 },
}

function storageKey(user) {
  const id = user?.email || user?.id || 'guest'
  return `teamRoster:${id}`
}

function loadRoster(user) {
  try {
    const raw = localStorage.getItem(storageKey(user))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const emptyMember = () => ({
  id: `tm_${Math.random().toString(36).slice(2, 9)}`,
  name: '', role: '', email: '', cardType: '', expiryDate: '', notes: '',
})

// New feature: Bulk CSV import — lets an employer paste their existing
// spreadsheet in rather than typing each worker one by one. Expects the
// same columns exportCsv() produces (Name, Role, Card Type, Expiry Date,
// [Days Left], [Status], Notes) but is forgiving about column order and
// only requires a Name column to accept a row.
function parseCsvLine(line) {
  const cells = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++ }
      else if (ch === '"') inQuotes = false
      else cur += ch
    } else if (ch === '"') inQuotes = true
    else if (ch === ',') { cells.push(cur); cur = '' }
    else cur += ch
  }
  cells.push(cur)
  return cells.map((c) => c.trim())
}

// Accepts common date formats (YYYY-MM-DD, DD/MM/YYYY) and normalises to
// the YYYY-MM-DD the rest of this page expects.
function normaliseDate(value) {
  if (!value) return ''
  const v = value.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v
  const dmy = v.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/)
  if (dmy) {
    const [, d, m, y] = dmy
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
  }
  return ''
}

function parseRosterCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length === 0) return { members: [], skipped: 0 }
  const header = parseCsvLine(lines[0]).map((h) => h.toLowerCase())
  const idx = (names) => header.findIndex((h) => names.includes(h))
  const nameIdx = idx(['name', 'full name', 'worker'])
  const roleIdx = idx(['role', 'job title', 'position'])
  const emailIdx = idx(['email', 'email address'])
  const cardIdx = idx(['card type', 'cardtype', 'card'])
  const expiryIdx = idx(['expiry date', 'expiry', 'expires', 'expirydate'])
  const notesIdx = idx(['notes', 'note', 'comment'])

  let skipped = 0
  const members = []
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i])
    const name = (nameIdx >= 0 ? cells[nameIdx] : cells[0] || '').trim()
    if (!name) { skipped++; continue }
    members.push({
      id: `tm_${Date.now()}_${i}_${Math.random().toString(36).slice(2, 6)}`,
      name,
      role: roleIdx >= 0 ? (cells[roleIdx] || '').trim() : '',
      email: emailIdx >= 0 ? (cells[emailIdx] || '').trim() : '',
      cardType: cardIdx >= 0 ? (cells[cardIdx] || '').trim() : '',
      expiryDate: expiryIdx >= 0 ? normaliseDate(cells[expiryIdx]) : '',
      notes: notesIdx >= 0 ? (cells[notesIdx] || '').trim() : '',
    })
  }
  return { members, skipped }
}

function TeamDashboardPage() {
  const { user } = useAuth()
  const [roster, setRoster] = useState(() => loadRoster(user))
  const [editing, setEditing] = useState(null) // member being added/edited, or null
  const [query, setQuery] = useState('')
  const [importSummary, setImportSummary] = useState(null) // { added, skipped } | null
  const fileInputRef = useRef(null)

  // New feature: Employer Team Invitations — real, linked accounts (with
  // genuine test progress) alongside the manually-typed roster above.
  const [members, setMembers] = useState([])
  const [invites, setInvites] = useState([])
  const [linkedLoading, setLinkedLoading] = useState(true)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteName, setInviteName] = useState('')
  const [inviteSending, setInviteSending] = useState(false)
  const [inviteError, setInviteError] = useState('')
  const [reminderSending, setReminderSending] = useState(false)
  const [reminderResult, setReminderResult] = useState(null) // { sent } | null

  const loadLinkedTeam = async () => {
    setLinkedLoading(true)
    try {
      const [{ members }, { invites }] = await Promise.all([
        apiRequest('/api/team/members'),
        apiRequest('/api/team/invites'),
      ])
      setMembers(members)
      setInvites(invites)
    } catch {
      // Non-fatal — the manually-typed roster below still works fine on
      // its own even if this fetch fails (e.g. briefly offline).
    } finally {
      setLinkedLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { loadLinkedTeam() }, [])

  const sendInvite = async (e) => {
    e.preventDefault()
    setInviteError('')
    setInviteSending(true)
    try {
      await apiRequest('/api/team/invite', { method: 'POST', body: { email: inviteEmail.trim(), name: inviteName.trim() } })
      setInviteEmail('')
      setInviteName('')
      await loadLinkedTeam()
    } catch (err) {
      setInviteError(err.message || 'Could not send the invite.')
    } finally {
      setInviteSending(false)
    }
  }

  const cancelInvite = async (id) => {
    try {
      await apiRequest(`/api/team/invites/${id}`, { method: 'DELETE' })
      setInvites((prev) => prev.filter((i) => i.id !== id))
    } catch {
      // ignore — list will self-correct on next reload
    }
  }

  // New feature: bulk renewal reminders — combines manual roster rows and
  // real linked members that have both an email and an upcoming/overdue
  // expiry date, and asks the backend to email all of them in one go.
  const sendRenewalReminders = async () => {
    const dueManual = roster
      .filter((m) => m.email && m.expiryDate && ['expired', 'urgent', 'soon'].includes(renewalStatus(daysUntil(m.expiryDate))))
      .map((m) => ({ name: m.name, email: m.email, cardType: m.cardType, expiryDate: m.expiryDate }))
    if (dueManual.length === 0) {
      setReminderResult({ sent: 0, error: 'No roster members with both an email and a due renewal date were found.' })
      setTimeout(() => setReminderResult(null), 6000)
      return
    }
    setReminderSending(true)
    try {
      const { sent } = await apiRequest('/api/team/send-renewal-reminders', { method: 'POST', body: { recipients: dueManual } })
      setReminderResult({ sent })
    } catch (err) {
      setReminderResult({ sent: 0, error: err.message || 'Could not send reminders.' })
    } finally {
      setReminderSending(false)
      setTimeout(() => setReminderResult(null), 6000)
    }
  }

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(user), JSON.stringify(roster))
    } catch {
      // ignore quota errors
    }
  }, [roster, user])

  const rows = useMemo(() => {
    return roster
      .map((m) => {
        const days = m.expiryDate ? daysUntil(m.expiryDate) : null
        return { ...m, daysLeft: days, status: days === null ? null : renewalStatus(days) }
      })
      .filter((m) => {
        const q = query.trim().toLowerCase()
        if (!q) return true
        return m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.cardType.toLowerCase().includes(q)
      })
      .sort((a, b) => {
        if (a.daysLeft === null) return 1
        if (b.daysLeft === null) return -1
        return a.daysLeft - b.daysLeft
      })
  }, [roster, query])

  const stats = useMemo(() => {
    const withDates = roster.filter((m) => m.expiryDate)
    const expired = withDates.filter((m) => renewalStatus(daysUntil(m.expiryDate)) === 'expired').length
    const dueSoon = withDates.filter((m) => ['urgent', 'soon'].includes(renewalStatus(daysUntil(m.expiryDate)))).length
    return { total: roster.length, expired, dueSoon }
  }, [roster])

  const saveMember = (member) => {
    setRoster((r) => {
      const exists = r.some((m) => m.id === member.id)
      return exists ? r.map((m) => (m.id === member.id ? member : m)) : [...r, member]
    })
    setEditing(null)
  }

  const deleteMember = (id) => {
    if (!window.confirm('Remove this team member from your tracker?')) return
    setRoster((r) => r.filter((m) => m.id !== id))
  }

  const exportCsv = () => {
    const header = ['Name', 'Role', 'Email', 'Card Type', 'Expiry Date', 'Days Left', 'Status', 'Notes']
    const lines = roster.map((m) => {
      const days = m.expiryDate ? daysUntil(m.expiryDate) : ''
      const status = m.expiryDate ? (STATUS_STYLES[renewalStatus(days)]?.label || '') : ''
      return [m.name, m.role, m.email, m.cardType, m.expiryDate, days, status, m.notes]
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    })
    const csv = [header.join(','), ...lines].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `team-card-tracker-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // New feature: Bulk CSV import.
  const handleImportFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const { members, skipped } = parseRosterCsv(String(reader.result || ''))
      if (members.length > 0) {
        setRoster((r) => [...r, ...members])
      }
      setImportSummary({ added: members.length, skipped })
      setTimeout(() => setImportSummary(null), 6000)
    }
    reader.readAsText(file)
    e.target.value = '' // allow re-selecting the same file
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <Seo title="Team Card Tracker | Employer Dashboard" description="Track your whole team's ECS card renewal dates in one place." />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-gray-900">
            <Building2 className="text-primary" size={24} /> Team Card Tracker
          </h1>
          <p className="text-gray-500 text-sm mt-1">Keep every worker's ECS card renewal date in one place — private to your account, stored on this device.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input ref={fileInputRef} type="file" accept=".csv,text/csv" onChange={handleImportFile} className="hidden" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-200 text-sm"
          >
            <Upload size={15} /> Import CSV
          </button>
          <button
            type="button"
            onClick={exportCsv}
            disabled={roster.length === 0}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-200 disabled:opacity-40 text-sm"
          >
            <Download size={15} /> Export CSV
          </button>
          <button
            type="button"
            onClick={sendRenewalReminders}
            disabled={reminderSending}
            className="flex items-center gap-2 bg-amber-50 text-amber-700 font-semibold px-4 py-2.5 rounded-xl hover:bg-amber-100 text-sm disabled:opacity-50"
          >
            {reminderSending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} Send Renewal Reminders
          </button>
          <Link
            to="/team/audit-report"
            state={{ roster, companyName: user?.companyName || '' }}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-200 text-sm"
          >
            <Printer size={15} /> Audit Report
          </Link>
          <button
            type="button"
            onClick={() => setEditing(emptyMember())}
            className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-primary-dark text-sm"
          >
            <UserPlus size={15} /> Add member
          </button>
        </div>
      </div>

      {reminderResult && (
        <div className={`flex items-center gap-2 rounded-xl px-4 py-3 mb-4 text-sm ${reminderResult.error ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {reminderResult.error ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
          {reminderResult.error || `Sent ${reminderResult.sent} renewal reminder email${reminderResult.sent === 1 ? '' : 's'}.`}
        </div>
      )}

      {importSummary && (
        <div className={`flex items-center gap-2 rounded-xl px-4 py-3 mb-4 text-sm ${importSummary.added > 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
          <CheckCircle2 size={16} />
          Imported {importSummary.added} member{importSummary.added === 1 ? '' : 's'}.
          {importSummary.skipped > 0 && ` Skipped ${importSummary.skipped} row${importSummary.skipped === 1 ? '' : 's'} with no name.`}
        </div>
      )}

      {/* New feature: Employer Team Invitations — linked accounts with real
          test progress, separate from the manually-typed roster below. */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
        <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
          <Mail size={18} className="text-primary" /> Invite a Team Member
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Invite a worker by email to link their real ECSPrep account — you'll see their actual best score,
          tests completed, and last activity here, not just a manually-typed guess.
        </p>

        <form onSubmit={sendInvite} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            placeholder="Name (optional)"
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm"
          />
          <input
            type="email"
            required
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="worker@email.com"
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={inviteSending}
            className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-xl hover:bg-primary-dark text-sm disabled:opacity-50 shrink-0"
          >
            {inviteSending ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />} Send Invite
          </button>
        </form>
        {inviteError && <p className="text-red-600 text-xs mb-3">{inviteError}</p>}

        {linkedLoading ? (
          <p className="text-sm text-gray-400 flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading your team…</p>
        ) : (
          <>
            {members.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Linked members ({members.length})</p>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                  {members.map((m) => (
                    <div key={m.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
                      <div>
                        <p className="font-semibold text-gray-900">{m.name}</p>
                        <p className="text-gray-400 text-xs">{m.email}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p>{m.testsCompleted} test{m.testsCompleted === 1 ? '' : 's'} · best {m.bestScore}%</p>
                        {m.lastActive && <p className="text-gray-400">Last active {new Date(m.lastActive).toLocaleDateString('en-GB')}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {invites.filter((i) => i.status === 'pending').length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Pending invites</p>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                  {invites.filter((i) => i.status === 'pending').map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
                      <p className="text-gray-700">{inv.name ? `${inv.name} · ` : ''}{inv.email}</p>
                      <button type="button" onClick={() => cancelInvite(inv.id)} className="text-gray-400 hover:text-red-600 text-xs">Cancel</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>


      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-1"><Users size={13} /> Team size</div>
          <div className="text-2xl font-extrabold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-amber-500 text-xs font-medium mb-1"><Clock size={13} /> Due soon</div>
          <div className="text-2xl font-extrabold text-gray-900">{stats.dueSoon}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-red-500 text-xs font-medium mb-1"><ShieldAlert size={13} /> Expired</div>
          <div className="text-2xl font-extrabold text-gray-900">{stats.expired}</div>
        </div>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, role or card type…"
        className="w-full sm:w-80 border border-gray-300 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30"
      />

      {rows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <Users size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No team members yet.</p>
          <p className="text-gray-400 text-sm mt-1">Add your first worker to start tracking their card renewal date.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Role</th>
                <th className="text-left px-4 py-3">Card type</th>
                <th className="text-left px-4 py-3">Expiry</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((m) => {
                const style = m.status ? STATUS_STYLES[m.status] : null
                const StatusIcon = style?.icon
                return (
                  <tr key={m.id}>
                    <td className="px-4 py-3 font-semibold text-gray-900">{m.name || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{m.role || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{m.cardType || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{m.expiryDate || '—'}</td>
                    <td className="px-4 py-3">
                      {style ? (
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${style.cls}`}>
                          <StatusIcon size={12} /> {style.label}{m.daysLeft >= 0 ? ` · ${m.daysLeft}d` : ''}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">No date set</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setEditing(m)} aria-label={`Edit ${m.name}`} className="text-gray-400 hover:text-primary">
                          <Pencil size={15} />
                        </button>
                        <button type="button" onClick={() => deleteMember(m.id)} aria-label={`Remove ${m.name}`} className="text-gray-400 hover:text-red-600">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{roster.some((m) => m.id === editing.id) ? 'Edit team member' : 'Add team member'}</h2>
              <button type="button" onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-700"><X size={18} /></button>
            </div>
            <form
              className="space-y-3"
              onSubmit={(e) => { e.preventDefault(); saveMember(editing) }}
            >
              <div>
                <label className="text-xs font-semibold text-gray-500">Name</label>
                <input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Role / trade</label>
                <input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} placeholder="e.g. Installation Electrician" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Email (optional — needed to send renewal reminders)</label>
                <input type="email" value={editing.email || ''} onChange={(e) => setEditing({ ...editing, email: e.target.value })} placeholder="worker@email.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Card type</label>
                <input value={editing.cardType} onChange={(e) => setEditing({ ...editing, cardType: e.target.value })} placeholder="e.g. Gold Card" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Card expiry date</label>
                <input type="date" value={editing.expiryDate} onChange={(e) => setEditing({ ...editing, expiryDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Notes</label>
                <textarea value={editing.notes} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1" />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-primary-dark text-sm mt-2">
                <Save size={15} /> Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamDashboardPage

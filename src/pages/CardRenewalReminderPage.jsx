// pages/CardRenewalReminderPage.jsx
// New feature: "Card Renewal Reminder" — a candidate notes their card type
// + the expiry date printed on their physical ECS card, and gets a clear
// countdown plus a dashboard banner as renewal approaches. ECS cards
// require a fresh Health & Safety pass to renew, so this ties straight
// back into practising on the site.
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IdCard, CalendarClock, ShieldAlert, Trash2, ClipboardCheck, Info } from 'lucide-react'
import Seo from '../components/Seo'
import { occupationalCards } from '../data/occupationalCards'
import { loadCardRenewal, saveCardRenewal, clearCardRenewal, daysUntil, renewalStatus } from '../lib/cardRenewal'

const STATUS_COPY = {
  expired: { label: 'Expired', wrap: 'bg-red-50 border-red-200 text-red-800', bar: 'bg-red-500' },
  urgent: { label: 'Renew urgently', wrap: 'bg-red-50 border-red-200 text-red-800', bar: 'bg-red-500' },
  soon: { label: 'Renewal approaching', wrap: 'bg-amber-50 border-amber-200 text-amber-800', bar: 'bg-amber-500' },
  ok: { label: 'Valid', wrap: 'bg-emerald-50 border-emerald-200 text-emerald-800', bar: 'bg-emerald-500' },
}

const cardNames = Array.from(new Set(occupationalCards.map((c) => c.name))).sort()

function CardRenewalReminderPage() {
  const initial = loadCardRenewal()
  const [cardName, setCardName] = useState(initial?.cardName || '')
  const [expiryDate, setExpiryDate] = useState(initial?.expiryDate || '')
  const [saved, setSaved] = useState(initial || null)

  const handleSave = (e) => {
    e.preventDefault()
    if (!expiryDate) return
    saveCardRenewal({ cardName, expiryDate })
    setSaved({ cardName, expiryDate })
  }

  const handleClear = () => {
    clearCardRenewal()
    setCardName('')
    setExpiryDate('')
    setSaved(null)
  }

  const daysLeft = saved ? daysUntil(saved.expiryDate) : null
  const status = saved ? renewalStatus(daysLeft) : null
  const statusCopy = status ? STATUS_COPY[status] : null

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Seo
        title="ECS Card Renewal Reminder | ECSPrep"
        description="Track your ECS card's expiry date and get a reminder before it lapses, so you're never caught out on site."
        path="/card-renewal-reminder"
      />

      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <IdCard className="text-blue-600" size={28} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Card Renewal Reminder</h1>
        <p className="text-slate-500 mt-2 max-w-xl mx-auto">
          Add the expiry date printed on your ECS card and we'll track the countdown for you —
          including a reminder banner on your dashboard once renewal's getting close.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl px-4 py-3 text-sm flex items-start gap-2 mb-8">
        <Info size={18} className="mt-0.5 shrink-0" />
        <span>
          Renewing an ECS card means sitting the ECS Health &amp; Safety assessment again before
          your current card lapses. This reminder is stored on this device only — it's not linked
          to your official ECS/JIB record.
        </span>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-5 mb-6">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1.5 block">Card type (optional)</span>
          <select
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          >
            <option value="">Not sure / other</option>
            {cardNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
            <CalendarClock size={14} className="text-slate-400" /> Expiry date on your card
          </span>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Save reminder
        </button>
      </form>

      {saved && status && (
        <div className={`rounded-2xl border p-6 ${statusCopy.wrap}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide">
              <ShieldAlert size={16} /> {statusCopy.label}
            </span>
            <button onClick={handleClear} className="flex items-center gap-1 text-xs font-medium opacity-70 hover:opacity-100">
              <Trash2 size={13} /> Remove reminder
            </button>
          </div>
          <p className="text-2xl font-extrabold">
            {daysLeft < 0
              ? `Expired ${Math.abs(daysLeft)} day${Math.abs(daysLeft) === 1 ? '' : 's'} ago`
              : daysLeft === 0
                ? 'Expires today'
                : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`}
          </p>
          {saved.cardName && <p className="text-sm opacity-80 mt-1">{saved.cardName}</p>}
          <div className="h-2 rounded-full bg-black/10 mt-4 overflow-hidden">
            <div
              className={`h-full ${statusCopy.bar}`}
              style={{ width: `${Math.max(4, Math.min(100, 100 - (daysLeft / 365) * 100))}%` }}
            />
          </div>

          {(status === 'urgent' || status === 'soon' || status === 'expired') && (
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                to="/ecs-hse-assessment"
                className="flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-inherit font-semibold px-5 py-2.5 rounded-xl border border-current/20 transition"
              >
                <ClipboardCheck size={16} /> Start revising for renewal
              </Link>
              <Link
                to="/ecstestbooking"
                className="flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-inherit font-semibold px-5 py-2.5 rounded-xl border border-current/20 transition"
              >
                Book renewal assessment
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CardRenewalReminderPage

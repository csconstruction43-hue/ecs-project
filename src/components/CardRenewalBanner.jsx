// components/CardRenewalBanner.jsx
// Dashboard banner that nudges a candidate to renew before their ECS card
// expires. Only renders when a reminder has been set (via Card Renewal
// Reminder) AND the expiry is within 90 days (or already passed) — silent
// otherwise so it never clutters the dashboard for someone not close to
// renewal.
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, X, IdCard } from 'lucide-react'
import { loadCardRenewal, daysUntil, renewalStatus, dismissBannerForToday, isBannerDismissedToday } from '../lib/cardRenewal'

const STYLES = {
  expired: { wrap: 'bg-red-50 border-red-200', icon: 'text-red-600', text: 'text-red-800' },
  urgent: { wrap: 'bg-red-50 border-red-200', icon: 'text-red-600', text: 'text-red-800' },
  soon: { wrap: 'bg-amber-50 border-amber-200', icon: 'text-amber-600', text: 'text-amber-800' },
}

function message(status, daysLeft, cardName) {
  const name = cardName || 'ECS card'
  if (status === 'expired') return `Your ${name} expired ${Math.abs(daysLeft)} day${Math.abs(daysLeft) === 1 ? '' : 's'} ago — renew as soon as you can to avoid site access issues.`
  if (status === 'urgent') return `Your ${name} expires in ${daysLeft} day${daysLeft === 1 ? '' : 's'} — book your renewal assessment now.`
  return `Your ${name} expires in ${daysLeft} days — worth booking your renewal assessment soon.`
}

export default function CardRenewalBanner({ className = '' }) {
  const [reminder] = useState(() => loadCardRenewal())
  const [dismissed, setDismissed] = useState(() => isBannerDismissedToday())
  if (!reminder?.expiryDate || dismissed) return null
  const daysLeft = daysUntil(reminder.expiryDate)
  const status = renewalStatus(daysLeft)
  if (status !== 'expired' && status !== 'urgent' && status !== 'soon') return null

  const style = STYLES[status]

  return (
    <div className={`flex items-start gap-3 border rounded-xl p-4 ${style.wrap} ${className}`}>
      <IdCard className={`shrink-0 mt-0.5 ${style.icon}`} size={20} />
      <div className="flex-1 min-w-0">
        <div className={`flex items-center gap-1.5 text-sm font-semibold ${style.text}`}>
          <AlertTriangle size={14} /> Card renewal reminder
        </div>
        <p className={`text-sm mt-0.5 ${style.text}`}>{message(status, daysLeft, reminder.cardName)}</p>
        <div className="flex gap-4 mt-2">
          <Link to="/card-renewal-reminder" className={`text-xs font-semibold underline ${style.text}`}>
            Manage reminder
          </Link>
          <Link to="/ecs-hse-assessment" className={`text-xs font-semibold underline ${style.text}`}>
            Start revising
          </Link>
        </div>
      </div>
      <button
        onClick={() => { dismissBannerForToday(); setDismissed(true) }}
        className={`shrink-0 ${style.icon} hover:opacity-70`}
        aria-label="Dismiss for today"
      >
        <X size={16} />
      </button>
    </div>
  )
}

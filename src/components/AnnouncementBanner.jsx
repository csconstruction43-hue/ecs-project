// components/AnnouncementBanner.jsx
// Sitewide banner controlled from Admin Settings (announcementEnabled/
// announcementMessage/announcementType in /api/settings/public). Rendered
// once in Layout.jsx so it shows under the header on every page. A visitor
// can dismiss it for their current session; it reappears next visit or if
// the admin changes the message.
import React, { useState } from 'react'
import { X, Megaphone, AlertTriangle, CheckCircle2 } from 'lucide-react'

const STYLES = {
  info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: Megaphone },
  success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: CheckCircle2 },
  warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', icon: AlertTriangle },
}

const DISMISS_KEY = 'ecsprep_announcement_dismissed'

const AnnouncementBanner = ({ settings }) => {
  const [dismissedFor, setDismissedFor] = useState(() => {
    if (typeof sessionStorage === 'undefined') return null
    return sessionStorage.getItem(DISMISS_KEY)
  })

  if (!settings?.announcementEnabled || !settings.announcementMessage?.trim()) return null

  // Dismissal is tied to the message text itself, so a new/edited
  // announcement always shows again even if an old one was dismissed.
  if (dismissedFor === settings.announcementMessage) return null

  const style = STYLES[settings.announcementType] || STYLES.info
  const Icon = style.icon

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, settings.announcementMessage)
    setDismissedFor(settings.announcementMessage)
  }

  return (
    <div className={`${style.bg} border-b ${style.border}`}>
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3">
        <Icon size={18} className={`${style.text} shrink-0`} />
        <p className={`text-sm ${style.text} flex-1`}>{settings.announcementMessage}</p>
        <button onClick={dismiss} aria-label="Dismiss announcement" className={`${style.text} hover:opacity-70 shrink-0`}>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default AnnouncementBanner

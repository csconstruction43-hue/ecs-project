// components/FestivalBanner.jsx
// Sitewide "Happy [Festival]!" banner, shown just under the header on
// every page — same slot as AnnouncementBanner, controlled independently
// from Admin -> Festivals (festivalBannerEnabled / festivalBannerDesign /
// festivalDisabledIds in /api/settings/public). Only renders on days that
// fall inside a UK festival's window (see src/data/ukFestivals.js); on any
// other day it renders nothing.
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { getActiveFestival, festivalBannerStyle } from '../lib/festivals'

const DISMISS_KEY = 'ecsprep_festival_dismissed'

const FestivalBanner = ({ settings }) => {
  const [dismissedFor, setDismissedFor] = useState(() => {
    if (typeof sessionStorage === 'undefined') return null
    return sessionStorage.getItem(DISMISS_KEY)
  })

  if (!settings?.festivalBannerEnabled) return null

  const festival = getActiveFestival(new Date(), settings.festivalDisabledIds)
  if (!festival) return null

  // Dismissal is tied to the festival id, so a new festival always shows
  // again even if a previous one was dismissed this session.
  if (dismissedFor === festival.id) return null

  const style = festivalBannerStyle(festival, settings.festivalBannerDesign)

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, festival.id)
    setDismissedFor(festival.id)
  }

  return (
    <div
      className="border-b"
      style={{ background: style.background, borderColor: style.border !== 'none' ? undefined : 'transparent', boxShadow: style.boxShadow, border: style.border }}
    >
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3">
        <span className="text-lg shrink-0" aria-hidden="true">{festival.emoji}</span>
        <p className="text-sm font-medium flex-1" style={{ color: style.color }}>
          {festival.greeting}
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss festival banner"
          className="hover:opacity-70 shrink-0"
          style={{ color: style.accent }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default FestivalBanner

// components/HomeFestivalBanner.jsx
// A bigger, more decorative "pro" version of the festival banner, shown
// only on the home page (see FestivalBanner.jsx for the slim sitewide
// version shown on every other page). Controlled by its own toggle —
// festivalHomeBannerEnabled in Admin -> Festivals — so an admin can run
// the home page banner independently of the sitewide one.
import React, { useEffect, useState } from 'react'
import { apiRequest } from '../lib/api'
import { getActiveFestival, festivalBannerStyle } from '../lib/festivals'

const HomeFestivalBanner = () => {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    let cancelled = false
    apiRequest('/api/settings/public', { auth: false })
      .then((data) => { if (!cancelled) setSettings(data) })
      .catch(() => { if (!cancelled) setSettings(null) })
    return () => { cancelled = true }
  }, [])

  if (!settings?.festivalHomeBannerEnabled) return null

  const festival = getActiveFestival(new Date(), settings.festivalDisabledIds)
  if (!festival) return null

  const style = festivalBannerStyle(festival, settings.festivalBannerDesign)
  const isGradient = (settings.festivalBannerDesign || 'gradient') === 'gradient'

  return (
    <div
      className="relative overflow-hidden rounded-2xl mx-auto max-w-6xl mt-6 px-4 sm:px-4"
    >
      <div
        className="relative rounded-2xl px-6 sm:px-10 py-6 sm:py-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left"
        style={{ background: style.background, border: style.border, boxShadow: style.boxShadow }}
      >
        <span className="text-4xl sm:text-5xl shrink-0" aria-hidden="true">{festival.emoji}</span>
        <div className="flex-1">
          <h2
            className="text-xl sm:text-2xl font-extrabold mb-1"
            style={{ color: style.color }}
          >
            {isGradient ? `Happy ${festival.name}!` : `${festival.emoji} Happy ${festival.name}!`}
          </h2>
          <p className="text-sm sm:text-base" style={{ color: style.color, opacity: isGradient ? 0.95 : 0.8 }}>
            {festival.greeting}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomeFestivalBanner

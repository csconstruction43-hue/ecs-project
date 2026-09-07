// lib/festivals.js
// Works out whether today falls inside any UK festival's window, and
// applies the admin's chosen visual "design" style to it.
import ukFestivals from '../data/ukFestivals'

// Pure function (takes `now` as a param) so it's easy to test / reuse.
export function getActiveFestival(now = new Date(), disabledIds = []) {
  const disabled = new Set(disabledIds || [])
  const year = now.getFullYear()

  for (const festival of ukFestivals) {
    if (disabled.has(festival.id)) continue
    const start = new Date(year, festival.month - 1, festival.day, 0, 0, 0)
    const end = new Date(start)
    end.setDate(end.getDate() + (festival.days || 1))
    if (now >= start && now < end) return festival
  }
  return null
}

// Design presets an admin can pick from in Admin -> Festivals. Each preset
// only changes the visual treatment (gradient vs flat vs bordered vs
// glow) — the festival's own colours (colorFrom/colorTo) always drive the
// actual hues, so switching design never requires re-picking colours.
export const FESTIVAL_DESIGNS = [
  { id: 'gradient', label: 'Gradient banner' },
  { id: 'minimal', label: 'Minimal badge' },
  { id: 'glow', label: 'Soft glow' },
  { id: 'bordered', label: 'Bordered card' },
]

export function festivalBannerStyle(festival, design) {
  const { colorFrom, colorTo } = festival
  switch (design) {
    case 'minimal':
      return {
        background: '#ffffff',
        border: `1px solid ${colorFrom}33`,
        color: '#111827',
        accent: colorFrom,
      }
    case 'glow':
      return {
        background: `${colorFrom}14`,
        border: `1px solid ${colorFrom}40`,
        color: '#111827',
        accent: colorFrom,
        boxShadow: `0 0 24px ${colorFrom}33`,
      }
    case 'bordered':
      return {
        background: '#ffffff',
        border: `2px solid ${colorFrom}`,
        color: '#111827',
        accent: colorFrom,
      }
    case 'gradient':
    default:
      return {
        background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
        border: 'none',
        color: '#ffffff',
        accent: '#ffffff',
      }
  }
}

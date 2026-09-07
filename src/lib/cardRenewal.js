// lib/cardRenewal.js
// Client-side ECS card renewal tracker. An ECS card (and the underlying
// Health & Safety assessment pass) only stays valid for a fixed period —
// renewing means sitting the assessment again — so this lets a candidate
// note their card's expiry date once and get a clear, colour-coded
// countdown + reminder banner wherever it matters, rather than finding out
// their card has lapsed when they're turned away from site.
const STORAGE_KEY = 'ecsCardRenewal'
const DISMISS_KEY = 'ecsCardRenewalDismissedOn'

// Thresholds, in days, that drive the banner's urgency colour.
export const URGENT_THRESHOLD_DAYS = 30
export const SOON_THRESHOLD_DAYS = 90

export function loadCardRenewal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveCardRenewal({ cardName, expiryDate }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cardName, expiryDate }))
    // A newly saved/changed reminder should be able to show the banner
    // again even if an old one was dismissed today.
    localStorage.removeItem(DISMISS_KEY)
  } catch {
    // ignore quota errors
  }
}

export function clearCardRenewal() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(DISMISS_KEY)
  } catch {
    // ignore
  }
}

export function daysUntil(dateStr) {
  if (!dateStr) return null
  const target = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

// 'expired' | 'urgent' (<=30 days) | 'soon' (<=90 days) | 'ok'
export function renewalStatus(daysLeft) {
  if (daysLeft === null) return null
  if (daysLeft < 0) return 'expired'
  if (daysLeft <= URGENT_THRESHOLD_DAYS) return 'urgent'
  if (daysLeft <= SOON_THRESHOLD_DAYS) return 'soon'
  return 'ok'
}

export function dismissBannerForToday() {
  try {
    localStorage.setItem(DISMISS_KEY, new Date().toISOString().slice(0, 10))
  } catch {
    // ignore
  }
}

export function isBannerDismissedToday() {
  try {
    return localStorage.getItem(DISMISS_KEY) === new Date().toISOString().slice(0, 10)
  } catch {
    return false
  }
}

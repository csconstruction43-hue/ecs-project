// lib/ukBankHolidays.js
// Fetches England & Wales bank holidays from the official GOV.UK API
// (https://www.gov.uk/bank-holidays.json — no key required) and caches the
// result in localStorage for 24h so we're not re-fetching on every page
// view. If the fetch fails (offline, blocked, etc.) we fall back to a
// short hardcoded list so the Study Plan feature that depends on this
// still degrades gracefully rather than breaking.
const CACHE_KEY = 'ukBankHolidaysCache'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000
const GOV_UK_ENDPOINT = 'https://www.gov.uk/bank-holidays.json'

// Static fallback — England & Wales bank holidays. Kept short and only
// used when the live API can't be reached; the live source of truth is
// always GOV.UK. Verify at https://www.gov.uk/bank-holidays if this ever
// looks stale.
const FALLBACK_HOLIDAYS = [
  { title: "New Year's Day", date: '2026-01-01' },
  { title: 'Good Friday', date: '2026-04-03' },
  { title: 'Easter Monday', date: '2026-04-06' },
  { title: 'Early May bank holiday', date: '2026-05-04' },
  { title: 'Spring bank holiday', date: '2026-05-25' },
  { title: 'Summer bank holiday', date: '2026-08-31' },
  { title: 'Christmas Day', date: '2026-12-25' },
  { title: 'Boxing Day', date: '2026-12-28' },
  { title: "New Year's Day", date: '2027-01-01' },
]

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.fetchedAt || Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null
    return parsed.events
  } catch {
    return null
  }
}

function writeCache(events) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), events }))
  } catch {
    // ignore quota errors
  }
}

// Returns a promise of [{ title, date }] sorted ascending, England & Wales
// division (the division most relevant to the majority of ECS candidates;
// Scotland/NI have their own separate holidays).
export async function getUkBankHolidays() {
  const cached = readCache()
  if (cached) return cached

  try {
    const res = await fetch(GOV_UK_ENDPOINT)
    if (!res.ok) throw new Error('bad response')
    const data = await res.json()
    const events = (data?.['england-and-wales']?.events || []).map((e) => ({ title: e.title, date: e.date }))
    if (events.length === 0) throw new Error('empty')
    writeCache(events)
    return events
  } catch {
    return FALLBACK_HOLIDAYS
  }
}

// Convenience: is `dateStr` (YYYY-MM-DD) a bank holiday, given an already
// loaded events list?
export function isBankHoliday(dateStr, events) {
  return events.some((e) => e.date === dateStr)
}

// Convenience: the next upcoming bank holiday from `events`, relative to
// today (or null if the cached/fallback list has run out).
export function nextBankHoliday(events, from = new Date()) {
  const todayStr = from.toISOString().slice(0, 10)
  const upcoming = events.filter((e) => e.date >= todayStr).sort((a, b) => a.date.localeCompare(b.date))
  return upcoming[0] || null
}

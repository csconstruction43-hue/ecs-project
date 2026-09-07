// data/ukFestivals.js
// UK festivals/observances shown as a sitewide banner + a bigger "pro"
// banner on the home page. Fixed-date festivals repeat every year; a few
// well-known movable ones (Easter, Eid, Diwali, etc.) are pinned to their
// actual 2026 dates below — an admin should update those specific dates
// each year from Admin -> Festivals (or the entry can just be left off
// until updated).
//
// `days` = how many days the banner stays up starting from `month`/`day`
// (e.g. Diwali festivities, Christmas week). Most are 1.

const ukFestivals = [
  { id: 'new-year', name: "New Year's Day", month: 1, day: 1, days: 1, emoji: '🎉', greeting: "Happy New Year! Wishing you a fresh start and every success this year.", colorFrom: '#6366f1', colorTo: '#a855f7' },
  { id: 'burns-night', name: 'Burns Night', month: 1, day: 25, days: 1, emoji: '🏴', greeting: "Happy Burns Night! Celebrating Scotland's national poet, Robert Burns.", colorFrom: '#1d4ed8', colorTo: '#3b82f6' },
  { id: 'valentines', name: "Valentine's Day", month: 2, day: 14, days: 1, emoji: '💝', greeting: "Happy Valentine's Day! Sending you warmth and good wishes.", colorFrom: '#ec4899', colorTo: '#f43f5e' },
  { id: 'st-davids', name: "St. David's Day", month: 3, day: 1, days: 1, emoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', greeting: "Happy St. David's Day! Wishing our Welsh users a wonderful celebration.", colorFrom: '#059669', colorTo: '#10b981' },
  { id: 'st-patricks', name: "St. Patrick's Day", month: 3, day: 17, days: 1, emoji: '☘️', greeting: "Happy St. Patrick's Day! Wishing you the luck of the Irish.", colorFrom: '#16a34a', colorTo: '#22c55e' },
  { id: 'mothers-day-2026', name: "Mother's Day (UK)", month: 3, day: 15, days: 1, emoji: '💐', greeting: "Happy Mother's Day! Wishing all the mums out there a lovely day.", colorFrom: '#f472b6', colorTo: '#fb7185' },
  { id: 'eid-al-fitr-2026', name: 'Eid al-Fitr', month: 3, day: 20, days: 2, emoji: '🌙', greeting: "Eid Mubarak! Wishing you and your family a joyful Eid al-Fitr.", colorFrom: '#0d9488', colorTo: '#14b8a6' },
  { id: 'st-georges', name: "St. George's Day", month: 4, day: 23, days: 1, emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', greeting: "Happy St. George's Day! Wishing our English users a great celebration.", colorFrom: '#dc2626', colorTo: '#ef4444' },
  { id: 'eid-al-adha-2026', name: 'Eid al-Adha', month: 5, day: 27, days: 2, emoji: '🕌', greeting: "Eid Mubarak! Wishing you a blessed Eid al-Adha.", colorFrom: '#0d9488', colorTo: '#14b8a6' },
  { id: 'fathers-day-2026', name: "Father's Day (UK)", month: 6, day: 21, days: 1, emoji: '👔', greeting: "Happy Father's Day! Wishing all the dads out there a great day.", colorFrom: '#2563eb', colorTo: '#3b82f6' },
  { id: 'diwali-2026', name: 'Diwali', month: 11, day: 8, days: 5, emoji: '🪔', greeting: "Happy Diwali! Wishing you light, joy and prosperity this festive season.", colorFrom: '#f59e0b', colorTo: '#f97316' },
  { id: 'bonfire-night', name: 'Bonfire Night', month: 11, day: 5, days: 1, emoji: '🎆', greeting: "Happy Bonfire Night! Stay safe and enjoy the fireworks.", colorFrom: '#ea580c', colorTo: '#dc2626' },
  { id: 'st-andrews', name: "St. Andrew's Day", month: 11, day: 30, days: 1, emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', greeting: "Happy St. Andrew's Day! Wishing our Scottish users a great celebration.", colorFrom: '#1d4ed8', colorTo: '#3b82f6' },
  { id: 'hanukkah-2026', name: 'Hanukkah', month: 12, day: 5, days: 8, emoji: '🕎', greeting: "Happy Hanukkah! Wishing you a season full of light.", colorFrom: '#2563eb', colorTo: '#60a5fa' },
  { id: 'christmas-eve', name: 'Christmas Eve', month: 12, day: 24, days: 1, emoji: '🎄', greeting: "Merry Christmas Eve! Wishing you a magical evening.", colorFrom: '#dc2626', colorTo: '#16a34a' },
  { id: 'christmas', name: 'Christmas Day', month: 12, day: 25, days: 1, emoji: '🎅', greeting: "Merry Christmas! Wishing you and your family a wonderful day.", colorFrom: '#dc2626', colorTo: '#16a34a' },
  { id: 'boxing-day', name: 'Boxing Day', month: 12, day: 26, days: 1, emoji: '🎁', greeting: "Happy Boxing Day! Hope you're enjoying some well-deserved rest.", colorFrom: '#16a34a', colorTo: '#0d9488' },
  { id: 'new-years-eve', name: "New Year's Eve", month: 12, day: 31, days: 1, emoji: '🥂', greeting: "Happy New Year's Eve! Wishing you a great send-off to the year.", colorFrom: '#6366f1', colorTo: '#a855f7' },
]

export default ukFestivals

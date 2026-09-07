// lib/icsGenerator.js
// Builds a standards-compliant .ics calendar file (RFC 5545) for a UK
// candidate's exam day, so they can add it to Outlook, Google Calendar or
// Apple Calendar in one tap. Dates are treated as Europe/London local time
// (the app doesn't collect a specific time, so this defaults to a
// reasonable all-day-with-reminder event rather than guessing a time slot).

function pad(n) {
  return String(n).padStart(2, '0')
}

// Formats a Date as a UTC "floating" timestamp for the DTSTAMP field.
function toICSDateTimeUTC(date) {
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  )
}

// Formats a plain YYYY-MM-DD string as an ICS all-day DATE value (YYYYMMDD).
function toICSDate(dateStr) {
  return dateStr.replace(/-/g, '')
}

function addDaysToDateStr(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
}

function escapeICS(text = '') {
  return String(text).replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n')
}

// Builds the .ics file content for a single all-day event on `dateStr`
// (YYYY-MM-DD), with a same-morning reminder the day before.
export function buildExamICS({ dateStr, title = 'ECS Test', location = '', description = '' }) {
  if (!dateStr) return null
  const now = new Date()
  const uid = `ecsprep-exam-${dateStr}-${Date.now()}@electricianprep.co.uk`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ECSPrep//Exam Reminder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDateTimeUTC(now)}`,
    `DTSTART;VALUE=DATE:${toICSDate(dateStr)}`,
    `DTEND;VALUE=DATE:${addDaysToDateStr(dateStr, 1)}`,
    `SUMMARY:${escapeICS(title)}`,
    location ? `LOCATION:${escapeICS(location)}` : null,
    `DESCRIPTION:${escapeICS(description || 'Booked via ECSPrep. Bring photo ID, your booking confirmation and arrive at least 15 minutes early.')}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Your ECS test is tomorrow — get an early night and pack your ID.',
    'TRIGGER:-P1D',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)

  return lines.join('\r\n')
}

export function downloadICS(filename, icsContent) {
  if (!icsContent) return
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.ics') ? filename : `${filename}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

# 5 New Features Added

Note: two of your originally-requested items (postcode-based test-centre
distance finder, and spaced-repetition flashcards) were already fully built
in this project (`TestCentreFinderPage.jsx` + `ukTestCentres.js`, and
`studyTools.js`'s Leitner scheduler used by `FlashcardsPage.jsx`) — so those
two were swapped for two other genuinely new, complementary features
(exam-day reminders, and a re-engagement nudge email) to make five real
additions.

## 1. Offline mode with automatic result sync
Mock tests and flashcards already worked with no signal (question data is
bundled into the app). What was missing: a submitted result made while
offline was silently dropped. Now:
- `src/lib/offlineQueue.js` — queues failed submissions in localStorage
- `src/lib/testResults.js` — enqueues on network failure instead of dropping
- `src/components/OfflineStatusBanner.jsx` — shows an offline indicator and
  a "syncing…" / "synced" confirmation, mounted globally in `App.jsx`

## 2. Weekly progress email report
Opt-in from Settings → Notifications. Sends a Sunday email summarising
tests taken, average score, and best score for the week, with an optional
CC to an employer/training coordinator's email address.

## 3. GDPR self-service "Download my data"
Settings → Security → Privacy & Your Data. Downloads a JSON file of the
user's own profile + full activity history — the same shape as the
existing admin export, but self-service under `GET /api/user/export`
(no admin role needed), per UK GDPR Article 20.

## 4. Exam-day reminder emails
Settings → Notifications → set your booked ECS test date. Automatic
reminder emails go out 7, 3, and 1 day(s) before, with quick links to
Mock Test / Wrong Questions / Exam Day Checklist.

## 5. "Keep your momentum" re-engagement nudge
Opt-in. If a candidate hasn't logged a test in 3+ days, a single gentle
reminder email goes out (then a 7-day cooldown before the next one, so it
never nags).

---

## What changed (files)

**Backend** (`server/index.js`):
- `PATCH /api/user/preferences` — save weeklyReportOptIn, employerEmail,
  examDate, reEngagementOptIn
- `GET /api/user/export` — self-service GDPR data export
- `runScheduledNotifications()` — hourly interval job (no new dependency)
  that sends the weekly report, exam reminders, and re-engagement nudges

**Frontend**:
- `src/lib/offlineQueue.js` (new)
- `src/components/OfflineStatusBanner.jsx` (new)
- `src/lib/testResults.js` (edited — offline queue wiring)
- `src/context/AuthContext.jsx` (edited — `updatePreferences`, `exportMyData`)
- `src/pages/SettingsPage.jsx` (edited — new Notifications + Privacy sections)
- `src/App.jsx` (edited — mounts the offline banner globally)

## Setup notes
No new npm packages or environment variables are required — everything
reuses your existing `nodemailer`/SMTP setup and Postgres (JSONB) schema.
Just deploy as usual (`npm run build` on the frontend, restart the
`server/` process) and the scheduler starts automatically ~30 seconds
after the server boots, then checks hourly.

Verified: `npm run build` (frontend) completes cleanly, and `server/index.js`
boots without errors.

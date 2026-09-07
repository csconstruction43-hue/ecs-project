# 5 More New Features Added (Round 2)

Before building anything, the whole codebase (from `ecs-project-with-10-new-features.zip`,
i.e. `NEW-FEATURES-ADDED.md` + `ADMIN-FEATURES-ADDED.md`) was audited to avoid
duplicating what's already there. Several ideas were dropped for that reason —
accessibility mode, text-to-speech, .ics calendar export, referrals, VAT
invoices, and WhatsApp contact all already exist. The five below are
genuinely new gaps.

## 1. Two-Factor Authentication (email OTP)
Settings → Security → "Two-Factor Authentication". When turned on, a 6-digit
code is emailed at every sign-in before a session is issued.
- Backend: `server/index.js` — login now returns `{ requires2FA, pendingToken }`
  instead of a session when the account has 2FA on; `POST /api/auth/2fa/verify`
  and `/resend` complete it. Settings toggle: `POST /api/user/2fa/request-enable`,
  `/confirm-enable`, `/disable`.
- Frontend: `src/context/AuthContext.jsx` (new functions), `src/pages/admin/LoginPage.jsx`
  (OTP-entry step), `src/pages/SettingsPage.jsx` (Security tab toggle).

## 2. Report a Question (moderation queue)
A small "Report an issue" flag under every test question — wrong answer,
typo, outdated info, duplicate, or other — feeding an admin queue so bad
questions get fixed fast instead of quietly costing candidates marks.
- `src/components/ReportQuestionButton.jsx` — wired into `QuestionCard.jsx`
  and `GenericMockTest.jsx` (the shared engine behind most ECS card mock tests).
- Backend: `question_reports` table (`server/store.js`), `POST /api/questions/report`
  (works for guests too), admin CRUD at `/api/admin/question-reports`.
- Admin: `src/pages/admin/AdminQuestionReports.jsx` + sidebar link with an
  open-count badge.

## 3. CSCS/ECS Card Application Tracker
`POST /api/book-card` (the "Book Your ECS Card" form) used to only ever send
an email — nothing was tracked anywhere. It now persists a real application
with a status timeline: Submitted → Documents Verified → HS&E Test Booked →
Test Passed → Card Ordered → Dispatched (plus On Hold / Rejected side states).
- Candidate: `src/pages/CardApplicationTrackerPage.jsx` at `/my-card-application`
  — shows their own timeline, matched by account or by the email they applied with.
- Admin: `src/pages/admin/AdminCardApplications.jsx` — move a candidate through
  stages, which automatically emails them the update.
- Backend: `card_applications` table, `GET /api/user/card-application`,
  `GET/PATCH /api/admin/card-applications`.

## 4. Bulk CSV Import — Team Card Tracker
Employers could only export their roster to CSV before, not import one.
`TeamDashboardPage.jsx` → "Import CSV" now accepts a spreadsheet (Name, Role,
Card Type, Expiry Date, Notes columns, in any order, DD/MM/YYYY or ISO dates)
and adds every valid row to the roster in one go, with an import summary
("Imported 12 members, skipped 1 row with no name"). Frontend-only, same
localStorage-per-account pattern as the rest of this page.

## 5. Smart Practice — Weak Topics Booster
`src/lib/smartPractice.js` aggregates the candidate's existing wrong-answer
history (`wrongQuestionsBank`) by topic and builds a fresh, weighted practice
session from the full question bank — new questions in their weak areas,
not just their old mistakes repeated (that's what "Wrong Questions Only"
already does; this is the complementary feature).
- `src/pages/SmartPracticePage.jsx` at `/smart-practice` — shows the detected
  weak topics, then a 15-question drill with instant feedback and a score summary.

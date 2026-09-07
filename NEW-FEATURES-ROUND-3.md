# 5 More New Features Added (Round 3)

Same approach as Round 2: audited the existing codebase first (now including
`NEW-FEATURES-ROUND-2.md`) to avoid duplicating anything, then picked five
genuine gaps aimed at UK employers/candidates.

## 1. SMS Text Reminders (Twilio)
Settings → Notifications → "SMS Text Reminders". Adds a second channel
alongside the existing email exam-day reminders — useful on site where
signal for email/data is patchy but a text still lands.
- `server/index.js`: `sendSms()` — plain Twilio REST call via `fetch`, no
  new npm dependency. Degrades exactly like `sendEmail()`: if
  `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM_NUMBER` aren't
  set, it just logs and continues.
- New user fields: `phoneNumber` (validated as a UK mobile, normalised to
  `+447…`), `smsRemindersEnabled`. Wired into the existing hourly
  `runScheduledNotifications()` job at the 3-day and 1-day exam reminders.

## 2. Employer Team Invitations (linked accounts)
The Team Dashboard previously only ever held manually-typed roster rows.
Employers can now invite a worker by email; once accepted, the worker's
**real** account data — `bestScore`, `testsCompleted`, `lastActive`
(already tracked via `/api/leaderboard/submit`) — shows up automatically,
no manual entry needed.
- Backend: `team_invites` table, `POST /api/team/invite`,
  `GET /api/team/invites`, `DELETE /api/team/invites/:id`,
  `GET /api/team/invites/:id/public` (no auth — lets the accept page show
  who invited them before login), `POST /api/team/invites/:id/accept`
  (links `employerId` onto the worker's own account), `GET /api/team/members`.
- Frontend: `src/pages/TeamInviteAcceptPage.jsx` at `/team/accept/:inviteId`,
  plus the invite form + linked-members list on `TeamDashboardPage.jsx`.

## 3. Bulk Renewal Reminder Emails
One click on the Team Dashboard ("Send Renewal Reminders") emails everyone
in the roster who has both an email address and a card due for renewal
(expired/urgent/soon) — works for manually-typed rows and linked members
alike, since it's the employer's browser that supplies the recipient list.
- Backend: `POST /api/team/send-renewal-reminders`.
- Frontend: manual roster rows now have an optional `email` field (form,
  CSV import, CSV export all updated).

## 4. Employer Company Profile
Settings → Notifications → "Company Name". A simple branding field used as
the letterhead on the Compliance Audit Report (#5) and referenced in
renewal-reminder emails ("This is a reminder from Acme Electrical…").
- Backend: `companyName` added to `PATCH /api/user/preferences`.

## 5. Compliance Audit Report (printable)
"Audit Report" button on the Team Dashboard generates a timestamped,
company-branded roster document — card type, expiry date, and status for
every worker — for site inductions or client audits. Same zero-dependency
approach as the existing Certificate page: plain HTML/CSS +
`window.print()` ("Save as PDF").
- Frontend only: `src/pages/TeamAuditReportPage.jsx` at `/team/audit-report`.

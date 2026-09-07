# 5 More New Features Added (Round 4 — for Admin)

Same audit-first approach as previous rounds. The admin panel already had
24 pages (users, tickets, invoices, quotes, RAMS, blog, SEO, audit log,
broadcast email, question reports, card applications, etc.), so this round
focused on genuine operational gaps: managing a growing admin team safely,
and everyday admin efficiency.

## 1. Granular Admin Roles
Previously `role` was just `'admin'` or `'user'` — anyone with admin access
could see and do everything, including billing and user management. Now
there are four levels:
- **Full Admin** — everything, unchanged.
- **Support Agent** — Dashboard, Support Tickets, Question Reports, Card
  Applications, Notifications, Courses, Tests, Questions, Blog, Pages,
  SEO Manager, Festivals.
- **Content Editor** — the same content-focused subset.
- **User** — no admin access (default).

A super admin assigns roles from `AdminUserDetail.jsx`. On the backend,
`requireSuperAdmin` (in addition to the existing `requireAdmin`, which now
means "any staff role") gates the sensitive sections: Users, Analytics,
Invoices, Quotes, RAMS, Payment/Course Requests, Broadcast Email, Audit
Log, and Settings — enforced both in the API and in the frontend router
(`ProtectedRoute requireSuperAdmin`) and sidebar (hidden entirely for
lighter roles). Also fixed a bug where the old role-sync-on-login logic
would have quietly reset a manually assigned staff role back to `'user'`
on their next sign-in.

## 2. User Impersonation ("Log in as this user")
From `AdminUserDetail.jsx`, a super admin can view the app exactly as a
given candidate sees it — for debugging a support ticket without ever
asking for their password. Issues a short-lived (1 hour) token for that
account; the admin's own session is stashed client-side and a persistent
amber banner ("You're viewing ECSPrep as X — Return to admin") appears
across the whole site until they exit.
- Backend: `POST /api/admin/users/:id/impersonate` (can't impersonate
  another admin), logged to the audit trail.
- Frontend: `AuthContext.startImpersonation/stopImpersonation`,
  `components/ImpersonationBanner.jsx`.

## 3. Bulk User Actions
`AdminUsers.jsx` previously only had a single "export all as CSV" bulk
action. Added row checkboxes + a "select all" + a bulk action bar to
suspend or reinstate several accounts at once.
- Backend: `POST /api/admin/users/bulk-suspend`.

## 4. Global Admin Search
The header's quick-search box used to only search users. It now searches
users, support tickets, question reports, and card applications in one
box, with a type label per result, scoped to what the caller's role can
actually see (support agents don't get user results, for example).
- Backend: `GET /api/admin/search`.
- Frontend: `AdminQuickSearch` in `components/AdminLayout.jsx`, upgraded
  in place.

## 5. Admin Login Security Alert
Staff accounts hold real power over the platform, so a sign-in from an IP
address we haven't seen before for that account now triggers an email —
"New admin sign-in detected", with the time, IP, and device — separate
from (and complementary to) the optional 2FA added in Round 1.
- Backend: `alertOnUnrecognisedStaffLogin()`, hooked into
  `issueLoginSuccess()`; a rolling list of the last 10 seen IPs is kept per
  staff account (`knownLoginIps`).

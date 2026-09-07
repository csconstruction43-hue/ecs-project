# 2 More New Features Added (Round 5 — for Admin) + Bug Fixes

## 1. Coupon / Discount Code Manager
Admin-managed discount codes for the Pro plan checkout.

- Admin page: **Admin → Coupons** — create a code (e.g. `WELCOME20`), choose
  percent-off or flat-£-off, optionally limit it to specific plans, a max
  number of uses, and/or an expiry date. Toggle a code active/disabled with
  one click, or delete it.
- Checkout page: learners can now type a code before paying. It's validated
  live (`POST /api/coupons/validate`) and the price updates immediately;
  the strikethrough original price + discounted price are both shown.
- On payment, the code is passed to Stripe as a real one-off Stripe Coupon
  (minted automatically from your settings the first time it's used, then
  reused), so the actual charge reflects the discount — not just the UI.
- Usage is only counted once a payment actually completes (via the
  existing Stripe webhook), not merely when checkout starts, so an
  abandoned checkout never eats into a code's use limit.
- Backend: `server/store.js` (`coupons` table) + `server/index.js`
  (`GET/POST/PATCH/DELETE /api/admin/coupons/*`, `POST /api/coupons/validate`,
  coupon handling in `/api/stripe/create-checkout-session` and the
  `checkout.session.completed` webhook case).

## 2. System Health & Backup Center
A read-only ops dashboard plus a one-click full data backup.

- Admin page: **Admin → System Health** — shows whether the database is
  reachable (with response latency), how long the API server has been
  running, and a row-count breakdown across every table (users, activity,
  invoices, tickets, coupons, etc.), so you can spot a stuck migration or a
  runaway table at a glance.
- **Download Full Backup** button streams every table as a single JSON
  file (password hashes are stripped from the `users` table before export,
  so the file itself is never a credential-leak risk). Useful as a
  disaster-recovery safety net or for migrating to a new database.
- Backend: `server/store.js` (`getSystemHealthSnapshot`, `exportFullBackup`)
  + `server/index.js` (`GET /api/admin/system-health`, `GET /api/admin/backup`
  — both `requireSuperAdmin`, and the backup download is logged to the
  admin audit trail).

## Bug fixes in this pass
- `SettingsPage.jsx` and `TeamDashboardPage.jsx` were missing the
  `eslint-disable react-hooks/set-state-in-effect` comment used everywhere
  else in the codebase for the intentional "load data into state on mount"
  pattern — added, so `npx eslint .` now reports 0 functional errors (only
  the pre-existing, cosmetic `react-refresh/only-export-components`
  warnings remain, which don't affect production behaviour — they only
  flag files that export a hook alongside a component, a standard React
  context pattern already used throughout this app).

## Verified before handing back
- `node --check` passed on both `server/index.js` and `server/store.js`.
- Server boots cleanly against a dummy `DATABASE_URL`/`JWT_SECRET`; hitting
  the two new endpoints without a token correctly returns `401` (not a
  crash), confirming they're wired up and auth-gated.
- `npm install && npm run build` completed with no errors — every new
  page (`AdminCoupons`, `AdminSystemHealth`) compiles into its own chunk
  alongside the existing ~200+ pages.
- `npx eslint .` — 0 errors introduced by this round's changes.

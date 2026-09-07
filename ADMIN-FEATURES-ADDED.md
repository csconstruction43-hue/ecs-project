# Admin Panel Updates

## 1. Fixed: "Blog" was missing from the sidebar
`AdminBlog.jsx` and its route already existed in the code, but there was no
link to it in the admin sidebar. Added to `src/components/AdminLayout.jsx`.

## 2. Support Tickets (new)
Inbox for the public Contact page.

- `ContactPage.jsx` now POSTs to `/api/contact` (falls back to opening the
  user's own mail client if the API is unreachable, so nothing is lost).
- Admin page: **Admin → Support Tickets** — filter by open/replied/closed,
  click a message to read it, type a reply and send — this actually emails
  the person back (via the existing `sendEmail` helper) and marks the
  ticket "replied".
- Sidebar badge shows the count of open tickets, same pattern as Course
  Requests / Payment Requests.
- Backend: `server/store.js` (`tickets` table) + `server/index.js`
  (`POST /api/contact`, `GET/PATCH/DELETE /api/admin/tickets/*`).

## 3. Notifications Center (new)
In-app notifications, separate from Broadcast Email (which sends real
emails) — these show up under a new bell icon in the site header.

- Admin page: **Admin → Notifications** — compose a title + message, send
  to all users or search for one specific user, pick a type (info / success
  / warning), see a history of what's been sent with a live "X read" count.
- User-facing: new `NotificationBell` component in the header (desktop +
  mobile) — shows an unread badge, opens a dropdown, marks as read on
  click. Only renders for logged-in users.
- Backend: `server/store.js` (`notifications` + `notification_reads`
  tables) + `server/index.js` (`POST/GET/DELETE /api/admin/notifications`,
  `GET /api/notifications`, `GET /api/notifications/unread-count`,
  `POST /api/notifications/:id/read`).

## 4. SEO Manager (new)
- Admin page: **Admin → SEO Manager** — two panels:
  - **Sitewide defaults**: fallback meta description, default OG image
    path, Twitter handle, Google Search Console verification code (this one
    is actually injected sitewide as a `<meta name="google-site-verification">`
    tag automatically), and a "stop indexing the whole site" switch for
    staging (forces `noindex, nofollow` everywhere when on).
  - **Sitemap status**: live fetch + parse of `/sitemap.xml` — shows the
    total URL count and lists the first 25 entries, each clickable.
- These settings reuse the existing `settings` table/endpoint
  (`PATCH /api/admin/settings`) — no new table needed. Per-page titles and
  descriptions still come from each page's own `<Seo />` component; these
  are sitewide fallbacks/reference values, not overrides.

## Verified before handing back
- `node --check` passed on both `server/index.js` and `server/store.js`.
- Full `npm install && npm run build` completed with no errors — every new
  page and component compiles cleanly alongside the existing ~200 pages.

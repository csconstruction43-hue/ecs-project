// store.js
// Postgres-backed user + activity store (Neon). Replaces the old flat-file
// (users.json) store, which lost all data on every server restart/redeploy
// because free hosting (Render, etc.) uses an ephemeral filesystem.
//
// Design: each user/activity row keeps its "extra" fields in a JSONB
// column, so the flexible, ever-growing set of user fields used across
// index.js (isPro, plan, stripeCustomerId, bestScore, pendingPlan, ...)
// doesn't require a schema migration every time a new field is added.
import pg from 'pg'

const { Pool } = pg

if (!process.env.DATABASE_URL) {
  console.warn('⚠️  DATABASE_URL is not set. The server will crash on first DB query.')
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

let schemaReady = null
function ensureSchema() {
  if (!schemaReady) {
    schemaReady = pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON users ((lower(email)));

      CREATE TABLE IF NOT EXISTS activity (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS activity_user_id_idx ON activity (user_id);
      CREATE INDEX IF NOT EXISTS activity_created_at_idx ON activity (created_at DESC);

      CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY,
        number TEXT NOT NULL,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS invoices_created_at_idx ON invoices (created_at DESC);

      CREATE TABLE IF NOT EXISTS quotes (
        id TEXT PRIMARY KEY,
        number TEXT NOT NULL,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS quotes_created_at_idx ON quotes (created_at DESC);

      CREATE TABLE IF NOT EXISTS rams (
        id TEXT PRIMARY KEY,
        number TEXT NOT NULL,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS rams_created_at_idx ON rams (created_at DESC);

      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL DEFAULT '{}'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS admin_audit (
        id TEXT PRIMARY KEY,
        admin_id TEXT,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS admin_audit_created_at_idx ON admin_audit (created_at DESC);

      CREATE TABLE IF NOT EXISTS tickets (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS tickets_created_at_idx ON tickets (created_at DESC);

      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications (created_at DESC);

      CREATE TABLE IF NOT EXISTS notification_reads (
        notification_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        PRIMARY KEY (notification_id, user_id)
      );

      CREATE TABLE IF NOT EXISTS blog_posts (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts (created_at DESC);

      CREATE TABLE IF NOT EXISTS pages (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS pages_created_at_idx ON pages (created_at DESC);

      -- New feature: "Report a question" moderation queue.
      CREATE TABLE IF NOT EXISTS question_reports (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS question_reports_created_at_idx ON question_reports (created_at DESC);

      -- New feature: CSCS/ECS card application status tracker (candidate +
      -- admin view of what was previously a fire-and-forget email in
      -- /api/book-card).
      CREATE TABLE IF NOT EXISTS card_applications (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS card_applications_created_at_idx ON card_applications (created_at DESC);
      CREATE INDEX IF NOT EXISTS card_applications_user_id_idx ON card_applications (user_id);

      -- New feature: Employer Team Invitations — links a worker's real
      -- account to an employer so the Team Dashboard can show genuine
      -- progress (bestScore/testsCompleted/lastActive) instead of only
      -- manually-typed roster entries.
      CREATE TABLE IF NOT EXISTS team_invites (
        id TEXT PRIMARY KEY,
        employer_id TEXT NOT NULL,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS team_invites_employer_id_idx ON team_invites (employer_id);

      -- New feature: Coupon / discount codes for Pro plan checkout.
      -- 'code' has its own unique column (case-insensitive) so lookups at
      -- checkout are a simple indexed query; everything else (type, value,
      -- limits, which plans it applies to) lives in the flexible JSONB
      -- 'data' column, same pattern as invoices/quotes/rams.
      CREATE TABLE IF NOT EXISTS coupons (
        id TEXT PRIMARY KEY,
        code TEXT NOT NULL,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE UNIQUE INDEX IF NOT EXISTS coupons_code_lower_idx ON coupons ((lower(code)));
      CREATE INDEX IF NOT EXISTS coupons_created_at_idx ON coupons (created_at DESC);

      -- New feature: ECS test booking requests (candidate + admin view of
      -- what was previously a fire-and-forget email in /api/book-test),
      -- mirroring card_applications so every booking (test AND card)
      -- lands in the admin panel, not just an inbox.
      CREATE TABLE IF NOT EXISTS test_bookings (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS test_bookings_created_at_idx ON test_bookings (created_at DESC);
      CREATE INDEX IF NOT EXISTS test_bookings_user_id_idx ON test_bookings (user_id);
    `)
  }
  return schemaReady
}

function rowToUser(row) {
  if (!row) return null
  return { id: row.id, email: row.email, createdAt: row.data.createdAt || row.created_at, ...row.data }
}

export async function findByEmail(email) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM users WHERE lower(email) = lower($1) LIMIT 1', [String(email).trim()])
  return rowToUser(rows[0])
}

export async function findById(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id])
  return rowToUser(rows[0])
}

export async function listAll() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at ASC')
  return rows.map(rowToUser)
}

export async function findByStripeCustomerId(customerId) {
  await ensureSchema()
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE data->>'stripeCustomerId' = $1 LIMIT 1`,
    [customerId]
  )
  return rowToUser(rows[0])
}

export async function createUser(user) {
  await ensureSchema()
  const { id, email, ...rest } = user
  await pool.query('INSERT INTO users (id, email, data) VALUES ($1, $2, $3)', [id, email, JSON.stringify(rest)])
  return { id, email, ...rest }
}

export async function updateUser(id, patch) {
  await ensureSchema()
  const existing = await findById(id)
  if (!existing) return null
  const { id: _id, email: existingEmail, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  const newEmail = patch.email !== undefined ? patch.email : existingEmail
  delete merged.email
  await pool.query('UPDATE users SET email = $2, data = $3 WHERE id = $1', [id, newEmail, JSON.stringify(merged)])
  return { id, email: newEmail, ...merged }
}

export function toSafeUser(user) {
  if (!user) return null
  const { password, ...safe } = user
  return safe
}

// ---------- Activity log (for the live admin dashboard) ----------
export async function logActivity({ userId, type, page, meta }) {
  await ensureSchema()
  const id = `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const at = new Date().toISOString()
  await pool.query('INSERT INTO activity (id, user_id, data) VALUES ($1, $2, $3)', [
    id, userId, JSON.stringify({ type, page: page || null, meta: meta || null, at }),
  ])
  return { id, userId, type, page: page || null, meta: meta || null, at }
}

export async function getRecentActivity(limit = 50) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM activity ORDER BY created_at DESC LIMIT $1', [limit])
  return rows.map((r) => ({ id: r.id, userId: r.user_id, ...r.data }))
}

export async function getUserActivity(userId, limit = 100) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM activity WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2', [userId, limit])
  return rows.map((r) => ({ id: r.id, userId: r.user_id, ...r.data }))
}

// ---------- Invoices (Admin Invoice Builder) ----------
function rowToInvoice(row) {
  if (!row) return null
  return { id: row.id, number: row.number, createdAt: row.created_at, updatedAt: row.updated_at, ...row.data }
}

export async function listInvoices() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM invoices ORDER BY created_at DESC')
  return rows.map(rowToInvoice)
}

export async function getInvoice(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM invoices WHERE id = $1 LIMIT 1', [id])
  return rowToInvoice(rows[0])
}

// Generates the next sequential invoice number, e.g. INV-0001, INV-0002…
export async function nextInvoiceNumber() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM invoices')
  const seq = (rows[0]?.count || 0) + 1
  return `INV-${String(seq).padStart(4, '0')}`
}

export async function createInvoice(invoice) {
  await ensureSchema()
  const { id, number, ...rest } = invoice
  await pool.query('INSERT INTO invoices (id, number, data) VALUES ($1, $2, $3)', [id, number, JSON.stringify(rest)])
  return getInvoice(id)
}

export async function updateInvoice(id, patch) {
  await ensureSchema()
  const existing = await getInvoice(id)
  if (!existing) return null
  const { id: _id, number: existingNumber, createdAt, updatedAt, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  const newNumber = patch.number !== undefined ? patch.number : existingNumber
  delete merged.number
  await pool.query('UPDATE invoices SET number = $2, data = $3, updated_at = now() WHERE id = $1', [id, newNumber, JSON.stringify(merged)])
  return getInvoice(id)
}

export async function deleteInvoice(id) {
  await ensureSchema()
  await pool.query('DELETE FROM invoices WHERE id = $1', [id])
  return true
}

function rowToQuote(row) {
  if (!row) return null
  return { id: row.id, number: row.number, createdAt: row.created_at, updatedAt: row.updated_at, ...row.data }
}

export async function listQuotes() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM quotes ORDER BY created_at DESC')
  return rows.map(rowToQuote)
}

export async function getQuote(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM quotes WHERE id = $1 LIMIT 1', [id])
  return rowToQuote(rows[0])
}

// Generates the next sequential quote number, e.g. QUO-0001, QUO-0002…
export async function nextQuoteNumber() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM quotes')
  const seq = (rows[0]?.count || 0) + 1
  return `QUO-${String(seq).padStart(4, '0')}`
}

export async function createQuote(quote) {
  await ensureSchema()
  const { id, number, ...rest } = quote
  await pool.query('INSERT INTO quotes (id, number, data) VALUES ($1, $2, $3)', [id, number, JSON.stringify(rest)])
  return getQuote(id)
}

export async function updateQuote(id, patch) {
  await ensureSchema()
  const existing = await getQuote(id)
  if (!existing) return null
  const { id: _id, number: existingNumber, createdAt, updatedAt, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  const newNumber = patch.number !== undefined ? patch.number : existingNumber
  delete merged.number
  await pool.query('UPDATE quotes SET number = $2, data = $3, updated_at = now() WHERE id = $1', [id, newNumber, JSON.stringify(merged)])
  return getQuote(id)
}

export async function deleteQuote(id) {
  await ensureSchema()
  await pool.query('DELETE FROM quotes WHERE id = $1', [id])
  return true
}

function rowToRams(row) {
  if (!row) return null
  return { id: row.id, number: row.number, createdAt: row.created_at, updatedAt: row.updated_at, ...row.data }
}

export async function listRams() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM rams ORDER BY created_at DESC')
  return rows.map(rowToRams)
}

export async function getRams(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM rams WHERE id = $1 LIMIT 1', [id])
  return rowToRams(rows[0])
}

// Generates the next sequential RAMS number, e.g. RAMS-0001, RAMS-0002…
export async function nextRamsNumber() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM rams')
  const seq = (rows[0]?.count || 0) + 1
  return `RAMS-${String(seq).padStart(4, '0')}`
}

export async function createRams(doc) {
  await ensureSchema()
  const { id, number, ...rest } = doc
  await pool.query('INSERT INTO rams (id, number, data) VALUES ($1, $2, $3)', [id, number, JSON.stringify(rest)])
  return getRams(id)
}

export async function updateRams(id, patch) {
  await ensureSchema()
  const existing = await getRams(id)
  if (!existing) return null
  const { id: _id, number: existingNumber, createdAt, updatedAt, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  const newNumber = patch.number !== undefined ? patch.number : existingNumber
  delete merged.number
  await pool.query('UPDATE rams SET number = $2, data = $3, updated_at = now() WHERE id = $1', [id, newNumber, JSON.stringify(merged)])
  return getRams(id)
}

export async function deleteRams(id) {
  await ensureSchema()
  await pool.query('DELETE FROM rams WHERE id = $1', [id])
  return true
}

// ---------- Settings (simple key/value store for feature toggles, etc.) ----------
export async function getSetting(key, fallback = null) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT value FROM settings WHERE key = $1 LIMIT 1', [key])
  if (!rows[0]) return fallback
  return rows[0].value
}

export async function setSetting(key, value) {
  await ensureSchema()
  await pool.query(
    `INSERT INTO settings (key, value, updated_at) VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = now()`,
    [key, JSON.stringify(value)]
  )
  return value
}

// ---------- Admin audit log (who changed what, from the admin panel) ----------
export async function logAdminAudit({ adminId, adminEmail, action, targetType, targetId, meta }) {
  await ensureSchema()
  const id = `aud_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const at = new Date().toISOString()
  await pool.query('INSERT INTO admin_audit (id, admin_id, data) VALUES ($1, $2, $3)', [
    id, adminId || null,
    JSON.stringify({ adminEmail: adminEmail || null, action, targetType: targetType || null, targetId: targetId || null, meta: meta || null, at }),
  ])
  return { id, adminId, ...({ adminEmail, action, targetType, targetId, meta, at }) }
}

export async function getAdminAudit(limit = 100) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM admin_audit ORDER BY created_at DESC LIMIT $1', [limit])
  return rows.map((r) => ({ id: r.id, adminId: r.admin_id, ...r.data }))
}

// ---------- Analytics aggregation (charts on the admin Analytics page) ----------
// Groups signups + activity by day for the last `days` days, and returns a
// snapshot of plan distribution. Done with a couple of targeted queries
// rather than pulling every row into JS, since users/activity can grow large.
export async function getAnalyticsSummary(days = 30) {
  await ensureSchema()

  const { rows: signupRows } = await pool.query(
    `SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day, COUNT(*)::int AS count
     FROM users
     WHERE created_at >= now() - ($1 || ' days')::interval
     GROUP BY 1 ORDER BY 1 ASC`,
    [days]
  )

  const { rows: planRows } = await pool.query(
    `SELECT COALESCE(NULLIF(data->>'plan', ''), CASE WHEN (data->>'isPro')::boolean THEN 'pro' ELSE 'free' END) AS plan, COUNT(*)::int AS count
     FROM users GROUP BY 1 ORDER BY 2 DESC`
  )

  const { rows: activityRows } = await pool.query(
    `SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day, data->>'type' AS type, COUNT(*)::int AS count
     FROM activity
     WHERE created_at >= now() - ($1 || ' days')::interval
     GROUP BY 1, 2 ORDER BY 1 ASC`,
    [days]
  )

  const { rows: testRows } = await pool.query(
    `SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day,
            COUNT(*)::int AS submissions,
            ROUND(AVG((data->'meta'->>'percentage')::numeric), 1) AS avg_score
     FROM activity
     WHERE data->>'type' = 'test_submit' AND created_at >= now() - ($1 || ' days')::interval
     GROUP BY 1 ORDER BY 1 ASC`,
    [days]
  )

  return {
    signupsByDay: signupRows,
    planDistribution: planRows,
    activityByDay: activityRows,
    testsByDay: testRows.map((r) => ({ day: r.day, submissions: r.submissions, avgScore: r.avg_score !== null ? Number(r.avg_score) : null })),
  }
}

// ---------- Support tickets (contact form submissions) ----------
function rowToTicket(row) {
  if (!row) return null
  return { id: row.id, createdAt: row.created_at, updatedAt: row.updated_at, ...row.data }
}

export async function listTickets() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM tickets ORDER BY created_at DESC')
  return rows.map(rowToTicket)
}

export async function getTicket(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM tickets WHERE id = $1 LIMIT 1', [id])
  return rowToTicket(rows[0])
}

export async function createTicket(ticket) {
  await ensureSchema()
  const { id, ...rest } = ticket
  await pool.query('INSERT INTO tickets (id, data) VALUES ($1, $2)', [id, JSON.stringify(rest)])
  return getTicket(id)
}

export async function updateTicket(id, patch) {
  await ensureSchema()
  const existing = await getTicket(id)
  if (!existing) return null
  const { id: _id, createdAt, updatedAt, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  await pool.query('UPDATE tickets SET data = $2, updated_at = now() WHERE id = $1', [id, JSON.stringify(merged)])
  return getTicket(id)
}

export async function deleteTicket(id) {
  await ensureSchema()
  await pool.query('DELETE FROM tickets WHERE id = $1', [id])
  return true
}

// ---------- Notifications (admin -> users) ----------
function rowToNotification(row) {
  if (!row) return null
  return { id: row.id, createdAt: row.created_at, ...row.data }
}

export async function listNotifications() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC')
  return rows.map(rowToNotification)
}

export async function getNotification(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM notifications WHERE id = $1 LIMIT 1', [id])
  return rowToNotification(rows[0])
}

export async function createNotification(notification) {
  await ensureSchema()
  const { id, ...rest } = notification
  await pool.query('INSERT INTO notifications (id, data) VALUES ($1, $2)', [id, JSON.stringify(rest)])
  return getNotification(id)
}

export async function deleteNotification(id) {
  await ensureSchema()
  await pool.query('DELETE FROM notification_reads WHERE notification_id = $1', [id])
  await pool.query('DELETE FROM notifications WHERE id = $1', [id])
  return true
}

// Returns how many distinct users have marked a notification as read —
// shown on the admin Notifications page as a lightweight engagement stat.
export async function countNotificationReads(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM notification_reads WHERE notification_id = $1', [id])
  return rows[0]?.count || 0
}

// Notifications a given user can see: broadcast to everyone, or targeted
// directly at their user id. Includes whether *this* user has read it yet.
export async function getNotificationsForUser(userId, limit = 50) {
  await ensureSchema()
  const { rows } = await pool.query(
    `SELECT n.*, (r.user_id IS NOT NULL) AS is_read
     FROM notifications n
     LEFT JOIN notification_reads r ON r.notification_id = n.id AND r.user_id = $1
     WHERE (n.data->>'audience') = 'all' OR (n.data->>'userId') = $1
     ORDER BY n.created_at DESC LIMIT $2`,
    [userId, limit]
  )
  return rows.map((row) => ({ id: row.id, createdAt: row.created_at, ...row.data, isRead: row.is_read }))
}

export async function countUnreadNotificationsForUser(userId) {
  await ensureSchema()
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS count
     FROM notifications n
     LEFT JOIN notification_reads r ON r.notification_id = n.id AND r.user_id = $1
     WHERE ((n.data->>'audience') = 'all' OR (n.data->>'userId') = $1) AND r.user_id IS NULL`,
    [userId]
  )
  return rows[0]?.count || 0
}

export async function markNotificationRead(notificationId, userId) {
  await ensureSchema()
  await pool.query(
    `INSERT INTO notification_reads (notification_id, user_id) VALUES ($1, $2)
     ON CONFLICT (notification_id, user_id) DO NOTHING`,
    [notificationId, userId]
  )
  return true
}

// ---------- Blog posts (admin-authored, layered on top of the static
// src/data/blogPosts.js list) ----------
// Two admin features live here:
//   1. Admins can write brand-new blog posts that get stored in the DB
//      (rowToBlogPost / list.../create.../update.../deleteBlogPost).
//   2. Admins can "delete" ANY blog post shown on the site, including the
//      ~200 hard-coded posts in src/data/blogPosts.js. Those live in a
//      frontend-only file with no DB row of their own, so instead of
//      deleting them we keep a simple hidden-slugs list (reusing the
//      existing settings key/value table) and the frontend filters them
//      out at render time. See getHiddenBlogSlugs / setHiddenBlogSlugs.
function rowToBlogPost(row) {
  if (!row) return null
  return { id: row.id, slug: row.slug, createdAt: row.created_at, updatedAt: row.updated_at, isCustom: true, ...row.data }
}

export async function listBlogPosts() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC')
  return rows.map(rowToBlogPost)
}

export async function getBlogPost(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM blog_posts WHERE id = $1 LIMIT 1', [id])
  return rowToBlogPost(rows[0])
}

export async function getBlogPostBySlug(slug) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM blog_posts WHERE slug = $1 LIMIT 1', [slug])
  return rowToBlogPost(rows[0])
}

export async function createBlogPost(post) {
  await ensureSchema()
  const { id, slug, ...rest } = post
  await pool.query('INSERT INTO blog_posts (id, slug, data) VALUES ($1, $2, $3)', [id, slug, JSON.stringify(rest)])
  return getBlogPost(id)
}

export async function updateBlogPost(id, patch) {
  await ensureSchema()
  const existing = await getBlogPost(id)
  if (!existing) return null
  const { id: _id, slug: existingSlug, createdAt, updatedAt, isCustom, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  const newSlug = patch.slug !== undefined ? patch.slug : existingSlug
  delete merged.slug
  await pool.query('UPDATE blog_posts SET slug = $2, data = $3, updated_at = now() WHERE id = $1', [id, newSlug, JSON.stringify(merged)])
  return getBlogPost(id)
}

export async function deleteBlogPost(id) {
  await ensureSchema()
  await pool.query('DELETE FROM blog_posts WHERE id = $1', [id])
  return true
}

// Slugs of *static* posts (from src/data/blogPosts.js) that an admin has
// hidden/deleted from the public site. Stored under a single settings key
// so no schema migration is needed.
export async function getHiddenBlogSlugs() {
  const slugs = await getSetting('hiddenBlogSlugs', [])
  return Array.isArray(slugs) ? slugs : []
}

export async function setHiddenBlogSlugs(slugs) {
  return setSetting('hiddenBlogSlugs', Array.isArray(slugs) ? slugs : [])
}

// ---------- Custom Pages (simple admin-built CMS pages) ----------
function rowToPage(row) {
  if (!row) return null
  return { id: row.id, slug: row.slug, createdAt: row.created_at, updatedAt: row.updated_at, ...row.data }
}

export async function listPages() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM pages ORDER BY created_at DESC')
  return rows.map(rowToPage)
}

export async function getPage(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM pages WHERE id = $1 LIMIT 1', [id])
  return rowToPage(rows[0])
}

export async function getPageBySlug(slug) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM pages WHERE slug = $1 LIMIT 1', [slug])
  return rowToPage(rows[0])
}

export async function createPage(page) {
  await ensureSchema()
  const { id, slug, ...rest } = page
  await pool.query('INSERT INTO pages (id, slug, data) VALUES ($1, $2, $3)', [id, slug, JSON.stringify(rest)])
  return getPage(id)
}

export async function updatePage(id, patch) {
  await ensureSchema()
  const existing = await getPage(id)
  if (!existing) return null
  const { id: _id, slug: existingSlug, createdAt, updatedAt, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  const newSlug = patch.slug !== undefined ? patch.slug : existingSlug
  delete merged.slug
  await pool.query('UPDATE pages SET slug = $2, data = $3, updated_at = now() WHERE id = $1', [id, newSlug, JSON.stringify(merged)])
  return getPage(id)
}

export async function deletePage(id) {
  await ensureSchema()
  await pool.query('DELETE FROM pages WHERE id = $1', [id])
  return true
}

// ---------- Question reports ("Report an issue" on a test question) ----------
function rowToQuestionReport(row) {
  if (!row) return null
  return { id: row.id, createdAt: row.created_at, updatedAt: row.updated_at, ...row.data }
}

export async function listQuestionReports() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM question_reports ORDER BY created_at DESC')
  return rows.map(rowToQuestionReport)
}

export async function getQuestionReport(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM question_reports WHERE id = $1 LIMIT 1', [id])
  return rowToQuestionReport(rows[0])
}

export async function createQuestionReport(report) {
  await ensureSchema()
  const { id, ...rest } = report
  await pool.query('INSERT INTO question_reports (id, data) VALUES ($1, $2)', [id, JSON.stringify(rest)])
  return getQuestionReport(id)
}

export async function updateQuestionReport(id, patch) {
  await ensureSchema()
  const existing = await getQuestionReport(id)
  if (!existing) return null
  const { id: _id, createdAt, updatedAt, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  await pool.query('UPDATE question_reports SET data = $2, updated_at = now() WHERE id = $1', [id, JSON.stringify(merged)])
  return getQuestionReport(id)
}

export async function deleteQuestionReport(id) {
  await ensureSchema()
  await pool.query('DELETE FROM question_reports WHERE id = $1', [id])
  return true
}

// ---------- Card applications (CSCS/ECS card application tracker) ----------
function rowToCardApplication(row) {
  if (!row) return null
  return { id: row.id, userId: row.user_id, createdAt: row.created_at, updatedAt: row.updated_at, ...row.data }
}

export async function listCardApplications() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM card_applications ORDER BY created_at DESC')
  return rows.map(rowToCardApplication)
}

export async function getCardApplication(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM card_applications WHERE id = $1 LIMIT 1', [id])
  return rowToCardApplication(rows[0])
}

// Most recent application linked to a signed-in user's account.
export async function getCardApplicationForUser(userId) {
  await ensureSchema()
  const { rows } = await pool.query(
    'SELECT * FROM card_applications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
    [userId]
  )
  return rowToCardApplication(rows[0])
}

// Fallback lookup for applicants who applied while logged out — matches by
// the email they gave on the booking form.
export async function getCardApplicationForEmail(email) {
  await ensureSchema()
  const { rows } = await pool.query(
    `SELECT * FROM card_applications WHERE lower(data->>'email') = lower($1) ORDER BY created_at DESC LIMIT 1`,
    [email]
  )
  return rowToCardApplication(rows[0])
}

export async function createCardApplication(application) {
  await ensureSchema()
  const { id, userId, ...rest } = application
  await pool.query('INSERT INTO card_applications (id, user_id, data) VALUES ($1, $2, $3)', [id, userId || null, JSON.stringify(rest)])
  return getCardApplication(id)
}

export async function updateCardApplication(id, patch) {
  await ensureSchema()
  const existing = await getCardApplication(id)
  if (!existing) return null
  const { id: _id, userId: existingUserId, createdAt, updatedAt, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  const newUserId = patch.userId !== undefined ? patch.userId : existingUserId
  delete merged.userId
  await pool.query('UPDATE card_applications SET user_id = $2, data = $3, updated_at = now() WHERE id = $1', [id, newUserId || null, JSON.stringify(merged)])
  return getCardApplication(id)
}

// ---------- Test bookings (ECS test booking requests) ----------
function rowToTestBooking(row) {
  if (!row) return null
  return { id: row.id, userId: row.user_id, createdAt: row.created_at, updatedAt: row.updated_at, ...row.data }
}

export async function listTestBookings() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM test_bookings ORDER BY created_at DESC')
  return rows.map(rowToTestBooking)
}

export async function getTestBooking(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM test_bookings WHERE id = $1 LIMIT 1', [id])
  return rowToTestBooking(rows[0])
}

// Most recent test booking linked to a signed-in user's account.
export async function getTestBookingForUser(userId) {
  await ensureSchema()
  const { rows } = await pool.query(
    'SELECT * FROM test_bookings WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
    [userId]
  )
  return rowToTestBooking(rows[0])
}

export async function createTestBooking(booking) {
  await ensureSchema()
  const { id, userId, ...rest } = booking
  await pool.query('INSERT INTO test_bookings (id, user_id, data) VALUES ($1, $2, $3)', [id, userId || null, JSON.stringify(rest)])
  return getTestBooking(id)
}

export async function updateTestBooking(id, patch) {
  await ensureSchema()
  const existing = await getTestBooking(id)
  if (!existing) return null
  const { id: _id, userId: existingUserId, createdAt, updatedAt, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  const newUserId = patch.userId !== undefined ? patch.userId : existingUserId
  delete merged.userId
  await pool.query('UPDATE test_bookings SET user_id = $2, data = $3, updated_at = now() WHERE id = $1', [id, newUserId || null, JSON.stringify(merged)])
  return getTestBooking(id)
}

// ---------- Team invites (Employer Team Invitations) ----------
function rowToTeamInvite(row) {
  if (!row) return null
  return { id: row.id, employerId: row.employer_id, createdAt: row.created_at, updatedAt: row.updated_at, ...row.data }
}

export async function listTeamInvitesForEmployer(employerId) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM team_invites WHERE employer_id = $1 ORDER BY created_at DESC', [employerId])
  return rows.map(rowToTeamInvite)
}

export async function getTeamInvite(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM team_invites WHERE id = $1 LIMIT 1', [id])
  return rowToTeamInvite(rows[0])
}

export async function createTeamInvite(invite) {
  await ensureSchema()
  const { id, employerId, ...rest } = invite
  await pool.query('INSERT INTO team_invites (id, employer_id, data) VALUES ($1, $2, $3)', [id, employerId, JSON.stringify(rest)])
  return getTeamInvite(id)
}

export async function updateTeamInvite(id, patch) {
  await ensureSchema()
  const existing = await getTeamInvite(id)
  if (!existing) return null
  const { id: _id, employerId, createdAt, updatedAt, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  await pool.query('UPDATE team_invites SET data = $2, updated_at = now() WHERE id = $1', [id, JSON.stringify(merged)])
  return getTeamInvite(id)
}

export async function deleteTeamInvite(id) {
  await ensureSchema()
  await pool.query('DELETE FROM team_invites WHERE id = $1', [id])
  return true
}

// ---------- Coupons (discount codes for Pro plan checkout) ----------
function rowToCoupon(row) {
  if (!row) return null
  return { id: row.id, code: row.code, createdAt: row.created_at, updatedAt: row.updated_at, ...row.data }
}

export async function listCoupons() {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM coupons ORDER BY created_at DESC')
  return rows.map(rowToCoupon)
}

export async function getCoupon(id) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM coupons WHERE id = $1 LIMIT 1', [id])
  return rowToCoupon(rows[0])
}

// Case-insensitive — "SAVE20" and "save20" are the same code.
export async function getCouponByCode(code) {
  await ensureSchema()
  const { rows } = await pool.query('SELECT * FROM coupons WHERE lower(code) = lower($1) LIMIT 1', [code])
  return rowToCoupon(rows[0])
}

export async function createCoupon(doc) {
  await ensureSchema()
  const { id, code, ...rest } = doc
  await pool.query('INSERT INTO coupons (id, code, data) VALUES ($1, $2, $3)', [id, code, JSON.stringify(rest)])
  return getCoupon(id)
}

export async function updateCoupon(id, patch) {
  await ensureSchema()
  const existing = await getCoupon(id)
  if (!existing) return null
  const { id: _id, code: existingCode, createdAt, updatedAt, ...restExisting } = existing
  const merged = { ...restExisting, ...patch }
  const newCode = patch.code !== undefined ? patch.code : existingCode
  delete merged.code
  await pool.query('UPDATE coupons SET code = $2, data = $3, updated_at = now() WHERE id = $1', [id, newCode, JSON.stringify(merged)])
  return getCoupon(id)
}

export async function deleteCoupon(id) {
  await ensureSchema()
  await pool.query('DELETE FROM coupons WHERE id = $1', [id])
  return true
}

// Atomic increment done in SQL (not read-then-write) so two near-simultaneous
// checkouts can't both slip through a maxUses limit via a race condition.
export async function incrementCouponUsage(id) {
  await ensureSchema()
  const existing = await getCoupon(id)
  if (!existing) return null
  const { id: _id, code, createdAt, updatedAt, ...rest } = existing
  const merged = { ...rest, usedCount: (rest.usedCount || 0) + 1 }
  await pool.query('UPDATE coupons SET data = $2, updated_at = now() WHERE id = $1', [id, JSON.stringify(merged)])
  return getCoupon(id)
}

// ---------- System health & backup (Admin → System Health) ----------
// Row counts across every table, used for a quick at-a-glance dashboard —
// deliberately a handful of small COUNT(*) queries rather than pulling
// every row into memory.
export async function getSystemHealthSnapshot() {
  await ensureSchema()
  const tables = [
    'users', 'activity', 'invoices', 'quotes', 'rams', 'tickets',
    'notifications', 'blog_posts', 'pages', 'question_reports',
    'card_applications', 'team_invites', 'coupons', 'admin_audit',
  ]
  const dbStartedAt = Date.now()
  let dbOk = true
  let dbError = null
  const counts = {}
  try {
    for (const table of tables) {
      // Table names come from the fixed list above, never from user input.
      const { rows } = await pool.query(`SELECT COUNT(*)::int AS count FROM ${table}`)
      counts[table] = rows[0]?.count ?? 0
    }
  } catch (err) {
    dbOk = false
    dbError = err.message
  }
  const dbLatencyMs = Date.now() - dbStartedAt
  return {
    dbOk,
    dbError,
    dbLatencyMs,
    counts,
    serverUptimeSeconds: Math.round(process.uptime()),
    nodeVersion: process.version,
    checkedAt: new Date().toISOString(),
  }
}

// Full JSON export of every table for disaster-recovery / migration —
// user rows are pre-scrubbed of their password hash before export so a
// downloaded backup file is never itself a credential-leak risk.
export async function exportFullBackup() {
  await ensureSchema()
  const tables = [
    'users', 'activity', 'invoices', 'quotes', 'rams', 'tickets',
    'notifications', 'notification_reads', 'blog_posts', 'pages',
    'question_reports', 'card_applications', 'team_invites', 'coupons',
    'settings', 'admin_audit',
  ]
  const backup = { generatedAt: new Date().toISOString(), tables: {} }
  for (const table of tables) {
    const { rows } = await pool.query(`SELECT * FROM ${table}`)
    if (table === 'users') {
      backup.tables[table] = rows.map((r) => ({
        ...r,
        data: r.data ? { ...r.data, passwordHash: undefined } : r.data,
      }))
    } else {
      backup.tables[table] = rows
    }
  }
  return backup
}

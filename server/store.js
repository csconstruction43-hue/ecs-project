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

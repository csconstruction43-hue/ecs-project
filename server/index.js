// server/index.js — ECSPrep backend with all features
import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Stripe from 'stripe'
import { OAuth2Client } from 'google-auth-library'
import nodemailer from 'nodemailer'
import multer from 'multer'
import crypto from 'crypto'
import {
  findByEmail, findById, createUser, updateUser, toSafeUser,
  listAll, logActivity, getRecentActivity, getUserActivity,
  listInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice, nextInvoiceNumber,
  listQuotes, getQuote, createQuote, updateQuote, deleteQuote, nextQuoteNumber,
  listRams, getRams, createRams, updateRams, deleteRams, nextRamsNumber,
  findByStripeCustomerId,
} from './store.js'
import { aiConfigured, explainAnswer, chatReply, translateText, translateBatch, generateQuiz } from './ai.js'
import { getCourseById } from '../src/data/courses.js'

const {
  PORT = 4000,
  CLIENT_URL = 'http://localhost:5173',
  JWT_SECRET,
  STRIPE_SECRET_KEY,
  STRIPE_PRICE_WEEKLY,
  STRIPE_PRICE_MONTHLY,
  STRIPE_PRICE_LIFETIME,
  STRIPE_WEBHOOK_SECRET,
  GOOGLE_CLIENT_ID,
  ADMIN_EMAILS = '',
  SMTP_HOST = 'smtp.gmail.com',
  SMTP_PORT = 587,
  SMTP_USER = '',
  SMTP_PASS = '',
  FROM_EMAIL = 'support@electricianprep.co.uk',
} = process.env

const adminEmailList = ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
function roleForEmail(email) {
  return adminEmailList.includes(email.trim().toLowerCase()) ? 'admin' : 'user'
}

// ---- Referrals ----
// Short, human-shareable code (e.g. "A3F9K2L1") — collision odds are
// negligible at this app's scale, and createUser would just fail to be
// unique in the vanishingly rare case, which is acceptable here.
function generateReferralCode() {
  return crypto.randomBytes(4).toString('hex').toUpperCase()
}

async function resolveReferrer(refCode) {
  if (!refCode) return null
  const all = await listAll()
  const referrer = all.find((u) => u.referralCode === refCode)
  return referrer ? referrer.id : null
}

if (!JWT_SECRET) console.warn('⚠️  JWT_SECRET is not set.')

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null
const PRICE_IDS = { weekly: STRIPE_PRICE_WEEKLY, monthly: STRIPE_PRICE_MONTHLY, lifetime: STRIPE_PRICE_LIFETIME }

// ---- Email transporter ----
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false,
  auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
})

async function sendEmail({ to, subject, html, attachments }) {
  if (!SMTP_USER) { console.log('[Email skipped — no SMTP_USER]', subject, 'to', to); return }
  try {
    await transporter.sendMail({ from: `"ECSPrep" <${FROM_EMAIL}>`, to, subject, html, attachments })
  } catch (e) { console.error('Email failed:', e.message) }
}

// Files (H&S proof, passport photo, ID proof) are kept in memory only long
// enough to attach them to the notification email — never written to disk —
// since they may contain sensitive identity documents.
const bookingUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /^image\/(jpeg|png|webp)$|^application\/pdf$/.test(file.mimetype)
    cb(ok ? null : new Error('Only JPG, PNG or PDF files are allowed.'), ok)
  },
})

function welcomeEmailHtml(name) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:40px 48px;text-align:center;">
          <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:12px 20px;margin-bottom:16px;">
            <span style="font-size:28px;">🏗️</span>
          </div>
          <h1 style="color:#fff;font-size:28px;font-weight:700;margin:0 0 8px;">ECS Mock Test</h1>
          <p style="color:rgba(255,255,255,0.85);font-size:16px;margin:0;">Welcome aboard, ${name}!</p>
        </td></tr>
        <tr><td style="padding:40px 48px;">
          <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 24px;">Your account is ready. Three things to do first:</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:#eff6ff;border-left:4px solid #2563eb;border-radius:8px;padding:16px 20px;margin-bottom:12px;">
              <p style="color:#1e40af;font-size:15px;font-weight:600;margin:0 0 4px;">📝 Sit a Mock Test</p>
              <p style="color:#374151;font-size:14px;margin:0;">Realistic 50-question ECS HS&amp;E test under exam timing</p>
            </td></tr>
          </table>
          <div style="height:12px;"></div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:#f0fdf4;border-left:4px solid #16a34a;border-radius:8px;padding:16px 20px;">
              <p style="color:#15803d;font-size:15px;font-weight:600;margin:0 0 4px;">🎯 Practice by Topic</p>
              <p style="color:#374151;font-size:14px;margin:0;">3,000+ questions across all 21 official topics</p>
            </td></tr>
          </table>
          <div style="height:12px;"></div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:#fdf4ff;border-left:4px solid #9333ea;border-radius:8px;padding:16px 20px;">
              <p style="color:#7e22ce;font-size:15px;font-weight:600;margin:0 0 4px;">🤖 AI Explanations</p>
              <p style="color:#374151;font-size:14px;margin:0;">Understand every wrong answer instantly</p>
            </td></tr>
          </table>
          <div style="height:32px;"></div>
          <div style="background:#f9fafb;border-radius:12px;padding:24px;">
            <p style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">Quick facts about the real ECS test</p>
            <p style="color:#374151;font-size:14px;line-height:1.8;margin:0;">
              50 questions · 45 minutes · <strong>90% pass mark (45/50)</strong><br>
              Booking fee at Pearson VUE · Card fee £57 on pass
            </p>
          </div>
          <div style="height:32px;"></div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:8px;"><a href="${CLIENT_URL}/mock-test" style="display:block;background:#2563eb;color:#fff;text-align:center;padding:14px;border-radius:10px;font-weight:600;font-size:15px;text-decoration:none;">Start mock test →</a></td>
              <td style="padding-left:8px;"><a href="${CLIENT_URL}/plans" style="display:block;background:#f9fafb;color:#374151;text-align:center;padding:14px;border-radius:10px;font-weight:600;font-size:15px;text-decoration:none;border:1px solid #e5e7eb;">See Premium plans →</a></td>
            </tr>
          </table>
          <div style="height:32px;"></div>
          <p style="color:#6b7280;font-size:14px;text-align:center;margin:0;">Got a question? Just reply — we read every message.</p>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:24px 48px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:#9ca3af;font-size:12px;margin:0 0 8px;">© ${new Date().getFullYear()} ECSPrep · <a href="${CLIENT_URL}" style="color:#2563eb;text-decoration:none;">electricianprep.co.uk</a></p>
          <p style="color:#9ca3af;font-size:11px;margin:0;">ECSPrep is a specialist booking platform serving the UK construction sector. We operate independently and are not affiliated with or endorsed by ECS or ECS. All ECS and ECS logos and names remain the property of their respective owners.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function paymentRequestEmailHtml(user, plan) {
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;">💳 New Payment Request</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">A user has submitted a payment request and is awaiting plan activation:</p>
    <div style="background:#f9fafb;border-radius:12px;padding:20px;margin:20px 0;">
      <p style="margin:0 0 8px;"><strong>Name:</strong> ${user.name}</p>
      <p style="margin:0 0 8px;"><strong>Email:</strong> ${user.email}</p>
      <p style="margin:0 0 8px;"><strong>User ID:</strong> ${user.id}</p>
      <p style="margin:0;"><strong>Requested Plan:</strong> <span style="color:#2563eb;font-weight:700;text-transform:uppercase;">${plan}</span></p>
    </div>
    <p style="color:#6b7280;font-size:14px;">Please log in to the admin panel to activate or reject this request.</p>
    <a href="${CLIENT_URL}/admin/users" style="display:inline-block;background:#2563eb;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;margin-top:16px;">Open Admin Panel →</a>
  </div>
</div>
</body></html>`
}

function planActivatedEmailHtml(user, plan) {
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#15803d,#16a34a);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;">🎉 Your Plan is Active!</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">Hi ${user.name},</p>
    <p style="color:#374151;font-size:16px;">Great news — your <strong style="color:#2563eb;text-transform:uppercase;">${plan}</strong> plan has been activated by our team. You now have full access to all Pro features:</p>
    <ul style="color:#374151;font-size:15px;line-height:2;">
      <li>🤖 AI Answer Explanations</li>
      <li>🎯 Unlimited Practice Tests</li>
      <li>📊 Advanced Analytics</li>
      <li>💬 AI Study Assistant</li>
    </ul>
    <a href="${CLIENT_URL}/dashboard" style="display:inline-block;background:#2563eb;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;margin-top:16px;">Go to Dashboard →</a>
  </div>
  <div style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;text-align:center;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">ECSPrep is a specialist booking platform serving the UK construction sector. We operate independently and are not affiliated with or endorsed by ECS or ECS.</p>
  </div>
</div>
</body></html>`
}

function courseRequestEmailHtml(user, courseId) {
  const courseTitle = getCourseById(courseId)?.title || courseId
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#7c3aed,#6d28d9);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;">📚 New Course Booking Request</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">A Pro learner has requested to book a course and is awaiting approval:</p>
    <div style="background:#f9fafb;border-radius:12px;padding:20px;margin:20px 0;">
      <p style="margin:0 0 8px;"><strong>Name:</strong> ${user.name}</p>
      <p style="margin:0 0 8px;"><strong>Email:</strong> ${user.email}</p>
      <p style="margin:0;"><strong>Course:</strong> <span style="color:#7c3aed;font-weight:700;">${courseTitle}</span></p>
    </div>
    <p style="color:#6b7280;font-size:14px;">Please log in to the admin panel to approve or reject this request.</p>
    <a href="${CLIENT_URL}/admin/course-requests" style="display:inline-block;background:#7c3aed;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;margin-top:16px;">Open Course Requests →</a>
  </div>
</div>
</body></html>`
}

function courseApprovedEmailHtml(user, courseId) {
  const courseTitle = getCourseById(courseId)?.title || courseId
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#15803d,#16a34a);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;">🎉 Course Booking Approved!</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">Hi ${user.name},</p>
    <p style="color:#374151;font-size:16px;">Your booking request for <strong>${courseTitle}</strong> has been approved by our team and the full Pro study toolkit for this course is now unlocked.</p>
    <a href="${CLIENT_URL}/my-courses" style="display:inline-block;background:#2563eb;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;margin-top:16px;">Go to My Courses →</a>
  </div>
  <div style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;text-align:center;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">ECSPrep is a specialist booking platform serving the UK construction sector. We operate independently and are not affiliated with or endorsed by ECS or ECS.</p>
  </div>
</div>
</body></html>`
}

function courseRejectedEmailHtml(user, courseId) {
  const courseTitle = getCourseById(courseId)?.title || courseId
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#dc2626,#b91c1c);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;">Course Request Update</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">Hi ${user.name},</p>
    <p style="color:#374151;font-size:16px;">Unfortunately your booking request for <strong>${courseTitle}</strong> could not be approved right now. This can happen if there's an issue with your account or payment.</p>
    <p style="color:#374151;font-size:16px;">Please get in touch with our support team so we can help sort this out, or feel free to try requesting the course again.</p>
    <a href="${CLIENT_URL}/my-courses" style="display:inline-block;background:#2563eb;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;margin-top:16px;">View My Courses →</a>
  </div>
</div>
</body></html>`
}

function planCancelledEmailHtml(user) {
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#4b5563,#374151);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;">Your Pro plan has ended</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">Hi ${user.name},</p>
    <p style="color:#374151;font-size:16px;">Your ECSPrep Pro subscription has been cancelled and Pro access has now ended. You can still use the free plan any time.</p>
    <a href="${CLIENT_URL}/plans" style="display:inline-block;background:#2563eb;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;margin-top:16px;">Resubscribe →</a>
    <p style="color:#6b7280;font-size:13px;margin-top:24px;">Changed your mind? You can come back any time — your progress is saved.</p>
  </div>
</div>
</body></html>`
}

function paymentFailedEmailHtml(user) {
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#b91c1c,#dc2626);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;">⚠️ Payment failed</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">Hi ${user.name},</p>
    <p style="color:#374151;font-size:16px;">We tried to renew your ECSPrep Pro subscription but the payment didn't go through. Please update your payment details to keep your Pro access — we'll retry automatically, but you can also fix it now.</p>
    <a href="${CLIENT_URL}/settings" style="display:inline-block;background:#dc2626;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;margin-top:16px;">Update payment method →</a>
  </div>
</div>
</body></html>`
}

function resetEmailHtml(name, resetUrl) {
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;">🔑 Reset Your Password</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">Hi ${name},</p>
    <p style="color:#374151;font-size:16px;">We received a request to reset your ECSPrep password. Click the button below — this link expires in 1 hour.</p>
    <a href="${resetUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;margin-top:16px;">Reset Password →</a>
    <p style="color:#6b7280;font-size:13px;margin-top:24px;">If you didn't request this, you can safely ignore this email.</p>
  </div>
</div>
</body></html>`
}

const app = express()
app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({ origin: CLIENT_URL, credentials: true }))

// Rate limit brute-force attempts on auth endpoints (login/signup/password reset)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Please try again in a few minutes.' },
})
app.use('/api/auth', authLimiter)

// General API rate limit as a safety net against abuse/scraping
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', apiLimiter)

// ---- Contact / enquiry form rate limiter ----
// Moved above all routes that reference it (create-card-payment, /api/contact,
// /api/book-card) so it's defined before use — fixes:
// "ReferenceError: Cannot access 'contactLimiter' before initialization"
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many enquiries sent. Please try again later.' },
})

// Stripe webhook — must be before express.json()
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) return res.status(500).send('Stripe not configured.')
  let event
  try { event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], STRIPE_WEBHOOK_SECRET) }
  catch (err) { return res.status(400).send(`Webhook Error: ${err.message}`) }
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const userId = session.client_reference_id
      const plan = session.metadata?.plan || 'monthly'
      if (userId) {
        const user = await findById(userId)
        await updateUser(userId, { isPro: true, plan, stripeCustomerId: session.customer, stripeSubscriptionId: session.subscription || null })
        if (user) sendEmail({ to: user.email, subject: '🎉 Your ECSPrep Pro plan is active!', html: planActivatedEmailHtml(user, plan) })
      }
      break
    }

    // Subscription renewed, upgraded/downgraded, or Stripe moved it into a
    // non-payable state (past_due/unpaid/paused) — keep our `isPro` flag in
    // sync with what Stripe actually thinks is true, instead of trusting
    // only the initial checkout.
    case 'customer.subscription.updated': {
      const sub = event.data.object
      const user = await findByStripeCustomerId(sub.customer)
      if (user) {
        const active = ['active', 'trialing'].includes(sub.status)
        await updateUser(user.id, {
          isPro: active,
          stripeSubscriptionId: sub.id,
          subscriptionStatus: sub.status,
          subscriptionCancelAtPeriodEnd: !!sub.cancel_at_period_end,
        })
      }
      break
    }

    // Subscription fully cancelled/expired (immediate cancel, or the
    // period-end cancellation finally landing) — revoke Pro access.
    case 'customer.subscription.deleted': {
      const sub = event.data.object
      const user = await findByStripeCustomerId(sub.customer)
      if (user) {
        await updateUser(user.id, { isPro: false, subscriptionStatus: 'canceled' })
        sendEmail({ to: user.email, subject: 'Your ECSPrep Pro plan has ended', html: planCancelledEmailHtml(user) })
      }
      break
    }

    // A renewal charge failed (card declined, insufficient funds, etc).
    // Stripe's own retry schedule (Smart Retries) will keep trying; we just
    // notify the user so they can fix their card before access is dropped
    // by the subsequent customer.subscription.updated/deleted event.
    case 'invoice.payment_failed': {
      const invoice = event.data.object
      const user = await findByStripeCustomerId(invoice.customer)
      if (user) sendEmail({ to: user.email, subject: '⚠️ Your ECSPrep payment failed', html: paymentFailedEmailHtml(user) })
      break
    }

    default:
      break
  }
  res.json({ received: true })
})

app.use(express.json())

if (!JWT_SECRET) {
  console.error('❌ JWT_SECRET is not set. Refusing to start with an insecure default. Set JWT_SECRET in server/.env')
  process.exit(1)
}

function signToken(user) {
  return jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '30d' })
}
async function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Not signed in.' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await findById(payload.sub)
    if (!user || user.deletedAt) return res.status(401).json({ error: 'Session expired.' })
    req.user = user; next()
  } catch { return res.status(401).json({ error: 'Invalid or expired session.' }) }
}
function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' })
  next()
}
function requirePro(req, res, next) {
  if (!req.user?.isPro) return res.status(402).json({ error: 'Pro feature. Upgrade to unlock AI.', upgradeRequired: true })
  next()
}

// ---- Auth ----
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, ref } = req.body || {}
    if (!name || !email || !password || password.length < 6)
      return res.status(400).json({ error: 'Name, email and password (6+ chars) required.' })
    if (await findByEmail(email)) return res.status(409).json({ error: 'Account already exists.' })
    const passwordHash = await bcrypt.hash(password, 10)
    const referredBy = await resolveReferrer(ref)
    const user = await createUser({ id: `user_${Date.now()}`, name, email: email.trim(), password: passwordHash, provider: 'password', role: roleForEmail(email), isPro: false, plan: null, referralCode: generateReferralCode(), referredBy, createdAt: new Date().toISOString() })
    await logActivity({ userId: user.id, type: 'signup' })
    if (referredBy) await logActivity({ userId: referredBy, type: 'referral_signup', meta: { newUserId: user.id } })
    // Send welcome email
    sendEmail({ to: user.email, subject: '🏗️ Welcome to ECSPrep — your account is ready', html: welcomeEmailHtml(user.name) })
    res.json({ token: signToken(user), user: toSafeUser(user) })
  } catch (err) {
    console.error('Signup failed:', err)
    res.status(500).json({ error: 'Signup failed. Please try again in a moment.' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    const user = await findByEmail(email || '')
    if (!user || !user.password) return res.status(401).json({ error: 'Invalid email or password.' })
    const valid = await bcrypt.compare(password || '', user.password)
    if (!valid) return res.status(401).json({ error: 'Invalid email or password.' })
    const desiredRole = roleForEmail(user.email)
    const finalUser = desiredRole !== user.role ? await updateUser(user.id, { role: desiredRole }) : user
    await updateUser(finalUser.id, { lastActive: new Date().toISOString() })
    await logActivity({ userId: finalUser.id, type: 'login' })
    res.json({ token: signToken(finalUser), user: toSafeUser(finalUser) })
  } catch (err) {
    console.error('Login failed:', err)
    res.status(500).json({ error: 'Login failed. Please try again in a moment.' })
  }
})

app.post('/api/auth/google', async (req, res) => {
  if (!googleClient) return res.status(500).json({ error: 'Google Sign-In not configured.' })
  const { credential, ref } = req.body || {}
  if (!credential) return res.status(400).json({ error: 'Missing Google credential.' })
  try {
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: GOOGLE_CLIENT_ID })
    const payload = ticket.getPayload()
    let user = await findByEmail(payload.email)
    const isNew = !user
    if (!user) {
      const referredBy = await resolveReferrer(ref)
      user = await createUser({ id: `user_${Date.now()}`, name: payload.name || payload.email, email: payload.email, password: null, provider: 'google', avatar: payload.picture || null, role: roleForEmail(payload.email), isPro: false, plan: null, referralCode: generateReferralCode(), referredBy, createdAt: new Date().toISOString() })
      if (referredBy) await logActivity({ userId: referredBy, type: 'referral_signup', meta: { newUserId: user.id } })
    } else {
      const desiredRole = roleForEmail(user.email)
      if (desiredRole !== user.role) user = await updateUser(user.id, { role: desiredRole })
    }
    if (isNew) sendEmail({ to: user.email, subject: '🏗️ Welcome to ECSPrep — your account is ready', html: welcomeEmailHtml(user.name) })
    res.json({ token: signToken(user), user: toSafeUser(user) })
  } catch (err) { res.status(401).json({ error: 'Could not verify Google sign-in.' }) }
})

app.get('/api/auth/me', requireAuth, (req, res) => res.json({ user: toSafeUser(req.user) }))

// ---- Forgot / Reset Password ----
const resetTokens = new Map() // token -> { userId, expires }

app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body || {}
  const user = await findByEmail(email || '')
  if (!user) return res.json({ ok: true }) // Don't reveal if email exists
  const token = crypto.randomBytes(32).toString('hex')
  resetTokens.set(token, { userId: user.id, expires: Date.now() + 3600_000 })
  const resetUrl = `${CLIENT_URL}/reset-password?token=${token}`
  await sendEmail({ to: user.email, subject: '🔑 Reset your ECSPrep password', html: resetEmailHtml(user.name, resetUrl) })
  res.json({ ok: true })
})

app.post('/api/auth/reset-password', async (req, res) => {
  const { token, password } = req.body || {}
  const entry = resetTokens.get(token)
  if (!entry || entry.expires < Date.now()) return res.status(400).json({ error: 'Reset link is invalid or expired.' })
  if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' })
  const hash = await bcrypt.hash(password, 10)
  await updateUser(entry.userId, { password: hash })
  resetTokens.delete(token)
  res.json({ ok: true })
})

// ---- Profile (any logged-in user editing their own account) ----
const PROFILE_FIELDS = ['name', 'phone', 'location', 'bio', 'company', 'position', 'avatar']
const MAX_BIO_LENGTH = 500

app.patch('/api/user/profile', requireAuth, async (req, res) => {
  const body = req.body || {}
  const patch = {}

  if (body.name !== undefined) {
    const name = String(body.name).trim()
    if (!name) return res.status(400).json({ error: 'Name cannot be empty.' })
    if (name.length > 100) return res.status(400).json({ error: 'Name is too long.' })
    patch.name = name
  }
  if (body.email !== undefined) {
    const email = String(body.email).trim()
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address.' })
    const existing = await findByEmail(email)
    if (existing && existing.id !== req.user.id) {
      return res.status(409).json({ error: 'That email is already in use by another account.' })
    }
    patch.email = email
  }
  if (body.bio !== undefined && String(body.bio).length > MAX_BIO_LENGTH) {
    return res.status(400).json({ error: `Bio must be ${MAX_BIO_LENGTH} characters or fewer.` })
  }
  for (const field of PROFILE_FIELDS) {
    if (body[field] !== undefined) patch[field] = typeof body[field] === 'string' ? body[field].trim() : body[field]
  }
  if (body.avatar !== undefined) {
    // Data-URL avatars only (client sends a base64-encoded image); reject anything absurdly large.
    if (typeof body.avatar === 'string' && body.avatar.length > 2_000_000) {
      return res.status(400).json({ error: 'Image is too large. Please choose a smaller photo.' })
    }
    patch.avatar = body.avatar
  }

  if (Object.keys(patch).length === 0) return res.status(400).json({ error: 'No changes to save.' })

  const updated = await updateUser(req.user.id, patch)
  await logActivity({ userId: req.user.id, type: 'profile_update' })
  res.json({ user: toSafeUser(updated) })
})

app.post('/api/user/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {}
  if (!req.user.password) {
    return res.status(400).json({ error: 'This account signs in with Google and has no password to change.' })
  }
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters.' })
  }
  const valid = await bcrypt.compare(currentPassword || '', req.user.password)
  if (!valid) return res.status(401).json({ error: 'Current password is incorrect.' })
  const hash = await bcrypt.hash(newPassword, 10)
  await updateUser(req.user.id, { password: hash })
  await logActivity({ userId: req.user.id, type: 'password_change' })
  res.json({ ok: true })
})

app.delete('/api/user/account', requireAuth, async (req, res) => {
  const { password } = req.body || {}
  if (req.user.password) {
    const valid = await bcrypt.compare(password || '', req.user.password)
    if (!valid) return res.status(401).json({ error: 'Password is incorrect.' })
  }
  await updateUser(req.user.id, { deletedAt: new Date().toISOString(), email: `deleted_${req.user.id}_${req.user.email}` })
  await logActivity({ userId: req.user.id, type: 'account_deleted' })
  res.json({ ok: true })
})

// ---- Payment Request (manual — admin approves) ----

app.post('/api/payment/request', requireAuth, async (req, res) => {
  const { plan } = req.body || {}
  const validPlans = ['weekly', 'monthly', 'lifetime']
  if (!validPlans.includes(plan)) return res.status(400).json({ error: 'Invalid plan.' })
  await updateUser(req.user.id, { pendingPlan: plan, pendingPlanAt: new Date().toISOString() })
  await logActivity({ userId: req.user.id, type: 'payment_requested', meta: { plan } })
  // Email all admins
  const admins = (await listAll()).filter(u => u.role === 'admin')
  for (const admin of admins) {
    await sendEmail({ to: admin.email, subject: `💳 New payment request — ${req.user.name} wants ${plan}`, html: paymentRequestEmailHtml(req.user, plan) })
  }
  res.json({ ok: true, message: 'Payment request sent. Admin will activate your plan shortly.' })
})

// ---- Activity ----
app.post('/api/activity/ping', requireAuth, async (req, res) => {
  const { page } = req.body || {}
  await updateUser(req.user.id, { lastActive: new Date().toISOString(), currentPage: page || null })
  await logActivity({ userId: req.user.id, type: 'ping', page })
  res.json({ ok: true })
})

// ---- Courses (online exam-prep courses) ----
// No course is free to book — every single course requires an active Pro
// plan (bought via Stripe checkout, see /api/checkout/session above); the
// client sends unpaid users to /plans instead of calling this route, but
// we enforce it here too so it can't be skipped by hitting the API
// directly.
//
// Booking a course does NOT grant instant access. It creates a pending
// request (stored on the user as `pendingCourseRequests`) and emails every
// admin. A course only lands in `bookedCourses` (which is what actually
// unlocks the Pro study tools — see CourseDetailPage / MyCoursesPage) once
// an admin approves it from /admin/course-requests. This is a manual,
// SaaS-style approval workflow — mirrors the existing /api/payment/request
// pattern used for plan activations.

app.post('/api/courses/:courseId/book', requireAuth, async (req, res) => {
  const { courseId } = req.params
  if (!courseId) return res.status(400).json({ error: 'Missing course id.' })
  if (!req.user.isPro) {
    return res.status(402).json({ error: 'This course needs an active Pro plan. Please choose a plan first.' })
  }

  const bookedCourses = Array.isArray(req.user.bookedCourses) ? req.user.bookedCourses : []
  if (bookedCourses.some((c) => c.id === courseId)) {
    return res.json({ user: toSafeUser(req.user), alreadyBooked: true, alreadyPending: false })
  }

  const pendingCourseRequests = Array.isArray(req.user.pendingCourseRequests) ? req.user.pendingCourseRequests : []
  if (pendingCourseRequests.some((c) => c.id === courseId)) {
    return res.json({ user: toSafeUser(req.user), alreadyBooked: false, alreadyPending: true })
  }

  const nextPending = [...pendingCourseRequests, { id: courseId, requestedAt: new Date().toISOString() }]
  const updated = await updateUser(req.user.id, { pendingCourseRequests: nextPending })
  await logActivity({ userId: req.user.id, type: 'course_requested', meta: { courseId } })

  const admins = (await listAll()).filter((u) => u.role === 'admin')
  for (const admin of admins) {
    await sendEmail({
      to: admin.email,
      subject: `📚 New course booking request from ${req.user.name}`,
      html: courseRequestEmailHtml(req.user, courseId),
    })
  }

  res.json({ user: toSafeUser(updated), alreadyBooked: false, alreadyPending: false })
})

// Admin: list every pending course request, flattened (one row per
// request) so the client can render/search/approve them individually.
app.get('/api/admin/course-requests', requireAuth, requireAdmin, async (req, res) => {
  const all = await listAll()
  const requests = []
  for (const u of all) {
    const pending = Array.isArray(u.pendingCourseRequests) ? u.pendingCourseRequests : []
    for (const p of pending) {
      requests.push({
        courseId: p.id,
        requestedAt: p.requestedAt,
        user: { id: u.id, name: u.name, email: u.email, isPro: !!u.isPro, plan: u.plan || null },
      })
    }
  }
  requests.sort((a, b) => new Date(a.requestedAt) - new Date(b.requestedAt))
  res.json({ requests })
})

// Admin: approve a pending course request — moves it into bookedCourses
// (which is what actually unlocks the Pro study tools for that course).
app.post('/api/admin/course-requests/:userId/:courseId/approve', requireAuth, requireAdmin, async (req, res) => {
  const { userId, courseId } = req.params
  const user = await findById(userId)
  if (!user) return res.status(404).json({ error: 'User not found.' })

  const pending = Array.isArray(user.pendingCourseRequests) ? user.pendingCourseRequests : []
  if (!pending.some((c) => c.id === courseId)) {
    return res.status(404).json({ error: 'No pending request for this course.' })
  }

  const bookedCourses = Array.isArray(user.bookedCourses) ? user.bookedCourses : []
  const alreadyBooked = bookedCourses.some((c) => c.id === courseId)
  const nextBooked = alreadyBooked ? bookedCourses : [...bookedCourses, { id: courseId, bookedAt: new Date().toISOString() }]
  const nextPending = pending.filter((c) => c.id !== courseId)

  const updated = await updateUser(user.id, { bookedCourses: nextBooked, pendingCourseRequests: nextPending })
  await logActivity({ userId: user.id, type: 'course_approved', meta: { courseId, by: req.user.email } })
  await sendEmail({ to: user.email, subject: '🎉 Your course booking has been approved!', html: courseApprovedEmailHtml(user, courseId) })
  res.json({ user: toSafeUser(updated) })
})

// Admin: reject a pending course request — just removes it, no email
// spam beyond a simple notice so the learner knows to get in touch.
app.post('/api/admin/course-requests/:userId/:courseId/reject', requireAuth, requireAdmin, async (req, res) => {
  const { userId, courseId } = req.params
  const user = await findById(userId)
  if (!user) return res.status(404).json({ error: 'User not found.' })

  const pending = Array.isArray(user.pendingCourseRequests) ? user.pendingCourseRequests : []
  if (!pending.some((c) => c.id === courseId)) {
    return res.status(404).json({ error: 'No pending request for this course.' })
  }

  const nextPending = pending.filter((c) => c.id !== courseId)
  const updated = await updateUser(user.id, { pendingCourseRequests: nextPending })
  await logActivity({ userId: user.id, type: 'course_rejected', meta: { courseId, by: req.user.email } })
  await sendEmail({ to: user.email, subject: 'Update on your course booking request', html: courseRejectedEmailHtml(user, courseId) })
  res.json({ user: toSafeUser(updated) })
})

// Learner: cancel their own pending course request (changed their mind, or
// requested the wrong course by mistake) — no admin action needed for this.
app.delete('/api/courses/:courseId/request', requireAuth, async (req, res) => {
  const { courseId } = req.params
  const pending = Array.isArray(req.user.pendingCourseRequests) ? req.user.pendingCourseRequests : []
  if (!pending.some((c) => c.id === courseId)) {
    return res.status(404).json({ error: 'No pending request for this course.' })
  }
  const nextPending = pending.filter((c) => c.id !== courseId)
  const updated = await updateUser(req.user.id, { pendingCourseRequests: nextPending })
  await logActivity({ userId: req.user.id, type: 'course_request_cancelled', meta: { courseId } })
  res.json({ user: toSafeUser(updated) })
})

// ---- Referrals ----
// Real per-user referral code + honest stats. Commission is only computed
// for course bookings, where we know the exact price (src/data/courses.js
// mirrored below) — subscription-plan conversions are flagged for manual
// review rather than guessing at a Stripe amount we haven't verified.
const COURSE_PRICES = {
  'ecs-health-safety': 12.99, 'level-2-electrical': 19.99, 'level-3-electrical': 24.99,
  '18th-edition': 14.99, '2391-inspection-testing': 24.99, 'ev-charging': 17.99,
  'solar-pv-battery': 19.99, 'pat-testing': 9.99, 'am2-assessment': 22.99,
  'nvq-level-3': 14.99, 'green-card': 9.99, 'gold-card-supervisor': 14.99,
  'black-card-managers': 17.99, 'blue-card-skilled': 9.99,
}
const COMMISSION_RATE = 0.3

app.get('/api/referral/me', requireAuth, async (req, res) => {
  let user = req.user
  if (!user.referralCode) {
    user = await updateUser(user.id, { referralCode: generateReferralCode() })
  }

  const all = await listAll()
  const referred = all.filter((u) => u.referredBy === user.id)

  let coursePayoutKnown = 0
  let subscriptionConversions = 0
  const conversions = referred.filter((u) => u.isPro).map((u) => {
    const coursePrice = (u.bookedCourses || [])
      .reduce((sum, c) => sum + (COURSE_PRICES[c.id] || 0), 0)
    if (coursePrice > 0) coursePayoutKnown += coursePrice * COMMISSION_RATE
    else subscriptionConversions += 1
    return { name: u.name, joinedAt: u.createdAt, viaCourse: coursePrice > 0 }
  })

  res.json({
    code: user.referralCode,
    link: `${CLIENT_URL}/?ref=${user.referralCode}`,
    signups: referred.length,
    conversions: conversions.length,
    pendingPayout: Math.round(coursePayoutKnown * 100) / 100,
    subscriptionConversionsPendingReview: subscriptionConversions,
    recentReferrals: referred
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)
      .map((u) => ({ name: u.name, joinedAt: u.createdAt, isPro: !!u.isPro })),
  })
})

// ---- Admin ----
const ONLINE_WINDOW_MS = 60 * 1000

app.get('/api/admin/users', requireAuth, requireAdmin, async (req, res) => {
  const now = Date.now()
  const all = await listAll()
  const users = all.map((u) => {
    const safe = toSafeUser(u)
    const lastActiveMs = u.lastActive ? new Date(u.lastActive).getTime() : 0
    return { ...safe, online: now - lastActiveMs < ONLINE_WINDOW_MS }
  })
  res.json({ users })
})

app.get('/api/admin/courses', requireAuth, requireAdmin, async (req, res) => {
  const all = await listAll()
  // Flat list of { courseId, user: {...}, bookedAt } — the client groups
  // this by course for the "who's booked what" view.
  const enrollments = []
  for (const u of all) {
    const booked = Array.isArray(u.bookedCourses) ? u.bookedCourses : []
    for (const b of booked) {
      enrollments.push({
        courseId: b.id,
        bookedAt: b.bookedAt,
        user: { id: u.id, name: u.name, email: u.email, isPro: !!u.isPro, plan: u.plan || null },
      })
    }
  }
  res.json({ enrollments })
})

app.get('/api/admin/activity', requireAuth, requireAdmin, async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 500)
  const events = await getRecentActivity(limit)
  const usersById = Object.fromEntries((await listAll()).map((u) => [u.id, u]))
  const enriched = events.map((e) => ({ ...e, userName: usersById[e.userId]?.name || 'Unknown', userEmail: usersById[e.userId]?.email || null }))
  res.json({ events: enriched })
})

app.get('/api/admin/users/:id', requireAuth, requireAdmin, async (req, res) => {
  const user = await findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found.' })
  const now = Date.now()
  const lastActiveMs = user.lastActive ? new Date(user.lastActive).getTime() : 0
  res.json({ user: { ...toSafeUser(user), online: now - lastActiveMs < ONLINE_WINDOW_MS }, activity: await getUserActivity(user.id, 200) })
})

// Admin: activate or deactivate plan — sends email to user
const VALID_PLANS = ['free', 'weekly', 'monthly', 'lifetime']
app.patch('/api/admin/users/:id/plan', requireAuth, requireAdmin, async (req, res) => {
  const { plan } = req.body || {}
  if (!VALID_PLANS.includes(plan)) return res.status(400).json({ error: `plan must be one of: ${VALID_PLANS.join(', ')}` })
  const user = await findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found.' })
  const updated = await updateUser(user.id, {
    isPro: plan !== 'free',
    plan: plan === 'free' ? null : plan,
    pendingPlan: null,
    planSource: plan === 'free' ? null : 'admin',
    planUpdatedAt: new Date().toISOString(),
    planUpdatedBy: req.user.email,
  })
  await logActivity({ userId: user.id, type: 'plan_changed', meta: { plan, by: req.user.email } })
  // Email user about plan activation/deactivation
  if (plan !== 'free') {
    await sendEmail({ to: user.email, subject: '🎉 Your ECSPrep Pro plan is now active!', html: planActivatedEmailHtml(user, plan) })
  }
  res.json({ user: toSafeUser(updated) })
})

app.get('/api/admin/users/:id/export', requireAuth, requireAdmin, async (req, res) => {
  const user = await findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found.' })
  const payload = { user: toSafeUser(user), activity: await getUserActivity(user.id, 1000), exportedAt: new Date().toISOString(), exportedBy: req.user.email }
  res.setHeader('Content-Disposition', `attachment; filename="user-${user.id}-export.json"`)
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(payload, null, 2))
})

// Admin: get pending payment requests
app.get('/api/admin/payment-requests', requireAuth, requireAdmin, async (req, res) => {
  const pending = (await listAll()).filter(u => u.pendingPlan).map(u => ({
    ...toSafeUser(u),
    pendingPlan: u.pendingPlan,
    pendingPlanAt: u.pendingPlanAt,
  }))
  res.json({ requests: pending })
})

// ---- Invoice Builder ----
app.get('/api/admin/invoices', requireAuth, requireAdmin, async (req, res) => {
  const invoices = await listInvoices()
  res.json({ invoices })
})

app.get('/api/admin/invoices/next-number', requireAuth, requireAdmin, async (req, res) => {
  res.json({ number: await nextInvoiceNumber() })
})

app.get('/api/admin/invoices/:id', requireAuth, requireAdmin, async (req, res) => {
  const invoice = await getInvoice(req.params.id)
  if (!invoice) return res.status(404).json({ error: 'Invoice not found.' })
  res.json({ invoice })
})

app.post('/api/admin/invoices', requireAuth, requireAdmin, async (req, res) => {
  const { client, items, taxRate, discount, notes, dueDate, status, currency } = req.body || {}
  if (!client?.name) return res.status(400).json({ error: 'Client name is required.' })
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'At least one line item is required.' })

  const id = `inv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const number = await nextInvoiceNumber()
  const invoice = await createInvoice({
    id,
    number,
    client,
    items,
    taxRate: Number(taxRate) || 0,
    discount: Number(discount) || 0,
    currency: currency || 'GBP',
    notes: notes || '',
    dueDate: dueDate || null,
    status: status || 'draft',
    issuedAt: new Date().toISOString(),
    createdBy: req.user.email,
  })
  await logActivity({ userId: req.user.id, type: 'invoice_created', meta: { invoiceId: id, number } })
  res.status(201).json({ invoice })
})

app.patch('/api/admin/invoices/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getInvoice(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Invoice not found.' })
  const { client, items, taxRate, discount, notes, dueDate, status, currency } = req.body || {}
  const patch = {}
  if (client !== undefined) patch.client = client
  if (items !== undefined) patch.items = items
  if (taxRate !== undefined) patch.taxRate = Number(taxRate) || 0
  if (discount !== undefined) patch.discount = Number(discount) || 0
  if (currency !== undefined) patch.currency = currency
  if (notes !== undefined) patch.notes = notes
  if (dueDate !== undefined) patch.dueDate = dueDate
  if (status !== undefined) patch.status = status
  const invoice = await updateInvoice(req.params.id, patch)
  res.json({ invoice })
})

app.delete('/api/admin/invoices/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getInvoice(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Invoice not found.' })
  await deleteInvoice(req.params.id)
  res.json({ ok: true })
})

app.get('/api/admin/quotes', requireAuth, requireAdmin, async (req, res) => {
  const quotes = await listQuotes()
  res.json({ quotes })
})

app.get('/api/admin/quotes/:id', requireAuth, requireAdmin, async (req, res) => {
  const quote = await getQuote(req.params.id)
  if (!quote) return res.status(404).json({ error: 'Quote not found.' })
  res.json({ quote })
})

app.post('/api/admin/quotes', requireAuth, requireAdmin, async (req, res) => {
  const { from, client, items, taxRate, discount, currency, notes, validUntil, status } = req.body || {}
  if (!client?.name) return res.status(400).json({ error: 'Client name is required.' })
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'At least one line item is required.' })

  const id = `quo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const number = await nextQuoteNumber()
  const quote = await createQuote({
    id,
    number,
    from: from || {},
    client,
    items,
    taxRate: Number(taxRate) || 0,
    discount: Number(discount) || 0,
    currency: currency || 'GBP',
    notes: notes || '',
    validUntil: validUntil || null,
    status: status || 'draft',
    createdBy: req.user.email,
  })
  await logActivity({ userId: req.user.id, type: 'quote_created', meta: { quoteId: id, number } })
  res.status(201).json({ quote })
})

app.patch('/api/admin/quotes/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getQuote(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Quote not found.' })
  const { from, client, items, taxRate, discount, currency, notes, validUntil, status } = req.body || {}
  const patch = {}
  if (from !== undefined) patch.from = from
  if (client !== undefined) patch.client = client
  if (items !== undefined) patch.items = items
  if (taxRate !== undefined) patch.taxRate = Number(taxRate) || 0
  if (discount !== undefined) patch.discount = Number(discount) || 0
  if (currency !== undefined) patch.currency = currency
  if (notes !== undefined) patch.notes = notes
  if (validUntil !== undefined) patch.validUntil = validUntil
  if (status !== undefined) patch.status = status
  const quote = await updateQuote(req.params.id, patch)
  res.json({ quote })
})

app.delete('/api/admin/quotes/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getQuote(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Quote not found.' })
  await deleteQuote(req.params.id)
  res.json({ ok: true })
})

app.get('/api/admin/rams', requireAuth, requireAdmin, async (req, res) => {
  const rams = await listRams()
  res.json({ rams })
})

app.get('/api/admin/rams/:id', requireAuth, requireAdmin, async (req, res) => {
  const rams = await getRams(req.params.id)
  if (!rams) return res.status(404).json({ error: 'RAMS document not found.' })
  res.json({ rams })
})

app.post('/api/admin/rams', requireAuth, requireAdmin, async (req, res) => {
  const {
    projectName, siteAddress, preparedBy, assessmentDate, reviewDate,
    activityDescription, ppe, hazards, methodSteps, emergencyProcedures, status,
  } = req.body || {}
  if (!projectName?.trim()) return res.status(400).json({ error: 'Project / site name is required.' })
  if (!Array.isArray(hazards) || !hazards.some(h => h.hazard?.trim())) {
    return res.status(400).json({ error: 'Add at least one hazard.' })
  }

  const id = `rams_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const number = await nextRamsNumber()
  const rams = await createRams({
    id,
    number,
    projectName,
    siteAddress: siteAddress || '',
    preparedBy: preparedBy || '',
    assessmentDate: assessmentDate || null,
    reviewDate: reviewDate || null,
    activityDescription: activityDescription || '',
    ppe: Array.isArray(ppe) ? ppe : [],
    hazards,
    methodSteps: Array.isArray(methodSteps) ? methodSteps : [],
    emergencyProcedures: emergencyProcedures || '',
    status: status || 'draft',
    createdBy: req.user.email,
  })
  await logActivity({ userId: req.user.id, type: 'rams_created', meta: { ramsId: id, number } })
  res.status(201).json({ rams })
})

app.patch('/api/admin/rams/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getRams(req.params.id)
  if (!existing) return res.status(404).json({ error: 'RAMS document not found.' })
  const {
    projectName, siteAddress, preparedBy, assessmentDate, reviewDate,
    activityDescription, ppe, hazards, methodSteps, emergencyProcedures, status,
  } = req.body || {}
  const patch = {}
  if (projectName !== undefined) patch.projectName = projectName
  if (siteAddress !== undefined) patch.siteAddress = siteAddress
  if (preparedBy !== undefined) patch.preparedBy = preparedBy
  if (assessmentDate !== undefined) patch.assessmentDate = assessmentDate
  if (reviewDate !== undefined) patch.reviewDate = reviewDate
  if (activityDescription !== undefined) patch.activityDescription = activityDescription
  if (ppe !== undefined) patch.ppe = ppe
  if (hazards !== undefined) patch.hazards = hazards
  if (methodSteps !== undefined) patch.methodSteps = methodSteps
  if (emergencyProcedures !== undefined) patch.emergencyProcedures = emergencyProcedures
  if (status !== undefined) patch.status = status
  const rams = await updateRams(req.params.id, patch)
  res.json({ rams })
})

app.delete('/api/admin/rams/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getRams(req.params.id)
  if (!existing) return res.status(404).json({ error: 'RAMS document not found.' })
  await deleteRams(req.params.id)
  res.json({ ok: true })
})

// ---- Leaderboard ----
app.post('/api/leaderboard/submit', requireAuth, async (req, res) => {
  const { testType, score, total } = req.body || {}
  const numScore = Number(score), numTotal = Number(total)
  if (!testType || !Number.isFinite(numScore) || !Number.isFinite(numTotal) || numTotal <= 0)
    return res.status(400).json({ error: 'testType, score and total are required.' })
  const percentage = Math.round((numScore / numTotal) * 100)
  const bestScore = Math.max(req.user.bestScore || 0, percentage)
  const testsCompleted = (req.user.testsCompleted || 0) + 1
  const updated = await updateUser(req.user.id, { bestScore, testsCompleted })
  await logActivity({ userId: req.user.id, type: 'test_submit', meta: { testType, score: numScore, total: numTotal, percentage } })
  res.json({ user: toSafeUser(updated) })
})

app.get('/api/leaderboard', async (req, res) => {
  const all = await listAll()
  const entries = all
    .filter((u) => typeof u.bestScore === 'number')
    .sort((a, b) => (b.bestScore - a.bestScore) || ((b.testsCompleted || 0) - (a.testsCompleted || 0)))
    .slice(0, 20)
    .map((u) => {
      const parts = (u.name || 'Anonymous').trim().split(' ')
      const displayName = parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0]
      return { name: displayName, bestScore: u.bestScore, testsCompleted: u.testsCompleted || 0, isPro: !!u.isPro }
    })
  res.json({ leaderboard: entries })
})

// ---- AI (Pro only) ----
// ---- Audio Assist: translate a question into one of 14 languages so the
// browser's built-in text-to-speech can read it aloud. Available to
// EVERYONE (free + guests), not gated behind login — matches the free
// "Audio Assist" widget on every question. Cached in memory since the
// question bank is fixed, so the same question+language is only ever
// translated once per server run.
const SUPPORTED_AUDIO_LANGUAGES = {
  en: 'English', cy: 'Welsh', bg: 'Bulgarian', cs: 'Czech', fr: 'French',
  de: 'German', hu: 'Hungarian', lt: 'Lithuanian', pl: 'Polish',
  pt: 'Portuguese', pa: 'Punjabi', ro: 'Romanian', ru: 'Russian', es: 'Spanish',
}
const translateCache = new Map() // `${lang}::${text}` -> translated text

app.get('/api/translate/languages', (req, res) => {
  res.json({ languages: SUPPORTED_AUDIO_LANGUAGES, configured: aiConfigured() })
})

app.post('/api/translate', async (req, res) => {
  const { text, lang } = req.body || {}
  if (!text || typeof text !== 'string') return res.status(400).json({ error: 'Missing text.' })
  if (text.length > 1000) return res.status(400).json({ error: 'Text too long.' })
  const languageName = SUPPORTED_AUDIO_LANGUAGES[lang]
  if (!languageName) return res.status(400).json({ error: 'Unsupported language.' })

  if (lang === 'en') return res.json({ translated: text, lang, cached: false })

  const cacheKey = `${lang}::${text}`
  if (translateCache.has(cacheKey)) {
    return res.json({ translated: translateCache.get(cacheKey), lang, cached: true })
  }
  if (!aiConfigured()) {
    return res.status(503).json({ error: 'Translation is not configured on the server yet.' })
  }
  try {
    const translated = await translateText({ text, targetLanguage: languageName })
    translateCache.set(cacheKey, translated)
    res.json({ translated, lang, cached: false })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Translation failed.' })
  }
})

// Whole-page translation for the site-wide language switcher. Accepts an
// array of short UI strings, translates whichever ones aren't already
// cached in ONE combined AI call, and returns them all in original order.
const MAX_BATCH_TEXTS = 150
app.post('/api/translate/batch', async (req, res) => {
  const { texts, lang } = req.body || {}
  if (!Array.isArray(texts) || texts.length === 0) return res.status(400).json({ error: 'texts must be a non-empty array.' })
  if (texts.length > MAX_BATCH_TEXTS) return res.status(400).json({ error: `Too many strings at once (max ${MAX_BATCH_TEXTS}).` })
  const languageName = SUPPORTED_AUDIO_LANGUAGES[lang]
  if (!languageName) return res.status(400).json({ error: 'Unsupported language.' })

  if (lang === 'en') return res.json({ translations: texts, lang })

  const toTranslate = []
  const toTranslateIdx = []
  const results = new Array(texts.length)
  texts.forEach((text, i) => {
    if (typeof text !== 'string' || !text.trim()) { results[i] = text; return }
    const cacheKey = `${lang}::${text}`
    if (translateCache.has(cacheKey)) {
      results[i] = translateCache.get(cacheKey)
    } else {
      toTranslate.push(text)
      toTranslateIdx.push(i)
    }
  })

  if (toTranslate.length === 0) return res.json({ translations: results, lang })
  if (!aiConfigured()) return res.status(503).json({ error: 'Translation is not configured on the server yet.' })

  try {
    const translated = await translateBatch({ texts: toTranslate, targetLanguage: languageName })
    translated.forEach((t, j) => {
      const originalIdx = toTranslateIdx[j]
      results[originalIdx] = t
      translateCache.set(`${lang}::${toTranslate[j]}`, t)
    })
    res.json({ translations: results, lang })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Translation failed.' })
  }
})

app.get('/api/ai/status', requireAuth, (req, res) => res.json({ configured: aiConfigured(), isPro: !!req.user.isPro }))

// AI Explain — Pro only
app.post('/api/ai/explain', requireAuth, requirePro, async (req, res) => {
  const { question, options, correctAnswer, userAnswer, topic } = req.body || {}
  if (!question || !correctAnswer) return res.status(400).json({ error: 'question and correctAnswer required.' })
  try {
    const explanation = await explainAnswer({ question, options, correctAnswer, userAnswer, topic })
    res.json({ explanation })
  } catch (err) { res.status(500).json({ error: err.message || 'AI explanation failed.' }) }
})

// AI Chat — ALL logged-in users (free basic, pro full)
app.post('/api/ai/chat', requireAuth, async (req, res) => {
  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) return res.status(400).json({ error: 'messages array required.' })
  try {
    const reply = await chatReply({ history: messages, isPro: !!req.user.isPro })
    res.json({ reply })
  } catch (err) { res.status(500).json({ error: err.message || 'AI chat failed.' }) }
})

// AI Study Tips — available to all users (demo feature)
app.post('/api/ai/study-tip', requireAuth, async (req, res) => {
  const { topic } = req.body || {}
  try {
    const { askAI } = await import('./ai.js')
    const tip = await askAI({
      system: 'You are a friendly ECS exam tutor. Give one short, practical study tip (2-3 sentences max) for the given ECS topic.',
      messages: [{ role: 'user', content: `Give me a study tip for: ${topic || 'general ECS health and safety'}` }],
      maxTokens: 150,
    })
    res.json({ tip })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// AI Mock Test Analysis — Pro only
app.post('/api/ai/analyze-test', requireAuth, requirePro, async (req, res) => {
  const { results, testType } = req.body || {}
  try {
    const { askAI } = await import('./ai.js')
    const analysis = await askAI({
      system: 'You are a ECS exam coach. Analyse these test results and give 3 specific, actionable improvement tips. Be concise and encouraging.',
      messages: [{ role: 'user', content: `Test type: ${testType}. Results: ${JSON.stringify(results)}` }],
      maxTokens: 400,
    })
    res.json({ analysis })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// AI Quiz Generator — Pro only. Generates a fresh set of ECS-style
// multiple-choice questions for any topic, on demand.
const QUIZ_RATE_LIMIT_MS = 10_000 // simple per-user throttle so one click can't fan out into many AI calls
const lastQuizRequestAt = new Map()
app.post('/api/ai/generate-quiz', requireAuth, requirePro, async (req, res) => {
  const { topic, count, difficulty } = req.body || {}
  if (!topic || typeof topic !== 'string' || !topic.trim()) {
    return res.status(400).json({ error: 'topic is required.' })
  }
  const now = Date.now()
  const last = lastQuizRequestAt.get(req.user.id) || 0
  if (now - last < QUIZ_RATE_LIMIT_MS) {
    return res.status(429).json({ error: 'Please wait a few seconds before generating another quiz.' })
  }
  lastQuizRequestAt.set(req.user.id, now)
  try {
    const questions = await generateQuiz({ topic: topic.trim(), count, difficulty: difficulty || 'mixed' })
    res.json({ topic: topic.trim(), difficulty: difficulty || 'mixed', questions })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Quiz generation failed.' })
  }
})

// Public checkout for the £99 ECS card application fee — no login required,
// since applicants submit the booking form as a guest. Amount is fixed
// server-side (not taken from the client) so it can't be tampered with.
app.post('/api/stripe/create-card-payment', contactLimiter, async (req, res) => {
  if (!stripe) return res.status(500).json({ error: 'Stripe not configured.' })
  const { fullName, email } = req.body || {}
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'gbp',
          unit_amount: 9900, // £99.00 — card fee (£36) + VAT (£7.20) + service fee (£55.80)
          product_data: { name: 'ECS Card Application Fee' },
        },
        quantity: 1,
      }],
      customer_email: email || undefined,
      metadata: { fullName: fullName || '', purpose: 'ecs-card-application' },
      success_url: `${CLIENT_URL}/ecscardbooking?paid=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/ecscardbooking?canceled=true`,
    })
    res.json({ url: session.url })
  } catch (err) { res.status(500).json({ error: 'Could not start card payment.' }) }
})

// ---- Stripe ----
app.post('/api/stripe/create-checkout-session', requireAuth, async (req, res) => {
  if (!stripe) return res.status(500).json({ error: 'Stripe not configured.' })
  const { plan } = req.body || {}
  const priceId = PRICE_IDS[plan]
  if (!priceId) return res.status(400).json({ error: 'Unknown plan.' })
  try {
    const session = await stripe.checkout.sessions.create({
      mode: plan === 'lifetime' ? 'payment' : 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: req.user.email,
      client_reference_id: req.user.id,
      metadata: { plan, userId: req.user.id },
      success_url: `${CLIENT_URL}/checkout?plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/checkout?plan=${plan}&canceled=true`,
    })
    res.json({ url: session.url })
  } catch (err) { res.status(500).json({ error: 'Could not start checkout.' }) }
})

app.get('/api/stripe/verify-session', requireAuth, async (req, res) => {
  if (!stripe) return res.status(500).json({ error: 'Stripe not configured.' })
  const { session_id } = req.query
  if (!session_id) return res.status(400).json({ error: 'Missing session_id.' })
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session.payment_status === 'paid' || session.status === 'complete') {
      const plan = session.metadata?.plan || 'monthly'
      const updated = await updateUser(req.user.id, { isPro: true, plan, stripeCustomerId: session.customer, stripeSubscriptionId: session.subscription || null })
      return res.json({ user: toSafeUser(updated) })
    }
    res.status(402).json({ error: 'Payment not completed yet.' })
  } catch (err) { res.status(500).json({ error: 'Could not verify payment.' }) }
})

// Stripe Customer Portal — lets a Pro user cancel, switch plan, or update
// their card themselves without emailing support. Requires a Billing
// Portal configuration to be set up once in the Stripe Dashboard.
app.post('/api/stripe/create-portal-session', requireAuth, async (req, res) => {
  if (!stripe) return res.status(500).json({ error: 'Stripe not configured.' })
  const user = await findById(req.user.id)
  if (!user?.stripeCustomerId) return res.status(400).json({ error: 'No billing account found for this user.' })
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${CLIENT_URL}/settings`,
    })
    res.json({ url: session.url })
  } catch (err) { res.status(500).json({ error: 'Could not open billing portal.' }) }
})

// ---- Contact / enquiry form (ECS Card Info page) ----
// (contactLimiter itself is defined near the top of the file, before use)

function contactEmailHtml({ name, email, enquiryType, message }) {
  const esc = (s = '') => String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#0f172a;padding:20px 28px;">
          <span style="color:#f59e0b;font-weight:800;font-size:18px;">ECSPrep</span>
          <span style="color:#94a3b8;font-size:13px;"> · New ECS Card enquiry</span>
        </td></tr>
        <tr><td style="padding:28px;">
          <p style="margin:0 0 12px;color:#0f172a;font-size:14px;"><strong>Name:</strong> ${esc(name)}</p>
          <p style="margin:0 0 12px;color:#0f172a;font-size:14px;"><strong>Email:</strong> ${esc(email)}</p>
          <p style="margin:0 0 12px;color:#0f172a;font-size:14px;"><strong>Enquiry type:</strong> ${esc(enquiryType || 'General Information')}</p>
          <p style="margin:16px 0 4px;color:#0f172a;font-size:14px;"><strong>Message:</strong></p>
          <p style="margin:0;color:#334155;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(message)}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

function contactConfirmationHtml(name) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#0f172a;padding:20px 28px;">
          <span style="color:#f59e0b;font-weight:800;font-size:18px;">ECSPrep</span>
        </td></tr>
        <tr><td style="padding:28px;">
          <p style="margin:0 0 12px;color:#0f172a;font-size:15px;">Hi ${name || 'there'},</p>
          <p style="margin:0 0 12px;color:#334155;font-size:14px;line-height:1.6;">
            Thanks for your ECS card enquiry — we've received it and will get back to you shortly.
          </p>
          <p style="margin:0;color:#94a3b8;font-size:12px;">— The ECSPrep team</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, enquiryType, message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and enquiry message are required.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }
  const to = FROM_EMAIL
  await sendEmail({ to, subject: `📩 New ECS card enquiry from ${name}`, html: contactEmailHtml({ name, email, enquiryType, message }) })
  await sendEmail({ to: email, subject: 'We\u2019ve received your ECSPrep enquiry', html: contactConfirmationHtml(name) })
  res.json({ success: true })
})

// ---- ECS Card application (independent form, no payment collected here) ----
function bookingEmailHtml({
  fullName, dob, niNumber, gender,
  streetAddress, townCity, postcode, phone, email,
  applicationType, previousCardNumber, previousExpiryDate,
  cardType, jobTitle, employer, qualification, hasPassedTest, notes,
}) {
  const esc = (s = '') => String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))
  const row = (label, val) => val ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:13px;white-space:nowrap;">${label}</td><td style="padding:6px 0;color:#0f172a;font-size:13px;">${esc(val)}</td></tr>` : ''
  const address = [streetAddress, townCity, postcode].filter(Boolean).join(', ')
  return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;background:#f1f5f9;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px;">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;">
      <tr><td style="background:#0d9488;padding:20px 28px;">
        <h1 style="margin:0;color:#fff;font-size:18px;">New ECS Card Application</h1>
      </td></tr>
      <tr><td style="padding:24px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('Full name', fullName)}
          ${row('Date of birth', dob)}
          ${row('NI number', niNumber)}
          ${row('Gender', gender)}
          ${row('Address', address)}
          ${row('Mobile', phone)}
          ${row('Email', email)}
          ${row('Application type', applicationType)}
          ${row('Previous card number', previousCardNumber)}
          ${row('Previous expiry date', previousExpiryDate)}
          ${row('Card type', cardType)}
          ${row('Occupation / job title', jobTitle)}
          ${row('Employer', employer)}
          ${row('Qualification / NVQ level', qualification)}
          ${row('Passed HS&E test?', hasPassedTest)}
          ${row('Fee', `£57.00 card + £11.40 VAT + £30.60 service = £99.00 total`)}
          ${row('Notes', notes)}
        </table>
        <p style="margin:16px 0 0;color:#64748b;font-size:12px;">Uploaded documents (if any) are attached to this email.</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`
}

function bookingConfirmationHtml(fullName) {
  return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;background:#f1f5f9;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px;">
    <table width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;">
      <tr><td style="background:#0d9488;padding:20px 28px;">
        <h1 style="margin:0;color:#fff;font-size:18px;">We've received your booking request</h1>
      </td></tr>
      <tr><td style="padding:24px 28px;">
        <p style="margin:0 0 12px;color:#0f172a;font-size:15px;">Hi ${fullName || 'there'},</p>
        <p style="margin:0 0 12px;color:#334155;font-size:14px;line-height:1.6;">
          Thanks for submitting your ECS card application. Our team will review your details
          and uploaded documents, then contact you shortly to confirm your application and
          next steps, including payment.
        </p>
        <p style="margin:0;color:#94a3b8;font-size:12px;">— The ECSPrep team</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`
}

// Where new booking requests get sent
const BOOKING_NOTIFY_EMAIL = 'applyecs4@gmail.com'

const bookingFileFields = bookingUpload.fields([
  { name: 'hseProof', maxCount: 1 },
  { name: 'passportPhoto', maxCount: 1 },
  { name: 'idProof', maxCount: 1 },
])

app.post('/api/book-card', contactLimiter, bookingFileFields, async (req, res) => {
  const {
    fullName, dob, niNumber, gender,
    streetAddress, townCity, postcode, phone, email, confirmEmail,
    applicationType, previousCardNumber, previousExpiryDate,
    cardType, jobTitle, employer, qualification, hasPassedTest, notes,
  } = req.body || {}

  if (!fullName || !dob || !niNumber || !gender || !streetAddress || !townCity || !postcode || !phone || !email) {
    return res.status(400).json({ error: 'Please fill in all required personal and contact details.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }
  if (confirmEmail && confirmEmail !== email) {
    return res.status(400).json({ error: 'Email addresses do not match.' })
  }
  if (!jobTitle) {
    return res.status(400).json({ error: 'Occupation / job title is required.' })
  }
  if (applicationType === 'Renewal' && !previousCardNumber) {
    return res.status(400).json({ error: 'Previous card number is required for a renewal.' })
  }

  const files = req.files || {}
  const passportPhoto = files.passportPhoto?.[0]
  const idProof = files.idProof?.[0]
  if (!passportPhoto) return res.status(400).json({ error: 'Passport size photo is required.' })
  if (!idProof) return res.status(400).json({ error: 'Identity proof is required.' })
  if (hasPassedTest === 'yes' && !files.hseProof?.[0]) {
    return res.status(400).json({ error: 'Please upload proof of your H&S / HS&E test pass.' })
  }

  const attachments = [passportPhoto, idProof, files.hseProof?.[0]]
    .filter(Boolean)
    .map((f) => ({ filename: f.originalname, content: f.buffer, contentType: f.mimetype }))

  const payload = {
    fullName, dob, niNumber, gender, streetAddress, townCity, postcode, phone, email,
    applicationType, previousCardNumber, previousExpiryDate,
    cardType, jobTitle, employer, qualification, hasPassedTest, notes,
  }
  await sendEmail({
    to: BOOKING_NOTIFY_EMAIL,
    subject: `🪪 New ECS card application from ${fullName}`,
    html: bookingEmailHtml(payload),
    attachments,
  })
  await sendEmail({ to: email, subject: 'We\u2019ve received your ECS card application', html: bookingConfirmationHtml(fullName) })

  res.json({ success: true })
})

// ---- Global error handler (safety net) ----
// With express-async-errors, any route above that throws or rejects
// (e.g. the Postgres pool failing because DATABASE_URL is missing/wrong,
// or the Neon DB being paused) lands here instead of crashing the process
// or sending an HTML error page. This is exactly what was causing the
// frontend's generic "Something went wrong. Please try again." message —
// the browser tried to JSON.parse() an HTML error page and failed, so it
// fell back to that generic string.
app.use((err, req, res, next) => {
  console.error('Unhandled route error:', err)
  if (res.headersSent) return next(err)
  const status = err.status || err.statusCode || 500
  res.status(status).json({
    error: status === 500 ? 'Something went wrong on our end. Please try again shortly.' : (err.message || 'Request failed.'),
  })
})

// 404 for anything that didn't match a route above
app.use((req, res) => res.status(404).json({ error: 'Not found.' }))

app.listen(PORT, () => console.log(`✅ ECSPrep API running on http://localhost:${PORT}`))

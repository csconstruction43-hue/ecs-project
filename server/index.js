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
  getSetting, setSetting,
  logAdminAudit, getAdminAudit, getAnalyticsSummary,
  listTickets, getTicket, createTicket, updateTicket, deleteTicket,
  listNotifications, getNotification, createNotification, deleteNotification, countNotificationReads,
  getNotificationsForUser, countUnreadNotificationsForUser, markNotificationRead,
  listBlogPosts, getBlogPost, getBlogPostBySlug, createBlogPost, updateBlogPost, deleteBlogPost,
  getHiddenBlogSlugs, setHiddenBlogSlugs,
  listPages, getPage, getPageBySlug, createPage, updatePage, deletePage,
  listQuestionReports, getQuestionReport, createQuestionReport, updateQuestionReport, deleteQuestionReport,
  listCardApplications, getCardApplication, getCardApplicationForUser, getCardApplicationForEmail,
  createCardApplication, updateCardApplication,
  listTeamInvitesForEmployer, getTeamInvite, createTeamInvite, updateTeamInvite, deleteTeamInvite,
  listCoupons, getCoupon, getCouponByCode, createCoupon, updateCoupon, deleteCoupon, incrementCouponUsage,
  getSystemHealthSnapshot, exportFullBackup,
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
  TWILIO_ACCOUNT_SID = '',
  TWILIO_AUTH_TOKEN = '',
  TWILIO_FROM_NUMBER = '',
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
  if (!SMTP_USER) { 
    if (process.env.DEBUG) console.log('[Email skipped — no SMTP_USER]', subject, 'to', to); 
    return 
  }
  try {
    await transporter.sendMail({ from: `"ECSPrep" <${FROM_EMAIL}>`, to, subject, html, attachments })
  } catch (e) { console.error('Email failed:', e.message) }
}

// New feature: SMS text reminders. Uses Twilio's plain REST API via the
// platform's built-in fetch — no extra npm dependency needed. Degrades
// exactly like sendEmail above: if Twilio isn't configured, it just logs
// and moves on rather than breaking whatever called it.
async function sendSms({ to, body }) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
    if (process.env.DEBUG) console.log('[SMS skipped — Twilio not configured]', 'to', to, '-', body)
    return
  }
  try {
    const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')
    const params = new URLSearchParams({ To: to, From: TWILIO_FROM_NUMBER, Body: body })
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    })
    if (!res.ok) console.error('SMS failed:', res.status, await res.text().catch(() => ''))
  } catch (e) { console.error('SMS failed:', e.message) }
}

// Generic wrapper used for admin broadcast emails (announcements, promos) —
// simpler than the transactional templates below since the body is free text.
function broadcastEmailHtml(name, messageHtml) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:32px 48px;text-align:center;">
          <span style="font-size:24px;color:#fff;font-weight:bold;">🏗️ ECSPrep</span>
        </td></tr>
        <tr><td style="padding:32px 48px;">
          <p style="font-size:16px;color:#111827;margin:0 0 16px;">Hi ${name || 'there'},</p>
          <div style="font-size:15px;color:#374151;line-height:1.6;">${messageHtml}</div>
          <p style="font-size:13px;color:#9ca3af;margin-top:32px;">— The ECSPrep team</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
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

// New feature: Two-Factor Authentication (email OTP) — used both for the
// "verify it's you" step during login and for confirming the toggle in
// Settings > Security.
function twoFactorCodeEmailHtml(name, code, { forLogin } = {}) {
  const heading = forLogin ? '🔐 Your ECSPrep sign-in code' : '🔐 Confirm two-factor authentication'
  const intro = forLogin
    ? 'Enter this code to finish signing in to your ECSPrep account.'
    : 'Enter this code to turn on two-factor authentication for your account.'
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#0d9488,#0f766e);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:20px;">${heading}</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">Hi ${name || 'there'},</p>
    <p style="color:#374151;font-size:16px;">${intro}</p>
    <p style="font-size:36px;font-weight:700;letter-spacing:8px;color:#0f172a;background:#f1f5f9;border-radius:12px;padding:16px;text-align:center;margin:20px 0;">${code}</p>
    <p style="color:#6b7280;font-size:13px;">This code expires in 10 minutes. If you didn't request it, you can safely ignore this email — your account is still secure.</p>
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
      // Only counted against the coupon's usage limit once payment has
      // actually completed (not merely started at create-checkout-session).
      if (session.metadata?.couponId) {
        incrementCouponUsage(session.metadata.couponId).catch(() => {})
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

// New feature: Two-Factor Authentication (email OTP).
// twoFactorCodes: userId -> { code, expires, purpose: 'login' | 'enable' }
// In-memory is fine here, same tradeoff as the existing password-reset
// token map below — codes are short-lived (10 min) and a server restart
// simply means the person requests a fresh one.
const twoFactorCodes = new Map()
function generateOtp() {
  return String(crypto.randomInt(100000, 999999))
}
// Short-lived token proving "this device just supplied the correct
// password for this account", handed to the client while we wait for the
// OTP — deliberately NOT a full session token (10 min expiry, single
// purpose claim so it can't be used anywhere else).
function signPendingToken(user) {
  return jwt.sign({ sub: user.id, purpose: '2fa_pending' }, JWT_SECRET, { expiresIn: '10m' })
}
function verifyPendingToken(pendingToken) {
  const payload = jwt.verify(pendingToken, JWT_SECRET)
  if (payload.purpose !== '2fa_pending') throw new Error('Invalid verification session.')
  return payload
}
async function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Not signed in.' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await findById(payload.sub)
    if (!user || user.deletedAt) return res.status(401).json({ error: 'Session expired.' })
    if (user.suspended && user.role !== 'admin') return res.status(403).json({ error: 'This account has been suspended. Contact support if you think this is a mistake.' })
    req.user = user; next()
  } catch { return res.status(401).json({ error: 'Invalid or expired session.' }) }
}
// New feature: granular admin roles. 'admin' remains full/super access.
// 'support_agent' and 'content_editor' are lighter staff roles that can
// sign in to /admin but only reach a subset of sections — requireAdmin
// below is the "can enter the admin area at all" gate; requireSuperAdmin
// (further down) additionally gates the sensitive sections (user
// management, billing, settings, broadcasts, audit log).
const STAFF_ROLES = ['admin', 'support_agent', 'content_editor']
function requireAdmin(req, res, next) {
  if (!STAFF_ROLES.includes(req.user?.role)) return res.status(403).json({ error: 'Admin access required.' })
  next()
}
function requireSuperAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'This section requires full admin access.' })
  next()
}
function requirePro(req, res, next) {
  if (!req.user?.isPro) return res.status(402).json({ error: 'Pro feature. Upgrade to unlock AI.', upgradeRequired: true })
  next()
}

// ---- Site Settings (feature toggles) ----
// All public-facing toggles + the site colour theme live together in one
// JSON blob under the "public" settings key, so the frontend can fetch
// everything it needs (locked pages, maintenance mode, theme, etc.) in a
// single request instead of one round-trip per toggle.
const PUBLIC_SETTINGS_KEY = 'public'
const DEFAULT_PUBLIC_SETTINGS = {
  siteTheme: 'forest-green', // matches the site's current green branding
  ecsCardsPageEnabled: true,
  blogPageEnabled: true,
  registrationEnabled: true,
  maintenanceMode: false,
  // "Book Your ECS Card" promo banner shown on the blog listing + every
  // blog post — off by default until an admin turns it on.
  blogCardBookingUpsellEnabled: false,
  // "Book Your ECS Test" promo banner shown on the blog listing + every
  // blog post — a separate toggle from the card-booking one above, off by
  // default until an admin turns it on.
  blogTestBookingUpsellEnabled: false,
  // UK Festival greeting banner — shown sitewide (Layout, under the header)
  // whenever today falls inside a festival's window, e.g. "Happy Diwali!".
  // The home page also gets a bigger "pro" version of the same banner,
  // controlled by its own toggle so an admin can run them independently.
  festivalBannerEnabled: true,
  festivalHomeBannerEnabled: true,
  // Visual style applied to whichever festival is active — see
  // FESTIVAL_DESIGNS in src/lib/festivals.js for the available ids.
  festivalBannerDesign: 'gradient',
  // Festival ids an admin has switched off individually (e.g. hide just
  // "Bonfire Night" while keeping every other festival on).
  festivalDisabledIds: [],
  // Generic show/hide control for the site's built-in content pages (About,
  // Contact, Pricing, Courses, etc. — see src/lib/pageRegistry.js). Keyed
  // by page key; a key missing from this object means "visible" (default).
  // This is separate from ecsCardsPageEnabled/blogPageEnabled above, which
  // predate this generic system and stay as their own dedicated flags.
  pageVisibility: {},
  // Sitewide announcement banner (e.g. "CITB test slots open for March"),
  // shown just under the header until an admin turns it off.
  announcementEnabled: false,
  announcementMessage: '',
  announcementType: 'info', // 'info' | 'warning' | 'success'
  // SEO defaults, managed from Admin > SEO Manager. These are reference
  // values (shown in the admin panel and, for the two boolean/verification
  // fields, actually injected sitewide) rather than a per-page override —
  // per-page title/description still comes from each page's own <Seo />.
  seoSiteDescription: '',
  seoDefaultOgImage: '',
  seoTwitterHandle: '',
  seoGoogleVerification: '',
  seoRobotsIndexingDisabled: false, // when true, forces noindex,nofollow sitewide (e.g. staging)
}

async function getPublicSettings() {
  const stored = await getSetting(PUBLIC_SETTINGS_KEY, {})
  return { ...DEFAULT_PUBLIC_SETTINGS, ...stored }
}

// Public: anyone (including logged-out visitors) can read the current
// toggles/theme, so the frontend knows what to show before login.
app.get('/api/settings/public', async (req, res) => {
  try {
    const settings = await getPublicSettings()
    res.json(settings)
  } catch (error) {
    console.error('Error fetching public settings:', error.message)
    res.status(500).json({ error: 'Failed to fetch settings' })
  }
})

// Admin-only: update one or more toggles/theme at once. Regular users are
// never able to reach this route (requireAuth + requireAdmin below), and
// admins always keep full access to every page regardless of these flags —
// the flags only affect what non-admin visitors are shown.
app.patch('/api/admin/settings', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const allowedKeys = Object.keys(DEFAULT_PUBLIC_SETTINGS)
  const patch = {}
  for (const key of allowedKeys) {
    if (req.body && Object.prototype.hasOwnProperty.call(req.body, key)) patch[key] = req.body[key]
  }
  if (Object.keys(patch).length === 0) return res.status(400).json({ error: 'No valid settings were provided.' })
  if ('siteTheme' in patch && typeof patch.siteTheme !== 'string') return res.status(400).json({ error: '"siteTheme" must be a string.' })
  for (const boolKey of ['ecsCardsPageEnabled', 'blogPageEnabled', 'registrationEnabled', 'maintenanceMode', 'announcementEnabled', 'blogCardBookingUpsellEnabled', 'blogTestBookingUpsellEnabled', 'festivalBannerEnabled', 'festivalHomeBannerEnabled']) {
    if (boolKey in patch && typeof patch[boolKey] !== 'boolean') return res.status(400).json({ error: `"${boolKey}" must be true or false.` })
  }
  if ('festivalBannerDesign' in patch && !['gradient', 'minimal', 'glow', 'bordered'].includes(patch.festivalBannerDesign)) {
    return res.status(400).json({ error: '"festivalBannerDesign" must be one of: gradient, minimal, glow, bordered.' })
  }
  if ('festivalDisabledIds' in patch) {
    if (!Array.isArray(patch.festivalDisabledIds) || !patch.festivalDisabledIds.every((id) => typeof id === 'string')) {
      return res.status(400).json({ error: '"festivalDisabledIds" must be an array of festival id strings.' })
    }
  }
  if ('pageVisibility' in patch) {
    const pv = patch.pageVisibility
    const isPlainObject = pv && typeof pv === 'object' && !Array.isArray(pv)
    if (!isPlainObject || !Object.values(pv).every((v) => typeof v === 'boolean')) {
      return res.status(400).json({ error: '"pageVisibility" must be an object mapping page keys to true/false.' })
    }
  }
  if ('announcementMessage' in patch && typeof patch.announcementMessage !== 'string') return res.status(400).json({ error: '"announcementMessage" must be a string.' })
  if ('announcementType' in patch && !['info', 'warning', 'success'].includes(patch.announcementType)) {
    return res.status(400).json({ error: '"announcementType" must be one of: info, warning, success.' })
  }
  for (const strKey of ['seoSiteDescription', 'seoDefaultOgImage', 'seoTwitterHandle', 'seoGoogleVerification']) {
    if (strKey in patch && typeof patch[strKey] !== 'string') return res.status(400).json({ error: `"${strKey}" must be a string.` })
  }
  if ('seoRobotsIndexingDisabled' in patch && typeof patch.seoRobotsIndexingDisabled !== 'boolean') {
    return res.status(400).json({ error: '"seoRobotsIndexingDisabled" must be true or false.' })
  }
  const current = await getPublicSettings()
  const merged = { ...current, ...patch }
  await setSetting(PUBLIC_SETTINGS_KEY, merged)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'settings_updated', targetType: 'settings', meta: { changed: patch } })
  res.json(merged)
})

// ---- Auth ----
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, ref } = req.body || {}
    if (!name || !email || !password || password.length < 6)
      return res.status(400).json({ error: 'Name, email and password (6+ chars) required.' })
    const settings = await getPublicSettings()
    if (!settings.registrationEnabled) return res.status(403).json({ error: 'New account registration is currently closed. Please check back later.' })
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

// Finalises a login: refreshes role, updates lastActive, logs the event and
// hands back a real session token. Shared by the plain-password path above
// and the 2FA-verified path below, so both end up with identical behaviour.
// New feature: admin login security alert. Staff accounts (admin/
// support_agent/content_editor) hold real power over the platform, so a
// sign-in from an IP we haven't seen before for that account triggers an
// email — a burgled password is far less useful to an attacker if the
// legitimate admin gets pinged the moment it's used.
function adminLoginAlertEmailHtml(user, ip, userAgent) {
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#dc2626,#991b1b);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:20px;">🔐 New admin sign-in detected</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">Hi ${user.name || 'there'},</p>
    <p style="color:#374151;font-size:16px;">Your admin account just signed in from a location we haven't seen before:</p>
    <table style="width:100%;font-size:14px;color:#374151;margin:16px 0;">
      <tr><td style="padding:4px 0;color:#6b7280;">Time</td><td>${new Date().toLocaleString('en-GB')}</td></tr>
      <tr><td style="padding:4px 0;color:#6b7280;">IP address</td><td>${ip}</td></tr>
      <tr><td style="padding:4px 0;color:#6b7280;">Device</td><td>${userAgent}</td></tr>
    </table>
    <p style="color:#374151;font-size:15px;">If this was you, no action is needed. If it wasn't, change your password immediately and turn on Two-Factor Authentication in Settings &gt; Security.</p>
  </div>
</div>
</body></html>`
}

async function alertOnUnrecognisedStaffLogin(user, req) {
  if (!STAFF_ROLES.includes(user.role)) return
  try {
    const ip = req?.ip || 'unknown'
    const knownIps = Array.isArray(user.knownLoginIps) ? user.knownLoginIps : []
    if (knownIps.includes(ip)) return
    await updateUser(user.id, { knownLoginIps: [...knownIps, ip].slice(-10) })
    // Nothing to compare the very first recorded IP against — skip the
    // alert on it so a brand-new staff account doesn't get one immediately.
    if (knownIps.length === 0) return
    const userAgent = req?.headers?.['user-agent'] || 'unknown device'
    await sendEmail({ to: user.email, subject: '🔐 New admin sign-in detected', html: adminLoginAlertEmailHtml(user, ip, userAgent) })
  } catch (e) { console.error('Login alert failed:', e.message) }
}

async function issueLoginSuccess(user, res) {
  // New feature (granular admin roles): only ever auto-PROMOTE an email
  // found in ADMIN_EMAILS to 'admin' — never auto-revert a manually
  // assigned staff role (support_agent/content_editor) back to 'user',
  // which the old unconditional "sync to roleForEmail()" logic used to do.
  let finalUser = user
  if (roleForEmail(user.email) === 'admin' && user.role !== 'admin') {
    finalUser = await updateUser(user.id, { role: 'admin' })
  }
  await updateUser(finalUser.id, { lastActive: new Date().toISOString() })
  await logActivity({ userId: finalUser.id, type: 'login' })
  await alertOnUnrecognisedStaffLogin(finalUser, res.req)
  res.json({ token: signToken(finalUser), user: toSafeUser(finalUser) })
}

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    const user = await findByEmail(email || '')
    if (!user || !user.password) return res.status(401).json({ error: 'Invalid email or password.' })
    if (user.suspended) return res.status(403).json({ error: 'This account has been suspended. Contact support if you think this is a mistake.' })
    const valid = await bcrypt.compare(password || '', user.password)
    if (!valid) return res.status(401).json({ error: 'Invalid email or password.' })

    // New feature: Two-Factor Authentication. Password was correct, but if
    // the account has 2FA turned on we hold back the real session token
    // until the emailed code is verified.
    if (user.twoFactorEnabled) {
      const code = generateOtp()
      twoFactorCodes.set(user.id, { code, expires: Date.now() + 10 * 60_000, purpose: 'login' })
      sendEmail({ to: user.email, subject: '🔐 Your ECSPrep sign-in code', html: twoFactorCodeEmailHtml(user.name, code, { forLogin: true }) })
      return res.json({ requires2FA: true, pendingToken: signPendingToken(user) })
    }

    await issueLoginSuccess(user, res)
  } catch (err) {
    console.error('Login failed:', err)
    res.status(500).json({ error: 'Login failed. Please try again in a moment.' })
  }
})

// New feature: Two-Factor Authentication — verify the emailed code and
// complete the login that /api/auth/login put on hold.
app.post('/api/auth/2fa/verify', async (req, res) => {
  const { pendingToken, code } = req.body || {}
  if (!pendingToken || !code) return res.status(400).json({ error: 'Please enter the 6-digit code.' })
  let payload
  try { payload = verifyPendingToken(pendingToken) }
  catch { return res.status(401).json({ error: 'Your sign-in session has expired. Please sign in again.' }) }

  const entry = twoFactorCodes.get(payload.sub)
  if (!entry || entry.purpose !== 'login' || entry.expires < Date.now()) {
    return res.status(400).json({ error: 'That code has expired. Please request a new one.' })
  }
  if (entry.code !== String(code).trim()) return res.status(400).json({ error: 'Incorrect code. Please try again.' })
  twoFactorCodes.delete(payload.sub)

  const user = await findById(payload.sub)
  if (!user) return res.status(401).json({ error: 'Account not found.' })
  if (user.suspended) return res.status(403).json({ error: 'This account has been suspended. Contact support if you think this is a mistake.' })
  await issueLoginSuccess(user, res)
})

// Sends a fresh sign-in code (e.g. the first one expired or landed in spam).
app.post('/api/auth/2fa/resend', async (req, res) => {
  const { pendingToken } = req.body || {}
  if (!pendingToken) return res.status(400).json({ error: 'Missing sign-in session.' })
  let payload
  try { payload = verifyPendingToken(pendingToken) }
  catch { return res.status(401).json({ error: 'Your sign-in session has expired. Please sign in again.' }) }
  const user = await findById(payload.sub)
  if (!user) return res.status(401).json({ error: 'Account not found.' })
  const code = generateOtp()
  twoFactorCodes.set(user.id, { code, expires: Date.now() + 10 * 60_000, purpose: 'login' })
  await sendEmail({ to: user.email, subject: '🔐 Your ECSPrep sign-in code', html: twoFactorCodeEmailHtml(user.name, code, { forLogin: true }) })
  res.json({ ok: true })
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
    if (isNew) {
      const settings = await getPublicSettings()
      if (!settings.registrationEnabled) return res.status(403).json({ error: 'New account registration is currently closed. Please check back later.' })
    }
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
  } catch (err) { console.error('[google-signin]', err); res.status(401).json({ error: 'Could not verify Google sign-in.' }) }
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

// ---- Notification & reminder preferences (self-service, new feature) ----
// Kept separate from /api/user/profile above since these drive the
// scheduled-email jobs further down rather than the profile card.
app.patch('/api/user/preferences', requireAuth, async (req, res) => {
  const body = req.body || {}
  const patch = {}

  if (body.weeklyReportOptIn !== undefined) patch.weeklyReportOptIn = !!body.weeklyReportOptIn
  if (body.reEngagementOptIn !== undefined) patch.reEngagementOptIn = !!body.reEngagementOptIn

  if (body.employerEmail !== undefined) {
    const email = String(body.employerEmail).trim()
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Enter a valid employer email address.' })
    }
    patch.employerEmail = email
  }

  if (body.examDate !== undefined) {
    const raw = String(body.examDate || '').trim()
    if (raw && Number.isNaN(new Date(raw).getTime())) {
      return res.status(400).json({ error: 'Enter a valid exam date.' })
    }
    patch.examDate = raw || null
    // A new/changed exam date means any reminders already sent for the
    // previous date should no longer suppress the next set of reminders.
    patch.examReminder7SentAt = null
    patch.examReminder3SentAt = null
    patch.examReminder1SentAt = null
  }

  // New feature: SMS text reminders (alongside the existing email
  // reminders). UK mobile numbers only — normalises "07…" / "+447…" /
  // spaced-out formats down to a single stored shape.
  if (body.phoneNumber !== undefined) {
    const raw = String(body.phoneNumber || '').replace(/[\s-]/g, '')
    if (raw) {
      const ukMobile = raw.match(/^(?:\+44|0)(7\d{9})$/)
      if (!ukMobile) return res.status(400).json({ error: 'Enter a valid UK mobile number, e.g. 07123 456789.' })
      patch.phoneNumber = `+44${ukMobile[1]}`
    } else {
      patch.phoneNumber = ''
    }
  }
  if (body.smsRemindersEnabled !== undefined) {
    if (body.smsRemindersEnabled && !(body.phoneNumber || req.user.phoneNumber)) {
      return res.status(400).json({ error: 'Add a mobile number before turning on SMS reminders.' })
    }
    patch.smsRemindersEnabled = !!body.smsRemindersEnabled
  }

  // New feature: Employer company profile — shown on the Team Dashboard and
  // used as the letterhead on the printable Compliance Audit Report.
  if (body.companyName !== undefined) patch.companyName = String(body.companyName).trim().slice(0, 200)

  if (Object.keys(patch).length === 0) return res.status(400).json({ error: 'No changes to save.' })

  const updated = await updateUser(req.user.id, patch)
  res.json({ user: toSafeUser(updated) })
})

// ---- Self-service data export (GDPR right to data portability) ----
// Same shape as the admin export at /api/admin/users/:id/export, but scoped
// to the signed-in user's own account — no admin role required.
app.get('/api/user/export', requireAuth, async (req, res) => {
  const activity = await getUserActivity(req.user.id, 2000)
  const payload = {
    user: toSafeUser(req.user),
    activity,
    exportedAt: new Date().toISOString(),
    note: 'This is a full export of the personal data ECSPrep holds about your account, provided under UK GDPR Article 20 (right to data portability).',
  }
  res.setHeader('Content-Disposition', 'attachment; filename="my-ecsprep-data.json"')
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(payload, null, 2))
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

// New feature: Two-Factor Authentication — Settings > Security toggle.
// Sends a confirmation code to the account's own email before turning it on
// (proves the person can actually receive mail there, same as email
// verification would).
app.post('/api/user/2fa/request-enable', requireAuth, async (req, res) => {
  if (req.user.twoFactorEnabled) return res.status(400).json({ error: 'Two-factor authentication is already turned on.' })
  const code = generateOtp()
  twoFactorCodes.set(req.user.id, { code, expires: Date.now() + 10 * 60_000, purpose: 'enable' })
  await sendEmail({ to: req.user.email, subject: '🔐 Confirm two-factor authentication', html: twoFactorCodeEmailHtml(req.user.name, code, { forLogin: false }) })
  res.json({ ok: true })
})

app.post('/api/user/2fa/confirm-enable', requireAuth, async (req, res) => {
  const { code } = req.body || {}
  const entry = twoFactorCodes.get(req.user.id)
  if (!entry || entry.purpose !== 'enable' || entry.expires < Date.now()) {
    return res.status(400).json({ error: 'That code has expired. Please request a new one.' })
  }
  if (entry.code !== String(code || '').trim()) return res.status(400).json({ error: 'Incorrect code. Please try again.' })
  twoFactorCodes.delete(req.user.id)
  const updated = await updateUser(req.user.id, { twoFactorEnabled: true })
  await logActivity({ userId: req.user.id, type: '2fa_enabled' })
  res.json({ user: toSafeUser(updated) })
})

app.post('/api/user/2fa/disable', requireAuth, async (req, res) => {
  const { password } = req.body || {}
  if (req.user.password) {
    if (!password) return res.status(400).json({ error: 'Please confirm your password to turn off two-factor authentication.' })
    const valid = await bcrypt.compare(password, req.user.password)
    if (!valid) return res.status(401).json({ error: 'Incorrect password.' })
  }
  const updated = await updateUser(req.user.id, { twoFactorEnabled: false })
  await logActivity({ userId: req.user.id, type: '2fa_disabled' })
  res.json({ user: toSafeUser(updated) })
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
app.get('/api/admin/course-requests', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
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
app.post('/api/admin/course-requests/:userId/:courseId/approve', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
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
app.post('/api/admin/course-requests/:userId/:courseId/reject', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
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

app.get('/api/admin/users', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const now = Date.now()
  const all = await listAll()
  const users = all.map((u) => {
    const safe = toSafeUser(u)
    const lastActiveMs = u.lastActive ? new Date(u.lastActive).getTime() : 0
    return { ...safe, online: now - lastActiveMs < ONLINE_WINDOW_MS }
  })
  res.json({ users })
})

// Admin: quick search across users by name/email — powers the search box
// in the admin header so an admin can jump straight to a user. Registered
// ahead of the '/:id' route below so 'search' never gets swallowed as an id.
app.get('/api/admin/users/search', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const q = String(req.query.q || '').trim().toLowerCase()
  if (q.length < 2) return res.json({ users: [] })
  const all = await listAll()
  const matches = all
    .filter((u) => (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q))
    .slice(0, 8)
    .map((u) => ({ id: u.id, name: u.name, email: u.email, isPro: !!u.isPro, plan: u.plan || null }))
  res.json({ users: matches })
})

// Admin: export every user as CSV — for spreadsheets / bulk emailing
// outside the app. Kept separate from the single-user JSON export below,
// and registered ahead of the '/:id' route for the same reason as above.
app.get('/api/admin/users/export.csv', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const all = await listAll()
  const header = ['id', 'name', 'email', 'isPro', 'plan', 'role', 'createdAt', 'lastActive']
  const escapeCsv = (val) => {
    const s = val === null || val === undefined ? '' : String(val)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const lines = [header.join(',')]
  for (const u of all) {
    lines.push(header.map((key) => escapeCsv(u[key])).join(','))
  }
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'users_exported', targetType: 'users', meta: { count: all.length } })
  res.setHeader('Content-Disposition', `attachment; filename="all-users-${new Date().toISOString().slice(0, 10)}.csv"`)
  res.setHeader('Content-Type', 'text/csv')
  res.send(lines.join('\n'))
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

app.get('/api/admin/activity', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 500)
  const events = await getRecentActivity(limit)
  const usersById = Object.fromEntries((await listAll()).map((u) => [u.id, u]))
  const enriched = events.map((e) => ({ ...e, userName: usersById[e.userId]?.name || 'Unknown', userEmail: usersById[e.userId]?.email || null }))
  res.json({ events: enriched })
})

app.get('/api/admin/users/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const user = await findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found.' })
  const now = Date.now()
  const lastActiveMs = user.lastActive ? new Date(user.lastActive).getTime() : 0
  res.json({ user: { ...toSafeUser(user), online: now - lastActiveMs < ONLINE_WINDOW_MS }, activity: await getUserActivity(user.id, 200) })
})

// Admin: activate or deactivate plan — sends email to user
const VALID_PLANS = ['free', 'weekly', 'monthly', 'lifetime']
app.patch('/api/admin/users/:id/plan', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
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
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'plan_changed', targetType: 'user', targetId: user.id, meta: { plan, userEmail: user.email } })
  // Email user about plan activation/deactivation
  if (plan !== 'free') {
    await sendEmail({ to: user.email, subject: '🎉 Your ECSPrep Pro plan is now active!', html: planActivatedEmailHtml(user, plan) })
  }
  res.json({ user: toSafeUser(updated) })
})

// Admin: suspend or reinstate a user's account. Suspended users are blocked
// at login and their existing session token stops working immediately
// (checked in requireAuth), without deleting any of their data.
app.patch('/api/admin/users/:id/suspend', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const { suspended, reason } = req.body || {}
  if (typeof suspended !== 'boolean') return res.status(400).json({ error: '"suspended" must be true or false.' })
  const user = await findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found.' })
  if (user.role === 'admin') return res.status(400).json({ error: 'Admin accounts cannot be suspended.' })
  const updated = await updateUser(user.id, {
    suspended,
    suspendedReason: suspended ? (reason || '').slice(0, 300) : null,
    suspendedAt: suspended ? new Date().toISOString() : null,
    suspendedBy: suspended ? req.user.email : null,
  })
  await logActivity({ userId: user.id, type: suspended ? 'suspended' : 'unsuspended', meta: { by: req.user.email, reason: reason || null } })
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: suspended ? 'user_suspended' : 'user_unsuspended', targetType: 'user', targetId: user.id, meta: { userEmail: user.email, reason: reason || null } })
  res.json({ user: toSafeUser(updated) })
})

// Admin: internal note on a user's profile — never shown to the user,
// just a place for support/ops context ("asked for refund, resolved 12 Sep").
app.patch('/api/admin/users/:id/notes', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const { notes } = req.body || {}
  if (typeof notes !== 'string') return res.status(400).json({ error: '"notes" must be a string.' })
  const user = await findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found.' })
  const updated = await updateUser(user.id, { adminNotes: notes.slice(0, 4000), adminNotesUpdatedAt: new Date().toISOString(), adminNotesUpdatedBy: req.user.email })
  res.json({ user: toSafeUser(updated) })
})

// New feature: granular admin roles. A super admin can promote/demote staff
// between 'user', 'support_agent', 'content_editor' and 'admin' — see
// STAFF_ROLES / requireSuperAdmin above for what each level can reach.
const ASSIGNABLE_ROLES = ['user', 'support_agent', 'content_editor', 'admin']
app.patch('/api/admin/users/:id/role', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const { role } = req.body || {}
  if (!ASSIGNABLE_ROLES.includes(role)) return res.status(400).json({ error: `role must be one of: ${ASSIGNABLE_ROLES.join(', ')}` })
  const user = await findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found.' })
  if (user.id === req.user.id && role !== 'admin') return res.status(400).json({ error: "You can't remove your own admin access." })
  const updated = await updateUser(user.id, { role })
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'role_changed', targetType: 'user', targetId: user.id, meta: { role, userEmail: user.email } })
  res.json({ user: toSafeUser(updated) })
})

// New feature: bulk user actions — suspend/reinstate several accounts from
// one selection on the Users list instead of one at a time.
app.post('/api/admin/users/bulk-suspend', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const { userIds, suspended, reason } = req.body || {}
  if (!Array.isArray(userIds) || userIds.length === 0) return res.status(400).json({ error: 'No users selected.' })
  if (typeof suspended !== 'boolean') return res.status(400).json({ error: '"suspended" must be true or false.' })
  let updated = 0
  const skipped = []
  for (const id of userIds.slice(0, 500)) {
    const user = await findById(id)
    if (!user || user.role === 'admin') { skipped.push(id); continue }
    await updateUser(id, {
      suspended,
      suspendedReason: suspended ? (reason || '').slice(0, 300) : null,
      suspendedAt: suspended ? new Date().toISOString() : null,
      suspendedBy: suspended ? req.user.email : null,
    })
    await logActivity({ userId: id, type: suspended ? 'suspended' : 'unsuspended', meta: { by: req.user.email, reason: reason || null, bulk: true } })
    updated++
  }
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: suspended ? 'bulk_user_suspend' : 'bulk_user_unsuspend', targetType: 'user', targetId: 'bulk', meta: { count: updated } })
  res.json({ updated, skipped })
})

// New feature: user impersonation — lets support see the app exactly as a
// candidate sees it, without ever needing their password. Issues a
// short-lived (1 hour) token for the target account; the admin's own
// session is untouched and the frontend keeps it aside so "Return to
// admin" needs no further backend round-trip.
app.post('/api/admin/users/:id/impersonate', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const target = await findById(req.params.id)
  if (!target) return res.status(404).json({ error: 'User not found.' })
  if (target.role === 'admin') return res.status(400).json({ error: "You can't impersonate another admin account." })
  const token = jwt.sign({ sub: target.id }, JWT_SECRET, { expiresIn: '1h' })
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'user_impersonated', targetType: 'user', targetId: target.id, meta: { userEmail: target.email } })
  res.json({ token, user: toSafeUser(target) })
})

// New feature: global admin search — one box that jumps straight to a
// user, ticket, card application, or question report by keyword, instead
// of hunting through each section separately. Results are scoped to what
// the caller's role can actually reach.
app.get('/api/admin/search', requireAuth, requireAdmin, async (req, res) => {
  const q = String(req.query.q || '').trim().toLowerCase()
  if (q.length < 2) return res.json({ results: [] })
  const results = []
  const isSuper = req.user.role === 'admin'

  if (isSuper) {
    const users = await listAll()
    users.filter((u) => !u.deletedAt && (u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)))
      .slice(0, 8)
      .forEach((u) => results.push({ type: 'User', label: `${u.name} (${u.email})`, path: `/admin/users/${u.id}` }))
  }

  const tickets = await listTickets()
  tickets
    .filter((t) => (t.subject || t.message || '').toLowerCase().includes(q) || (t.email || '').toLowerCase().includes(q))
    .slice(0, 8)
    .forEach((t) => results.push({ type: 'Support Ticket', label: t.subject || t.message?.slice(0, 60) || t.email, path: `/admin/support-tickets` }))

  const reportRows = await listQuestionReports()
  reportRows
    .filter((r) => (r.questionText || '').toLowerCase().includes(q))
    .slice(0, 8)
    .forEach((r) => results.push({ type: 'Question Report', label: r.questionText.slice(0, 80), path: `/admin/question-reports` }))

  if (isSuper) {
    const applicationRows = await listCardApplications()
    applicationRows
      .filter((a) => (a.fullName || '').toLowerCase().includes(q) || (a.email || '').toLowerCase().includes(q))
      .slice(0, 8)
      .forEach((a) => results.push({ type: 'Card Application', label: `${a.fullName} (${a.email})`, path: `/admin/card-applications` }))
  }

  res.json({ results: results.slice(0, 20) })
})

// Admin: recent admin actions (plan changes, settings edits, invoices/quotes/RAMS
// created or deleted, bulk exports) — a simple audit trail of "who did what".
app.get('/api/admin/audit', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 100, 500)
  const entries = await getAdminAudit(limit)
  res.json({ entries })
})

// New feature: System Health & Backup Center. Read-only DB ping + row
// counts across every table, so an admin can tell at a glance whether the
// database is reachable and roughly how much data each area holds.
app.get('/api/admin/system-health', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const health = await getSystemHealthSnapshot()
  res.json(health)
})

// New feature: one-click full backup — downloads every table as a single
// JSON file (password hashes stripped from the users table first). Meant
// as a disaster-recovery safety net alongside Neon's own point-in-time
// restore, and as an easy way to migrate data to a new database.
app.get('/api/admin/backup', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const backup = await exportFullBackup()
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'backup_downloaded', targetType: 'system', targetId: null, meta: null })
  const filename = `ecsprep-backup-${new Date().toISOString().slice(0, 10)}.json`
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(backup, null, 2))
})

// Admin: aggregated numbers for the Analytics page charts — signups/day,
// plan mix, activity/day by type, and test submissions + average score/day.
app.get('/api/admin/analytics/summary', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const days = Math.min(Number(req.query.days) || 30, 90)
  const summary = await getAnalyticsSummary(days)
  res.json(summary)
})

// Admin: send a one-off email to a filtered set of users (all / free / pro)
// — for announcements, promos, or important updates. Sent sequentially with
// a small delay so we don't blast the SMTP provider's rate limit; runs in
// the background and the admin gets an immediate response with the count.
const VALID_AUDIENCES = ['all', 'free', 'pro']
app.post('/api/admin/broadcast-email', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const { subject, message, audience } = req.body || {}
  if (!subject?.trim()) return res.status(400).json({ error: 'Subject is required.' })
  if (!message?.trim()) return res.status(400).json({ error: 'Message is required.' })
  if (!VALID_AUDIENCES.includes(audience)) return res.status(400).json({ error: `audience must be one of: ${VALID_AUDIENCES.join(', ')}` })

  const all = await listAll()
  const recipients = all.filter((u) => {
    if (audience === 'all') return !!u.email
    if (audience === 'pro') return !!u.email && u.isPro
    return !!u.email && !u.isPro
  })

  // Fire the send loop in the background — an admin sending to a few
  // hundred users shouldn't have the HTTP request hang open that whole time.
  const messageHtml = String(message).trim().replace(/\n/g, '<br/>')
  ;(async () => {
    for (const u of recipients) {
      await sendEmail({ to: u.email, subject, html: broadcastEmailHtml(u.name, messageHtml) })
      await new Promise((r) => setTimeout(r, 150))
    }
  })().catch((e) => console.error('Broadcast email loop failed:', e.message))

  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'broadcast_email_sent', targetType: 'users', meta: { subject, audience, count: recipients.length } })
  res.json({ ok: true, recipientCount: recipients.length })
})

app.get('/api/admin/users/:id/export', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const user = await findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found.' })
  const payload = { user: toSafeUser(user), activity: await getUserActivity(user.id, 1000), exportedAt: new Date().toISOString(), exportedBy: req.user.email }
  res.setHeader('Content-Disposition', `attachment; filename="user-${user.id}-export.json"`)
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(payload, null, 2))
})

// Admin: get pending payment requests
app.get('/api/admin/payment-requests', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const pending = (await listAll()).filter(u => u.pendingPlan).map(u => ({
    ...toSafeUser(u),
    pendingPlan: u.pendingPlan,
    pendingPlanAt: u.pendingPlanAt,
  }))
  res.json({ requests: pending })
})

// ---- Invoice Builder ----
app.get('/api/admin/invoices', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const invoices = await listInvoices()
  res.json({ invoices })
})

app.get('/api/admin/invoices/next-number', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  res.json({ number: await nextInvoiceNumber() })
})

app.get('/api/admin/invoices/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const invoice = await getInvoice(req.params.id)
  if (!invoice) return res.status(404).json({ error: 'Invoice not found.' })
  res.json({ invoice })
})

app.post('/api/admin/invoices', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
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
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'invoice_created', targetType: 'invoice', targetId: id, meta: { number, client: client.name } })
  res.status(201).json({ invoice })
})

app.patch('/api/admin/invoices/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
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

app.delete('/api/admin/invoices/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const existing = await getInvoice(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Invoice not found.' })
  await deleteInvoice(req.params.id)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'invoice_deleted', targetType: 'invoice', targetId: req.params.id, meta: { number: existing.number } })
  res.json({ ok: true })
})

app.get('/api/admin/quotes', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const quotes = await listQuotes()
  res.json({ quotes })
})

app.get('/api/admin/quotes/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const quote = await getQuote(req.params.id)
  if (!quote) return res.status(404).json({ error: 'Quote not found.' })
  res.json({ quote })
})

app.post('/api/admin/quotes', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
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
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'quote_created', targetType: 'quote', targetId: id, meta: { number, client: client.name } })
  res.status(201).json({ quote })
})

app.patch('/api/admin/quotes/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
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

app.delete('/api/admin/quotes/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const existing = await getQuote(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Quote not found.' })
  await deleteQuote(req.params.id)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'quote_deleted', targetType: 'quote', targetId: req.params.id, meta: { number: existing.number } })
  res.json({ ok: true })
})

app.get('/api/admin/rams', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const rams = await listRams()
  res.json({ rams })
})

app.get('/api/admin/rams/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const rams = await getRams(req.params.id)
  if (!rams) return res.status(404).json({ error: 'RAMS document not found.' })
  res.json({ rams })
})

app.post('/api/admin/rams', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
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
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'rams_created', targetType: 'rams', targetId: id, meta: { number, projectName } })
  res.status(201).json({ rams })
})

app.patch('/api/admin/rams/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
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

app.delete('/api/admin/rams/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const existing = await getRams(req.params.id)
  if (!existing) return res.status(404).json({ error: 'RAMS document not found.' })
  await deleteRams(req.params.id)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'rams_deleted', targetType: 'rams', targetId: req.params.id, meta: { number: existing.number } })
  res.json({ ok: true })
})

// ---- Coupons (discount codes for the Pro plan) ----
// New feature: admin-managed discount codes. A code is a % or flat-amount
// discount, optionally limited by plan, use count, and/or expiry date.
// Applied at checkout via /api/coupons/validate + the `coupon` field on
// /api/stripe/create-checkout-session (which mints a matching one-off
// Stripe coupon so the actual charge reflects the discount).
app.get('/api/admin/coupons', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const coupons = await listCoupons()
  res.json({ coupons })
})

app.post('/api/admin/coupons', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const { code, type, value, maxUses, expiresAt, plans, active, note } = req.body || {}
  if (!code?.trim()) return res.status(400).json({ error: 'Code is required.' })
  if (!['percent', 'flat'].includes(type)) return res.status(400).json({ error: 'Type must be "percent" or "flat".' })
  const numericValue = Number(value)
  if (!numericValue || numericValue <= 0) return res.status(400).json({ error: 'Value must be a positive number.' })
  if (type === 'percent' && numericValue > 100) return res.status(400).json({ error: 'Percent discount cannot exceed 100.' })

  const existing = await getCouponByCode(code.trim())
  if (existing) return res.status(409).json({ error: 'A coupon with this code already exists.' })

  const id = `cpn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const coupon = await createCoupon({
    id,
    code: code.trim().toUpperCase(),
    type,
    value: numericValue,
    maxUses: maxUses ? Number(maxUses) : null,
    usedCount: 0,
    expiresAt: expiresAt || null,
    plans: Array.isArray(plans) && plans.length ? plans : 'all',
    active: active !== false,
    note: note || '',
    createdBy: req.user.email,
  })
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'coupon_created', targetType: 'coupon', targetId: id, meta: { code: coupon.code } })
  res.status(201).json({ coupon })
})

app.patch('/api/admin/coupons/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const existing = await getCoupon(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Coupon not found.' })
  const { type, value, maxUses, expiresAt, plans, active, note } = req.body || {}
  const patch = {}
  if (type !== undefined) {
    if (!['percent', 'flat'].includes(type)) return res.status(400).json({ error: 'Type must be "percent" or "flat".' })
    patch.type = type
  }
  if (value !== undefined) {
    const numericValue = Number(value)
    if (!numericValue || numericValue <= 0) return res.status(400).json({ error: 'Value must be a positive number.' })
    patch.value = numericValue
  }
  if (maxUses !== undefined) patch.maxUses = maxUses ? Number(maxUses) : null
  if (expiresAt !== undefined) patch.expiresAt = expiresAt || null
  if (plans !== undefined) patch.plans = Array.isArray(plans) && plans.length ? plans : 'all'
  if (active !== undefined) patch.active = !!active
  if (note !== undefined) patch.note = note
  const coupon = await updateCoupon(req.params.id, patch)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'coupon_updated', targetType: 'coupon', targetId: req.params.id, meta: { code: coupon.code } })
  res.json({ coupon })
})

app.delete('/api/admin/coupons/:id', requireAuth, requireAdmin, requireSuperAdmin, async (req, res) => {
  const existing = await getCoupon(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Coupon not found.' })
  await deleteCoupon(req.params.id)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'coupon_deleted', targetType: 'coupon', targetId: req.params.id, meta: { code: existing.code } })
  res.json({ ok: true })
})

// Shared validity check, used by both the public preview endpoint below
// and the real checkout-session route so the rules can never drift apart.
function checkCouponValidity(coupon, plan) {
  if (!coupon) return 'This code is not valid.'
  if (!coupon.active) return 'This code is no longer active.'
  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) return 'This code has expired.'
  if (coupon.maxUses && (coupon.usedCount || 0) >= coupon.maxUses) return 'This code has reached its usage limit.'
  if (coupon.plans !== 'all' && Array.isArray(coupon.plans) && plan && !coupon.plans.includes(plan)) {
    return 'This code does not apply to the selected plan.'
  }
  return null
}

// Learners type a code on the Checkout page and see the discount before
// paying — no auth requirement change vs. checkout itself, but this alone
// doesn't touch Stripe or increment usage (that only happens once the
// payment actually completes, see the webhook below).
app.post('/api/coupons/validate', requireAuth, async (req, res) => {
  const { code, plan } = req.body || {}
  if (!code?.trim()) return res.status(400).json({ error: 'Enter a code.' })
  const coupon = await getCouponByCode(code.trim())
  const invalidReason = checkCouponValidity(coupon, plan)
  if (invalidReason) return res.status(400).json({ error: invalidReason })
  res.json({ coupon: { code: coupon.code, type: coupon.type, value: coupon.value } })
})

// ---- Support tickets (contact form + admin inbox) ----
// Public: anyone (logged in or not) can submit the contact form. No auth
// required, but lightly validated, and rate-limited by the same global
// limiter applied to the rest of the API.
app.post('/api/contact', async (req, res) => {
  const { name, email, topic, message } = req.body || {}
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email and message are required.' })
  }
  const id = `ticket_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const ticket = await createTicket({
    id,
    name: name.trim(),
    email: email.trim(),
    topic: topic || 'Something else',
    message: message.trim(),
    status: 'open', // 'open' | 'replied' | 'closed'
    adminReply: '',
  })
  res.status(201).json({ ticket })
})

app.get('/api/admin/tickets', requireAuth, requireAdmin, async (req, res) => {
  const tickets = await listTickets()
  res.json({ tickets })
})

app.get('/api/admin/tickets/:id', requireAuth, requireAdmin, async (req, res) => {
  const ticket = await getTicket(req.params.id)
  if (!ticket) return res.status(404).json({ error: 'Message not found.' })
  res.json({ ticket })
})

// Reply and/or change status in one request. When a non-empty reply is sent,
// we email it to the person who submitted the form and mark the ticket
// "replied" automatically (unless the caller explicitly set a status).
app.patch('/api/admin/tickets/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getTicket(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Message not found.' })
  const { status, adminReply } = req.body || {}
  const patch = {}
  if (status !== undefined) {
    if (!['open', 'replied', 'closed'].includes(status)) return res.status(400).json({ error: 'Invalid status.' })
    patch.status = status
  }
  if (adminReply !== undefined) patch.adminReply = adminReply
  if (typeof adminReply === 'string' && adminReply.trim() && adminReply.trim() !== existing.adminReply) {
    if (status === undefined) patch.status = 'replied'
    sendEmail({
      to: existing.email,
      subject: `Re: ${existing.topic || 'Your message to ECSPrep'}`,
      html: broadcastEmailHtml(existing.name, `<p>${adminReply.trim().replace(/\n/g, '<br/>')}</p><p style="color:#6b7280;font-size:13px;margin-top:24px;">— In reply to your message: "${(existing.message || '').slice(0, 200)}"</p>`),
    })
  }
  const ticket = await updateTicket(req.params.id, patch)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'ticket_updated', targetType: 'ticket', targetId: req.params.id, meta: { status: patch.status } })
  res.json({ ticket })
})

app.delete('/api/admin/tickets/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getTicket(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Message not found.' })
  await deleteTicket(req.params.id)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'ticket_deleted', targetType: 'ticket', targetId: req.params.id })
  res.json({ ok: true })
})

// ---- New feature: "Report a question" — content quality/moderation queue ----
// Available to anyone mid-test (logged in or a guest), so a wrong answer key
// or a typo gets fixed quickly instead of silently costing candidates marks.
const REPORT_REASONS = ['wrong_answer', 'typo_or_unclear', 'outdated_info', 'duplicate', 'other']

app.post('/api/questions/report', contactLimiter, async (req, res) => {
  const { questionId, questionText, options, reason, comment, testLabel } = req.body || {}
  if (!questionText?.trim()) return res.status(400).json({ error: 'Missing question text.' })
  if (!REPORT_REASONS.includes(reason)) return res.status(400).json({ error: 'Please choose a valid reason.' })
  const id = `qrep_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const report = await createQuestionReport({
    id,
    questionId: questionId || null,
    questionText: questionText.trim().slice(0, 2000),
    options: Array.isArray(options) ? options.slice(0, 10).map((o) => String(o).slice(0, 500)) : [],
    reason,
    comment: (comment || '').trim().slice(0, 1000),
    testLabel: testLabel || null,
    reportedByUserId: req.user?.id || null,
    reportedByEmail: req.user?.email || null,
    status: 'open', // 'open' | 'resolved' | 'dismissed'
    adminNote: '',
  })
  res.status(201).json({ report })
})

app.get('/api/admin/question-reports', requireAuth, requireAdmin, async (req, res) => {
  const reports = await listQuestionReports()
  res.json({ reports })
})

app.patch('/api/admin/question-reports/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getQuestionReport(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Report not found.' })
  const { status, adminNote } = req.body || {}
  const patch = {}
  if (status !== undefined) {
    if (!['open', 'resolved', 'dismissed'].includes(status)) return res.status(400).json({ error: 'Invalid status.' })
    patch.status = status
  }
  if (adminNote !== undefined) patch.adminNote = String(adminNote).slice(0, 1000)
  const report = await updateQuestionReport(req.params.id, patch)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'question_report_updated', targetType: 'question_report', targetId: req.params.id, meta: { status: patch.status } })
  res.json({ report })
})

app.delete('/api/admin/question-reports/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getQuestionReport(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Report not found.' })
  await deleteQuestionReport(req.params.id)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'question_report_deleted', targetType: 'question_report', targetId: req.params.id })
  res.json({ ok: true })
})

// ---- Notifications (admin -> users) ----
app.get('/api/admin/notifications', requireAuth, requireAdmin, async (req, res) => {
  const notifications = await listNotifications()
  const withStats = await Promise.all(notifications.map(async (n) => ({ ...n, readCount: await countNotificationReads(n.id) })))
  res.json({ notifications: withStats })
})

app.post('/api/admin/notifications', requireAuth, requireAdmin, async (req, res) => {
  const { title, message, type, audience, userId } = req.body || {}
  if (!title?.trim() || !message?.trim()) return res.status(400).json({ error: 'Title and message are required.' })
  if (!['all', 'user'].includes(audience)) return res.status(400).json({ error: '"audience" must be "all" or "user".' })
  let targetUser = null
  if (audience === 'user') {
    if (!userId?.trim()) return res.status(400).json({ error: 'Pick a user to notify, or choose "All users".' })
    targetUser = await findById(userId.trim())
    if (!targetUser) return res.status(404).json({ error: 'That user could not be found.' })
  }
  const id = `notif_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const notification = await createNotification({
    id,
    title: title.trim(),
    message: message.trim(),
    type: ['info', 'success', 'warning'].includes(type) ? type : 'info',
    audience,
    userId: audience === 'user' ? targetUser.id : null,
    createdBy: req.user.email,
  })
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'notification_sent', targetType: 'notification', targetId: id, meta: { audience, userId: targetUser?.id || null } })
  res.status(201).json({ notification })
})

app.delete('/api/admin/notifications/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getNotification(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Notification not found.' })
  await deleteNotification(req.params.id)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'notification_deleted', targetType: 'notification', targetId: req.params.id })
  res.json({ ok: true })
})

// User-facing: read your own notifications (broadcast + anything targeted
// directly at you), unread count for a header bell badge, and marking read.
app.get('/api/notifications', requireAuth, async (req, res) => {
  const notifications = await getNotificationsForUser(req.user.id)
  res.json({ notifications })
})

app.get('/api/notifications/unread-count', requireAuth, async (req, res) => {
  const count = await countUnreadNotificationsForUser(req.user.id)
  res.json({ count })
})

app.post('/api/notifications/:id/read', requireAuth, async (req, res) => {
  await markNotificationRead(req.params.id, req.user.id)
  res.json({ ok: true })
})

// ---- Blog (admin-authored posts layered over the static blog list) ----
// Public: everything the frontend needs to merge the DB posts + hidden-slug
// list into the ~200 static posts from src/data/blogPosts.js. Only published
// custom posts are exposed here.
app.get('/api/blog-meta', async (req, res) => {
  const [all, hiddenSlugs] = await Promise.all([listBlogPosts(), getHiddenBlogSlugs()])
  const customPosts = all.filter((p) => p.published !== false)
  res.json({ customPosts, hiddenSlugs })
})

// Admin: full list (including unpublished drafts) + hidden slugs, for the
// Blog Management screen.
app.get('/api/admin/blog-posts', requireAuth, requireAdmin, async (req, res) => {
  const [posts, hiddenSlugs] = await Promise.all([listBlogPosts(), getHiddenBlogSlugs()])
  res.json({ posts, hiddenSlugs })
})

app.post('/api/admin/blog-posts', requireAuth, requireAdmin, async (req, res) => {
  const { title, slug, excerpt, content, category, tags, image, author, metaTitle, metaDescription, published } = req.body || {}
  if (!title?.trim()) return res.status(400).json({ error: 'Title is required.' })
  if (!slug?.trim()) return res.status(400).json({ error: 'Slug is required.' })
  const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '')
  if (!cleanSlug) return res.status(400).json({ error: 'Slug must contain at least one letter or number.' })
  const existing = await getBlogPostBySlug(cleanSlug)
  if (existing) return res.status(409).json({ error: 'A post with that slug already exists.' })

  const id = `post_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const now = new Date()
  const post = await createBlogPost({
    id,
    slug: cleanSlug,
    title: title.trim(),
    excerpt: excerpt || '',
    content: content || '',
    category: category || 'General',
    tags: Array.isArray(tags) ? tags : [],
    image: image || '',
    author: author || 'ECSPrep Team',
    metaTitle: metaTitle || title.trim(),
    metaDescription: metaDescription || excerpt || '',
    published: published !== false,
    date: now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    isoDate: now.toISOString(),
    isoDateModified: now.toISOString(),
    readTime: '5 min read',
    createdBy: req.user.email,
  })
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'blog_post_created', targetType: 'blog_post', targetId: id, meta: { slug: cleanSlug, title: title.trim() } })
  res.status(201).json({ post })
})

app.patch('/api/admin/blog-posts/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getBlogPost(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Post not found.' })
  const { title, slug, excerpt, content, category, tags, image, author, metaTitle, metaDescription, published } = req.body || {}
  const patch = {}
  if (slug !== undefined) {
    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '')
    if (!cleanSlug) return res.status(400).json({ error: 'Slug must contain at least one letter or number.' })
    if (cleanSlug !== existing.slug) {
      const clash = await getBlogPostBySlug(cleanSlug)
      if (clash) return res.status(409).json({ error: 'A post with that slug already exists.' })
    }
    patch.slug = cleanSlug
  }
  if (title !== undefined) patch.title = title
  if (excerpt !== undefined) patch.excerpt = excerpt
  if (content !== undefined) patch.content = content
  if (category !== undefined) patch.category = category
  if (tags !== undefined) patch.tags = Array.isArray(tags) ? tags : []
  if (image !== undefined) patch.image = image
  if (author !== undefined) patch.author = author
  if (metaTitle !== undefined) patch.metaTitle = metaTitle
  if (metaDescription !== undefined) patch.metaDescription = metaDescription
  if (published !== undefined) patch.published = published
  patch.isoDateModified = new Date().toISOString()
  const post = await updateBlogPost(req.params.id, patch)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'blog_post_updated', targetType: 'blog_post', targetId: req.params.id })
  res.json({ post })
})

// Deletes ANY blog post the admin can see on /blog:
//  - a custom (DB-backed) post → hard-deleted from blog_posts
//  - one of the ~200 static posts from src/data/blogPosts.js → can't be
//    removed from that file at runtime, so its slug is added to the
//    hidden-slugs list and the frontend filters it out everywhere.
app.delete('/api/admin/blog-posts/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getBlogPost(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Post not found.' })
  await deleteBlogPost(req.params.id)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'blog_post_deleted', targetType: 'blog_post', targetId: req.params.id, meta: { slug: existing.slug } })
  res.json({ ok: true })
})

app.post('/api/admin/blog-posts/hide-static', requireAuth, requireAdmin, async (req, res) => {
  const { slug, hidden } = req.body || {}
  if (!slug?.trim()) return res.status(400).json({ error: 'Slug is required.' })
  const current = await getHiddenBlogSlugs()
  const next = hidden
    ? Array.from(new Set([...current, slug.trim()]))
    : current.filter((s) => s !== slug.trim())
  await setHiddenBlogSlugs(next)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: hidden ? 'blog_post_hidden' : 'blog_post_unhidden', targetType: 'blog_post', targetId: slug.trim(), meta: { slug: slug.trim() } })
  res.json({ hiddenSlugs: next })
})

// ---- Custom Pages (lightweight admin CMS: create any page at /page/:slug) ----
app.get('/api/pages/:slug', async (req, res) => {
  const page = await getPageBySlug(req.params.slug)
  if (!page || page.published === false) return res.status(404).json({ error: 'Page not found.' })
  res.json({ page })
})

app.get('/api/admin/pages', requireAuth, requireAdmin, async (req, res) => {
  const pages = await listPages()
  res.json({ pages })
})

app.get('/api/admin/pages/:id', requireAuth, requireAdmin, async (req, res) => {
  const page = await getPage(req.params.id)
  if (!page) return res.status(404).json({ error: 'Page not found.' })
  res.json({ page })
})

app.post('/api/admin/pages', requireAuth, requireAdmin, async (req, res) => {
  const { title, slug, content, metaTitle, metaDescription, published } = req.body || {}
  if (!title?.trim()) return res.status(400).json({ error: 'Title is required.' })
  if (!slug?.trim()) return res.status(400).json({ error: 'Slug is required.' })
  const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '')
  if (!cleanSlug) return res.status(400).json({ error: 'Slug must contain at least one letter or number.' })
  const existing = await getPageBySlug(cleanSlug)
  if (existing) return res.status(409).json({ error: 'A page with that slug already exists.' })

  const id = `page_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const page = await createPage({
    id,
    slug: cleanSlug,
    title: title.trim(),
    content: content || '',
    metaTitle: metaTitle || title.trim(),
    metaDescription: metaDescription || '',
    published: published !== false,
    createdBy: req.user.email,
  })
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'page_created', targetType: 'page', targetId: id, meta: { slug: cleanSlug, title: title.trim() } })
  res.status(201).json({ page })
})

app.patch('/api/admin/pages/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getPage(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Page not found.' })
  const { title, slug, content, metaTitle, metaDescription, published } = req.body || {}
  const patch = {}
  if (slug !== undefined) {
    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '')
    if (!cleanSlug) return res.status(400).json({ error: 'Slug must contain at least one letter or number.' })
    if (cleanSlug !== existing.slug) {
      const clash = await getPageBySlug(cleanSlug)
      if (clash) return res.status(409).json({ error: 'A page with that slug already exists.' })
    }
    patch.slug = cleanSlug
  }
  if (title !== undefined) patch.title = title
  if (content !== undefined) patch.content = content
  if (metaTitle !== undefined) patch.metaTitle = metaTitle
  if (metaDescription !== undefined) patch.metaDescription = metaDescription
  if (published !== undefined) patch.published = published
  const page = await updatePage(req.params.id, patch)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'page_updated', targetType: 'page', targetId: req.params.id })
  res.json({ page })
})

app.delete('/api/admin/pages/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getPage(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Page not found.' })
  await deletePage(req.params.id)
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'page_deleted', targetType: 'page', targetId: req.params.id, meta: { slug: existing.slug } })
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
  } catch (err) { console.error('[stripe:card-checkout]', err); res.status(500).json({ error: 'Could not start card payment.' }) }
})

// ---- Stripe ----
// Builds (or reuses) a real Stripe Coupon object for a one-off checkout —
// Stripe needs its own coupon record to apply a discount to a Checkout
// Session, so we lazily mint one from our own `coupons` row the first time
// it's used, then cache the Stripe coupon id on our row for next time.
async function resolveStripeCoupon(coupon) {
  if (coupon.stripeCouponId) {
    try {
      const existing = await stripe.coupons.retrieve(coupon.stripeCouponId)
      if (existing && !existing.deleted) return existing.id
    } catch {
      // Fall through and mint a fresh one if the cached id no longer exists.
    }
  }
  const stripeCoupon = await stripe.coupons.create(
    coupon.type === 'percent'
      ? { percent_off: coupon.value, duration: 'once', name: coupon.code }
      : { amount_off: Math.round(coupon.value * 100), currency: 'gbp', duration: 'once', name: coupon.code }
  )
  await updateCoupon(coupon.id, { stripeCouponId: stripeCoupon.id })
  return stripeCoupon.id
}

app.post('/api/stripe/create-checkout-session', requireAuth, async (req, res) => {
  if (!stripe) return res.status(500).json({ error: 'Stripe not configured.' })
  const { plan, coupon: couponCode } = req.body || {}
  const priceId = PRICE_IDS[plan]
  if (!priceId) return res.status(400).json({ error: 'Unknown plan.' })

  let discounts
  let appliedCouponId = null
  let appliedCouponCode = null
  if (couponCode?.trim()) {
    const coupon = await getCouponByCode(couponCode.trim())
    const invalidReason = checkCouponValidity(coupon, plan)
    if (invalidReason) return res.status(400).json({ error: invalidReason })
    try {
      const stripeCouponId = await resolveStripeCoupon(coupon)
      discounts = [{ coupon: stripeCouponId }]
      appliedCouponId = coupon.id
      appliedCouponCode = coupon.code
    } catch (err) {
      console.error('[stripe:apply-coupon]', err)
      return res.status(500).json({ error: 'Could not apply that code right now.' })
    }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: plan === 'lifetime' ? 'payment' : 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: req.user.email,
      client_reference_id: req.user.id,
      metadata: { plan, userId: req.user.id, couponId: appliedCouponId || '', couponCode: appliedCouponCode || '' },
      ...(discounts ? { discounts } : {}),
      success_url: `${CLIENT_URL}/checkout?plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/checkout?plan=${plan}&canceled=true`,
    })
    res.json({ url: session.url })
  } catch (err) { console.error('[stripe:checkout]', err); res.status(500).json({ error: 'Could not start checkout.' }) }
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
  } catch (err) { console.error('[stripe:verify-session]', err); res.status(500).json({ error: 'Could not verify payment.' }) }
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
  } catch (err) { console.error('[stripe:billing-portal]', err); res.status(500).json({ error: 'Could not open billing portal.' }) }
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

// New feature: CSCS/ECS Card Application Tracker.
// Turns what used to be a fire-and-forget email into a real, trackable
// application with a status timeline the candidate can check any time, and
// a queue the admin team works through.
const CARD_APPLICATION_STAGES = ['submitted', 'documents_verified', 'test_booked', 'test_passed', 'card_ordered', 'dispatched']
const CARD_APPLICATION_SIDE_STAGES = ['on_hold', 'rejected']
const CARD_APPLICATION_STAGE_LABELS = {
  submitted: 'Application submitted',
  documents_verified: 'Documents verified',
  test_booked: 'HS&E test booked',
  test_passed: 'HS&E test passed',
  card_ordered: 'Card ordered',
  dispatched: 'Card dispatched',
  on_hold: 'On hold — action needed',
  rejected: 'Application rejected',
}

function cardApplicationStatusEmailHtml(fullName, stageLabel, note) {
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#0d9488,#0f766e);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:20px;">🪪 Your ECS card application has been updated</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">Hi ${fullName || 'there'},</p>
    <p style="color:#374151;font-size:16px;">Your application status is now:</p>
    <p style="font-size:20px;font-weight:700;color:#0f766e;background:#f0fdfa;border-radius:12px;padding:14px 18px;margin:16px 0;">${stageLabel}</p>
    ${note ? `<p style="color:#374151;font-size:15px;">${String(note).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))}</p>` : ''}
    <p style="color:#6b7280;font-size:13px;margin-top:24px;">Sign in to your ECSPrep account and go to "My Card Application" to see the full timeline.</p>
  </div>
</div>
</body></html>`
}

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

  // New feature: persist the application so it can be tracked (previously
  // this whole route only ever sent emails — nothing was saved anywhere).
  // Soft auth: if the submitter happens to be signed in, link the
  // application to their account; guests still get tracked by email.
  let submitterUserId = null
  const authHeader = req.headers.authorization || ''
  if (authHeader.startsWith('Bearer ')) {
    try { submitterUserId = jwt.verify(authHeader.slice(7), JWT_SECRET).sub } catch { /* guest checkout is fine */ }
  }
  const applicationId = `capp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  await createCardApplication({
    id: applicationId,
    userId: submitterUserId,
    fullName, email, phone, cardType, applicationType, jobTitle, employer,
    stage: 'submitted',
    stageHistory: [{ stage: 'submitted', at: new Date().toISOString(), note: '' }],
  })

  res.json({ success: true, applicationId })
})

app.get('/api/user/card-application', requireAuth, async (req, res) => {
  let application = await getCardApplicationForUser(req.user.id)
  if (!application) application = await getCardApplicationForEmail(req.user.email)
  res.json({ application: application || null })
})

app.get('/api/admin/card-applications', requireAuth, requireAdmin, async (req, res) => {
  const applications = await listCardApplications()
  res.json({ applications })
})

app.get('/api/admin/card-applications/:id', requireAuth, requireAdmin, async (req, res) => {
  const application = await getCardApplication(req.params.id)
  if (!application) return res.status(404).json({ error: 'Application not found.' })
  res.json({ application })
})

app.patch('/api/admin/card-applications/:id', requireAuth, requireAdmin, async (req, res) => {
  const existing = await getCardApplication(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Application not found.' })
  const { stage, note } = req.body || {}
  const allStages = [...CARD_APPLICATION_STAGES, ...CARD_APPLICATION_SIDE_STAGES]
  if (stage !== undefined && !allStages.includes(stage)) return res.status(400).json({ error: 'Invalid stage.' })

  const patch = {}
  if (stage !== undefined) {
    patch.stage = stage
    const history = Array.isArray(existing.stageHistory) ? existing.stageHistory : []
    patch.stageHistory = [...history, { stage, at: new Date().toISOString(), note: note || '' }]
  }
  const application = await updateCardApplication(req.params.id, patch)

  if (stage !== undefined && stage !== existing.stage) {
    const label = CARD_APPLICATION_STAGE_LABELS[stage] || stage
    sendEmail({ to: existing.email, subject: `Update on your ECS card application — ${label}`, html: cardApplicationStatusEmailHtml(existing.fullName, label, note) })
  }
  await logAdminAudit({ adminId: req.user.id, adminEmail: req.user.email, action: 'card_application_updated', targetType: 'card_application', targetId: req.params.id, meta: { stage: patch.stage } })
  res.json({ application })
})

// ---- New feature: Employer Team Invitations (linked sub-accounts) ----
// Lets an employer invite a worker by email; once accepted, the worker's
// REAL account (bestScore/testsCompleted/lastActive, already tracked via
// /api/leaderboard/submit) shows up in the employer's Team Dashboard —
// instead of the dashboard only ever holding manually-typed entries.
function teamInviteEmailHtml(employer, inviteUrl) {
  const employerLabel = employer.companyName || employer.name || 'Your employer'
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#0d9488,#0f766e);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:20px;">👷 You've been invited to ECSPrep</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;"><strong>${employerLabel}</strong> has invited you to join their team on ECSPrep, so they can keep track of your ECS card training progress.</p>
    <p style="text-align:center;margin:24px 0;">
      <a href="${inviteUrl}" style="background:#0d9488;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;">Accept invite</a>
    </p>
    <p style="color:#6b7280;font-size:13px;">If you don't have an ECSPrep account yet, you'll be able to create one first — then come back to this link to accept.</p>
  </div>
</div>
</body></html>`
}

function teamMemberJoinedEmailHtml(employer, member) {
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#0d9488,#0f766e);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:20px;">✅ ${member.name} joined your team</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">Hi ${employer.name || 'there'},</p>
    <p style="color:#374151;font-size:16px;">${member.name} (${member.email}) has accepted your ECSPrep team invite. You can now see their real training progress on your Team Dashboard.</p>
  </div>
</div>
</body></html>`
}

function teamRenewalReminderEmailHtml(employer, recipient) {
  const employerLabel = employer.companyName || employer.name || 'Your employer'
  return `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:32px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#d97706,#b45309);padding:32px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:20px;">⏰ Your ${recipient.cardType || 'ECS'} card renewal is coming up</h1>
  </div>
  <div style="padding:32px;">
    <p style="color:#374151;font-size:16px;">Hi ${recipient.name || 'there'},</p>
    <p style="color:#374151;font-size:16px;">
      This is a reminder from <strong>${employerLabel}</strong> that your ${recipient.cardType || 'ECS'} card
      ${recipient.expiryDate ? `is due to expire on <strong>${new Date(recipient.expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>` : 'is coming up for renewal'}.
    </p>
    <p style="color:#374151;font-size:15px;">Please start your renewal process soon so there's no gap in your card cover on site.</p>
  </div>
</div>
</body></html>`
}

app.post('/api/team/invite', requireAuth, contactLimiter, async (req, res) => {
  const { email, name } = req.body || {}
  const cleanEmail = String(email || '').trim().toLowerCase()
  if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) return res.status(400).json({ error: 'Enter a valid email address.' })
  const existingInvites = await listTeamInvitesForEmployer(req.user.id)
  if (existingInvites.some((i) => i.email === cleanEmail && i.status === 'pending')) {
    return res.status(400).json({ error: 'There is already a pending invite for this email.' })
  }
  const id = `tinv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const invite = await createTeamInvite({
    id,
    employerId: req.user.id,
    email: cleanEmail,
    name: (name || '').trim(),
    status: 'pending',
    invitedAt: new Date().toISOString(),
  })
  await sendEmail({
    to: cleanEmail,
    subject: `${req.user.companyName || req.user.name} invited you to ECSPrep`,
    html: teamInviteEmailHtml(req.user, `${CLIENT_URL}/team/accept/${id}`),
  })
  res.status(201).json({ invite })
})

app.get('/api/team/invites', requireAuth, async (req, res) => {
  const invites = await listTeamInvitesForEmployer(req.user.id)
  res.json({ invites })
})

app.delete('/api/team/invites/:id', requireAuth, async (req, res) => {
  const invite = await getTeamInvite(req.params.id)
  if (!invite || invite.employerId !== req.user.id) return res.status(404).json({ error: 'Invite not found.' })
  await deleteTeamInvite(req.params.id)
  res.json({ ok: true })
})

// No auth required — lets the accept page show who invited this person
// before they've necessarily signed up / logged in yet.
app.get('/api/team/invites/:id/public', async (req, res) => {
  const invite = await getTeamInvite(req.params.id)
  if (!invite) return res.status(404).json({ error: 'Invite not found.' })
  const employer = await findById(invite.employerId)
  res.json({
    invite: { id: invite.id, email: invite.email, name: invite.name, status: invite.status },
    employerName: employer?.companyName || employer?.name || 'An employer',
  })
})

app.post('/api/team/invites/:id/accept', requireAuth, async (req, res) => {
  const invite = await getTeamInvite(req.params.id)
  if (!invite) return res.status(404).json({ error: 'Invite not found.' })
  if (invite.status !== 'pending') return res.status(400).json({ error: 'This invite has already been used.' })
  if (invite.email !== req.user.email.toLowerCase()) {
    return res.status(403).json({ error: `This invite was sent to ${invite.email}. Please sign in with that email address to accept it.` })
  }
  await updateUser(req.user.id, { employerId: invite.employerId })
  await updateTeamInvite(invite.id, { status: 'accepted', acceptedUserId: req.user.id, acceptedAt: new Date().toISOString() })
  const employer = await findById(invite.employerId)
  if (employer) sendEmail({ to: employer.email, subject: `${req.user.name} joined your ECSPrep team`, html: teamMemberJoinedEmailHtml(employer, req.user) })
  res.json({ ok: true })
})

// Real, linked team members — genuine bestScore/testsCompleted/lastActive
// from their own account, not a manually-typed guess.
app.get('/api/team/members', requireAuth, async (req, res) => {
  const all = await listAll()
  const members = all
    .filter((u) => u.employerId === req.user.id && !u.deletedAt)
    .map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      bestScore: u.bestScore || 0,
      testsCompleted: u.testsCompleted || 0,
      lastActive: u.lastActive || null,
      examDate: u.examDate || null,
      isPro: !!u.isPro,
    }))
  res.json({ members })
})

// New feature: bulk renewal reminder emails, one click from the Team
// Dashboard. Works for both linked members and manually-typed roster rows —
// the employer's browser supplies whichever rows have a real email address
// and an expiry date, since manual roster data only ever lives client-side.
app.post('/api/team/send-renewal-reminders', requireAuth, contactLimiter, async (req, res) => {
  const { recipients } = req.body || {}
  if (!Array.isArray(recipients) || recipients.length === 0) return res.status(400).json({ error: 'No recipients with a valid email were provided.' })
  let sent = 0
  for (const r of recipients.slice(0, 200)) {
    if (!r?.email || !/^\S+@\S+\.\S+$/.test(r.email)) continue
    await sendEmail({ to: r.email, subject: `Reminder: your ${r.cardType || 'ECS'} card renewal`, html: teamRenewalReminderEmailHtml(req.user, r) })
    sent++
  }
  await logActivity({ userId: req.user.id, type: 'team_renewal_reminders_sent', meta: { sent } })
  res.json({ sent })
})

// ---- ECS Test booking (independent from the ECS card application above) ----
// Books the applicant a slot to actually SIT the ECS Health & Safety exam,
// as opposed to /api/book-card which is for the physical card application.
function testBookingEmailHtml({ fullName, email, phone, testCategory, preferredCentre, preferredDate, notes }) {
  const esc = (s = '') => String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))
  const row = (label, val) => val ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:13px;white-space:nowrap;">${label}</td><td style="padding:6px 0;color:#0f172a;font-size:13px;">${esc(val)}</td></tr>` : ''
  return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;background:#f1f5f9;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px;">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;">
      <tr><td style="background:#2563eb;padding:20px 28px;">
        <h1 style="margin:0;color:#fff;font-size:18px;">New ECS Test Booking Request</h1>
      </td></tr>
      <tr><td style="padding:24px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('Full name', fullName)}
          ${row('Email', email)}
          ${row('Mobile', phone)}
          ${row('Test category', testCategory)}
          ${row('Preferred test centre / area', preferredCentre)}
          ${row('Preferred date', preferredDate)}
          ${row('Fee', `£45.00 test fee + £15.00 booking assistance = £60.00 total`)}
          ${row('Notes', notes)}
        </table>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`
}

function testBookingConfirmationHtml(fullName) {
  return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;background:#f1f5f9;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px;">
    <table width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;">
      <tr><td style="background:#2563eb;padding:20px 28px;">
        <h1 style="margin:0;color:#fff;font-size:18px;">We've received your test booking request</h1>
      </td></tr>
      <tr><td style="padding:24px 28px;">
        <p style="margin:0 0 12px;color:#0f172a;font-size:15px;">Hi ${fullName || 'there'},</p>
        <p style="margin:0 0 12px;color:#334155;font-size:14px;line-height:1.6;">
          Thanks for requesting your ECS test booking. Our team will confirm your nearest
          available test centre and time slot, then email you shortly to finalise payment
          and your confirmed appointment.
        </p>
        <p style="margin:0;color:#94a3b8;font-size:12px;">— The ECSPrep team</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`
}

app.post('/api/book-test', contactLimiter, async (req, res) => {
  const { fullName, email, phone, testCategory, preferredCentre, preferredDate, notes } = req.body || {}
  if (!fullName || !email || !phone || !testCategory) {
    return res.status(400).json({ error: 'Full name, email, mobile number and test category are required.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }
  if (!/^[0-9+()\s-]{7,}$/.test(phone)) {
    return res.status(400).json({ error: 'Please enter a valid mobile number.' })
  }

  await sendEmail({
    to: BOOKING_NOTIFY_EMAIL,
    subject: `📝 New ECS test booking request from ${fullName}`,
    html: testBookingEmailHtml({ fullName, email, phone, testCategory, preferredCentre, preferredDate, notes }),
  })
  await sendEmail({ to: email, subject: 'We\u2019ve received your ECS test booking request', html: testBookingConfirmationHtml(fullName) })

  res.json({ success: true })
})

// ---- Scheduled notification emails (weekly report, exam reminders,
//      re-engagement nudge) ----
// No new dependency (like node-cron) — an hourly interval tick is plenty
// granular for "once a day/week" emails, and matches the existing polling
// style already used elsewhere in this codebase (AdminLayout, NotificationBell).
const ONE_DAY_MS = 24 * 60 * 60 * 1000
const HOUR_MS = 60 * 60 * 1000

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / ONE_DAY_MS)
}

function emailShell(headerText, bodyHtml) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:28px 40px;">
          <span style="font-size:20px;color:#fff;font-weight:bold;">🏗️ ECSPrep</span>
          <div style="color:#dbeafe;font-size:14px;margin-top:4px;">${headerText}</div>
        </td></tr>
        <tr><td style="padding:32px 40px;">${bodyHtml}</td></tr>
        <tr><td style="padding:0 40px 28px;">
          <p style="font-size:12px;color:#9ca3af;margin:0;">
            You're receiving this because of a notification preference set in your ECSPrep account
            settings. You can turn these off any time under Settings → Notifications.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function weeklyReportEmailHtml(user, stats) {
  const name = user.name || 'there'
  const body = `
    <p style="font-size:16px;color:#111827;margin:0 0 16px;">Hi ${name},</p>
    <p style="font-size:14px;color:#374151;line-height:1.6;margin:0 0 20px;">
      Here's how your ECS test practice went this week:
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="padding:14px;text-align:center;background:#eff6ff;border-radius:12px;width:33%;">
          <div style="font-size:22px;font-weight:bold;color:#1d4ed8;">${stats.testsTaken}</div>
          <div style="font-size:12px;color:#475569;">tests taken</div>
        </td>
        <td style="width:12px;"></td>
        <td style="padding:14px;text-align:center;background:#ecfdf5;border-radius:12px;width:33%;">
          <div style="font-size:22px;font-weight:bold;color:#059669;">${stats.avgScore}%</div>
          <div style="font-size:12px;color:#475569;">average score</div>
        </td>
        <td style="width:12px;"></td>
        <td style="padding:14px;text-align:center;background:#fff7ed;border-radius:12px;width:33%;">
          <div style="font-size:22px;font-weight:bold;color:#c2410c;">${stats.bestScore}%</div>
          <div style="font-size:12px;color:#475569;">best score</div>
        </td>
      </tr>
    </table>
    <p style="font-size:14px;color:#374151;line-height:1.6;margin:0;">
      ${stats.testsTaken === 0
        ? 'No practice sessions logged this week — jump back in when you get a chance, little and often makes the biggest difference before test day.'
        : 'Keep it up — steady weekly practice is exactly what gets candidates through the ECS Health & Safety assessment first time.'}
    </p>
    <a href="${CLIENT_URL}/dashboard" style="display:inline-block;margin-top:20px;background:#1d4ed8;color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:10px;">
      Open my dashboard
    </a>`
  return emailShell('Your weekly progress report', body)
}

function examReminderEmailHtml(user, daysLeft) {
  const name = user.name || 'there'
  const when = daysLeft <= 0 ? 'today' : daysLeft === 1 ? 'tomorrow' : `in ${daysLeft} days`
  const body = `
    <p style="font-size:16px;color:#111827;margin:0 0 16px;">Hi ${name},</p>
    <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 20px;">
      Your ECS Health &amp; Safety assessment is <strong>${when}</strong>. A quick top-up before you go:
    </p>
    <ul style="font-size:14px;color:#374151;line-height:1.9;margin:0 0 20px;padding-left:20px;">
      <li>Sit a full <a href="${CLIENT_URL}/mock-test" style="color:#1d4ed8;">mock test</a> if you haven't recently</li>
      <li>Review your <a href="${CLIENT_URL}/my-mistakes" style="color:#1d4ed8;">Wrong Questions</a> list</li>
      <li>Check the <a href="${CLIENT_URL}/exam-day-checklist" style="color:#1d4ed8;">Exam Day Checklist</a> — ID, booking confirmation, arrival time</li>
    </ul>
    <a href="${CLIENT_URL}/quick-review" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:10px;">
      Quick revision now
    </a>
    <p style="font-size:12px;color:#94a3b8;margin-top:20px;">
      Set or change your exam date any time under Settings → Notifications.
    </p>`
  return emailShell('Your ECS assessment is coming up', body)
}

function reEngagementEmailHtml(user, daysInactive) {
  const name = user.name || 'there'
  const body = `
    <p style="font-size:16px;color:#111827;margin:0 0 16px;">Hi ${name},</p>
    <p style="font-size:14px;color:#374151;line-height:1.6;margin:0 0 20px;">
      It's been ${daysInactive} days since your last practice session on ECSPrep. Even a short
      10-question <a href="${CLIENT_URL}/quick-review" style="color:#1d4ed8;">Quick Review</a> keeps
      what you've already learned fresh, so it's worth a few minutes when you can.
    </p>
    <a href="${CLIENT_URL}/dashboard" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:10px;">
      Continue where I left off
    </a>
    <p style="font-size:12px;color:#94a3b8;margin-top:20px;">
      Don't want these nudges? Turn them off under Settings → Notifications.
    </p>`
  return emailShell('Still working towards your ECS card?', body)
}

async function computeWeeklyStats(userId) {
  const activity = await getUserActivity(userId, 500)
  const weekAgo = Date.now() - 7 * ONE_DAY_MS
  const submits = activity.filter((a) => a.type === 'test_submit' && a.at && new Date(a.at).getTime() >= weekAgo)
  const testsTaken = submits.length
  const avgScore = testsTaken
    ? Math.round(submits.reduce((sum, a) => sum + (a.meta?.percentage || 0), 0) / testsTaken)
    : 0
  const bestScore = testsTaken ? Math.max(...submits.map((a) => a.meta?.percentage || 0)) : 0
  return { testsTaken, avgScore, bestScore }
}

async function lastActivityAt(userId) {
  const activity = await getUserActivity(userId, 20)
  const dated = activity.filter((a) => a.at).sort((a, b) => new Date(b.at) - new Date(a.at))
  return dated[0]?.at || null
}

// Runs every hour; each job internally decides whether "today" is the
// right moment for a given user so it's safe to call this often — every
// send is guarded by a `*SentAt` timestamp on the user record so nobody
// gets duplicate emails from repeated ticks.
async function runScheduledNotifications() {
  let users
  try {
    users = await listAll()
  } catch (e) {
    console.error('Scheduled notifications: could not load users:', e.message)
    return
  }

  const now = new Date()
  const isSunday = now.getDay() === 0 // weekly report goes out Sunday evening

  for (const user of users) {
    if (user.deletedAt || !user.email) continue

    try {
      // 1) Weekly progress report — opt-in, once per calendar week.
      if (user.weeklyReportOptIn && isSunday) {
        const lastSent = user.weeklyReportSentAt ? new Date(user.weeklyReportSentAt) : null
        const alreadySentThisWeek = lastSent && daysBetween(lastSent, now) < 6
        if (!alreadySentThisWeek) {
          const stats = await computeWeeklyStats(user.id)
          const recipients = [user.email, user.employerEmail].filter(Boolean)
          await sendEmail({ to: recipients.join(','), subject: 'Your weekly ECSPrep progress report', html: weeklyReportEmailHtml(user, stats) })
          await updateUser(user.id, { weeklyReportSentAt: now.toISOString() })
        }
      }

      // 2) Exam-day reminders — 7/3/1 days before a self-reported exam date.
      if (user.examDate) {
        const daysLeft = daysBetween(now, user.examDate)
        if (daysLeft === 7 && !user.examReminder7SentAt) {
          await sendEmail({ to: user.email, subject: 'Your ECS assessment is coming up in 7 days', html: examReminderEmailHtml(user, 7) })
          await updateUser(user.id, { examReminder7SentAt: now.toISOString() })
        } else if (daysLeft === 3 && !user.examReminder3SentAt) {
          await sendEmail({ to: user.email, subject: 'Your ECS assessment is coming up in 3 days', html: examReminderEmailHtml(user, 3) })
          if (user.smsRemindersEnabled && user.phoneNumber) await sendSms({ to: user.phoneNumber, body: `ECSPrep: your assessment is in 3 days. Good luck with your revision! Reply STOP to opt out.` })
          await updateUser(user.id, { examReminder3SentAt: now.toISOString() })
        } else if (daysLeft <= 1 && daysLeft >= 0 && !user.examReminder1SentAt) {
          await sendEmail({ to: user.email, subject: daysLeft === 0 ? 'Your ECS assessment is today' : 'Your ECS assessment is tomorrow', html: examReminderEmailHtml(user, daysLeft) })
          if (user.smsRemindersEnabled && user.phoneNumber) {
            await sendSms({ to: user.phoneNumber, body: `ECSPrep: your assessment is ${daysLeft === 0 ? 'today' : 'tomorrow'}. Take a few minutes for last revision. Good luck! Reply STOP to opt out.` })
          }
          await updateUser(user.id, { examReminder1SentAt: now.toISOString() })
        }
      }

      // 3) Re-engagement nudge — opt-in, sent once after 3+ days of
      // inactivity, then not again for another 7 days so it doesn't nag.
      if (user.reEngagementOptIn) {
        const last = await lastActivityAt(user.id)
        const daysInactive = last ? daysBetween(last, now) : null
        const lastNudge = user.reEngagementSentAt ? new Date(user.reEngagementSentAt) : null
        const nudgeCooldownOver = !lastNudge || daysBetween(lastNudge, now) >= 7
        if (daysInactive !== null && daysInactive >= 3 && nudgeCooldownOver) {
          await sendEmail({ to: user.email, subject: 'Still working towards your ECS card?', html: reEngagementEmailHtml(user, daysInactive) })
          await updateUser(user.id, { reEngagementSentAt: now.toISOString() })
        }
      }
    } catch (e) {
      // One user's failure (bad email, transient DB hiccup) should never
      // stop the rest of the batch from being processed.
      console.error(`Scheduled notifications failed for user ${user.id}:`, e.message)
    }
  }
}

setInterval(() => { runScheduledNotifications().catch((e) => console.error('Scheduled notifications run failed:', e.message)) }, HOUR_MS)
// Also run once shortly after boot so a restart doesn't mean waiting up to
// an hour for the first check (e.g. right after deploy).
setTimeout(() => { runScheduledNotifications().catch((e) => console.error('Scheduled notifications run failed:', e.message)) }, 30_000)

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

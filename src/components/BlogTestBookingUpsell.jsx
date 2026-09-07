// components/BlogTestBookingUpsell.jsx
// "Book Your ECS Test" banner shown on the blog listing + every blog post.
// Separate from BlogCardBookingUpsell (which promotes the ECS CARD
// application) — this one promotes booking a slot to actually SIT the ECS
// Health & Safety exam (see ECSTestBookingPage.jsx). Admin-togglable from
// Admin -> Settings ("Book Your ECS Test" banner on the blog) — off by
// default, hidden from everyone until an admin turns it on.
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardCheck, CheckCircle2, Clock } from 'lucide-react'
import { apiRequest } from '../lib/api'

const BENEFITS = [
  'We find your nearest available test centre and time slot',
  'Confirmed booking sent straight to your email',
  'Guidance on what to bring and what to expect on the day',
  'Free access to our full ECS mock test bank while you wait (worth £60)',
  'Email support if you need to reschedule',
  'Works for first-time bookings and re-sits',
]

const STEPS = [
  'Tell us your details & preferred area',
  'We confirm your test centre & date',
  'Pay securely — your slot is booked',
]

function BlogTestBookingUpsell() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    let cancelled = false
    apiRequest('/api/settings/public', { auth: false })
      .then((data) => { if (!cancelled) setEnabled(!!data.blogTestBookingUpsellEnabled) })
      .catch(() => { if (!cancelled) setEnabled(false) })
    return () => { cancelled = true }
  }, [])

  if (!enabled) return null

  return (
    <div className="relative my-10 rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 via-white to-white p-6 sm:p-8 shadow-sm">
      <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4">
        <ClipboardCheck size={13} /> Most Popular
      </span>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
        Book Your ECS Test With Us
      </h3>
      <p className="text-gray-600 mb-6 max-w-xl">
        Don't waste time hunting for a test centre. We find your nearest slot, confirm your booking, and get you sat down for the real exam.
      </p>

      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-6">
        {BENEFITS.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5 pt-4 border-t border-emerald-100 text-sm text-gray-700">
        <span className="font-semibold text-gray-500 uppercase text-xs tracking-wide w-full sm:w-auto mb-1 sm:mb-0">How it works:</span>
        {STEPS.map((step, i) => (
          <span key={step} className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold shrink-0">{i + 1}</span>
            {step}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Clock size={16} className="text-emerald-500 shrink-0" />
        Takes about 5 minutes to request — we confirm your slot within 24 hours.
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/ecstestbooking"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Book Your ECS Test →
        </Link>
        <p className="text-sm text-gray-600">
          <span className="font-bold text-gray-900">£79</span> total — test fee + booking assistance
        </p>
      </div>
    </div>
  )
}

export default BlogTestBookingUpsell

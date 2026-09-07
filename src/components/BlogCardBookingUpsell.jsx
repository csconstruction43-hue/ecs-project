// components/BlogCardBookingUpsell.jsx
// "Book Your ECS Card" banner shown on the blog listing + every blog post.
// Same visual pattern as BlogProUpsell, but promotes the ECS card booking
// service (see ECSCardBookingPage.jsx) instead of Pro. Admin-togglable from
// Admin -> Settings ("Book Your ECS Card" banner on the blog) — off by
// default, hidden from everyone until an admin turns it on.
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, CheckCircle2, Clock } from 'lucide-react'
import { apiRequest } from '../lib/api'

const BENEFITS = [
  'Documents checked before you pay — fewer rejected applications',
  'Full application assistance from start to finish',
  'Priority processing on your ECS card application',
  'Free lifetime ECS H&S mock test access included (worth £60)',
  'Email support if anything comes up',
  'Works for new applications, renewals and replacements',
]

const STEPS = [
  'Fill in your details',
  'Upload your documents',
  'Pay securely — we submit it for you',
]

function BlogCardBookingUpsell() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    let cancelled = false
    apiRequest('/api/settings/public', { auth: false })
      .then((data) => { if (!cancelled) setEnabled(!!data.blogCardBookingUpsellEnabled) })
      .catch(() => { if (!cancelled) setEnabled(false) })
    return () => { cancelled = true }
  }, [])

  if (!enabled) return null

  return (
    <div className="relative my-10 rounded-2xl border-2 border-blue-400 bg-gradient-to-br from-blue-50 via-white to-white p-6 sm:p-8 shadow-sm">
      <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4">
        <CreditCard size={13} /> Most Popular
      </span>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
        Book Your ECS Card With Us
      </h3>
      <p className="text-gray-600 mb-6 max-w-xl">
        Skip the confusing paperwork. We check your documents, handle the application, and help you get it right first time.
      </p>

      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-6">
        {BENEFITS.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5 pt-4 border-t border-blue-100 text-sm text-gray-700">
        <span className="font-semibold text-gray-500 uppercase text-xs tracking-wide w-full sm:w-auto mb-1 sm:mb-0">How it works:</span>
        {STEPS.map((step, i) => (
          <span key={step} className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0">{i + 1}</span>
            {step}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Clock size={16} className="text-blue-500 shrink-0" />
        Takes about 10 minutes to complete — no appointment needed.
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/ecscardbooking"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Book Your ECS Card →
        </Link>
        <p className="text-sm text-gray-600">
          <span className="font-bold text-gray-900">£99</span> total — application fee + full assistance
        </p>
      </div>
    </div>
  )
}

export default BlogCardBookingUpsell

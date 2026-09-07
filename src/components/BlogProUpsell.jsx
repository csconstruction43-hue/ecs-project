// components/BlogProUpsell.jsx
// "Unlock ECSPrep Pro" banner shown on blog content — same look as the
// site's other pricing surfaces: amber "Most Popular" badge, two-column
// checklist, big CTA button + a smaller lifetime-price note next to it.
// Prices/features are pulled from lib/pricingPlans.js (the single source
// of truth) so this can never drift out of sync with /plans or /checkout.
import React from 'react'
import { Link } from 'react-router-dom'
import { Crown, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PLANS } from '../lib/pricingPlans'

const FEATURES = [
  'Full question bank, all 22 ECS test routes',
  'AI-powered explanations for every answer',
  'Personalised study plan',
  'Unlimited timed mock tests',
  'Full analytics — track your weak topics',
  'Practice by topic, anytime',
]

function BlogProUpsell() {
  const { isPro } = useAuth()
  const weekly = PLANS.weekly
  const lifetime = PLANS.lifetime

  // Already-Pro users don't need to be sold the upgrade again.
  if (isPro) return null

  return (
    <div className="relative my-10 rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 via-white to-white p-6 sm:p-8 shadow-sm">
      <span className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4">
        <Crown size={13} className="fill-white" /> Most Popular
      </span>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
        Unlock ECSPrep Pro
      </h3>
      <p className="text-gray-600 mb-6 max-w-xl">
        Stop guessing what's on the real exam. Get full access to everything you need to pass first time.
      </p>

      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-7">
        {FEATURES.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle2 size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          to={weekly.link}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Go Pro from {weekly.price}/week →
        </Link>
        <p className="text-sm text-gray-600">
          or <span className="font-bold text-gray-900">{lifetime.price}</span> once for lifetime access
        </p>
      </div>
    </div>
  )
}

export default BlogProUpsell

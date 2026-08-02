import React from 'react'
import Seo from '../components/Seo'
import { Link } from 'react-router-dom'
import { FaCheck, FaTimes, FaShieldAlt, FaCreditCard, FaUndo, FaEnvelope, FaStar, FaTrophy, FaBookOpen, FaHeadphones, FaDatabase, FaCrown, FaRedoAlt, FaChartLine } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { PLAN_LIST, PLANS, monthlySavingsVsWeekly, lifetimeBreakEvenMonths } from '../lib/pricingPlans'

const PLAN_ICON = {
  free: <FaCheck className="text-emerald-500" />,
  weekly: <FaRedoAlt className="text-blue-500" />,
  monthly: <FaChartLine className="text-blue-500" />,
  lifetime: <FaTrophy className="text-blue-500" />,
}

const comparisonRows = [
  { name: 'Mock tests', free: '2 samples', weekly: 'Unlimited', monthly: 'Unlimited', lifetime: 'Unlimited' },
  { name: 'Full question bank', free: 'Limited', weekly: 'Full', monthly: 'Full', lifetime: 'Full' },
  { name: 'All 22 ECS test routes', free: false, weekly: true, monthly: true, lifetime: true },
  { name: 'All 3 test modes', free: 'Quick only', weekly: true, monthly: true, lifetime: true },
  { name: 'AI explanations', free: false, weekly: true, monthly: true, lifetime: true },
  { name: 'Practice by topic', free: false, weekly: true, monthly: true, lifetime: true },
  { name: 'My Mistakes review', free: false, weekly: true, monthly: true, lifetime: true },
  { name: 'Analytics dashboard', free: false, weekly: true, monthly: true, lifetime: true },
  { name: 'Personalised study plan', free: false, weekly: true, monthly: true, lifetime: true },
  { name: 'Study guide access', free: false, weekly: true, monthly: true, lifetime: true },
  { name: '7-day money-back guarantee', free: false, weekly: true, monthly: true, lifetime: true },
  { name: 'Never expires', free: false, weekly: false, monthly: false, lifetime: true },
]

const faqs = [
  { q: 'Can I cancel my subscription?', a: 'Yes. Cancel from Settings → Membership at any time and keep Pro access until the end of your current billing period. Lifetime plans never need cancelling — they don\u2019t renew.' },
  { q: 'What payment methods do you accept?', a: 'All major credit and debit cards via Stripe (Visa, Mastercard, Amex, Discover). Apple Pay and Google Pay are available at checkout.' },
  { q: 'Is there a money-back guarantee?', a: 'Yes. Email support within 7 days of your paid signup and we\u2019ll refund you in full, no questions asked.' },
  { q: 'Does Lifetime really mean forever?', a: 'Yes — pay once, keep access forever, including all future updates to the question bank, study guide and analytics. Especially good value if you\u2019ll renew your ECS card more than once (every 3\u20135 years).' },
  { q: 'Do you offer student discounts?', a: 'Not currently — our Weekly plan is already a low-commitment entry point, and Lifetime works out cheaper than a couple of retake bookings. Email us if you\u2019re training a group and need a bulk discount.' },
]

function renderCell(value) {
  if (value === true) return <FaCheck className="text-emerald-500 mx-auto" />
  if (value === false) return <FaTimes className="text-gray-300 mx-auto" />
  return <span className="text-gray-600">{value}</span>
}

function PricingPage() {
  const { isPro, user } = useAuth()
  const savingPct = monthlySavingsVsWeekly()
  const breakEvenMonths = lifetimeBreakEvenMonths()

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="ECSPrep Pricing | Free & Pro Plans for ECS Mock Test Practice"
        description="Compare ECSPrep's free and Pro plans. Unlock unlimited ECS mock tests, AI explanations, all 22 ECS topics, and full analytics."
        path="/pricing"
      />

      {/* Dark hero band */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white px-4 pt-16 pb-28">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-blue-200 mb-6">
            Simple pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Pass your ECS test the first time
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Start free, upgrade whenever you're ready. 7-day money-back guarantee on every paid plan.
          </p>

          {isPro ? (
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/30 rounded-full px-4 py-2 mt-6">
              <FaCrown className="text-blue-400" />
              <p className="text-sm text-emerald-200 font-semibold">
                You're on the {user?.plan || 'Pro'} plan — thanks for being a Pro member.
              </p>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mt-6">
              <p className="text-sm text-slate-200">
                Failing the ECS test costs extra to retake. Pro starts at{' '}
                <span className="font-bold text-white">{PLANS.weekly.price}/week</span>.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 -mt-16 pb-16">
        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {PLAN_LIST.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-xl p-6 text-center relative flex flex-col ${
                plan.popular ? 'ring-2 ring-blue-500 md:scale-[1.04] z-10' : 'border border-gray-100'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                  <FaStar className="text-blue-300 text-xs" /> Most popular
                </span>
              )}

              <div className="flex justify-center mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${plan.popular ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  {PLAN_ICON[plan.id]}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-xs text-gray-400 mb-3">{plan.tagline}</p>
              <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
              {plan.period && <div className="text-sm text-gray-500 -mt-1 mb-4">per {plan.period}</div>}
              {!plan.period && <div className="text-sm text-gray-500 -mt-1 mb-4">&nbsp;</div>}

              <ul className="text-left space-y-2.5 text-sm mb-6 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FaCheck className="text-emerald-500 mt-1 shrink-0" size={11} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={isPro && plan.id !== 'free' ? '/settings' : plan.link}
                className={`block w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                    : 'border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {isPro && plan.id !== 'free' ? 'Manage plan' : plan.buttonText}
              </Link>

              {plan.id === 'monthly' && (
                <p className="text-xs text-emerald-600 mt-3 font-medium">Save ~{savingPct}% vs Weekly</p>
              )}
              {plan.id === 'lifetime' && (
                <p className="text-xs text-blue-600 mt-3 font-medium">Pays for itself in {breakEvenMonths} months</p>
              )}
            </div>
          ))}
        </div>

        {/* 7-day Guarantee Banner */}
        <div className="bg-white rounded-2xl p-6 mb-16 border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 rounded-full p-3">
                <FaShieldAlt className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">7-day money-back guarantee</h3>
                <p className="text-gray-500 text-sm">Try Pro risk-free. If it doesn't help you pass, email support within 7 days for a full refund, no questions asked.</p>
              </div>
            </div>
            <Link to="/guest-test" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition whitespace-nowrap font-semibold">
              Try a free sample test →
            </Link>
          </div>
        </div>

        {/* Compare Features Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Compare features</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-4 text-left font-semibold text-gray-700">Feature</th>
                    <th className="p-4 text-center font-semibold text-gray-700">Free</th>
                    <th className="p-4 text-center font-semibold text-gray-700">Weekly</th>
                    <th className="p-4 text-center font-semibold text-blue-700 bg-blue-50">Monthly</th>
                    <th className="p-4 text-center font-semibold text-gray-700">Lifetime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {comparisonRows.map((feature, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 transition">
                      <td className="p-4 text-left font-medium text-gray-700">{feature.name}</td>
                      <td className="p-4 text-center">{renderCell(feature.free)}</td>
                      <td className="p-4 text-center">{renderCell(feature.weekly)}</td>
                      <td className="p-4 text-center bg-blue-50/40 font-medium">{renderCell(feature.monthly)}</td>
                      <td className="p-4 text-center">{renderCell(feature.lifetime)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-16 text-gray-500">
          <div className="flex items-center gap-2">
            <FaCreditCard className="text-blue-500" />
            <span className="text-sm">Secure payments via Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUndo className="text-blue-500" />
            <span className="text-sm">7-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <FaDatabase className="text-blue-500" />
            <span className="text-sm">Growing question bank</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeadphones className="text-blue-500" />
            <span className="text-sm">Audio support (Polish/English)</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBookOpen className="text-blue-500" />
            <span className="text-sm">Study guide included</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Pricing FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:border-blue-100 transition">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center bg-white rounded-xl p-6 border border-gray-100">
            <FaEnvelope className="text-blue-500 text-2xl mx-auto mb-2" />
            <p className="text-gray-500">
              Need help choosing? Email <a href="mailto:support@ecsmocktest.uk" className="text-blue-600 font-semibold hover:underline">support@ecsmocktest.uk</a> and we'll point you to the right plan.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-400 border-t border-gray-100 pt-8">
          <p>ECSMockTest.uk is not affiliated with ECS or any official certification scheme.</p>
          <p className="mt-1">All prices are in GBP (£) and include VAT where applicable.</p>
        </div>
      </div>
    </div>
  )
}

export default PricingPage

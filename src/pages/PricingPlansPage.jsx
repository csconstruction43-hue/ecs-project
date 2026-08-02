import React from 'react'
import { Crown, Check } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PLAN_LIST } from '../lib/pricingPlans'
import Seo from '../components/Seo'

function PricingPlansPage() {
  const { isPro, user } = useAuth()
  const location = useLocation()
  const redirectedForPro = location.state?.reason === 'pro-required'
  const redirectedForCourse = location.state?.reason === 'course-payment'
  const courseName = location.state?.courseName

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Seo
        title="ECSPrep Pricing: Plans for ECS Test & Exam Preparation"
        description="Compare ECSPrep plans for ECS mock tests, courses and revision tools, and pick the option that fits how you're preparing for your ECS assessment."
        path="/plans"
      />
      {redirectedForPro && (
        <div className="max-w-2xl mx-auto mb-8 bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-xl px-4 py-3 text-center">
          🔒 That page is part of ECSPrep Pro. Upgrade below to unlock it.
        </div>
      )}
      {redirectedForCourse && (
        <div className="max-w-2xl mx-auto mb-8 bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-xl px-4 py-3 text-center">
          🔒 {courseName ? `"${courseName}" needs` : 'That course needs'} an active Pro plan — pick one below to book it.
        </div>
      )}
      <div className="text-center mb-12">
        <Crown size={44} className="mx-auto text-blue-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {isPro ? `You're currently on the ${user?.plan || 'Pro'} plan.` : 'Choose the plan that works for you.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {PLAN_LIST.map((plan) => {
          const isCurrentPlan = plan.id === 'free' ? !isPro : isPro && user?.plan === plan.id
          return (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border flex flex-col ${
                plan.popular ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-200'
              }`}
            >
              {plan.popular && <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">Most popular</div>}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h2>
                <p className="text-xs text-gray-400 mb-3">{plan.tagline}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">/{plan.period}</span>}
                </div>
                <Link
                  to={isCurrentPlan ? '/settings' : plan.link}
                  className={`block text-center py-3 rounded-lg font-semibold transition mb-6 ${
                    isCurrentPlan
                      ? 'bg-emerald-100 text-emerald-700'
                      : plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isCurrentPlan ? 'Current plan' : plan.id === 'free' ? 'Get started' : 'Upgrade now'}
                </Link>
                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-center text-sm text-gray-400 mt-10">
        7-day money-back guarantee on every paid plan. See the{' '}
        <Link to="/pricing" className="text-blue-600 hover:underline">full pricing comparison</Link>.
      </p>
    </div>
  )
}

export default PricingPlansPage

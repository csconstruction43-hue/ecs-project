// pages/CheckoutPage.jsx
// Real payment flow: this page no longer collects card numbers itself.
// It asks our backend to create a Stripe Checkout Session, then sends the
// browser to Stripe's own secure, hosted payment page. Stripe redirects
// back here afterwards with ?session_id=... which we verify with the
// backend to flip the user to Pro.
import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Lock, ShieldCheck, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PLANS as PLAN_DETAILS } from '../lib/pricingPlans'

function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const planId = searchParams.get('plan') || 'monthly'
  const sessionId = searchParams.get('session_id')
  const canceled = searchParams.get('canceled')
  const plan = PLAN_DETAILS[planId] || PLAN_DETAILS.monthly
  const { isAuthenticated, startCheckout, confirmCheckoutSession, requestManualPlan, user } = useAuth()

  const [redirecting, setRedirecting] = useState(false)
  const [error, setError] = useState('')
  const [confirming, setConfirming] = useState(!!sessionId)
  const [success, setSuccess] = useState(false)
  const [requesting, setRequesting] = useState(false)
  const [requestError, setRequestError] = useState('')

  const isPending = user?.pendingPlan === planId

  // Coming back from Stripe with a session_id — verify the payment.
  useEffect(() => {
    if (!sessionId) return
    let cancelled = false
    confirmCheckoutSession(sessionId)
      .then(() => {
        if (!cancelled) setSuccess(true)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not confirm your payment.')
      })
      .finally(() => {
        if (!cancelled) setConfirming(false)
      })
    return () => {
      cancelled = true
    }
  }, [sessionId, confirmCheckoutSession])

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md text-center">
          <Lock className="mx-auto text-blue-600 mb-4" size={36} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to continue</h2>
          <p className="text-gray-600 mb-6">Please sign in or create a free account before upgrading to Pro.</p>
          <Link to="/login" state={{ from: `/checkout?plan=${planId}` }} className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  if (confirming) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md text-center">
          <Loader2 className="mx-auto text-blue-600 mb-4 animate-spin" size={36} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Confirming your payment...</h2>
          <p className="text-gray-600">Just a moment while we check with Stripe.</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md text-center">
          <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Pro! 🎉</h2>
          <p className="text-gray-600 mb-6">Your {plan.name} plan is active.</p>
          <Link to="/dashboard" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Go to dashboard
          </Link>
        </div>
      </div>
    )
  }

  const handleCheckout = async () => {
    setError('')
    setRedirecting(true)
    try {
      await startCheckout(planId)
      // Browser navigates away to Stripe here; nothing else to do.
    } catch (err) {
      setError(err.message || 'Could not start checkout. Please try again.')
      setRedirecting(false)
    }
  }

  const handleManualRequest = async () => {
    setRequestError('')
    setRequesting(true)
    try {
      await requestManualPlan(planId)
    } catch (err) {
      setRequestError(err.message || 'Could not send your request. Please try again.')
    } finally {
      setRequesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12">
      <div className="max-w-xl mx-auto">
        {canceled && (
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-800 px-4 py-3 rounded-lg mb-6 text-sm">
            <XCircle size={16} /> Checkout was canceled — no payment was taken.
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order summary</h2>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl mb-4">
            <div>
              <p className="font-semibold text-gray-900">ECSPrep Pro — {plan.name}</p>
              <p className="text-sm text-gray-500">Billed {plan.period}</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">{plan.price}</p>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Unlimited mock tests</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> AI-powered explanations</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Full analytics dashboard</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> All 11 ECS topics</li>
          </ul>

          <button
            onClick={handleCheckout}
            disabled={redirecting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {redirecting ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Redirecting to Stripe...
              </>
            ) : (
              <>
                <Lock size={18} /> Pay {plan.price} securely with Stripe
              </>
            )}
          </button>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
            <ShieldCheck size={16} className="text-green-500" />
            You'll enter your card details on Stripe's secure page — we never see or store them.
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            {isPending ? (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm">
                <Loader2 size={16} /> Request sent — our admin team will activate your {plan.name} plan shortly.
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-3">Prefer to pay another way (e.g. bank transfer)?</p>
                <button
                  onClick={handleManualRequest}
                  disabled={requesting}
                  className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                >
                  {requesting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Sending request...
                    </>
                  ) : (
                    'Request manual activation instead'
                  )}
                </button>
                {requestError && <p className="text-sm text-red-600 mt-2">{requestError}</p>}
                <p className="text-xs text-gray-400 mt-2">
                  Our admin team will review and activate your plan by hand — no card needed now.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

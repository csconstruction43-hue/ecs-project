// pages/CheckoutPage.jsx
// Real payment flow: this page no longer collects card numbers itself.
// It asks our backend to create a Stripe Checkout Session, then sends the
// browser to Stripe's own secure, hosted payment page. Stripe redirects
// back here afterwards with ?session_id=... which we verify with the
// backend to flip the user to Pro.
import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Lock, ShieldCheck, Loader2, CheckCircle2, XCircle, Tag, GraduationCap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PLANS as PLAN_DETAILS } from '../lib/pricingPlans'
import { apiRequest } from '../lib/api'

function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const planId = searchParams.get('plan') || 'monthly'
  const sessionId = searchParams.get('session_id')
  const canceled = searchParams.get('canceled')
  const plan = PLAN_DETAILS[planId] || PLAN_DETAILS.monthly
  const { isAuthenticated, startCheckout, confirmCheckoutSession, requestManualPlan, user, login, signup } = useAuth()

  const [redirecting, setRedirecting] = useState(false)
  const [error, setError] = useState('')
  const [confirming, setConfirming] = useState(!!sessionId)
  const [success, setSuccess] = useState(false)
  const [requesting, setRequesting] = useState(false)
  const [requestError, setRequestError] = useState('')

  // Inline quick sign-up / sign-in, right here on the checkout page — so
  // paying never sends the person away to a separate /login page. We still
  // need *some* account behind the payment (Pro status is stored against a
  // userId, and Stripe needs an email + client_reference_id), but that
  // account is created silently as part of clicking "Continue to Payment".
  const [authMode, setAuthMode] = useState('signup') // 'signup' | 'login'
  const [authName, setAuthName] = useState('')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // New feature: coupon codes at checkout.
  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null) // { code, type, value }
  const [couponChecking, setCouponChecking] = useState(false)
  const [couponError, setCouponError] = useState('')

  const discountedPrice = appliedCoupon
    ? Math.max(
        0,
        appliedCoupon.type === 'percent'
          ? plan.priceValue * (1 - appliedCoupon.value / 100)
          : plan.priceValue - appliedCoupon.value
      )
    : null

  const applyCoupon = async () => {
    if (!couponInput.trim()) return
    setCouponChecking(true)
    setCouponError('')
    try {
      const { coupon } = await apiRequest('/api/coupons/validate', {
        method: 'POST',
        body: { code: couponInput.trim(), plan: planId },
      })
      setAppliedCoupon(coupon)
    } catch (err) {
      setAppliedCoupon(null)
      setCouponError(err.message || 'That code is not valid.')
    } finally {
      setCouponChecking(false)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponInput('')
    setCouponError('')
  }

  const isPending = user?.pendingPlan === planId

  // Handles the inline auth form's submit: sign up (or sign in) the person
  // right on this page, then immediately continue to Stripe — no redirect,
  // no separate login screen in between.
  const handleAuthAndPay = async (e) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    try {
      if (authMode === 'signup') {
        if (!authName.trim() || !authEmail.trim() || authPassword.length < 6) {
          setAuthError('Please enter your name, email and a password (6+ characters).')
          setAuthLoading(false)
          return
        }
        try {
          await signup({ name: authName.trim(), email: authEmail.trim(), password: authPassword })
        } catch (err) {
          if ((err.message || '').toLowerCase().includes('already exists')) {
            setAuthMode('login')
            setAuthError('An account with this email already exists — enter your password below to continue.')
            setAuthLoading(false)
            return
          }
          throw err
        }
      } else {
        if (!authEmail.trim() || !authPassword) {
          setAuthError('Please enter your email and password.')
          setAuthLoading(false)
          return
        }
        await login({ email: authEmail.trim(), password: authPassword })
      }
      // Straight into Stripe checkout now — same click, no extra step.
      setRedirecting(true)
      await startCheckout(planId, appliedCoupon?.code)
    } catch (err) {
      setAuthError(err.message || 'Could not continue. Please check your details and try again.')
    } finally {
      setAuthLoading(false)
    }
  }

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
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Lock className="mx-auto text-blue-600 mb-3" size={32} />
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              ECSPrep Pro — {plan.name} ({plan.price})
            </h2>
            <p className="text-gray-500 text-sm">Enter your details to pay — this takes you straight to Stripe, no separate sign-in page.</p>
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg mb-4 text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuthAndPay} className="space-y-3">
            {authMode === 'signup' && (
              <input
                type="text"
                required
                placeholder="Full name"
                value={authName}
                onChange={(e) => setAuthName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
            <input
              type="email"
              required
              placeholder="Email address"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder={authMode === 'signup' ? 'Create a password (6+ characters)' : 'Password'}
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {authLoading ? 'Please wait…' : 'Continue to Payment'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            {authMode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setAuthError('') }}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign in here
                </button>
              </>
            ) : (
              <>
                New here?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthMode('signup'); setAuthError('') }}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Create an account
                </button>
              </>
            )}
          </p>
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
      await startCheckout(planId, appliedCoupon?.code)
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
            <div className="text-right">
              {appliedCoupon ? (
                <>
                  <p className="text-sm text-gray-400 line-through">{plan.price}</p>
                  <p className="text-2xl font-bold text-blue-600">£{discountedPrice.toFixed(2)}</p>
                </>
              ) : (
                <p className="text-2xl font-bold text-blue-600">{plan.price}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            {appliedCoupon ? (
              <div className="flex items-center justify-between px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg text-sm">
                <span className="flex items-center gap-1.5 text-green-700 font-medium">
                  <Tag size={14} /> Code <span className="font-mono">{appliedCoupon.code}</span> applied — {appliedCoupon.type === 'percent' ? `${appliedCoupon.value}%` : `£${appliedCoupon.value}`} off
                </span>
                <button onClick={removeCoupon} className="text-green-700 hover:text-green-900 font-medium">Remove</button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value); setCouponError('') }}
                    placeholder="Have a discount code?"
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono uppercase"
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponChecking || !couponInput.trim()}
                    className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {couponChecking ? <Loader2 size={14} className="animate-spin" /> : 'Apply'}
                  </button>
                </div>
                {couponError && <p className="text-xs text-red-600 mt-1.5">{couponError}</p>}
              </div>
            )}
          </div>

          <h3 className="text-sm font-bold text-gray-900 mb-2">What's included with {plan.name}</h3>
          <ul className="space-y-2 text-sm text-gray-600 mb-4">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500 shrink-0" /> {feature}
              </li>
            ))}
          </ul>

          {planId !== 'free' && (
            <div className="flex items-start gap-2.5 bg-purple-50 border border-purple-200 rounded-xl px-4 py-3 mb-6 text-sm">
              <GraduationCap size={18} className="text-purple-600 shrink-0 mt-0.5" />
              <p className="text-purple-900">
                <span className="font-semibold">Online courses included too —</span> once you're Pro, you can request any course
                (ECS Health &amp; Safety, Level 2/3 Electrical, and more) at no extra cost. Just{' '}
                <Link to="/courses" className="underline font-medium hover:text-purple-700">browse the catalogue</Link>{' '}
                and request a booking — our team approves it and unlocks the full course toolkit.
              </p>
            </div>
          )}

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
                <Lock size={18} /> Pay {appliedCoupon ? `£${discountedPrice.toFixed(2)}` : plan.price} securely with Stripe
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

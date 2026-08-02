// pages/AffiliatePage.jsx
// Real referral dashboard — pulls the user's actual referral code, real
// signup/conversion counts, and a genuinely computed pending payout (only
// for course-driven conversions, where we know the exact price; see
// server/index.js for why subscription conversions are flagged separately
// instead of guessing a £ amount).
import React, { useEffect, useState } from 'react'
import { Share2, Copy, DollarSign, Loader2, CheckCircle2 } from 'lucide-react'
import { apiRequest } from '../lib/api'

function AffiliatePage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    apiRequest('/api/referral/me')
      .then(setData)
      .catch((err) => setError(err.message || 'Could not load your referral data.'))
      .finally(() => setLoading(false))
  }, [])

  const copyToClipboard = () => {
    if (!data?.link) return
    navigator.clipboard.writeText(data.link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex items-center justify-center gap-2 text-gray-400">
        <Loader2 className="animate-spin" size={20} /> Loading your referral dashboard…
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600 mb-2">{error}</p>
        <p className="text-gray-500 text-sm">Try refreshing the page.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Share2 size={32} className="text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Affiliate Dashboard</h1>
      </div>
      <p className="text-gray-600 mb-8">Your unique referral link and real, live earnings overview.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-2">Your referral link</h2>
        <p className="text-sm text-gray-600 mb-4">Share this link. Anyone who signs up and books a course or upgrades to Pro earns you 30% commission.</p>
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <code className="flex-1 p-3 bg-gray-50 border rounded-lg text-sm text-gray-600 break-all font-mono">
            {data.link}
          </code>
          <button onClick={copyToClipboard} className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-sm text-gray-500">Your code: <span className="font-mono">{data.code}</span> · Commission rate: 30%</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
          <div className="text-3xl font-bold text-gray-900">{data.signups}</div>
          <div className="text-gray-500 text-sm mt-1">SIGNUPS</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
          <div className="text-3xl font-bold text-gray-900">{data.conversions}</div>
          <div className="text-gray-500 text-sm mt-1">CONVERTED TO PRO</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-200">
          <DollarSign size={28} className="mx-auto text-green-600 mb-1" />
          <div className="text-3xl font-bold text-gray-900">£{data.pendingPayout.toFixed(2)}</div>
          <div className="text-gray-600 text-sm mt-1">PENDING PAYOUT</div>
        </div>
      </div>

      {data.subscriptionConversionsPendingReview > 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl p-4 mb-8">
          {data.subscriptionConversionsPendingReview} of your referrals upgraded via a subscription plan rather than a course —
          those commissions are calculated manually by our team and added to your payout after review.
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Recent referrals</h2>
        {data.recentReferrals.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Share2 size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No referrals yet.</p>
            <p className="text-sm text-gray-400">Share your referral link to get started!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {data.recentReferrals.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-800 font-medium">{r.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{new Date(r.joinedAt).toLocaleDateString('en-GB')}</span>
                  {r.isPro ? (
                    <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">CONVERTED</span>
                  ) : (
                    <span className="text-[11px] font-medium text-gray-400">Signed up</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AffiliatePage

// components/CookieConsent.jsx
// Simple cookie consent banner wired to Google Consent Mode v2. The Privacy
// Policy (section 7) tells users we show this before any personalised ads —
// this component is what actually makes that true.
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'

export const CONSENT_STORAGE_KEY = 'ecsprep_cookie_consent'

function pushConsentUpdate(granted) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  const state = granted ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  })
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem(CONSENT_STORAGE_KEY)
    } catch {
      return true
    }
  })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
      if (stored) pushConsentUpdate(stored === 'accepted')
    } catch {
      /* ignore */
    }
  }, [])

  const choose = (accepted) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, accepted ? 'accepted' : 'rejected')
    } catch {
      /* ignore storage errors */
    }
    pushConsentUpdate(accepted)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-5 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 bg-blue-50 rounded-lg shrink-0">
            <Cookie size={18} className="text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            We use cookies for essential site features, analytics, and to show ads via Google AdSense. You can accept or reject non-essential cookies — see our{' '}
            <Link to="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link>{' '}for details.
          </p>
        </div>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => choose(false)}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Reject non-essential
          </button>
          <button
            onClick={() => choose(true)}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}

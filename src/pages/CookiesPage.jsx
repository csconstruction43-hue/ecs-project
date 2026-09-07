// pages/CookiesPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import Seo from '../components/Seo'
import { CONSENT_STORAGE_KEY } from '../components/CookieConsent'

function CookiesPage() {
  const reopenBanner = () => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY)
    } catch {
      /* ignore */
    }
    window.location.reload()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Seo
        title="Cookie Policy | ECSPrep ECS Test Practice Platform"
        description="Learn which cookies and similar technologies ECSPrep uses, why we use them, and how to manage your preferences including advertising cookies."
        path="/cookies"
      />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-blue-50 rounded-xl">
          <Cookie size={22} className="text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
      </div>
      <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. What cookies are</h2>
          <p>Cookies are small text files (and similar technologies like local storage) that a site stores on your device to remember information, such as whether you're signed in or which preferences you've chosen.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Strictly necessary</h2>
          <p>These keep you signed in, remember your test progress, and let core parts of the site work. They can't be switched off, since the site wouldn't function correctly without them.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Analytics</h2>
          <p>We use Google Analytics to understand how visitors use ECSPrep — for example, which mock tests are most popular — so we can improve the site. This data is aggregated and doesn't identify you personally.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Advertising</h2>
          <p>We use Google AdSense to show ads. Google and its advertising partners may set cookies to show ads that are relevant to you and to measure how ads perform. If you're in the UK, EEA or Switzerland, we ask for your consent to these before they're set — see the banner shown on your first visit, or use the button below to change your choice at any time. You can also opt out of personalised advertising generally at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a>.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Managing your preferences</h2>
          <p>You can change your cookie choice at any time — this will reset your consent and show the cookie banner again on reload.</p>
          <button
            onClick={reopenBanner}
            className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Manage cookie preferences
          </button>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Contact</h2>
          <p>Questions about our use of cookies? Email <a href="mailto:support@electricianprep.co.uk" className="text-blue-600 hover:underline">support@electricianprep.co.uk</a>.</p>
        </section>
      </div>

      <Link to="/" className="inline-block mt-10 text-blue-600 hover:underline text-sm font-medium">← Back to home</Link>
    </div>
  )
}

export default CookiesPage

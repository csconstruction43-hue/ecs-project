// pages/PrivacyPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import Seo from '../components/Seo'

function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Seo
        title="Privacy Policy | ECSPrep ECS Test Practice Platform"
        description="Read ECSPrep's privacy policy to see how we collect, use and protect your personal data when you use our ECS test practice and mock exam tools."
        path="/privacy"
      />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-blue-50 rounded-xl">
          <Shield size={22} className="text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      </div>
      <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. What we collect</h2>
          <p>When you create an account we store your name, email address, and a securely hashed password (or your Google account ID if you sign in with Google). If you fill in your profile, we also store what you add — phone, location, company, job title, bio, and profile photo.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Test activity</h2>
          <p>We keep a record of your test scores and study activity so your dashboard, streaks, and analytics work. This data stays tied to your account and is never sold.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Payments</h2>
          <p>Card payments are processed by Stripe — we never see or store your full card details. We keep a record of your plan and subscription status so we know what features to unlock.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Who we share data with</h2>
          <p>We share the minimum necessary data with the services that run this app: Stripe (payments), Google (sign-in, if you choose it), our AI provider (only the text of a question when you ask for an AI explanation), and our email provider (account and receipt emails). We don't sell your data to advertisers.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Your rights</h2>
          <p>You can update your profile any time from Settings, download a copy of your account data on request, or permanently delete your account from Settings → Security. Deletion removes your ability to log in and anonymises your stored email.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Cookies & local storage</h2>
          <p>We use browser local storage to keep you signed in and to remember preferences like your chosen language and test progress.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Advertising</h2>
          <p>We use Google AdSense to show ads on this site. Google and its partners may use cookies and similar technologies to serve ads based on your visits to this and other websites, and — where required by law (EEA, UK, Switzerland) — we ask for your consent to this via a cookie consent banner before any personalised ads are shown. You can withdraw or change your consent at any time, and you can also opt out of personalised advertising generally through <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a>. For more on how Google uses data, see <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">How Google uses information from sites that use our services</a>.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Contact</h2>
          <p>Questions about your data? Email <a href="mailto:support@electricianprep.co.uk" className="text-blue-600 hover:underline">support@electricianprep.co.uk</a>.</p>
        </section>
      </div>

      <Link to="/" className="inline-block mt-10 text-blue-600 hover:underline text-sm font-medium">← Back to home</Link>
    </div>
  )
}

export default PrivacyPage

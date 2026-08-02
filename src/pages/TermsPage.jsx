// pages/TermsPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import Seo from '../components/Seo'

function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Seo
        title="Terms of Service | ECSPrep ECS Test Practice Platform"
        description="Read the terms of service for using ECSPrep's ECS test mock exams, courses and study tools, including account rules and acceptable use."
        path="/terms"
      />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-blue-50 rounded-xl">
          <FileText size={22} className="text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
      </div>
      <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Who we are</h2>
          <p>ECSPrep is an independent practice-test platform for people preparing for ECS Health, Safety & Environment tests and ECS card applications. We are not affiliated with, endorsed by, or acting on behalf of ECS or ECS.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Your account</h2>
          <p>You're responsible for keeping your login details secure and for anything that happens under your account. Let us know straight away if you think someone else has access to it.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Practice tests are not the official exam</h2>
          <p>Our mock tests are designed to help you revise. A good score here doesn't guarantee a pass on the real ECS test, and content may differ from the official question bank. Book your official test at citb.co.uk.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Subscriptions & payments</h2>
          <p>Pro plans are billed as described at checkout (weekly, monthly, or a one-time lifetime payment). Subscriptions renew automatically until cancelled. You can manage or cancel your plan at any time from Settings → Billing.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Acceptable use</h2>
          <p>Please don't attempt to scrape, resell, or redistribute our question bank, interfere with the service, or use it in any way that breaks the law.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Changes</h2>
          <p>We may update these terms occasionally. Continuing to use ECSPrep after a change means you accept the updated terms.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Contact</h2>
          <p>Questions about these terms? Reach us at <a href="mailto:support@electricianprep.co.uk" className="text-blue-600 hover:underline">support@electricianprep.co.uk</a>.</p>
        </section>
      </div>

      <Link to="/" className="inline-block mt-10 text-blue-600 hover:underline text-sm font-medium">← Back to home</Link>
    </div>
  )
}

export default TermsPage

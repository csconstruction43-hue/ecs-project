// pages/CardApplicationTrackerPage.jsx
// New feature: lets a candidate who booked an ECS card application (see
// ECSCardBookingPage.jsx -> POST /api/book-card) check its status any time,
// instead of just waiting on an email. Reads GET /api/user/card-application,
// which matches by account first and falls back to the email they applied
// with.
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, CreditCard, CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react'
import Seo from '../components/Seo'
import { apiRequest } from '../lib/api'

const STAGES = [
  { value: 'submitted', label: 'Application submitted', blurb: 'We\u2019ve received your details and documents.' },
  { value: 'documents_verified', label: 'Documents verified', blurb: 'Your ID and photo have been checked and accepted.' },
  { value: 'test_booked', label: 'HS&E test booked', blurb: 'Your Health & Safety assessment slot has been arranged.' },
  { value: 'test_passed', label: 'HS&E test passed', blurb: 'Congratulations — your assessment result has come through.' },
  { value: 'card_ordered', label: 'Card ordered', blurb: 'Your ECS card has been ordered from the scheme.' },
  { value: 'dispatched', label: 'Card dispatched', blurb: 'Your card is on its way to your address.' },
]

function CardApplicationTrackerPage() {
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const { application } = await apiRequest('/api/user/card-application')
        if (!cancelled) setApplication(application)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load your application.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const currentIndex = application ? STAGES.findIndex((s) => s.value === application.stage) : -1
  const isSideStage = application && ['on_hold', 'rejected'].includes(application.stage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <Seo
        title="My ECS Card Application | Track Your Application"
        description="Track the status of your ECS card application from submission through to dispatch."
        path="/my-card-application"
      />
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <CreditCard className="text-primary" /> My ECS Card Application
          </h1>
          <p className="text-gray-600">Track your application from submission through to your card arriving.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center gap-2 text-gray-500 py-16">
            <Loader2 className="animate-spin" size={20} /> Loading your application…
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
        ) : !application ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">We couldn't find an ECS card application linked to your account.</p>
            <Link
              to="/ecscardbooking"
              className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-secondary transition"
            >
              Apply for your ECS card →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-400">Applicant</p>
                <p className="font-semibold text-gray-800">{application.fullName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Card type</p>
                <p className="font-semibold text-gray-800">{application.cardType || '—'}</p>
              </div>
            </div>

            {isSideStage ? (
              <div className={`rounded-xl p-4 flex items-start gap-3 mb-6 ${application.stage === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'}`}>
                {application.stage === 'rejected' ? <XCircle className="mt-0.5 shrink-0" size={20} /> : <AlertTriangle className="mt-0.5 shrink-0" size={20} />}
                <div>
                  <p className="font-semibold">{application.stage === 'rejected' ? 'Application rejected' : 'On hold — action needed'}</p>
                  <p className="text-sm mt-1">Please check your email or contact us for details on what's needed next.</p>
                </div>
              </div>
            ) : (
              <ol className="space-y-0">
                {STAGES.map((s, i) => {
                  const done = i < currentIndex
                  const active = i === currentIndex
                  return (
                    <li key={s.value} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          done ? 'bg-green-500 text-white' : active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {done ? <CheckCircle2 size={16} /> : active ? <Clock size={16} /> : <span className="text-xs font-bold">{i + 1}</span>}
                        </div>
                        {i < STAGES.length - 1 && <div className={`w-0.5 flex-1 min-h-[24px] ${done ? 'bg-green-500' : 'bg-gray-200'}`} />}
                      </div>
                      <div className="pb-6">
                        <p className={`font-semibold ${active ? 'text-primary' : done ? 'text-gray-800' : 'text-gray-400'}`}>{s.label}</p>
                        {(done || active) && <p className="text-sm text-gray-500 mt-0.5">{s.blurb}</p>}
                      </div>
                    </li>
                  )
                })}
              </ol>
            )}

            <div className="border-t border-gray-100 pt-4 mt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">History</p>
              <ul className="space-y-1.5">
                {(application.stageHistory || []).slice().reverse().map((h, i) => (
                  <li key={i} className="text-xs text-gray-500">
                    {new Date(h.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} — {STAGES.find((s) => s.value === h.stage)?.label || h.stage}
                    {h.note ? ` — ${h.note}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardApplicationTrackerPage

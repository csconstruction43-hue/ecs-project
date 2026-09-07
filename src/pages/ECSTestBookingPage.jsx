// pages/ECSTestBookingPage.jsx — "Book your ECS Test" exam slot request form.
// Separate from ECSCardBookingPage.jsx (which is for the physical card
// application). On submit: the candidate's details are emailed to the team,
// who confirm the nearest test centre/date and follow up on payment.
import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ClipboardCheck, User, Mail, Phone, MapPin, Calendar,
  CheckCircle2, ShieldCheck, MessageCircle, Search,
} from 'lucide-react'
import Seo from '../components/Seo'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const TEST_CATEGORIES = [
  'Site Supervisor',
  'Trainee',
  'Apprentice',
  'Labourer (Green Card)',
  'Skilled Worker',
  'Advanced Craft / Skilled Worker',
  'Experienced Worker',
  'Supervisor (Gold Card)',
  'Manager (Black Card)',
  'Experienced Technical/Supervisor/Manager',
  'Academically Qualified Person',
  'Professionally Qualified Person',
  'Industry Placement',
  'Not sure — please advise me',
]

const TEST_FEE = 64
const ASSIST_FEE = 15
const TOTAL_FEE = 79
const money = (n) => `£${n.toFixed(2)}`

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  testCategory: TEST_CATEGORIES[0],
  preferredCentre: '',
  preferredDate: '',
  notes: '',
}

function ECSTestBookingPage() {
  const [searchParams] = useSearchParams()
  const centreFromQuery = searchParams.get('centre') || ''
  const [form, setForm] = useState(() => ({ ...initialForm, preferredCentre: centreFromQuery }))
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [done, setDone] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (!/^[0-9+()\s-]{7,}$/.test(form.phone)) errs.phone = 'Enter a valid mobile number.'
    if (!form.testCategory) errs.testCategory = 'Please select a test category.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/api/book-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      let data = null
      try { data = await res.json() } catch { /* no JSON body */ }
      if (!res.ok) throw new Error(data?.error || 'Something went wrong. Please try again.')
      setDone(true)
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again or contact us.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="text-emerald-600" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Booking request received!</h1>
        <p className="text-slate-500 mb-8">
          Thanks {form.fullName.split(' ')[0] || ''}, we've received your ECS test booking request.
          Our team will confirm your nearest test centre and time slot by email within 24 hours,
          along with how to pay the total of <span className="font-semibold text-emerald-600">{money(TOTAL_FEE)}</span>.
        </p>

        <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 text-left max-w-md mx-auto">
          <p className="text-sm text-emerald-900">
            <span className="font-semibold">🎁 Bonus:</span> while you wait for your confirmed slot,
            you get free access to our full <span className="font-semibold">ECS mock test bank</span>{' '}
            (worth £60) so you can keep practising.
          </p>
        </div>

        <div className="mt-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-green-700 hover:underline text-sm font-medium"
          >
            <MessageCircle size={16} /> Or contact us instead
          </Link>
        </div>
        <div className="mt-6">
          <Link to="/" className="text-slate-400 hover:underline text-sm">← Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Seo title="Book Your ECS Test" description={`Book a slot to sit your ECS Health & Safety test. Total cost ${money(TOTAL_FEE)} (test fee + booking assistance).`} />

      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <ClipboardCheck className="text-emerald-600" size={28} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Book Your ECS Test</h1>
        <p className="text-slate-500 mt-2 max-w-xl mx-auto">
          Tell us your details and preferred area below. We'll confirm your nearest available
          test centre and date, then let you pay the total of {money(TOTAL_FEE)} ({money(TEST_FEE)}{' '}
          test fee + {money(ASSIST_FEE)} booking assistance) to lock in your slot.
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 text-sm flex items-start gap-2 mb-8">
        <ShieldCheck size={18} className="mt-0.5 shrink-0" />
        <span>Your details are sent securely to our team for booking purposes only and are never shared with third parties.</span>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Full name" icon={User} error={errors.fullName}>
            <input value={form.fullName} onChange={update('fullName')} type="text" placeholder="John Smith"
              className={inputClass(errors.fullName)} />
          </Field>

          <Field label="Mobile" icon={Phone} error={errors.phone}>
            <input value={form.phone} onChange={update('phone')} type="tel" placeholder="07123 456789"
              className={inputClass(errors.phone)} />
          </Field>

          <div className="md:col-span-2">
            <Field label="Email" icon={Mail} error={errors.email}>
              <input value={form.email} onChange={update('email')} type="email" placeholder="john@example.com"
                className={inputClass(errors.email)} />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Test category" icon={ClipboardCheck} error={errors.testCategory}>
              <select value={form.testCategory} onChange={update('testCategory')} className={inputClass(errors.testCategory)}>
                {TEST_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Preferred test centre / area" icon={MapPin}>
            <input value={form.preferredCentre} onChange={update('preferredCentre')} type="text" placeholder="e.g. Manchester"
              className={inputClass()} />
            <Link to="/test-centre-finder" className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:underline">
              <Search size={12} /> Not sure? Find your nearest centre
            </Link>
          </Field>

          <Field label="Preferred date (optional)" icon={Calendar}>
            <input value={form.preferredDate} onChange={update('preferredDate')} type="date" className={inputClass()} />
          </Field>

          <div className="md:col-span-2">
            <Field label="Anything else we should know? (optional)" icon={ClipboardCheck}>
              <textarea value={form.notes} onChange={update('notes')} rows={3} placeholder="Any access needs, re-sit info, etc."
                className={inputClass()} />
            </Field>
          </div>
        </div>

        {submitError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg px-4 py-3">{submitError}</div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
        >
          {submitting ? 'Sending...' : `Request My Test Booking`}
        </button>

        <p className="text-center text-sm text-slate-500">
          or{' '}
          <Link to="/contact" className="text-green-700 font-medium hover:underline">
            contact us
          </Link>
        </p>
      </form>
    </div>
  )
}

function inputClass(error) {
  return `w-full px-4 py-2.5 rounded-lg border ${error ? 'border-rose-400' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder:text-slate-400 bg-slate-50 focus:bg-white transition`
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
        {Icon && <Icon size={14} className="text-slate-400" />} {label}
      </span>
      {children}
      {error && <span className="text-xs text-rose-500 mt-1 block">{error}</span>}
    </label>
  )
}

export default ECSTestBookingPage

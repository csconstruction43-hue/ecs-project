// pages/ECSCardBookingPage.jsx — "Book your ECS Card" application form.
// On submit: the applicant's details (and any uploaded files) are emailed to
// the team first, then the browser redirects to the PayPal payment link.
import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  CreditCard, User, Mail, Phone, Calendar, Briefcase, MapPin, Hash,
  CheckCircle2, Send, MessageCircle, ShieldCheck, Upload,
  IdCard, FileCheck2, Image as ImageIcon, RefreshCw,
} from 'lucide-react'
import Seo from '../components/Seo'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Update this to your real WhatsApp business number (with country code, no + or spaces)
const WHATSAPP_NUMBER = '447000000000'

// PayPal payment link the applicant is sent to once their booking details are submitted
const PAYPAL_LINK = 'https://www.paypal.com/ncp/payment/EFUEBGBW2G86N'

const CARD_TYPES = [
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
  'Provisional',
  'Not sure — please advise me',
]

const GENDER_OPTIONS = ['Male', 'Female', 'Other / Prefer not to say']
const APPLICATION_TYPES = ['New ECS Card', 'Renewal', 'Replacement / Upgrade']
const MAX_FILE_MB = 5

// Pricing shown to the applicant before they're sent to PayPal.
const ECS_CARD_FEE = 57
const ASSISTANCE_FEE = 42
const TOTAL_FEE = 99
const money = (n) => `£${n.toFixed(2)}`

const initialForm = {
  // Step 1: Personal Details
  fullName: '',
  dob: '',
  niNumber: '',
  gender: '',
  // Contact info
  streetAddress: '',
  townCity: '',
  postcode: '',
  phone: '',
  email: '',
  confirmEmail: '',
  // Card & employment details
  applicationType: APPLICATION_TYPES[0],
  previousCardNumber: '',
  previousExpiryDate: '',
  cardType: CARD_TYPES[0],
  jobTitle: '',
  employer: '',
  qualification: '',
  hasPassedTest: '',
  notes: '',
}

function ECSCardBookingPage() {
  const [searchParams] = useSearchParams()
  const typeFromUrl = searchParams.get('type') || ''
  const cardOptions = typeFromUrl && !CARD_TYPES.includes(typeFromUrl)
    ? [typeFromUrl, ...CARD_TYPES]
    : CARD_TYPES

  const [form, setForm] = useState({ ...initialForm, cardType: typeFromUrl || CARD_TYPES[0] })
  const [files, setFiles] = useState({ hseProof: null, passportPhoto: null, idProof: null })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [done, setDone] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const updateFile = (field) => (e) => {
    const file = e.target.files?.[0] || null
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (file && file.size > MAX_FILE_MB * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [field]: `File must be under ${MAX_FILE_MB}MB.` }))
      e.target.value = ''
      setFiles((f) => ({ ...f, [field]: null }))
      return
    }
    setFiles((f) => ({ ...f, [field]: file }))
  }

  const isRenewal = form.applicationType === 'Renewal'

  const validate = () => {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.'
    if (!form.dob) errs.dob = 'Date of birth is required.'
    if (!/^[A-Za-z]{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?[A-Za-z]$/.test(form.niNumber.trim())) {
      errs.niNumber = 'Enter a valid National Insurance number (e.g. QQ 12 34 56 C).'
    }
    if (!form.gender) errs.gender = 'Please select a gender option.'

    if (!form.streetAddress.trim()) errs.streetAddress = 'Street address is required.'
    if (!form.townCity.trim()) errs.townCity = 'Town / city is required.'
    if (!form.postcode.trim()) errs.postcode = 'Postcode is required.'
    if (!/^[0-9+()\s-]{7,}$/.test(form.phone)) errs.phone = 'Enter a valid mobile number.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (form.confirmEmail !== form.email) errs.confirmEmail = 'Email addresses do not match.'

    if (isRenewal && !form.previousCardNumber.trim()) {
      errs.previousCardNumber = 'Previous card number is required for a renewal.'
    }
    if (!form.cardType) errs.cardType = 'Please select a card type.'
    if (!form.jobTitle.trim()) errs.jobTitle = 'Occupation / job title is required.'
    if (!form.hasPassedTest) errs.hasPassedTest = 'Please answer this question.'

    if (!files.passportPhoto) errs.passportPhoto = 'Passport size photo is required.'
    if (!files.idProof) errs.idProof = 'Identity proof is required.'
    if (form.hasPassedTest === 'yes' && !files.hseProof) {
      errs.hseProof = 'Please upload proof of your H&S / HS&E pass.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I'd like to book my ECS card.\nName: ${form.fullName}\nCard type: ${form.cardType}\nPhone: ${form.phone}`
  )
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`

  const [stripeLoading, setStripeLoading] = useState(false)
  const [stripeError, setStripeError] = useState('')

  const payWithStripe = async () => {
    setStripeError('')
    setStripeLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/stripe/create-card-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: form.fullName, email: form.email }),
      })
      const data = await res.json()
      if (!res.ok || !data?.url) throw new Error(data?.error || 'Could not start card payment.')
      window.location.href = data.url
    } catch (err) {
      setStripeError(err.message || 'Could not start card payment. Please try PayPal instead.')
      setStripeLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (!validate()) return
    setSubmitting(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([key, val]) => fd.append(key, val ?? ''))
      if (files.hseProof) fd.append('hseProof', files.hseProof)
      if (files.passportPhoto) fd.append('passportPhoto', files.passportPhoto)
      if (files.idProof) fd.append('idProof', files.idProof)

      const res = await fetch(`${API_URL}/api/book-card`, { method: 'POST', body: fd })
      let data = null
      try { data = await res.json() } catch { /* no JSON body */ }
      if (!res.ok) throw new Error(data?.error || 'Something went wrong. Please try again.')

      setDone(true)
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again or message us on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="text-blue-600" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Application received!</h1>
        <p className="text-slate-500 mb-8">
          Thanks {form.fullName.split(' ')[0] || ''}, we've sent your ECS card application to our team.
          Choose how you'd like to pay the total of <span className="font-semibold text-blue-600">{money(TOTAL_FEE)}</span> to complete your booking:
        </p>
        <a
          href={PAYPAL_LINK}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          <CreditCard size={18} /> Pay with PayPal ({money(TOTAL_FEE)})
        </a>

        <div className="mt-3">
          <button
            type="button"
            onClick={payWithStripe}
            disabled={stripeLoading}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <CreditCard size={18} /> {stripeLoading ? 'Redirecting...' : `Pay by Card via Stripe (${money(TOTAL_FEE)})`}
          </button>
        </div>
        {stripeError && <p className="text-rose-500 text-sm mt-2">{stripeError}</p>}

        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 text-left max-w-md mx-auto">
          <p className="text-sm text-emerald-900">
            <span className="font-semibold">🎁 Bonus:</span> your application includes free{' '}
            <span className="font-semibold">Lifetime online ECS H&amp;S mock test access</span>{' '}
            (worth £60). Our team will review your application and set this up on the email
            you provided — you'll get a separate email once it's ready.
          </p>
        </div>
        <div className="mt-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-green-700 hover:underline text-sm font-medium"
          >
            <MessageCircle size={16} /> Or message us on WhatsApp instead
          </a>
        </div>
        <div className="mt-6">
          <Link to="/" className="text-slate-400 hover:underline text-sm">← Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Seo title="Book Your ECS Card" description={`Apply for your ECS card online — new, renewal or replacement. Total cost ${money(TOTAL_FEE)} (application fee + assistance & verification).`} />

      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <CreditCard className="text-blue-600" size={28} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">ECS Card Application</h1>
        <p className="text-slate-500 mt-2 max-w-xl mx-auto">
          Fill in your details below. Once submitted, we'll email your application to our
          team and let you pay the total of {money(TOTAL_FEE)} (ECS application fee + our
          application assistance &amp; document verification fee) via PayPal or by card
          through Stripe — plus you'll get free Lifetime online ECS H&amp;S mock test
          access (worth £60) included.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl px-4 py-3 text-sm flex items-start gap-2 mb-8">
        <ShieldCheck size={18} className="mt-0.5 shrink-0" />
        <span>
          Your details, including your NI number and uploaded documents, are sent securely to
          our team for verification only and are never shared with third parties.
        </span>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-8">

        {/* Step 1: Personal Details */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Step 1: Personal Details</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Full name" icon={User} error={errors.fullName}>
              <input value={form.fullName} onChange={update('fullName')} type="text" placeholder="John Smith"
                className={inputClass(errors.fullName)} />
            </Field>

            <Field label="Date of birth" icon={Calendar} error={errors.dob}>
              <input value={form.dob} onChange={update('dob')} type="date" className={inputClass(errors.dob)} />
            </Field>

            <Field label="National Insurance (NI) number" icon={Hash} error={errors.niNumber}>
              <input value={form.niNumber} onChange={update('niNumber')} type="text" placeholder="QQ 12 34 56 C"
                className={inputClass(errors.niNumber)} />
            </Field>

            <Field label="Gender" icon={User} error={errors.gender}>
              <select value={form.gender} onChange={update('gender')} className={inputClass(errors.gender)}>
                <option value="">Select...</option>
                {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </Field>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Contact Info</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <Field label="Street address" icon={MapPin} error={errors.streetAddress}>
                <input value={form.streetAddress} onChange={update('streetAddress')} type="text" placeholder="12 High Street"
                  className={inputClass(errors.streetAddress)} />
              </Field>
            </div>

            <Field label="Town / city" icon={MapPin} error={errors.townCity}>
              <input value={form.townCity} onChange={update('townCity')} type="text" placeholder="Manchester"
                className={inputClass(errors.townCity)} />
            </Field>

            <Field label="Postcode" icon={MapPin} error={errors.postcode}>
              <input value={form.postcode} onChange={update('postcode')} type="text" placeholder="M1 2AB"
                className={inputClass(errors.postcode)} />
            </Field>

            <Field label="Mobile" icon={Phone} error={errors.phone}>
              <input value={form.phone} onChange={update('phone')} type="tel" placeholder="07123 456789"
                className={inputClass(errors.phone)} />
            </Field>

            <Field label="Email" icon={Mail} error={errors.email}>
              <input value={form.email} onChange={update('email')} type="email" placeholder="you@example.com"
                className={inputClass(errors.email)} />
            </Field>

            <Field label="Confirm email" icon={Mail} error={errors.confirmEmail}>
              <input value={form.confirmEmail} onChange={update('confirmEmail')} type="email" placeholder="you@example.com"
                className={inputClass(errors.confirmEmail)} />
            </Field>
          </div>
        </section>

        {/* Card & Employment Details */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Card &amp; Employment Details</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Application type" icon={RefreshCw} error={errors.applicationType}>
              <select value={form.applicationType} onChange={update('applicationType')} className={inputClass()}>
                {APPLICATION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>

            <Field label="Which ECS card do you need?" icon={ShieldCheck} error={errors.cardType}>
              <select value={form.cardType} onChange={update('cardType')} className={inputClass()}>
                {cardOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            {isRenewal && (
              <>
                <Field label="Current / previous ECS card number" icon={Hash} error={errors.previousCardNumber}>
                  <input value={form.previousCardNumber} onChange={update('previousCardNumber')} type="text" placeholder="e.g. 123456789"
                    className={inputClass(errors.previousCardNumber)} />
                </Field>

                <Field label="Expiry date" icon={Calendar} error={errors.previousExpiryDate}>
                  <input value={form.previousExpiryDate} onChange={update('previousExpiryDate')} type="date"
                    className={inputClass(errors.previousExpiryDate)} />
                </Field>
              </>
            )}

            <Field label="Occupation / job title" icon={Briefcase} error={errors.jobTitle}>
              <input value={form.jobTitle} onChange={update('jobTitle')} type="text" placeholder="e.g. Electrician"
                className={inputClass(errors.jobTitle)} />
            </Field>

            <Field label="Employer name (optional)" icon={Briefcase}>
              <input value={form.employer} onChange={update('employer')} type="text" placeholder="e.g. ABC Construction Ltd"
                className={inputClass()} />
            </Field>

            <Field label="Main qualification / NVQ level (if known)" icon={FileCheck2}>
              <input value={form.qualification} onChange={update('qualification')} type="text" placeholder="e.g. NVQ Level 3"
                className={inputClass()} />
            </Field>

            <Field label="Have you passed an ECS H&S / CITB HS&E test in the last 2 years?" icon={CheckCircle2} error={errors.hasPassedTest}>
              <select value={form.hasPassedTest} onChange={update('hasPassedTest')} className={inputClass(errors.hasPassedTest)}>
                <option value="">Select...</option>
                <option value="yes">Yes (upload proof below)</option>
                <option value="no">No / not sure</option>
              </select>
            </Field>
          </div>
        </section>

        {/* Uploads */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Uploads</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {form.hasPassedTest === 'yes' && (
              <div className="md:col-span-2">
                <FileField label="Upload H&S test proof" icon={FileCheck2} error={errors.hseProof}
                  onChange={updateFile('hseProof')} file={files.hseProof} />
              </div>
            )}

            <FileField label="Upload passport size photo" icon={ImageIcon} error={errors.passportPhoto}
              onChange={updateFile('passportPhoto')} file={files.passportPhoto} accept="image/*" />

            <FileField label="Upload identity proof (passport / driving licence)" icon={IdCard} error={errors.idProof}
              onChange={updateFile('idProof')} file={files.idProof} />
          </div>
        </section>

        <Field label="Anything else we should know? (optional)">
          <textarea value={form.notes} onChange={update('notes')} rows={3} placeholder="Any additional info..."
            className={inputClass() + ' resize-none'} />
        </Field>

        <div className="bg-white border border-slate-200 rounded-xl px-5 py-4">
          <h3 className="text-sm font-bold text-slate-900 mb-3">What our service fee covers</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {[
              'Document verification',
              'Eligibility review',
              'Application assistance',
              'Priority processing',
              'Email support',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={15} className="shrink-0" />
            Free Lifetime online ECS H&amp;S mock test access included (worth £60)
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Payment Summary</h3>
          <div className="space-y-1.5 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>ECS Application Fee</span><span>{money(ECS_CARD_FEE)}</span>
            </div>
            <div className="flex justify-between">
              <span>Application Assistance &amp; Document Verification</span><span>{money(ASSISTANCE_FEE)}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 pt-2 mt-2 border-t border-slate-200">
              <span>Total Payable</span><span>{money(TOTAL_FEE)}</span>
            </div>
          </div>
        </div>

        {submitError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-lg px-4 py-3 text-sm">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold transition"
        >
          <Send size={18} /> {submitting ? 'Submitting...' : 'Submit Application'}
        </button>

        <p className="text-xs text-slate-400 text-center">
          By submitting, you confirm the information provided is accurate and agree to be
          contacted about your ECS card application. You'll then be able to pay the total of
          {' '}{money(TOTAL_FEE)} via secure PayPal or Stripe card checkout.
        </p>
      </form>
    </div>
  )
}

function inputClass(error) {
  return `w-full px-4 py-2.5 rounded-lg border ${error ? 'border-rose-400' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder:text-slate-400 bg-slate-50 focus:bg-white transition`
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

function FileField({ label, icon: Icon, error, onChange, file, accept }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
        {Icon && <Icon size={14} className="text-slate-400" />} {label}
      </span>
      <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${error ? 'border-rose-400' : 'border-slate-200'} bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition`}>
        <Upload size={16} className="text-slate-400 shrink-0" />
        <input type="file" accept={accept} onChange={onChange}
          className="w-full text-sm text-slate-600 file:hidden" />
      </div>
      {file && <span className="text-xs text-emerald-600 mt-1 block">✓ {file.name}</span>}
      {error && <span className="text-xs text-rose-500 mt-1 block">{error}</span>}
      <span className="text-xs text-slate-400 mt-1 block">Max {MAX_FILE_MB}MB — JPG, PNG or PDF.</span>
    </label>
  )
}

export default ECSCardBookingPage

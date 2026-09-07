// pages/ContactPage.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react'
import Seo from '../components/Seo'
import { apiRequest } from '../lib/api'

const TOPICS = [
  'General question',
  'Found an error in a question',
  'Billing / Pro plan',
  'Report a technical issue',
  'Something else',
]

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const openMailClient = () => {
    const subject = encodeURIComponent(`[ECSPrep contact] ${form.topic}`)
    const body = encodeURIComponent(`${form.message}\n\n—\nFrom: ${form.name} (${form.email})`)
    window.location.href = `mailto:support@electricianprep.co.uk?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      // Saves the message so it shows up in Admin > Support Tickets, where
      // it can be replied to directly from the panel.
      await apiRequest('/api/contact', { method: 'POST', body: form, auth: false })
      setSent(true)
    } catch {
      // Backend unreachable or down — fall back to opening the user's own
      // mail client, pre-filled, so the message still gets through.
      openMailClient()
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Seo
        title="Contact Us | ECSPrep ECS Test Practice Platform"
        description="Get in touch with the ECSPrep team — ask a question, report an error in a practice question, or get help with your account or Pro plan."
        path="/contact"
      />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-blue-50 rounded-xl">
          <MessageSquare size={22} className="text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
      </div>
      <p className="text-gray-500 text-sm mb-10">Questions, feedback, or found something wrong? We read every message.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <Mail size={16} className="text-blue-600 mb-2" />
          <p className="text-xs text-gray-500 mb-1">Email</p>
          <a href="mailto:support@electricianprep.co.uk" className="text-sm font-semibold text-gray-900 hover:text-blue-600">support@electricianprep.co.uk</a>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <Clock size={16} className="text-blue-600 mb-2" />
          <p className="text-xs text-gray-500 mb-1">Response time</p>
          <p className="text-sm font-semibold text-gray-900">Within 1–2 business days</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <MapPin size={16} className="text-blue-600 mb-2" />
          <p className="text-xs text-gray-500 mb-1">Based in</p>
          <p className="text-sm font-semibold text-gray-900">London, United Kingdom</p>
        </div>
      </div>

      {sent ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <CheckCircle2 className="mx-auto text-green-600 mb-2" size={28} />
          <p className="font-semibold text-gray-900">Your email app should now be open</p>
          <p className="text-sm text-gray-600 mt-1">If it didn't open, email us directly at support@electricianprep.co.uk.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your name</label>
              <input
                type="text" name="name" required value={form.name} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your email</label>
              <input
                type="email" name="email" required value={form.email} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Topic</label>
            <select
              name="topic" value={form.topic} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
            <textarea
              name="message" required rows={5} value={form.message} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-60"
          >
            <Send size={16} /> {sending ? 'Sending...' : 'Send message'}
          </button>
        </form>
      )}

      <Link to="/" className="inline-block mt-10 text-blue-600 hover:underline text-sm font-medium">← Back to home</Link>
    </div>
  )
}

export default ContactPage

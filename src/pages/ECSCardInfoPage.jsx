// pages/ECSCardInfoPage.jsx — ECS card & test guidance hub (card grid + FAQ + enquiry form)
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck, Zap, Flame, Radio, BarChart3, FileText, ClipboardCheck,
  ChevronDown, Mail, MapPin, Send, CheckCircle2, HardHat,
} from 'lucide-react'
import { occupationalCategories, occupationalCards } from '../data/occupationalCards'
import { apiRequest } from '../lib/api'
import Seo from '../components/Seo'

const categoryIcons = {
  entry: HardHat,
  electrical: Zap,
  fess: Flame,
  network: Radio,
  av: FileText,
  management: BarChart3,
  other: ShieldCheck,
}

const faqs = [
  {
    q: 'What is an ECS card, and why does it matter?',
    a: 'An ECS card is proof that you\u2019ve met the training, qualification and safety-testing standards expected for your role in the UK electrotechnical industry. Most UK construction sites will ask to see a valid card before letting you on site.',
  },
  {
    q: 'Who actually needs one?',
    a: 'Anyone working in an electrotechnical trade on a UK site \u2014 electricians, apprentices, technicians, supervisors, FESS and network/telecoms engineers \u2014 typically needs a card matching their occupation and experience level.',
  },
  {
    q: 'What\u2019s the Health, Safety & Environment (H&S) test?',
    a: 'It\u2019s the core multiple-choice safety assessment that sits behind most ECS card applications. It covers site hazards, safe systems of work and your legal responsibilities \u2014 and it\u2019s exactly what ECSPrep\u2019s mock tests are built to prepare you for.',
  },
  {
    q: 'How long does a card stay valid?',
    a: 'Most ECS cards run on a three-year cycle. Renewal usually means updating your evidence and, depending on the card, sitting the H&S test again.',
  },
  {
    q: 'What documents do I typically need?',
    a: 'It varies by card, but you should expect to provide proof of your qualification, valid photo ID and a current H&S test pass. Always check the exact list for your specific card type before applying.',
  },
  {
    q: 'Where can I sit the test, and how do I prepare?',
    a: 'Tests run at approved centres across the UK. The best preparation is repetition under exam conditions \u2014 that\u2019s the whole idea behind ECSPrep\u2019s timed mock tests, topic practice and AI explanations.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base">{item.q}</span>
        <ChevronDown size={18} className={`shrink-0 text-blue-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
          {item.a}
        </div>
      )}
    </div>
  )
}

export default function ECSCardInfoPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', enquiryType: 'General Information', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    setError('')
    try {
      await apiRequest('/api/contact', { method: 'POST', body: form, auth: false })
      setStatus('sent')
      setForm({ name: '', email: '', enquiryType: 'General Information', message: '' })
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Could not send your enquiry. Please try again.')
    }
  }

  const categoryCounts = occupationalCategories.map((cat) => ({
    ...cat,
    count: occupationalCards.filter((c) => c.category === cat.id).length,
  }))

  return (
    <div className="bg-gray-50 min-h-screen">
      <Seo
        title="ECS Card & Test Guidance | ECSPrep"
        description="Card types, H&S test guidance and mock tests for every UK electrotechnical, FESS, network and AV occupation."
        path="/ecs-card-info"
      />

      {/* Hero */}
      <section className="relative bg-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: 'var(--hazard-stripe)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/15 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full mb-5">
            <ShieldCheck size={13} /> ECS CARD &amp; TEST GUIDANCE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            Every ECS card, sorted.<br className="hidden sm:block" /> Every test, covered.
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            A plain-English guide to ECS card types, the H&amp;S test and what you need to apply \u2014
            with a real mock test linked to every occupation below.
          </p>
        </div>
      </section>

      {/* Category grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by category</h2>
        <p className="text-gray-500 text-sm mb-8">Jump straight to the occupational group that matches your role.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryCounts.map((cat) => {
            const Icon = categoryIcons[cat.id] || ShieldCheck
            return (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all"
              >
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">{cat.desc}</p>
                <span className="text-[11px] font-semibold text-blue-600">{cat.count} card types →</span>
              </a>
            )
          })}
        </div>
      </section>

      {/* Card lists by category */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-14">
        {categoryCounts.map((cat) => {
          const Icon = categoryIcons[cat.id] || ShieldCheck
          const cards = occupationalCards.filter((c) => c.category === cat.id)
          return (
            <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{cat.name}</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cards.map((card) => (
                  <Link
                    key={card.name}
                    to={`/ecs-cards/${card.slug}`}
                    className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <ClipboardCheck size={16} className="text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{card.name}</div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{card.desc}</p>
                      <span className="text-[11px] font-semibold text-blue-600 mt-1 inline-block">View card & practice test →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Frequently asked questions</h2>
          <p className="text-gray-500 text-sm mb-8 text-center">Common questions about ECS cards and the H&amp;S test.</p>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <FaqItem key={i} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact / enquiry */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-secondary rounded-3xl p-6 sm:p-10 text-white">
          <h2 className="text-2xl font-bold mb-1">Still have a question?</h2>
          <p className="text-gray-300 text-sm mb-8">Send us your enquiry and we\u2019ll get back to you by email.</p>

          {status === 'sent' ? (
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
              <CheckCircle2 size={22} className="text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Enquiry sent \u2014 thank you.</p>
                <p className="text-xs text-gray-300 mt-0.5">We\u2019ve emailed you a confirmation and will reply as soon as we can.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Full name</label>
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                  placeholder="Jane Smith"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email address</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} required
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                  placeholder="jane@example.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Enquiry type</label>
                <select
                  name="enquiryType" value={form.enquiryType} onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
                >
                  <option className="text-gray-900">General Information</option>
                  <option className="text-gray-900">Test Requirements</option>
                  <option className="text-gray-900">Card Information</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Your enquiry</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={4}
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 resize-none"
                  placeholder="Tell us what you need help with..."
                />
              </div>
              {status === 'error' && (
                <p className="sm:col-span-2 text-sm text-red-400">{error}</p>
              )}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-secondary font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-60"
                >
                  <Send size={15} /> {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                </button>
              </div>
            </form>
          )}

          <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/10 text-sm text-gray-300">
            <div className="flex items-center gap-2"><Mail size={14} className="text-blue-400" /> support@electricianprep.co.uk</div>
            <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-400" /> United Kingdom</div>
          </div>
        </div>
      </section>
    </div>
  )
}

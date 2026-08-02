// pages/ecs-cards/MaintenanceElectricianPage.jsx — dedicated ECS card page for "Maintenance Electrician"
// Auto-generated per-card page (not shared/dynamic) so this card has its own
// standalone file that can be edited independently of every other card.
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ClipboardCheck, Clock, Banknote, ChevronRight, ChevronDown,
  ArrowRight, Zap, CreditCard, GraduationCap,
} from 'lucide-react'
import Seo, { faqSchema, breadcrumbSchema } from '../../components/Seo'

const CARD = {
  name: `Maintenance Electrician`,
  slug: 'maintenance-electrician',
  desc: `Gold card for electricians focused on planned and reactive maintenance.`,
  path: '/ecs-skilled-worker-test',
  category: 'electrical',
}
const CATEGORY = { id: 'electrical', name: `Electrical Trades`, desc: `Installation, maintenance and specialist electrical occupations.` }
const META = {
  cardName: `Blue / Gold Card (Skilled Worker)`,
  color: 'blue',
  testLabel: `Operatives or Specialist HS&E test`,
  validity: `5 years (1 year on the temporary Experienced Worker route)`,
  cost: `£57`,
}

const CategoryIcon = Zap

const colorDot = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  gold: 'bg-amber-400',
  black: 'bg-gray-900',
}

const steps = [
  { title: 'Confirm your route', desc: 'Check the qualification level and evidence this occupation needs — your category page above lists the general requirement.' },
  { title: 'Pass the HS&E test', desc: 'Sit and pass the Health, Safety & Environment test that applies to this card. Practising with a realistic mock test is the single best way to prepare.' },
  { title: 'Apply for the card', desc: 'Submit your application with proof of qualification, ID and your test pass to receive your card.' },
]

const faqs = [
    { q: `Do I need to sit a test for the Maintenance Electrician card?`, a: `Yes. This route sits behind the Operatives or Specialist HS&E test, the same core HS&E assessment ECSPrep's mock tests are built to prepare you for.` },
    { q: `How long does the Maintenance Electrician card last?`, a: `5 years (1 year on the temporary Experienced Worker route), in line with the Blue / Gold Card (Skilled Worker) it belongs to. Always confirm the current rule for your exact route at ecs.uk.com.` },
    { q: `How much does it cost?`, a: `The card fee is £57. Where the HS&E test is required, there's a separate booking fee at the test centre. Our mock tests are free.` },
    { q: `Is Maintenance Electrician the right card for my role?`, a: `It's one of several routes under Electrical Trades. If you're not sure, browse the other cards in this category below or use the card finder on our ECS Cards page.` },
]

function CardFaq({ item, isOpen, onToggle }) {
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

export default function MaintenanceElectricianPage() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="bg-gray-50 min-h-screen">
      <Seo
        title={`${CARD.name} ECS Card | Requirements, Test & Free Mock Test`}
        description={`Everything you need for the ${CARD.name} ECS card — requirements, validity, cost and a free ${META.testLabel} mock test to help you pass.`}
        path={`/ecs-cards/${CARD.slug}`}
        jsonLd={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'ECS Card & Test Guidance', path: '/ecs-card-info' },
            { name: CARD.name, path: `/ecs-cards/${CARD.slug}` },
          ]),
        ]}
      />

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={12} />
          <Link to="/ecs-card-info" className="hover:text-blue-600">ECS Card &amp; Test Guidance</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800 font-medium">{CARD.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: 'var(--hazard-stripe)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/15 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full mb-5">
            <CategoryIcon size={13} /> {CATEGORY.name}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 max-w-3xl">
            {CARD.name} <span className="text-blue-400">ECS Card</span>
          </h1>
          <p className="text-gray-300 max-w-2xl text-base sm:text-lg leading-relaxed mb-8">
            {CARD.desc}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={CARD.path}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-secondary font-bold px-5 py-3 rounded-xl transition-colors"
            >
              <Zap size={16} /> Start free mock test <ArrowRight size={15} />
            </Link>
            <Link
              to={`/ecscardbooking?type=${encodeURIComponent(CARD.name)}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              <CreditCard size={16} /> Book this card
            </Link>
          </div>
        </div>
      </section>

      {/* Overview stat grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold mb-2">
              <ClipboardCheck size={14} /> TEST REQUIRED
            </div>
            <div className="font-bold text-gray-900 text-sm">{META.testLabel}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold mb-2">
              <Clock size={14} /> VALIDITY
            </div>
            <div className="font-bold text-gray-900 text-sm">{META.validity}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold mb-2">
              <Banknote size={14} /> CARD COST
            </div>
            <div className="font-bold text-gray-900 text-sm">{META.cost}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
          <span className={`w-2.5 h-2.5 rounded-full ${colorDot[META.color] || 'bg-gray-400'}`} />
          Sits under the <span className="font-semibold text-gray-700">{META.cardName}</span> family
        </div>
      </section>

      {/* Who it's for + how to get it */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Who is this card for?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{CARD.desc}</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            It sits within <span className="font-semibold text-gray-800">{CATEGORY.name}</span> —
            {' '}{CATEGORY.desc.toLowerCase()}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to get your {CARD.name} card</h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
                  <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice CTA banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="bg-secondary rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Practise the {META.testLabel} for free</h3>
            <p className="text-gray-300 text-sm max-w-md">Timed mock questions, instant feedback and AI explanations — built to match what you'll see on the day.</p>
          </div>
          <Link
            to={CARD.path}
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-secondary font-bold px-5 py-3 rounded-xl transition-colors shrink-0"
          >
            <GraduationCap size={16} /> Take the mock test
          </Link>
        </div>
      </section>

      {/* Related cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Other cards in Electrical Trades</h2>
        <p className="text-gray-500 text-sm mb-6">Not quite the right fit? These sit in the same occupational group.</p>
        <div className="grid sm:grid-cols-3 gap-4">
            <Link
              to="/ecs-cards/trainee-electrician"
              className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <ClipboardCheck size={16} className="text-blue-500 mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-semibold text-gray-900">Trainee Electrician</div>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">For trainees working towards a full electrician qualification.</p>
              </div>
            </Link>

            <Link
              to="/ecs-cards/provisional-installation-electrician"
              className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <ClipboardCheck size={16} className="text-blue-500 mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-semibold text-gray-900">Provisional Installation Electrician</div>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Provisional card while final evidence for the full installation route is completed.</p>
              </div>
            </Link>

            <Link
              to="/ecs-cards/installation-electrician-gold"
              className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <ClipboardCheck size={16} className="text-blue-500 mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-semibold text-gray-900">Installation Electrician (Gold)</div>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Skilled-worker gold card for fully qualified installation electricians.</p>
              </div>
            </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Frequently asked questions</h2>
          <p className="text-gray-500 text-sm mb-8 text-center">Common questions about the {CARD.name} card.</p>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <CardFaq key={i} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 max-w-2xl mx-auto">
            ECSPrep is not affiliated with ECS or any official scheme. Information is provided
            for general guidance only — always confirm your exact route and current rules at ecs.uk.com before applying.
          </p>
        </div>
      </section>
    </div>
  )
}

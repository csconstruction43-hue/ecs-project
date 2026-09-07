// pages/ExamDayChecklistPage.jsx
// Interactive "what to bring / what to expect" checklist for exam day.
// Ticks persist locally so a candidate can check things off the night
// before and again on the morning of the test. Printable for anyone who'd
// rather stick a paper copy in their bag.
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ClipboardCheck, CheckSquare, Square, Printer, IdCard, Clock, Ban,
  ShieldCheck, MapPin, ArrowRight, AlertTriangle,
} from 'lucide-react'
import Seo from '../components/Seo'

const STORAGE_KEY = 'examDayChecklistTicks'

const CHECKLIST = [
  {
    section: 'Identification (bring one from each list)',
    icon: IdCard,
    items: [
      { id: 'id-photo', label: 'Photo ID — passport, photocard driving licence, or another CSCS/ECS-accepted photo ID', note: 'Your ID must match the name you booked under exactly.' },
      { id: 'id-secondary', label: 'A second form of ID if requested by your training provider (e.g. a card confirming your NVQ/training route)', note: null },
      { id: 'id-booking', label: 'Your booking confirmation (email or reference number)', note: null },
    ],
  },
  {
    section: 'Before you leave',
    icon: Clock,
    items: [
      { id: 'arrive-early', label: 'Plan to arrive at least 15 minutes before your test time', note: 'Late arrivals can be refused entry and lose their test fee.' },
      { id: 'confirm-venue', label: 'Double-check the exact venue address and how you\u2019ll get there', note: null },
      { id: 'phone-off', label: 'Know that phones/smartwatches must be switched off and stored away during the test — not just silenced', note: null },
      { id: 'glasses', label: 'Bring glasses/contact lenses if you need them to read a screen', note: null },
    ],
  },
  {
    section: 'What NOT to bring / do',
    icon: Ban,
    items: [
      { id: 'no-notes', label: 'No notes, books or study material into the test room', note: null },
      { id: 'no-phone-use', label: 'No using your phone once you\u2019re in the test session', note: null },
      { id: 'no-help', label: 'No talking to other candidates during the assessment', note: null },
    ],
  },
  {
    section: 'On the day',
    icon: ShieldCheck,
    items: [
      { id: 'read-instructions', label: 'Read the on-screen instructions carefully before starting — the real test is touch-screen, multiple choice', note: null },
      { id: 'flag-needs', label: 'Tell staff beforehand if you need extra time, a reader, or another reasonable adjustment', note: 'You can usually arrange this in advance when booking — ask your training provider.' },
      { id: 'result-slip', label: 'Keep your result slip/certificate safe — you\u2019ll need it to apply for or renew your card', note: null },
    ],
  },
]

function loadTicks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function ExamDayChecklistPage() {
  const [ticks, setTicks] = useState(loadTicks)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ticks))
    } catch {
      // ignore quota errors
    }
  }, [ticks])

  const totalItems = CHECKLIST.reduce((sum, s) => sum + s.items.length, 0)
  const doneCount = Object.values(ticks).filter(Boolean).length
  const pct = totalItems ? Math.round((doneCount / totalItems) * 100) : 0

  const toggle = (id) => setTicks((t) => ({ ...t, [id]: !t[id] }))
  const resetAll = () => setTicks({})

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 print:bg-white print:py-0">
      <Seo
        title="ECS/CITB Exam Day Checklist | What To Bring"
        description="A free, interactive checklist of exactly what to bring and expect on your ECS Health & Safety test day — ID requirements, arrival time and what's not allowed in the test room."
      />
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6 print:hidden">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
              <ClipboardCheck size={12} /> Exam day tool
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900">Exam Day Checklist</h1>
            <p className="text-gray-500 mt-1 text-sm">Tick things off as you go — it's saved on this device.</p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="shrink-0 flex items-center gap-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50"
          >
            <Printer size={15} /> Print
          </button>
        </div>

        <div className="hidden print:block mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">ECS Exam Day Checklist</h1>
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 print:hidden">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-semibold text-gray-700">{doneCount} of {totalItems} checked</span>
            <span className="text-gray-400">{pct}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="space-y-5">
          {CHECKLIST.map((section) => {
            const SectionIcon = section.icon
            return (
              <div key={section.section} className="bg-white rounded-2xl border border-gray-200 p-5 print:border-0 print:px-0">
                <h2 className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                  <SectionIcon size={16} className="text-primary" /> {section.section}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item) => {
                    const checked = !!ticks[item.id]
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => toggle(item.id)}
                          className="w-full flex items-start gap-3 text-left group print:pointer-events-none"
                        >
                          {checked ? (
                            <CheckSquare size={19} className="text-success shrink-0 mt-0.5" />
                          ) : (
                            <Square size={19} className="text-gray-300 group-hover:text-gray-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className={`text-sm font-medium ${checked ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                              {item.label}
                            </div>
                            {item.note && <div className="text-xs text-gray-400 mt-0.5">{item.note}</div>}
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl p-4 mt-6 print:hidden">
          <AlertTriangle size={15} className="shrink-0 mt-0.5" />
          <p>Exact requirements can vary slightly by training provider and venue — always check your booking confirmation email for anything venue-specific.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 print:hidden">
          <button
            type="button"
            onClick={resetAll}
            className="flex-1 text-center bg-gray-100 text-gray-600 font-semibold px-5 py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
          >
            Reset checklist
          </button>
          <Link
            to="/test-centre-finder"
            className="flex-1 text-center bg-primary text-white font-semibold px-5 py-3 rounded-xl hover:bg-primary-dark transition-colors text-sm flex items-center justify-center gap-2"
          >
            <MapPin size={15} /> Find my test centre <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ExamDayChecklistPage

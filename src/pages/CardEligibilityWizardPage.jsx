// pages/CardEligibilityWizardPage.jsx
// "Which ECS Card Do I Need?" — a GOV.UK-style step-by-step eligibility
// checker. Rather than inventing new rules, this walks the candidate
// through the same category/level logic already encoded in
// data/occupationalCards.js and surfaces one (or a short list of) matching
// card(s) with the real cost/validity/test info from testMeta, plus a
// direct link into the right free mock test.
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HardHat, Zap, Flame, Radio, Mic, BarChart3, FileText, ChevronRight,
  ChevronLeft, CheckCircle2, ArrowRight, RotateCcw, Award, Clock, Banknote,
} from 'lucide-react'
import { occupationalCategories, occupationalCards, testMeta } from '../data/occupationalCards'
import Seo from '../components/Seo'

const categoryIcons = {
  entry: HardHat, electrical: Zap, fess: Flame, network: Radio,
  av: Mic, management: BarChart3, other: FileText,
}

// Level options map to the same 4 underlying HS&E tests every occupational
// card is already keyed to in occupationalCards.js, so filtering by level
// is just filtering by `path`.
const LEVELS = [
  {
    id: '/ecs-green-card-mock-test',
    label: 'New to the industry / labouring',
    desc: 'Little or no NVQ yet — starting out, general site support, or an industry placement.',
  },
  {
    id: '/ecs-skilled-worker-test',
    label: 'Trained / skilled worker',
    desc: 'Achieved (or working towards) a relevant NVQ and doing skilled trade work.',
  },
  {
    id: '/ecs-supervisor-test',
    label: 'Supervisor',
    desc: 'You oversee other operatives\u2019 electrotechnical work on site.',
  },
  {
    id: '/ecs-black-card-mock-test',
    label: 'Manager / senior professional',
    desc: 'Site, contracts or project management, or an academically/professionally qualified route.',
  },
]

function CardEligibilityWizardPage() {
  const [step, setStep] = useState(1)
  const [categoryId, setCategoryId] = useState(null)
  const [levelPath, setLevelPath] = useState(null)
  const [chosenSlug, setChosenSlug] = useState(null)

  const matches = useMemo(() => {
    if (!categoryId || !levelPath) return []
    return occupationalCards.filter((c) => c.category === categoryId && c.path === levelPath)
  }, [categoryId, levelPath])

  const chosenCard = useMemo(
    () => matches.find((c) => c.slug === chosenSlug) || (matches.length === 1 ? matches[0] : null),
    [matches, chosenSlug]
  )

  const meta = chosenCard ? testMeta[chosenCard.path] : null

  const reset = () => {
    setStep(1)
    setCategoryId(null)
    setLevelPath(null)
    setChosenSlug(null)
  }

  const goToStep3 = (path) => {
    setLevelPath(path)
    setChosenSlug(null)
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <Seo
        title="Which ECS Card Do I Need? | Free Eligibility Checker"
        description="Answer 2 quick questions to find out which ECS card matches your trade and experience level, plus the exact HS&E test, cost and validity."
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Award size={12} /> Free eligibility checker
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Which ECS Card Do I Need?</h1>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Answer two quick questions and we'll match you to the right ECS card, the HS&E test it needs, and what it costs.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className={`h-1.5 rounded-full transition-all ${step >= n ? 'bg-primary w-10' : 'bg-gray-200 w-6'}`} />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">1. What kind of work do you do?</h2>
              <p className="text-sm text-gray-500 mb-5">Pick the category closest to your trade or role.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {occupationalCategories.map((cat) => {
                  const Icon = categoryIcons[cat.id] || FileText
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => { setCategoryId(cat.id); setStep(2) }}
                      className="text-left p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors flex items-start gap-3"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{cat.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{cat.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 mb-4">
                <ChevronLeft size={14} /> Back
              </button>
              <h2 className="text-lg font-bold text-gray-900 mb-1">2. What's your experience level?</h2>
              <p className="text-sm text-gray-500 mb-5">This decides which HS&E test your card sits on top of.</p>
              <div className="space-y-3">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => goToStep3(lvl.id)}
                    className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{lvl.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{lvl.desc}</div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <button type="button" onClick={() => setStep(2)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 mb-4">
                <ChevronLeft size={14} /> Back
              </button>

              {matches.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600 font-medium">We couldn't find an exact occupational match for that combination.</p>
                  <p className="text-sm text-gray-500 mt-1">That's fine — the full card list still applies to you.</p>
                  <Link to="/ecs-card-info" className="inline-flex items-center gap-1.5 mt-4 text-primary font-semibold text-sm hover:underline">
                    Browse all ECS cards <ArrowRight size={14} />
                  </Link>
                </div>
              )}

              {matches.length > 1 && !chosenCard && (
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Almost there — which job title fits best?</h2>
                  <p className="text-sm text-gray-500 mb-5">A few specific routes match what you picked. Choose the closest one.</p>
                  <div className="space-y-2">
                    {matches.map((c) => (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => setChosenSlug(c.slug)}
                        className="w-full text-left p-3.5 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{c.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{c.desc}</div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chosenCard && meta && (
                <div>
                  <div className="flex items-center gap-2 text-success text-sm font-semibold mb-3">
                    <CheckCircle2 size={18} /> Your match
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{chosenCard.name}</h2>
                  <p className="text-gray-500 text-sm mb-5">{chosenCard.desc}</p>

                  <div className="grid sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-gray-50 rounded-xl p-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><Award size={13} /> Underlying card</div>
                      <div className="font-semibold text-gray-900 text-sm">{meta.cardName}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><Clock size={13} /> Validity</div>
                      <div className="font-semibold text-gray-900 text-sm">{meta.validity}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><Banknote size={13} /> Test cost</div>
                      <div className="font-semibold text-gray-900 text-sm">{meta.cost}</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={chosenCard.path}
                      className="flex-1 text-center bg-primary text-white font-semibold px-5 py-3 rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                    >
                      Start free {meta.testLabel} <ArrowRight size={16} />
                    </Link>
                    <Link
                      to={`/ecs-cards/${chosenCard.slug}`}
                      className="flex-1 text-center bg-gray-100 text-gray-700 font-semibold px-5 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Full card details
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={reset}
                    className="mt-5 mx-auto flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700"
                  >
                    <RotateCcw size={12} /> Start again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          This is guidance only — always confirm your exact route with ECS or your employer/training provider before booking.
          Not sure at all? <Link to="/ecs-card-info" className="underline hover:text-gray-600">See the full card guide</Link>.
        </p>
      </div>
    </div>
  )
}

export default CardEligibilityWizardPage

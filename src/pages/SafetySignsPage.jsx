// pages/SafetySignsPage.jsx
// Phase 2: Safety Signs module — learn the 5 categories of UK construction
// safety signs, then test yourself with a quiz or drill with flashcards.
// Signs are drawn as simple SVG shapes (not photographed artwork) since the
// shape + colour + symbol combination is exactly what the ECS test asks
// about.
import React, { useMemo, useState } from 'react'
import { Shield, Layers, ListChecks, RotateCw, ChevronLeft, ChevronRight, Shuffle, CheckCircle2, XCircle, RefreshCw, Award } from 'lucide-react'
import { SIGN_CATEGORIES, SAFETY_SIGNS, getSignsByCategory } from '../data/safetySignsData'
import Seo from '../components/Seo'

function shuffleArr(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Draws one sign as an SVG shape matching its category's real-world look.
function SignGraphic({ sign, size = 140 }) {
  const half = size / 2
  const fontSize = size * 0.38

  let shape = null
  if (sign.category === 'prohibition') {
    shape = (
      <>
        <circle cx={half} cy={half} r={half - 6} fill="#fff" stroke="#DC2626" strokeWidth={size * 0.09} />
        <line x1={size * 0.22} y1={size * 0.78} x2={size * 0.78} y2={size * 0.22} stroke="#DC2626" strokeWidth={size * 0.07} strokeLinecap="round" />
      </>
    )
  } else if (sign.category === 'mandatory') {
    shape = <circle cx={half} cy={half} r={half - 4} fill="#2563EB" />
  } else if (sign.category === 'warning') {
    const p = `${half},${size * 0.06} ${size - 6},${size - 8} 6,${size - 8}`
    shape = <polygon points={p} fill="#F59E0B" stroke="#111827" strokeWidth={size * 0.04} strokeLinejoin="round" />
  } else if (sign.category === 'fire') {
    shape = <rect x={4} y={4} width={size - 8} height={size - 8} rx={size * 0.08} fill="#DC2626" />
  } else {
    shape = <rect x={4} y={4} width={size - 8} height={size - 8} rx={size * 0.08} fill="#16A34A" />
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="drop-shadow-sm">
      {shape}
      <text x={half} y={sign.category === 'warning' ? half + size * 0.14 : half + fontSize * 0.35} textAnchor="middle" fontSize={fontSize}>
        {sign.symbol}
      </text>
    </svg>
  )
}

function CategoryLegend() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
      {SIGN_CATEGORIES.map((c) => (
        <div key={c.id} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: c.color }} />
            <span className="font-semibold text-sm text-gray-900 dark:text-slate-100">{c.name}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </div>
  )
}

function FlashcardsMode() {
  const [category, setCategory] = useState('all')
  const [deck, setDeck] = useState(() => shuffleArr(SAFETY_SIGNS))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const filtered = useMemo(() => (category === 'all' ? deck : deck.filter((s) => s.category === category)), [deck, category])
  const card = filtered[index % Math.max(filtered.length, 1)]

  const next = () => { setFlipped(false); setIndex((i) => (i + 1) % Math.max(filtered.length, 1)) }
  const prev = () => { setFlipped(false); setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1)) }
  const reshuffle = () => { setDeck(shuffleArr(SAFETY_SIGNS)); setIndex(0); setFlipped(false) }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-wrap items-center gap-2 mb-6 justify-center">
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setIndex(0); setFlipped(false) }}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 text-sm font-medium"
        >
          <option value="all">All Categories</option>
          {SIGN_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button onClick={reshuffle} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800">
          <Shuffle size={14} /> Shuffle
        </button>
      </div>

      {!card ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-10 text-center text-gray-500 dark:text-slate-400">No signs in this category.</div>
      ) : (
        <>
          <div className={`flip-card w-full h-80 cursor-pointer ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((f) => !f)}>
            <div className="flip-card-inner">
              <div className="flip-card-face flip-card-front bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-8 flex flex-col justify-center items-center text-center gap-4">
                <SignGraphic sign={card} size={140} />
                <div className="text-xs font-semibold text-blue-500 uppercase tracking-wide">{SIGN_CATEGORIES.find((c) => c.id === card.category)?.name}</div>
                <div className="text-xs text-gray-400 flex items-center gap-1"><RotateCw size={12} /> Tap to reveal name &amp; meaning</div>
              </div>
              <div className="flip-card-face flip-card-back bg-blue-600 rounded-2xl shadow-sm p-8 flex flex-col justify-center items-center text-center text-white">
                <div className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-3">Sign Name</div>
                <div className="text-xl font-bold mb-3">{card.name}</div>
                <div className="text-sm text-blue-100">{card.meaning}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <button onClick={prev} className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800">
              <ChevronLeft size={16} /> Prev
            </button>
            <div className="text-sm text-gray-400">{(index % filtered.length) + 1} / {filtered.length}</div>
            <button onClick={next} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function buildQuizQuestions(category) {
  const pool = getSignsByCategory(category)
  return shuffleArr(pool).map((sign) => {
    const distractors = shuffleArr(SAFETY_SIGNS.filter((s) => s.id !== sign.id)).slice(0, 3)
    const options = shuffleArr([sign, ...distractors])
    return { sign, options }
  })
}

function QuizMode() {
  const [category, setCategory] = useState('all')
  const [questions, setQuestions] = useState(() => buildQuizQuestions('all'))
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const restart = (cat = category) => {
    setQuestions(buildQuizQuestions(cat))
    setQIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  const current = questions[qIndex]

  const choose = (optionId) => {
    if (selected) return
    setSelected(optionId)
    if (optionId === current.sign.id) setScore((s) => s + 1)
  }

  const nextQuestion = () => {
    if (qIndex + 1 >= questions.length) { setFinished(true); return }
    setQIndex((i) => i + 1)
    setSelected(null)
  }

  if (!current) return null

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-10 text-center">
        <Award size={40} className="mx-auto text-blue-600 mb-3" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Quiz Complete!</h3>
        <p className="text-gray-500 dark:text-slate-400 mb-4">You scored</p>
        <div className="text-4xl font-black text-blue-600 mb-6">{score} / {questions.length} <span className="text-lg font-semibold text-gray-400">({pct}%)</span></div>
        <button onClick={() => restart()} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
          <RefreshCw size={16} /> Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); restart(e.target.value) }}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 text-sm font-medium"
        >
          <option value="all">All Categories</option>
          {SIGN_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="text-sm font-medium text-gray-500 dark:text-slate-400">Question {qIndex + 1} of {questions.length} · Score {score}</div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 sm:p-8 text-center">
        <div className="flex justify-center mb-5"><SignGraphic sign={current.sign} size={130} /></div>
        <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-5">What does this sign mean?</h3>

        <div className="grid grid-cols-1 gap-2.5 text-left">
          {current.options.map((opt) => {
            const isCorrect = opt.id === current.sign.id
            const isChosen = selected === opt.id
            let cls = 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500'
            if (selected) {
              if (isCorrect) cls = 'border-green-500 bg-green-50 dark:bg-green-900/20'
              else if (isChosen) cls = 'border-red-500 bg-red-50 dark:bg-red-900/20'
            }
            return (
              <button
                key={opt.id}
                onClick={() => choose(opt.id)}
                disabled={!!selected}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 transition text-sm font-medium text-gray-800 dark:text-slate-100 ${cls}`}
              >
                <span>{opt.name}</span>
                {selected && isCorrect && <CheckCircle2 size={18} className="text-green-600 shrink-0" />}
                {selected && isChosen && !isCorrect && <XCircle size={18} className="text-red-600 shrink-0" />}
              </button>
            )
          })}
        </div>

        {selected && (
          <div className="mt-5 text-left">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 text-sm text-blue-900 dark:text-blue-200 mb-4">
              <strong>{current.sign.name}:</strong> {current.sign.meaning}
            </div>
            <button onClick={nextQuestion} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              {qIndex + 1 >= questions.length ? 'See Results' : 'Next Question'} <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SafetySignsPage() {
  const [mode, setMode] = useState('quiz')

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Seo
        title="UK Construction Safety Signs Quiz & Flashcards | ECSPrep"
        description="Learn all 5 categories of UK construction safety signs for the ECS test with an interactive quiz and flashcards covering shape, colour and symbol."
        path="/safety-signs"
      />
      <div className="flex items-center gap-3 mb-2">
        <Shield size={28} className="text-blue-600" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100">Safety Signs</h1>
      </div>
      <p className="text-gray-500 dark:text-slate-400 mb-8 max-w-2xl">
        Learn to recognise the 5 categories of UK construction safety signs by shape and colour, then test yourself with the quiz or drill the full set with flashcards.
      </p>

      <CategoryLegend />

      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 dark:bg-slate-800 rounded-xl p-1">
          <button
            onClick={() => setMode('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${mode === 'quiz' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm' : 'text-gray-500 dark:text-slate-400'}`}
          >
            <ListChecks size={16} /> Quiz
          </button>
          <button
            onClick={() => setMode('flashcards')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${mode === 'flashcards' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm' : 'text-gray-500 dark:text-slate-400'}`}
          >
            <Layers size={16} /> Flashcards
          </button>
        </div>
      </div>

      {mode === 'quiz' ? <QuizMode /> : <FlashcardsMode />}
    </div>
  )
}

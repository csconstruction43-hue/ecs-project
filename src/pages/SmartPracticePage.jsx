// pages/SmartPracticePage.jsx
// New feature: "Smart Practice" — see lib/smartPractice.js for how the
// weak-topic detection and question selection works. This page is the UI:
// an intro screen showing what it found, then a short multiple-choice
// drill through a freshly-built, weighted set of questions.
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Target, CheckCircle2, XCircle, RotateCcw, TrendingUp } from 'lucide-react'
import { getWeakTopics, buildSmartPracticeSet } from '../lib/smartPractice'
import Seo from '../components/Seo'

const SESSION_SIZE = 15

export default function SmartPracticePage() {
  const [weakTopics] = useState(() => getWeakTopics(5))
  const [session, setSession] = useState(null) // { questions } | null
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const startSession = () => {
    const { questions } = buildSmartPracticeSet(SESSION_SIZE)
    setSession({ questions })
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  const current = session?.questions?.[index]

  const handleAnswer = (opt) => {
    if (selected) return
    setSelected(opt)
    if (opt === current.correct) setScore((s) => s + 1)
  }

  const next = () => {
    if (index + 1 >= session.questions.length) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  // ----- Intro screen -----
  if (!session) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Seo title="Smart Practice | Weak Topics Booster" description="Automatically practice the topics you're weakest on with fresh questions." />
        <div className="flex items-center gap-3 mb-2">
          <Target size={26} className="text-teal-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Smart Practice</h1>
        </div>
        <p className="text-gray-500 dark:text-slate-400 mb-6">
          A {SESSION_SIZE}-question session built automatically from the topics you've struggled with most —
          fresh questions, not just your old mistakes repeated (for that, try Wrong Questions Only).
        </p>

        {weakTopics.length === 0 ? (
          <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-2xl p-6 mb-6">
            <p className="text-teal-800 dark:text-teal-300 text-sm">
              We don't have enough test history yet to spot a weak topic — take a mock test or two first,
              then come back and this will target exactly where you need it. For now we'll build a general mix.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 mb-6">
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase mb-3 flex items-center gap-1.5">
              <TrendingUp size={13} /> Your weakest topics
            </p>
            <ul className="space-y-2">
              {weakTopics.map((t) => (
                <li key={t.topic} className="flex items-center justify-between text-sm">
                  <span className="text-gray-800 dark:text-slate-200">{t.topic}</span>
                  <span className="text-red-500 font-semibold text-xs">{t.count} missed</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={startSession}
          className="w-full bg-teal-600 text-white font-semibold py-3 rounded-xl hover:bg-teal-700 transition"
        >
          Start Smart Practice
        </button>
      </div>
    )
  }

  // ----- Results screen -----
  if (finished) {
    const total = session.questions.length
    const pct = Math.round((score / total) * 100)
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <Target size={40} className="mx-auto text-teal-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">Session complete!</h1>
        <p className="text-gray-500 dark:text-slate-400 mb-6">You scored {score} out of {total} ({pct}%).</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={startSession}
            className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-700"
          >
            <RotateCcw size={15} /> Practice again
          </button>
          <Link to="/dashboard" className="px-5 py-2.5 rounded-lg font-semibold border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800">
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  // ----- Question screen -----
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target size={24} className="text-teal-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-slate-100">Smart Practice</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">Question {index + 1} of {session.questions.length} · Score {score}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
        <div className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">{current.topic}</div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">{current.text}</h2>

        <div className="space-y-3">
          {current.options.map((opt, i) => {
            const isCorrect = opt === current.correct
            const isSelected = opt === selected
            let cls = 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
            if (selected) {
              if (isCorrect) cls = 'border-green-400 bg-green-50 dark:bg-green-900/20'
              else if (isSelected) cls = 'border-red-400 bg-red-50 dark:bg-red-900/20'
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={!!selected}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-colors flex items-center justify-between ${cls}`}
              >
                <span className="text-gray-800 dark:text-slate-200">{opt}</span>
                {selected && isCorrect && <CheckCircle2 size={18} className="text-green-500 shrink-0" />}
                {selected && isSelected && !isCorrect && <XCircle size={18} className="text-red-500 shrink-0" />}
              </button>
            )
          })}
        </div>

        {selected && current.explanation && (
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 text-sm text-blue-800 dark:text-blue-300">
            {current.explanation}
          </div>
        )}

        {selected && (
          <button
            onClick={next}
            className="mt-5 w-full bg-teal-600 text-white font-semibold py-2.5 rounded-xl hover:bg-teal-700"
          >
            {index + 1 >= session.questions.length ? 'See results' : 'Next question'}
          </button>
        )}
      </div>
    </div>
  )
}

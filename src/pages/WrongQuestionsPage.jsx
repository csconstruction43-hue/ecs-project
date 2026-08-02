// pages/WrongQuestionsPage.jsx
// Revision Centre → "Wrong Questions Only". Pulls the real bank of
// questions the user has actually gotten wrong across every test they've
// taken (populated by testResults.js), and lets them re-quiz just those.
// Answering correctly removes it from the bank and awards a small
// gamification hook (recordWrongQuestionCleared -> can unlock the
// "Wrong-to-Right" badge).
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw, CheckCircle2, XCircle, PartyPopper } from 'lucide-react'
import { getWrongQuestionsBank, removeFromWrongBank } from '../lib/testResults'
import { recordWrongQuestionCleared } from '../lib/gamification'

export default function WrongQuestionsPage() {
  const [bank, setBank] = useState(getWrongQuestionsBank)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [cleared, setCleared] = useState(0)

  const current = bank[index]

  const options = useMemo(() => {
    if (!current) return []
    // Wrong-answers bank only stores the correct answer (not the original
    // 4 options), so build a light multiple-choice from it: correct answer
    // plus 3 shuffled distractors pulled from other questions in the bank.
    const distractors = bank
      .filter((q) => q.question !== current.question)
      .map((q) => q.correctAnswer)
      .filter((a, i, arr) => a && a !== current.correctAnswer && arr.indexOf(a) === i)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    return [current.correctAnswer, ...distractors].sort(() => Math.random() - 0.5)
  }, [current, bank])

  if (bank.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <PartyPopper size={40} className="mx-auto text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">Nothing to revise!</h1>
        <p className="text-gray-500 dark:text-slate-400 mb-6">
          You haven't gotten any questions wrong yet — or you've already cleared them all. Keep taking mock tests and this list will fill in automatically.
        </p>
        <Link to="/mock-test" className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700">
          Take a mock test
        </Link>
      </div>
    )
  }

  const handleAnswer = (opt) => {
    if (selected) return
    setSelected(opt)
    if (opt === current.correctAnswer) {
      recordWrongQuestionCleared()
      removeFromWrongBank(current.question)
      setCleared((c) => c + 1)
    }
  }

  const next = () => {
    const freshBank = getWrongQuestionsBank()
    setBank(freshBank)
    setSelected(null)
    setIndex((i) => (freshBank.length === 0 ? 0 : i % freshBank.length))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <RotateCcw size={26} className="text-red-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Wrong Questions Only</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">{bank.length} question{bank.length !== 1 ? 's' : ''} left to master{cleared > 0 ? ` · ${cleared} cleared this session` : ''}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
        <div className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {current.topic} · Missed {current.timesWrong}x
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-5">{current.question}</h2>

        <div className="space-y-2.5">
          {options.map((opt, i) => {
            const isCorrectOpt = opt === current.correctAnswer
            const isSelected = selected === opt
            let cls = 'border-gray-200 dark:border-slate-700 hover:border-blue-300'
            if (selected) {
              if (isCorrectOpt) cls = 'border-green-400 bg-green-50 dark:bg-green-900/20'
              else if (isSelected) cls = 'border-red-400 bg-red-50 dark:bg-red-900/20'
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={!!selected}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium text-gray-800 dark:text-slate-200 flex items-center justify-between transition-colors ${cls}`}
              >
                {opt}
                {selected && isCorrectOpt && <CheckCircle2 size={16} className="text-green-500 shrink-0" />}
                {selected && isSelected && !isCorrectOpt && <XCircle size={16} className="text-red-500 shrink-0" />}
              </button>
            )
          })}
        </div>

        {selected && current.explanation && (
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-sm text-blue-800 dark:text-blue-300">
            {current.explanation}
          </div>
        )}

        {selected && (
          <button
            onClick={next}
            className="mt-5 w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700"
          >
            Next Question →
          </button>
        )}
      </div>
    </div>
  )
}

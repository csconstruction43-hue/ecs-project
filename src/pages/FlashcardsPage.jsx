// pages/FlashcardsPage.jsx
import React, { useMemo, useState } from 'react'
import { Layers, Shuffle, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'
import { getAllQuestions, getTopics, shuffle as shuffleArr } from '../lib/questionBank'
import Seo from '../components/Seo'

export default function FlashcardsPage() {
  const allTopics = useMemo(getTopics, [])
  const [topic, setTopic] = useState('all')
  const [deck, setDeck] = useState(() => shuffleArr(getAllQuestions()))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const filtered = useMemo(() => {
    if (topic === 'all') return deck
    return deck.filter((q) => q.topic === topic)
  }, [deck, topic])

  const card = filtered[index % Math.max(filtered.length, 1)]

  const next = () => {
    setFlipped(false)
    setIndex((i) => (i + 1) % Math.max(filtered.length, 1))
  }
  const prev = () => {
    setFlipped(false)
    setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1))
  }
  const reshuffle = () => {
    setDeck(shuffleArr(getAllQuestions()))
    setIndex(0)
    setFlipped(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Seo
        title="ECS Test Flashcards: Flip-Card Revision by Topic"
        description="Revise for the ECS test with flip-style flashcards drawn from real question topics — a fast way to drill facts between longer practice sessions."
        path="/flashcards"
      />
      <div className="flex items-center gap-3 mb-6">
        <Layers size={28} className="text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Flashcards</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">Tap a card to flip. {filtered.length} cards in this deck.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <select
          value={topic}
          onChange={(e) => { setTopic(e.target.value); setIndex(0); setFlipped(false) }}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 text-sm font-medium"
        >
          <option value="all">All Topics</option>
          {allTopics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button
          onClick={reshuffle}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
        >
          <Shuffle size={14} /> Shuffle
        </button>
      </div>

      {!card ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-10 text-center text-gray-500 dark:text-slate-400">
          No cards in this topic yet.
        </div>
      ) : (
        <>
          <div
            className={`flip-card w-full h-72 cursor-pointer ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped((f) => !f)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-face flip-card-front bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-8 flex flex-col justify-center items-center text-center">
                <div className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-3">{card.topic}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-slate-100">{card.text}</div>
                <div className="text-xs text-gray-400 mt-6 flex items-center gap-1"><RotateCw size={12} /> Tap to reveal answer</div>
              </div>
              <div className="flip-card-face flip-card-back bg-blue-600 rounded-2xl shadow-sm p-8 flex flex-col justify-center items-center text-center text-white">
                <div className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-3">Answer</div>
                <div className="text-lg font-bold mb-3">{card.correct}</div>
                {card.explanation && <div className="text-sm text-blue-100">{card.explanation}</div>}
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

// pages/FlashcardsPage.jsx
import React, { useMemo, useState } from 'react'
import { Layers, Shuffle, ChevronLeft, ChevronRight, RotateCw, Star, StickyNote, Clock3 } from 'lucide-react'
import { getAllQuestions, getTopics, shuffle as shuffleArr } from '../lib/questionBank'
import { toggleBookmark, isBookmarked, getNote, setNote, getCardSchedule, reviewCard, countDue } from '../lib/studyTools'
import Seo from '../components/Seo'

export default function FlashcardsPage() {
  const allTopics = useMemo(() => getTopics(), [])
  const allQuestions = useMemo(() => getAllQuestions(), [])
  const [topic, setTopic] = useState('all')
  const [dueOnly, setDueOnly] = useState(false)
  const [deck, setDeck] = useState(() => shuffleArr(allQuestions))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [noteDraft, setNoteDraft] = useState('')
  const [noteOpen, setNoteOpen] = useState(false)
  const [, forceRefresh] = useState(0)

  const dueCount = useMemo(() => countDue(allQuestions.map((q) => q.text)), [allQuestions])

  const filtered = useMemo(() => {
    let list = deck
    if (topic !== 'all') list = list.filter((q) => q.topic === topic)
    if (dueOnly) list = list.filter((q) => getCardSchedule(q.text).dueToday)
    return list
  }, [deck, topic, dueOnly])

  const card = filtered[index % Math.max(filtered.length, 1)]

  const schedule = card ? getCardSchedule(card.text) : null
  const bookmarked = card ? isBookmarked(card.text) : false

  const next = () => {
    setFlipped(false)
    setNoteOpen(false)
    setIndex((i) => (i + 1) % Math.max(filtered.length, 1))
  }
  const prev = () => {
    setFlipped(false)
    setNoteOpen(false)
    setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1))
  }
  const reshuffle = () => {
    setDeck(shuffleArr(allQuestions))
    setIndex(0)
    setFlipped(false)
    setNoteOpen(false)
  }

  const handleGrade = (grade) => {
    if (!card) return
    reviewCard(card.text, grade)
    forceRefresh((n) => n + 1)
    next()
  }

  const handleBookmark = () => {
    if (!card) return
    toggleBookmark({ text: card.text, topic: card.topic, correct: card.correct, explanation: card.explanation, source: 'flashcard' })
    forceRefresh((n) => n + 1)
  }

  const saveNote = () => {
    if (!card) return
    setNote(card.text, noteDraft)
    setNoteOpen(false)
    forceRefresh((n) => n + 1)
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
        <button
          onClick={() => { setDueOnly((v) => !v); setIndex(0); setFlipped(false) }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
            dueOnly
              ? 'bg-amber-500 border-amber-500 text-white'
              : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
          }`}
        >
          <Clock3 size={14} /> Due Today ({dueCount})
        </button>
      </div>

      {!card ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-10 text-center text-gray-500 dark:text-slate-400">
          {dueOnly ? 'Nothing due for review right now — nice work! Try again later or turn off "Due Today".' : 'No cards in this topic yet.'}
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

          {/* Bookmark + Note controls */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                bookmarked
                  ? 'bg-yellow-50 border-yellow-300 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-400'
                  : 'border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              <Star size={13} fill={bookmarked ? 'currentColor' : 'none'} /> {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button
              onClick={() => {
                if (!noteOpen) setNoteDraft(getNote(card.text))
                setNoteOpen((o) => !o)
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              <StickyNote size={13} /> {getNote(card.text) ? 'Edit note' : 'Add note'}
            </button>
            {schedule && !schedule.dueToday && (
              <span className="text-xs text-gray-400 ml-auto">Next review: {schedule.nextReview}</span>
            )}
          </div>

          {noteOpen && (
            <div className="mt-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-3">
              <textarea
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                rows={3}
                placeholder="Write a personal note or memory trick for this question..."
                className="w-full text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-2 text-gray-900 dark:text-slate-100"
              />
              <button
                onClick={saveNote}
                className="mt-2 text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
              >
                Save note
              </button>
            </div>
          )}

          {/* Spaced-repetition grading — only meaningful once the answer is revealed */}
          {flipped && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              <button onClick={() => handleGrade('again')} className="py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/30">
                Again <span className="block text-[10px] font-normal opacity-70">review tomorrow</span>
              </button>
              <button onClick={() => handleGrade('good')} className="py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/30">
                Good <span className="block text-[10px] font-normal opacity-70">standard interval</span>
              </button>
              <button onClick={() => handleGrade('easy')} className="py-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-semibold hover:bg-green-100 dark:hover:bg-green-900/30">
                Easy <span className="block text-[10px] font-normal opacity-70">longer interval</span>
              </button>
            </div>
          )}

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

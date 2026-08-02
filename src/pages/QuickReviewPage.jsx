// pages/QuickReviewPage.jsx
// "Quick Revision" — condensed one-page notes per topic for last-minute
// revision, built from the app's own topic list + question bank (key
// facts extracted from correct answers/explanations already in the data,
// so there's nothing new to maintain).
import React, { useMemo, useState } from 'react'
import { Zap, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { dashboardTopics } from '../data/dashboardTopics'
import { getAllQuestions } from '../lib/questionBank'
import Seo from '../components/Seo'

export default function QuickReviewPage() {
  const [openTopic, setOpenTopic] = useState(null)
  const [search, setSearch] = useState('')
  const allQuestions = useMemo(getAllQuestions, [])

  const notesByTopic = useMemo(() => {
    return dashboardTopics.map((t) => {
      const related = allQuestions
        .filter((q) => q.topic.toLowerCase().includes(t.name.toLowerCase()) || q.text.toLowerCase().includes(t.name.toLowerCase()))
        .slice(0, 6)
      return { ...t, facts: related }
    }).filter((t) => t.facts.length > 0)
  }, [allQuestions])

  const filtered = notesByTopic.filter((t) =>
    !search || t.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Seo
        title="Quick Revision: One-Page ECS Test Notes by Topic"
        description="Last-minute ECS test revision made simple — condensed one-page key facts for every topic, drawn straight from the official question bank."
        path="/quick-review"
      />
      <div className="flex items-center gap-3 mb-2">
        <Zap size={28} className="text-slate-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Quick Revision</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">One-page key facts per topic — perfect for last-minute revision.</p>
        </div>
      </div>

      <div className="relative mt-5 mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a topic (e.g. PPE, Fire, Working at Height)"
          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 text-sm"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((t) => {
          const open = openTopic === t.id
          return (
            <div key={t.id} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenTopic(open ? null : t.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="flex items-center gap-2 font-semibold text-gray-900 dark:text-slate-100">
                  <span>{t.icon}</span> {t.name}
                  <span className="text-xs font-normal text-gray-400">({t.facts.length} key points)</span>
                </span>
                {open ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>
              {open && (
                <div className="px-5 pb-5 space-y-3 border-t border-gray-100 dark:border-slate-700 pt-4">
                  {t.facts.map((f, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-medium text-gray-800 dark:text-slate-200">Q: {f.text}</div>
                      <div className="text-green-600 dark:text-green-400 font-semibold mt-0.5">A: {f.correct}</div>
                      {f.explanation && <div className="text-gray-500 dark:text-slate-400 mt-0.5">{f.explanation}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-12 text-sm">No topics match "{search}".</div>
        )}
      </div>
    </div>
  )
}

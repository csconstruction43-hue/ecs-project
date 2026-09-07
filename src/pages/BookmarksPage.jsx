// pages/BookmarksPage.jsx
// A single hub for every question the user has starred from Flashcards or
// the Wrong Questions Only revision list, plus any personal note attached
// to it. Backed by lib/studyTools.js (localStorage, keyed by question text).
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, StickyNote, Trash2, Layers, RotateCcw, BookmarkX } from 'lucide-react'
import { getBookmarks, removeBookmark, getNote, setNote } from '../lib/studyTools'
import Seo from '../components/Seo'

function sourceLabel(source) {
  if (source === 'flashcard') return { text: 'Flashcard', icon: Layers, cls: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' }
  if (source === 'wrong-question') return { text: 'Wrong Question', icon: RotateCcw, cls: 'text-red-600 bg-red-50 dark:bg-red-900/20' }
  return { text: 'Question', icon: Star, cls: 'text-gray-600 bg-gray-50 dark:bg-slate-800' }
}

function BookmarkCard({ item, onRemove }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(() => getNote(item.text))
  const label = sourceLabel(item.source)
  const Icon = label.icon

  const save = () => {
    setNote(item.text, draft)
    setEditing(false)
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5">
      <div className="flex items-center justify-between mb-2">
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${label.cls}`}>
          <Icon size={11} /> {label.text}
        </span>
        <button
          onClick={() => onRemove(item.text)}
          className="text-gray-300 hover:text-red-500 transition-colors"
          title="Remove bookmark"
        >
          <Trash2 size={15} />
        </button>
      </div>
      <div className="text-xs text-blue-500 uppercase tracking-wide font-semibold mb-1">{item.topic}</div>
      <div className="font-semibold text-gray-900 dark:text-slate-100 text-sm mb-2">{item.text}</div>
      {item.correct && (
        <div className="text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg px-3 py-1.5 mb-2 inline-block">
          Answer: {item.correct}
        </div>
      )}
      {item.explanation && <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">{item.explanation}</p>}

      {editing ? (
        <div className="mt-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            className="w-full text-sm bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-2 text-gray-900 dark:text-slate-100"
            placeholder="Your note..."
          />
          <button onClick={save} className="mt-1.5 text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-blue-600 mt-1"
        >
          <StickyNote size={12} />
          {draft ? draft : 'Add a note'}
        </button>
      )}
    </div>
  )
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState(() => getBookmarks())
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return bookmarks
    return bookmarks.filter((b) => b.source === filter)
  }, [bookmarks, filter])

  const handleRemove = (text) => {
    removeBookmark(text)
    setBookmarks(getBookmarks())
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Seo
        title="My Bookmarks & Notes"
        description="Every question you've starred from Flashcards and Wrong Questions Only, in one place — with your own personal notes attached."
        path="/bookmarks"
      />
      <div className="flex items-center gap-3 mb-6">
        <Star size={28} className="text-yellow-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Bookmarks &amp; Notes</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">{bookmarks.length} saved question{bookmarks.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'flashcard', 'wrong-question'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              filter === f
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
            }`}
          >
            {f === 'all' ? 'All' : f === 'flashcard' ? 'From Flashcards' : 'From Wrong Questions'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-10 text-center">
          <BookmarkX size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 dark:text-slate-400 mb-4">
            No bookmarks yet. Star a question on Flashcards or in Wrong Questions Only to save it here.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/flashcards" className="text-blue-600 font-medium hover:underline text-sm">Go to Flashcards →</Link>
            <Link to="/revision/wrong-questions" className="text-blue-600 font-medium hover:underline text-sm">Go to Wrong Questions →</Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <BookmarkCard key={item.text} item={item} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  )
}

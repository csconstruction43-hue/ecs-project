// pages/CommunityPage.jsx
// Phase 2: basic Community/Forum. Client-side (localStorage) thread board —
// browse by category, start a thread, reply, upvote. See lib/forumStore.js.
import React, { useEffect, useMemo, useState } from 'react'
import { Users, Plus, MessageSquare, ArrowUp, ArrowLeft, Send, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { FORUM_CATEGORIES, getThreads, createThread, addReply, upvoteThread } from '../lib/forumStore'
import Seo from '../components/Seo'

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24); return `${d}d ago`
}

function NewThreadModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('General')

  const submit = () => {
    if (!title.trim() || !body.trim()) return
    onCreate({ title, body, category })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-slate-100">Start a New Thread</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"><X size={18} /></button>
        </div>
        <div className="space-y-3">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 text-sm">
            {FORUM_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Thread title"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 text-sm"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's your question or discussion topic?"
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 text-sm resize-none"
          />
        </div>
        <button
          onClick={submit}
          disabled={!title.trim() || !body.trim()}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={16} /> Post Thread
        </button>
      </div>
    </div>
  )
}

function ThreadDetail({ thread, onBack, onReply, onUpvote, authorName }) {
  const [reply, setReply] = useState('')

  const submitReply = () => {
    if (!reply.trim()) return
    onReply(thread.id, reply)
    setReply('')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 text-sm font-medium">
        <ArrowLeft size={16} /> Back to Community
      </button>

      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 mb-6">
        <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{thread.category}</span>
        <h1 className="text-xl font-bold text-gray-900 dark:text-slate-100 mt-1 mb-3">{thread.title}</h1>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4 whitespace-pre-wrap">{thread.body}</p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{thread.author} · {timeAgo(thread.createdAt)}</span>
          <button onClick={() => onUpvote(thread.id)} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 font-medium">
            <ArrowUp size={14} /> {thread.upvotes || 0}
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-3">{thread.replies.length} {thread.replies.length === 1 ? 'Reply' : 'Replies'}</h3>
      <div className="space-y-3 mb-6">
        {thread.replies.map((r) => (
          <div key={r.id} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4">
            <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed mb-2 whitespace-pre-wrap">{r.body}</p>
            <span className="text-xs text-gray-400">{r.author} · {timeAgo(r.createdAt)}</span>
          </div>
        ))}
        {thread.replies.length === 0 && (
          <div className="text-sm text-gray-400 text-center py-6">No replies yet — be the first to help out.</div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder={`Reply as ${authorName}...`}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 text-sm resize-none mb-3"
        />
        <button
          onClick={submitReply}
          disabled={!reply.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={14} /> Reply
        </button>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  const { user } = useAuth()
  const authorName = user?.name?.split(' ')[0] || 'Guest'
  const [threads, setThreads] = useState([])
  const [category, setCategory] = useState('All')
  const [selectedId, setSelectedId] = useState(null)
  const [showNew, setShowNew] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { setThreads(getThreads()) }, [])

  const filtered = useMemo(
    () => (category === 'All' ? threads : threads.filter((t) => t.category === category)),
    [threads, category]
  )
  const selected = threads.find((t) => t.id === selectedId) || null

  const handleCreate = ({ title, body, category: cat }) => {
    createThread({ title, body, category: cat, author: authorName })
    setThreads(getThreads())
    setShowNew(false)
  }

  const handleReply = (threadId, body) => {
    addReply(threadId, { body, author: authorName })
    setThreads(getThreads())
  }

  const handleUpvote = (threadId) => {
    upvoteThread(threadId)
    setThreads(getThreads())
  }

  if (selected) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <ThreadDetail thread={selected} onBack={() => setSelectedId(null)} onReply={handleReply} onUpvote={handleUpvote} authorName={authorName} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Seo
        title="ECS Test Community Forum: Ask Questions, Get Help"
        description="Join the ECSPrep community forum to ask ECS test questions, share revision tips and compare notes with other candidates preparing for their exam."
        path="/community"
      />
      <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
        <div className="flex items-center gap-3">
          <Users size={28} className="text-blue-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100">Community</h1>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700"
        >
          <Plus size={16} /> New Thread
        </button>
      </div>
      <p className="text-gray-500 dark:text-slate-400 mb-6 max-w-2xl">
        Ask questions, share tips and help other workers get through their ECS test. Posting as <strong>{authorName}</strong>{!user && ' (sign in to use your name)'}.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {['All', ...FORUM_CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition ${
              category === c
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((thread) => (
          <button
            key={thread.id}
            onClick={() => setSelectedId(thread.id)}
            className="w-full text-left bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{thread.category}</span>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mt-1 mb-1 truncate">{thread.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2">{thread.body}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                  <span>{thread.author} · {timeAgo(thread.createdAt)}</span>
                  <span className="flex items-center gap-1"><MessageSquare size={12} /> {thread.replies.length}</span>
                  <span className="flex items-center gap-1"><ArrowUp size={12} /> {thread.upvotes || 0}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 dark:text-slate-500">No threads in this category yet — start one!</div>
        )}
      </div>

      {showNew && <NewThreadModal onClose={() => setShowNew(false)} onCreate={handleCreate} />}
    </div>
  )
}

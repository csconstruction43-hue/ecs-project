// AIAssistant.jsx — floating AI chat for all users
import React, { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, Minimize2, Crown, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../lib/api'

const QUICK = [
  'What is a Method Statement?',
  'What does CDM 2015 cover?',
  'How many questions in the ECS test?',
  'What PPE is required on site?',
]

export default function AIAssistant() {
  const { user, isPro } = useAuth()
  const [open, setOpen] = useState(false)
  const [minimised, setMinimised] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi! I'm your ECS study assistant 👷 Ask me anything about health & safety, ECS card types, or exam tips!${!isPro ? '\n\n💡 Upgrade to Pro for unlimited AI explanations on every question.' : ''}` }
  ])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  useEffect(() => { if (open && !minimised) inputRef.current?.focus() }, [open, minimised])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    const history = [...messages, { role: 'user', content: msg }]
    setMessages(history)
    setLoading(true)
    try {
      const { reply } = await apiRequest('/api/ai/chat', { method: 'POST', body: { messages: history.slice(-10) } })
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I couldn't reach the AI right now. ${err.message || 'Please try again.'}` }])
    } finally { setLoading(false) }
  }

  if (!user) return null

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-6 xl:bottom-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-secondary text-white rounded-2xl shadow-xl shadow-blue-300 flex items-center justify-center hover:scale-105 transition-all duration-200 group"
          aria-label="Open AI Assistant"
        >
          <Bot size={26} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className={`fixed z-50 bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl shadow-gray-300 border border-gray-100 flex flex-col transition-all duration-200 ${minimised ? 'h-14' : 'h-[520px]'}`}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-secondary rounded-t-2xl shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">ECS AI Assistant</p>
              <p className="text-blue-200 text-[10px]">{loading ? 'Thinking…' : 'Online'}</p>
            </div>
            {isPro && <span className="flex items-center gap-0.5 bg-slate-400 text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full"><Crown size={8} /> PRO</span>}
            <button onClick={() => setMinimised(!minimised)} className="text-white/70 hover:text-white transition-colors p-1"><Minimize2 size={14} /></button>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors p-1"><X size={14} /></button>
          </div>

          {!minimised && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role === 'assistant' && (
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 shrink-0 mt-1">
                        <Bot size={12} className="text-blue-600" />
                      </div>
                    )}
                    <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-sm'
                        : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 shrink-0 mt-1">
                      <Bot size={12} className="text-blue-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}} />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick questions */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-1.5">Quick questions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK.map((q, i) => (
                      <button key={i} onClick={() => send(q)} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium text-left">{q}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-gray-100 shrink-0">
                <div className="flex items-end gap-2 bg-gray-50 rounded-xl px-3 py-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                    placeholder="Ask about ECS, H&S, exam tips…"
                    rows={1}
                    className="flex-1 bg-transparent text-sm text-gray-800 resize-none outline-none placeholder-gray-400 max-h-24"
                  />
                  <button
                    onClick={() => send()}
                    disabled={loading || !input.trim()}
                    className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 size={14} className="text-white animate-spin" /> : <Send size={14} className="text-white" />}
                  </button>
                </div>
                {!isPro && (
                  <p className="text-[10px] text-gray-400 text-center mt-1.5">
                    <Crown size={9} className="inline text-slate-500 mr-0.5" />
                    <a href="/plans" className="text-blue-500 hover:underline">Upgrade to Pro</a> for AI question explanations
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

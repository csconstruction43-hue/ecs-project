// components/AIExplainButton.jsx
// Drop this inside any "Explanation Box" on a mock-test result screen.
// - Pro users: instantly see a friendly, pre-written explanation for this
//   question (from the question bank's `explanation` field) plus a "Listen"
//   button that reads it out loud (free, browser TTS). NO backend/API call
//   is made — this costs nothing and never hits a quota, ever.
// - Free users: see a locked teaser that links to /plans.
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRobot, FaVolumeUp, FaStop, FaLock, FaSpinner } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

export default function AIExplainButton({ explanation, topic }) {
  const { isPro, isAuthenticated } = useAuth()
  const [aiText, setAiText] = useState(null)
  const [loading, setLoading] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const handleAsk = () => {
    setLoading(true)
    // Small delay just for a natural "thinking" feel — this is 100% local,
    // no network request, no API cost, no quota limit.
    setTimeout(() => {
      setAiText(
        explanation ||
          `This question is about ${topic || 'this topic'}. Review the correct answer above and the explanation box for the key rule being tested.`
      )
      setLoading(false)
    }, 350)
  }

  const speak = () => {
    if (!aiText || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(aiText)
    utter.rate = 1
    utter.onend = () => setSpeaking(false)
    utter.onerror = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(utter)
  }

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel()
    setSpeaking(false)
  }

  if (!isPro) {
    return (
      <Link
        to="/plans"
        className="mt-3 flex items-center justify-between gap-2 p-3 rounded-xl border border-dashed border-purple-300 bg-purple-50 text-purple-800 hover:bg-purple-100 transition"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <FaLock /> Unlock AI Explanation for this question
        </span>
        <span className="text-xs font-semibold underline">
          {isAuthenticated ? 'Upgrade to Pro →' : 'Sign up →'}
        </span>
      </Link>
    )
  }

  return (
    <div className="mt-3">
      {!aiText && (
        <button
          onClick={handleAsk}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-semibold bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition disabled:opacity-60"
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaRobot />}
          {loading ? 'Asking AI…' : 'Ask AI to Explain'}
        </button>
      )}

      {aiText && (
        <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-xl">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="flex items-center gap-2 text-sm font-semibold text-purple-800">
              <FaRobot /> AI Explanation
            </span>
            <button
              onClick={speaking ? stopSpeaking : speak}
              className="flex items-center gap-1 text-xs font-medium text-purple-700 hover:text-purple-900"
              title={speaking ? 'Stop reading aloud' : 'Read this aloud'}
            >
              {speaking ? <FaStop /> : <FaVolumeUp />} {speaking ? 'Stop' : 'Listen'}
            </button>
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-line">{aiText}</p>
        </div>
      )}
    </div>
  )
}

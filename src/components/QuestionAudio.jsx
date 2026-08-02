// components/QuestionAudio.jsx
// "Audio Assist" — reads the current question aloud in one of 14 languages.
// Translation happens once per question+language via the backend
// (POST /api/translate, cached server-side), then the browser's own
// text-to-speech (free, built-in, no API key) speaks the translated text.
//
// Free users  -> AudioAssistFree  (matches the reference screenshot exactly:
//                a simple card with a "Play in <Language>" button, a
//                language dropdown, and the translation-aid disclaimer).
// Pro users   -> AudioAssistPro   (same core, plus: on-screen translated
//                caption/subtitle, adjustable playback speed, and the
//                chosen language is remembered across every question).
import React, { useEffect, useRef, useState } from 'react'
import { FaVolumeUp, FaSpinner, FaCrown, FaClosedCaptioning } from 'react-icons/fa'
import { translateForAudio } from '../lib/translateApi'

// value = code sent to the backend / cache key
// speech = BCP-47 tag used by the browser's SpeechSynthesis voice picker
export const AUDIO_LANGUAGES = [
  { value: 'en', label: 'English', flag: '🇬🇧', speech: 'en-GB' },
  { value: 'cy', label: 'Welsh', flag: '🏴', speech: 'cy-GB' },
  { value: 'bg', label: 'Bulgarian', flag: '🇧🇬', speech: 'bg-BG' },
  { value: 'cs', label: 'Czech', flag: '🇨🇿', speech: 'cs-CZ' },
  { value: 'fr', label: 'French', flag: '🇫🇷', speech: 'fr-FR' },
  { value: 'de', label: 'German', flag: '🇩🇪', speech: 'de-DE' },
  { value: 'hu', label: 'Hungarian', flag: '🇭🇺', speech: 'hu-HU' },
  { value: 'lt', label: 'Lithuanian', flag: '🇱🇹', speech: 'lt-LT' },
  { value: 'pl', label: 'Polish', flag: '🇵🇱', speech: 'pl-PL' },
  { value: 'pt', label: 'Portuguese', flag: '🇵🇹', speech: 'pt-PT' },
  { value: 'pa', label: 'Punjabi', flag: '🇮🇳', speech: 'pa-IN' },
  { value: 'ro', label: 'Romanian', flag: '🇷🇴', speech: 'ro-RO' },
  { value: 'ru', label: 'Russian', flag: '🇷🇺', speech: 'ru-RU' },
  { value: 'es', label: 'Spanish', flag: '🇪🇸', speech: 'es-ES' },
]

const LAST_LANG_KEY = 'ecsprep_audio_lang'

function pickVoice(speechTag) {
  if (!('speechSynthesis' in window)) return null
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null
  const base = speechTag.split('-')[0]
  return (
    voices.find((v) => v.lang?.toLowerCase() === speechTag.toLowerCase()) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith(base)) ||
    null
  )
}

// Shared engine used by both the free and pro widgets below.
function useAudioAssist(text) {
  const [lang, setLang] = useState(() => localStorage.getItem(LAST_LANG_KEY) || 'en')
  const [status, setStatus] = useState('idle') // idle | translating | speaking | error
  const [caption, setCaption] = useState('')
  const [rate, setRate] = useState(1)
  const cacheRef = useRef(new Map())

  useEffect(() => {
    localStorage.setItem(LAST_LANG_KEY, lang)
  }, [lang])

  useEffect(() => {
    // Stop any audio when the question itself changes underneath us.
    window.speechSynthesis?.cancel()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
    setStatus('idle')
    setCaption('')
    cacheRef.current = new Map()
  }, [text])

  const play = async () => {
    if (!('speechSynthesis' in window)) {
      setStatus('error')
      return
    }
    window.speechSynthesis.cancel()

    const langMeta = AUDIO_LANGUAGES.find((l) => l.value === lang) || AUDIO_LANGUAGES[0]
    const cacheKey = lang
    try {
      let translated = cacheRef.current.get(cacheKey)
      if (!translated) {
        setStatus('translating')
        translated = lang === 'en' ? text : await translateForAudio({ text, lang })
        cacheRef.current.set(cacheKey, translated)
      }
      setCaption(translated)
      const utter = new SpeechSynthesisUtterance(translated)
      utter.lang = langMeta.speech
      utter.rate = rate
      const voice = pickVoice(langMeta.speech)
      if (voice) utter.voice = voice
      utter.onstart = () => setStatus('speaking')
      utter.onend = () => setStatus('idle')
      utter.onerror = () => setStatus('error')
      window.speechSynthesis.speak(utter)
    } catch {
      setStatus('error')
    }
  }

  const stop = () => {
    window.speechSynthesis?.cancel()
    setStatus('idle')
  }

  return { lang, setLang, status, caption, play, stop, rate, setRate }
}

export function AudioAssistFree({ text }) {
  const { lang, setLang, status, play, stop } = useAudioAssist(text)
  const langMeta = AUDIO_LANGUAGES.find((l) => l.value === lang) || AUDIO_LANGUAGES[0]
  const busy = status === 'translating'
  const speaking = status === 'speaking'

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="flex items-center gap-2 text-xs font-bold tracking-wide text-gray-500 uppercase">
          <FaVolumeUp className="text-blue-500" /> Audio Assist
        </span>
        <span className="text-[10px] font-semibold text-gray-400 border border-gray-300 rounded-full px-2 py-0.5">
          Beta
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={speaking ? stop : play}
          disabled={busy}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition disabled:opacity-60"
        >
          {busy ? <FaSpinner className="animate-spin" /> : <FaVolumeUp />}
          {busy ? 'Translating…' : speaking ? 'Stop' : `Play in ${langMeta.label}`}
        </button>

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="text-sm border border-gray-300 rounded-full px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {AUDIO_LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.flag} {l.label}
            </option>
          ))}
        </select>
      </div>

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-500">Couldn't play audio in this language. Try again or pick another language.</p>
      )}

      <p className="mt-3 text-[11px] text-gray-400">
        Audio is a translation aid. The English text remains on-screen as authoritative.
      </p>
    </div>
  )
}

export function AudioAssistPro({ text }) {
  const { lang, setLang, status, caption, play, stop, rate, setRate } = useAudioAssist(text)
  const [showCaption, setShowCaption] = useState(false)
  const langMeta = AUDIO_LANGUAGES.find((l) => l.value === lang) || AUDIO_LANGUAGES[0]
  const busy = status === 'translating'
  const speaking = status === 'speaking'

  return (
    <div className="mb-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="flex items-center gap-2 text-xs font-bold tracking-wide text-blue-700 uppercase">
          <FaVolumeUp className="text-blue-600" /> Audio Assist
        </span>
        <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 border border-blue-300 rounded-full px-2 py-0.5">
          <FaCrown /> Pro · 14 languages
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={speaking ? stop : play}
          disabled={busy}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition disabled:opacity-60 shadow"
        >
          {busy ? <FaSpinner className="animate-spin" /> : <FaVolumeUp />}
          {busy ? 'Translating…' : speaking ? 'Stop' : `Play in ${langMeta.label}`}
        </button>

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="text-sm border border-blue-200 rounded-full px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {AUDIO_LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.flag} {l.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          Speed
          {[0.75, 1, 1.25].map((r) => (
            <button
              key={r}
              onClick={() => setRate(r)}
              className={`px-2 py-1 rounded-full border text-xs font-medium transition ${
                rate === r ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:border-blue-400'
              }`}
            >
              {r}x
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowCaption((v) => !v)}
          className="ml-auto flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:text-blue-900"
        >
          <FaClosedCaptioning /> {showCaption ? 'Hide translation' : 'Show translation'}
        </button>
      </div>

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-500">Couldn't play audio in this language. Try again or pick another language.</p>
      )}

      {showCaption && caption && (
        <div className="mt-3 p-3 bg-white/70 border border-blue-100 rounded-xl text-sm text-gray-700">
          {caption}
        </div>
      )}

      <p className="mt-3 text-[11px] text-gray-400">
        Audio is a translation aid. The English text remains on-screen as authoritative.
      </p>
    </div>
  )
}

// Convenience default export: picks Free or Pro automatically.
export default function QuestionAudio({ text, isPro }) {
  if (!text) return null
  return isPro ? <AudioAssistPro text={text} /> : <AudioAssistFree text={text} />
}

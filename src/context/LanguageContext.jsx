// context/LanguageContext.jsx
// Site-wide language switcher. The 14 languages here match the backend's
// SUPPORTED_AUDIO_LANGUAGES exactly (server/index.js) since both features
// share the same /api/translate* endpoints and cache.
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'cy', name: 'Welsh' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'cs', name: 'Czech' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'es', name: 'Spanish' },
]

const STORAGE_KEY = 'ecsprep_site_language'
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // ignore storage errors
    }
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((code) => {
    if (LANGUAGES.some((l) => l.code === code)) setLanguageState(code)
  }, [])

  const currentLanguage = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages: LANGUAGES, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}

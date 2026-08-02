// context/ThemeContext.jsx
// Site-wide dark mode. Persists to localStorage, respects the OS preference
// on first visit, and toggles a "dark" class on <html> which Tailwind
// (darkMode: 'class') and the global overrides in index.css both key off.
import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'theme'
const READABLE_KEY = 'readableMode'

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    // ignore
  }
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

function getInitialReadableMode() {
  try {
    return localStorage.getItem(READABLE_KEY) === 'true'
  } catch {
    return false
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const [readableMode, setReadableMode] = useState(getInitialReadableMode)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    if (readableMode) root.classList.add('readable-mode')
    else root.classList.remove('readable-mode')
    try {
      localStorage.setItem(READABLE_KEY, String(readableMode))
    } catch {
      // ignore
    }
  }, [readableMode])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  const toggleReadableMode = () => setReadableMode((r) => !r)

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark', readableMode, toggleReadableMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}

// context/ThemeContext.jsx
// Site-wide dark mode. Persists to localStorage, respects the OS preference
// on first visit, and toggles a "dark" class on <html> which Tailwind
// (darkMode: 'class') and the global overrides in index.css both key off.
import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'theme'
const READABLE_KEY = 'readableMode'
const CONTRAST_KEY = 'highContrastMode'
const MOTION_KEY = 'reduceMotionMode'
const FONT_SCALE_KEY = 'a11yFontScale'

// Accessibility toolbar font-size steps (percent of the base 16px root).
export const FONT_SCALE_MIN = 100
export const FONT_SCALE_MAX = 150
export const FONT_SCALE_STEP = 12.5

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

function getInitialBoolSetting(key) {
  try {
    return localStorage.getItem(key) === 'true'
  } catch {
    return false
  }
}

// Defaults to the OS-level "prefers reduced motion" setting on first visit —
// this matters for UK public-sector-adjacent training content, where WCAG
// 2.2 AA (and the Equality Act 2010 duty to make reasonable adjustments)
// expects sites to respect that preference rather than ignore it.
function getInitialReduceMotion() {
  try {
    const saved = localStorage.getItem(MOTION_KEY)
    if (saved === 'true' || saved === 'false') return saved === 'true'
  } catch {
    // ignore
  }
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return true
  }
  return false
}

function getInitialFontScale() {
  try {
    const saved = Number(localStorage.getItem(FONT_SCALE_KEY))
    if (saved >= FONT_SCALE_MIN && saved <= FONT_SCALE_MAX) return saved
  } catch {
    // ignore
  }
  return FONT_SCALE_MIN
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const [readableMode, setReadableMode] = useState(getInitialReadableMode)
  const [highContrast, setHighContrast] = useState(() => getInitialBoolSetting(CONTRAST_KEY))
  const [reduceMotion, setReduceMotion] = useState(getInitialReduceMotion)
  const [fontScale, setFontScale] = useState(getInitialFontScale)

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

  useEffect(() => {
    const root = document.documentElement
    if (highContrast) root.classList.add('high-contrast')
    else root.classList.remove('high-contrast')
    try {
      localStorage.setItem(CONTRAST_KEY, String(highContrast))
    } catch {
      // ignore
    }
  }, [highContrast])

  useEffect(() => {
    const root = document.documentElement
    if (reduceMotion) root.classList.add('reduce-motion')
    else root.classList.remove('reduce-motion')
    try {
      localStorage.setItem(MOTION_KEY, String(reduceMotion))
    } catch {
      // ignore
    }
  }, [reduceMotion])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`
    try {
      localStorage.setItem(FONT_SCALE_KEY, String(fontScale))
    } catch {
      // ignore
    }
  }, [fontScale])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  const toggleReadableMode = () => setReadableMode((r) => !r)
  const toggleHighContrast = () => setHighContrast((c) => !c)
  const toggleReduceMotion = () => setReduceMotion((m) => !m)
  const increaseFontScale = () => setFontScale((s) => Math.min(FONT_SCALE_MAX, s + FONT_SCALE_STEP))
  const decreaseFontScale = () => setFontScale((s) => Math.max(FONT_SCALE_MIN, s - FONT_SCALE_STEP))
  const resetAccessibility = () => {
    setReadableMode(false)
    setHighContrast(false)
    setReduceMotion(false)
    setFontScale(FONT_SCALE_MIN)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isDark: theme === 'dark',
        readableMode,
        toggleReadableMode,
        highContrast,
        toggleHighContrast,
        reduceMotion,
        toggleReduceMotion,
        fontScale,
        increaseFontScale,
        decreaseFontScale,
        resetAccessibility,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}

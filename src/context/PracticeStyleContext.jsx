// context/PracticeStyleContext.jsx
//
// Tracks which "practice style" (see src/lib/practiceStyles.js) the
// learner has picked for taking mock tests, plus a separate zoom level
// for scaling the whole test screen up or down. Both are stored in
// localStorage so they stick across tests and visits; scoped to this
// context only (does not touch the site-wide colour theme in
// ThemeContext.jsx).
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_PRACTICE_STYLE_ID, PRACTICE_STYLES, getPracticeStyleById } from '../lib/practiceStyles'

const STORAGE_KEY = 'ecs_practice_style'
const ZOOM_STORAGE_KEY = 'ecs_practice_zoom'

// Generous but bounded so the UI can't be zoomed into total unusability.
// Step is 10 percentage points per click.
export const ZOOM_MIN = 50
export const ZOOM_MAX = 300
export const ZOOM_STEP = 10
export const ZOOM_DEFAULT = 100

function clampZoom(value) {
  if (Number.isNaN(value)) return ZOOM_DEFAULT
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value))
}

const PracticeStyleContext = createContext(null)

export function PracticeStyleProvider({ children }) {
  const [styleId, setStyleId] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_PRACTICE_STYLE_ID
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved && PRACTICE_STYLES.some((s) => s.id === saved)) return saved
    } catch {
      // localStorage unavailable (private browsing etc) — fall back silently.
    }
    return DEFAULT_PRACTICE_STYLE_ID
  })

  const [zoom, setZoomState] = useState(() => {
    if (typeof window === 'undefined') return ZOOM_DEFAULT
    try {
      const saved = Number(window.localStorage.getItem(ZOOM_STORAGE_KEY))
      if (saved) return clampZoom(saved)
    } catch {
      // localStorage unavailable — fall back silently.
    }
    return ZOOM_DEFAULT
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, styleId)
    } catch {
      // Non-critical — the picker still works for the rest of the session.
    }
  }, [styleId])

  useEffect(() => {
    try {
      window.localStorage.setItem(ZOOM_STORAGE_KEY, String(zoom))
    } catch {
      // Non-critical — zoom controls still work for the rest of the session.
    }
  }, [zoom])

  const setZoom = useCallback(
    (value) => setZoomState((prev) => clampZoom(typeof value === 'function' ? value(prev) : value)),
    []
  )
  const zoomIn = useCallback(() => setZoom((prev) => prev + ZOOM_STEP), [setZoom])
  const zoomOut = useCallback(() => setZoom((prev) => prev - ZOOM_STEP), [setZoom])
  const resetZoom = useCallback(() => setZoom(ZOOM_DEFAULT), [setZoom])

  const value = useMemo(
    () => ({
      styleId,
      setStyleId,
      style: getPracticeStyleById(styleId),
      styles: PRACTICE_STYLES,
      zoom,
      setZoom,
      zoomIn,
      zoomOut,
      resetZoom,
      canZoomIn: zoom < ZOOM_MAX,
      canZoomOut: zoom > ZOOM_MIN,
    }),
    [styleId, zoom, setZoom, zoomIn, zoomOut, resetZoom]
  )

  return <PracticeStyleContext.Provider value={value}>{children}</PracticeStyleContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePracticeStyle() {
  const ctx = useContext(PracticeStyleContext)
  if (!ctx) {
    throw new Error('usePracticeStyle must be used within a PracticeStyleProvider')
  }
  return ctx
}

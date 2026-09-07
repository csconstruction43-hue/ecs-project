// components/AccessibilityToolbar.jsx
// Floating, always-available accessibility controls. UK training providers
// have a duty under the Equality Act 2010 / WCAG 2.2 AA to offer reasonable
// adjustments — text scaling, a high-contrast mode and respecting reduced
// motion. Readable Mode already existed but was buried in Settings (which
// only signed-in users can reach); this puts the full set one tap away for
// every visitor, on every page.
import React, { useEffect, useRef, useState } from 'react'
import { Accessibility, Minus, Plus, Contrast, PauseCircle, BookOpenText, RotateCcw, X } from 'lucide-react'
import { useTheme, FONT_SCALE_MIN, FONT_SCALE_MAX } from '../context/ThemeContext'

function ToggleRow({ icon: Icon, label, active, onClick }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <Icon size={16} className={active ? 'text-primary' : 'text-gray-400'} />
        <span className="text-sm text-gray-700 truncate">{label}</span>
      </div>
      <button
        type="button"
        onClick={onClick}
        role="switch"
        aria-checked={active}
        aria-label={`Toggle ${label}`}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${active ? 'bg-primary' : 'bg-gray-300'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${active ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  )
}

function AccessibilityToolbar() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const {
    readableMode, toggleReadableMode,
    highContrast, toggleHighContrast,
    reduceMotion, toggleReduceMotion,
    fontScale, increaseFontScale, decreaseFontScale,
    resetAccessibility,
  } = useTheme()

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false)
    }
    const handleEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open])

  return (
    <div className="fixed bottom-20 left-4 xl:bottom-5 z-40" ref={panelRef}>
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility settings"
          className="absolute bottom-14 left-0 w-72 max-w-[85vw] bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 animate-fade-in"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <Accessibility size={16} className="text-primary" /> Accessibility
            </h3>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close accessibility panel" className="text-gray-400 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-100">
            <span className="text-sm text-gray-700">Text size</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={decreaseFontScale}
                disabled={fontScale <= FONT_SCALE_MIN}
                aria-label="Decrease text size"
                className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 hover:bg-gray-50"
              >
                <Minus size={13} />
              </button>
              <span className="text-xs text-gray-500 w-10 text-center tabular-nums">{Math.round(fontScale)}%</span>
              <button
                type="button"
                onClick={increaseFontScale}
                disabled={fontScale >= FONT_SCALE_MAX}
                aria-label="Increase text size"
                className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 hover:bg-gray-50"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>

          <ToggleRow icon={BookOpenText} label="Dyslexia-friendly font" active={readableMode} onClick={toggleReadableMode} />
          <ToggleRow icon={Contrast} label="High contrast" active={highContrast} onClick={toggleHighContrast} />
          <ToggleRow icon={PauseCircle} label="Reduce motion" active={reduceMotion} onClick={toggleReduceMotion} />

          <button
            type="button"
            onClick={resetAccessibility}
            className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-800 py-2"
          >
            <RotateCcw size={12} /> Reset to default
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Accessibility settings"
        aria-expanded={open}
        className="w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-105"
      >
        <Accessibility size={22} />
      </button>
    </div>
  )
}

export default AccessibilityToolbar

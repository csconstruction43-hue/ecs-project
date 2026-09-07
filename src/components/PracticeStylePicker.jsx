// components/PracticeStylePicker.jsx
//
// The little palette button + popover shown on mock-test pages, letting
// the learner switch the visual "practice style" for that test (see
// src/lib/practiceStyles.js and PracticeStyleContext.jsx). Self-contained:
// drop <PracticeStylePicker /> anywhere and it reads/writes the shared
// context, so multiple test pages stay in sync automatically.
import React, { useEffect, useRef, useState } from 'react'
import { FaPalette, FaCheck } from 'react-icons/fa'
import { usePracticeStyle } from '../context/PracticeStyleContext'

function StyleSwatch({ colors }) {
  const [a, b] = colors
  return (
    <span
      className="inline-block w-8 h-8 rounded-full border border-black/10 flex-shrink-0"
      style={{
        background: `linear-gradient(135deg, ${a} 0 50%, ${b} 50% 100%)`,
      }}
      aria-hidden="true"
    />
  )
}

export default function PracticeStylePicker({ className = '' }) {
  const { styleId, setStyleId, styles } = usePracticeStyle()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function onClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    function onEscape(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [open])

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Choose your practice style"
        title="Choose your practice style"
        className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-green-600 hover:border-green-300 transition"
      >
        <FaPalette />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose your practice style"
          className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-[380px] max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50"
        >
          <div className="flex items-center gap-2 mb-3 px-1">
            <FaPalette className="text-gray-400" />
            <h3 className="font-semibold text-gray-800">
              Choose your practice style <span className="text-gray-400 font-normal">({styles.length} options)</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {styles.map((s) => {
              const selected = s.id === styleId
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setStyleId(s.id)
                  }}
                  className={`text-left p-3 rounded-xl border-2 transition relative ${
                    selected
                      ? 'border-green-500 bg-green-50/60 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {selected && (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">
                      <FaCheck />
                    </span>
                  )}
                  <StyleSwatch colors={s.swatch} />
                  <div className="mt-2 font-semibold text-sm text-gray-800">{s.name}</div>
                  <div className="mt-0.5 text-xs text-gray-500 leading-snug">{s.description}</div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

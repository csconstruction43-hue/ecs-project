// components/LanguageSwitcher.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Globe, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage, languages, currentLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref} data-no-translate>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors ${
          compact ? 'px-2 py-2' : 'px-3 py-2 text-sm font-medium'
        }`}
        aria-label="Change language"
      >
        <Globe size={16} />
        {!compact && <span>{currentLanguage.name}</span>}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 max-h-80 overflow-y-auto bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLanguage(l.code); setOpen(false) }}
              className="w-full flex items-center justify-between gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <span>{l.name}</span>
              {language === l.code && <Check size={14} className="text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher

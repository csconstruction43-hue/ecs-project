// pages/StudyMaterialPage.jsx
// Phase 2: free Study Material guides hub (PPE, Fire Safety, COSHH, etc.)
// List -> detail pattern, same shape as StudyGuidePage but open to everyone.
import React, { useState } from 'react'
import {
  HardHat, Flame, FlaskConical, PersonStanding, ArrowUpFromLine, Zap, Volume2, Siren,
  BookOpenCheck, ArrowLeft, ChevronRight,
} from 'lucide-react'
import { STUDY_MATERIALS } from '../data/studyMaterialData'
import Seo from '../components/Seo'

const ICONS = { HardHat, Flame, FlaskConical, PersonStanding, ArrowUpFromLine, Zap, Volume2, Siren }

function GuideCard({ guide, onOpen }) {
  const Icon = ICONS[guide.icon] || BookOpenCheck
  return (
    <button
      onClick={() => onOpen(guide)}
      className="text-left bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${guide.color}1a` }}>
        <Icon size={22} style={{ color: guide.color }} />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{guide.title}</h3>
      <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-3">{guide.summary}</p>
      <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
        {guide.points.length} key points <ChevronRight size={14} />
      </div>
    </button>
  )
}

function GuideDetail({ guide, onBack }) {
  const Icon = ICONS[guide.icon] || BookOpenCheck
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 text-sm font-medium">
        <ArrowLeft size={16} /> Back to Study Material
      </button>

      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${guide.color}1a` }}>
          <Icon size={28} style={{ color: guide.color }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{guide.title}</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{guide.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {guide.points.map((pt) => (
          <div key={pt.title} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: guide.color }} />
              {pt.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{pt.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StudyMaterialPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Seo
        title="Free ECS Study Material: PPE, Fire Safety, COSHH & More"
        description="Free ECS study material covering PPE, fire safety, COSHH, manual handling and more — clear revision guides to help you pass the ECS HSE test faster."
        path="/study-material"
      />
      {!selected ? (
        <>
          <div className="flex items-center gap-3 mb-2">
            <BookOpenCheck size={28} className="text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100">Study Material</h1>
          </div>
          <p className="text-gray-500 dark:text-slate-400 mb-8 max-w-2xl">
            Quick-reference guides on the topics that come up most in the ECS test — PPE, fire safety, COSHH and more. Free for everyone, no sign-in required.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STUDY_MATERIALS.map((guide) => (
              <GuideCard key={guide.id} guide={guide} onOpen={setSelected} />
            ))}
          </div>
        </>
      ) : (
        <GuideDetail guide={selected} onBack={() => setSelected(null)} />
      )}
    </div>
  )
}

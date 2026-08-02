// pages/CalculatorsPage.jsx
// Electrician's Calculator Suite — 70+ tools for site, study & pricing use.
// Single-page hub: search + category filter -> grid of calculator cards ->
// live calculator runner with instant results as the user types.
import React, { useMemo, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Calculator, Search, ArrowLeft, Zap, Cable, Activity, ShieldCheck, Lightbulb,
  Sun, ArrowLeftRight, ClipboardCheck, Wallet, Flame, ChevronRight, Info, RotateCcw,
} from 'lucide-react'
import { CALC_CATEGORIES, CALCULATORS } from '../data/calculatorsData'
import Seo from '../components/Seo'

const ICONS = { Zap, Cable, Activity, ShieldCheck, Lightbulb, Sun, ArrowLeftRight, ClipboardCheck, Wallet, Flame }

function CategoryIcon({ name, ...props }) {
  const Cmp = ICONS[name] || Calculator
  return <Cmp {...props} />
}

// ---------------------------------------------------------------- Runner --
function CalculatorRunner({ calc }) {
  const initial = useMemo(() => {
    const o = {}
    calc.inputs.forEach((inp) => { o[inp.key] = String(inp.default ?? '') })
    return o
  }, [calc])
  const [values, setValues] = useState(initial)

  const results = useMemo(() => {
    try { return calc.compute(values) } catch { return [] }
  }, [calc, values])

  const reset = () => setValues(initial)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 dark:text-slate-100 text-sm uppercase tracking-wide">Inputs</h3>
          <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-slate-400 hover:text-primary transition-colors">
            <RotateCcw size={13} /> Reset
          </button>
        </div>
        <div className="space-y-4">
          {calc.inputs.map((inp) => (
            <div key={inp.key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                {inp.label} {inp.unit ? <span className="text-gray-400 dark:text-slate-500">({inp.unit})</span> : null}
              </label>
              {inp.type === 'select' ? (
                <select
                  value={values[inp.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [inp.key]: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  {inp.options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              ) : (
                <input
                  type="number"
                  inputMode="decimal"
                  value={values[inp.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [inp.key]: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              )}
              {inp.hint && <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{inp.hint}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-5 sm:p-6 text-white flex-1">
          <h3 className="font-bold text-xs uppercase tracking-wide text-blue-200 mb-4">Result</h3>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className={`flex items-baseline justify-between ${r.primary ? '' : 'opacity-80'}`}>
                <span className={`text-sm ${r.primary ? 'text-blue-100' : 'text-blue-200'}`}>{r.label}</span>
                <span className={r.primary ? 'text-3xl font-extrabold tracking-tight' : 'text-lg font-semibold'}>
                  {r.value}{r.unit ? <span className="text-base font-medium ml-1 opacity-80">{r.unit}</span> : null}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/15 text-xs text-blue-200 font-mono">{calc.formula}</div>
        </div>

        {calc.note && (
          <div className="flex items-start gap-2.5 bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-xl p-4 text-xs text-slate-600 dark:text-slate-300">
            <Info size={15} className="shrink-0 mt-0.5 text-primary" />
            <span>{calc.note}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ Page --
export default function CalculatorsPage() {
  const { calcId } = useParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('all')

  const activeCalc = calcId ? CALCULATORS.find((c) => c.id === calcId) : null

  const filtered = useMemo(() => {
    let list = CALCULATORS
    if (activeCat !== 'all') list = list.filter((c) => c.category === activeCat)
    const q = query.trim().toLowerCase()
    if (q) list = list.filter((c) => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
    return list
  }, [query, activeCat])

  // ---------------------------------------------------------- Detail view --
  if (activeCalc) {
    const cat = CALC_CATEGORIES.find((c) => c.id === activeCalc.category)
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Seo title={`${activeCalc.name} | Electrician Calculator`} description={activeCalc.desc} />
        <button onClick={() => navigate('/calculators')} className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-primary mb-5 transition-colors">
          <ArrowLeft size={15} /> All Calculators
        </button>

        <div className="flex items-start gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
            <CategoryIcon name={cat?.icon} size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-0.5">{cat?.name}</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-slate-100">{activeCalc.name}</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{activeCalc.desc}</p>
          </div>
        </div>

        <CalculatorRunner calc={activeCalc} />

        {/* Related calculators in same category */}
        <div className="mt-10">
          <h2 className="font-bold text-gray-900 dark:text-slate-100 mb-3 text-sm uppercase tracking-wide">More in {cat?.name}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {CALCULATORS.filter((c) => c.category === activeCalc.category && c.id !== activeCalc.id).slice(0, 4).map((c) => (
              <Link key={c.id} to={`/calculators/${c.id}`} className="flex items-center justify-between bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all group">
                <span className="text-sm font-medium text-gray-800 dark:text-slate-200">{c.name}</span>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ------------------------------------------------------------- Hub view --
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <Seo title="Electrician Calculators — 70+ Free Tools" description="70+ free electrician calculators: Ohm's law, cable sizing, voltage drop, three-phase power, MCB/RCD selection, lighting, solar & EV, testing, business pricing and heating." />

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full mb-4">
          <Calculator size={14} /> {CALCULATORS.length}+ Calculators
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-slate-100 mb-2">Electrician's Calculator Suite</h1>
        <p className="text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">
          Every tool an electrician needs on site or at the desk — Ohm's law, cable sizing, three-phase power, protection, lighting, solar/EV, testing & pricing.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-6">
        <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search calculators… e.g. voltage drop, VAT, lux"
          className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
        />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveCat('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeCat === 'all' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:border-primary/40'}`}
        >
          All ({CALCULATORS.length})
        </button>
        {CALC_CATEGORIES.map((cat) => {
          const count = CALCULATORS.filter((c) => c.category === cat.id).length
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeCat === cat.id ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:border-primary/40'}`}
            >
              <CategoryIcon name={cat.icon} size={13} /> {cat.name} ({count})
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-slate-500">
          <Calculator size={32} className="mx-auto mb-3 opacity-40" />
          <p>No calculators match "{query}"</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((calc) => {
            const cat = CALC_CATEGORIES.find((c) => c.id === calc.category)
            return (
              <Link
                key={calc.id}
                to={`/calculators/${calc.id}`}
                className="group bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-4 sm:p-5 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <CategoryIcon name={cat?.icon} size={16} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-slate-100 leading-snug">{calc.name}</h3>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{cat?.name}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2">{calc.desc}</p>
              </Link>
            )
          })}
        </div>
      )}

      <p className="text-center text-xs text-gray-400 dark:text-slate-500 mt-10 max-w-2xl mx-auto">
        These tools give quick, practical estimates for site use and study. For final circuit design and certification, always verify against the current edition of BS 7671 and manufacturer data.
      </p>
    </div>
  )
}

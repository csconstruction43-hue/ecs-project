import React, { useState } from 'react'
import Seo from '../components/Seo'
import { Link } from 'react-router-dom'
import { FaCheck, FaArrowRight, FaSearch } from 'react-icons/fa'
import { occupationalCards, occupationalCategories } from '../data/occupationalCards'

function CardsPage() {
  const [showFinder, setShowFinder] = useState(false)
  const [finderStep, setFinderStep] = useState(0)
  const [selectedRole, setSelectedRole] = useState(null)
  const [occSearch, setOccSearch] = useState('')
  const [occCategory, setOccCategory] = useState('all')

  // Complete 13 cards data. `path` links each card to whichever mock test
  // actually covers its HS&E exam category — several card types (Trainee,
  // Apprentice, Provisional...) sit the SAME underlying test as another
  // card, so they intentionally share a route rather than 404ing.
  const cards = [
    // Entering the industry
    { id: 1, name: 'Trainee', color: 'red', icon: '🔴', category: 'entering', validity: '3 years', renewable: false, test: 'Operatives HS&E', qualification: 'Registered for a competence-assessed qualification', cost: '£57', path: '/ecs-green-card-mock-test', desc: 'For those registered on a qualification but not yet achieved it.' },
    { id: 2, name: 'Apprentice', color: 'red', icon: '🔴', category: 'entering', validity: '4 years 6 months', renewable: false, test: 'Operatives HS&E', qualification: 'On a recognised apprenticeship', cost: 'Free', path: '/ecs-green-card-mock-test', desc: 'For individuals on a recognised apprenticeship framework.' },
    { id: 3, name: 'Labourer (Green Card)', color: 'green', icon: '🟢', category: 'labouring', validity: '2 yrs first-time → 5 yrs renewal', renewable: true, test: 'Operatives HS&E', qualification: 'Level 1 award in H&S in a Construction Environment', cost: '£57', path: '/ecs-green-card-mock-test', desc: 'Entry-level card for general construction operatives.' },
    { id: 4, name: 'Skilled Worker', color: 'blue', icon: '🔵', category: 'skilled', validity: '5 years', renewable: true, test: 'Operatives HS&E (Specialist for some trades)', qualification: 'NVQ/SVQ Level 2', cost: '£57', path: '/ecs-skilled-worker-test', desc: 'For qualified tradespeople with NVQ Level 2.' },
    { id: 5, name: 'Advanced Craft / Skilled Worker', color: 'gold', icon: '🟡', category: 'skilled', validity: '5 years', renewable: true, test: 'Operatives or Specialist HS&E', qualification: 'NVQ/SVQ Level 3 (advanced craft)', cost: '£57', path: '/ecs-skilled-worker-test', desc: 'For advanced craft workers with NVQ Level 3.' },
    { id: 6, name: 'Experienced Worker', color: 'red', icon: '🔴', category: 'skilled', validity: '1 year', renewable: false, test: 'Operatives or Specialist HS&E', qualification: '1+ year on-site experience, working towards NVQ', cost: '£57', path: '/ecs-skilled-worker-test', desc: 'Temporary card for experienced workers without formal qualifications.' },
    { id: 7, name: 'Supervisor (Gold Card)', color: 'gold', icon: '🟡', category: 'supervisor', validity: '5 years', renewable: true, test: 'Supervisors HS&E', qualification: 'NVQ/SVQ Level 3 (supervisory/technical)', cost: '£57', path: '/ecs-supervisor-test', desc: 'For site supervisors with appropriate qualifications.' },
    { id: 8, name: 'Manager (Black Card)', color: 'black', icon: '⚫', category: 'manager', validity: '5 years', renewable: true, test: 'MAP HS&E', qualification: 'NVQ/SVQ Level 4-7 in construction management', cost: '£57', path: '/ecs-black-card-mock-test', desc: 'For senior managers and directors.' },
    { id: 9, name: 'Experienced Technical/Supervisor/Manager', color: 'red', icon: '🔴', category: 'manager', validity: '3 years', renewable: false, test: 'Supervisors or MAP HS&E', qualification: 'Experience-based, working towards an NVQ', cost: '£57', path: '/ecs-supervisor-test', desc: 'Temporary card for experienced supervisors/managers.' },
    { id: 10, name: 'Academically Qualified Person', color: 'white', icon: '⬜', category: 'qualified', validity: '5 years', renewable: true, test: 'MAP or CIC HS&E', qualification: 'Construction-related degree, HND, HNC, CIOB Certificate', cost: '£57', path: '/ecs-black-card-mock-test', desc: 'For degree-qualified professionals.' },
    { id: 11, name: 'Professionally Qualified Person', color: 'white', icon: '⬜', category: 'qualified', validity: '5 years', renewable: false, test: 'MAP or CIC HS&E', qualification: 'Member of a ECS-approved professional body', cost: '£57', path: '/ecs-black-card-mock-test', desc: 'For chartered professionals and members.' },
    { id: 12, name: 'Industry Placement', color: 'red', icon: '🔴', category: 'qualified', validity: '3 years', renewable: false, test: 'Operatives HS&E', qualification: 'On a 30+ day construction work placement', cost: '£57', path: '/ecs-green-card-mock-test', desc: 'For students on long-term work placements.' },
    { id: 13, name: 'Provisional', color: 'red', icon: '🔴', category: 'qualified', validity: '6 months', renewable: false, test: 'Operatives HS&E', qualification: 'Probationary, first-time applicants only', cost: '£57', path: '/ecs-green-card-mock-test', desc: 'For first-time applicants on probation.' },
  ]

  const categories = [
    { id: 'entering', name: 'Entering the industry', icon: '🎓', desc: 'These are the starting points for anyone new to construction. They get you on site legally while you train towards a permanent, skilled card.' },
    { id: 'labouring', name: 'Labouring roles', icon: '👷', desc: 'For general operatives whose work does not yet require a recognised trade qualification, the most common entry card on UK sites.' },
    { id: 'skilled', name: 'Skilled Workers', icon: '🔧', desc: 'For qualified tradespeople. The colour and route depend on your NVQ/SVQ level, with a temporary option for those still working towards a qualification.' },
    { id: 'supervisor', name: 'Supervisors and Managers', icon: '📊', desc: 'For staff who direct work rather than carry it out. Higher-level qualifications and the Supervisors or MAP test apply.' },
    { id: 'qualified', name: 'Academically and Professionally Qualified', icon: '🎓', desc: 'For degree-qualified and chartered professionals, plus temporary cards for placements and probationary periods.' },
  ]

  const faqs = [
    { q: "How many types of ECS card are there?", a: "This directory covers the 13 ECS cards for people working in construction, spanning six colours: green, red, blue, gold, black and white. A separate Yellow Visitor card also exists for people visiting a site who are not carrying out construction work." },
    { q: "Which ECS card do I need?", a: "It depends on your role and your highest qualification. Labourers with a Level 1 award need the Green Card; tradespeople with an NVQ Level 2 need the Blue Card; supervisors with an NVQ Level 3 need the Gold Card; managers with an NVQ Level 4-7 need the Black Card; degree-qualified and chartered professionals need a White Card." },
    { q: "How long is each ECS card valid?", a: "It varies by card. The first-time Green Labourer Card lasts 2 years (then 5 years on renewal since 1 February 2025); Blue, Gold, Black and White cards last 5 years; the Trainee, Experienced Technical/Supervisor/Manager and Industry Placement Cards last 3 years; the Experienced Worker Card lasts 1 year; and the Provisional Card lasts 6 months." },
    { q: "Which ECS cards cannot be renewed?", a: "The red cards, Trainee, Apprentice, Experienced Worker, Experienced Technical/Supervisor/Manager, Industry Placement and Provisional, are temporary and cannot be renewed. They are stepping-stone cards." },
    { q: "Do all ECS cards require the ECS test?", a: "Most do. The ECS Health, Safety and Environment test is required for the great majority of routes. Confirm the exact requirement for your route at ecs.uk.com." },
    { q: "How much does a ECS card cost?", a: "The ECS card fee is £57, the same across the colours, with the Apprentice card issued free of charge. Where a ECS test is required, a separate booking fee applies on top. Our mock tests are free." },
    { q: "How do I move up from one ECS card to the next?", a: "Complete the qualification for the next tier, pass the relevant ECS test, and apply for the new card. The typical career path runs Trainee → Labourer → Skilled Worker → Supervisor → Manager." },
  ]

  const [openFaq, setOpenFaq] = useState(null)

  const filteredOccupational = occupationalCards.filter((card) => {
    const matchesCategory = occCategory === 'all' || card.category === occCategory
    const matchesSearch = occSearch.trim() === '' || card.name.toLowerCase().includes(occSearch.trim().toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getColorClass = (color) => {
    switch(color) {
      case 'green': return 'bg-green-100 text-green-700 border-green-300'
      case 'blue': return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'gold': return 'bg-slate-100 text-slate-700 border-slate-300'
      case 'black': return 'bg-gray-800 text-white border-gray-700'
      case 'white': return 'bg-gray-100 text-gray-700 border-gray-300'
      case 'red': return 'bg-red-100 text-red-700 border-red-300'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getColorBg = (color) => {
    switch(color) {
      case 'green': return 'bg-green-600'
      case 'blue': return 'bg-blue-600'
      case 'gold': return 'bg-slate-500'
      case 'black': return 'bg-gray-800'
      case 'white': return 'bg-gray-400'
      case 'red': return 'bg-red-600'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo title="Types of ECS Cards Explained 2026 | Which Card Do You Need?" description="A complete guide to every ECS card type — Green, Black, Gold, Skilled Worker, Supervisor, Manager — and which one you need for your role." path="/types-of-ecs-cards" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mb-4">
            <FaCheck className="text-green-600" /> Free ECS mock test for every card type
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Every ECS Card Type Explained: <span className="text-green-600">All 13 Cards in 2026</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            From the first day on site to senior management, see every ECS card, what it's for, 
            how long it lasts and which test you need — plus 48+ specific occupational routes 
            further down the page. Then practise free.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">✓ Free ECS mock test</span>
            <span className="flex items-center gap-1">✓ All 11 ECS topics</span>
            <span className="flex items-center gap-1">✓ AI explanations on every question</span>
          </div>
        </div>
      </section>

      {/* Card Finder */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><FaSearch className="text-green-600" /> Find your ECS card</h2>
            <p className="text-gray-500 text-sm mb-4">Answer up to three quick questions, no data stored.</p>
            
            {!showFinder ? (
              <button onClick={() => setShowFinder(true)} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                <FaSearch /> Start Card Finder
              </button>
            ) : (
              <div>
                {finderStep === 0 && (
                  <div>
                    <p className="font-semibold mb-3">What best describes you right now?</p>
                    <div className="space-y-2">
                      <button onClick={() => { setSelectedRole('new'); setFinderStep(1) }} className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition">🆕 New to construction, no qualifications yet</button>
                      <button onClick={() => { setSelectedRole('apprentice'); setFinderStep(1) }} className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition">📘 I'm on a recognised apprenticeship</button>
                      <button onClick={() => { setSelectedRole('nvg'); setFinderStep(1) }} className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition">📚 I'm registered/working towards an NVQ or SVQ</button>
                      <button onClick={() => { setSelectedRole('qualified'); setFinderStep(1) }} className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition">✅ I'm a qualified tradesperson</button>
                      <button onClick={() => { setSelectedRole('supervisor'); setFinderStep(1) }} className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition">👔 I'm a supervisor</button>
                      <button onClick={() => { setSelectedRole('manager'); setFinderStep(1) }} className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition">💼 I'm a manager</button>
                      <button onClick={() => { setSelectedRole('degree'); setFinderStep(1) }} className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition">🎓 I'm a degree-qualified or chartered professional</button>
                    </div>
                  </div>
                )}
                {finderStep === 1 && (
                  <div>
                    <p className="font-semibold mb-3">Based on your answer, here's your recommended card:</p>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      {selectedRole === 'new' && <p className="text-green-800">🎯 Recommended: <strong>Green Card (Labourer)</strong> - Entry level card for general operatives</p>}
                      {selectedRole === 'apprentice' && <p className="text-green-800">🎯 Recommended: <strong>Apprentice Card (Red)</strong> - For registered apprentices</p>}
                      {selectedRole === 'nvg' && <p className="text-green-800">🎯 Recommended: <strong>Trainee Card (Red)</strong> - For those working towards qualifications</p>}
                      {selectedRole === 'qualified' && <p className="text-green-800">🎯 Recommended: <strong>Skilled Worker Card (Blue)</strong> - For qualified tradespeople</p>}
                      {selectedRole === 'supervisor' && <p className="text-green-800">🎯 Recommended: <strong>Supervisory Card (Gold)</strong> - For site supervisors</p>}
                      {selectedRole === 'manager' && <p className="text-green-800">🎯 Recommended: <strong>Manager Card (Black)</strong> - For senior managers</p>}
                      {selectedRole === 'degree' && <p className="text-green-800">🎯 Recommended: <strong>Academically Qualified Person Card (White)</strong> - For degree holders</p>}
                      <Link to="/mock-test" className="inline-block mt-3 text-green-700 font-semibold text-sm">Take the mock test for this card →</Link>
                    </div>
                    <button onClick={() => { setShowFinder(false); setFinderStep(0); setSelectedRole(null) }} className="mt-3 text-gray-500 text-sm hover:text-gray-700">Restart</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* All Cards by Category */}
      <section className="py-10" id="all-cards">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-3">The 13 ECS card types</h2>
          <p className="text-gray-600 mb-8">
            The Electrotechnical Certification Scheme (ECS) issues 13 different cards for people working in construction, 
            grouped into five categories by role and qualification. Each card proves a level of health-and-safety awareness 
            and competence that lets you onto UK sites; most principal contractors require one before granting access.
          </p>

          {categories.map((category) => (
            <div key={category.id} className="mb-12">
              <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
              <p className="text-gray-500 mb-5">{category.desc}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.filter(c => c.category === category.id).map((card) => (
                  <Link to={`/ecscardbooking?type=${encodeURIComponent(card.name)}`} key={card.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
                    <div className={`h-1.5 ${getColorBg(card.color)}`} />
                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="text-4xl">{card.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                            <h3 className="text-lg font-bold group-hover:text-blue-600 transition">{card.name}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${getColorClass(card.color)}`}>{card.color.toUpperCase()}</span>
                          </div>
                          <p className="text-gray-500 text-xs mb-2">{card.desc}</p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                            <div><span className="text-gray-400">Validity:</span> <span className="font-medium">{card.validity}</span></div>
                            <div><span className="text-gray-400">Renewable:</span> <span className="font-medium">{card.renewable ? 'Yes' : 'No'}</span></div>
                            <div><span className="text-gray-400">Test:</span> <span className="text-xs">{card.test.split(' ').slice(0, 2).join(' ')}...</span></div>
                            <div><span className="text-gray-400">Cost:</span> <span className="font-medium">{card.cost}</span></div>
                          </div>
                          <span className="inline-block mt-3 text-blue-600 text-xs font-medium group-hover:gap-1 transition-all flex items-center gap-0.5">
                            Book this card <FaArrowRight className="text-xs" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Occupational Card Routes — the wider 48+ job-specific ECS routes */}
      <section className="py-10 bg-gray-50" id="occupational-cards">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-4">
              <FaCheck className="text-blue-600" /> {occupationalCards.length}+ occupational routes
            </div>
            <h2 className="text-3xl font-bold mb-3">Every ECS occupational card route</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Beyond the 13 core colour cards, ECS recognises specific job titles across electrical,
              fire &amp; security, network, AV and management occupations. Find your exact role below
              and jump straight to the closest matching practice test on this site.
            </p>
          </div>

          {/* Search + category filter */}
          <div className="flex flex-col md:flex-row gap-3 mb-8 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                value={occSearch}
                onChange={(e) => setOccSearch(e.target.value)}
                placeholder="Search by job title, e.g. 'Technician'"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <select
              value={occCategory}
              onChange={(e) => setOccCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="all">All categories</option>
              {occupationalCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>

          {occCategory === 'all' ? (
            occupationalCategories.map((cat) => {
              const cardsInCat = filteredOccupational.filter((c) => c.category === cat.id)
              if (cardsInCat.length === 0) return null
              return (
                <div key={cat.id} className="mb-10">
                  <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                    <span>{cat.icon}</span> {cat.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{cat.desc}</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cardsInCat.map((card) => (
                      <Link
                        to={`/ecs-cards/${card.slug}`}
                        key={card.name}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-4 group"
                      >
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition">{card.name}</h4>
                        <p className="text-gray-500 text-xs mt-1 mb-2">{card.desc}</p>
                        <span className="text-blue-600 text-xs font-medium flex items-center gap-1">
                          View card & book <FaArrowRight className="text-[10px]" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOccupational.map((card) => (
                <Link
                  to={`/ecs-cards/${card.slug}`}
                  key={card.name}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-4 group"
                >
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition">{card.name}</h4>
                  <p className="text-gray-500 text-xs mt-1 mb-2">{card.desc}</p>
                  <span className="text-blue-600 text-xs font-medium flex items-center gap-1">
                    View card & book <FaArrowRight className="text-[10px]" />
                  </span>
                </Link>
              ))}
            </div>
          )}

          {filteredOccupational.length === 0 && (
            <p className="text-center text-gray-400 py-10">No routes match that search — try a different job title.</p>
          )}
        </div>
      </section>

      {/* Career Path */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-3">The ECS career path</h2>
          <p className="text-center text-gray-600 mb-8">
            Most construction careers move up through the cards as qualifications are gained. 
            Here is the typical route, tap any step to practise that card's mock test.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/ecs-green-card-mock-test" className="bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-xl px-5 py-3 text-center hover:shadow-lg transition hover:-translate-y-1 min-w-[100px]">
              <div className="text-xs text-gray-300">STEP 1</div>
              <div className="font-bold">Trainee</div>
              <div className="text-xs text-gray-400">Red Card</div>
            </Link>
            <div className="text-gray-400 text-2xl self-center hidden sm:block">→</div>
            <Link to="/ecs-green-card-mock-test" className="bg-gradient-to-br from-green-700 to-green-800 text-white rounded-xl px-5 py-3 text-center hover:shadow-lg transition hover:-translate-y-1 min-w-[100px]">
              <div className="text-xs text-green-300">STEP 2</div>
              <div className="font-bold">Labourer</div>
              <div className="text-xs text-green-300">Green Card</div>
            </Link>
            <div className="text-gray-400 text-2xl self-center hidden sm:block">→</div>
            <Link to="/ecs-skilled-worker-test" className="bg-gradient-to-br from-blue-700 to-blue-800 text-white rounded-xl px-5 py-3 text-center hover:shadow-lg transition hover:-translate-y-1 min-w-[100px]">
              <div className="text-xs text-blue-300">STEP 3</div>
              <div className="font-bold">Skilled</div>
              <div className="text-xs text-blue-300">Blue Card</div>
            </Link>
            <div className="text-gray-400 text-2xl self-center hidden sm:block">→</div>
            <Link to="/ecs-supervisor-test" className="bg-gradient-to-br from-slate-600 to-slate-700 text-white rounded-xl px-5 py-3 text-center hover:shadow-lg transition hover:-translate-y-1 min-w-[100px]">
              <div className="text-xs text-slate-200">STEP 4</div>
              <div className="font-bold">Supervisor</div>
              <div className="text-xs text-slate-200">Gold Card</div>
            </Link>
            <div className="text-gray-400 text-2xl self-center hidden sm:block">→</div>
            <Link to="/ecs-black-card-mock-test" className="bg-gradient-to-br from-gray-900 to-black text-white rounded-xl px-5 py-3 text-center hover:shadow-lg transition hover:-translate-y-1 min-w-[100px]">
              <div className="text-xs text-gray-400">STEP 5</div>
              <div className="font-bold">Manager</div>
              <div className="text-xs text-gray-400">Black Card</div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 font-semibold text-gray-800 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span>{faq.q}</span>
                  <span className={`text-green-600 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-gray-600 text-sm border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-gray-400">
            ECSMockTest.uk is not affiliated with ECS or any official scheme. 
            The card visuals on this page are original illustrations, not official cards, 
            and the information is provided for general guidance only, always confirm your route 
            and the current rules at ecs.uk.com before applying.
          </p>
        </div>
      </section>
    </div>
  )
}

export default CardsPage
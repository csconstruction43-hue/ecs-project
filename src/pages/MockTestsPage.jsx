// pages/MockTestsPage.jsx
import React, { useState } from 'react'
import Seo from '../components/Seo'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isTestFree } from '../lib/testAccess'
import { extraPracticeChunkCards } from '../data/extraTests'

function MockTestsPage() {
  const { isPro } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('popular')

  const categories = [
    { id: 'all', name: 'All Tests', icon: '📋', color: '#4a6cf7' },
    { id: 'hs', name: 'Health & Safety (HSE)', icon: '🦺', color: '#10b981' },
    { id: 'fess', name: 'FESS', icon: '🔥', color: '#ef4444' },
    { id: 'network', name: 'Network Infrastructure', icon: '🌐', color: '#8b5cf6' },
    { id: 'electrical', name: 'Electrical Safety Unit', icon: '⚡', color: '#3b82f6' },
    { id: 'extra', name: 'Extra Practice', icon: '🧠', color: '#f59e0b' },
  ]

  const difficulties = [
    { id: 'all', name: 'All Levels', color: '#64748b' },
    { id: 'beginner', name: 'Beginner', color: '#10b981' },
    { id: 'intermediate', name: 'Intermediate', color: '#3b82f6' },
    { id: 'advanced', name: 'Advanced', color: '#f59e0b' },
    { id: 'expert', name: 'Expert', color: '#ef4444' },
  ]

  const tests = [
    {
      id: 1,
      name: 'ECS Health, Safety and Environmental (HSE) Assessment',
      path: '/ecs-hse-assessment',
      color: '#22c55e',
      gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
      desc: 'The ECS HSE Assessment — mandatory for every ECS card application or renewal, any occupation. Powered by the full, published ECS question bank (327 questions), drawn 50 at a time exactly like the real exam.',
      questions: 50,
      time: '30 min',
      difficulty: 'beginner',
      category: 'hs',
      popular: true,
      level: 'Beginner',
      topics: ['General Health & Safety', 'Manual Handling', 'Reporting Accidents', 'PPE', 'Health & Hygiene', 'Fire & Emergency', 'Work at Height', 'Work Equipment', 'Special Site Hazards', 'Electrotechnical', 'Environmental'],
      price: 'Free',
      certificate: true,
      official: true,
    },
    {
      id: 2,
      name: 'ECS FESS (Fire, Emergency and Security Systems) Assessment',
      path: '/ecs-fess-assessment',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
      desc: 'For FESS Systems Operative card applicants across all 4 sector-discipline pathways. ECS does not publish an official question bank for this route — these are unofficial practice questions built from the published topic guide. A valid HSE Assessment is also required separately.',
      questions: 50,
      time: '30 min',
      difficulty: 'intermediate',
      category: 'fess',
      popular: false,
      level: 'Intermediate',
      topics: ['Fire Alarm Systems', 'Emergency Lighting', 'Security Systems', 'Electrical Safety Awareness', 'Installation & Maintenance'],
      price: 'Free',
      certificate: true,
      official: false,
    },
    {
      id: 3,
      name: 'ECS Network Infrastructure Assessment',
      path: '/ecs-network-infrastructure-assessment',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      desc: 'For Network Infrastructure Installer and related occupation card applicants. ECS does not publish an official question bank for this route — these are unofficial practice questions built from general network infrastructure knowledge. A valid HSE Assessment is also required separately.',
      questions: 50,
      time: '30 min',
      difficulty: 'intermediate',
      category: 'network',
      popular: false,
      level: 'Intermediate',
      topics: ['Structured Cabling', 'Cable Testing & Certification', 'Fibre Optics', 'Comms Room Practice', 'General Site Safety'],
      price: 'Free',
      certificate: true,
      official: false,
    },
    {
      id: 4,
      name: 'ECS Electrical Safety Unit Assessment',
      path: '/ecs-electrical-safety-unit-assessment',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      desc: 'For applicants of the ECS Related Discipline card and other defined ECS cards requiring basic electrical safety knowledge. ECS publishes an official assessment guide (topic criteria) for this route, but not a public question bank — these are unofficial practice questions built from that guide. A valid HSE Assessment is also required separately.',
      questions: 50,
      time: '30 min',
      difficulty: 'intermediate',
      category: 'electrical',
      popular: false,
      level: 'Intermediate',
      topics: ['Safe Isolation', 'Electric Shock Risk', 'RCDs', 'Live Working Rules', 'Test Instruments'],
      price: 'Free',
      certificate: true,
      official: false,
    },
  ]

  // Each big Extra Practice bank (mega/ultra/electrical/safety) is split
  // into fixed 50-question tests (Test 1, Test 2, Test 3...) in
  // data/extraTests.js, instead of one giant multi-hour sitting. Only
  // Test 1 in each series is free — the rest show the same 🔒 Pro badge
  // as the rest of the app (derived live from isTestFree(test.path)
  // below, nothing hardcoded here). The official ECS HSE Assessment
  // above (id 1) and the 3 single-bank assessments (ids 2-4) are not
  // part of this and are untouched.
  const EXTRA_SERIES_META = {
    mega: {
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      difficulty: 'intermediate',
      level: 'Intermediate',
      topics: ['Safe Isolation', 'Testing & Inspection', 'PPE & Manual Handling', 'Fire Safety', 'Legislation'],
      descBase: 'Part of the 1000+ question Mixed Questions bank — safe isolation, testing & inspection, earthing & bonding, protective devices, electrical theory, PPE, fire safety, COSHH, work at height, legislation, first aid and site safety. Study material only — not official ECS/EAL exam questions.',
    },
    ultra: {
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
      difficulty: 'intermediate',
      level: 'Intermediate',
      topics: ['Renewables & EV Charging', 'Fault Finding', 'Testing Instruments', 'Legislation', 'Site Safety'],
      descBase: 'Part of the 650+ question Ultra Bank — safe isolation, testing, renewables, EV charging, smart homes, fault-finding, lightning protection and more. Study material only — not official ECS/EAL exam questions.',
    },
    electrical: {
      color: '#0ea5e9',
      gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
      difficulty: 'advanced',
      level: 'Advanced',
      topics: ['Electrical Theory', 'Calculations', 'Cables & Wiring', 'Testing', 'Protective Devices'],
      descBase: 'Part of the Electrical Theory & Calculations bank — installation knowledge, calculations and testing. Study material only — not official ECS/EAL exam questions.',
    },
    safety: {
      color: '#84cc16',
      gradient: 'linear-gradient(135deg, #84cc16, #65a30d)',
      difficulty: 'beginner',
      level: 'Beginner',
      topics: ['Site Safety', 'PPE', 'Fire Safety', 'Manual Handling', 'COSHH'],
      descBase: 'Part of the Health, Safety & Site Knowledge bank — complements the main HSE Assessment prep. Study material only — not official ECS/EAL exam questions.',
    },
  }

  const extraChunkTests = extraPracticeChunkCards.map((card, i) => {
    const meta = EXTRA_SERIES_META[card.seriesKey]
    return {
      id: 100 + i,
      name: card.title,
      path: card.path,
      color: meta.color,
      gradient: meta.gradient,
      desc: `${meta.descBase} Test ${card.seriesNum} of ${card.seriesTotal} — ${card.questions} questions.`,
      questions: card.questions,
      time: `${Math.max(Math.round(card.duration / 60), 5)} min`,
      difficulty: meta.difficulty,
      category: 'extra',
      popular: card.seriesNum === 1,
      level: meta.level,
      topics: meta.topics,
      price: 'Free',
      certificate: true,
      official: false,
    }
  })

  tests.push(...extraChunkTests)

  // Sort and filter tests
  const getSortedTests = () => {
    let filtered = tests.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            test.desc.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'all' || test.difficulty === selectedDifficulty
      return matchesSearch && matchesCategory && matchesDifficulty
    })

    switch(sortBy) {
      case 'popular':
        return filtered.sort((a, b) => (a.popular === b.popular ? 0 : a.popular ? -1 : 1))
      case 'newest':
        return filtered.sort((a, b) => b.id - a.id)
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }

  const filteredTests = getSortedTests()

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return '#10b981'
      case 'intermediate': return '#3b82f6'
      case 'advanced': return '#f59e0b'
      case 'expert': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getDifficultyStars = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return '★☆☆☆☆'
      case 'intermediate': return '★★★☆☆'
      case 'advanced': return '★★★★☆'
      case 'expert': return '★★★★★'
      default: return '★★★☆☆'
    }
  }

  const totalQuestions = tests.reduce((sum, test) => sum + (test.questions || 0), 0)
  const freeTestCount = tests.filter(test => test.price === 'Free').length

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Seo title="ECS Mock Tests 2026 | All Card Routes | Free Practice Questions" description="Practice for every ECS card route: H&S Test, Installation/Approved/Maintenance Electrician, FESS, Network & Telecoms, AV & Broadcast and more. Free ECS-style practice questions with instant answers." path="/mock-test" />
      {/* Header Section with Stats */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: '800', 
          background: 'linear-gradient(135deg, #1e293b, #4a6cf7, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px'
        }}>
          Practice Mock Tests
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Choose from our comprehensive collection of {tests.length} ECS mock tests. All questions are based on real exam patterns.
        </p>
      </div>

      {/* Enhanced Stats Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '16px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid #e2e8f0',
          transition: 'all 0.2s'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: '#4a6cf715',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>📋</div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>{tests.length}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Practice Tests</div>
          </div>
        </div>
        <div style={{
          background: 'white',
          padding: '16px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: '#10b98115',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>🆓</div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>{freeTestCount}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Free Tests</div>
          </div>
        </div>
        <div style={{
          background: 'white',
          padding: '16px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: '#f59e0b15',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>🤖</div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>AI Explained</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Every Answer</div>
          </div>
        </div>
        <div style={{
          background: 'white',
          padding: '16px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: '#ef444415',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>📝</div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>{totalQuestions}+</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Questions</div>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filter Bar */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '20px',
        marginBottom: '30px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth > 768 ? 'row' : 'column',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 2 }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search by test name or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 14px 14px 44px',
                border: '2px solid #e2e8f0',
                borderRadius: '14px',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4a6cf7'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Sort By */}
          <div style={{ flex: 1 }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #e2e8f0',
                borderRadius: '14px',
                fontSize: '14px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="popular">📊 Sort by: Featured</option>
              <option value="newest">🆕 Sort by: Newest</option>
              <option value="name">📝 Sort by: Name A-Z</option>
            </select>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth > 768 ? 'row' : 'column',
          gap: '20px',
          marginTop: '20px',
          flexWrap: 'wrap'
        }}>
          {/* Category Filters */}
          <div style={{ flex: 2 }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>TEST CATEGORY</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '8px 16px',
                    background: selectedCategory === cat.id ? cat.color : '#f1f5f9',
                    color: selectedCategory === cat.id ? 'white' : '#64748b',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filters */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>DIFFICULTY LEVEL</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {difficulties.map(diff => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  style={{
                    padding: '6px 14px',
                    background: selectedDifficulty === diff.id ? diff.color : '#f1f5f9',
                    color: selectedDifficulty === diff.id ? 'white' : '#64748b',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    transition: 'all 0.2s'
                  }}
                >
                  {diff.name}
                </button>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>VIEW MODE</div>
            <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px 16px',
                  background: viewMode === 'grid' ? '#4a6cf7' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '13px'
                }}
              >
                ⊞ Grid View
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px 16px',
                  background: viewMode === 'list' ? '#4a6cf7' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '13px'
                }}
              >
                ≡ List View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count & Clear Filters */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '14px', color: '#64748b' }}>
          Showing <strong style={{ color: '#1e293b' }}>{filteredTests.length}</strong> of <strong>{tests.length}</strong> tests
        </span>
        {(searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSelectedDifficulty('all')
            }}
            style={{
              background: '#f1f5f9',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            ✕ Clear all filters
          </button>
        )}
      </div>

      {/* HSE Topic Practice promo */}
      <Link
        to="/ecs-hse-practice"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
          textDecoration: 'none', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white',
          borderRadius: '16px', padding: '18px 24px', marginBottom: '24px'
        }}
      >
        <div>
          <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>🎯 New: Practice the HSE Assessment by topic</div>
          <div style={{ fontSize: '13px', opacity: 0.9 }}>Drill any of the 11 ECS HSE topics individually — all questions from the real, published question bank.</div>
        </div>
        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }}>
          Start practicing →
        </span>
      </Link>

      {/* Tests Grid/List */}
      {viewMode === 'grid' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '24px'
        }}>
          {filteredTests.map((test) => (
            <Link key={test.id} to={test.path} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 25px 30px -12px rgba(0,0,0,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'
              }}>
                {/* Card Header */}
                <div style={{
                  background: test.gradient,
                  padding: '24px',
                  color: 'white',
                  position: 'relative'
                }}>
                  {test.popular && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255,255,255,0.2)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '600',
                      backdropFilter: 'blur(4px)'
                    }}>
                      🔥 Most Popular
                    </span>
                  )}
                  {!isPro && !isTestFree(test.path) && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(0,0,0,0.35)',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backdropFilter: 'blur(4px)'
                    }}>
                      🔒 Pro
                    </span>
                  )}
                  <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{
                      background: 'rgba(255,255,255,0.15)',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>{test.level}</span>
                    <span>•</span>
                    <span>{test.difficulty}</span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', lineHeight: '1.3' }}>{test.name}</h3>
                  <div style={{ marginBottom: '12px' }}>
                    {test.official ? (
                      <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', background: 'rgba(34,197,94,0.25)', color: '#dcfce7', border: '1px solid rgba(220,252,231,0.5)' }}>
                        📘 Published ECS question bank
                      </span>
                    ) : (
                      <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', background: 'rgba(245,158,11,0.25)', color: '#fef3c7', border: '1px solid rgba(254,243,199,0.5)' }}>
                        ⚠️ Unofficial practice questions
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', opacity: 0.9 }}>
                    <span>📝 {test.questions} questions</span>
                    <span>⏱️ {test.time}</span>
                    <span>💰 {(!isPro && !isTestFree(test.path)) ? 'Pro' : test.price}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>
                    {test.desc}
                  </p>
                  
                  {/* Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <span style={{
                      background: getDifficultyColor(test.difficulty) + '15',
                      color: getDifficultyColor(test.difficulty),
                      padding: '2px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>{test.difficulty}</span>
                    {test.certificate && (
                      <span style={{
                        background: '#10b98115',
                        color: '#10b981',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}>
                        🎓 Certificate
                      </span>
                    )}
                  </div>

                  {/* Topics Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {test.topics.slice(0, 3).map((topic, i) => (
                      <span key={i} style={{
                        background: '#f1f5f9',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '10px',
                        color: '#64748b'
                      }}>
                        {topic}
                      </span>
                    ))}
                    {test.topics.length > 3 && (
                      <span style={{
                        background: '#f1f5f9',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '10px',
                        color: '#64748b'
                      }}>
                        +{test.topics.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        color: getDifficultyColor(test.difficulty),
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {getDifficultyStars(test.difficulty)}
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                      </span>
                    </div>
                    <button style={{
                      background: test.color,
                      color: 'white',
                      border: 'none',
                      padding: '8px 24px',
                      borderRadius: '30px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      Start Test →
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // List View
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredTests.map((test) => (
            <Link key={test.id} to={test.path} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                transition: 'all 0.2s',
                border: '1px solid #e2e8f0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = test.color
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0'
                e.currentTarget.style.boxShadow = 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 2 }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: `${test.color}15`,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px'
                  }}>
                    📋
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{test.name}</h3>
                      {test.popular && <span style={{ fontSize: '10px', background: '#fee2e2', color: '#ef4444', padding: '2px 8px', borderRadius: '12px' }}>🔥 Popular</span>}
                      {!isPro && !isTestFree(test.path) && <span style={{ fontSize: '10px', background: '#f3e8ff', color: '#7e22ce', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>🔒 Pro</span>}
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>{test.desc}</p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>📝 {test.questions} Qs</span>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>⏱️ {test.time}</span>
                      <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'capitalize' }}>🎯 {test.difficulty}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: test.color }}>{(!isPro && !isTestFree(test.path)) ? 'Pro' : test.price}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>Price</div>
                  </div>
                  <div style={{
                    background: test.color,
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '30px',
                    fontSize: '13px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}>
                    Start →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredTests.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '80px',
          background: 'white',
          borderRadius: '24px'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔍</div>
          <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>No tests found</h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Try adjusting your search or filter criteria</p>
          <button            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSelectedDifficulty('all')
            }}
            style={{
              background: '#4a6cf7',
              color: 'white',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '14px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default MockTestsPage
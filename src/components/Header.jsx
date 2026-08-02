// components/Header.jsx — Total Skills-inspired two-row header
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Menu, X, User, LogOut, ChevronDown, Home, FileText, BookOpen,
  CreditCard, Grid, BarChart2, Settings, Award, ClipboardCheck,
  Users, Crown, Zap, Bot, Shield, Search, ArrowRight, GraduationCap, Calculator, Wrench
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

// Lightweight site search index — no backend required, just jumps the user
// to the right page. Add to this list as new pages are added.
const SEARCH_INDEX = [
  { label: 'Home', path: '/', keywords: 'home start landing' },
  { label: 'Free Mock Test', path: '/guest-test', keywords: 'mock test free guest exam practice' },
  { label: 'Online Courses (A–Z)', path: '/courses', keywords: 'courses book enroll online level 2 level 3 ev solar' },
  { label: 'My Courses', path: '/my-courses', keywords: 'my courses booked enrolled' },
  { label: 'All Mock Tests', path: '/mock-test', keywords: 'mock tests exams practice topics' },
  { label: 'Green Card Mock Test', path: '/ecs-green-card-mock-test', keywords: 'green card operative' },
  { label: 'Skilled Worker Test', path: '/ecs-skilled-worker-test', keywords: 'blue card skilled worker' },
  { label: 'Supervisor Test', path: '/ecs-supervisor-test', keywords: 'gold card supervisor' },
  { label: 'Managers & Professionals Test', path: '/ecs-managers-and-professionals-test', keywords: 'black card manager professional' },
  { label: 'ECS Card Info', path: '/ecs-card-info', keywords: 'card info which card' },
  { label: 'ECS Cards Explained', path: '/cards', keywords: 'ecs cards types' },
  { label: 'Safety Signs', path: '/safety-signs', keywords: 'safety signs symbols' },
  { label: 'Electrician Calculators', path: '/calculators', keywords: 'calculators ohms law voltage drop cable size three phase vat lux calculator' },
  { label: 'AM2 Simulator', path: '/am2-simulator', keywords: 'am2 simulator practical assessment safe isolation fault diagnosis inspection testing mock exam' },
  { label: 'Study Material', path: '/study-material', keywords: 'study material revision' },
  { label: 'Video Library', path: '/videos', keywords: 'videos training PPE ladder fire safety' },
  { label: 'Blog', path: '/blog', keywords: 'blog articles news' },
  { label: 'Pricing', path: '/pricing', keywords: 'pricing plans cost price' },
  { label: 'Community', path: '/community', keywords: 'community forum' },
  { label: 'Contact / Support', path: '/community', keywords: 'contact support help' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, isPro, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const dropdownRef = useRef(null)
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false)
      if (searchRef.current && !searchRef.current.contains(e.target)) setIsSearchOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { setIsMenuOpen(false); setIsDropdownOpen(false); setIsSearchOpen(false) }, [location.pathname])

  // Keyboard shortcut: Ctrl/Cmd + K opens search, matching the "Ctrl K" hint
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
        setTimeout(() => searchInputRef.current?.focus(), 0)
      }
      if (e.key === 'Escape') setIsSearchOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Lets the mobile bottom nav's "More" button open the same slide-down menu
  useEffect(() => {
    const onToggle = () => setIsMenuOpen((v) => !v)
    window.addEventListener('toggle-mobile-menu', onToggle)
    return () => window.removeEventListener('toggle-mobile-menu', onToggle)
  }, [])

  const handleLogout = () => { logout(); setIsDropdownOpen(false); navigate('/') }

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/mock-test', label: 'Mock Tests', icon: ClipboardCheck },
    { path: '/courses', label: 'Courses', icon: GraduationCap },
    { path: '/study-material', label: 'Guides', icon: BookOpen },
    { path: '/safety-signs', label: 'Safety Signs', icon: Shield },
    { path: '/calculators', label: 'Calculators', icon: Calculator },
    { path: '/am2-simulator', label: 'AM2 Simulator', icon: Wrench },
    { path: '/cards', label: 'ECS Cards', icon: CreditCard },
    { path: '/blog', label: 'News', icon: FileText },
    { path: '/pricing', label: 'Pricing', icon: Award },
  ]

  const userLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Grid },
    { path: '/my-courses', label: 'My Courses', icon: GraduationCap },
    { path: '/my-library', label: 'My Library', icon: BookOpen },
    { path: '/my-mistakes', label: 'My Mistakes', icon: ClipboardCheck },
    { path: '/analytics', label: 'Analytics', icon: BarChart2 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    return SEARCH_INDEX.filter(
      (item) => item.label.toLowerCase().includes(q) || item.keywords.includes(q)
    ).slice(0, 6)
  }, [searchQuery])

  const goToResult = (path) => {
    navigate(path)
    setSearchQuery('')
    setIsSearchOpen(false)
  }

  return (
    <>
      {/* Announcement bar */}
      {!isPro && (
        <div className="bg-gradient-to-r from-blue-500 to-secondary text-white text-center py-2 px-4 text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            <Zap size={14} className="text-slate-300" />
            🎯 Get Pro — unlimited tests, AI explanations & analytics
            <Link to="/plans" className="underline font-bold hover:text-slate-200 transition-colors ml-1">Upgrade now →</Link>
          </span>
        </div>
      )}

      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md border-b border-gray-100' : 'bg-white/98 backdrop-blur-md border-b border-gray-100'
      }`}>
        <div className="h-[3px] w-full" style={{ background: 'var(--hazard-stripe)', backgroundSize: '28px 28px' }} />

        {/* Row 1 — logo, search, account */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-secondary rounded-xl flex items-center justify-center shadow-md shadow-blue-200 group-hover:shadow-blue-300 transition-all">
                <Zap size={18} className="text-white fill-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-black text-gray-900 tracking-tight">
                  ECS<span className="text-blue-600">Prep</span>
                </span>
                <div className="text-[9px] text-gray-400 font-medium leading-none -mt-0.5 tracking-wider">UK ELECTROTECHNICAL TESTS</div>
              </div>
            </Link>

            {/* Search — desktop */}
            <div className="hidden md:flex flex-1 max-w-md relative" ref={searchRef}>
              <button
                onClick={() => { setIsSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 0) }}
                className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300 hover:bg-gray-100 transition-colors text-sm"
              >
                <Search size={15} />
                <span className="flex-1 text-left">Search</span>
                <kbd className="text-[10px] font-semibold border border-gray-300 bg-white rounded px-1.5 py-0.5 text-gray-400">Ctrl K</kbd>
              </button>

              {isSearchOpen && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl shadow-gray-200 border border-gray-100 p-3 z-50 animate-fadeIn">
                  <div className="flex items-center gap-2 px-2 pb-2 border-b border-gray-100">
                    <Search size={15} className="text-gray-400 shrink-0" />
                    <input
                      ref={searchInputRef}
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && searchResults[0]) goToResult(searchResults[0].path) }}
                      placeholder="Search mock tests, guides, pricing…"
                      className="flex-1 text-sm outline-none py-1.5 text-gray-800"
                    />
                  </div>
                  <div className="mt-2 max-h-72 overflow-y-auto">
                    {searchQuery && searchResults.length === 0 && (
                      <p className="text-sm text-gray-400 px-2 py-3">No matches — try "tests", "cards" or "pricing".</p>
                    )}
                    {(searchQuery ? searchResults : SEARCH_INDEX.slice(0, 5)).map((item) => (
                      <button
                        key={item.path + item.label}
                        onClick={() => goToResult(item.path)}
                        className="w-full flex items-center justify-between gap-2 px-2.5 py-2.5 rounded-xl text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <span>{item.label}</span>
                        <ArrowRight size={13} className="text-gray-300" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right section — desktop */}
            <div className="hidden xl:flex items-center gap-3 shrink-0">
              <ThemeToggle />
              <LanguageSwitcher compact />
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${
                      isPro ? 'bg-gradient-to-br from-slate-400 to-slate-500' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                    }`}>
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-gray-800 leading-tight">{user.name?.split(' ')[0] || 'User'}</div>
                      {isPro && <div className="text-[10px] text-slate-600 font-bold leading-tight">PRO</div>}
                    </div>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl shadow-gray-200 border border-gray-100 py-2 animate-fadeIn">
                      {/* Profile header */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shadow-sm ${
                            isPro ? 'bg-gradient-to-br from-slate-400 to-slate-500' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                          }`}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
                              {isPro && (
                                <span className="flex items-center gap-0.5 bg-gradient-to-r from-slate-400 to-slate-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                                  <Crown size={8} /> PRO
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                        </div>
                        {!isPro && (
                          <Link
                            to="/plans"
                            className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-blue-500 to-secondary text-white rounded-xl py-2.5 hover:opacity-90 transition-opacity"
                          >
                            <Crown size={12} /> Upgrade to Pro — Unlock AI & More
                          </Link>
                        )}
                      </div>

                      {/* Nav links */}
                      <div className="py-1.5">
                        {userLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <link.icon size={16} className="shrink-0" />
                            <span className="text-sm font-medium">{link.label}</span>
                          </Link>
                        ))}
                        <Link
                          to="/plans"
                          className="flex items-center gap-3 px-4 py-2.5 text-purple-600 hover:bg-purple-50 transition-colors"
                        >
                          <Bot size={16} className="shrink-0" />
                          <span className="text-sm font-medium">AI Assistant</span>
                        </Link>
                      </div>

                      {/* Admin + logout */}
                      <div className="border-t border-gray-100 pt-1.5">
                        {user.role === 'admin' && (
                          <Link
                            to="/admin/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Users size={16} className="shrink-0" />
                            <span className="text-sm font-medium">Admin Panel</span>
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 w-full text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} className="shrink-0" />
                          <span className="text-sm font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-secondary hover:bg-slate-800 font-semibold transition-colors rounded-full"
                  >
                    <User size={14} />
                    Student Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Get Started Free
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-1 xl:hidden">
              <button
                onClick={() => { setIsSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 0) }}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors md:hidden"
                aria-label="Search"
              >
                <Search size={20} className="text-gray-600" />
              </button>
              <ThemeToggle />
              <LanguageSwitcher compact />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Row 2 — nav tabs (desktop) */}
        <div className="hidden xl:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-blue-600 border-blue-600 font-semibold'
                      : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-200'
                  }`}
                >
                  <link.icon size={14} />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile search panel */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                ref={searchInputRef}
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && searchResults[0]) goToResult(searchResults[0].path) }}
                placeholder="Search mock tests, guides, pricing…"
                className="flex-1 text-sm outline-none py-1 text-gray-800 bg-transparent"
              />
              <button onClick={() => { setIsSearchOpen(false); setSearchQuery('') }} className="text-gray-400"><X size={16} /></button>
            </div>
            {searchQuery && (
              <div className="mt-2 max-h-64 overflow-y-auto">
                {searchResults.length === 0 && <p className="text-sm text-gray-400 px-2 py-3">No matches found.</p>}
                {searchResults.map((item) => (
                  <button
                    key={item.path + item.label}
                    onClick={() => goToResult(item.path)}
                    className="w-full flex items-center justify-between gap-2 px-2.5 py-2.5 rounded-xl text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={13} className="text-gray-300" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="xl:hidden border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <nav className="grid grid-cols-2 gap-1 mb-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                      isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <link.icon size={16} />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="border-t border-gray-100 pt-3">
                {user ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm ${isPro ? 'bg-gradient-to-br from-slate-400 to-slate-500' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`}>
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{isPro ? '✨ Pro Member' : 'Free Account'}</p>
                      </div>
                    </div>
                    {!isPro && (
                      <Link to="/plans" className="flex items-center justify-center gap-2 mx-3 py-2.5 bg-gradient-to-r from-blue-500 to-secondary text-white rounded-xl text-sm font-semibold mb-2">
                        <Crown size={14} /> Upgrade to Pro
                      </Link>
                    )}
                    {userLinks.map((link) => (
                      <Link key={link.path} to={link.path} className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium">
                        <link.icon size={16} /><span>{link.label}</span>
                      </Link>
                    ))}
                    {user.role === 'admin' && (
                      <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors text-sm font-medium">
                        <Users size={16} /><span>Admin Panel</span>
                      </Link>
                    )}
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium">
                      <LogOut size={16} /><span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/login" className="flex items-center justify-center gap-1.5 py-2.5 text-center text-white bg-secondary rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">
                      <User size={14} /> Student Login
                    </Link>
                    <Link to="/register" className="py-2.5 text-center bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">Get Started</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
          .animate-fadeIn { animation: fadeIn 0.15s ease-out; }
        `}</style>
      </header>
    </>
  )
}

export default Header

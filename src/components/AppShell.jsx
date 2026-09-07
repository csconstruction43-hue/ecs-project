// components/AppShell.jsx
// Light-theme sidebar shell for the logged-in "app" area (Dashboard, Study
// Guide, Mock Test, Practice by Topic, My Mistakes, My Library, Quick
// Review, Analytics, Pricing, Affiliate, Settings). Mirrors the reference
// design: white sidebar, indigo accents, plan badge + avatar at the
// bottom, no marketing header/footer.
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutGrid, BookOpen, ClipboardList, ListChecks, XCircle, Library,
  Zap, BarChart3, Tag, Users, Settings, LogOut, Crown, Layers, RotateCcw, Trophy,
  Shield, BookOpenCheck, Video, MessageSquare, Sparkles, CalendarDays, MapPin, IdCard,
  Building2, ClipboardCheck, HelpCircle, CreditCard, Target,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import { claimDailyLoginBonus } from '../lib/gamification'

const menuItems = [
  { icon: LayoutGrid, name: 'Dashboard', path: '/dashboard' },
  { icon: BookOpen, name: 'Study Guide', path: '/study-guide' },
  { icon: ClipboardList, name: 'Mock Test', path: '/mock-test' },
  { icon: ListChecks, name: 'Practice by Topic', path: '/practice' },
  { icon: XCircle, name: 'My Mistakes', path: '/my-mistakes' },
  { icon: Library, name: 'My Library', path: '/my-library' },
  { icon: Zap, name: 'Quick Review', path: '/quick-review' },
]

const revisionItems = [
  { icon: Layers, name: 'Flashcards', path: '/flashcards' },
  { icon: RotateCcw, name: 'Wrong Questions Only', path: '/revision/wrong-questions' },
  { icon: Target, name: 'Smart Practice', path: '/smart-practice' },
  { icon: Trophy, name: 'Achievements', path: '/achievements' },
  { icon: Shield, name: 'Safety Signs', path: '/safety-signs' },
  { icon: BookOpenCheck, name: 'Study Material', path: '/study-material' },
  { icon: Video, name: 'Video Library', path: '/videos' },
  { icon: MessageSquare, name: 'Community', path: '/community' },
]

// Phase 3 AI-powered tools. New ones (Tutor, Study Plan, Weakness
// Analysis) get added here as they ship.
const aiItems = [
  { icon: CalendarDays, name: 'Study Plan', path: '/study-plan' },
  { icon: Sparkles, name: 'AI Quiz Generator', path: '/ai-quiz-generator' },
]

const moreItems = [
  { icon: BarChart3, name: 'Analytics', path: '/analytics' },
  { icon: Tag, name: 'Pricing', path: '/pricing' },
  { icon: Users, name: 'Affiliate', path: '/affiliate' },
]

// UK-specific candidate tools — finding a test centre and tracking card
// renewal are both things a UK ECS candidate needs but that live outside
// the core study/revision flow.
const ukToolsItems = [
  { icon: MapPin, name: 'Test Centre Finder', path: '/test-centre-finder' },
  { icon: IdCard, name: 'Card Renewal Reminder', path: '/card-renewal-reminder' },
  { icon: HelpCircle, name: 'Which ECS Card?', path: '/which-ecs-card' },
  { icon: ClipboardCheck, name: 'Exam Day Checklist', path: '/exam-day-checklist' },
  { icon: Building2, name: 'Team Card Tracker', path: '/team' },
  { icon: CreditCard, name: 'My Card Application', path: '/my-card-application' },
]

const bottomItems = [
  { icon: Settings, name: 'Settings', path: '/settings' },
  { icon: LogOut, name: 'Sign out', path: '/signout' },
]

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const { user, isPro } = useAuth()

  const isActive = (path) => location.pathname === path
  const firstName = (user?.name || 'there').split(' ')[0]
  const initial = (user?.name || 'U').trim().charAt(0).toUpperCase()

  // Daily Login Bonus — fires once per calendar day the first time a
  // signed-in user lands in the app shell (any page). claimDailyLoginBonus()
  // is itself idempotent for the day, so this is safe even though AppShell
  // mounts on every logged-in page. Reuses the same "gamification:update"
  // event XPToast already listens for, so no new UI component is needed.
  useEffect(() => {
    if (!user?.id) return
    try {
      const result = claimDailyLoginBonus()
      if (result.claimed) {
        window.dispatchEvent(new CustomEvent('gamification:update', { detail: result }))
      }
    } catch {
      // Gamification is a nice-to-have — never break the app shell over it.
    }
  }, [user?.id])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className="fixed h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-40"
        style={{ width: sidebarOpen ? '260px' : '76px' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            CS
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="font-bold text-gray-900 text-sm leading-tight truncate">ECS Mock Test</div>
              <div className="text-xs text-gray-400 leading-tight">Test Preparation</div>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center shadow"
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {sidebarOpen && <div className="px-2 text-[11px] font-semibold tracking-wide text-gray-400 mb-2">STUDY</div>}
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{item.name}</span>}
              </Link>
            )
          })}

          {sidebarOpen && <div className="px-2 text-[11px] font-semibold tracking-wide text-gray-400 mb-2 mt-4">REVISION CENTRE</div>}
          {revisionItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{item.name}</span>}
              </Link>
            )
          })}

          {sidebarOpen && <div className="px-2 text-[11px] font-semibold tracking-wide text-gray-400 mb-2 mt-4">AI TOOLS</div>}
          {aiItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{item.name}</span>}
              </Link>
            )
          })}

          {sidebarOpen && <div className="px-2 text-[11px] font-semibold tracking-wide text-gray-400 mb-2 mt-4">UK TOOLS</div>}
          {ukToolsItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{item.name}</span>}
              </Link>
            )
          })}

          {sidebarOpen && <div className="px-2 text-[11px] font-semibold tracking-wide text-gray-400 mb-2 mt-4">MORE</div>}
          {moreItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom: settings/signout + account */}
        <div className="border-t border-gray-100 px-3 py-3">
          {bottomItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            )
          })}

          <div className="flex items-center gap-3 px-2 pt-3 mt-2 border-t border-gray-100">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {initial}
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">{firstName}</div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  {isPro ? (
                    <span className="flex items-center gap-1 text-slate-600 font-semibold"><Crown size={11} /> Pro</span>
                  ) : (
                    'Free'
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '260px' : '76px' }}
      >
        <div className="flex justify-end items-center gap-2 px-4 sm:px-6 pt-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        {children}
      </main>
    </div>
  )
}

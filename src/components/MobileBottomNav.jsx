// components/MobileBottomNav.jsx — fixed bottom tab bar for mobile, styled after
// the Total Skills UK header reference (Home / Courses / Guides / Contact / Chat / More).
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, ClipboardCheck, GraduationCap, MessageCircle, Menu } from 'lucide-react'

const TABS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/mock-test', label: 'Tests', icon: ClipboardCheck },
  { path: '/courses', label: 'Courses', icon: GraduationCap },
]

const MobileBottomNav = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const openChat = () => {
    // Opens the site-wide AI Assistant chat widget (rendered in App.jsx).
    const trigger = document.querySelector('[aria-label="Open AI Assistant"]')
    if (trigger) trigger.click()
  }

  const openMore = () => {
    window.dispatchEvent(new Event('toggle-mobile-menu'))
  }

  return (
    <nav
      className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Primary mobile navigation"
    >
      <div className="grid grid-cols-5">
        {TABS.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
              isActive(tab.path) ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <tab.icon size={19} strokeWidth={isActive(tab.path) ? 2.5 : 2} />
            {tab.label}
          </Link>
        ))}

        <button
          onClick={openChat}
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-medium text-blue-600"
        >
          <span className="w-9 h-9 -mt-4 rounded-full bg-gradient-to-br from-blue-500 to-secondary text-white flex items-center justify-center shadow-lg shadow-blue-200">
            <MessageCircle size={17} />
          </span>
          Chat
        </button>

        <button
          onClick={openMore}
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          <Menu size={19} />
          More
        </button>
      </div>
    </nav>
  )
}

export default MobileBottomNav

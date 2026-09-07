// components/AdminLayout.jsx
import React from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  FileQuestion, 
  BookOpen, 
  GraduationCap,
  BarChart3, 
  Receipt,
  Settings,
  LogOut,
  Menu,
  X,
  ClipboardList,
  CreditCard,
  FileSignature,
  ShieldAlert,
  ShieldCheck,
  Search,
  Loader2,
  Mail,
  Newspaper,
  Inbox,
  Bell,
  Globe2,
  FileText,
  PartyPopper,
  Flag,
  Tag,
  Activity
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useActivityPing } from '../lib/useActivityPing'
import { apiRequest } from '../lib/api'
import { useAuth } from '../context/AuthContext'

// New feature: global admin search — jumps to a user, support ticket,
// question report, or card application by keyword. Upgraded from the old
// users-only quick search (GET /api/admin/users/search) to the new
// GET /api/admin/search, which is scoped server-side to whatever the
// caller's role is allowed to see.
const AdminQuickSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const navigate = useNavigate()
  const boxRef = useRef(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: clears stale results as the query changes
      setResults([])
      setOpen(false)
      return
    }
    setSearching(true)
    const id = setTimeout(async () => {
      try {
        const { results } = await apiRequest(`/api/admin/search?q=${encodeURIComponent(query.trim())}`)
        setResults(results)
        setOpen(true)
      } catch {
        setResults([])
      } finally {
        setSearching(false)
      }
    }, 300)
    return () => clearTimeout(id)
  }, [query])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={boxRef}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder="Search users, tickets, applications..."
        className="w-full border border-gray-200 rounded-lg pl-9 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {searching && <Loader2 size={14} className="animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />}
      {open && results.length > 0 && (
        <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 max-h-72 overflow-y-auto">
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => { navigate(r.path); setOpen(false); setQuery('') }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between gap-3"
            >
              <span className="truncate text-gray-800">{r.label}</span>
              <span className="text-xs text-gray-400 shrink-0">{r.type}</span>
            </button>
          ))}
        </div>
      )}
      {open && !searching && results.length === 0 && query.trim().length >= 2 && (
        <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 px-4 py-3 text-sm text-gray-400">
          No results for "{query.trim()}".
        </div>
      )}
    </div>
  )
}

const AdminLayout = () => {
  useActivityPing()
  const { user } = useAuth()
  // New feature: granular admin roles — support_agent/content_editor see a
  // trimmed-down sidebar; only a full 'admin' sees the sensitive sections
  // (these match the requireSuperAdmin-gated routes on the backend).
  const isSuperAdmin = user?.role === 'admin'
  // Desktop: collapses the sidebar to icons-only (w-64 <-> w-20).
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  // Mobile/tablet (below lg): sidebar is an off-canvas drawer, closed by default.
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [counts, setCounts] = useState({ courseRequests: 0, paymentRequests: 0, openTickets: 0, openQuestionReports: 0, pendingCardApplications: 0 })
  const navigate = useNavigate()
  const location = useLocation()

  // Close the mobile drawer whenever the admin navigates to a new page.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: closes the drawer on route change
  useEffect(() => { setIsMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    let cancelled = false
    const loadCounts = async () => {
      // Promise.allSettled — a support_agent/content_editor gets a 403 on
      // the super-admin-only endpoints (course/payment requests), which
      // shouldn't stop their own badges (tickets/reports/applications)
      // from loading.
      const [courseRes, paymentRes, ticketRes, reportRes, appRes] = await Promise.allSettled([
        isSuperAdmin ? apiRequest('/api/admin/course-requests') : Promise.resolve({ requests: [] }),
        isSuperAdmin ? apiRequest('/api/admin/payment-requests') : Promise.resolve({ requests: [] }),
        apiRequest('/api/admin/tickets'),
        apiRequest('/api/admin/question-reports'),
        apiRequest('/api/admin/card-applications'),
      ])
      if (cancelled) return
      setCounts({
        courseRequests: courseRes.status === 'fulfilled' ? courseRes.value.requests.length : 0,
        paymentRequests: paymentRes.status === 'fulfilled' ? paymentRes.value.requests.length : 0,
        openTickets: ticketRes.status === 'fulfilled' ? ticketRes.value.tickets.filter((t) => t.status === 'open').length : 0,
        openQuestionReports: reportRes.status === 'fulfilled' ? reportRes.value.reports.filter((r) => r.status === 'open').length : 0,
        pendingCardApplications: appRes.status === 'fulfilled' ? appRes.value.applications.filter((a) => a.stage === 'submitted').length : 0,
      })
    }
    loadCounts()
    const interval = setInterval(loadCounts, 60000)
    return () => { cancelled = true; clearInterval(interval) }
  }, [isSuperAdmin])

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users', superAdminOnly: true },
    { path: '/admin/courses', icon: GraduationCap, label: 'Courses' },
    { path: '/admin/course-requests', icon: ClipboardList, label: 'Course Requests', badgeKey: 'courseRequests', superAdminOnly: true },
    { path: '/admin/payment-requests', icon: CreditCard, label: 'Payment Requests', badgeKey: 'paymentRequests', superAdminOnly: true },
    { path: '/admin/tests', icon: FileQuestion, label: 'Tests' },
    { path: '/admin/questions', icon: BookOpen, label: 'Questions' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics', superAdminOnly: true },
    { path: '/admin/invoices', icon: Receipt, label: 'Invoices', superAdminOnly: true },
    { path: '/admin/quotes', icon: FileSignature, label: 'Quotes', superAdminOnly: true },
    { path: '/admin/rams', icon: ShieldAlert, label: 'RAMS', superAdminOnly: true },
    { path: '/admin/blog', icon: Newspaper, label: 'Blog' },
    { path: '/admin/pages', icon: FileText, label: 'Pages' },
    { path: '/admin/support-tickets', icon: Inbox, label: 'Support Tickets', badgeKey: 'openTickets' },
    { path: '/admin/question-reports', icon: Flag, label: 'Question Reports', badgeKey: 'openQuestionReports' },
    { path: '/admin/card-applications', icon: CreditCard, label: 'Card Applications', badgeKey: 'pendingCardApplications' },
    { path: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { path: '/admin/seo-manager', icon: Globe2, label: 'SEO Manager' },
    { path: '/admin/audit-log', icon: ShieldCheck, label: 'Audit Log', superAdminOnly: true },
    { path: '/admin/broadcast', icon: Mail, label: 'Broadcast Email', superAdminOnly: true },
    { path: '/admin/festivals', icon: PartyPopper, label: 'Festivals' },
    { path: '/admin/coupons', icon: Tag, label: 'Coupons', superAdminOnly: true },
    { path: '/admin/system-health', icon: Activity, label: 'System Health', superAdminOnly: true },
    { path: '/admin/settings', icon: Settings, label: 'Settings', superAdminOnly: true },
  ].filter((item) => !item.superAdminOnly || isSuperAdmin)

  const handleLogout = () => {
    // Add logout logic here
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile/tablet backdrop — tapping it closes the drawer, same as clicking outside */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — a fixed off-canvas drawer below lg, a static collapsible column at lg+ */}
      <aside
        className={`bg-gray-900 text-white flex flex-col
          fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:inset-auto lg:translate-x-0 lg:transition-all
          ${isSidebarOpen ? 'lg:w-64' : 'lg:w-20'}`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between shrink-0">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && 'lg:hidden'}`}>
            Admin Panel
          </h1>
          {/* Close button — mobile drawer only */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 hover:bg-gray-700 rounded lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
          {/* Collapse toggle — desktop only */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block p-1 hover:bg-gray-700 rounded"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const count = item.badgeKey ? counts[item.badgeKey] : 0
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors relative"
              >
                <item.icon size={20} className="shrink-0" />
                <span className={!isSidebarOpen ? 'lg:hidden flex-1' : 'flex-1'}>{item.label}</span>
                {count > 0 && (
                  <span
                    className={
                      isSidebarOpen
                        ? 'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full'
                        : 'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full lg:absolute lg:top-1 lg:right-1 lg:w-2 lg:h-2 lg:min-w-0 lg:p-0'
                    }
                  >
                    <span className={isSidebarOpen ? '' : 'lg:hidden'}>{count}</span>
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-700 transition-colors"
          >
            <LogOut size={20} className="shrink-0" />
            <span className={!isSidebarOpen ? 'lg:hidden' : ''}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Admin Header */}
        <header className="bg-white shadow-sm p-3 sm:p-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 -ml-1 rounded-lg hover:bg-gray-100 lg:hidden shrink-0"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <h2 className="text-lg sm:text-xl font-semibold shrink-0">Admin</h2>
          <div className="order-3 w-full sm:order-none sm:w-auto sm:flex-1 sm:max-w-xs">
            <AdminQuickSearch />
          </div>
          <div className="flex items-center gap-3 ml-auto shrink-0">
            <span className="hidden sm:inline text-sm text-gray-600">Admin User</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
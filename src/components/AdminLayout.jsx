// components/AdminLayout.jsx
import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
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
  ShieldAlert
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useActivityPing } from '../lib/useActivityPing'
import { apiRequest } from '../lib/api'

const AdminLayout = () => {
  useActivityPing()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [counts, setCounts] = useState({ courseRequests: 0, paymentRequests: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    const loadCounts = async () => {
      try {
        const [{ requests: courseRequests }, { requests: paymentRequests }] = await Promise.all([
          apiRequest('/api/admin/course-requests'),
          apiRequest('/api/admin/payment-requests'),
        ])
        if (!cancelled) {
          setCounts({ courseRequests: courseRequests.length, paymentRequests: paymentRequests.length })
        }
      } catch {
        // Sidebar badges are a nice-to-have — silently skip if this fails.
      }
    }
    loadCounts()
    const interval = setInterval(loadCounts, 60000)
    return () => { cancelled = true; clearInterval(interval) }
  }, [])

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/courses', icon: GraduationCap, label: 'Courses' },
    { path: '/admin/course-requests', icon: ClipboardList, label: 'Course Requests', badgeKey: 'courseRequests' },
    { path: '/admin/payment-requests', icon: CreditCard, label: 'Payment Requests', badgeKey: 'paymentRequests' },
    { path: '/admin/tests', icon: FileQuestion, label: 'Tests' },
    { path: '/admin/questions', icon: BookOpen, label: 'Questions' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/invoices', icon: Receipt, label: 'Invoices' },
    { path: '/admin/quotes', icon: FileSignature, label: 'Quotes' },
    { path: '/admin/rams', icon: ShieldAlert, label: 'RAMS' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  const handleLogout = () => {
    // Add logout logic here
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`bg-gray-900 text-white ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>
            Admin Panel
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-gray-700 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const count = item.badgeKey ? counts[item.badgeKey] : 0
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors relative"
              >
                <item.icon size={20} />
                <span className={!isSidebarOpen ? 'hidden' : 'flex-1'}>{item.label}</span>
                {count > 0 && (
                  <span
                    className={
                      isSidebarOpen
                        ? 'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full'
                        : 'absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'
                    }
                  >
                    {isSidebarOpen ? count : ''}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-700 transition-colors"
          >
            <LogOut size={20} />
            <span className={!isSidebarOpen ? 'hidden' : ''}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Admin User</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
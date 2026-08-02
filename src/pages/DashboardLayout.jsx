// components/DashboardLayout.jsx
import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function DashboardLayout() {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const menuItems = [
    { icon: '📊', name: 'Dashboard', path: '/dashboard' },
    { icon: '📚', name: 'Study Guide', path: '/study-guide' },
    { icon: '📝', name: 'Mock Test', path: '/mock-test' },
    { icon: '✏️', name: 'Practice by Topic', path: '/practice' },
    { icon: '❌', name: 'My Mistakes', path: '/my-mistakes' },
    { icon: '📖', name: 'My Library', path: '/my-library' },
    { icon: '⚡', name: 'Quick Review', path: '/quick-review' },
    { icon: '📈', name: 'Analysis', path: '/analytics' },
    { icon: '💰', name: 'Pricing', path: '/pricing' },
    { icon: '🤝', name: 'Affiliate', path: '/affiliate' },
  ]

  const bottomMenuItems = [
    { icon: '⚙️', name: 'Settings', path: '/settings' },
    { icon: '🚪', name: 'Sign out', path: '/signout' },
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '280px' : '80px',
        background: 'linear-gradient(180deg, #1f2937 0%, #111827 100%)',
        color: 'white',
        transition: 'width 0.3s ease',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        zIndex: 100
      }}>
        {/* Logo */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: '#f59e0b',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            🏗️
          </div>
          {sidebarOpen && (
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>ECS Test Pro</span>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'absolute',
            right: '-12px',
            top: '80px',
            width: '24px',
            height: '24px',
            background: '#f59e0b',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 101
          }}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>

        {/* Main Menu */}
        <nav style={{ padding: '20px 0' }}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                color: 'white',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                background: isActive(item.path) ? '#f59e0b' : 'transparent',
                borderLeft: isActive(item.path) ? '3px solid #fbbf24' : '3px solid transparent',
                marginBottom: '4px'
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'rgba(79, 70, 229, 0.2)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '20px 0' }} />

        {/* Bottom Menu */}
        <nav>
          {bottomMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                color: 'white',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                background: isActive(item.path) ? '#f59e0b' : 'transparent',
                borderLeft: isActive(item.path) ? '3px solid #fbbf24' : '3px solid transparent'
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{
        marginLeft: sidebarOpen ? '280px' : '80px',
        flex: 1,
        transition: 'margin-left 0.3s ease',
        padding: '20px',
        width: '100%'
      }}>
        {/* Top Header */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '15px 24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div>
            <h2 style={{ color: '#1f2937', fontSize: '20px', margin: 0 }}>
              {menuItems.find(item => isActive(item.path))?.name || 'Welcome'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ color: '#6b7280' }}>👋 {user?.name || 'there'}</span>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#f59e0b',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              JD
            </div>
          </div>
        </div>

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
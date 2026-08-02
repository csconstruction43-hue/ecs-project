import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Mock Tests', path: '/mock-test' },
    { name: 'ECS Cards', path: '/cards' },
    { name: 'Study Guide', path: '/study-guide' },
    { name: 'Blog', path: '/blog' },
    { name: 'Pricing', path: '/pricing' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-green-600">ECS</span>
            <span className="text-gray-800">MockTest</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-gray-700 hover:text-green-600 transition font-medium">
                {link.name}
              </Link>
            ))}
            <Link to="/pricing" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-semibold">
              Start Free
            </Link>
          </div>

          <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="block py-2 text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}
            <Link to="/pricing" className="block mt-3 bg-green-600 text-white text-center px-5 py-2 rounded-lg" onClick={() => setIsOpen(false)}>
              Start Free
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
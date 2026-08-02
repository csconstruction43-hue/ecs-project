import React, { useState } from 'react'
import { BookOpen, Download, ShoppingCart, Clock } from 'lucide-react'
import Seo from '../components/Seo'

function BookPage() {
  const [purchased, setPurchased] = useState(false)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Seo
        title="ECS Mock Test Study Book 2026 Edition | ECSPrep"
        description="Get the ECSPrep ECS Mock Test study book — a complete revision guide covering every topic in the official HSE Assessment, in print and digital."
        path="/book"
      />
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-purple-600 p-8 flex items-center justify-center">
            <div className="text-center text-white">
              <BookOpen size={80} className="mx-auto mb-4 opacity-80" />
              <h2 className="text-2xl font-bold">ECS Mock Test</h2>
              <p className="text-blue-200">2026 Edition</p>
            </div>
          </div>
          <div className="md:w-2/3 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ECS Mock Test Book 2026</h1>
            <p className="text-gray-600 mb-4">The complete guide to passing your ECS test first time.</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600"><Clock size={16} /> Updated for 2026</div>
            </div>
            <div className="mb-6"><div className="text-3xl font-bold text-gray-900">£4.90</div><p className="text-sm text-green-600">Includes 1 month Premium access</p></div>
            {!purchased ? (
              <button onClick={() => setPurchased(true)} className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                <ShoppingCart size={18} /> Buy Now - £4.90
              </button>
            ) : (
              <button className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                <Download size={18} /> Download PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookPage
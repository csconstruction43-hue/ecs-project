// pages/CertificatePage.jsx
// A printable "Certificate of Achievement" — Pro-only. Built with plain
// HTML/CSS + window.print() so it needs zero extra npm packages, works
// offline, and lets the user save it as a PDF via their browser's built-in
// print dialog ("Save as PDF" destination).
import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Trophy, Printer, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Seo from '../components/Seo'

function CertificatePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { testLabel, score, total, percentage } = location.state || {}

  if (!testLabel) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md text-center">
          <Trophy className="mx-auto text-gray-300 mb-4" size={40} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No certificate to show yet</h2>
          <p className="text-gray-600 mb-6">Pass a mock test first, then come back here from the results screen.</p>
          <Link to="/mock-test" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Take a mock test
          </Link>
        </div>
      </div>
    )
  }

  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const certificateId = `ECS-${Date.now().toString(36).toUpperCase()}`

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 print:bg-white print:py-0">
      <Seo title="Your Certificate | ECSPrep" path="/certificate" noindex />

      {/* Screen-only controls */}
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-6 print:hidden">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={18} /> Back to results
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          <Printer size={18} /> Print / Save as PDF
        </button>
      </div>

      {/* The certificate itself */}
      <div className="max-w-3xl mx-auto bg-white shadow-2xl print:shadow-none border-[10px] border-double border-blue-600 p-10 md:p-16 relative">
        <div className="absolute top-6 right-6 text-blue-500 opacity-20">
          <Trophy size={80} />
        </div>

        <div className="text-center mb-8">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-400 mb-2">ECSPrep</p>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-1">Certificate of Achievement</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4" />
        </div>

        <p className="text-center text-gray-500 mb-2">This certifies that</p>
        <p className="text-center text-3xl font-serif font-bold text-blue-900 mb-6">
          {user?.name || 'ECSPrep Student'}
        </p>

        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          has successfully passed the<br />
          <span className="font-semibold text-gray-900">{testLabel}</span><br />
          scoring <span className="font-semibold text-green-700">{score}/{total} ({percentage}%)</span>
        </p>

        <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
          <div>
            <p className="font-semibold text-gray-700">Date issued</p>
            <p>{dateStr}</p>
          </div>
          <div className="text-center">
            <Trophy className="mx-auto text-blue-500 mb-1" size={28} />
            <p className="text-xs">ECSPrep</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-700">Certificate ID</p>
            <p>{certificateId}</p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          This certificate confirms practice-test performance on ECSPrep. It is not an official ECS/ECS
          qualification — book your official test at citb.co.uk once you're consistently passing here.
        </p>
      </div>
    </div>
  )
}

export default CertificatePage

// pages/TeamAuditReportPage.jsx
// New feature: a printable, timestamped audit document of an employer's
// team roster and ECS card status — for site inductions, client audits, or
// a company's own compliance records. Same zero-dependency approach as
// CertificatePage.jsx: plain HTML/CSS + window.print() ("Save as PDF").
import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Printer, ArrowLeft, ClipboardList } from 'lucide-react'
import Seo from '../components/Seo'
import { useAuth } from '../context/AuthContext'
import { daysUntil, renewalStatus } from '../lib/cardRenewal'

const STATUS_LABELS = {
  expired: 'Expired',
  urgent: 'Renew urgently',
  soon: 'Renew soon',
  ok: 'Valid',
}

function TeamAuditReportPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const roster = location.state?.roster || []
  const companyName = location.state?.companyName || user?.companyName || ''
  const generatedAt = new Date().toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  if (roster.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md text-center">
          <ClipboardList className="mx-auto text-gray-300 mb-4" size={40} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No roster to report on</h2>
          <p className="text-gray-600 mb-6">Add team members on your Team Card Tracker first, then come back here.</p>
          <Link to="/team" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Go to Team Card Tracker
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 print:bg-white print:py-0">
      <Seo title="Compliance Audit Report | Team Card Tracker" path="/team/audit-report" noindex />

      <div className="max-w-3xl mx-auto flex items-center justify-between mb-6 print:hidden">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={18} /> Back to Team Card Tracker
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          <Printer size={18} /> Print / Save as PDF
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-lg print:shadow-none rounded-2xl print:rounded-none p-10 print:p-0">
        <div className="flex items-start justify-between border-b border-gray-200 pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ECS Card Compliance Audit Report</h1>
            {companyName && <p className="text-gray-600 mt-1">{companyName}</p>}
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Generated: {generatedAt}</p>
            <p>Team size: {roster.length}</p>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="text-left text-gray-500 uppercase text-xs border-b border-gray-200">
                <th className="py-2 pr-2">Name</th>
                <th className="py-2 pr-2">Role</th>
                <th className="py-2 pr-2">Card type</th>
                <th className="py-2 pr-2">Expiry date</th>
                <th className="py-2 pr-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((m) => {
                const days = m.expiryDate ? daysUntil(m.expiryDate) : null
                const status = days === null ? null : renewalStatus(days)
                return (
                  <tr key={m.id} className="border-b border-gray-100">
                    <td className="py-2 pr-2 font-medium text-gray-900">{m.name || '—'}</td>
                    <td className="py-2 pr-2 text-gray-600">{m.role || '—'}</td>
                    <td className="py-2 pr-2 text-gray-600">{m.cardType || '—'}</td>
                    <td className="py-2 pr-2 text-gray-600">{m.expiryDate || '—'}</td>
                    <td className="py-2 pr-2 text-gray-600">{status ? STATUS_LABELS[status] : 'No date set'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 mt-8 border-t border-gray-100 pt-4">
          This report reflects card expiry dates as entered by the employer in ECSPrep's Team Card Tracker and is
          intended as a compliance record for internal audits and site inductions — it is not a substitute for
          verifying each card directly with the ECS scheme.
        </p>
      </div>
    </div>
  )
}

export default TeamAuditReportPage

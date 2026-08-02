import React, { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock, Crown, RefreshCw } from 'lucide-react'
import { apiRequest } from '../../lib/api'

export default function AdminPaymentRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState({})

  const load = async () => {
    setLoading(true)
    try {
      const { requests: r } = await apiRequest('/api/admin/payment-requests')
      setRequests(r)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  const handlePlan = async (userId, plan) => {
    setProcessing(p => ({ ...p, [userId]: true }))
    try {
      await apiRequest(`/api/admin/users/${userId}/plan`, { method: 'PATCH', body: { plan } })
      await load()
    } catch (e) { alert(e.message) }
    finally { setProcessing(p => ({ ...p, [userId]: false })) }
  }

  const planColors = { weekly: 'text-blue-600 bg-blue-50', monthly: 'text-blue-600 bg-blue-50', lifetime: 'text-purple-600 bg-purple-50' }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Requests</h1>
          <p className="text-gray-500 text-sm mt-0.5">Approve or reject pending plan activation requests</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading requests…</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No pending payment requests</p>
          <p className="text-gray-400 text-sm mt-1">All requests have been processed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(user => (
            <div key={user.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Clock size={14} className="text-blue-500" />
                  <span className="text-xs text-gray-400">{user.pendingPlanAt ? new Date(user.pendingPlanAt).toLocaleString('en-GB') : ''}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Requested plan:</span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${planColors[user.pendingPlan] || 'text-gray-600 bg-gray-100'}`}>
                    <Crown size={12} /> {user.pendingPlan?.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePlan(user.id, 'free')}
                    disabled={processing[user.id]}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    <XCircle size={15} /> Reject
                  </button>
                  <button
                    onClick={() => handlePlan(user.id, user.pendingPlan)}
                    disabled={processing[user.id]}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-secondary rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <CheckCircle size={15} /> Activate {user.pendingPlan}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

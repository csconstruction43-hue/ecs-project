// components/LockedTestScreen.jsx
// Shows a preview of the test content with a paywall overlay.
// This ensures Google sees actual content (not thin pages) while protecting paid tests.
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaLock, FaCheckCircle, FaClock, FaArrowRight } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { extraTests } from '../data/extraTests'

export default function LockedTestScreen({ testName, testPath, previewQuestions: passedPreviewQuestions, testStats }) {
  const { isAuthenticated } = useAuth()
  const config = testPath ? extraTests[testPath] : null
  
  // Get first 3 questions as preview (if available)
  const previewQuestions = useMemo(() => {
    // Use passed preview questions first (for standalone test pages)
    if (passedPreviewQuestions && passedPreviewQuestions.length > 0) {
      return passedPreviewQuestions.slice(0, 3)
    }
    // Otherwise try to get from config
    if (!config) return []
    const questions = typeof config.getQuestions === 'function' 
      ? config.getQuestions() 
      : (config.questions || [])
    return questions.slice(0, 3)
  }, [config, passedPreviewQuestions])

  // Calculate test stats
  const passMark = testStats?.passMark ?? config?.passMark ?? 0.8
  const totalQuestions = testStats?.totalQuestions ?? config?.questions?.length ?? (config?.getQuestions ? 50 : 0)
  const testDuration = testStats?.duration ?? config?.duration ?? 1800
  const minutes = Math.floor(testDuration / 60)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header with test info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                {config?.icon} {testName}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {totalQuestions} questions | Pass mark: {Math.round(passMark * 100)}% | {minutes} minutes
              </p>
            </div>
            <div className="rounded-xl px-5 py-3 text-center bg-gray-100 border border-gray-200">
              <div className="text-3xl font-bold text-gray-600 flex items-center gap-2">
                <FaClock className="text-xl" />
                {minutes}:00
              </div>
              <p className="text-xs text-gray-500 mt-1">Test Duration</p>
            </div>
          </div>

          {config?.info && (
            <div className={`rounded-lg px-4 py-3 text-sm ${
              config.info.official 
                ? 'border border-green-200 bg-green-50 text-green-800' 
                : 'border border-blue-200 bg-blue-50 text-blue-800'
            }`}>
              <span className="font-semibold">
                {config.info.official ? '📘 Sourced from official ECS' : '⚠️ Unofficial practice questions'}
              </span>
              {config.info.official 
                ? ` From the published ECS revision guide.`
                : ` ${config.info.officialStatement}`}
            </div>
          )}
        </div>

        {/* Preview questions section */}
        {previewQuestions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 opacity-75 pointer-events-none">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-gray-400" /> Preview: Sample Questions
            </h2>
            <div className="space-y-6">
              {previewQuestions.map((q, idx) => (
                <div key={idx} className="border-l-4 border-gray-300 pl-4 py-2">
                  <p className="font-medium text-gray-700 mb-3">
                    <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2">Q{idx + 1}</span>
                    {q.text}
                  </p>
                  <div className="space-y-2">
                    {q.options?.map((opt, i) => (
                      <div key={i} className="text-gray-600 text-sm pl-6">
                        <span className="text-gray-400">{'ABCD'[i]}.</span> {opt}
                      </div>
                    )) || (
                      q.answers?.map((ans, i) => (
                        <div key={i} className="text-gray-600 text-sm pl-6">
                          <span className="text-gray-400">{'ABCD'[i]}.</span> {ans}
                        </div>
                      ))
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-3 italic">
                    💡 Full explanation available to Pro members
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Paywall overlay card */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl overflow-hidden border-2 border-purple-200">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <FaLock className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Unlock Full Test Access</h2>
            <p className="text-white/90">Upgrade to Pro to take the complete test with instant AI explanations</p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" /> With Free Preview
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ See sample questions</li>
                  <li>✓ View test structure</li>
                  <li>✓ Read official guidance</li>
                  <li>✗ Cannot submit answers</li>
                  <li>✗ No AI explanations</li>
                  <li>✗ No progress tracking</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-blue-600" /> With Pro Upgrade
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 font-medium">
                  <li>✓ Full test access</li>
                  <li>✓ All {totalQuestions} questions</li>
                  <li>✓ AI answer explanations</li>
                  <li>✓ Real-time scoring</li>
                  <li>✓ Full analytics</li>
                  <li>✓ Unlimited attempts</li>
                </ul>
              </div>
            </div>

            <Link
              to="/plans"
              className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition text-center text-lg mb-3 flex items-center justify-center gap-2"
            >
              {isAuthenticated ? 'Upgrade to Pro' : 'Sign up & See Plans'} <FaArrowRight />
            </Link>

            <Link 
              to="/mock-test" 
              className="block text-center text-gray-500 hover:text-gray-700 font-medium py-2"
            >
              ← Back to available tests
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

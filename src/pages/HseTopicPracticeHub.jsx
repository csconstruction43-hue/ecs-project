// pages/HseTopicPracticeHub.jsx
// Lets users drill any one of the 11 official ECS HSE topics individually,
// using only official questions from the real 327-question ECS bank
// (filtered per topic). Complements the full 50-question HSE Assessment.
import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { hseTopicPracticeTests } from '../data/extraTests'
import { HSE_EXAM_INFO } from '../data/officialEcsHse'

function HseTopicPracticeHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <Seo
        title="HSE Topic Practice | ECS Questions by Topic"
        description="Drill any of the 11 published ECS HSE Assessment topics individually, using real questions from the published ECS question bank."
        path="/ecs-hse-practice"
      />
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🦺 HSE Topic Practice</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Practice the ECS HSE Assessment one topic at a time. Every question below comes
            straight from the real, published ECS question bank ({HSE_EXAM_INFO.sourceNote}) — just filtered
            to a single topic, so you can focus your revision exactly where you need it.
          </p>
          <Link
            to="/ecs-hse-assessment"
            className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Take the full 50-question HSE Assessment instead →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hseTopicPracticeTests.map((t) => (
            <Link
              key={t.path}
              to={t.path}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-5 transition group"
            >
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1 group-hover:text-green-600 transition">{t.category}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {t.total} questions available
                {t.questionsInExam ? ` · ${t.questionsInExam} appear in each real 50-question exam` : ''}
              </p>
              <span className="inline-block text-xs font-semibold bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
                📘 Published ECS questions
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HseTopicPracticeHub

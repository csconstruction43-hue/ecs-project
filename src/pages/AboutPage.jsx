// pages/AboutPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import Seo from '../components/Seo'

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Seo
        title="About Us | ECSPrep ECS Test Practice Platform"
        description="Learn about ECSPrep — a free platform built to help electricians and construction workers pass their ECS Health, Safety & Environment test with confidence."
        path="/about"
      />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-blue-50 rounded-xl">
          <Users size={22} className="text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
      </div>
      <p className="text-gray-500 text-sm mb-10">Who we are and why we built ECSPrep</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Our mission</h2>
          <p>ECSPrep was built to help electricians, apprentices, and construction workers across the UK prepare for and pass their ECS Health, Safety & Environment test on the first attempt. The ECS test is a required step for anyone applying for a Green, Gold, Black, or Skilled Worker ECS card, and we saw that many candidates struggled to find clear, up-to-date, and genuinely free practice material — so we built it ourselves.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">What we offer</h2>
          <p>Our platform provides free mock tests built on the published ECS/HSE syllabus, covering every card type. Alongside practice questions, we offer study guides, topic-by-topic revision tools, flashcards, safety sign reference material, and calculators that are useful day-to-day on site. Everything is designed to reflect the real exam format, including the timed 30-minute structure and the official 86% pass mark.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Who it's for</h2>
          <p>Whether you're a first-time apprentice booking your ECS test for the first time, or an experienced tradesperson renewing your card, ECSPrep is built to make revision straightforward — accessible on mobile or desktop, and free to get started with no card required.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Get in touch</h2>
          <p>Have feedback, spotted an error in a question, or want to suggest something we should add? We'd love to hear from you at <a href="mailto:support@electricianprep.co.uk" className="text-blue-600 hover:underline">support@electricianprep.co.uk</a>.</p>
        </section>
      </div>

      <Link to="/" className="inline-block mt-10 text-blue-600 hover:underline text-sm font-medium">← Back to home</Link>
    </div>
  )
}

export default AboutPage

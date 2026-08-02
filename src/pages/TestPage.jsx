import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import QuestionAudio from '../components/QuestionAudio'
import Seo from '../components/Seo'
import { useAuth } from '../context/AuthContext'

function TestPage() {
  const { topic } = useParams()
  const { isPro } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  // Sample questions
  const questions = {
    'green-card': [
      {
        text: "What does PPE stand for?",
        options: ["Personal Protective Equipment", "Public Protection Equipment", "Personal Property Equipment"],
        correct: "Personal Protective Equipment",
        explanation: "PPE stands for Personal Protective Equipment including hard hats, gloves, and safety boots."
      },
      {
        text: "What is the most common cause of accidents on construction sites?",
        options: ["Falling from height", "Slips and trips", "Electrical shocks"],
        correct: "Slips and trips",
        explanation: "Slips and trips are the most common cause of workplace injuries."
      }
    ],
    'default': [
      {
        text: "What should you do if you find a fire on site?",
        options: ["Run away", "Raise alarm and evacuate", "Try to put it out yourself"],
        correct: "Raise alarm and evacuate",
        explanation: "Always raise alarm immediately and evacuate the area."
      }
    ]
  }

  const questionList = questions[topic] || questions['default']
  const currentQ = questionList[currentQuestion]

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    const isCorrect = answer === currentQ.correct
    if (isCorrect) setScore(score + 1)
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestion + 1 < questionList.length) {
      setCurrentQuestion(currentQuestion + 1)
      setShowResult(false)
      setSelectedAnswer(null)
    } else {
      // Test completed
      alert(`Test Complete! Your score: ${score + (selectedAnswer === currentQ.correct ? 1 : 0)}/${questionList.length}`)
      window.location.href = '/'
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
      <Seo
        title="ECS Topic Test: Practice Questions by Category"
        description="Practice ECS test questions by topic with instant feedback, so you can target your weak areas before sitting the real HSE assessment."
        path="/test"
      />
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {/* Progress */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Question {currentQuestion + 1} of {questionList.length}</span>
            <span>Score: {score}</span>
          </div>
          <div style={{ backgroundColor: '#e5e7eb', borderRadius: '10px', height: '8px' }}>
            <div style={{
              backgroundColor: '#22c55e',
              borderRadius: '10px',
              height: '8px',
              width: `${((currentQuestion + 1) / questionList.length) * 100}%`
            }} />
          </div>
        </div>

        {/* Question */}
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>{currentQ.text}</h2>
        <QuestionAudio text={currentQ.text} isPro={isPro} />

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showResult && handleAnswer(option)}
              style={{
                padding: '16px',
                textAlign: 'left',
                border: `2px solid ${showResult && option === currentQ.correct ? '#22c55e' : showResult && selectedAnswer === option ? '#ef4444' : '#e5e7eb'}`,
                borderRadius: '8px',
                backgroundColor: showResult && option === currentQ.correct ? '#f0fdf4' : showResult && selectedAnswer === option ? '#fef2f2' : 'white',
                cursor: showResult ? 'default' : 'pointer',
                transition: 'all 0.2s'
              }}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Result & Explanation */}
        {showResult && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: selectedAnswer === currentQ.correct ? '#f0fdf4' : '#fef2f2',
            borderRadius: '8px'
          }}>
            <p style={{
              fontWeight: 'bold',
              color: selectedAnswer === currentQ.correct ? '#166534' : '#991b1b',
              marginBottom: '8px'
            }}>
              {selectedAnswer === currentQ.correct ? '✅ Correct!' : '❌ Incorrect!'}
            </p>
            <p style={{ color: '#4b5563' }}>{currentQ.explanation}</p>
            <button
              onClick={nextQuestion}
              style={{
                marginTop: '16px',
                backgroundColor: '#22c55e',
                color: 'white',
                padding: '10px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {currentQuestion + 1 < questionList.length ? 'Next Question →' : 'Finish Test'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TestPage
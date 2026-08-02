import React, { useState } from 'react'
import { FaCheck, FaTimes, FaLightbulb } from 'react-icons/fa'
import AIExplainButton from './AIExplainButton'
import QuestionAudio from './QuestionAudio'

function QuestionCard({ question, onAnswer, showExplanation, currentNumber, totalQuestions, isPro }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    setShowResult(true)
    const isCorrect = answer === question.correctAnswer
    onAnswer(isCorrect, question.explanation)
  }

  const nextQuestion = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    onAnswer(null, null, true)
  }

  return (
    <div className="card">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentNumber} of {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${(currentNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl font-semibold mb-4">{question.text}</h3>

      <QuestionAudio text={question.text} isPro={isPro} />

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !showResult && handleAnswer(option)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              showResult
                ? option === question.correctAnswer
                  ? 'bg-green-50 border-green-500'
                  : selectedAnswer === option
                  ? 'bg-red-50 border-red-500'
                  : 'border-gray-200'
                : 'hover:bg-gray-50 border-gray-200 hover:border-primary'
            }`}
            disabled={showResult}
          >
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-500">{String.fromCharCode(65 + idx)}.</span>
              <span>{option}</span>
              {showResult && option === question.correctAnswer && <FaCheck className="text-green-500 ml-auto" />}
              {showResult && selectedAnswer === option && option !== question.correctAnswer && <FaTimes className="text-red-500 ml-auto" />}
            </div>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showResult && showExplanation && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className="text-blue-600" />
            <span className="font-semibold text-blue-800">Explanation</span>
          </div>
          <p className="text-gray-700">{question.explanation}</p>
          <AIExplainButton
            question={question.text}
            options={question.options}
            correctAnswer={question.correctAnswer}
            userAnswer={selectedAnswer}
            topic="ECS Black Card (Manager) Test"
          />
          <button 
            onClick={nextQuestion}
            className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition w-full"
          >
            {currentNumber < totalQuestions ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  )
}

export default QuestionCard
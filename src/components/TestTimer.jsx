import React, { useState, useEffect } from 'react'

function TestTimer({ duration, onTimeEnd }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeEnd()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeEnd])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const getTimerColor = () => {
    if (timeLeft < 60) return 'text-red-600'
    if (timeLeft < 300) return 'text-blue-500'
    return 'text-green-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <div className="text-sm text-gray-600 mb-1">Time Remaining</div>
      <div className={`text-3xl font-bold ${getTimerColor()}`}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
    </div>
  )
}

export default TestTimer
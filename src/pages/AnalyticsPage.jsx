import React, { useState, useEffect } from 'react'
import { BarChart3, Calendar, Flame, TrendingUp, Target, Clock, Award, Brain, Download, Share2, ChevronRight, AlertCircle, Star, Zap } from 'lucide-react'

function AnalyticsPage() {
  const [weeklyGoal, setWeeklyGoal] = useState(5)
  const [testsThisWeek, setTestsThisWeek] = useState(0)
  const [streak, setStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [totalTests, setTotalTests] = useState(0)
  const [averageScore, setAverageScore] = useState(0)
  const [testHistory, setTestHistory] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState('week') // week, month, year

  // Mock data for demonstration
  useEffect(() => {
    // Load test history from localStorage
    const savedHistory = localStorage.getItem('testHistory')
    if (savedHistory) {
      const history = JSON.parse(savedHistory)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
      setTestHistory(history)
      calculateStats(history)
    } else {
      // Sample data for demo
      const sampleHistory = generateSampleData()
      setTestHistory(sampleHistory)
      calculateStats(sampleHistory)
    }
  }, [])

  const generateSampleData = () => {
    const data = []
    const today = new Date()
    for (let i = 0; i < 20; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      data.push({
        id: i,
        date: date.toISOString(),
        score: Math.floor(Math.random() * 40) + 60, // 60-100
        subject: ['Math', 'Science', 'English', 'History'][Math.floor(Math.random() * 4)],
        duration: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
        questions: Math.floor(Math.random() * 20) + 10,
        correct: Math.floor(Math.random() * 15) + 5
      })
    }
    return data.sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  const calculateStats = (history) => {
    // Calculate tests this week
    const now = new Date()
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
    const thisWeekTests = history.filter(test => new Date(test.date) >= weekStart)
    setTestsThisWeek(thisWeekTests.length)
    setTotalTests(history.length)
    
    // Calculate average score
    const avg = history.reduce((sum, test) => sum + test.score, 0) / history.length
    setAverageScore(Math.round(avg))
    
    // Calculate streak
    let currentStreak = 0
    let maxStreak = 0
    const dates = [...new Set(history.map(test => new Date(test.date).toDateString()))]
    dates.sort((a, b) => new Date(a) - new Date(b))
    
    for (let i = 0; i < dates.length; i++) {
      const currentDate = new Date(dates[i])
      const prevDate = i > 0 ? new Date(dates[i-1]) : null
      
      if (prevDate) {
        const diffDays = (currentDate - prevDate) / (1000 * 60 * 60 * 24)
        if (diffDays === 1) {
          currentStreak++
        } else {
          currentStreak = 1
        }
      } else {
        currentStreak = 1
      }
      maxStreak = Math.max(maxStreak, currentStreak)
    }
    
    setStreak(currentStreak)
    setLongestStreak(maxStreak)
  }

  const getLast7Tests = () => {
    return testHistory.slice(-7).map(test => test.score)
  }

  const getSubjectPerformance = () => {
    const subjects = {}
    testHistory.forEach(test => {
      if (!subjects[test.subject]) {
        subjects[test.subject] = { total: 0, count: 0 }
      }
      subjects[test.subject].total += test.score
      subjects[test.subject].count++
    })
    return subjects
  }

  const getPerformanceByTime = () => {
    const timeSlots = {
      'Morning (6-12)': { total: 0, count: 0 },
      'Afternoon (12-17)': { total: 0, count: 0 },
      'Evening (17-21)': { total: 0, count: 0 },
      'Night (21-6)': { total: 0, count: 0 }
    }
    
    testHistory.forEach(test => {
      const hour = new Date(test.date).getHours()
      let slot = 'Afternoon (12-17)'
      if (hour >= 6 && hour < 12) slot = 'Morning (6-12)'
      else if (hour >= 17 && hour < 21) slot = 'Evening (17-21)'
      else if (hour >= 21 || hour < 6) slot = 'Night (21-6)'
      
      timeSlots[slot].total += test.score
      timeSlots[slot].count++
    })
    
    return timeSlots
  }

  const calculateImprovement = () => {
    const last5 = testHistory.slice(-5).map(t => t.score)
    const prev5 = testHistory.slice(-10, -5).map(t => t.score)
    if (last5.length === 0 || prev5.length === 0) return 0
    const lastAvg = last5.reduce((a, b) => a + b, 0) / last5.length
    const prevAvg = prev5.reduce((a, b) => a + b, 0) / prev5.length
    return ((lastAvg - prevAvg) / prevAvg * 100).toFixed(1)
  }

  const getWeeklyData = () => {
    const weeks = {}
    testHistory.forEach(test => {
      const date = new Date(test.date)
      const weekNum = getWeekNumber(date)
      if (!weeks[weekNum]) weeks[weekNum] = { scores: [], count: 0 }
      weeks[weekNum].scores.push(test.score)
      weeks[weekNum].count++
    })
    return Object.values(weeks).slice(-4).map(week => ({
      avg: week.scores.reduce((a, b) => a + b, 0) / week.scores.length,
      count: week.count
    }))
  }

  const getWeekNumber = (date) => {
    const start = new Date(date.getFullYear(), 0, 1)
    const days = Math.floor((date - start) / (24 * 60 * 60 * 1000))
    return Math.ceil((days + start.getDay() + 1) / 7)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(testHistory, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `test-analytics-${new Date().toISOString()}.json`
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const shareReport = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Test Analytics Report',
        text: `I've completed ${totalTests} tests with an average score of ${averageScore}%! My current streak is ${streak} days!`,
        url: window.location.href
      })
    } else {
      alert('Share feature not supported in your browser')
    }
  }

  const last7Scores = getLast7Tests()
  const subjectPerformance = getSubjectPerformance()
  const timePerformance = getPerformanceByTime()
  const improvement = calculateImprovement()
  const weeklyData = getWeeklyData()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Premium Badge */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star className="text-slate-300 fill-current" size={24} />
            <div>
              <h2 className="font-bold text-lg">Pro Analytics Dashboard</h2>
              <p className="text-sm opacity-90">Advanced insights and predictions</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={exportData} className="bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
              <Download size={16} /> Export
            </button>
            <button onClick={shareReport} className="bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1 text-sm flex items-center gap-1">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <BarChart3 size={32} className="text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Analytics Pro</h1>
        <div className="ml-auto flex gap-2">
          <button 
            onClick={() => setSelectedPeriod('week')}
            className={`px-3 py-1 rounded-lg text-sm ${selectedPeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Week
          </button>
          <button 
            onClick={() => setSelectedPeriod('month')}
            className={`px-3 py-1 rounded-lg text-sm ${selectedPeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Month
          </button>
          <button 
            onClick={() => setSelectedPeriod('year')}
            className={`px-3 py-1 rounded-lg text-sm ${selectedPeriod === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Brain className="text-blue-600" size={20} />
            <span className="text-xs text-gray-500">Total Tests</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalTests}</div>
          <div className="text-sm text-gray-600">Avg Score: {averageScore}%</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="text-xs text-gray-500">Improvement</span>
          </div>
          <div className={`text-2xl font-bold ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {improvement > 0 ? '+' : ''}{improvement}%
          </div>
          <div className="text-sm text-gray-600">Last 5 vs Previous 5</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Flame className="text-blue-500" size={20} />
            <span className="text-xs text-gray-500">Streak</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{streak} days</div>
          <div className="text-sm text-gray-600">Best: {longestStreak} days</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="text-purple-600" size={20} />
            <span className="text-xs text-gray-500">Weekly Goal</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{testsThisWeek}/{weeklyGoal}</div>
          <div className="text-sm text-gray-600">{weeklyGoal - testsThisWeek} remaining</div>
        </div>
      </div>

      {/* Weekly Goal Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Target size={20} className="text-blue-600" />
          WEEKLY GOAL TRACKER
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">{testsThisWeek} of {weeklyGoal} tests this week</span>
          <span className="text-sm font-medium text-blue-600">{Math.round((testsThisWeek / weeklyGoal) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500" 
               style={{ width: `${Math.min((testsThisWeek / weeklyGoal) * 100, 100)}%` }}>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-2">
            {[3, 5, 7, 10].map(num => (
              <button key={num} onClick={() => setWeeklyGoal(num)} 
                className={`px-3 py-1 rounded-lg text-sm transition-all ${weeklyGoal === num ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {num} tests
              </button>
            ))}
          </div>
          {testsThisWeek >= weeklyGoal && (
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <Award size={16} /> Goal achieved! Great job!
            </div>
          )}
        </div>
      </div>

      {/* Score Trend Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          SCORE TREND - LAST 7 TESTS
        </h3>
        {last7Scores.length >= 2 ? (
          <div>
            <div className="flex items-end gap-2 h-48 mb-4">
              {last7Scores.map((score, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-gray-600 mb-1">{score}%</div>
                  <div className="w-full bg-gradient-to-t from-blue-100 to-blue-200 rounded-t-lg transition-all duration-300 hover:from-blue-200 hover:to-blue-300"
                       style={{ height: `${(score / 100) * 120}px` }}>
                    <div className="w-full bg-blue-600 rounded-t-lg transition-all duration-500"
                         style={{ height: `${(score / 100) * 100}%` }}>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Test {index + 1}</div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Trend Analysis:</span>
                <span className={`font-semibold ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {improvement >= 0 ? '↑' : '↓'} {Math.abs(improvement)}% {improvement >= 0 ? 'improvement' : 'decline'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">Take at least 2 tests to see your score trend and get personalized insights!</p>
          </div>
        )}
      </div>

      {/* Subject Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Brain size={20} className="text-blue-600" />
            SUBJECT PERFORMANCE
          </h3>
          {Object.keys(subjectPerformance).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(subjectPerformance).map(([subject, data]) => (
                <div key={subject}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{subject}</span>
                    <span className="text-gray-600">{Math.round(data.total / data.count)}% ({data.count} tests)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                         style={{ width: `${(data.total / data.count)}%` }}>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Complete tests in different subjects to see your performance breakdown</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-blue-600" />
            PEAK PERFORMANCE TIME
          </h3>
          {Object.values(timePerformance).some(slot => slot.count > 0) ? (
            <div className="space-y-3">
              {Object.entries(timePerformance).map(([timeSlot, data]) => (
                data.count > 0 && (
                  <div key={timeSlot}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{timeSlot}</span>
                      <span className="text-gray-600">{Math.round(data.total / data.count)}% avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-red-500 h-2 rounded-full transition-all duration-500"
                           style={{ width: `${data.total / data.count}%` }}>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Take tests at different times to discover your peak performance hours</p>
          )}
        </div>
      </div>

      {/* Weekly Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-blue-600" />
          WEEKLY COMPARISON
        </h3>
        {weeklyData.length >= 2 ? (
          <div className="space-y-4">
            <div className="flex items-end gap-3 h-32">
              {weeklyData.map((week, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className="text-xs text-gray-600 mb-1">{week.avg.toFixed(0)}%</div>
                  <div className="bg-blue-100 rounded-t-lg transition-all duration-300"
                       style={{ height: `${(week.avg / 100) * 80}px` }}>
                    <div className="bg-blue-600 rounded-t-lg transition-all duration-500"
                         style={{ height: `${(week.avg / 100) * 100}%` }}>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Week {index + 1}</div>
                  <div className="text-xs text-gray-400">{week.count} tests</div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-3 border border-slate-100">
              <div className="flex items-center gap-2 text-sm">
                <Zap size={16} className="text-slate-600" />
                <span className="text-gray-700">Insight:</span>
                <span className="text-gray-600">
                  {weeklyData[weeklyData.length - 1].avg > weeklyData[0].avg 
                    ? "You're on an upward trend! Keep up the momentum! 🚀"
                    : "Try studying consistently to improve your scores! 💪"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">Complete tests for 2+ weeks to see your progress over time</p>
        )}
      </div>

      {/* Pro Features Callout */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 rounded-full p-2">
            <Star size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1">Pro Exclusive Features</h3>
            <p className="text-sm text-gray-600 mb-3">Upgrade to unlock even more powerful analytics:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <ChevronRight size={16} className="text-blue-600" />
                <span>AI-powered predictions</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight size={16} className="text-blue-600" />
                <span>Detailed question analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight size={16} className="text-blue-600" />
                <span>Custom report generation</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight size={16} className="text-blue-600" />
                <span>Competitor benchmarking</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight size={16} className="text-blue-600" />
                <span>Study schedule optimizer</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight size={16} className="text-blue-600" />
                <span>Email progress reports</span>
              </div>
            </div>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2">
              Upgrade to Pro Plus <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
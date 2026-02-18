'use client'

import { User } from '@/types'
import { TrendingUp, TrendingDown, Target, Zap, Clock, Award, BookOpen, AlertCircle } from 'lucide-react'

// Simple Line Chart Component
const LineChart = () => {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-48">
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`h-${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="rgba(100,116,139,0.2)" strokeWidth="1" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="200" stroke="rgba(100,116,139,0.2)" strokeWidth="1" />
      ))}
      
      {/* Line 1 (Cyan) */}
      <polyline
        points="0,120 50,100 100,110 150,80 200,70 250,85 300,60 350,75 400,50"
        fill="none"
        stroke="rgb(34, 197, 231)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Line 2 (Purple) */}
      <polyline
        points="0,150 50,130 100,140 150,110 200,95 250,110 300,90 350,105 400,80"
        fill="none"
        stroke="rgb(168, 85, 247)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="5,5"
      />
      
      {/* X-axis labels */}
      <text x="50" y="195" textAnchor="middle" className="text-xs fill-slate-500">Jan</text>
      <text x="150" y="195" textAnchor="middle" className="text-xs fill-slate-500">Feb</text>
      <text x="250" y="195" textAnchor="middle" className="text-xs fill-slate-500">Mar</text>
      <text x="350" y="195" textAnchor="middle" className="text-xs fill-slate-500">Apr</text>
    </svg>
  )
}

// Simple Pie Chart Component
const PieChart = ({ primary = true }) => {
  const radius = 40
  const cx = 50
  const cy = 50
  
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      {/* Background circle */}
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(100,116,139,0.2)" strokeWidth="8" />
      
      {/* Sales segment (Sales: 40%) - 144 degrees */}
      <path
        d={`M ${cx} ${cy - radius} A ${radius} ${radius} 0 0 1 ${cx + radius * Math.cos(-2.513)} ${cy + radius * Math.sin(-2.513)} L ${cx} ${cy} Z`}
        fill={primary ? 'rgb(59, 130, 246)' : 'rgb(59, 130, 246)'}
      />
      
      {/* Setup segment (Setup: 35%) - 126 degrees */}
      <path
        d={`M ${cx + radius * Math.cos(-2.513)} ${cy + radius * Math.sin(-2.513)} A ${radius} ${radius} 0 0 1 ${cx - radius * 0.3} ${cy + radius * 0.95} L ${cx} ${cy} Z`}
        fill={primary ? 'rgb(139, 92, 246)' : 'rgb(139, 92, 246)'}
      />
      
      {/* Bug segment (Bug: 15%) - 54 degrees */}
      <path
        d={`M ${cx - radius * 0.3} ${cy + radius * 0.95} A ${radius} ${radius} 0 0 1 ${cx} ${cy - radius} L ${cx} ${cy} Z`}
        fill={primary ? 'rgb(99, 102, 241)' : 'rgb(6, 182, 212)'}
      />
      
      {/* Features segment (Features: 10%) - 36 degrees */}
      <path
        d={`M ${cx + radius * Math.cos(-0.628)} ${cy + radius * Math.sin(-0.628)} A ${radius} ${radius} 0 0 1 ${cx} ${cy - radius} L ${cx} ${cy} Z`}
        fill={primary ? 'rgb(168, 85, 247)' : 'rgb(168, 85, 247)'}
      />
      
      {/* Center circle for donut effect */}
      <circle cx={cx} cy={cy} r={radius * 0.5} fill="rgb(15, 23, 42)" />
    </svg>
  )
}

// Simple Bar Chart Component
const BarChart = () => {
  const bars = [
    { label: 'Mon', value: 45, color: 'rgb(99, 102, 241)' },
    { label: 'Tue', value: 62, color: 'rgb(139, 92, 246)' },
    { label: 'Wed', value: 38, color: 'rgb(168, 85, 247)' },
    { label: 'Thu', value: 75, color: 'rgb(168, 85, 247)' },
    { label: 'Fri', value: 55, color: 'rgb(99, 102, 241)' },
    { label: 'Sat', value: 40, color: 'rgb(6, 182, 212)' },
  ]

  return (
    <svg viewBox="0 0 360 200" className="w-full h-40">
      {/* Grid lines */}
      {[0, 1, 2].map((i) => (
        <line key={`grid-${i}`} x1="0" y1={180 - i * 60} x2="360" y2={180 - i * 60} stroke="rgba(100,116,139,0.2)" strokeWidth="1" />
      ))}
      
      {bars.map((bar, idx) => {
        const barWidth = 40
        const barHeight = (bar.value / 100) * 150
        const x = idx * 60 + 10
        const y = 180 - barHeight

        return (
          <g key={idx}>
            <rect x={x} y={y} width={barWidth} height={barHeight} fill={bar.color} rx="4" />
            <text x={x + barWidth / 2} y="195" textAnchor="middle" className="text-xs fill-slate-500">
              {bar.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function OverviewSection({ user }: { user: User }) {
  const userLevel = Math.floor(user.lessonsCompleted / 2) + 1
  const userXP = (user.lessonsCompleted * 100) + (user.labsCompleted * 150) + (user.quizScore * 10)
  const completionPercentage = Math.round((user.lessonsCompleted / 10) * 100)

  const stats = [
    { 
      label: 'Avg Response Time',
      value: '2m 30s',
      subtext: 'Min',
      icon: Clock,
      gradient: 'from-pink-600 to-pink-500',
      secondary: '15 min',
      secondaryLabel: 'Resolve'
    },
    { 
      label: 'Session Duration',
      value: '45.8',
      subtext: 'Hours',
      icon: TrendingUp,
      gradient: 'from-cyan-600 to-cyan-500',
      trend: 'up'
    },
    { 
      label: 'Conversations',
      value: '1.2K',
      subtext: 'Messages',
      icon: BookOpen,
      gradient: 'from-purple-600 to-purple-500',
    },
    { 
      label: 'Engagement',
      value: '92%',
      subtext: 'Emails',
      icon: Zap,
      gradient: 'from-cyan-600 to-blue-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 text-white shadow-lg overflow-hidden relative group hover:shadow-xl transition`}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Icon size={24} />
                  </div>
                  {stat.trend === 'up' && <TrendingUp size={24} className="text-white/70" />}
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm opacity-90 font-medium">{stat.label}</p>
                  <div className="flex items-end gap-2">
                    <p className="text-4xl font-bold">{stat.value}</p>
                    <p className="text-sm opacity-80">{stat.subtext}</p>
                  </div>
                  
                  {stat.secondary && (
                    <div className="text-xs opacity-75 pt-2">
                      {stat.secondaryLabel}: <span className="font-semibold">{stat.secondary}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart - 2 cols */}
        <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-8 border border-slate-700/50 shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Lessons vs Labs Completion</h3>
              <p className="text-sm text-slate-400 mt-1">Monthly progress tracking</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                <span className="text-xs text-slate-400">Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" style={{ borderStyle: 'dashed' }}></div>
                <span className="text-xs text-slate-400">Labs</span>
              </div>
            </div>
          </div>
          <LineChart />
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-700/50">
            <div>
              <p className="text-xs text-slate-500 mb-1">Max Lessons</p>
              <p className="text-2xl font-bold text-cyan-400">{user.lessonsCompleted}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Max Labs</p>
              <p className="text-2xl font-bold text-purple-400">{user.labsCompleted}</p>
            </div>
          </div>
        </div>

        {/* Pie Chart - Right side */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700/50 shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold text-white mb-6 w-full">Skill Distribution</h3>
          <PieChart />
          <div className="w-full mt-8 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Security</span>
              <span className="text-sm font-bold text-blue-400">40%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Automation</span>
              <span className="text-sm font-bold text-purple-400">35%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Analysis</span>
              <span className="text-sm font-bold text-indigo-400">15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Tools</span>
              <span className="text-sm font-bold text-cyan-400">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Bar Chart and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-8 border border-slate-700/50 shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Weekly Learning Hours</h3>
              <p className="text-sm text-slate-400 mt-1">Time spent per day</p>
            </div>
            <button className="text-slate-400 hover:text-white">⋯</button>
          </div>
          <BarChart />
        </div>

        {/* Progress Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700/50 rounded-2xl p-8 border border-slate-700/50 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">Overall Progress</h3>
          
          <div className="space-y-6">
            {/* Level Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Level {userLevel}</span>
                <span className="text-sm font-bold text-blue-400">{completionPercentage}%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* XP Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Total XP</span>
                <span className="text-sm font-bold text-cyan-400">{userXP}</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-500 transition-all duration-300"
                  style={{ width: `${(userXP % 1000) / 10}%` }}
                ></div>
              </div>
            </div>

            {/* Quiz Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Quiz Mastery</span>
                <span className="text-sm font-bold text-purple-400">{user.quizScore}%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-500 transition-all duration-300"
                  style={{ width: `${user.quizScore}%` }}
                ></div>
              </div>
            </div>

            {/* Streak */}
            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg p-4 border border-orange-700/30 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-orange-400" />
                  <span className="text-sm text-slate-400">Current Streak</span>
                </div>
                <span className="text-2xl font-bold text-orange-400">{user.streakDays || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700/50 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-6">Active Learning Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Master PowerShell', progress: 75, status: 'On Track', color: 'from-blue-600' },
            { title: 'Network Security Cert', progress: 60, status: 'In Progress', color: 'from-purple-600' },
            { title: 'Incident Response', progress: 85, status: 'Almost Done', color: 'from-green-600' },
          ].map((goal, idx) => (
            <div key={idx} className="bg-slate-700/50 rounded-lg p-6 border border-slate-600/50 hover:border-slate-500 transition">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-white">{goal.title}</h4>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-600 text-slate-200">{goal.status}</span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Progress</span>
                  <span className="text-sm font-bold text-cyan-400">{goal.progress}%</span>
                </div>
                <div className="h-3 bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${goal.color} to-blue-500 transition-all duration-300`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Card */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700/50 to-slate-800 rounded-2xl p-8 border border-slate-700/50 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600/20 rounded-lg flex-shrink-0">
            <AlertCircle size={24} className="text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Keep Your Momentum!</h3>
            <p className="text-slate-400 text-sm">You're on a {user.streakDays || 0}-day learning streak! Complete one more lesson today to maintain your momentum and unlock a bonus achievement.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

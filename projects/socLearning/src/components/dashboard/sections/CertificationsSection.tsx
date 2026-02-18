'use client'

import { Certification } from '@/types'
import { certificationsData } from '@/lib/data'
import { Award, Lock, CheckCircle, Clock, Zap, Share2, Download, Calendar, Target, BookOpen } from 'lucide-react'
import { useState, useMemo } from 'react'

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
    case 'Intermediate': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
    case 'Advanced': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
    case 'Expert': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    default: return 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300'
  }
}

const CertificateImage = ({ cert }: { cert: Certification }) => {
  const gradients = {
    1: 'from-blue-600 to-blue-900',
    2: 'from-purple-600 to-purple-900',
    3: 'from-amber-600 to-amber-900',
    4: 'from-pink-600 to-pink-900',
    5: 'from-green-600 to-green-900',
  }
  
  const gradient = gradients[cert.id as keyof typeof gradients]
  
  return (
    <div className={`bg-gradient-to-br ${gradient} p-8 rounded-lg text-white relative overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
      
      {/* Certificate content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-sm uppercase tracking-widest opacity-75 mb-2">Blue Team Academy</div>
          <div className="text-2xl font-bold">CERTIFICATE</div>
          <div className="w-16 h-1 bg-white/30 mt-2"></div>
        </div>
        
        {/* Main content */}
        <div className="mb-8">
          <div className="text-xs opacity-75 mb-2">This is to certify that</div>
          <div className="text-xl font-bold mb-4">{cert.name}</div>
          <div className="text-sm opacity-90 mb-6">has completed the requirements for</div>
          <div className="flex items-center gap-4 mb-8">
            <div className="text-4xl">{cert.icon}</div>
            <div>
              <div className="text-sm opacity-75">Credential ID</div>
              <div className="font-mono text-sm">{cert.credentialId || `BTAN-${cert.id}-2024`}</div>
            </div>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="border-t border-white/30 pt-4 flex justify-between text-xs">
          <div>
            <div className="opacity-75">Valid for {cert.validityYears} years</div>
          </div>
          <div className="text-right">
            <div className="opacity-75">Issued • Feb 2026</div>
          </div>
        </div>
      </div>
      
      {/* Seal/Badge */}
      <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/30">
        <Award size={24} className="text-white" />
      </div>
    </div>
  )
}

interface CertificationDetailProps {
  cert: Certification
  onClose: () => void
}

function CertificationDetail({ cert, onClose }: CertificationDetailProps) {
  const statusColor = {
    earned: 'from-green-500 to-emerald-600',
    'in-progress': 'from-blue-500 to-cyan-600',
    available: 'from-slate-500 to-slate-600',
    expired: 'from-red-500 to-orange-600'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-4xl my-8 shadow-2xl">
        {/* Header */}
        <div className={`bg-gradient-to-r ${statusColor[cert.status]} p-8 text-white flex justify-between items-start`}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{cert.icon}</span>
              <div>
                <h2 className="text-3xl font-bold">{cert.name}</h2>
                <p className="text-white/80">By {cert.issuer}</p>
              </div>
            </div>
            <p className="mt-3 text-white/90">{cert.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition flex-shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Two column layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Certificate Preview */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">Certificate Preview</div>
              <div className="scale-75 origin-top-left -ml-[12.5%] -mt-[12.5%]">
                <CertificateImage cert={cert} />
              </div>
              <div className="pt-4 flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 text-sm">
                  <Download size={16} /> Download
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition font-semibold flex items-center justify-center gap-2 text-sm">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1">Difficulty Level</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(cert.difficulty)}`}>
                    {cert.difficulty}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1">Estimated Time</div>
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <Clock size={18} /> {cert.estimatedHours} hours
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1">Valid Period</div>
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <Calendar size={18} /> {cert.validityYears} years
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1">Current Status</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                    cert.status === 'earned' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    cert.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {cert.status === 'earned' ? '✓ Earned' : cert.status === 'in-progress' ? 'In Progress' : 'Available'}
                  </div>
                </div>
              </div>

              {/* Progress */}
              {cert.progress > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-semibold text-slate-900 dark:text-white">Progress</div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{cert.progress}%</div>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-full transition-all duration-500"
                      style={{ width: `${cert.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Career Impact */}
              {cert.careerImpact && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                  <div className="flex items-start gap-3">
                    <Target className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Career Impact</div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">{cert.careerImpact}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Zap size={20} className="text-yellow-500" /> Skills You'll Gain
            </h3>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill, idx) => (
                <div key={idx} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          {cert.prerequisites.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Lock size={20} /> Prerequisites
              </h3>
              <div className="space-y-2">
                {cert.prerequisites.map((prereq, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <CheckCircle size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                    {prereq}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen size={20} /> Requirements
            </h3>
            <div className="space-y-2">
              {cert.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg flex-shrink-0 pt-0.5">{idx + 1}.</span>
                  <span className="text-slate-700 dark:text-slate-300">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-400 dark:hover:bg-slate-600 transition"
            >
              Close
            </button>
            {cert.status !== 'earned' && (
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition">
                {cert.status === 'in-progress' ? 'Continue Learning' : 'Start This Path'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [filter, setFilter] = useState<'all' | 'earned' | 'in-progress' | 'available'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCerts = useMemo(() => {
    return certificationsData.filter(cert => {
      const matchesFilter = filter === 'all' || cert.status === filter
      const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cert.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [filter, searchTerm])

  const stats = {
    earned: certificationsData.filter(c => c.status === 'earned').length,
    inProgress: certificationsData.filter(c => c.status === 'in-progress').length,
    available: certificationsData.filter(c => c.status === 'available').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
            <Award size={28} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Certifications</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Professional credentials & achievements</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-green-700 dark:text-green-300">Earned</div>
            <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.earned}</div>
          <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-1">Completed certifications</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">In Progress</div>
            <Zap size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.inProgress}</div>
          <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">Currently learning</p>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Available</div>
            <Award size={20} className="text-slate-600 dark:text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-slate-600 dark:text-slate-400">{stats.available}</div>
          <p className="text-xs text-slate-600/70 dark:text-slate-400/70 mt-1">Unlock available paths</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Search certifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            {(['all', 'earned', 'in-progress', 'available'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Certification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <button
            key={cert.id}
            onClick={() => setSelectedCert(cert as Certification)}
            className={`rounded-xl overflow-hidden border-2 transition-all hover:shadow-xl cursor-pointer group text-left ${
              cert.status === 'earned'
                ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/10'
                : cert.status === 'in-progress'
                  ? 'border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/10'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-purple-500'
            }`}
          >
            {/* Certificate Preview as Background */}
            <div className="aspect-video bg-gradient-to-br p-4 overflow-hidden relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${
                cert.id === 1 ? 'from-blue-600 to-blue-900' :
                cert.id === 2 ? 'from-purple-600 to-purple-900' :
                cert.id === 3 ? 'from-amber-600 to-amber-900' :
                cert.id === 4 ? 'from-pink-600 to-pink-900' :
                'from-green-600 to-green-900'
              }`}></div>
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition"></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">{cert.icon}</div>
                <div className="text-white text-xs font-semibold opacity-75">CERTIFICATE</div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 space-y-3">
              {/* Title */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{cert.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{cert.issuer}</p>
                </div>
                {cert.status === 'earned' && (
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{cert.description}</p>

              {/* Difficulty & Time */}
              <div className="flex gap-2 flex-wrap">
                <div className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(cert.difficulty)}`}>
                  {cert.difficulty}
                </div>
                <div className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Clock size={12} /> {cert.estimatedHours}h
                </div>
              </div>

              {/* Skills Preview */}
              {cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {cert.skills.slice(0, 2).map((skill, idx) => (
                    <div key={idx} className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {skill}
                    </div>
                  ))}
                  {cert.skills.length > 2 && (
                    <div className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      +{cert.skills.length - 2} more
                    </div>
                  )}
                </div>
              )}

              {/* Status and Progress */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    cert.status === 'earned' ? 'bg-green-600 text-white' :
                    cert.status === 'in-progress' ? 'bg-blue-600 text-white' :
                    'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white'
                  }`}>
                    {cert.status === 'earned' ? '✓ Earned' : cert.status === 'in-progress' ? 'In Progress' : 'Available'}
                  </span>
                  {cert.prerequisites.length > 0 && cert.status === 'available' && (
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Lock size={12} /> Prerequisites
                    </span>
                  )}
                </div>

                {cert.progress > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-600 dark:text-slate-400">Progress</span>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{cert.progress}%</span>
                    </div>
                    <div className="bg-slate-300 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-full transition-all"
                        style={{ width: `${cert.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredCerts.length === 0 && (
        <div className="text-center py-12">
          <Award size={48} className="mx-auto text-slate-400 dark:text-slate-600 mb-3" />
          <p className="text-slate-600 dark:text-slate-400">No certifications found matching your search</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedCert && (
        <CertificationDetail cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </div>
  )
}

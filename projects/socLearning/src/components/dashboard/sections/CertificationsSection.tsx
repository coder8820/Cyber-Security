'use client'

import { Certification } from '@/types'
import { certificationsData } from '@/lib/data'
import { Award, Lock, CheckCircle, Clock } from 'lucide-react'
import { useState } from 'react'

interface CertificationDetailProps {
  cert: Certification
  onClose: () => void
}

function CertificationDetail({ cert, onClose }: CertificationDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg w-full max-w-2xl">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{cert.icon}</span>
              <h2 className="text-2xl font-bold">{cert.name}</h2>
            </div>
            <p className="text-purple-100">{cert.description}</p>
            <p className="text-sm opacity-75 mt-2">Issued by: {cert.issuer}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-purple-700 p-2 rounded transition"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status and Progress */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Progress</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-full transition-all duration-300"
                    style={{ width: `${cert.progress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{cert.progress}% Complete</p>
              </div>
              <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                cert.status === 'earned'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : cert.status === 'in-progress'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                {cert.status === 'earned' && '✓ Earned'}
                {cert.status === 'in-progress' && 'In Progress'}
                {cert.status === 'available' && 'Available'}
                {cert.status === 'expired' && 'Expired'}
              </span>
            </div>
          </div>

          {/* Prerequisites */}
          {cert.prerequisites.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Lock size={18} /> Prerequisites
              </h3>
              <div className="space-y-2">
                {cert.prerequisites.map((prereq, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 p-2 bg-slate-50 dark:bg-slate-800 rounded">
                    <CheckCircle size={16} className="text-green-600" />
                    {prereq}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Requirements</h3>
            <div className="space-y-2">
              {cert.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span className="text-slate-700 dark:text-slate-300">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Validity */}
          {cert.earnedAt && typeof cert.earnedAt === 'object' && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <p className="text-sm text-green-900 dark:text-green-100">
                <strong>Earned:</strong> {cert.earnedAt instanceof Date ? cert.earnedAt.toLocaleDateString() : String(cert.earnedAt)}
              </p>
              {cert.expiresAt && typeof cert.expiresAt === 'object' && (
                <p className="text-sm text-green-900 dark:text-green-100 mt-1">
                  <strong>Expires:</strong> {cert.expiresAt instanceof Date ? cert.expiresAt.toLocaleDateString() : String(cert.expiresAt)}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white rounded font-semibold hover:bg-slate-400 dark:hover:bg-slate-600 transition"
            >
              Close
            </button>
            {cert.status !== 'earned' && (
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">
                {cert.status === 'in-progress' ? 'Continue Learning' : 'Start Path'}
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

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Award size={28} className="text-purple-400" />
        <h3 className="text-2xl font-bold text-white">Professional Certifications</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificationsData.map((cert) => (
          <button
            key={cert.id}
            onClick={() => setSelectedCert(cert as Certification)}
            className={`rounded-lg p-5 text-left border-2 transition-all hover:shadow-lg cursor-pointer ${
              cert.status === 'earned'
                ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-600'
                : cert.status === 'in-progress'
                  ? 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-600'
                  : 'bg-slate-800 border-slate-600 hover:border-purple-500'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{cert.icon}</span>
                <div>
                  <h4 className="font-bold text-white">{cert.name}</h4>
                  <p className="text-xs text-slate-400">{cert.issuer}</p>
                </div>
              </div>
              {cert.status === 'earned' && (
                <CheckCircle size={20} className="text-green-500" />
              )}
            </div>

            <p className="text-sm text-slate-300 mb-4 line-clamp-2">{cert.description}</p>

            {/* Status Badge and Progress */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    cert.status === 'earned'
                      ? 'bg-green-600 text-white'
                      : cert.status === 'in-progress'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-600 text-slate-200'
                  }`}
                >
                  {cert.status === 'earned' && '✓ Earned'}
                  {cert.status === 'in-progress' && 'In Progress'}
                  {cert.status === 'available' && 'Available'}
                </span>
                {cert.prerequisites.length > 0 && cert.status === 'available' && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Lock size={14} /> Prerequisites needed
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              {cert.progress > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400">Progress</span>
                    <span className="text-xs font-semibold text-slate-300">{cert.progress}%</span>
                  </div>
                  <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-full transition-all"
                      style={{ width: `${cert.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Requirements Count */}
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <Clock size={14} />
                {cert.requirements.length} requirements
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedCert && (
        <CertificationDetail cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </div>
  )
}

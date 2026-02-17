'use client'

import { Report } from '@/types'
import { reportsData } from '@/lib/data'
import { BarChart3, TrendingUp, TrendingDown, Minus, Download, Eye } from 'lucide-react'
import { useState } from 'react'

interface ReportDetailProps {
  report: Report
  onClose: () => void
}

function ReportDetail({ report, onClose }: ReportDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-lg w-full max-w-3xl my-8">
        <div className={`bg-gradient-to-r p-6 text-white flex justify-between items-start ${
          report.type === 'learning'
            ? 'from-blue-600 to-cyan-600'
            : report.type === 'performance'
              ? 'from-green-600 to-emerald-600'
              : report.type === 'progress'
                ? 'from-purple-600 to-blue-600'
                : 'from-red-600 to-orange-600'
        }`}>
          <div>
            <h2 className="text-2xl font-bold mb-2">{report.title}</h2>
            <p className="opacity-90">{report.description}</p>
            <p className="text-sm opacity-75 mt-2">Generated: {report.generatedAt instanceof Date ? report.generatedAt.toLocaleDateString() : typeof report.generatedAt === 'string' ? report.generatedAt : new Date(report.generatedAt).toLocaleDateString()}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded transition"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Metrics */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Key Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.metrics.map((metric, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{metric.label}</h4>
                    {metric.trend && (
                      <span className={`flex items-center gap-1 text-sm font-semibold ${
                        metric.trend === 'up'
                          ? 'text-green-600'
                          : metric.trend === 'down'
                            ? 'text-red-600'
                            : 'text-slate-600'
                      }`}>
                        {metric.trend === 'up' && <TrendingUp size={16} />}
                        {metric.trend === 'down' && <TrendingDown size={16} />}
                        {metric.trend === 'stable' && <Minus size={16} />}
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">📊 Key Insights</h3>
            <div className="space-y-3">
              {report.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 rounded"
                >
                  <p className="text-slate-800 dark:text-slate-200">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">💡 Recommendations</h3>
            <div className="space-y-3">
              {report.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 p-4 rounded"
                >
                  <div className="flex gap-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">
                      {idx + 1}.
                    </span>
                    <p className="text-slate-800 dark:text-slate-200">{rec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white rounded font-semibold hover:bg-slate-400 dark:hover:bg-slate-600 transition"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition flex items-center gap-2">
              <Download size={18} /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReportsSection() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'learning':
        return 'from-blue-600 to-cyan-600'
      case 'performance':
        return 'from-green-600 to-emerald-600'
      case 'progress':
        return 'from-purple-600 to-blue-600'
      case 'security':
        return 'from-red-600 to-orange-600'
      default:
        return 'from-slate-600 to-slate-600'
    }
  }

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'learning':
        return '📚'
      case 'performance':
        return '⭐'
      case 'progress':
        return '📈'
      case 'security':
        return '🔒'
      default:
        return '📊'
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 size={28} className="text-green-400" />
        <h3 className="text-2xl font-bold text-white">Detailed Reports & Analytics</h3>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportsData.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report as Report)}
            className={`rounded-lg p-6 text-left border border-slate-600 hover:border-slate-400 transition-all hover:shadow-lg cursor-pointer bg-slate-800 group`}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${getReportTypeColor(report.type)} rounded-lg p-4 mb-4 text-white`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{getReportTypeIcon(report.type)}</span>
                <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded">
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </span>
              </div>
              <h4 className="font-bold text-lg">{report.title}</h4>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm mb-4 line-clamp-2">{report.description}</p>

            {/* Quick Metrics Preview */}
            <div className="space-y-2 mb-4">
              <h5 className="text-xs font-semibold text-slate-400 uppercase">Top Metrics</h5>
              <div className="grid grid-cols-2 gap-2">
                {report.metrics.slice(0, 4).map((metric, idx) => (
                  <div key={idx} className="bg-slate-700 p-2 rounded">
                    <p className="text-xs text-slate-400">{metric.label}</p>
                    <p className="text-sm font-bold text-blue-400">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights Count */}
            <div className="flex gap-4 text-xs text-slate-400 mb-4 pb-4 border-b border-slate-700">
              <span>💡 {report.insights.length} insights</span>
              <span>📋 {report.recommendations.length} recommendations</span>
            </div>

            {/* Generated Date and View Button */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {report.generatedAt instanceof Date ? report.generatedAt.toLocaleDateString() : typeof report.generatedAt === 'string' ? report.generatedAt : new Date(report.generatedAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition">
                <Eye size={16} />
                <span className="text-sm font-semibold">View</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Export Section */}
      <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-600">
        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
          <Download size={20} />
          Export Reports
        </h4>
        <p className="text-slate-300 text-sm mb-4">
          Download all your reports and detailed analytics as PDF files for archiving or sharing with stakeholders.
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition flex items-center gap-2">
            <Download size={18} /> Download All Reports
          </button>
          <button className="px-4 py-2 bg-slate-700 text-white rounded font-semibold hover:bg-slate-600 transition flex items-center gap-2">
            📧 Email Reports
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <ReportDetail report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}
    </div>
  )
}

'use client'

import { useAuth } from '@/context/AuthContext'
import { DashboardThemeProvider } from '@/context/DashboardThemeContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardThemeProvider>
      <DashboardLayout user={user} />
    </DashboardThemeProvider>
  )
}

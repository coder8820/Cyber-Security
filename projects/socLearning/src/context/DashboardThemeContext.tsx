'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type DashboardTheme = 'blue' | 'purple' | 'green' | 'amber' | 'rose' | 'cyan'

interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  gradient: string
  sidebar: string
  card: string
  border: string
}

const themeColorMap: Record<DashboardTheme, ThemeColors> = {
  blue: {
    primary: 'from-blue-600 to-blue-700',
    secondary: 'from-cyan-600 to-blue-600',
    accent: 'text-blue-400',
    gradient: 'from-blue-600 to-purple-600',
    sidebar: 'from-slate-900 to-slate-800',
    card: 'bg-slate-800',
    border: 'border-slate-700/50'
  },
  purple: {
    primary: 'from-purple-600 to-purple-700',
    secondary: 'from-pink-600 to-purple-600',
    accent: 'text-purple-400',
    gradient: 'from-purple-600 to-pink-600',
    sidebar: 'from-slate-900 to-slate-800',
    card: 'bg-slate-800',
    border: 'border-slate-700/50'
  },
  green: {
    primary: 'from-green-600 to-green-700',
    secondary: 'from-emerald-600 to-green-600',
    accent: 'text-green-400',
    gradient: 'from-green-600 to-emerald-600',
    sidebar: 'from-slate-900 to-slate-800',
    card: 'bg-slate-800',
    border: 'border-slate-700/50'
  },
  amber: {
    primary: 'from-amber-600 to-amber-700',
    secondary: 'from-orange-600 to-amber-600',
    accent: 'text-amber-400',
    gradient: 'from-amber-600 to-orange-600',
    sidebar: 'from-slate-900 to-slate-800',
    card: 'bg-slate-800',
    border: 'border-slate-700/50'
  },
  rose: {
    primary: 'from-rose-600 to-rose-700',
    secondary: 'from-pink-600 to-rose-600',
    accent: 'text-rose-400',
    gradient: 'from-rose-600 to-pink-600',
    sidebar: 'from-slate-900 to-slate-800',
    card: 'bg-slate-800',
    border: 'border-slate-700/50'
  },
  cyan: {
    primary: 'from-cyan-600 to-cyan-700',
    secondary: 'from-blue-600 to-cyan-600',
    accent: 'text-cyan-400',
    gradient: 'from-cyan-600 to-blue-600',
    sidebar: 'from-slate-900 to-slate-800',
    card: 'bg-slate-800',
    border: 'border-slate-700/50'
  }
}

interface DashboardThemeContextType {
  theme: DashboardTheme
  setTheme: (theme: DashboardTheme) => void
  colors: ThemeColors
}

const DashboardThemeContext = createContext<DashboardThemeContextType | null>(null)

export function DashboardThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<DashboardTheme>('blue')

  useEffect(() => {
    const savedTheme = localStorage.getItem('dashboardTheme') as DashboardTheme | null
    if (savedTheme && Object.keys(themeColorMap).includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  const handleSetTheme = (newTheme: DashboardTheme) => {
    setTheme(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboardTheme', newTheme)
    }
  }

  return (
    <DashboardThemeContext.Provider value={{ theme, setTheme: handleSetTheme, colors: themeColorMap[theme] }}>
      {children}
    </DashboardThemeContext.Provider>
  )
}

export function useDashboardTheme() {
  const context = useContext(DashboardThemeContext)
  if (context === null) {
    return {
      theme: 'blue' as DashboardTheme,
      setTheme: () => {},
      colors: themeColorMap.blue
    }
  }
  return context
}

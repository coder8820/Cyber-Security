'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { authSystem } from '@/lib/auth'
import { User, AuthContextType, UserRole } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const currentUser = authSystem.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Error loading user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Session validation check every 5 minutes
  useEffect(() => {
    if (!mounted) return
    
    const interval = setInterval(() => {
      if (user) {
        if (!authSystem.isSessionValid()) {
          setUser(null)
        }
      }
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [user, mounted])

  const login = async (username: string, password: string) => {
    try {
      const result = authSystem.login(username, password)
      if (result.success && result.user) {
        setUser(result.user)
      }
      return { success: result.success, message: result.message }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'An error occurred during login' }
    }
  }

  const register = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: UserRole
  ) => {
    try {
      const result = authSystem.register(username, email, password, confirmPassword, role)
      if (result.success && result.user) {
        setUser(result.user)
      }
      return { success: result.success, message: result.message }
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, message: 'An error occurred during registration' }
    }
  }

  const logout = () => {
    try {
      authSystem.logout()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      setUser(null)
    }
  }

  const updateUser = (updates: Partial<User>) => {
    try {
      if (user) {
        const result = authSystem.updateUser(user.id, updates)
        if (result.success && result.user) {
          setUser(result.user)
        }
      }
    } catch (error) {
      console.error('Update user error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

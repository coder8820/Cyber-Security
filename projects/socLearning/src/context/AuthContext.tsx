'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { authSystem } from '@/lib/auth'
import { User, AuthContextType, UserRole } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = authSystem.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    const result = authSystem.login(username, password)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return { success: result.success, message: result.message }
  }

  const register = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: UserRole
  ) => {
    const result = authSystem.register(username, email, password, confirmPassword, role)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return { success: result.success, message: result.message }
  }

  const logout = () => {
    authSystem.logout()
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const result = authSystem.updateUser(user.id, updates)
      if (result.success && result.user) {
        setUser(result.user)
      }
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

import { User, UserRole } from '@/types'

const STORAGE_KEY = 'authUsers'
const SESSION_KEY = 'authToken'
const CURRENT_USER_KEY = 'currentUser'
const SESSION_EXPIRY_KEY = 'sessionExpiry'
const LOGIN_HISTORY_KEY = 'loginHistory'

interface LoginAttempt {
  username: string
  timestamp: number
  success: boolean
  ipInfo?: string
}

interface SessionData {
  token: string
  userId: number
  username: string
  expiresAt: number
  createdAt: number
}

export class AuthSystem {
  private users: User[]
  private sessions: Map<string, SessionData> = new Map()
  private readonly SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  private readonly TOKEN_LENGTH = 32

  constructor() {
    this.users = this.loadUsers()
    this.initializeDefaultUsers()
  }

  private loadUsers(): User[] {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return []
      
      const users = JSON.parse(stored) as User[]
      
      // Convert date strings back to Date objects
      return users.map(user => ({
        ...user,
        createdAt: typeof user.createdAt === 'string' ? new Date(user.createdAt) : user.createdAt,
        lastActive: typeof user.lastActive === 'string' ? new Date(user.lastActive) : user.lastActive,
      }))
    } catch (error) {
      console.error('Error loading users from localStorage:', error)
      return []
    }
  }

  private saveUsers(): void {
    if (typeof window === 'undefined') return
    try {
      // Ensure dates are properly serialized
      const usersToSave = this.users.map(user => ({
        ...user,
        createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
        lastActive: user.lastActive instanceof Date ? user.lastActive.toISOString() : user.lastActive,
      }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usersToSave))
    } catch (error) {
      console.error('Error saving users to localStorage:', error)
    }
  }

  private generateSessionToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let token = ''
    for (let i = 0; i < this.TOKEN_LENGTH; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return token
  }

  private hashPassword(password: string): string {
    // Improved password hashing with salt simulation
    const salt = 'blueteam_academy_v2'
    let hash = 0
    const combined = password + salt
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16).padStart(16, '0')
  }

  private addLoginAttempt(username: string, success: boolean): void {
    if (typeof window === 'undefined') return
    try {
      const history: LoginAttempt[] = JSON.parse(localStorage.getItem(LOGIN_HISTORY_KEY) || '[]')
      history.push({
        username,
        timestamp: Date.now(),
        success,
        ipInfo: 'Local'
      })
      // Keep only last 50 login attempts
      if (history.length > 50) {
        history.shift()
      }
      localStorage.setItem(LOGIN_HISTORY_KEY, JSON.stringify(history))
    } catch (error) {
      console.error('Error logging login attempt:', error)
    }
  }

  getLoginHistory(): LoginAttempt[] {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem(LOGIN_HISTORY_KEY) || '[]')
    } catch (error) {
      console.error('Error retrieving login history:', error)
      return []
    }
  }

  private initializeDefaultUsers(): void {
    // Always reload users from localStorage to ensure fresh data
    const storedUsers = this.loadUsers()
    
    if (storedUsers.length === 0) {
      const defaultUsers: User[] = [
        {
          id: 1,
          username: 'admin',
          email: 'admin@blueteam.com',
          password: this.hashPassword('admin123'),
          role: 'Instructor',
          createdAt: new Date(),
          profilePicture: '👨‍💼',
          lessonsCompleted: 10,
          labsCompleted: 5,
          quizScore: 95,
          commandsLearned: 75,
          completedLessons: [1, 2, 3, 4, 5, 6],
          completedLabs: [1, 2, 3, 4, 5],
          bio: 'Senior SOC instructor with 10+ years of cybersecurity experience',
          certifications: ['CISSP', 'CEH', 'GIAC GSE'],
          specializations: ['Incident Response', 'Threat Hunting'],
          hoursLearned: 500,
          lastActive: new Date(),
          streakDays: 45,
        },
        {
          id: 2,
          username: 'analyst',
          email: 'analyst@blueteam.com',
          password: this.hashPassword('analyst123'),
          role: 'SOC Analyst',
          createdAt: new Date(),
          profilePicture: '👨‍💻',
          lessonsCompleted: 8,
          labsCompleted: 4,
          quizScore: 88,
          commandsLearned: 60,
          completedLessons: [1, 2, 3, 4, 5, 6, 7, 8],
          completedLabs: [1, 2, 3, 4],
          bio: 'Aspiring SOC analyst focused on threat detection and response',
          certifications: ['Security+'],
          specializations: ['Network Monitoring'],
          hoursLearned: 120,
          lastActive: new Date(),
          streakDays: 12,
        },
        {
          id: 3,
          username: 'student',
          email: 'student@blueteam.com',
          password: this.hashPassword('student123'),
          role: 'Student',
          createdAt: new Date(),
          profilePicture: '👨‍🎓',
          lessonsCompleted: 3,
          labsCompleted: 1,
          quizScore: 65,
          commandsLearned: 25,
          completedLessons: [1, 2, 3],
          completedLabs: [1],
          bio: 'Learning cybersecurity fundamentals',
          certifications: [],
          specializations: [],
          hoursLearned: 25,
          lastActive: new Date(),
          streakDays: 5,
        },
      ]
      this.users = defaultUsers
      this.saveUsers()
    } else {
      this.users = storedUsers
    }
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  validatePassword(password: string): { valid: boolean; message: string } {
    if (password.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters' }
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain lowercase letters' }
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain uppercase letters' }
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain numbers' }
    }
    return { valid: true, message: 'Password is strong' }
  }

  register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: UserRole
  ): { success: boolean; message: string; user?: User } {
    if (!username || !email || !password || !confirmPassword) {
      return { success: false, message: 'All fields are required' }
    }

    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match' }
    }

    if (!this.isValidEmail(email)) {
      return { success: false, message: 'Invalid email format' }
    }

    const passwordValidation = this.validatePassword(password)
    if (!passwordValidation.valid) {
      return { success: false, message: passwordValidation.message }
    }

    try {
      // Reload users to ensure we have latest data
      this.users = this.loadUsers()

      if (this.users.find((u) => u.username === username)) {
        return { success: false, message: 'Username already exists' }
      }

      if (this.users.find((u) => u.email === email)) {
        return { success: false, message: 'Email already registered' }
      }

      const newUser: User = {
        id: (Math.max(...this.users.map((u) => u.id), 0) + 1),
        username,
        email,
        password: this.hashPassword(password),
        role,
        createdAt: new Date(),
        profilePicture: role === 'Instructor' ? '👨‍💼' : role === 'SOC Analyst' ? '👨‍💻' : '👨‍🎓',
        lessonsCompleted: 0,
        labsCompleted: 0,
        quizScore: 0,
        commandsLearned: 0,
        completedLessons: [],
        completedLabs: [],
        bio: '',
        certifications: [],
        specializations: [],
        hoursLearned: 0,
        lastActive: new Date(),
        streakDays: 0,
      }

      this.users.push(newUser)
      this.saveUsers()

      this.addLoginAttempt(username, true)

      return { success: true, message: 'Registration successful!', user: newUser }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, message: 'An error occurred during registration' }
    }
  }

  login(username: string, password: string): { success: boolean; message: string; user?: User } {
    if (!username || !password) {
      return { success: false, message: 'Username and password required' }
    }

    try {
      // IMPORTANT: Reload users from localStorage to ensure fresh data after logout
      this.users = this.loadUsers()
      
      // If no users in localStorage, reinitialize defaults
      if (this.users.length === 0) {
        this.initializeDefaultUsers()
      }

      const user = this.users.find((u) => u.username === username)
      
      if (!user) {
        this.addLoginAttempt(username, false)
        return { success: false, message: 'User not found' }
      }

      const hashedPassword = this.hashPassword(password)
      if (user.password !== hashedPassword) {
        this.addLoginAttempt(username, false)
        return { success: false, message: 'Invalid password' }
      }

      // Session is valid, generate token
      const token = this.generateSessionToken()
      const sessionData: SessionData = {
        token,
        userId: user.id,
        username: user.username,
        expiresAt: Date.now() + this.SESSION_TIMEOUT,
        createdAt: Date.now(),
      }

      this.sessions.set(token, sessionData)

      // Update last active
      user.lastActive = new Date()
      this.saveUsers()

      // Store session and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_KEY, token)
        localStorage.setItem(SESSION_EXPIRY_KEY, sessionData.expiresAt.toString())
        // Properly serialize the user with date fields
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
          ...user,
          createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
          lastActive: user.lastActive instanceof Date ? user.lastActive.toISOString() : user.lastActive,
        }))
      }

      this.addLoginAttempt(username, true)
      
      return { success: true, message: 'Login successful!', user }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'An error occurred during login' }
    }
  }

  logout(): void {
    try {
      if (typeof window !== 'undefined') {
        // Get current token to remove from sessions map
        const token = localStorage.getItem(SESSION_KEY)
        if (token) {
          this.sessions.delete(token)
        }

        // Clear all auth-related localStorage items
        localStorage.removeItem(SESSION_KEY)
        localStorage.removeItem(SESSION_EXPIRY_KEY)
        localStorage.removeItem(CURRENT_USER_KEY)
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  isSessionValid(): boolean {
    if (typeof window === 'undefined') return false
    
    try {
      const token = localStorage.getItem(SESSION_KEY)
      const expiry = localStorage.getItem(SESSION_EXPIRY_KEY)

      if (!token || !expiry) return false

      const expiryTime = parseInt(expiry, 10)
      if (Date.now() > expiryTime) {
        this.logout()
        return false
      }

      return true
    } catch (error) {
      console.error('Session validation error:', error)
      return false
    }
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null

    try {
      // First check if session is still valid
      if (!this.isSessionValid()) {
        return null
      }

      const stored = localStorage.getItem(CURRENT_USER_KEY)
      if (!stored) return null

      let user = JSON.parse(stored) as User
      
      // Deserialize dates if they're strings
      user = {
        ...user,
        createdAt: typeof user.createdAt === 'string' ? new Date(user.createdAt) : user.createdAt,
        lastActive: typeof user.lastActive === 'string' ? new Date(user.lastActive) : user.lastActive,
      }

      // Verify user still exists in system
      this.users = this.loadUsers()
      const existingUser = this.users.find((u) => u.id === user.id)
      if (!existingUser) {
        // User was deleted, clear session
        this.logout()
        return null
      }

      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  refreshUserFromStorage(): User | null {
    if (typeof window === 'undefined') return null

    try {
      // Reload users from localStorage
      this.users = this.loadUsers()

      const stored = localStorage.getItem(CURRENT_USER_KEY)
      if (!stored) return null

      let user = JSON.parse(stored) as User
      
      // Deserialize dates if they're strings
      user = {
        ...user,
        createdAt: typeof user.createdAt === 'string' ? new Date(user.createdAt) : user.createdAt,
        lastActive: typeof user.lastActive === 'string' ? new Date(user.lastActive) : user.lastActive,
      }
      
      // Get the latest version of this user from storage
      const freshUser = this.users.find((u) => u.id === user.id)
      
      if (!freshUser) {
        this.logout()
        return null
      }

      // Update localStorage with fresh data
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
        ...freshUser,
        createdAt: freshUser.createdAt instanceof Date ? freshUser.createdAt.toISOString() : freshUser.createdAt,
        lastActive: freshUser.lastActive instanceof Date ? freshUser.lastActive.toISOString() : freshUser.lastActive,
      }))
      
      return freshUser
    } catch (error) {
      console.error('Error refreshing user:', error)
      return null
    }
  }

  updateUser(userId: number, updates: Partial<User>): { success: boolean; user?: User } {
    try {
      // Reload users to ensure consistency
      this.users = this.loadUsers()

      const user = this.users.find((u) => u.id === userId)
      if (!user) return { success: false }

      Object.assign(user, updates)
      this.saveUsers()

      if (typeof window !== 'undefined') {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
          ...user,
          createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
          lastActive: user.lastActive instanceof Date ? user.lastActive.toISOString() : user.lastActive,
        }))
      }

      return { success: true, user }
    } catch (error) {
      console.error('Error updating user:', error)
      return { success: false }
    }
  }

  updateQuizScore(userId: number, score: number): { success: boolean; user?: User } {
    try {
      this.users = this.loadUsers()

      const user = this.users.find((u) => u.id === userId)
      if (!user) return { success: false }

      if (score > user.quizScore) {
        user.quizScore = score
      }

      this.saveUsers()
      if (typeof window !== 'undefined') {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
          ...user,
          createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
          lastActive: user.lastActive instanceof Date ? user.lastActive.toISOString() : user.lastActive,
        }))
      }

      return { success: true, user }
    } catch (error) {
      console.error('Error updating quiz score:', error)
      return { success: false }
    }
  }

  completeLesson(userId: number, lessonId: number): { success: boolean; user?: User } {
    try {
      this.users = this.loadUsers()

      const user = this.users.find((u) => u.id === userId)
      if (!user) return { success: false }

      if (!user.completedLessons.includes(lessonId)) {
        user.completedLessons.push(lessonId)
        user.lessonsCompleted = user.completedLessons.length
      }

      this.saveUsers()
      if (typeof window !== 'undefined') {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
          ...user,
          createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
          lastActive: user.lastActive instanceof Date ? user.lastActive.toISOString() : user.lastActive,
        }))
      }

      return { success: true, user }
    } catch (error) {
      console.error('Error completing lesson:', error)
      return { success: false }
    }
  }

  completeLab(userId: number, labId: number): { success: boolean; user?: User } {
    try {
      this.users = this.loadUsers()

      const user = this.users.find((u) => u.id === userId)
      if (!user) return { success: false }

      if (!user.completedLabs.includes(labId)) {
        user.completedLabs.push(labId)
        user.labsCompleted = user.completedLabs.length
      }

      this.saveUsers()
      if (typeof window !== 'undefined') {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
          ...user,
          createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
          lastActive: user.lastActive instanceof Date ? user.lastActive.toISOString() : user.lastActive,
        }))
      }

      return { success: true, user }
    } catch (error) {
      console.error('Error completing lab:', error)
      return { success: false }
    }
  }

  getAchievements(user: User) {
    const achievements = []
    if (user.lessonsCompleted >= 1) achievements.push('🌱 First Steps')
    if (user.lessonsCompleted >= 5) achievements.push('📚 Lesson Streak')
    if (user.labsCompleted >= 3) achievements.push('🔬 Lab Master')
    if (user.quizScore >= 80) achievements.push('📝 Knowledge Test')
    if (user.commandsLearned >= 50) achievements.push('🏆 Command Expert')
    return achievements
  }
}

export const authSystem = new AuthSystem()

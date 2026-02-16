import { User, UserRole } from '@/types'

const STORAGE_KEY = 'authUsers'
const SESSION_KEY = 'authToken'
const CURRENT_USER_KEY = 'currentUser'

export class AuthSystem {
  private users: User[]

  constructor() {
    this.users = this.loadUsers()
    this.initializeDefaultUsers()
  }

  private loadUsers(): User[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }

  private saveUsers(): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users))
  }

  private hashPassword(password: string): string {
    let hash = 0
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16)
  }

  private initializeDefaultUsers(): void {
    if (this.users.length === 0) {
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

    if (this.users.find((u) => u.username === username)) {
      return { success: false, message: 'Username already exists' }
    }

    if (this.users.find((u) => u.email === email)) {
      return { success: false, message: 'Email already registered' }
    }

    const newUser: User = {
      id: this.users.length + 1,
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

    return { success: true, message: 'Registration successful!', user: newUser }
  }

  login(username: string, password: string): { success: boolean; message: string; user?: User } {
    if (!username || !password) {
      return { success: false, message: 'Username and password required' }
    }

    const user = this.users.find((u) => u.username === username)
    if (!user) {
      return { success: false, message: 'User not found' }
    }

    if (user.password !== this.hashPassword(password)) {
      return { success: false, message: 'Invalid password' }
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_KEY, 'true')
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    }

    return { success: true, message: 'Login successful!', user }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSION_KEY)
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(CURRENT_USER_KEY)
    return stored ? JSON.parse(stored) : null
  }

  updateUser(userId: number, updates: Partial<User>): { success: boolean; user?: User } {
    const user = this.users.find((u) => u.id === userId)
    if (!user) return { success: false }

    Object.assign(user, updates)
    this.saveUsers()

    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    }

    return { success: true, user }
  }

  updateQuizScore(userId: number, score: number): { success: boolean; user?: User } {
    const user = this.users.find((u) => u.id === userId)
    if (!user) return { success: false }

    if (score > user.quizScore) {
      user.quizScore = score
    }

    this.saveUsers()
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    }

    return { success: true, user }
  }

  completeLesson(userId: number, lessonId: number): { success: boolean; user?: User } {
    const user = this.users.find((u) => u.id === userId)
    if (!user) return { success: false }

    if (!user.completedLessons.includes(lessonId)) {
      user.completedLessons.push(lessonId)
      user.lessonsCompleted = user.completedLessons.length
    }

    this.saveUsers()
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    }

    return { success: true, user }
  }

  completeLab(userId: number, labId: number): { success: boolean; user?: User } {
    const user = this.users.find((u) => u.id === userId)
    if (!user) return { success: false }

    if (!user.completedLabs.includes(labId)) {
      user.completedLabs.push(labId)
      user.labsCompleted = user.completedLabs.length
    }

    this.saveUsers()
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    }

    return { success: true, user }
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

export type UserRole = 'Student' | 'SOC Analyst' | 'Instructor'

export interface User {
  id: number
  username: string
  email: string
  password: string
  role: UserRole
  createdAt: Date
  profilePicture?: string
  lessonsCompleted: number
  labsCompleted: number
  quizScore: number
  commandsLearned: number
  completedLessons: number[]
  completedLabs: number[]
  bio?: string
  certifications?: string[]
  specializations?: string[]
  hoursLearned: number
  lastActive: Date
  streakDays: number
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (username: string, email: string, password: string, confirmPassword: string, role: UserRole) => Promise<{ success: boolean; message: string }>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export interface Lesson {
  id: number
  title: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  description: string
  content: string
  objectives?: string[]
  prerequisites?: string[]
  resources?: { title: string; url: string }[]
  codeSnippets?: { title: string; language: string; code: string }[]
  keyCommands?: { command: string; description: string }[]
  practiceExercises?: { title: string; instructions: string }[]
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional'
}

export interface Lab {
  id: number
  title: string
  difficulty: string
  duration: string
  description: string
}

export interface QuizQuestion {
  id: number
  q: string
  options: string[]
  correct: number
}

export interface Achievement {
  id: number
  name: string
  desc: string
  unlocked: boolean
}
export interface Certification {
  id: number
  name: string
  description: string
  issuer: string
  requirements: string[]
  earnedAt?: Date
  expiresAt?: Date
  status: 'available' | 'in-progress' | 'earned' | 'expired'
  progress: number
  icon: string
  prerequisites: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  skills: string[]
  validityYears?: number
  credentialId?: string
  careerImpact?: string
  estimatedHours: number
}

export interface Report {
  id: number
  title: string
  type: 'learning' | 'progress' | 'performance' | 'security'
  description: string
  generatedAt: Date
  metrics: {
    label: string
    value: string | number
    trend?: 'up' | 'down' | 'stable'
  }[]
  insights: string[]
  recommendations: string[]
}
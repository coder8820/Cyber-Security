# 🛡️ SOC Blue Team Academy

A comprehensive Next.js-based learning platform for SOC (Security Operations Center) professionals. Learn PowerShell, CMD, and SOC operations with an interactive dashboard, quizzes, learning roadmaps, and achievement tracking.

## ✨ Features

- 🔐 **User Authentication** - Secure login/registration with role-based access
- 📊 **Interactive Dashboard** - Multi-section layout for learning and tracking
- 📚 **Lesson Management** - Comprehensive course modules with difficulty levels
- 📝 **Quiz System** - 10-question assessment with real-time scoring
- 🎯 **Learning Roadmap** - 3-stage progression system (Beginner → Intermediate → Advanced)
- 🏆 **Achievement Badges** - 5 unlockable achievements based on progress
- 👤 **User Profiles** - Track statistics, lessons, labs, and quiz scores
- 🌙 **Theme System** - Dark/Light mode toggle with persistent storage
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd soclearning

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📖 Test Credentials

### Default Test Accounts:
```
👨‍💼 Admin Account
  Username: admin
  Password: admin123
  Role: Instructor
  Score: 95%

👨‍💻 Analyst Account
  Username: analyst
  Password: analyst123
  Role: SOC Analyst
  Score: 88%

👨‍🎓 Student Account
  Username: student
  Password: student123
  Role: Student
  Score: 65%
```

Or create a new account during registration with:
- **Email**: Any valid email format (user@example.com)
- **Password**: Minimum 6 characters with uppercase, lowercase, and numbers
- **Role**: Choose from Student, SOC Analyst, or Instructor

## 🏗️ Project Structure

```
soclearning/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Home (redirects to login)
│   │   ├── login/                   # Login page
│   │   ├── register/                # Registration page
│   │   └── dashboard/               # Main dashboard
│   ├── components/
│   │   └── dashboard/
│   │       ├── DashboardLayout.tsx  # Main dashboard layout
│   │       └── sections/
│   │           ├── OverviewSection.tsx
│   │           ├── ProfileSection.tsx
│   │           ├── LessonsSection.tsx
│   │           ├── QuizSection.tsx
│   │           └── RoadmapSection.tsx
│   ├── context/
│   │   └── AuthContext.tsx          # Authentication context provider
│   ├── lib/
│   │   ├── auth.ts                  # Authentication system
│   │   └── data.ts                  # Lessons, labs, and quiz data
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── providers/
│   │   └── ThemeProvider.tsx        # Theme (dark/light mode) provider
│   └── styles/
│       └── globals.css              # Global styles with CSS variables
├── public/                           # Static assets
├── .vscode/                          # VS Code settings and recommendations
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

## 🔧 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### State Management
- **Context API** - Authentication and theme management
- **localStorage** - User data and preferences persistence

### Development Tools
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **Tailwind CSS** - Styling

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint for code quality
npm run lint
```

## 🎯 Dashboard Sections

### 1. Overview
- Quick statistics (lessons, labs, quiz score, commands)
- Learning progress visualization
- Quick start guide

### 2. Profile
- User information and profile picture
- Detailed statistics
- Achievement badges with unlock status
- Profile settings options

### 3. Lessons
- Browse all available courses
- Filter by difficulty level (Beginner, Intermediate, Advanced)
- Track completion status
- Access lesson content

### 4. Quiz
- 10-question assessment
- Real-time progress tracking
- Instant scoring with detailed feedback
- Performance recommendations
- Retake functionality

### 5. Roadmap
- 3-stage learning progression
- Overall progress percentage
- Milestone tracking
- Achievement unlock conditions

## 🔐 Authentication System

### Features
- **User Registration** - Create accounts with validation
- **Secure Login** - Password hashing and session management
- **Role-Based Access** - Student, SOC Analyst, Instructor roles
- **Session Persistence** - localStorage-based session management
- **Password Requirements**:
  - Minimum 6 characters
  - Uppercase letters required
  - Lowercase letters required
  - Numbers required

### User Data Tracking
- Lessons completed
- Labs completed
- Quiz scores
- Commands learned
- Achievement progress

## 🌙 Theme System

Automatic dark/light mode toggle with persistent storage:
- Saves preference in localStorage
- Uses CSS variables for dynamic theming
- Applies to all components automatically
- Toggle button in dashboard sidebar and login page

## 📊 Data Structure

### User Model
```typescript
interface User {
  id: number
  username: string
  email: string
  password: string (hashed)
  role: 'Student' | 'SOC Analyst' | 'Instructor'
  createdAt: Date
  lessonsCompleted: number
  labsCompleted: number
  quizScore: number
  commandsLearned: number
  completedLessons: number[]
  completedLabs: number[]
}
```

### Quiz Question Model
```typescript
interface QuizQuestion {
  id: number
  q: string
  options: string[]
  correct: number
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Setup
No environment variables required for basic setup. All data is stored in browser localStorage.

### Recommended Hosting
- **Vercel** (Next.js creators' platform)
- **Netlify**
- **AWS Amplify**
- **Docker** (self-hosted)

## 🐛 Troubleshooting

### Port 3000 Already in Use
- The app will automatically try port 3001
- Or kill the process: `npm run dev -- -p 3002`

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### CSS Not Loading
- Ensure Tailwind CSS is properly installed
- Check postcss.config.js exists and is correct
- Clear `.next` folder and rebuild

## 👨‍💻 Development Guidelines

### Adding New Components
1. Create component in `src/components/`
2. Use TypeScript for type safety
3. Use Tailwind CSS for styling
4. Export as default

### Adding New Pages
1. Create folder in `src/app/`
2. Create `page.tsx` file
3. Use App Router conventions
4. Use client-side features with `'use client'` directive

### Styling Conventions
- Use Tailwind CSS utility classes
- CSS variables in `src/styles/globals.css` for theming
- Mobile-first responsive design
- Color scheme: Blue (#3b82f6) as primary, Slate as secondary

## 📚 Learning Paths

### Beginner Level
1. PowerShell Fundamentals
2. Command Prompt Essentials

### Intermediate Level  
3. Network Diagnostics
4. System Administration

### Advanced Level
5. SOC Operations
6. Incident Response

## 🏆 Achievement System

- 🌱 **First Steps** - Complete 1 lesson
- 📚 **Lesson Streak** - Complete 5 lessons
- 🔬 **Lab Master** - Complete 3 labs
- 📝 **Knowledge Test** - Score 80% on quiz
- ⚡ **Command Expert** - Learn 50+ commands

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this platform. Contributions are welcome!

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Last Updated**: February 2026
**Version**: 1.0.0
**Status**: ✅ Production Ready


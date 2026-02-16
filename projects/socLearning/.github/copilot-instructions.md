# SOC Blue Team Academy - Project Guidelines

## Project Overview

This is a modern Next.js 14 learning platform for SOC professionals featuring authentication, interactive lessons, quizzes, and achievement tracking.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Storage**: Browser localStorage

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── context/          # Context providers
├── lib/              # Utilities and helpers
├── providers/        # Custom providers
├── styles/           # Global styles
└── types/            # TypeScript definitions
```

## Key Features

- User authentication with validation
- Multi-section dashboard
- 10-question quiz system
- Learning roadmap with progress tracking
- Achievement badges
- Dark/light theme toggle
- Responsive design

## Development Workflow

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

### Access Points
- **Development**: http://localhost:3000 (or :3001 if 3000 is busy)
- **Test Accounts**: See README.md for credentials

## Code Standards

- Always use TypeScript
- Use 'use client' for client components
- Use Tailwind CSS for styling
- Keep components small and focused
- Use proper TypeScript interfaces for props

## Common Tasks

### Add New Page
1. Create folder in `src/app/[page-name]/`
2. Create `page.tsx` with React component
3. If client component, add `'use client'` at top

### Add New Component
1. Create in `src/components/[feature]/`
2. Use TypeScript interfaces for props
3. Export as default
4. Use Tailwind CSS for styling

### Add New Data/Utilities
1. Put in `src/lib/[functionality].ts`
2. Export functions as needed
3. Add TypeScript types

## Troubleshooting

### Port Already in Use
Application auto-selects port 3001 if 3000 is busy

### Build Errors
Clear cache: `rm -rf .next node_modules && npm install`

### CSS Not Working
Verify Tailwind config and postcss.config.js are correct

## File Locations

- **Authentication**: `src/lib/auth.ts`, `src/context/AuthContext.tsx`
- **Page Content**: `src/app/[page]/page.tsx`
- **Components**: `src/components/`
- **Styles**: `src/styles/globals.css`
- **Types**: `src/types/index.ts`

## Environment

No environment variables needed for basic setup. All data stored in localStorage.

## Notes

- Development server runs on port 3000 (or 3001 if 3000 busy)
- All user data persists in browser localStorage
- Test credentials available in README.md
- Default users: admin, analyst, student

## Getting Help

Refer to:
- README.md for setup and features
- src/types/index.ts for data structures
- src/lib/auth.ts for authentication logic
- Component files for UI patterns

---

**Last Updated**: February 2026

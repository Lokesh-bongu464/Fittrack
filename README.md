# FitTrack - Fitness & Wellness Platform

A premium fitness tracking platform built with Next.js 14, featuring a stunning landing page, 5-step onboarding flow, and a real-time dashboard -- all backed by a fully functional Express + MongoDB backend.

## Screenshots

### Landing Page (Dark Mode)
![Hero Section - Dark Mode](screenshots/Screenshot%202026-05-06%20155725.png)

### Landing Page (Light Mode)
![Hero Section - Light Mode](screenshots/Screenshot%202026-05-06%20155934.png)

### Social Proof & Features
![Social Proof and Features Section](screenshots/Screenshot%202026-05-06%20155802.png)

### Dashboard (Dark Mode)
![Dashboard - Dark Mode](screenshots/Screenshot%202026-05-06%20155844.png)

### Dashboard (Light Mode)
![Dashboard - Light Mode](screenshots/Screenshot%202026-05-06%20155906.png)

### Auth Flow - Step 1: Create Account
![Step 1 - Create Account](screenshots/Screenshot%202026-05-06%20160045.png)

### Auth Flow - Step 2: Personal Details
![Step 2 - Personal Details](screenshots/Screenshot%202026-05-06%20160059.png)

### Auth Flow - Step 3: Fitness Goals
![Step 3 - Fitness Goals](screenshots/Screenshot%202026-05-06%20160138.png)

### Auth Flow - Step 4: Activity Level
![Step 4 - Activity Level](screenshots/Screenshot%202026-05-06%20160152.png)

### Auth Flow - Step 5: Profile Setup
![Step 5 - Profile Setup](screenshots/Screenshot%202026-05-06%20160208.png)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables (HSL) |
| UI Components | shadcn/ui (25 components) |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Charts | Recharts |
| Icons | Lucide React |
| Theme | next-themes (light/dark) |
| Backend | Express.js + Prisma ORM |
| Database | MongoDB Atlas |
| Auth | JWT (jose) + bcryptjs |
| Docs | Storybook |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (for backend)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/Lokesh-bongu464/Fittrack.git
cd Fittrack

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to your backend URL

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Set DATABASE_URL and JWT_SECRET

# Generate Prisma client
npx prisma generate

# Start server
npm run dev
```

Backend runs on [http://localhost:5000](http://localhost:5000).

---

## Project Structure

```
fittrack/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── auth/page.tsx       # Auth flow (register + login)
│   │   ├── dashboard/          # Protected dashboard
│   │   └── layout.tsx          # Root layout with theme provider
│   ├── components/
│   │   ├── landing/            # Landing page sections (9 components)
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SocialProof.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── Footer.tsx
│   │   ├── auth/               # 5-step onboarding (8 components)
│   │   │   ├── Step1CreateAccount.tsx
│   │   │   ├── Step2PersonalDetails.tsx
│   │   │   ├── Step3FitnessGoals.tsx
│   │   │   ├── Step4ActivityLevel.tsx
│   │   │   ├── Step5ProfileSetup.tsx
│   │   │   ├── StepIndicator.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   └── WelcomeScreen.tsx
│   │   ├── dashboard/          # Dashboard components (5 components)
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   ├── TodayWorkoutCard.tsx
│   │   │   ├── WeeklyChart.tsx
│   │   │   └── QuickActions.tsx
│   │   └── ui/                 # shadcn/ui primitives (25 components)
│   ├── lib/                    # Utilities, schemas, constants, API client
│   ├── store/                  # Zustand auth store
│   └── middleware.ts           # Route protection
├── backend/
│   ├── src/
│   │   ├── index.ts            # Express server with CORS & rate limiting
│   │   ├── routes/auth.ts      # Register, login, me endpoints
│   │   ├── middleware/auth.ts  # JWT middleware
│   │   └── lib/jwt.ts          # Token sign/verify with jose
│   └── prisma/schema.prisma   # User + Profile models (MongoDB)
├── .storybook/                 # Storybook configuration
└── screenshots/                # Application screenshots
```

---

## Key Features

### Landing Page
- Interactive particle network animation (mouse-reactive canvas)
- Glassmorphism dashboard preview with animated progress ring
- Infinite brand logo slider (social proof)
- Auto-scrolling feature card columns
- Scroll-triggered animations via Framer Motion `whileInView`
- 3-tier pricing with highlighted "Popular" badge
- Fully responsive with mobile hamburger drawer

### 5-Step Onboarding
- Visual step indicator with animated checkmarks
- Password strength indicator (4-segment colored bar)
- Google sign-up button placeholder
- Gender pill toggle selector
- Goal selection cards with checkmark on selected
- Activity level radio cards with descriptions
- Avatar upload with initials fallback
- Notification toggle switches
- Confetti celebration on completion
- Real-time inline validation (`mode: "onChange"`)
- Skip option on optional steps (4 & 5)
- Smooth slide/fade transitions between steps

### Dashboard
- Real user data fetched from backend API
- 4 stat cards with trend indicators
- Today's workout card with exercise checkboxes
- Weekly activity bar chart (Recharts)
- Quick action buttons grid
- Collapsible sidebar navigation

### Backend
- JWT authentication with 7-day token expiry
- bcrypt password hashing (12 rounds)
- Rate limiting on auth endpoints (20 req/15min)
- Zod schema validation on all inputs
- MongoDB Atlas with Prisma ORM
- CORS configured for frontend communication

---

## Design Decisions

**HSL CSS Variable System**: All colors are defined as HSL values in CSS variables, enabling seamless dark mode with a single class toggle. Both light and dark themes are fully defined with 18+ color tokens.

**Component Architecture**: Components are organized by feature (landing/, auth/, dashboard/) with shared UI primitives from shadcn/ui. Each component is focused and under 150 lines.

**Form Strategy**: React Hook Form with Zod validation in `onChange` mode provides real-time feedback without submit-time surprises. Multi-step state is persisted in Zustand so users can navigate back without losing data.

**Auth Token Strategy**: JWT is stored in both localStorage (for API calls via Authorization header) and a cookie (for Next.js middleware route protection). This provides both client-side API access and server-side route guards.

**Animation Philosophy**: Animations are purposeful, not decorative. Entry animations guide attention, hover states provide feedback, and the particle network creates an interactive, premium feel without overwhelming the content.

---

## Deployment

- **Frontend**: Vercel (standard Next.js deployment)
- **Backend**: Render (Express + Prisma)

### Environment Variables

**Frontend** (`.env.local`):
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

**Backend** (`.env`):
```
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your-secret-key
PORT=5000
```

---

## Scripts

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
npm run storybook    # Start Storybook

# Backend
cd backend
npm run dev          # Start dev server
npm run build        # Compile TypeScript
npm start            # Run production build
```

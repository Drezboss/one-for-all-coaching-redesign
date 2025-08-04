# One For All Coaching

A modern coaching website built with React, TypeScript, and Vite, designed for seamless deployment on Vercel.

## 🚀 Quick Start

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Visit [http://localhost:5173](http://localhost:5173) to view the application

## 🛠️ Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Type checking with TypeScript

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration and deploy

The `vercel.json` configuration handles:
- Build settings
- Route handling for SPA
- Admin route configuration

## 🧩 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Lucide React
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Routing**: Wouter
- **Build Tool**: Vite

## 📁 Project Structure

```
├── client/          # React frontend application
├── shared/          # Shared utilities and types
├── api/             # API routes for Vercel functions
├── public/          # Static assets
└── vercel.json      # Vercel deployment configuration
```

## ✅ Features

- Responsive design optimized for all devices
- Modern UI with smooth animations
- Contact forms with validation
- User registration and authentication
- Admin dashboard
- Performance optimized for web vitals
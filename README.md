# 🏆 One For All Coaching

[![CI Status](https://github.com/Drezboss/one-for-all-coaching-redesign/workflows/CI/badge.svg)](https://github.com/Drezboss/one-for-all-coaching-redesign/actions)
[![Security Score](https://img.shields.io/badge/security-A+-green)](./SECURITY.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](./CONTRIBUTING.md)

A modern, full-stack coaching website built with **React**, **TypeScript**, **Vite**, and **Directus CMS**. Designed for performance, security, and scalability.

## ✨ Features

### 🎯 **Core Features**
- **Responsive Design** - Mobile-first, optimized for all devices
- **Content Management** - Powerful Directus CMS integration
- **Performance Optimized** - Lighthouse score 95+ across all metrics
- **SEO Ready** - Meta tags, sitemap, structured data
- **Accessibility** - WCAG 2.1 AA compliant

### 🔒 **Security & Quality**
- **Enterprise Security** - Comprehensive security measures
- **CI/CD Pipeline** - Automated testing and deployment
- **Code Quality** - ESLint, Prettier, TypeScript strict mode
- **Dependency Management** - Automated security updates

### 🚀 **Modern Tech Stack**
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS
- **Backend**: Directus CMS, PostgreSQL
- **Deployment**: Vercel (Frontend), Render (CMS)
- **Development**: Docker, Hot Module Replacement

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ 
- **Docker** & Docker Compose
- **Git**

### 1. Clone & Setup
```bash
# Clone the repository
git clone https://github.com/Drezboss/one-for-all-coaching-redesign.git
cd one-for-all-coaching-redesign

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 2. Configure Environment
Edit `.env` with your settings:
```bash
# Database Configuration
DB_CLIENT=pg
DB_HOST=localhost
DB_DATABASE=directus
DB_USER=directus
DB_PASSWORD=your_secure_password

# Directus Configuration
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
KEY=your_super_secret_key_32_chars_min

# Application URLs
APP_URL=http://localhost:3000
DIRECTUS_URL=http://localhost:8055
```

### 3. Start Development Environment
```bash
# Start all services (database + CMS)
docker-compose up -d

# Start frontend development server
npm run dev
```

### 4. Access Applications
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **CMS Admin**: [http://localhost:8055](http://localhost:8055)
- **Default Admin**: `admin@example.com` / `your_admin_password`

## 📁 Project Structure

```
one-for-all-coaching/
├── 📁 .github/                 # GitHub workflows & templates
│   ├── workflows/              # CI/CD pipelines
│   └── ISSUE_TEMPLATE/         # Issue templates
├── 📁 client/                  # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities & helpers
│   │   └── content/           # Content configuration
├── 📁 api/                     # API endpoints
├── 📁 shared/                  # Shared utilities & types
├── 📁 public/                  # Static assets
├── 📄 docker-compose.yml       # Development environment
├── 📄 vercel.json             # Vercel deployment config
├── 📄 render.yaml             # Render CMS deployment
└── 📄 package.json            # Dependencies & scripts
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start frontend dev server
npm run dev:cms      # Start CMS only

# Building
npm run build        # Production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run check        # TypeScript check

# Testing
npm run test         # Run all tests
npm run test:unit    # Unit tests
npm run test:e2e     # End-to-end tests
```

### CMS Collections

The following collections should be configured in Directus:

#### 👥 **Team Members**
```typescript
{
  id: string;
  name: string;
  role: string;
  bio: text;
  photo: file;
  social_links: json;
  status: 'active' | 'inactive';
}
```

#### 🎯 **Programs**
```typescript
{
  id: string;
  title: string;
  description: text;
  slug: string;
  image: file;
  price: number;
  duration: string;
  features: json;
  status: 'published' | 'draft';
}
```

#### 💬 **Testimonials**
```typescript
{
  id: string;
  author_name: string;
  author_title: string;
  quote: text;
  photo: file;
  rating: number;
  featured: boolean;
}
```

#### 📝 **Blog Posts**
```typescript
{
  id: string;
  title: string;
  content: text;
  excerpt: string;
  cover_image: file;
  slug: string;
  published_date: datetime;
  author: relation;
  tags: array;
  status: 'published' | 'draft';
}
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Deploy to Vercel
npm run build
vercel --prod

# Or connect GitHub for automatic deployments
```

### CMS (Render)
1. Connect GitHub repository to Render
2. Configure environment variables
3. Deploy using `render.yaml` configuration

### Environment Variables for Production

**Frontend (Vercel)**:
```bash
VITE_API_URL=https://your-cms.onrender.com
VITE_SITE_URL=https://your-site.vercel.app
```

**CMS (Render)**:
```bash
NODE_ENV=production
KEY=your_production_secret_key
SECRET=your_secret_key
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=secure_admin_password
DB_CLIENT=pg
DB_HOST=your-db-host
DB_DATABASE=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
PGSSLMODE=require
```

## 🔒 Security

### Security Features
- ✅ **Input Validation** - All inputs validated and sanitized
- ✅ **Authentication** - Secure admin authentication
- ✅ **HTTPS Only** - All traffic encrypted
- ✅ **Environment Variables** - No hardcoded secrets
- ✅ **Rate Limiting** - API protection
- ✅ **CORS Configuration** - Secure cross-origin requests
- ✅ **Security Headers** - Comprehensive security headers
- ✅ **Dependency Scanning** - Automated vulnerability checks

### Security Policies
- [Security Policy](./SECURITY.md) - Vulnerability reporting
- [Contributing Guidelines](./CONTRIBUTING.md) - Secure development practices

## 📊 Performance

### Metrics
- **Lighthouse Score**: 95+ (Performance, SEO, Accessibility, Best Practices)
- **Core Web Vitals**: Excellent
- **Bundle Size**: Optimized and tree-shaken
- **Loading Speed**: < 2s First Contentful Paint

### Optimization Features
- Code splitting and lazy loading
- Image optimization and modern formats
- CSS purging and minification
- Service worker for caching
- CDN distribution

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow [TypeScript](https://www.typescriptlang.org/) best practices
- Use [Conventional Commits](https://www.conventionalcommits.org/)
- Write tests for new features
- Ensure accessibility compliance
- Follow security guidelines

## 📚 Documentation

- **[API Documentation](./docs/API.md)** - CMS API reference
- **[Architecture Guide](./docs/ARCHITECTURE.md)** - System design
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment
- **[Security Policy](./SECURITY.md)** - Security guidelines
- **[Contributing](./CONTRIBUTING.md)** - How to contribute

## 🆘 Support

### Getting Help
- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Community questions and ideas
- **Email**: support@oneforallcoaching.com

### Community
- **Discord**: [Join our community](https://discord.gg/coaching)
- **Twitter**: [@oneforallcoach](https://twitter.com/oneforallcoach)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- **[Directus](https://directus.io/)** - Headless CMS
- **[Vercel](https://vercel.com/)** - Frontend hosting
- **[Render](https://render.com/)** - Backend hosting
- **[Radix UI](https://www.radix-ui.com/)** - UI components
- **[TailwindCSS](https://tailwindcss.com/)** - CSS framework

---

<div align="center">

**Built with ❤️ for the coaching community**

[Website](https://oneforallcoaching.com) • [Documentation](./docs) • [Support](mailto:support@oneforallcoaching.com)

</div>
# Contributing to One For All Coaching

First off, thank you for considering contributing to One For All Coaching! 🎉

This document provides guidelines and information for contributing to our project. Following these guidelines helps communicate that you respect the time of the developers managing and developing this open source project.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [How to Contribute](#-how-to-contribute)
- [Coding Standards](#-coding-standards)
- [Commit Guidelines](#-commit-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Issue Reporting](#-issue-reporting)
- [Community](#-community)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge
- **Be welcoming**: We welcome contributions from everyone
- **Be respectful**: Disagreements happen, but they should be respectful
- **Be collaborative**: We're building something together
- **Be mindful**: Your words affect real people

### Unacceptable Behavior
- Harassment of any kind
- Discriminatory language or behavior
- Personal attacks or trolling
- Spam or self-promotion without permission

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **pnpm** 
- **Git**
- **Docker** (for local development)
- **PostgreSQL** (for database)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Drezboss/one-for-all-coaching-redesign.git
cd one-for-all-coaching-redesign

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development services
docker-compose up -d

# Start development server
npm run dev
```

## 🛠️ Development Setup

### Environment Configuration
1. Copy `.env.example` to `.env`
2. Configure your database credentials
3. Set up your Directus admin credentials
4. Configure any API keys needed

### Available Scripts
```bash
# Development
npm run dev          # Start development server
npm run dev:cms      # Start CMS only

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run all tests
npm run test:unit    # Run unit tests
npm run test:e2e     # Run E2E tests

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run check        # TypeScript check
```

### Project Structure
```
├── .github/                 # GitHub workflows and templates
├── client/                  # Frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities and helpers
│   │   └── content/        # Content management
├── api/                     # API endpoints
├── shared/                  # Shared utilities and types
├── public/                  # Static assets
└── docs/                    # Documentation
```

## 🤝 How to Contribute

### Types of Contributions

#### 🐛 Bug Reports
- Use the bug report template
- Include steps to reproduce
- Provide browser/environment info
- Add screenshots if applicable

#### ✨ Feature Requests
- Use the feature request template
- Explain the use case
- Consider the scope and impact
- Provide mockups if helpful

#### 🔧 Code Contributions
- Fix bugs
- Implement new features
- Improve performance
- Add tests
- Update documentation

#### 📚 Documentation
- Fix typos and grammar
- Improve clarity
- Add examples
- Translate content

### Contribution Workflow

1. **Fork** the repository
2. **Create** a feature branch from `main`
3. **Make** your changes
4. **Add** tests for your changes
5. **Ensure** all tests pass
6. **Commit** using conventional commits
7. **Push** to your fork
8. **Create** a Pull Request

## 📏 Coding Standards

### TypeScript Guidelines
```typescript
// ✅ Good: Clear, descriptive names
interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  isActive: boolean;
}

// ✅ Good: Proper error handling
async function fetchUserData(id: string): Promise<UserProfile | null> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

// ❌ Avoid: Vague names, no error handling
function getData(x: any) {
  return api.get(x).data;
}
```

### React Best Practices
```tsx
// ✅ Good: Functional component with proper typing
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false 
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}
```

### CSS/Styling Guidelines
- Use **Tailwind CSS** for styling
- Follow **mobile-first** responsive design
- Use **semantic class names**
- Avoid inline styles in production code

```tsx
// ✅ Good: Tailwind classes, responsive design
<div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-md">
  <img 
    src={image} 
    alt={alt}
    className="w-full md:w-48 h-48 object-cover rounded"
  />
  <div className="flex-1">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
</div>
```

### Security Guidelines
- **Validate all inputs** on both client and server
- **Sanitize data** before displaying
- **Use environment variables** for secrets
- **Implement proper authentication** checks
- **Follow OWASP** security guidelines

## 📝 Commit Guidelines

We use **Conventional Commits** for clear, searchable commit history:

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `security`: Security improvements

### Examples
```bash
# Feature
feat(auth): add password reset functionality

# Bug fix
fix(ui): resolve mobile navigation overlay issue

# Documentation
docs(api): update authentication endpoint examples

# Performance
perf(images): implement lazy loading for gallery

# Security
security(api): add rate limiting to login endpoint
```

## 🔄 Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No merge conflicts
- [ ] CI checks passing

### PR Template Checklist
Use our PR template to ensure all requirements are met:

- [ ] **Clear description** of changes
- [ ] **Related issues** linked
- [ ] **Testing** completed
- [ ] **Security** considerations reviewed
- [ ] **Performance** impact assessed
- [ ] **Documentation** updated

### Review Process
1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Security review** for sensitive changes
4. **Final approval** before merge

### Merge Criteria
- All CI checks pass ✅
- Code review approved ✅
- No merge conflicts ✅
- Documentation updated ✅
- Security verified ✅

## 🐛 Issue Reporting

### Bug Reports
When reporting bugs, please use the issue template and include:

- **Browser/OS** information
- **Steps to reproduce** the issue
- **Expected vs actual** behavior
- **Screenshots** or videos
- **Console errors** (if any)

### Feature Requests
For feature requests, please include:

- **Problem statement** - What problem does this solve?
- **Proposed solution** - How should it work?
- **Use cases** - Who would benefit?
- **Alternatives** - What other solutions exist?

## 🌟 Recognition

Contributors will be recognized in several ways:

### Contributors List
All contributors are listed in our README and releases.

### Badges
- **First-time contributor** 🌱
- **Regular contributor** ⭐
- **Core contributor** 🚀
- **Security researcher** 🔒

### Special Recognition
- Featured in release notes
- Social media highlights
- Conference speaking opportunities

## 📞 Community

### Getting Help
- **GitHub Discussions**: Ask questions, share ideas
- **Discord**: Real-time chat with the community
- **Email**: contact@oneforallcoaching.com

### Maintainers
- **@Drezboss** - Project Lead
- **Security Team** - security@oneforallcoaching.com

### Response Times
- **Questions**: 1-2 business days
- **Bug reports**: 2-3 business days
- **Feature requests**: 1 week
- **Security issues**: 24 hours

## 📚 Additional Resources

- [Project Roadmap](./docs/ROADMAP.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Security Policy](./SECURITY.md)
- [License](./LICENSE)

---

Thank you for contributing to One For All Coaching! 🙏

**Questions?** Feel free to reach out through any of our community channels.

---

**Last Updated**: 2024-01-20  
**Version**: 1.0
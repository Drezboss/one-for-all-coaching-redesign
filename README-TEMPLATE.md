# 🎯 Coaching Site Template

A modern, responsive coaching website template built with React, TypeScript, and TailwindCSS. Perfect for coaches, trainers, and fitness professionals who want to create a professional online presence.

## ✨ Features

- **Modern React Stack**: Built with React 18, TypeScript, and Vite
- **Beautiful UI**: Pre-built components using Radix UI and TailwindCSS
- **Responsive Design**: Mobile-first approach with modern design patterns
- **Content Management**: Easy-to-edit content configuration
- **Authentication**: Built-in login/register pages
- **Admin Dashboard**: Admin panel for content management
- **Calendar Integration**: Booking and scheduling functionality
- **Database Ready**: Configured with Drizzle ORM
- **Deployment Ready**: Vercel configuration included

## 🚀 Quick Start

### Using GitHub Template

1. Click "Use this template" on the GitHub repository
2. Create your new repository
3. Clone your new repository:
   ```bash
   git clone https://github.com/yourusername/your-coaching-site.git
   cd your-coaching-site
   ```

### Manual Setup

1. **Clone this repository:**
   ```bash
   git clone https://github.com/Drezboss/one-for-all-coaching-redesign.git
   cd one-for-all-coaching-redesign
   ```

2. **Run the setup script:**
   ```bash
   node template-setup.js
   ```
   This will guide you through customizing the site name, hero content, and other basic settings.

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 🛠 Manual Customization

If you prefer to customize manually instead of using the setup script:

### 1. Update Site Information

Edit `client/src/content/site-content.ts`:
```typescript
export const siteContent = {
  site: {
    name: "Your Coaching Business Name",
  },
  home: {
    hero: {
      title: "YOUR HERO TITLE",
      description: "Your coaching description and value proposition.",
    },
  },
};
```

### 2. Customize Services

Edit `client/src/content/services-content.ts` to update:
- Service titles and descriptions
- Pricing information
- Features and benefits
- Call-to-action buttons

### 3. Update Footer Links

Edit `client/src/content/footer-links.ts` to add your:
- Social media links
- Contact information
- Legal pages
- Additional navigation

### 4. Replace Branding

- Update `package.json` name field
- Replace logo and images in `client/public/`
- Update `index.html` title and meta tags
- Customize colors in `tailwind.config.ts`

### 5. Configure Deployment

For Vercel deployment:
- The `vercel.json` is already configured
- Connect your GitHub repository to Vercel
- Deploy automatically on push

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── content/        # Site content configuration
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/           # Utility functions and configurations
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main application component
│   ├── public/            # Static assets
│   └── api/               # API endpoints
├── shared/                # Shared utilities and types
├── api/                   # Backend API
├── template-setup.js      # Template customization script
└── vercel.json           # Deployment configuration
```

## 🎨 Key Pages Included

- **Home**: Hero section with services overview
- **About**: About page template
- **Individual Coaching**: 1-on-1 coaching services
- **Group Sessions**: Group coaching offerings
- **Contact**: Contact form and information
- **Login/Register**: User authentication
- **Admin Dashboard**: Content management
- **Calendar**: Booking and scheduling
- **Parent Dashboard**: For youth coaching programs

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run check    # Type checking
```

## 🌟 Customization Ideas

- **Color Scheme**: Update TailwindCSS theme in `tailwind.config.ts`
- **Typography**: Modify fonts and text styles
- **Layout**: Adjust component layouts and spacing
- **Content**: Add new pages and modify existing content
- **Features**: Extend with additional coaching-specific features
- **Integrations**: Add payment processing, email marketing, etc.

## 📱 Responsive Design

The template is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🤝 Contributing

Feel free to submit issues and pull requests to improve this template.

## 📄 License

MIT License - feel free to use this template for commercial and personal projects.

---

**Need help?** Check the documentation in each content file or create an issue on GitHub.
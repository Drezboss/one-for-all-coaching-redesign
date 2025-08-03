# Content Management Guide

This website now supports **GitHub-based content management**, allowing you to edit text and content directly through GitHub without touching any code.

## 📁 Content Structure

All website content is organized in the `/content/` folder at the root of this repository:

```
/content/
├── about.md           # About page content (Markdown)
├── contact.md         # Contact page content (Markdown)  
├── home.json          # Home page content (JSON)
├── services.json      # Services content (JSON)
└── site-info.json     # Site-wide information (JSON)
```

## 📝 File Types

### Markdown Files (`.md`)
Used for rich text content with formatting like headings, bold text, links, and lists.

**Files:**
- `about.md` - About Dave content
- `contact.md` - Contact page information

**Format:**
```markdown
---
title: "Page Title"
subtitle: "Page subtitle"
updated_at: "2024-01-01"
---

## Section Heading

Your content here with **bold text**, *italic text*, and [links](https://example.com).

### Subsection

- List item 1
- List item 2

> Quote text goes here
```

### JSON Files (`.json`)
Used for structured data like lists, settings, and organized content.

**Files:**
- `site-info.json` - Site name, contact info, coach info, image paths
- `home.json` - Home page hero, features, achievements
- `services.json` - Service descriptions, features, pricing

**Format:**
```json
{
  "title": "Your Title",
  "description": "Your description",
  "features": [
    "Feature 1",
    "Feature 2"
  ]
}
```

## 🔧 How to Edit Content

### Method 1: GitHub Web Interface (Recommended)

1. **Navigate to the content file:**
   - Go to the GitHub repository
   - Click on the `content/` folder
   - Click on the file you want to edit

2. **Edit the file:**
   - Click the pencil icon (✏️) to edit
   - Make your changes
   - Use the "Preview" tab to see formatting (for Markdown files)

3. **Save your changes:**
   - Scroll down to "Commit changes"
   - Add a descriptive commit message like "Update about page bio"
   - Click "Commit changes"

4. **Deploy automatically:**
   - Your changes will automatically deploy to the live website
   - Check the "Actions" tab to see deployment progress

### Method 2: GitHub Desktop/Git Clone

1. Clone the repository locally
2. Edit files in your preferred text editor
3. Commit and push changes
4. Auto-deployment handles the rest

## 📋 Content Editor Reference

### Site Information (`site-info.json`)

```json
{
  "site": {
    "name": "One For All Coaching",           // Site name
    "tagline": "Your tagline here",           // Main tagline
    "email": "your@email.com",                // Contact email
    "phone": "+44 1234 567890",               // Contact phone
    "socialMedia": {
      "facebook": "https://facebook.com/...", // Social links
      "instagram": "https://instagram.com/...",
      "twitter": "https://twitter.com/..."
    }
  },
  "coach": {
    "name": "Dave Cornock",                   // Coach name
    "title": "UEFA B Licensed Football Coach", // Coach title
    "quote": "Your journey is unique...",     // Main quote
    "bio": "Coach biography...",              // Short bio
    "philosophy": "Coaching philosophy..."    // Coaching approach
  }
}
```

### Home Page (`home.json`)

```json
{
  "hero": {
    "title": "UNLOCK YOUR POTENTIAL",         // Main hero title
    "subtitle": "Professional football...",   // Hero subtitle
    "primaryButton": "Start Your Journey",    // Main CTA button
    "secondaryButton": "Learn More"           // Secondary button
  },
  "whyChoose": {
    "title": "WHY CHOOSE ONE FOR ALL?",       // Section title
    "description": "Section description...",  // Section intro text
    "features": [                             // Feature list
      {
        "title": "Feature title",
        "description": "Feature description"
      }
    ]
  }
}
```

### Services (`services.json`)

```json
{
  "title": "OUR COACHING SERVICES",          // Services section title
  "subtitle": "Choose the training...",      // Services subtitle
  "individualCoaching": {
    "title": "💪 1-2-1 Individual...",      // Service title
    "subtitle": "Personalised Coaching...", // Service tagline
    "description": "Service description...", // Detailed description
    "features": [                           // Service features
      "Feature 1",
      "Feature 2"
    ]
  }
}
```

### About Page (`about.md`)

```markdown
---
title: "MEET DAVE"                          # Page title
subtitle: "Your dedicated coach..."         # Page subtitle  
hero_image: "/path/to/image.jpg"            # Hero image path
updated_at: "2024-01-01"                    # Last update date
---

## About Dave Cornock

Your content here using Markdown formatting.

### My Philosophy

> "Your journey is unique. Your development should be too."

More content with **bold**, *italic*, and [links](url).
```

### Contact Page (`contact.md`)

```markdown
---
title: "Let's Build Your Next Step Together"  # Page title
subtitle: "Ready to start your journey..."    # Page subtitle
updated_at: "2024-01-01"                     # Last update date
---

## Get In Touch

Contact information and instructions here.

### Contact Information

**Email**: your@email.com  
**Phone**: +44 1234 567890
```

## 🚀 Deployment

- **Automatic**: Changes deploy automatically when you commit to the main branch
- **Time**: Usually takes 2-3 minutes after committing
- **Verification**: Check the live website to confirm changes

## ⚠️ Important Notes

### DO NOT:
- Delete or rename files (breaks the website)
- Modify the file structure in `/content/`
- Change the frontmatter structure in Markdown files
- Remove required fields from JSON files

### DO:
- Edit text content freely
- Add new features/achievements to arrays
- Update contact information
- Modify coach bio and philosophy
- Change button text and descriptions

## 🔍 Common Tasks

### Update Coach Bio
Edit `content/about.md` - modify the content after the `---` section

### Change Contact Information  
Edit `content/site-info.json` - update `site.email` and `site.phone`

### Add New Service Feature
Edit `content/services.json` - add items to the `features` arrays

### Update Home Page Hero
Edit `content/home.json` - modify `hero.title`, `hero.subtitle`, or button text

### Change Coach Quote
Edit `content/site-info.json` - update `coach.quote`

## 🆘 Need Help?

If you break something or need assistance:
1. Check the GitHub "Actions" tab for error messages
2. Revert your changes by clicking "History" on the file and reverting to a previous version
3. Contact your developer for complex changes

## 📱 Preview Changes

- Markdown files have a "Preview" tab in GitHub's editor
- JSON files: Use a JSON validator if unsure about syntax
- Always check the live website after deployment

---

**Remember**: Every change you make automatically updates the live website, so double-check your edits before committing!
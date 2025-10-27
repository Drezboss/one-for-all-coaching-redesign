# Content Management Guide for One For All Coaching

This guide explains how to update content on the One For All Coaching website. All website content is stored in this `/content` folder and can be edited directly in GitHub.

## 📁 Folder Structure

```
/content
├── /pages         # Page content in Markdown format
│   ├── home.md    # Home page content
│   ├── about.md   # About page content
│   └── contact.md # Contact page content
└── /data          # Structured data in JSON format
    ├── site.json    # Site-wide configuration
    ├── coach.json   # Coach information
    ├── services.json # Services offerings
    └── images.json  # Image paths
```

## 📝 Editing Page Content (Markdown Files)

### Location: `/content/pages/`

Markdown files contain the main text content for each page. Each file has two parts:

1. **Frontmatter** (between `---` markers): Page metadata
2. **Content**: The actual page content in Markdown format

### Example: `home.md`
```markdown
---
title: "UNLOCK YOUR POTENTIAL"
subtitle: "Professional football coaching..."
primaryButton: "Start Your Journey"
secondaryButton: "Learn More"
---

## WHY CHOOSE ONE FOR ALL?

At One For All Coaching, we are passionate...
```

### Markdown Formatting Guide:
- `## Heading 2` - Main section headings
- `### Heading 3` - Subsection headings
- `**Bold text**` - For emphasis
- `*Italic text*` - For subtle emphasis
- `> Quote` - For blockquotes
- `- List item` - For bullet points
- `1. Numbered item` - For numbered lists

## 📊 Editing Structured Data (JSON Files)

### Location: `/content/data/`

JSON files contain structured data that powers various parts of the website.

### 1. Site Configuration (`site.json`)
Contains global site information:
- Site name and tagline
- Contact information (email, phone)
- Social media links

```json
{
  "name": "One For All Coaching",
  "email": "dave@all-4one-coaching.com",
  "phone": "+44 7750 887112",
  "socialMedia": {
    "facebook": "https://facebook.com/...",
    "instagram": "https://instagram.com/..."
  }
}
```

### 2. Coach Information (`coach.json`)
Contains coach details:
- Name and title
- Biography
- Philosophy
- Credentials
- Inspirational quote

### 3. Services (`services.json`)
Contains all service offerings:
- Individual coaching details
- Group sessions information
- Coach mentorship program
- Features and benefits

### 4. Images (`images.json`)
Contains image file paths:
- Coach photos
- Coaching action shots
- Update paths when adding new images

## 🚀 How to Make Updates

### Step 1: Navigate to the Content
1. Go to the GitHub repository
2. Navigate to the `/content` folder
3. Find the file you want to edit

### Step 2: Edit the File
1. Click on the file you want to edit
2. Click the "Edit" button (pencil icon)
3. Make your changes
4. Preview your changes (for Markdown files)

### Step 3: Save Changes
1. Scroll to the bottom of the page
2. Add a commit message describing your changes
   - Example: "Update coach bio and credentials"
3. Click "Commit changes"

### Step 4: Automatic Deployment
- Changes will automatically deploy to the live site via Vercel
- Updates typically take 1-2 minutes to appear

## ✅ Best Practices

### Content Guidelines:
1. **Keep it consistent**: Use the same tone and style throughout
2. **Be concise**: Web readers prefer scannable content
3. **Use headings**: Break up content with clear section headings
4. **Check spelling**: Review before committing changes

### Technical Guidelines:
1. **Valid JSON**: Ensure JSON files have proper syntax
   - Use [JSONLint](https://jsonlint.com/) to validate
2. **Preserve structure**: Don't remove required fields
3. **Test locally**: Preview Markdown formatting before committing
4. **Small commits**: Make one type of change per commit

## 🔍 Common Tasks

### Update Contact Information:
Edit `/content/data/site.json`:
```json
{
  "email": "new-email@example.com",
  "phone": "+44 XXXX XXXXXX"
}
```

### Add a New Credential:
Edit `/content/data/coach.json`, add to credentials array:
```json
"credentials": [
  "UEFA B License qualified",
  "FA Level 2 Coaching Badge",
  "NEW CREDENTIAL HERE"
]
```

### Update Page Heading:
Edit the relevant `.md` file's frontmatter:
```markdown
---
title: "NEW PAGE TITLE HERE"
---
```

### Add a New Service Feature:
Edit `/content/data/services.json`, add to features array:
```json
"features": [
  "Existing feature",
  "NEW FEATURE HERE"
]
```

## ❓ Troubleshooting

### Changes not appearing:
1. Wait 2-3 minutes for deployment
2. Clear browser cache (Ctrl+F5)
3. Check Vercel dashboard for deployment status

### JSON syntax errors:
1. Check for missing commas between items
2. Ensure all quotes are closed
3. Validate with JSONLint

### Markdown not formatting:
1. Check for proper spacing around headings
2. Ensure blank lines between paragraphs
3. Verify markdown syntax is correct

## 📞 Need Help?

If you encounter issues or need assistance:
1. Check the deployment logs in Vercel
2. Review recent commits for errors
3. Contact your web developer for technical support

---

Remember: All changes are version controlled in Git, so you can always revert if needed!
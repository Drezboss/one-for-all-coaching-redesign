#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

// Configuration for the new site
const prompts = [
  {
    key: 'siteName',
    question: 'What is the name of your coaching business?',
    default: 'Your Coaching Business'
  },
  {
    key: 'heroTitle',
    question: 'What is your main hero title?',
    default: 'UNLOCK YOUR FULL POTENTIAL'
  },
  {
    key: 'heroDescription', 
    question: 'What is your hero description?',
    default: 'Join a coaching experience that puts your personal growth, goals, and gameplay first.'
  },
  {
    key: 'repositoryName',
    question: 'What should the new repository be named?',
    default: 'my-coaching-site'
  }
];

// Simple readline implementation for Node.js
function askQuestion(question, defaultValue) {
  process.stdout.write(`${question} (${defaultValue}): `);
  return new Promise((resolve) => {
    process.stdin.once('data', (data) => {
      const input = data.toString().trim();
      resolve(input || defaultValue);
    });
  });
}

async function setupTemplate() {
  console.log('🎯 Coaching Site Template Setup');
  console.log('================================\n');
  
  // Collect user input
  const config = {};
  for (const prompt of prompts) {
    config[prompt.key] = await askQuestion(prompt.question, prompt.default);
  }
  
  console.log('\n📝 Updating template files...\n');
  
  // Update package.json
  try {
    const packagePath = 'package.json';
    const packageContent = JSON.parse(readFileSync(packagePath, 'utf8'));
    packageContent.name = config.repositoryName;
    writeFileSync(packagePath, JSON.stringify(packageContent, null, 2));
    console.log('✅ Updated package.json');
  } catch (error) {
    console.error('❌ Error updating package.json:', error.message);
  }
  
  // Update site content
  try {
    const siteContentPath = 'client/src/content/site-content.ts';
    const newSiteContent = `export const siteContent = {
  site: {
    name: "${config.siteName}",
  },
  home: {
    hero: {
      title: "${config.heroTitle}",
      description: "${config.heroDescription}",
    },
  },
};
`;
    writeFileSync(siteContentPath, newSiteContent);
    console.log('✅ Updated site content');
  } catch (error) {
    console.error('❌ Error updating site content:', error.message);
  }
  
  // Update index.html title
  try {
    const indexPath = 'index.html';
    let indexContent = readFileSync(indexPath, 'utf8');
    indexContent = indexContent.replace(
      /<title>.*<\/title>/,
      `<title>${config.siteName}</title>`
    );
    writeFileSync(indexPath, indexContent);
    console.log('✅ Updated index.html title');
  } catch (error) {
    console.error('❌ Error updating index.html:', error.message);
  }
  
  console.log('\n🚀 Template setup complete!');
  console.log('\nNext steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run dev');
  console.log('3. Customize the services in client/src/content/services-content.ts');
  console.log('4. Update footer links in client/src/content/footer-links.ts');
  console.log('5. Replace logo and images in client/public/');
  console.log('6. Update colors and styling in tailwind.config.ts');
  
  process.exit(0);
}

// Make stdin readable
process.stdin.setEncoding('utf8');
setupTemplate().catch(console.error);
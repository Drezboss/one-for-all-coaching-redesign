import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define content types
export interface SiteConfig {
  name: string;
  tagline: string;
  domain: string;
  email: string;
  phone: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export interface CoachInfo {
  name: string;
  title: string;
  bio: string;
  philosophy: string;
  quote: string;
  credentials: string[];
}

export interface PageContent {
  title: string;
  description?: string;
  subtitle?: string;
  primaryButton?: string;
  secondaryButton?: string;
  content: string;
  [key: string]: any;
}

// Base URL for content - in production this would be from your CDN/server
const CONTENT_BASE_URL = '/content';

/**
 * Load JSON content from a file
 */
export async function loadJSON<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`${CONTENT_BASE_URL}/data/${path}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading JSON content from ${path}:`, error);
    throw error;
  }
}

/**
 * Load and parse markdown content with frontmatter
 */
export async function loadMarkdown(path: string): Promise<PageContent> {
  try {
    const response = await fetch(`${CONTENT_BASE_URL}/pages/${path}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.statusText}`);
    }
    
    const markdown = await response.text();
    const { data, content } = matter(markdown);
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    
    return {
      ...data,
      content: processedContent.toString()
    } as PageContent;
  } catch (error) {
    console.error(`Error loading markdown content from ${path}:`, error);
    throw error;
  }
}

/**
 * Load all site configuration
 */
export async function loadSiteConfig(): Promise<SiteConfig> {
  return loadJSON<SiteConfig>('site.json');
}

/**
 * Load coach information
 */
export async function loadCoachInfo(): Promise<CoachInfo> {
  return loadJSON<CoachInfo>('coach.json');
}

/**
 * Load services data
 */
export async function loadServices() {
  return loadJSON('services.json');
}

/**
 * Load images configuration
 */
export async function loadImages() {
  return loadJSON('images.json');
}

/**
 * Load page content by name
 */
export async function loadPageContent(pageName: string): Promise<PageContent> {
  return loadMarkdown(`${pageName}.md`);
}

// React hook for loading content with loading state
import { useState, useEffect } from 'react';

export function useContent<T>(loader: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      try {
        setLoading(true);
        const result = await loader();
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
          console.error('Error loading content:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
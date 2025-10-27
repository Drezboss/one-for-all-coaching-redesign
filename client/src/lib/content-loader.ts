import matter from 'gray-matter';

// Type definitions for content
export interface MarkdownContent {
  data: Record<string, any>;
  content: string;
}

export interface SiteInfo {
  site: {
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
  };
  coach: {
    name: string;
    title: string;
    quote: string;
    bio: string;
    philosophy: string;
  };
  images: {
    coach: {
      main: string;
      sideline: string;
      celebration: string;
    };
    coaching: {
      group: string;
      individual: string;
      youth: string;
    };
  };
}

export interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    primaryButton: string;
    secondaryButton: string;
  };
  whyChoose: {
    title: string;
    description: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  achievements: Array<{
    title: string;
    description: string;
  }>;
}

export interface ServicesContent {
  title: string;
  subtitle: string;
  individualCoaching: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    whoItsFor: Array<{
      title: string;
      description: string;
    }>;
  };
  groupSessions: {
    title: string;
    subtitle: string;
    description: string;
    groupTypes: Array<{
      title: string;
      description: string;
      ideal: string;
    }>;
  };
  mentorship: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };
}

// Cache for loaded content to avoid repeated requests
const contentCache = new Map<string, any>();

/**
 * Load and parse markdown content from the content directory
 */
export async function loadMarkdownContent(filename: string): Promise<MarkdownContent> {
  const cacheKey = `md:${filename}`;
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }

  try {
    // Try to load from API endpoint first (for production)
    const response = await fetch(`/api/content/${filename}`);
    if (response.ok) {
      const rawContent = await response.text();
      const parsed = matter(rawContent);
      const result = {
        data: parsed.data,
        content: parsed.content
      };
      contentCache.set(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.warn(`Failed to load ${filename} from API:`, error);
  }

  // Fallback: try to load from public directory (for development)
  try {
    const response = await fetch(`/content/${filename}`);
    if (response.ok) {
      const rawContent = await response.text();
      const parsed = matter(rawContent);
      const result = {
        data: parsed.data,
        content: parsed.content
      };
      contentCache.set(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.warn(`Failed to load ${filename} from public:`, error);
  }

  throw new Error(`Could not load markdown content: ${filename}`);
}

/**
 * Load JSON content from the content directory
 */
export async function loadJsonContent<T = any>(filename: string): Promise<T> {
  const cacheKey = `json:${filename}`;
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }

  try {
    // Try to load from API endpoint first (for production)
    const response = await fetch(`/api/content/${filename}`);
    if (response.ok) {
      const content = await response.json();
      contentCache.set(cacheKey, content);
      return content;
    }
  } catch (error) {
    console.warn(`Failed to load ${filename} from API:`, error);
  }

  // Fallback: try to load from public directory (for development)
  try {
    const response = await fetch(`/content/${filename}`);
    if (response.ok) {
      const content = await response.json();
      contentCache.set(cacheKey, content);
      return content;
    }
  } catch (error) {
    console.warn(`Failed to load ${filename} from public:`, error);
  }

  throw new Error(`Could not load JSON content: ${filename}`);
}

/**
 * Convenience functions for specific content types
 */
export const loadSiteInfo = (): Promise<SiteInfo> => 
  loadJsonContent<SiteInfo>('site-info.json');

export const loadHomeContent = (): Promise<HomeContent> => 
  loadJsonContent<HomeContent>('home.json');

export const loadServicesContent = (): Promise<ServicesContent> => 
  loadJsonContent<ServicesContent>('services.json');

export const loadAboutContent = (): Promise<MarkdownContent> => 
  loadMarkdownContent('about.md');

export const loadContactContent = (): Promise<MarkdownContent> => 
  loadMarkdownContent('contact.md');

/**
 * Clear the content cache (useful for development)
 */
export function clearContentCache(): void {
  contentCache.clear();
}

/**
 * Preload all content (useful for performance optimization)
 */
export async function preloadAllContent(): Promise<void> {
  try {
    await Promise.all([
      loadSiteInfo(),
      loadHomeContent(),
      loadServicesContent(),
      loadAboutContent(),
      loadContactContent(),
    ]);
  } catch (error) {
    console.warn('Failed to preload some content:', error);
  }
}
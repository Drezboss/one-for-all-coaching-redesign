import { useEffect } from 'react';

/**
 * Custom hook to update the page's meta description
 * @param description - The meta description text for the current page
 */
export function useMetaDescription(description: string) {
  useEffect(() => {
    // Find existing meta description tag or create one
    let metaDescription = document.querySelector('meta[name="description"]');
    
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    // Update the content
    metaDescription.setAttribute('content', description);
    
    // Cleanup function to restore the original description
    return () => {
      metaDescription?.setAttribute('content', 
        'Professional football coaching services with UEFA B Licensed coach Dave Cornock. Individual coaching, group sessions, and youth development programs.'
      );
    };
  }, [description]);
}

/**
 * Custom hook to update both page title and meta description
 * @param title - The page title
 * @param description - The meta description text
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    // Update title
    const originalTitle = document.title;
    document.title = `${title} | One For All Coaching`;
    
    // Find existing meta description tag or create one
    let metaDescription = document.querySelector('meta[name="description"]');
    
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    // Update the content
    const originalDescription = metaDescription.getAttribute('content') || '';
    metaDescription.setAttribute('content', description);
    
    // Cleanup function
    return () => {
      document.title = originalTitle;
      metaDescription?.setAttribute('content', originalDescription);
    };
  }, [title, description]);
}
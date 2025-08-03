import { useState, useEffect } from 'react';
import {
  loadSiteInfo,
  loadHomeContent,
  loadServicesContent,
  loadAboutContent,
  loadContactContent,
  type SiteInfo,
  type HomeContent,
  type ServicesContent,
  type MarkdownContent,
} from '@/lib/content-loader';

// Generic hook for loading any content with loading and error states
function useAsyncContent<T>(
  loader: () => Promise<T>,
  dependencies: any[] = []
): {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await loader();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
      console.error('Content loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, dependencies);

  return {
    data,
    loading,
    error,
    reload: loadContent,
  };
}

// Specific hooks for each content type
export const useSiteInfo = () => useAsyncContent<SiteInfo>(loadSiteInfo);

export const useHomeContent = () => useAsyncContent<HomeContent>(loadHomeContent);

export const useServicesContent = () => useAsyncContent<ServicesContent>(loadServicesContent);

export const useAboutContent = () => useAsyncContent<MarkdownContent>(loadAboutContent);

export const useContactContent = () => useAsyncContent<MarkdownContent>(loadContactContent);

// Hook for loading multiple content types at once
export function useMultipleContent() {
  const siteInfo = useSiteInfo();
  const homeContent = useHomeContent();
  const servicesContent = useServicesContent();

  return {
    siteInfo: siteInfo.data,
    homeContent: homeContent.data,
    servicesContent: servicesContent.data,
    loading: siteInfo.loading || homeContent.loading || servicesContent.loading,
    error: siteInfo.error || homeContent.error || servicesContent.error,
    reload: () => {
      siteInfo.reload();
      homeContent.reload();
      servicesContent.reload();
    },
  };
}
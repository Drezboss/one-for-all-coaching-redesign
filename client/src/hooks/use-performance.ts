import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  firstInputDelay?: number;
  cumulativeLayoutShift?: number;
}

export function usePerformance() {
  const metricsRef = useRef<PerformanceMetrics>({});
  const observerRef = useRef<PerformanceObserver | null>(null);

  useEffect(() => {
    // Track First Contentful Paint (FCP)
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            metricsRef.current.firstContentfulPaint = fcpEntry.startTime;
            console.log('FCP:', fcpEntry.startTime);
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Track Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            metricsRef.current.largestContentfulPaint = lastEntry.startTime;
            console.log('LCP:', lastEntry.startTime);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Track First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            metricsRef.current.firstInputDelay = entry.processingStart - entry.startTime;
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Track Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          metricsRef.current.cumulativeLayoutShift = clsValue;
          console.log('CLS:', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Cleanup observers
        return () => {
          fcpObserver.disconnect();
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance monitoring not supported:', error);
      }
    }
  }, []);

  const getMetrics = () => metricsRef.current;

  const logMetrics = () => {
    const metrics = getMetrics();
    console.group('Performance Metrics');
    console.log('First Contentful Paint:', metrics.firstContentfulPaint, 'ms');
    console.log('Largest Contentful Paint:', metrics.largestContentfulPaint, 'ms');
    console.log('First Input Delay:', metrics.firstInputDelay, 'ms');
    console.log('Cumulative Layout Shift:', metrics.cumulativeLayoutShift);
    console.groupEnd();
  };

  return {
    getMetrics,
    logMetrics,
  };
}

// Hook for tracking component render performance
export function useRenderPerformance(componentName: string) {
  const renderStartRef = useRef<number>(0);

  useEffect(() => {
    renderStartRef.current = performance.now();
    
    return () => {
      const renderTime = performance.now() - renderStartRef.current;
      if (renderTime > 16) { // Log if render takes longer than 16ms (60fps)
        console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`);
      }
    };
  });
}

// Hook for tracking image loading performance
export function useImagePerformance() {
  const trackImageLoad = (src: string) => {
    const startTime = performance.now();
    const img = new Image();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      console.log(`Image loaded: ${src} in ${loadTime.toFixed(2)}ms`);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
    };
    
    img.src = src;
  };

  return { trackImageLoad };
}
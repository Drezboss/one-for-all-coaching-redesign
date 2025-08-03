// Performance monitoring utility for Core Web Vitals tracking
interface PerformanceMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: PerformanceEntry[];
}

interface WebVitalsConfig {
  reportAllChanges?: boolean;
  onCLS?: (metric: PerformanceMetric) => void;
  onFCP?: (metric: PerformanceMetric) => void;
  onFID?: (metric: PerformanceMetric) => void;
  onINP?: (metric: PerformanceMetric) => void;
  onLCP?: (metric: PerformanceMetric) => void;
  onTTFB?: (metric: PerformanceMetric) => void;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();

  constructor(private config: WebVitalsConfig = {}) {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      try {
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              this.updateMetric('CLS', (entry as any).value);
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.set('CLS', clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.updateMetric('LCP', lastEntry.startTime, [lastEntry]);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.set('LCP', lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // First Contentful Paint (FCP)
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.updateMetric('FCP', entry.startTime, [entry]);
            }
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.set('FCP', fcpObserver);
      } catch (e) {
        console.warn('FCP observer not supported');
      }

      // Time to First Byte (TTFB)
      this.measureTTFB();
    }

    // First Input Delay (FID) / Interaction to Next Paint (INP)
    this.setupInputMetrics();
  }

  private updateMetric(name: string, value: number, entries: PerformanceEntry[] = []) {
    const existing = this.metrics.get(name);
    const delta = existing ? value - existing.value : value;
    
    const metric: PerformanceMetric = {
      name,
      value,
      delta,
      id: this.generateId(),
      entries
    };

    this.metrics.set(name, metric);

    // Call appropriate callback
    const callbackName = `on${name}` as keyof WebVitalsConfig;
    const callback = this.config[callbackName] as ((metric: PerformanceMetric) => void) | undefined;
    if (callback) {
      callback(metric);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name}: ${value.toFixed(2)}ms (Δ${delta.toFixed(2)})`);
    }
  }

  private setupInputMetrics() {
    let firstInputDelay: number | null = null;
    
    const handleFirstInput = (event: Event) => {
      const inputEvent = event as any;
      if (inputEvent.processingStart && inputEvent.startTime) {
        firstInputDelay = inputEvent.processingStart - inputEvent.startTime;
        this.updateMetric('FID', firstInputDelay);
        
        // Remove listener after first input
        ['pointerdown', 'mousedown', 'keydown', 'touchstart'].forEach(type => {
          window.removeEventListener(type, handleFirstInput, { capture: true });
        });
      }
    };

    // Listen for first input
    ['pointerdown', 'mousedown', 'keydown', 'touchstart'].forEach(type => {
      window.addEventListener(type, handleFirstInput, { passive: true, capture: true });
    });
  }

  private measureTTFB() {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      this.updateMetric('TTFB', ttfb, [navigationEntry]);
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  // Public API
  getMetric(name: string): PerformanceMetric | undefined {
    return this.metrics.get(name);
  }

  getAllMetrics(): Map<string, PerformanceMetric> {
    return new Map(this.metrics);
  }

  getPerformanceGrade(): 'A' | 'B' | 'C' | 'D' | 'F' {
    const lcp = this.metrics.get('LCP')?.value || 0;
    const fid = this.metrics.get('FID')?.value || 0;
    const cls = this.metrics.get('CLS')?.value || 0;

    let score = 0;

    // LCP scoring (40% weight)
    if (lcp <= 2500) score += 40;
    else if (lcp <= 4000) score += 25;
    else score += 0;

    // FID scoring (30% weight)
    if (fid <= 100) score += 30;
    else if (fid <= 300) score += 15;
    else score += 0;

    // CLS scoring (30% weight)
    if (cls <= 0.1) score += 30;
    else if (cls <= 0.25) score += 15;
    else score += 0;

    if (score >= 90) return 'A';
    if (score >= 75) return 'B';
    if (score >= 60) return 'C';
    if (score >= 40) return 'D';
    return 'F';
  }

  generateReport(): {
    metrics: Record<string, PerformanceMetric>;
    grade: string;
    recommendations: string[];
  } {
    const metrics = Object.fromEntries(this.metrics);
    const grade = this.getPerformanceGrade();
    const recommendations: string[] = [];

    // Generate recommendations based on metrics
    const lcp = metrics.LCP?.value;
    if (lcp && lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint by reducing server response times and optimizing critical resources');
    }

    const fid = metrics.FID?.value;
    if (fid && fid > 100) {
      recommendations.push('Improve First Input Delay by reducing JavaScript execution time and breaking up long tasks');
    }

    const cls = metrics.CLS?.value;
    if (cls && cls > 0.1) {
      recommendations.push('Reduce Cumulative Layout Shift by setting dimensions for images and avoiding dynamic content insertion');
    }

    const ttfb = metrics.TTFB?.value;
    if (ttfb && ttfb > 800) {
      recommendations.push('Improve Time to First Byte by optimizing server performance and using CDN');
    }

    return { metrics, grade, recommendations };
  }

  destroy() {
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.metrics.clear();
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export function initializePerformanceMonitoring(config?: WebVitalsConfig): PerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor(config);
  }
  return performanceMonitor;
}

export function getPerformanceMonitor(): PerformanceMonitor | null {
  return performanceMonitor;
}

// Hook for React components
export function usePerformanceMetrics() {
  if (!performanceMonitor) {
    console.warn('Performance monitor not initialized. Call initializePerformanceMonitoring() first.');
    return null;
  }

  return {
    getMetric: (name: string) => performanceMonitor?.getMetric(name),
    getAllMetrics: () => performanceMonitor?.getAllMetrics(),
    getGrade: () => performanceMonitor?.getPerformanceGrade(),
    getReport: () => performanceMonitor?.generateReport(),
  };
}

// Auto-initialize in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  initializePerformanceMonitoring({
    reportAllChanges: true,
    onLCP: (metric) => console.log('LCP:', metric),
    onFID: (metric) => console.log('FID:', metric),
    onCLS: (metric) => console.log('CLS:', metric),
    onFCP: (metric) => console.log('FCP:', metric),
    onTTFB: (metric) => console.log('TTFB:', metric),
  });
}
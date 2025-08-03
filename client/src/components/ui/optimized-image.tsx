import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoadingComplete?: () => void;
  fallbackSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoadingComplete,
  fallbackSrc,
  ...props
}: OptimizedImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setLoading(false);
    onLoadingComplete?.();
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setError(false);
      setLoading(true);
    }
  };

  // Generate responsive image sources
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [480, 768, 1024, 1280, 1920];
    return sizes
      .map(size => `${baseSrc}?w=${size}&q=${quality} ${size}w`)
      .join(', ');
  };

  return (
    <div className={cn('relative overflow-hidden', className)} ref={imgRef}>
      {/* Loading skeleton */}
      {loading && placeholder !== 'empty' && (
        <div className="absolute inset-0 loading-skeleton" />
      )}

      {/* Blur placeholder */}
      {loading && placeholder === 'blur' && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {(inView || priority) && (
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            loading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          srcSet={generateSrcSet(currentSrc)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          {...props}
        />
      )}

      {/* Error state */}
      {error && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Gallery component for multiple images
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function ImageGallery({ 
  images, 
  className, 
  columns = 3 
}: ImageGalleryProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div 
      className={cn(`grid gap-4 ${gridCols[columns]}`, className)}
      role="group"
      aria-label="Image gallery"
    >
      {images.map((image, index) => (
        <figure key={index} className="group">
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            className="aspect-square rounded-lg hover:scale-105 transition-transform duration-300"
            priority={index < 3} // Prioritize first 3 images
          />
          {image.caption && (
            <figcaption className="mt-2 text-sm text-muted-foreground text-center">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
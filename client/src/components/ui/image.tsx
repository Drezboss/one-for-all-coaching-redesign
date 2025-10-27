import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = '/attached_assets/placeholder-image.jpg',
  loading = 'lazy',
  className,
  onError,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    setHasError(true);
    
    // Try fallback image if available
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
    
    // Call original onError if provided
    if (onError) {
      onError(e);
    }
  };

  return (
    <div className={cn('relative', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
      
      <img
        src={imgSrc}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError && imgSrc === fallbackSrc ? 'opacity-50' : ''
        )}
        {...props}
      />
      
      {hasError && imgSrc === fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="text-sm">Image not available</div>
          </div>
        </div>
      )}
    </div>
  );
};
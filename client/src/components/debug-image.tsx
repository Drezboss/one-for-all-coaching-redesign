import React, { useState, useEffect } from 'react';

interface DebugImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const DebugImage: React.FC<DebugImageProps> = ({ src, alt, className }) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageInfo, setImageInfo] = useState<{
    naturalWidth: number;
    naturalHeight: number;
    displayWidth: number;
    displayHeight: number;
  } | null>(null);

  useEffect(() => {
    const img = new window.Image();
    
    img.onload = () => {
      setImageStatus('loaded');
      setImageInfo({
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        displayWidth: img.width,
        displayHeight: img.height,
      });
    };
    
    img.onerror = () => {
      setImageStatus('error');
    };
    
    img.src = src;
  }, [src]);

  return (
    <div className={`debug-image ${className || ''}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onLoad={() => setImageStatus('loaded')}
        onError={() => setImageStatus('error')}
      />
      
      {/* Debug info - only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-75 text-white text-xs p-2">
          <div>Status: {imageStatus}</div>
          {imageInfo && (
            <>
              <div>Natural: {imageInfo.naturalWidth}x{imageInfo.naturalHeight}</div>
              <div>Display: {imageInfo.displayWidth}x{imageInfo.displayHeight}</div>
            </>
          )}
          <div>Src: {src}</div>
        </div>
      )}
    </div>
  );
};
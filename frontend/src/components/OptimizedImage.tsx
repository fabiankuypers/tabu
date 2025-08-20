import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  onLoad,
  onError,
  priority = false
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Preload image if priority is set
  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
    }
  }, [src, priority]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const imageElement = document.getElementById(`img-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (imageElement && !priority) {
      observer.observe(imageElement);
    } else if (priority) {
      setIsVisible(true);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    }
    
    onError?.();
  };

  const imageId = `img-${src.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div 
      id={imageId}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-800/50 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-slate-600 border-t-slate-400 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
          <div className="text-center text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Bild nicht verfügbar</p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {(isVisible || priority) && (
        <img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          } ${className.includes('group-hover:scale-') ? '' : 'group-hover:scale-110'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}

      {/* Gradient Overlay for Cards */}
      {className.includes('card-image') && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
      )}
    </div>
  );
};

export default OptimizedImage;
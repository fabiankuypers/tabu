import React, { useState, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';

interface PhotoPreviewModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'previous') => void;
}

const PhotoPreviewModal: React.FC<PhotoPreviewModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onNavigate('previous');
      } else if (event.key === 'ArrowRight') {
        onNavigate('next');
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Don't modify body overflow as the parent modal already handles it
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNavigate]);

  const handleNavigation = (direction: 'next' | 'previous') => {
    setIsAnimating(true);
    setTimeout(() => {
      onNavigate(direction);
      setIsAnimating(false);
    }, 150);
  };

  if (!isOpen || !images.length) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[60] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[70] w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300 touch-manipulation"
        style={{
          borderColor: 'var(--color-accent-border)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
          e.currentTarget.style.backgroundColor = 'var(--color-accent-muted)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-accent-border)';
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[70]">
        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
          <span className="text-white text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Previous Arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigation('previous');
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-[70] w-14 h-14 rounded-full bg-black/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300 touch-manipulation"
          style={{
            borderColor: 'var(--color-accent-border)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
            e.currentTarget.style.backgroundColor = 'var(--color-accent-muted)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent-border)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
          }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next Arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigation('next');
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-[70] w-14 h-14 rounded-full bg-black/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300 touch-manipulation"
          style={{
            borderColor: 'var(--color-accent-border)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
            e.currentTarget.style.backgroundColor = 'var(--color-accent-muted)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent-border)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
          }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Main Image Container */}
      <div 
        className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
          <OptimizedImage
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1} of ${images.length}`}
            className={`w-full h-full object-contain rounded-lg transition-all duration-300 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            fallbackSrc="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center"
            priority={true}
          />
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[70]">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-slate-700/50 max-w-[90vw] overflow-x-auto">
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Navigate directly to the clicked image
                    const direction = index > currentIndex ? 'next' : 'previous';
                    const steps = Math.abs(index - currentIndex);
                    
                    // Set the target index directly for immediate response
                    if (index !== currentIndex) {
                      for (let i = 0; i < steps; i++) {
                        setTimeout(() => onNavigate(direction), i * 50);
                      }
                    }
                  }}
                  className={`relative w-12 h-12 rounded-md overflow-hidden border-2 transition-all duration-300 touch-manipulation ${
                    index === currentIndex 
                      ? 'scale-110' 
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: index === currentIndex 
                      ? 'var(--color-accent-primary)' 
                      : 'transparent'
                  }}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoPreviewModal;
import React, { useEffect, useState } from 'react';
import type { Lady } from '../data/mock-data';
import { useGlobalLanguage } from '../hooks/useGlobalLanguage';

interface LadyDetailsModalProps {
  lady: Lady | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (lady: Lady) => void;
  allLadies?: Lady[];
  currentIndex?: number;
  onNavigateLady?: (direction: 'next' | 'previous') => void;
}

const LadyDetailsModal: React.FC<LadyDetailsModalProps> = ({
  lady,
  isOpen,
  onClose,
  onBook,
  allLadies = [],
  currentIndex = 0,
  onNavigateLady
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { t, language } = useGlobalLanguage();

  // Reset image index when lady changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [lady?.id]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  console.log('👩 LadyDetailsModal render - isOpen:', isOpen, 'lady:', lady?.name);
  
  if (!isOpen || !lady) {
    console.log('👩 LadyDetailsModal not rendering - isOpen:', isOpen, 'lady exists:', !!lady);
    return null;
  }
  
  console.log('👩 LadyDetailsModal rendering for lady:', lady.name);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const gallery = lady.galleryImages || [lady.imageUrl];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl mx-4 max-h-[95vh] overflow-y-auto">
        <div className="bg-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Left Side - Images */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-96 lg:h-full overflow-hidden rounded-l-3xl lg:rounded-bl-3xl lg:rounded-tr-none rounded-tr-3xl">
                <img
                  src={gallery[selectedImageIndex]}
                  alt={lady.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-800/80 transition-colors z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Availability Badge */}
                <div className="absolute top-6 left-6">
                  <span className={`px-4 py-2 backdrop-blur-sm text-white text-sm font-medium rounded-full ${
                    lady.available 
                      ? 'bg-green-600/80' 
                      : 'bg-red-600/80'
                  }`}>
                    {lady.available ? t('status.available') : t('status.booked')}
                  </span>
                </div>

                {/* Lady Counter */}
                {onNavigateLady && allLadies.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <div className="bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                      {currentIndex + 1} / {allLadies.length}
                    </div>
                  </div>
                )}

                {/* Lady Navigation Arrows */}
                {onNavigateLady && allLadies.length > 1 && (
                  <>
                    <button
                      onClick={() => onNavigateLady('previous')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-800/80 transition-colors z-20"
                      title="Vorherige Lady"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onNavigateLady('next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-800/80 transition-colors z-20"
                      title="Nächste Lady"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Navigation Arrows - smaller and positioned differently */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? gallery.length - 1 : selectedImageIndex - 1)}
                      className="absolute left-16 bottom-20 w-8 h-8 bg-slate-900/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-800/80 transition-colors"
                      title="Vorheriges Bild"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(selectedImageIndex === gallery.length - 1 ? 0 : selectedImageIndex + 1)}
                      className="absolute right-16 bottom-20 w-8 h-8 bg-slate-900/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-800/80 transition-colors"
                      title="Nächstes Bild"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {gallery.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index 
                            ? 'border-white' 
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${lady.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Details */}
            <div className="p-8 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-serif text-white mb-3">{lady.name}</h1>
                <div className="flex items-center gap-4 text-slate-300 mb-4">
                  <span>{lady.age} {t('modal.years')}</span>
                  <span>•</span>
                  <span>{lady.height}</span>
                  <span>•</span>
                  <span>{lady.location}</span>
                </div>
                <div className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent-primary)' }}>
                  {formatPrice(lady.pricePerHour)}/{t('modal.per_hour').replace('pro ', '')}
                </div>
              </div>

              {/* About */}
              <div>
                <h3 className="text-xl font-serif mb-3" style={{ color: 'var(--color-accent-primary)' }}>
                  {t('modal.about_me')}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {lady.aboutMe}
                </p>
              </div>

              {/* Personality */}
              <div>
                <h3 className="text-lg font-serif mb-3" style={{ color: 'var(--color-accent-primary)' }}>
                  {t('modal.personality')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lady.personality.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-800/50 text-slate-300 text-sm rounded-full border border-slate-700/50"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-lg font-serif mb-3" style={{ color: 'var(--color-accent-primary)' }}>
                  {t('modal.interests')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lady.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-full border"
                      style={{
                        backgroundColor: 'var(--color-accent-muted)',
                        color: 'var(--color-accent-primary)',
                        borderColor: 'var(--color-accent-border)'
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-serif mb-3" style={{ color: 'var(--color-accent-primary)' }}>
                  {t('modal.services')}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {lady.services.slice(0, 6).map((service, index) => (
                    <div key={index} className="flex items-center text-slate-300 text-sm">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: 'var(--color-accent-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-lg font-serif mb-3" style={{ color: 'var(--color-accent-primary)' }}>
                  {t('modal.languages')}
                </h3>
                <div className="flex gap-2 text-slate-300">
                  {lady.languages.join(' • ')}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 border-t border-slate-700/50">
                <button
                  onClick={() => onBook(lady)}
                  disabled={!lady.available}
                  className={`w-full font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform text-lg ${
                    lady.available
                      ? 'hover:scale-105 hover:shadow-2xl'
                      : 'cursor-not-allowed opacity-60'
                  }`}
                  style={lady.available ? {
                    background: 'var(--bg-gradient-accent)',
                    color: 'var(--color-text-on-accent)',
                    boxShadow: 'var(--shadow-accent)'
                  } : {
                    backgroundColor: 'rgb(71 85 105)',
                    color: 'rgb(148 163 184)'
                  }}
                  onMouseEnter={lady.available ? (e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-accent-lg), 0 0 30px var(--color-accent-glow)';
                  } : undefined}
                  onMouseLeave={lady.available ? (e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
                  } : undefined}
                >
                  {lady.available ? t('button.book_now') : t('modal.not_available_currently')}
                </button>
                
                {lady.available && (
                  <p className="text-center text-slate-400 text-sm mt-3">
                    {t('modal.discretion')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LadyDetailsModal;
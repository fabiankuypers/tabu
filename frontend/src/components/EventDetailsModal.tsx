import React, { useEffect } from 'react';
import type { Event } from '../data/mock-data';

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (event: Event) => void;
  userLevel: number;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  isOpen,
  onClose,
  onRegister,
  userLevel
}) => {
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

  if (!isOpen || !event) return null;

  const isAccessible = userLevel >= event.level;
  const isFull = event.currentGuests >= event.maxGuests;
  const spotsLeft = event.maxGuests - event.currentGuests;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return 'Basis';
      case 2: return 'Premium';
      case 3: return 'VIP';
      default: return 'Unbekannt';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl">
          {/* Header with Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-800/80 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Level Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-slate-900/80 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-slate-700/50">
                {getLevelLabel(event.level)} Level
              </span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-20">
              <h1 className="text-3xl md:text-4xl font-serif text-white mb-2 leading-tight">
                {event.title}
              </h1>
              <div className="flex items-center gap-4 text-slate-300">
                <span>{formatDate(event.date)}</span>
                <span>•</span>
                <span>{event.time} Uhr</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-xl font-serif mb-4" style={{ color: 'var(--color-accent-primary)' }}>
                    Über das Event
                  </h2>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-serif mb-4" style={{ color: 'var(--color-accent-primary)' }}>
                    Inkludierte Leistungen
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {event.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: 'var(--color-accent-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location & Dresscode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-serif mb-3" style={{ color: 'var(--color-accent-primary)' }}>
                      Location
                    </h4>
                    <div className="flex items-center text-slate-300">
                      <svg className="w-5 h-5 mr-3" style={{ color: 'var(--color-accent-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-serif mb-3" style={{ color: 'var(--color-accent-primary)' }}>
                      Dresscode
                    </h4>
                    <div className="flex items-center text-slate-300">
                      <svg className="w-5 h-5 mr-3" style={{ color: 'var(--color-accent-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{event.dresscode}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Booking Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatPrice(event.price)}
                    </div>
                    <div className="text-slate-400 text-sm">pro Person</div>
                  </div>

                  {/* Availability */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Verfügbare Plätze</span>
                      <span className={`font-semibold ${isFull ? 'text-red-400' : spotsLeft <= 3 ? 'text-orange-400' : 'text-green-400'}`}>
                        {isFull ? 'Ausgebucht' : `${spotsLeft} verfügbar`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(event.currentGuests / event.maxGuests) * 100}%`,
                          backgroundColor: isFull ? '#ef4444' : spotsLeft <= 3 ? '#f59e0b' : 'var(--color-accent-primary)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    onClick={() => isAccessible && !isFull && onRegister(event)}
                    disabled={!isAccessible || isFull}
                    className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform ${
                      isAccessible && !isFull
                        ? 'hover:scale-105 hover:shadow-lg'
                        : 'cursor-not-allowed opacity-60'
                    }`}
                    style={isAccessible && !isFull ? {
                      backgroundColor: 'var(--color-accent-primary)',
                      color: 'var(--color-text-on-accent)'
                    } : {
                      backgroundColor: 'rgb(71 85 105)',
                      color: 'rgb(148 163 184)'
                    }}
                    onMouseEnter={isAccessible && !isFull ? (e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
                    } : undefined}
                    onMouseLeave={isAccessible && !isFull ? (e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
                      e.currentTarget.style.boxShadow = '';
                    } : undefined}
                  >
                    {!isAccessible 
                      ? `${getLevelLabel(event.level)} Level erforderlich`
                      : isFull 
                        ? 'Event ausgebucht' 
                        : 'Jetzt anmelden'
                    }
                  </button>

                  {!isAccessible && (
                    <div className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <p className="text-slate-400 text-sm text-center">
                        Upgrade auf {getLevelLabel(event.level)} Level für Zugang zu diesem Event
                      </p>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
                  <h4 className="text-lg font-serif mb-4" style={{ color: 'var(--color-accent-primary)' }}>
                    Event Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Maximale Gäste</span>
                      <span className="text-slate-300">{event.maxGuests} Personen</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Angemeldete Gäste</span>
                      <span className="text-slate-300">{event.currentGuests} Personen</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mitgliedschaftslevel</span>
                      <span className="text-slate-300">{getLevelLabel(event.level)} oder höher</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
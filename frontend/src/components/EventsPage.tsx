import React, { useState } from 'react';
import { mockEvents } from '../data/mock-data';
import type { Event } from '../data/mock-data';
import EventDetailsModal from './EventDetailsModal';
import Navigation from './Navigation';

interface EventCardProps {
  event: Event;
  userLevel?: number;
  onJoinEvent: (event: Event) => void;
  onViewDetails: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, userLevel = 1, onJoinEvent, onViewDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
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

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-500/90';
      case 2: return 'bg-amber-500/90';
      case 3: return 'bg-purple-500/90';
      default: return 'bg-slate-500/90';
    }
  };

  return (
    <div 
      className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 ${
        isAccessible 
          ? 'border-slate-700/50 hover:shadow-lg'
          : 'border-slate-700/30 opacity-60'
      }`}
      onMouseEnter={isAccessible ? (e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent-border)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px var(--color-accent-glow)';
      } : undefined}
      onMouseLeave={isAccessible ? (e) => {
        e.currentTarget.style.borderColor = 'rgb(51 65 85 / 0.5)';
        e.currentTarget.style.boxShadow = '';
      } : undefined}
    >
      {/* Level Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1 text-white text-xs font-medium rounded-full backdrop-blur-sm ${getLevelColor(event.level)}`}>
          {getLevelLabel(event.level)} Level
        </span>
      </div>

      {/* Availability Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
          isFull 
            ? 'bg-red-500/90 text-white' 
            : spotsLeft <= 3
              ? 'bg-orange-500/90 text-white'
              : 'bg-green-500/90 text-white'
        }`}>
          {isFull ? 'Ausgebucht' : `${spotsLeft} Plätze`}
        </span>
      </div>

      {/* Access Overlay for restricted events */}
      {!isAccessible && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl">
          <div className="text-center p-6">
            <svg className="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h4 className="text-lg font-semibold text-slate-300 mb-2">
              {getLevelLabel(event.level)} Level erforderlich
            </h4>
            <p className="text-slate-400 text-sm">
              Dieses Event erfordert eine höhere Mitgliedschaftsstufe.
            </p>
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          }`}
          onLoad={() => {
            console.log('🎉 Event image loaded:', event.title, event.imageUrl);
            setImageLoaded(true);
          }}
          onError={() => {
            console.log('❌ Event image failed to load:', event.title, event.imageUrl);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        
        {/* Price Overlay */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-slate-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border" style={{ borderColor: 'var(--color-accent-border)' }}>
            <span className="font-semibold" style={{ color: 'var(--color-accent-primary)' }}>{formatPrice(event.price)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Event Title */}
        <h3 
          className="text-xl font-serif mb-3 transition-colors duration-300"
          style={{ color: 'var(--color-accent-primary)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-light)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center text-slate-300">
            <svg className="w-4 h-4 mr-2" style={{ color: 'var(--color-accent-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.date)} um {event.time}
          </div>
          <div className="flex items-center text-slate-300">
            <svg className="w-4 h-4 mr-2" style={{ color: 'var(--color-accent-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
          <div className="flex items-center text-slate-300">
            <svg className="w-4 h-4 mr-2" style={{ color: 'var(--color-accent-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Dresscode: {event.dresscode}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {event.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md border border-slate-600/50"
              >
                {feature}
              </span>
            ))}
            {event.features.length > 2 && (
              <span className="px-2 py-1 text-xs" style={{ color: 'var(--color-accent-primary)' }}>
                +{event.features.length - 2} weitere
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Details Button */}
          <button
            onClick={() => {
              console.log('🎉 EventCard Details Button clicked for event:', event.title, event.id);
              onViewDetails(event);
            }}
            className="w-full font-medium py-3 px-6 rounded-lg border border-slate-600/50 text-slate-300 hover:text-white hover:border-slate-500/50 transition-all duration-300"
          >
            Details ansehen
          </button>

          {/* CTA Button */}
          <button
            onClick={() => {
              console.log('🎉 EventCard Anmelden Button clicked for event:', event.title, event.id, 'Accessible:', isAccessible, 'Full:', isFull);
              onJoinEvent(event);
            }}
            disabled={!isAccessible || isFull}
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform ${
              isAccessible && !isFull
                ? 'hover:scale-105 hover:shadow-lg'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
            style={isAccessible && !isFull ? {
              backgroundColor: 'var(--color-accent-primary)',
              color: 'var(--color-text-on-accent)'
            } : {}}
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
              ? 'Level erforderlich'
              : isFull 
                ? 'Ausgebucht' 
                : 'Anmelden'
            }
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      {isAccessible && !isFull && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(to right, var(--color-accent-muted), transparent, var(--color-accent-muted))`
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

const EventsPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [userLevel, setUserLevel] = useState(2); // Simulated user level
  const [filter, setFilter] = useState<'all' | 'accessible'>('all');
  const [showModal, setShowModal] = useState(false);
  const [modalEvent, setModalEvent] = useState<Event | null>(null);

  const handleJoinEvent = (event: Event) => {
    console.log('🎉 handleJoinEvent called with event:', event.title, event.id);
    setSelectedEvent(event);
    console.log('🎉 Selected event state updated');
    // Close modal if open
    setShowModal(false);
    console.log('🎉 Modal closed');
  };

  const handleViewDetails = (event: Event) => {
    console.log('🔍 handleViewDetails called with event:', event.title, event.id);
    setModalEvent(event);
    console.log('🔍 Modal event state set');
    setShowModal(true);
    console.log('🔍 Modal show state set to true');
  };

  const closeModal = () => {
    setShowModal(false);
    setModalEvent(null);
  };

  const filteredEvents = filter === 'accessible' 
    ? mockEvents.filter(event => userLevel >= event.level)
    : mockEvents;

  return (
    <>
      <Navigation currentPage="events" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-24">
      {/* Header Section */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
              Exklusive
              <span 
                className="text-transparent bg-clip-text block"
                style={{
                  background: `linear-gradient(to right, var(--color-accent-primary), var(--color-accent-dark))`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
              >
                Events
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Diskrete Zusammenkünfte für kultivierte Gentlemen mit anspruchsvollem Geschmack.
            </p>
          </div>

          {/* User Level Display */}
          <div className="flex justify-center mb-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
              <span className="text-slate-300 text-sm">
                Ihr Level: <span className="font-semibold" style={{ color: 'var(--color-accent-primary)' }}>{userLevel} - Premium</span>
              </span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-1 border border-slate-700/50">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? ''
                    : 'text-slate-300'
                }`}
                style={filter === 'all' ? {
                  backgroundColor: 'var(--color-accent-primary)',
                  color: 'var(--color-text-on-accent)'
                } : {}}
                onMouseEnter={filter !== 'all' ? (e) => e.currentTarget.style.color = 'var(--color-accent-primary)' : undefined}
                onMouseLeave={filter !== 'all' ? (e) => e.currentTarget.style.color = 'rgb(203 213 225)' : undefined}
              >
                Alle Events
              </button>
              <button
                onClick={() => setFilter('accessible')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                  filter === 'accessible'
                    ? ''
                    : 'text-slate-300'
                }`}
                style={filter === 'accessible' ? {
                  backgroundColor: 'var(--color-accent-primary)',
                  color: 'var(--color-text-on-accent)'
                } : {}}
                onMouseEnter={filter !== 'accessible' ? (e) => e.currentTarget.style.color = 'var(--color-accent-primary)' : undefined}
                onMouseLeave={filter !== 'accessible' ? (e) => e.currentTarget.style.color = 'rgb(203 213 225)' : undefined}
              >
                Verfügbar für Sie
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              userLevel={userLevel}
              onJoinEvent={handleJoinEvent}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              Keine Events für Ihr aktuelles Level verfügbar.
            </p>
            <button
              onClick={() => setFilter('all')}
              className="mt-4 transition-colors"
              style={{ color: 'var(--color-accent-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-light)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
            >
              Alle anzeigen
            </button>
          </div>
        )}
      </div>

      {/* Bottom Info Section */}
      <div className="border-t border-slate-800/50">
        <div className="px-6 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif mb-4" style={{ color: 'var(--color-accent-primary)' }}>
              Diskretion & Exklusivität
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Unsere Events sind sorgfältig kuratiert und bieten Ihnen die Möglichkeit, 
              Gleichgesinnte in einer Atmosphäre von Eleganz und Vertrauen zu treffen.
            </p>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={modalEvent}
        isOpen={showModal}
        onClose={closeModal}
        onRegister={handleJoinEvent}
        userLevel={userLevel}
      />
      </div>
    </>
  );
};

export default EventsPage;
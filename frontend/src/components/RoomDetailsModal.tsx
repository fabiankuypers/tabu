import React, { useEffect, useState } from 'react';
import type { Room } from '../data/mock-data';

interface RoomDetailsModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (room: Room) => void;
}

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  room,
  isOpen,
  onClose,
  onBook
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  console.log('🏠 RoomDetailsModal render - isOpen:', isOpen, 'room:', room?.name);
  
  if (!isOpen || !room) {
    console.log('🏠 RoomDetailsModal not rendering - isOpen:', isOpen, 'room exists:', !!room);
    return null;
  }
  
  console.log('🏠 RoomDetailsModal rendering for room:', room.name);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const gallery = room.galleryImages || [room.imageUrl];


  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'intimate': return 'Intimer Bereich';
      case 'luxury': return 'Luxus-Suite';
      case 'suite': return 'Premium-Suite';
      default: return category;
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
      <div className="relative w-full max-w-7xl mx-4 max-h-[95vh] overflow-y-auto">
        <div className="bg-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
          
          {/* Header with Large Image */}
          <div className="relative h-80 md:h-96">
            <img
              src={gallery[selectedImageIndex]}
              alt={room.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-800/80 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-slate-900/80 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-slate-700/50">
                {getCategoryLabel(room.category)}
              </span>
            </div>

            {/* Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? gallery.length - 1 : selectedImageIndex - 1)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-800/80 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImageIndex(selectedImageIndex === gallery.length - 1 ? 0 : selectedImageIndex + 1)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-800/80 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-20">
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-2 leading-tight">
                {room.name}
              </h1>
              <div className="flex items-center gap-4 text-slate-200">
                <span>Bis zu {room.maxGuests} Gäste</span>
                <span>•</span>
                <span>65 m²</span>
                <span>•</span>
                <span>2. Etage</span>
              </div>
            </div>
          </div>

          {/* Image Gallery Thumbnails */}
          {gallery.length > 1 && (
            <div className="px-8 py-6 border-b border-slate-700/50">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-white' 
                        : 'border-slate-700/50 opacity-70 hover:opacity-100 hover:border-slate-600/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${room.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-serif mb-4" style={{ color: 'var(--color-accent-primary)' }}>
                    Über diesen Raum
                  </h2>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {room.description}
                  </p>
                </div>

                {/* Room Features */}
                <div>
                  <h3 className="text-xl font-serif mb-4" style={{ color: 'var(--color-accent-primary)' }}>
                    Ausstattung
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {room.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: 'var(--color-accent-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-xl font-serif mb-4" style={{ color: 'var(--color-accent-primary)' }}>
                    Premium-Annehmlichkeiten
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-start text-slate-300 text-sm">
                        <svg className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mood Tags */}
                <div>
                  <h3 className="text-xl font-serif mb-4" style={{ color: 'var(--color-accent-primary)' }}>
                    Atmosphäre
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {room.mood.map((mood, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm rounded-full border"
                        style={{
                          backgroundColor: 'var(--color-accent-muted)',
                          color: 'var(--color-accent-primary)',
                          borderColor: 'var(--color-accent-border)'
                        }}
                      >
                        {mood}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 sticky top-8">
                  
                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatPrice(room.pricePerHour)}
                    </div>
                    <div className="text-slate-400">pro Stunde</div>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kategorie</span>
                      <span className="text-slate-300">{getCategoryLabel(room.category)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Maximale Gäste</span>
                      <span className="text-slate-300">{room.maxGuests} Personen</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Größe</span>
                      <span className="text-slate-300">{room.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Lage</span>
                      <span className="text-slate-300">{room.location}</span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className={`mb-6 p-4 rounded-lg border ${
                    room.availability === 'available'
                      ? 'bg-green-900/20 border-green-500/30'
                      : room.availability === 'booked'
                        ? 'bg-red-900/20 border-red-500/30'
                        : 'bg-orange-900/20 border-orange-500/30'
                  }`}>
                    <div className={`flex items-center ${
                      room.availability === 'available'
                        ? 'text-green-400'
                        : room.availability === 'booked'
                          ? 'text-red-400'
                          : 'text-orange-400'
                    }`}>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={room.availability === 'available' ? "M5 13l4 4L19 7" : room.availability === 'booked' ? "M6 18L18 6M6 6l12 12" : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"} />
                      </svg>
                      <span className="text-sm">
                        {room.availability === 'available'
                          ? 'Aktuell verfügbar'
                          : room.availability === 'booked'
                            ? 'Ausgebucht'
                            : 'Wartung'
                        }
                      </span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => onBook(room)}
                    className="w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
                    style={{
                      background: 'var(--bg-gradient-accent)',
                      color: 'var(--color-text-on-accent)',
                      boxShadow: 'var(--shadow-accent)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-accent-lg), 0 0 30px var(--color-accent-glow)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
                    }}
                  >
                    Jetzt reservieren
                  </button>

                  <p className="text-center text-slate-400 text-sm mt-4">
                    Sofortige Bestätigung • Diskret • Sicher
                  </p>

                  {/* Contact */}
                  <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
                    <p className="text-slate-400 text-sm mb-2">Haben Sie Fragen?</p>
                    <button className="text-accent-primary hover:text-accent-light transition-colors text-sm font-medium">
                      Concierge kontaktieren
                    </button>
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

export default RoomDetailsModal;
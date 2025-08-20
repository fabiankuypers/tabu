import React, { useState } from 'react';
import { mockRooms } from '../data/mock-data';
import type { Room } from '../data/mock-data';
import { useGlobalLanguage } from '../hooks/useGlobalLanguage';
import RoomDetailsModal from './RoomDetailsModal';
import OptimizedImage from './OptimizedImage';

interface RoomCardProps {
  room: Room;
  onSelectRoom: (room: Room) => void;
  onViewDetails: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onSelectRoom, onViewDetails }) => {
  const { t } = useGlobalLanguage();
  
  console.log('🏠 RoomCard rendering for:', room.name, 'imageUrl:', room.imageUrl);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'intimate': return t('rooms.category.intimate');
      case 'luxury': return t('rooms.category.luxury'); 
      case 'suite': return t('rooms.category.suite');
      default: return category;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div 
      className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent-border)';
        e.currentTarget.style.boxShadow = '0 25px 50px -12px var(--color-accent-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgb(51 65 85 / 0.5)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span 
          className="px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm"
          style={{ 
            backgroundColor: 'var(--color-accent-primary)', 
            color: 'var(--color-text-on-accent)' 
          }}
        >
          {getCategoryLabel(room.category)}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <OptimizedImage
          src={room.imageUrl}
          alt={room.name}
          className="card-image group-hover:scale-110"
          fallbackSrc="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center"
        />
        
        {/* Price Overlay */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-slate-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border" style={{ borderColor: 'var(--color-accent-border)' }}>
            <span className="font-semibold" style={{ color: 'var(--color-accent-primary)' }}>{formatPrice(room.pricePerHour)}</span>
            <span className="text-slate-300 text-sm ml-1">/Stunde</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Room Name */}
        <h3 
          className="text-2xl font-serif text-white mb-3 transition-colors duration-300"
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
        >
          {room.name}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-base leading-relaxed mb-4 line-clamp-3">
          {room.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {room.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-md border border-slate-700/50"
              >
                {feature}
              </span>
            ))}
            {room.features.length > 3 && (
              <span className="px-2 py-1 text-xs" style={{ color: 'var(--color-accent-primary)' }}>
                +{room.features.length - 3} weitere
              </span>
            )}
          </div>
        </div>

        {/* Room Info */}
        <div className="flex items-center justify-between mb-6 text-sm text-slate-400">
          <span>Bis zu {room.maxGuests} Gäste</span>
          <span>Premium Ausstattung</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Details Button */}
          <button
            onClick={() => {
              console.log('🔍 RoomCard Details Button clicked for room:', room.name, room.id);
              onViewDetails(room);
            }}
            className="w-full font-medium py-3 px-6 rounded-lg border border-slate-600/50 text-slate-300 hover:text-white hover:border-slate-500/50 transition-all duration-300"
          >
{t('button.details')}
          </button>

          {/* CTA Button */}
          <button
            onClick={() => {
              console.log('🏠 RoomCard Reservieren Button clicked for room:', room.name, room.id);
              onSelectRoom(room);
            }}
            className="w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            style={{ 
              background: 'var(--bg-gradient-accent)',
              color: 'var(--color-text-on-accent)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-accent-light)';
              e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-gradient-accent)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
{t('button.reserve_now')}
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{ 
            background: `linear-gradient(to right, var(--color-accent-muted), transparent, var(--color-accent-muted))`
          }}
        ></div>
      </div>
    </div>
  );
};

const RoomSelection: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalRoom, setModalRoom] = useState<Room | null>(null);
  const { t } = useGlobalLanguage();

  const handleSelectRoom = (room: Room) => {
    console.log('🏠 handleSelectRoom called with room:', room.name, room.id);
    setSelectedRoom(room);
    console.log('🏠 Selected room state updated');
    // Close modal if open
    setShowModal(false);
    console.log('🏠 Modal closed');
  };

  const handleViewDetails = (room: Room) => {
    console.log('🔍 handleViewDetails called with room:', room.name, room.id);
    setModalRoom(room);
    console.log('🔍 Modal room state set');
    setShowModal(true);
    console.log('🔍 Modal show state set to true');
  };

  const closeModal = () => {
    setShowModal(false);
    setModalRoom(null);
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-24">
      {/* Header Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight">
              {t('rooms.title')}
              <span 
                className="text-transparent bg-clip-text block"
                style={{ 
                  background: `linear-gradient(to right, var(--color-accent-primary), var(--color-accent-dark))`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
              >
                {t('rooms.title.highlight')}
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              {t('rooms.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mockRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onSelectRoom={handleSelectRoom}
              onViewDetails={handleViewDetails}
            />
          ))}
          </div>
        </div>
      </section>

      {/* Bottom Section - Experience Hint */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif mb-4" style={{ color: 'var(--color-accent-primary)' }}>
              {t('rooms.nextstep.title')}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t('rooms.nextstep.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Room Details Modal */}
      <RoomDetailsModal
        room={modalRoom}
        isOpen={showModal}
        onClose={closeModal}
        onBook={handleSelectRoom}
      />
    </div>
  );
};

export default RoomSelection;
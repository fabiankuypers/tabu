import React, { useState } from 'react';
import { mockLadies, type Lady } from '../data/mock-data';

interface LadyCardProps {
  lady: Lady;
  onSelectLady: (lady: Lady) => void;
}

const LadyCard: React.FC<LadyCardProps> = ({ lady, onSelectLady }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent-border)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px var(--color-accent-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgb(51 65 85 / 0.5)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Availability Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
          lady.available 
            ? 'bg-green-500/90 text-white' 
            : 'bg-red-500/90 text-white'
        }`}>
          {lady.available ? 'Verfügbar' : 'Beschäftigt'}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={lady.imageUrl}
          alt={lady.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name */}
        <h3 
          className="text-2xl font-serif mb-3 transition-colors duration-300"
          style={{ color: 'var(--color-accent-primary)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-light)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
        >
          {lady.name}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-base leading-relaxed mb-4 line-clamp-2">
          {lady.description}
        </p>

        {/* Personality Traits */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-400 mb-2">Persönlichkeit</h4>
          <div className="flex flex-wrap gap-2">
            {lady.personality.slice(0, 3).map((trait, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md border border-slate-600/50"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-400 mb-2">Interessen</h4>
          <div className="flex flex-wrap gap-2">
            {lady.interests.slice(0, 2).map((interest, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-md border"
                style={{
                  backgroundColor: 'var(--color-accent-muted)',
                  color: 'var(--color-accent-primary)',
                  borderColor: 'var(--color-accent-border)'
                }}
              >
                {interest}
              </span>
            ))}
            {lady.interests.length > 2 && (
              <span className="px-2 py-1 text-xs" style={{ color: 'var(--color-accent-primary)' }}>
                +{lady.interests.length - 2} weitere
              </span>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-400 mb-2">Sprachen</h4>
          <div className="flex flex-wrap gap-1">
            {lady.languages.map((language, index) => (
              <span key={index} className="text-slate-300 text-xs">
                {language}{index < lady.languages.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onSelectLady(lady)}
          disabled={!lady.available}
          className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform ${
            lady.available
              ? 'hover:scale-105 hover:shadow-lg'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
          style={lady.available ? {
            backgroundColor: 'var(--color-accent-primary)',
            color: 'var(--color-text-on-accent)'
          } : {}}
          onMouseEnter={lady.available ? (e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
            e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
          } : undefined}
          onMouseLeave={lady.available ? (e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
            e.currentTarget.style.boxShadow = '';
          } : undefined}
        >
          {lady.available ? 'Profil ansehen' : 'Nicht verfügbar'}
        </button>
      </div>

      {/* Hover Glow Effect */}
      {lady.available && (
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

const LadySelection: React.FC = () => {
  const [selectedLady, setSelectedLady] = useState<Lady | null>(null);
  const [filter, setFilter] = useState<'all' | 'available'>('all');

  const handleSelectLady = (lady: Lady) => {
    setSelectedLady(lady);
    console.log('Selected lady:', lady);
  };

  const filteredLadies = filter === 'available' 
    ? mockLadies.filter(lady => lady.available)
    : mockLadies;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-24">
      {/* Header Section */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
              Elegante
              <span 
                className="text-transparent bg-clip-text block"
                style={{
                  background: `linear-gradient(to right, var(--color-accent-primary), var(--color-accent-dark))`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
              >
                Begleitung
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Entdecken Sie faszinierende Persönlichkeiten für unvergessliche Momente.
            </p>
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
                Alle Ladies
              </button>
              <button
                onClick={() => setFilter('available')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                  filter === 'available'
                    ? ''
                    : 'text-slate-300'
                }`}
                style={filter === 'available' ? {
                  backgroundColor: 'var(--color-accent-primary)',
                  color: 'var(--color-text-on-accent)'
                } : {}}
                onMouseEnter={filter !== 'available' ? (e) => e.currentTarget.style.color = 'var(--color-accent-primary)' : undefined}
                onMouseLeave={filter !== 'available' ? (e) => e.currentTarget.style.color = 'rgb(203 213 225)' : undefined}
              >
                Verfügbar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ladies Grid */}
      <div className="px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredLadies.map((lady) => (
            <LadyCard
              key={lady.id}
              lady={lady}
              onSelectLady={handleSelectLady}
            />
          ))}
        </div>

        {filteredLadies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              Aktuell sind keine Ladies verfügbar.
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
              Persönlichkeit zählt
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Unsere Ladies zeichnen sich durch Intelligenz, Charme und echtes Interesse 
              an tiefgreifenden Begegnungen aus. Jede Begleitung ist einzigartig.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LadySelection;
import React from 'react';
import { mockRooms } from '../data/mock-data';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-24">
      {/* Header Section */}
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-serif text-white mb-4 leading-tight">
            Ihre private Bühne
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Diskrete Refugien für unvergessliche Momente.
          </p>
        </div>
      </div>

      {/* Room Cards */}
      <div className="px-6 space-y-8">
        {mockRooms.map((room, index) => (
          <div
            key={room.id}
            className="max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 transition-all duration-500 hover:shadow-lg"
            style={{
              '--tw-border-opacity': '0.5',
              borderColor: 'rgb(51 65 85 / var(--tw-border-opacity))',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent-border)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px var(--color-accent-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgb(51 65 85 / 0.5)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            {/* Room Image */}
            <div className="aspect-video w-full bg-slate-700 relative overflow-hidden">
              {index === 0 && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-muted)' }}>
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--color-accent-border)' }}></div>
                  </div>
                </div>
              )}
              {index === 1 && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, var(--color-accent-light), var(--color-accent-primary))` }}>
                  <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-border)', borderColor: 'var(--color-accent-muted)' }}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-dark)' }}></div>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-dark)' }}></div>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-dark)' }}></div>
                    </div>
                  </div>
                </div>
              )}
              {index === 2 && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-end justify-center pb-8">
                  <div className="w-32 h-16 rounded-lg shadow-lg" style={{ backgroundColor: 'var(--color-accent-primary)' }}></div>
                </div>
              )}
            </div>

            {/* Room Content */}
            <div className="p-6">
              <h3 className="text-2xl font-serif mb-3" style={{ color: 'var(--color-accent-primary)' }}>
                {index === 0 && "Das intime Nest"}
                {index === 1 && "Die Oase der Sinne"} 
                {index === 2 && "Der Lustpalast"}
              </h3>
              
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {index === 0 && "Ein gemütlicher Kokon für vertraute Momente und tiefe Verbundenheit."}
                {index === 1 && "Eine Suite mit luxuriösem Badezimmer für sinnliche Entspannung."}
                {index === 2 && "Ein opulenter Raum für entfesselte Fantasien und unvergessliche Feste."}
              </p>

              <button 
                className="w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: 'var(--color-accent-primary)',
                  color: 'var(--color-text-on-accent)',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                }}
              >
                Details entdecken
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="px-6 pt-12">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-serif mb-4" style={{ color: 'var(--color-accent-primary)' }}>
            Bereit für Ihr Erlebnis?
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-6">
            Wählen Sie Ihren Raum, Ihre Begleitung und lassen Sie sich verzaubern.
          </p>
          <button 
            className="font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            style={{ 
              background: 'var(--bg-gradient-accent)',
              color: 'var(--color-text-on-accent)',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-accent-light)';
              e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-gradient-accent)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            }}
          >
            Jetzt buchen
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
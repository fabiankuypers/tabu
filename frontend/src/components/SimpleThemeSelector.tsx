import React, { useState, useEffect } from 'react';

type ThemeName = 'default' | 'royal' | 'emerald' | 'rose' | 'light';

interface Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  previewColor: string;
}

const themes: Theme[] = [
  {
    name: 'default',
    displayName: 'Luxury Gold',
    description: 'Klassisches luxuriöses Gold-Design',
    previewColor: '#d4af37'
  },
  {
    name: 'royal',
    displayName: 'Royal Purple',
    description: 'Königliches Violett für VIP-Erlebnisse',
    previewColor: '#8b5cf6'
  },
  {
    name: 'emerald',
    displayName: 'Emerald Luxury',
    description: 'Luxuriöses Smaragdgrün',
    previewColor: '#10b981'
  },
  {
    name: 'rose',
    displayName: 'Rose Gold',
    description: 'Elegantes Roségold',
    previewColor: '#f43f5e'
  },
  {
    name: 'light',
    displayName: 'Light Elegance',
    description: 'Helles elegantes Design',
    previewColor: '#d4af37'
  }
];

const SimpleThemeSelector: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('default');
  const [isOpen, setIsOpen] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('tabu-theme') as ThemeName;
    if (savedTheme && themes.find(t => t.name === savedTheme)) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeName: ThemeName) => {
    // Remove all theme classes
    document.documentElement.removeAttribute('data-theme');
    
    // Apply new theme
    if (themeName !== 'default') {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    
    // Save to localStorage
    localStorage.setItem('tabu-theme', themeName);
  };

  const handleThemeChange = (themeName: ThemeName) => {
    setCurrentTheme(themeName);
    applyTheme(themeName);
    setIsOpen(false);
  };

  const getCurrentTheme = () => {
    return themes.find(t => t.name === currentTheme) || themes[0];
  };

  return (
    <div className="relative">
      {/* Theme Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-amber-400/30 rounded-lg transition-all duration-300 backdrop-blur-sm"
        title="Theme wechseln"
      >
        <div 
          className="w-4 h-4 rounded-full border-2 border-white/20"
          style={{ backgroundColor: getCurrentTheme().previewColor }}
        ></div>
        <span className="text-slate-300 text-sm font-medium">
          {getCurrentTheme().displayName}
        </span>
        <svg 
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Theme Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-3">
              <h3 className="text-sm font-medium text-slate-300 mb-3">
                Design wählen
              </h3>
              
              <div className="space-y-2">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => handleThemeChange(theme.name)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group ${
                      currentTheme === theme.name
                        ? 'bg-amber-400/10 border border-amber-400/30'
                        : 'bg-slate-700/30 hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50'
                    }`}
                  >
                    {/* Theme Color Preview */}
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.previewColor }}
                      ></div>
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20 opacity-60 bg-slate-700"
                      ></div>
                    </div>

                    {/* Theme Info */}
                    <div className="flex-1 text-left">
                      <div className={`font-medium text-sm ${
                        currentTheme === theme.name ? 'text-amber-400' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {theme.displayName}
                      </div>
                      <div className="text-xs text-slate-400 group-hover:text-slate-300">
                        {theme.description}
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {currentTheme === theme.name && (
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-3 py-2 bg-slate-900/50 border-t border-slate-700/50">
              <p className="text-xs text-slate-400">
                Das Design wird automatisch gespeichert
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SimpleThemeSelector;
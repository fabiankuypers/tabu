import React, { useState } from 'react';
import { useTheme, type ThemeName } from '../contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { currentTheme, themeName, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  const getThemePreview = (theme: any) => {
    switch (theme.name) {
      case 'default':
        return '#d4af37'; // Gold
      case 'royal':
        return '#8b5cf6'; // Purple
      case 'emerald':
        return '#10b981'; // Emerald
      case 'rose':
        return '#f43f5e'; // Rose
      case 'light':
        return '#d4af37'; // Gold on light
      default:
        return '#d4af37';
    }
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
          style={{ backgroundColor: getThemePreview(currentTheme) }}
        ></div>
        <span className="text-slate-300 text-sm font-medium">
          {currentTheme.displayName}
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
                {availableThemes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => handleThemeChange(theme.name)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group ${
                      themeName === theme.name
                        ? 'bg-amber-400/10 border border-amber-400/30'
                        : 'bg-slate-700/30 hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50'
                    }`}
                  >
                    {/* Theme Color Preview */}
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: getThemePreview(theme) }}
                      ></div>
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20 opacity-60"
                        style={{ backgroundColor: theme.colors.background.surface }}
                      ></div>
                    </div>

                    {/* Theme Info */}
                    <div className="flex-1 text-left">
                      <div className={`font-medium text-sm ${
                        themeName === theme.name ? 'text-amber-400' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {theme.displayName}
                      </div>
                      <div className="text-xs text-slate-400 group-hover:text-slate-300">
                        {theme.description}
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {themeName === theme.name && (
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

export default ThemeSelector;
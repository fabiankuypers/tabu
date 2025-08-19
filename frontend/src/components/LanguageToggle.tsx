import React from 'react';
import { useGlobalLanguage } from '../hooks/useGlobalLanguage';
import type { Language } from '../stores/languageStore';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useGlobalLanguage();

  const languages = [
    { 
      code: 'de' as Language, 
      flag: '🇩🇪',
      name: 'Deutsch' 
    },
    { 
      code: 'en' as Language, 
      flag: '🇬🇧',
      name: 'English' 
    }
  ];

  return (
    <div className="relative">
      <div className="flex items-center bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ${
              language === lang.code
                ? 'bg-slate-700/80 shadow-md'
                : 'hover:bg-slate-700/40'
            }`}
            style={language === lang.code ? {
              backgroundColor: 'var(--color-accent-muted)',
              color: 'var(--color-accent-primary)'
            } : {
              color: 'white'
            }}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium hidden sm:inline">
              {lang.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;
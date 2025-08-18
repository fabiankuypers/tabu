import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme types
export type ThemeName = 'default' | 'royal' | 'emerald' | 'rose' | 'light';

export interface Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  colors: {
    accent: {
      primary: string;
      light: string;
      dark: string;
    };
    background: {
      primary: string;
      surface: string;
      surfaceLight: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
      onAccent: string;
    };
  };
}

// Available themes
export const themes: Record<ThemeName, Theme> = {
  default: {
    name: 'default',
    displayName: 'Luxury Gold',
    description: 'Klassisches luxuriöses Gold-Design',
    colors: {
      accent: {
        primary: '#d4af37',
        light: '#e6c866',
        dark: '#b8941f',
      },
      background: {
        primary: '#1a1a1a',
        surface: '#2a2a2a',
        surfaceLight: '#3a3a3a',
      },
      text: {
        primary: '#ffffff',
        secondary: '#e2e8f0',
        muted: '#94a3b8',
        onAccent: '#1a1a1a',
      },
    },
  },
  royal: {
    name: 'royal',
    displayName: 'Royal Purple',
    description: 'Königliches Violett für VIP-Erlebnisse',
    colors: {
      accent: {
        primary: '#8b5cf6',
        light: '#a78bfa',
        dark: '#7c3aed',
      },
      background: {
        primary: '#1a1a1a',
        surface: '#2a2a2a',
        surfaceLight: '#3a3a3a',
      },
      text: {
        primary: '#ffffff',
        secondary: '#e2e8f0',
        muted: '#94a3b8',
        onAccent: '#ffffff',
      },
    },
  },
  emerald: {
    name: 'emerald',
    displayName: 'Emerald Luxury',
    description: 'Luxuriöses Smaragdgrün',
    colors: {
      accent: {
        primary: '#10b981',
        light: '#34d399',
        dark: '#059669',
      },
      background: {
        primary: '#1a1a1a',
        surface: '#2a2a2a',
        surfaceLight: '#3a3a3a',
      },
      text: {
        primary: '#ffffff',
        secondary: '#e2e8f0',
        muted: '#94a3b8',
        onAccent: '#ffffff',
      },
    },
  },
  rose: {
    name: 'rose',
    displayName: 'Rose Gold',
    description: 'Elegantes Roségold',
    colors: {
      accent: {
        primary: '#f43f5e',
        light: '#fb7185',
        dark: '#e11d48',
      },
      background: {
        primary: '#1a1a1a',
        surface: '#2a2a2a',
        surfaceLight: '#3a3a3a',
      },
      text: {
        primary: '#ffffff',
        secondary: '#e2e8f0',
        muted: '#94a3b8',
        onAccent: '#ffffff',
      },
    },
  },
  light: {
    name: 'light',
    displayName: 'Light Elegance',
    description: 'Helles elegantes Design',
    colors: {
      accent: {
        primary: '#d4af37',
        light: '#e6c866',
        dark: '#b8941f',
      },
      background: {
        primary: '#ffffff',
        surface: '#f8fafc',
        surfaceLight: '#f1f5f9',
      },
      text: {
        primary: '#0f172a',
        secondary: '#334155',
        muted: '#64748b',
        onAccent: '#ffffff',
      },
    },
  },
};

// Theme context interface
interface ThemeContextType {
  currentTheme: Theme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  availableThemes: Theme[];
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'default' 
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('tabu-theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme);
    }
  }, []);

  // Apply theme to document when theme changes
  useEffect(() => {
    // Remove all theme classes
    Object.keys(themes).forEach(theme => {
      document.documentElement.removeAttribute('data-theme');
    });

    // Apply current theme
    if (themeName !== 'default') {
      document.documentElement.setAttribute('data-theme', themeName);
    }

    // Save to localStorage
    localStorage.setItem('tabu-theme', themeName);
  }, [themeName]);

  const setTheme = (newThemeName: ThemeName) => {
    setThemeName(newThemeName);
  };

  const value: ThemeContextType = {
    currentTheme: themes[themeName],
    themeName,
    setTheme,
    availableThemes: Object.values(themes),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Higher-order component for theme-aware components
export const withTheme = <P extends object>(
  Component: React.ComponentType<P & { theme: Theme }>
) => {
  return (props: P) => {
    const { currentTheme } = useTheme();
    return <Component {...props} theme={currentTheme} />;
  };
};

// Utility functions
export const getThemeColors = (themeName: ThemeName = 'default') => {
  return themes[themeName].colors;
};

export const getThemeVar = (variable: string, themeName?: ThemeName) => {
  if (typeof window === 'undefined') return '';
  
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(`--${variable}`).trim();
};

// Theme-aware CSS-in-JS helper
export const styled = {
  getAccentColor: () => 'var(--color-accent-primary)',
  getAccentLight: () => 'var(--color-accent-light)',
  getAccentDark: () => 'var(--color-accent-dark)',
  getBackgroundPrimary: () => 'var(--color-primary-bg)',
  getBackgroundSurface: () => 'var(--color-primary-surface)',
  getTextPrimary: () => 'var(--color-text-primary)',
  getTextSecondary: () => 'var(--color-text-secondary)',
  getTextMuted: () => 'var(--color-text-muted)',
  getTextOnAccent: () => 'var(--color-text-on-accent)',
  getBorderSubtle: () => 'var(--border-color-subtle)',
  getBorderAccent: () => 'var(--color-accent-border)',
  getShadowAccent: () => 'var(--shadow-accent)',
  getRadiusButton: () => 'var(--radius-button)',
  getRadiusCard: () => 'var(--radius-lg)',
  getTransition: () => 'var(--transition-normal)',
};
import React, { useState } from 'react';
import SimpleThemeSelector from './SimpleThemeSelector';

interface NavigationProps {
  currentPage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage = 'rooms' }) => {
  const [activeTab, setActiveTab] = useState(currentPage);

  const navItems = [
    {
      id: 'rooms',
      label: 'Räume',
      href: '/rooms',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l-2-2 2-2m8 4l2-2-2-2" />
        </svg>
      )
    },
    {
      id: 'ladies',
      label: 'Ladies',
      href: '/ladies',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'events',
      label: 'Events',
      href: '/events',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Profil',
      href: '/profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect-dark border-b" style={{ borderColor: 'var(--border-color-subtle)' }}>
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/tabu-logo-transparent.svg" 
              alt="TABU" 
              className="h-8 w-auto"
              style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
            />
          </div>

          {/* Right Side - Theme Selector + Notifications */}
          <div className="flex items-center space-x-4">
            <SimpleThemeSelector />
            <button className="p-2 transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect-dark border-t" style={{ borderColor: 'var(--border-color-subtle)' }}>
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
                // Here you would implement navigation logic
                window.location.href = item.href;
              }}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300`}
              style={{ 
                backgroundColor: activeTab === item.id ? 'var(--color-accent-muted)' : 'transparent',
                color: activeTab === item.id ? 'var(--color-accent-primary)' : 'var(--color-text-muted)'
              }}
            >
              <div className={`transition-transform duration-200 ${
                activeTab === item.id ? 'scale-110' : 'scale-100'
              }`}>
                {item.icon}
              </div>
              <span className="text-xs mt-1 font-medium" style={{ 
                color: activeTab === item.id ? 'var(--color-accent-primary)' : 'var(--color-text-muted)'
              }}>
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* Active Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 opacity-50" style={{ 
          background: `linear-gradient(to right, transparent, var(--color-accent-primary), transparent)`
        }}></div>
      </nav>
    </>
  );
};

export default Navigation;
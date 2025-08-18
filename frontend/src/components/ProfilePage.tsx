import React, { useState } from 'react';
import Navigation from './Navigation';

interface User {
  id: string;
  name: string;
  email: string;
  level: 1 | 2 | 3;
  memberSince: string;
  avatar?: string;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    privacy: 'public' | 'private' | 'members';
  };
}

const mockUser: User = {
  id: "1",
  name: "Alexander M.",
  email: "a.mueller@example.com",
  level: 2,
  memberSince: "2023-03-15",
  preferences: {
    notifications: true,
    newsletter: false,
    privacy: 'private'
  }
};

const ProfilePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo purposes
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const getLevelInfo = (level: number) => {
    switch (level) {
      case 1:
        return {
          name: 'Basis',
          color: 'text-green-400',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          benefits: ['Zugang zu Basis-Events', 'Standard Räume', 'Basis-Support']
        };
      case 2:
        return {
          name: 'Premium',
          color: 'text-amber-400',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/30',
          benefits: ['Zugang zu Premium-Events', 'Luxus Räume', 'Priority Support', 'Rabatte']
        };
      case 3:
        return {
          name: 'VIP',
          color: 'text-purple-400',
          bgColor: 'bg-purple-500/10',
          borderColor: 'border-purple-500/30',
          benefits: ['Zugang zu allen Events', 'Private Suiten', '24/7 Concierge', 'Exklusive Einladungen']
        };
      default:
        return {
          name: 'Unbekannt',
          color: 'text-slate-400',
          bgColor: 'bg-slate-500/10',
          borderColor: 'border-slate-500/30',
          benefits: []
        };
    }
  };

  const formatMemberSince = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (!isLoggedIn || showLogin) {
    return (
      <>
        <Navigation currentPage="profile" />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-24 flex items-center justify-center">
        <div className="max-w-md w-full mx-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif mb-2" style={{ color: 'var(--color-accent-primary)' }}>Willkommen zurück</h1>
              <p className="text-slate-300">Loggen Sie sich in Ihr Konto ein</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  E-Mail Adresse
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-colors"
                  placeholder="ihre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="sr-only" />
                  <div className="w-4 h-4 bg-slate-700 border border-slate-600 rounded mr-2"></div>
                  <span className="text-sm text-slate-300">Angemeldet bleiben</span>
                </label>
                <a href="#" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                  Passwort vergessen?
                </a>
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoggedIn(true);
                  setShowLogin(false);
                }}
                className="w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-accent-primary)',
                  color: 'var(--color-text-on-accent)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
                }}
              >
                Anmelden
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
              <p className="text-slate-400 text-sm">
                Noch kein Mitglied?{' '}
                <a 
                  href="#" 
                  className="transition-colors"
                  style={{ color: 'var(--color-accent-primary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
                >
                  Mitgliedschaft beantragen
                </a>
              </p>
            </div>
          </div>
        </div>
        </div>
      </>
    );
  }

  const levelInfo = getLevelInfo(user.level);

  return (
    <>
      <Navigation currentPage="profile" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center border-2"
                style={{
                  backgroundColor: 'var(--color-accent-muted)',
                  borderColor: 'var(--color-accent-border)'
                }}
              >
                <span className="text-2xl font-serif" style={{ color: 'var(--color-accent-primary)' }}>
                  {user.name.charAt(0)}
                </span>
              </div>
              
              {/* User Info */}
              <div>
                <h1 className="text-3xl font-serif text-white mb-2">{user.name}</h1>
                <p className="text-slate-300 mb-2">{user.email}</p>
                <p className="text-slate-400 text-sm">
                  Mitglied seit {formatMemberSince(user.memberSince)}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white border border-slate-600/50 hover:border-amber-400/30 rounded-lg transition-all duration-300"
            >
              {isEditing ? 'Speichern' : 'Bearbeiten'}
            </button>
          </div>

          {/* Level Status */}
          <div className={`p-4 rounded-lg border ${levelInfo.bgColor} ${levelInfo.borderColor}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">
                Mitgliedschaftslevel: <span className={levelInfo.color}>{levelInfo.name}</span>
              </h3>
              {user.level < 3 && (
                <button className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
                  Upgrade anfragen
                </button>
              )}
            </div>
            
            <div className="space-y-1">
              {levelInfo.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-sm text-slate-300">
                  <svg className="w-4 h-4 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Preferences */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-serif text-amber-400 mb-6">Einstellungen</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Benachrichtigungen</span>
                <button
                  onClick={() => setUser({
                    ...user,
                    preferences: {
                      ...user.preferences,
                      notifications: !user.preferences.notifications
                    }
                  })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    user.preferences.notifications ? 'bg-amber-400' : 'bg-slate-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    user.preferences.notifications ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Newsletter</span>
                <button
                  onClick={() => setUser({
                    ...user,
                    preferences: {
                      ...user.preferences,
                      newsletter: !user.preferences.newsletter
                    }
                  })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    user.preferences.newsletter ? 'bg-amber-400' : 'bg-slate-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    user.preferences.newsletter ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Profil-Sichtbarkeit</label>
                <select 
                  value={user.preferences.privacy}
                  onChange={(e) => setUser({
                    ...user,
                    preferences: {
                      ...user.preferences,
                      privacy: e.target.value as 'public' | 'private' | 'members'
                    }
                  })}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-amber-400/50"
                >
                  <option value="private">Privat</option>
                  <option value="members">Nur Mitglieder</option>
                  <option value="public">Öffentlich</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-serif text-amber-400 mb-6">Schnellzugriff</h2>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/30 hover:border-amber-400/30 transition-all duration-300 group">
                <span className="text-slate-300 group-hover:text-white">Buchungshistorie</span>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/30 hover:border-amber-400/30 transition-all duration-300 group">
                <span className="text-slate-300 group-hover:text-white">Favoriten</span>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/30 hover:border-amber-400/30 transition-all duration-300 group">
                <span className="text-slate-300 group-hover:text-white">Support kontaktieren</span>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>

              <button 
                onClick={() => {
                  setIsLoggedIn(false);
                  setShowLogin(true);
                }}
                className="w-full flex items-center justify-between p-3 bg-red-900/20 hover:bg-red-900/30 rounded-lg border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group"
              >
                <span className="text-red-400 group-hover:text-red-300">Abmelden</span>
                <svg className="w-5 h-5 text-red-400 group-hover:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProfilePage;
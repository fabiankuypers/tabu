import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
    // Load saved language from localStorage only on client side
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'de' || savedLanguage === 'en')) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  // Save language to localStorage when changed (only on client side)
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language, isClient]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translation dictionary
const translations = {
  de: {
    // Navigation
    'nav.home': 'Home',
    'nav.rooms': 'Räume',
    'nav.ladies': 'Ladies',
    'nav.events': 'Events',
    'nav.profile': 'Profil',

    // Home Page
    'home.title': 'Willkommen im exklusiven Gentleman\'s Club',
    'home.subtitle': 'Erleben Sie diskrete Eleganz und unvergessliche Momente in unserem privaten Refugium für kultivierte Herren.',
    'home.rooms.title': 'Exklusive Räume',
    'home.rooms.subtitle': 'Perfekt gestaltete Refugien für Ihre intimsten Momente',
    'home.ladies.title': 'Elegante Begleitung',
    'home.ladies.subtitle': 'Kultivierte Damen für unvergessliche Begegnungen',
    'home.events.title': 'Private Events',
    'home.events.subtitle': 'Diskrete Veranstaltungen für ausgewählte Mitglieder',

    // Rooms
    'rooms.title': 'Wählen Sie Ihr',
    'rooms.title.highlight': 'Refugium',
    'rooms.subtitle': 'Jeder Raum ist eine Welt für sich – entdecken Sie den perfekten Rahmen für Ihre ganz besonderen Momente.',
    'rooms.category.intimate': 'Intim',
    'rooms.category.luxury': 'Luxus',
    'rooms.category.suite': 'Suite',
    'rooms.nextstep.title': 'Der nächste Schritt',
    'rooms.nextstep.subtitle': 'Nach der Zimmerauswahl können Sie Ihre perfekte Begleitung wählen und das Erlebnis ganz nach Ihren Wünschen gestalten.',

    // Ladies
    'ladies.title': 'Elegante',
    'ladies.title.highlight': 'Begleitung',
    'ladies.subtitle': 'Entdecken Sie faszinierende Persönlichkeiten für unvergessliche Momente.',
    'ladies.filter.all': 'Alle Ladies',
    'ladies.filter.available': 'Verfügbar',
    'ladies.personality': 'Persönlichkeit',
    'ladies.interests': 'Interessen',
    'ladies.languages': 'Sprachen',
    'ladies.info.title': 'Persönlichkeit zählt',
    'ladies.info.subtitle': 'Unsere Ladies zeichnen sich durch Intelligenz, Charme und echtes Interesse an tiefgreifenden Begegnungen aus. Jede Begleitung ist einzigartig.',
    'ladies.no_available': 'Aktuell sind keine Ladies verfügbar.',
    'ladies.show_all': 'Alle anzeigen',

    // Events
    'events.title': 'Exklusive',
    'events.title.highlight': 'Events',
    'events.subtitle': 'Diskrete Zusammenkünfte für kultivierte Gentlemen mit anspruchsvollem Geschmack.',
    'events.level': 'Ihr Level',
    'events.level.premium': 'Premium',
    'events.filter.all': 'Alle Events',
    'events.filter.accessible': 'Verfügbar für Sie',
    'events.level.basis': 'Basis',
    'events.level.vip': 'VIP',
    'events.level.unknown': 'Unbekannt',
    'events.spots_left': 'Plätze',
    'events.sold_out': 'Ausgebucht',
    'events.level_required': 'Level erforderlich',
    'events.level_required_text': 'Dieses Event erfordert eine höhere Mitgliedschaftsstufe.',
    'events.dresscode': 'Dresscode',
    'events.info.title': 'Diskretion & Exklusivität',
    'events.info.subtitle': 'Unsere Events sind sorgfältig kuratiert und bieten Ihnen die Möglichkeit, Gleichgesinnte in einer Atmosphäre von Eleganz und Vertrauen zu treffen.',
    'events.no_accessible': 'Keine Events für Ihr aktuelles Level verfügbar.',

    // Common Buttons
    'button.details': 'Details ansehen',
    'button.profile': 'Profil ansehen',
    'button.book_now': 'Jetzt buchen',
    'button.reserve_now': 'Jetzt reservieren',
    'button.register': 'Anmelden',
    'button.not_available': 'Nicht verfügbar',

    // Status
    'status.available': 'Verfügbar',
    'status.booked': 'Ausgebucht',
    'status.maintenance': 'Wartung',
    'status.currently_available': 'Aktuell verfügbar',

    // Modal Common
    'modal.close': 'Schließen',
    'modal.about_room': 'Über diesen Raum',
    'modal.equipment': 'Ausstattung',
    'modal.amenities': 'Premium-Annehmlichkeiten',
    'modal.atmosphere': 'Atmosphäre',
    'modal.category': 'Kategorie',
    'modal.max_guests': 'Maximale Gäste',
    'modal.size': 'Größe',
    'modal.location': 'Lage',
    'modal.per_hour': 'pro Stunde',
    'modal.persons': 'Personen',
    'modal.about_me': 'Über mich',
    'modal.personality': 'Persönlichkeit',
    'modal.interests': 'Interessen',
    'modal.services': 'Services',
    'modal.languages': 'Sprachen',
    'modal.years': 'Jahre',
    'modal.discretion': 'Diskret • Sicher • Exklusiv',
    'modal.confirmation': 'Sofortige Bestätigung • Diskret • Sicher',
    'modal.questions': 'Haben Sie Fragen?',
    'modal.contact_concierge': 'Concierge kontaktieren',
    'modal.not_available_currently': 'Derzeit nicht verfügbar'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.rooms': 'Rooms',
    'nav.ladies': 'Ladies',
    'nav.events': 'Events',
    'nav.profile': 'Profile',

    // Home Page
    'home.title': 'Welcome to the Exclusive Gentleman\'s Club',
    'home.subtitle': 'Experience discreet elegance and unforgettable moments in our private refuge for cultured gentlemen.',
    'home.rooms.title': 'Exclusive Rooms',
    'home.rooms.subtitle': 'Perfectly designed refuges for your most intimate moments',
    'home.ladies.title': 'Elegant Companionship',
    'home.ladies.subtitle': 'Cultured ladies for unforgettable encounters',
    'home.events.title': 'Private Events',
    'home.events.subtitle': 'Discreet events for selected members',

    // Rooms
    'rooms.title': 'Choose Your',
    'rooms.title.highlight': 'Refuge',
    'rooms.subtitle': 'Each room is a world of its own – discover the perfect setting for your very special moments.',
    'rooms.category.intimate': 'Intimate',
    'rooms.category.luxury': 'Luxury',
    'rooms.category.suite': 'Suite',
    'rooms.nextstep.title': 'The Next Step',
    'rooms.nextstep.subtitle': 'After choosing your room, you can select your perfect companion and customize the experience according to your desires.',

    // Ladies
    'ladies.title': 'Elegant',
    'ladies.title.highlight': 'Companionship',
    'ladies.subtitle': 'Discover fascinating personalities for unforgettable moments.',
    'ladies.filter.all': 'All Ladies',
    'ladies.filter.available': 'Available',
    'ladies.personality': 'Personality',
    'ladies.interests': 'Interests',
    'ladies.languages': 'Languages',
    'ladies.info.title': 'Personality Matters',
    'ladies.info.subtitle': 'Our ladies are distinguished by intelligence, charm, and genuine interest in meaningful encounters. Each companion is unique.',
    'ladies.no_available': 'Currently no ladies are available.',
    'ladies.show_all': 'Show all',

    // Events
    'events.title': 'Exclusive',
    'events.title.highlight': 'Events',
    'events.subtitle': 'Discreet gatherings for cultured gentlemen with sophisticated taste.',
    'events.level': 'Your Level',
    'events.level.premium': 'Premium',
    'events.filter.all': 'All Events',
    'events.filter.accessible': 'Available for You',
    'events.level.basis': 'Basic',
    'events.level.vip': 'VIP',
    'events.level.unknown': 'Unknown',
    'events.spots_left': 'spots',
    'events.sold_out': 'Sold Out',
    'events.level_required': 'Level Required',
    'events.level_required_text': 'This event requires a higher membership level.',
    'events.dresscode': 'Dress Code',
    'events.info.title': 'Discretion & Exclusivity',
    'events.info.subtitle': 'Our events are carefully curated and offer you the opportunity to meet like-minded individuals in an atmosphere of elegance and trust.',
    'events.no_accessible': 'No events available for your current level.',

    // Common Buttons
    'button.details': 'View Details',
    'button.profile': 'View Profile',
    'button.book_now': 'Book Now',
    'button.reserve_now': 'Reserve Now',
    'button.register': 'Register',
    'button.not_available': 'Not Available',

    // Status
    'status.available': 'Available',
    'status.booked': 'Booked',
    'status.maintenance': 'Maintenance',
    'status.currently_available': 'Currently Available',

    // Modal Common
    'modal.close': 'Close',
    'modal.about_room': 'About This Room',
    'modal.equipment': 'Equipment',
    'modal.amenities': 'Premium Amenities',
    'modal.atmosphere': 'Atmosphere',
    'modal.category': 'Category',
    'modal.max_guests': 'Maximum Guests',
    'modal.size': 'Size',
    'modal.location': 'Location',
    'modal.per_hour': 'per hour',
    'modal.persons': 'persons',
    'modal.about_me': 'About Me',
    'modal.personality': 'Personality',
    'modal.interests': 'Interests',
    'modal.services': 'Services',
    'modal.languages': 'Languages',
    'modal.years': 'years',
    'modal.discretion': 'Discreet • Secure • Exclusive',
    'modal.confirmation': 'Instant Confirmation • Discreet • Secure',
    'modal.questions': 'Have Questions?',
    'modal.contact_concierge': 'Contact Concierge',
    'modal.not_available_currently': 'Currently Not Available'
  }
};
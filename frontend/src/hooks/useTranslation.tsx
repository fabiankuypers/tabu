import { useState, useEffect } from 'react';

export type Language = 'de' | 'en';

export const useTranslation = () => {
  const [language, setLanguageState] = useState<Language>('de');

  // Load saved language from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'de' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return { language, setLanguage, t };
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
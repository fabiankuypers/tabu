// Mock data for the Gentleman's Club platform
// This defines the data structure that will later be fetched from the backend

export interface Room {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'intimate' | 'luxury' | 'suite';
  features: string[];
  pricePerHour: number;
  maxGuests: number;
}

export interface Lady {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  personality: string[];
  interests: string[];
  languages: string[];
  available: boolean;
}

export interface Experience {
  id: string;
  name: string;
  description: string;
  mood: string;
  price: number;
  duration: number; // in minutes
}

// Room Mock Data
export const mockRooms: Room[] = [
  {
    id: "1",
    name: "Le Petit Amour",
    description: "Ein intimes Refugium für die besonderen Momente zu zweit. Warm beleuchteter Raum mit edlen Materialien und diskreter Atmosphäre, die Vertrauen und Nähe schafft.",
    imageUrl: "https://placehold.co/800x600/1a1a2e/D4AF37?text=Le+Petit+Amour",
    category: "intimate",
    features: ["King-Size Bett", "Dimmbare Beleuchtung", "Premium Sound-System", "Champagner Service"],
    pricePerHour: 280,
    maxGuests: 2
  },
  {
    id: "2", 
    name: "L'Oasis du Plaisir",
    description: "Luxuriöser Raum mit privatem Whirlpool und exquisiter Ausstattung. Hier verschmelzen Eleganz und Sinnlichkeit zu einem unvergesslichen Erlebnis der Extraklasse.",
    imageUrl: "https://placehold.co/800x600/1a1a2e/D4AF37?text=L%27Oasis+du+Plaisir",
    category: "luxury",
    features: ["Private Whirlpool", "Regendusche", "Panorama-Fenster", "Butler Service", "Premium Bar"],
    pricePerHour: 480,
    maxGuests: 3
  },
  {
    id: "3",
    name: "Le Sanctuaire", 
    description: "Die ultimative Suite für exklusive Gesellschaften. Großzügiger Raum mit mehreren Bereichen, perfekt für diskrete Events und unvergessliche Nächte mit ausgewählten Gästen.",
    imageUrl: "https://placehold.co/800x600/1a1a2e/D4AF37?text=Le+Sanctuaire",
    category: "suite",
    features: ["Multiple Bereiche", "Private Lounge", "Concierge Service", "Gourmet Catering", "VIP Eingang"],
    pricePerHour: 750,
    maxGuests: 6
  }
];

// Lady Mock Data
export const mockLadies: Lady[] = [
  {
    id: "1",
    name: "Isabella",
    description: "Elegante Kunsthistorikerin mit einer Leidenschaft für tiefgreifende Gespräche und klassische Musik.",
    imageUrl: "https://placehold.co/400x500/1a1a2e/D4AF37?text=Isabella",
    personality: ["Intelligent", "Einfühlsam", "Kultiviert", "Humorvoll"],
    interests: ["Kunstgeschichte", "Opern", "Literatur", "Weinverkostung"],
    languages: ["Deutsch", "Englisch", "Französisch", "Italienisch"],
    available: true
  },
  {
    id: "2",
    name: "Sophie",
    description: "Weltgewandte Tänzerin mit einer magnetischen Ausstrahlung und einem Gespür für die schönen Dinge des Lebens.",
    imageUrl: "https://placehold.co/400x500/1a1a2e/D4AF37?text=Sophie",
    personality: ["Lebhaft", "Charmant", "Kreativ", "Abenteuerlustig"],
    interests: ["Ballett", "Reisen", "Fotografie", "Gourmet-Küche"],
    languages: ["Deutsch", "Englisch", "Spanisch"],
    available: true
  },
  {
    id: "3",
    name: "Victoria",
    description: "Erfolgreiche Geschäftsfrau mit einem Faible für Luxus und einer natürlichen Eleganz, die jeden Raum erhellt.",
    imageUrl: "https://placehold.co/400x500/1a1a2e/D4AF37?text=Victoria",
    personality: ["Selbstbewusst", "Raffiniert", "Witzig", "Warmherzig"],
    interests: ["Business", "Mode", "Yacht-Segeln", "Meditation"],
    languages: ["Deutsch", "Englisch", "Russisch"],
    available: false
  }
];

// Experience Mock Data
export const mockExperiences: Experience[] = [
  {
    id: "1",
    name: "Sinnlich & Langsam",
    description: "Ein zartfühlender Abend mit Zeit für echte Begegnungen",
    mood: "romantic",
    price: 150,
    duration: 180
  },
  {
    id: "2", 
    name: "Verspielt & Abenteuerlich",
    description: "Lebendige Momente voller Überraschungen und Lachen",
    mood: "playful",
    price: 200,
    duration: 240
  },
  {
    id: "3",
    name: "Tiefgründige Gespräche",
    description: "Intellektuelle Verbindung bei edlen Getränken",
    mood: "intellectual", 
    price: 120,
    duration: 150
  }
];

// Event interface
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  dresscode: string;
  price: number;
  maxGuests: number;
  currentGuests: number;
  level: 1 | 2 | 3;
  imageUrl: string;
  features: string[];
}

// Events Mock Data
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Maskenball der Sinne",
    description: "Ein eleganter Maskenball mit Live-Musik, exquisiter Küche und diskret choreografierten Überraschungen. Die Identität bleibt verborgen, die Begegnungen unvergesslich.",
    date: "2024-02-14",
    time: "20:00",
    location: "Le Sanctuaire",
    dresscode: "Black Tie & Maske",
    price: 450,
    maxGuests: 24,
    currentGuests: 18,
    level: 2,
    imageUrl: "https://placehold.co/600x400/1a1a1a/C9A961?text=Maskenball+der+Sinne",
    features: ["Live Jazz Band", "5-Gang Menü", "Premium Bar", "Diskrete Fotografie"]
  },
  {
    id: "2", 
    title: "Kunst & Genuss",
    description: "Eine private Vernissage mit zeitgenössischer Erotik-Kunst, begleitet von Champagner-Verkostung und intellektuellen Gesprächen in kultivierter Atmosphäre.",
    date: "2024-02-21",
    time: "19:00",
    location: "L'Oasis du Plaisir",
    dresscode: "Elegant Casual",
    price: 280,
    maxGuests: 15,
    currentGuests: 12,
    level: 1,
    imageUrl: "https://placehold.co/600x400/1a1a1a/C9A961?text=Kunst+%26+Genuss",
    features: ["Künstler-Führung", "Champagner Tasting", "Kunstkatalog", "Networking"]
  },
  {
    id: "3",
    title: "Midnight Society",
    description: "Exklusives Event nur für VIP-Mitglieder. Eine Nacht voller Geheimnisse, raffinierter Unterhaltung und Begegnungen, die diskret bleiben.",
    date: "2024-02-28", 
    time: "23:00",
    location: "Private Villa",
    dresscode: "All Black",
    price: 800,
    maxGuests: 12,
    currentGuests: 8,
    level: 3,
    imageUrl: "https://placehold.co/600x400/1a1a1a/C9A961?text=Midnight+Society",
    features: ["Private Location", "Personal Butler", "Exklusive Ladies", "24h Service"]
  }
];

// Additional services
export const mockAddOns = {
  champagne: {
    id: "champagne",
    name: "Dom Pérignon",
    price: 280,
    description: "Exklusiver Champagner für besondere Momente"
  },
  music: {
    id: "music",
    name: "Personal DJ",
    price: 150,
    description: "Maßgeschneiderte Musikauswahl für Ihre Stimmung"
  },
  massage: {
    id: "massage",
    name: "Couples Massage",
    price: 320,
    description: "Professionelle Massage zu zweit"
  }
};
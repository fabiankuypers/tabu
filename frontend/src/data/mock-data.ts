// Mock data for the Gentleman's Club platform
// This defines the data structure that will later be fetched from the backend

export interface Room {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  category: 'intimate' | 'luxury' | 'suite';
  features: string[];
  pricePerHour: number;
  maxGuests: number;
  size: string;
  amenities: string[];
  location: string;
  mood: string[];
  availability: 'available' | 'booked' | 'maintenance';
}

export interface Lady {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  age: number;
  height: string;
  personality: string[];
  interests: string[];
  languages: string[];
  specialties: string[];
  pricePerHour: number;
  available: boolean;
  location: string;
  aboutMe: string;
  services: string[];
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
    imageUrl: "/ladies/rooms/standard.webp",
    galleryImages: [
      "/ladies/rooms/standard.webp",
      "/ladies/rooms/standard2.webp",
      "/ladies/rooms/standard3.jpg",
      "/ladies/rooms/standard4.webp"
    ],
    category: "intimate",
    features: ["King-Size Bett", "Dimmbare Beleuchtung", "Premium Sound-System", "Champagner Service"],
    pricePerHour: 280,
    maxGuests: 2,
    size: "35 m²",
    amenities: ["Private Badezimmer", "Regendusche", "Sekt-Kühlschrank", "Seidenwäsche", "Aromatherapie"],
    location: "2. Etage",
    mood: ["Romantisch", "Intim", "Warm", "Gemütlich"],
    availability: "available"
  },
  {
    id: "2", 
    name: "L'Oasis du Plaisir",
    description: "Luxuriöser Raum mit privatem Whirlpool und exquisiter Ausstattung. Hier verschmelzen Eleganz und Sinnlichkeit zu einem unvergesslichen Erlebnis der Extraklasse.",
    imageUrl: "/ladies/rooms/premium1.webp",
    galleryImages: [
      "/ladies/rooms/premium1.webp",
      "/ladies/rooms/premium2.webp",
      "/ladies/rooms/premium3.webp",
      "/ladies/rooms/standard.webp",
      "/ladies/rooms/standard2.webp"
    ],
    category: "luxury",
    features: ["Private Whirlpool", "Regendusche", "Panorama-Fenster", "Butler Service", "Premium Bar"],
    pricePerHour: 480,
    maxGuests: 3,
    size: "65 m²",
    amenities: ["Whirlpool für 4 Personen", "Sauna", "Premium-Spirituosen", "Gourmet-Catering", "Massage-Öle", "Luxus-Textilien"],
    location: "Penthouse",
    mood: ["Luxuriös", "Sinnlich", "Exklusiv", "Entspannend"],
    availability: "available"
  },
  {
    id: "3",
    name: "Le Sanctuaire", 
    description: "Die ultimative Suite für exklusive Gesellschaften. Großzügiger Raum mit mehreren Bereichen, perfekt für diskrete Events und unvergessliche Nächte mit ausgewählten Gästen.",
    imageUrl: "/ladies/rooms/luxury1.webp",
    galleryImages: [
      "/ladies/rooms/luxury1.webp",
      "/ladies/rooms/luxury2.webp",
      "/ladies/rooms/premium1.webp",
      "/ladies/rooms/premium2.webp",
      "/ladies/rooms/premium3.webp",
      "/ladies/rooms/standard.webp"
    ],
    category: "suite",
    features: ["Multiple Bereiche", "Private Lounge", "Concierge Service", "Gourmet Catering", "VIP Eingang"],
    pricePerHour: 750,
    maxGuests: 6,
    size: "120 m²",
    amenities: ["Separate Schlaf- und Wohnbereiche", "Private Küche", "Champagner-Bar", "Fireplace", "Terrasse", "24h-Service"],
    location: "Oberste Etage",
    mood: ["Exklusiv", "Opulent", "Privat", "Majestätisch"],
    availability: "available"
  }
];

// Lady Mock Data  
export const mockLadies: Lady[] = [
  {
    id: "1",
    name: "Isabella",
    description: "Elegante Kunsthistorikerin mit einer Leidenschaft für tiefgreifende Gespräche und klassische Musik.",
    imageUrl: "/ladies/Isabella.webp",
    galleryImages: [
      "/ladies/Isabella.webp",
      "/ladies/sophie.webp",
      "/ladies/victoria.webp",
      "/ladies/Vanessa.webp"
    ],
    age: 25,
    height: "168 cm",
    personality: ["Intelligent", "Einfühlsam", "Kultiviert", "Humorvoll"],
    interests: ["Kunstgeschichte", "Opern", "Literatur", "Weinverkostung"],
    languages: ["Deutsch", "Englisch", "Französisch", "Italienisch"],
    specialties: ["Intellektuelle Gespräche", "Kunstkenntnis", "Kulturelle Events", "Dinner Dates"],
    pricePerHour: 450,
    available: true,
    location: "Wien",
    aboutMe: "Mit einer Leidenschaft für die schönen Künste und einem Gespür für Eleganz bringe ich Tiefe und Authentizität in jede Begegnung.",
    services: ["Dinner Dates", "Cultural Events", "Business Functions", "Travel Companion", "Private Parties", "Art Gallery Visits"]
  },
  {
    id: "2", 
    name: "Sophie",
    description: "Weltgewandte Tänzerin mit einer magnetischen Ausstrahlung und einem Gespür für die schönen Dinge des Lebens.",
    imageUrl: "/ladies/sophie.webp",
    galleryImages: [
      "/ladies/sophie.webp",
      "/ladies/Isabella.webp",
      "/ladies/Vanessa.webp",
      "/ladies/victoria.webp"
    ],
    age: 23,
    height: "172 cm",
    personality: ["Lebhaft", "Charmant", "Kreativ", "Abenteuerlustig"],
    interests: ["Ballett", "Reisen", "Fotografie", "Gourmet-Küche"],
    languages: ["Deutsch", "Englisch", "Spanisch"],
    specialties: ["Tanz", "Künstlerische Performance", "Reisebegleitung", "Event-Entertainment"],
    pricePerHour: 380,
    available: true,
    location: "Wien",
    aboutMe: "Als professionelle Tänzerin bringe ich Grazie und Leidenschaft in jeden Moment. Ich liebe es, neue Kulturen zu entdecken und unvergessliche Erlebnisse zu schaffen.",
    services: ["Dance Performances", "Travel Companion", "Cultural Events", "Private Shows", "Dinner Dates", "Theatre & Opera"]
  },
  {
    id: "3",
    name: "Victoria", 
    description: "Erfolgreiche Geschäftsfrau mit einem Faible für Luxus und einer natürlichen Eleganz, die jeden Raum erhellt.",
    imageUrl: "/ladies/victoria.webp",
    galleryImages: [
      "/ladies/victoria.webp",
      "/ladies/Vanessa.webp",
      "/ladies/Isabella.webp",
      "/ladies/sophie.webp"
    ],
    age: 28,
    height: "175 cm",
    personality: ["Selbstbewusst", "Raffiniert", "Witzig", "Warmherzig"],
    interests: ["Business", "Mode", "Yacht-Segeln", "Meditation"],
    languages: ["Deutsch", "Englisch", "Russisch"],
    specialties: ["Business Events", "High-Society", "Luxus-Lifestyle", "Networking"],
    pricePerHour: 550,
    available: false,
    location: "Wien",
    aboutMe: "Als erfolgreiche Unternehmerin verstehe ich die Anforderungen anspruchsvoller Klientel. Ich begleite Sie souverän durch die Welt des Luxus und der High Society.",
    services: ["Business Functions", "High Society Events", "Yacht Parties", "VIP Networking", "Luxury Travel", "Corporate Entertainment"]
  },
  {
    id: "4",
    name: "Vanessa", 
    description: "Mysteriöse Schönheit mit einer Vorliebe für aufregende Begegnungen und tiefe Verbindungen.",
    imageUrl: "/ladies/Vanessa.webp",
    galleryImages: [
      "/ladies/Vanessa.webp",
      "/ladies/sophie.webp",
      "/ladies/victoria.webp",
      "/ladies/Isabella.webp"
    ],
    age: 26,
    height: "170 cm",
    personality: ["Mysteriös", "Sinnlich", "Aufmerksam", "Leidenschaftlich"],
    interests: ["Yoga", "Spiritualität", "Tanz", "Sterne beobachten"],
    languages: ["Deutsch", "Englisch", "Französisch"],
    specialties: ["Entspannung", "Sinnliche Massagen", "Spirituelle Gespräche", "Intimität"],
    pricePerHour: 420,
    available: true,
    location: "Wien",
    aboutMe: "Ich glaube an die Kraft echter Verbindungen und die Schönheit des Moments. Mit mir erleben Sie pure Authentizität und tiefe Entspannung.",
    services: ["Massage", "Spiritual Guidance", "Intimate Conversations", "Yoga Sessions", "Meditation", "Stargazing"]
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
    imageUrl: "/maskenball-swingerevent.webp",
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
    imageUrl: "/kunst-genuss.webp",
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
    imageUrl: "/ladies/bourlesque-exklusiver abend für premiumgäste.webp",
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
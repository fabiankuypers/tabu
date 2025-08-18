# Tabu Gentleman's Club - Frontend

## 🎯 Projektübersicht
Elegante Gentleman's Club Web-Anwendung mit drei Hauptbereichen: Räume, Ladies und Events. Entwickelt mit React, TypeScript und Astro.

## 🏗️ Architektur

### Hauptkomponenten
```
src/components/
├── HomePage.tsx          # Startseite mit Navigation
├── RoomSelection.tsx     # Raumauswahl mit Airbnb-Style Details
├── LadySelection.tsx     # Lady-Auswahl mit Escort-Style Profilen  
├── EventsPage.tsx        # Event-Übersicht mit Level-System
├── RoomDetailsModal.tsx  # Room-Detailansicht (Airbnb-inspiriert)
├── LadyDetailsModal.tsx  # Lady-Profil-Detailansicht
└── EventDetailsModal.tsx # Event-Detailansicht
```

### Datenstrukturen
```
src/data/mock-data.ts     # Interfaces + Mock-Daten
```

## 📱 Detail-Modal System

### Room Details (`RoomDetailsModal.tsx`)
- **Trigger**: "Details ansehen" Button → `handleViewDetails(room)`
- **Layout**: Airbnb-inspiriert mit großer Bildergalerie
- **Features**: 
  - Thumbnail-Navigation
  - Echte Daten: `room.galleryImages`, `room.amenities`, `room.mood`
  - Buchungs-Sidebar mit Preis und Verfügbarkeit

### Lady Details (`LadyDetailsModal.tsx`)  
- **Trigger**: "Profil ansehen" Button → `handleViewDetails(lady)`
- **Layout**: Zweispaltig (Bilder links, Details rechts)
- **Features**:
  - Lokale Bilder: `/ladies/*.webp`
  - Persönlichkeit, Interessen, Services
  - Preis pro Stunde, Verfügbarkeit

### Event Details (`EventDetailsModal.tsx`)
- **Trigger**: "Details ansehen" Button → `handleViewDetails(event)`
- **Features**: 
  - Level-basierte Zugriffskontrolle
  - Live-Verfügbarkeit (Plätze übrig)
  - Feature-Liste, Dresscode

## 🔄 State Management Pattern

```typescript
// Jede Hauptseite verwendet dieses Pattern:
const [selectedItem, setSelectedItem] = useState<Type | null>(null);
const [showModal, setShowModal] = useState(false);
const [modalItem, setModalItem] = useState<Type | null>(null);

const handleViewDetails = (item: Type) => {
  setModalItem(item);      // Item für Modal setzen
  setShowModal(true);      // Modal öffnen
};

const closeModal = () => {
  setShowModal(false);     // Modal schließen
  setModalItem(null);      // Item zurücksetzen
};
```

## 🎨 Design System

### Farbschema
- **Primary**: CSS Custom Properties (`--color-accent-primary`)
- **Background**: Slate-900 Gradienten
- **Cards**: Glasmorphism-Effekte mit Backdrop-Blur

### Styling Approach
- **Tailwind CSS** für Utility-First Styling
- **CSS Custom Properties** für Theme-Variablen
- **Hover-Effekte**: Glow, Scale, Border-Color Transitions

## 📂 Bilder & Assets

### Lady Bilder
```
/ladies/
├── Isabella.webp
├── sophie.webp  
├── victoria.webp
└── Vanessa.webp
```

### Room Bilder
- Unsplash URLs in `room.galleryImages[]`
- Hochwertige Interior-Fotos

## 🐛 Debug System

### Console Logs
- 🏠 = Room button clicks
- 👩 = Lady button clicks  
- 🎉 = Event button clicks
- 🔍 = Details button clicks

Alle Button-Clicks loggen jetzt:
- Button-Typ und Item-Details
- State-Updates
- Modal-Operationen

## 🚀 Development

### Lokaler Server
```bash
npm run dev
# Server läuft auf http://localhost:4321
```

### Modal Testing
1. Öffne Browser-Konsole (F12)
2. Klicke auf "Details ansehen" Buttons
3. Prüfe Console-Logs für Debug-Info
4. Modal sollte sich öffnen mit korrekten Daten

## 🔧 Technischer Stack
- **Framework**: Astro + React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React useState Hooks
- **Images**: WebP für Ladies, Unsplash für Rooms

## 📋 Bekannte Issues
- Button-Funktionalität wird getestet (Debug-Logs hinzugefügt)
- Modal-State-Management funktioniert korrekt
- Alle Interfaces und Daten sind vollständig implementiert
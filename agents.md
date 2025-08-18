Master Prompt: Gentleman's Club Plattform (v3)
<role_definition>
Du bist ein Weltklasse-Full-Stack-Entwickler und Systemarchitekt mit einem ausgeprägten Sinn für Ästhetik und User Experience. Deine Spezialität ist der Bau von hochsicheren, performanten und eleganten Web-Plattformen. Du schreibst sauberen, wartbaren und produktionsreifen Code. Deine Aufgabe ist es, die folgende Spezifikation in eine voll funktionsfähige Anwendung umzusetzen.
</role_definition>

<project_goal>
Das Ziel ist die Erstellung einer exklusiven, digitalen Plattform für einen Gentleman's Club, die als wahrer Lusttempel mit Eleganz wahrgenommen wird. Die Plattform ist kein Katalog, sondern ein Portal zu einem "Erlebnis der Extraklasse". Sie dient als SEO-starkes Aushängeschild und als geschützter Mitgliederbereich, der Männern, die oft "im Kopf sind", einen Raum zum Fallenlassen bietet. Das gesamte Projekt muss die Kernprinzipien widerspiegeln.
</project_goal>

<core_principles>

Sicherheit zuerst: Alle Entscheidungen müssen die Sicherheit der hochsensiblen Nutzerdaten priorisieren. Kein Kompromiss.

Performance & Eleganz: Die User Experience muss nahtlos, schnell und luxuriös sein. Ladezeiten sind minimal, Animationen subtil und das Design makellos.

Atmosphäre & Vibe: Das Design muss einladend, edel und sinnlich sein. Es geht nicht nur um Sex, sondern um ein gehobenes Ambiente und das Gefühl, sich fallenlassen zu können.

Wartbarkeit: Der Code muss modular, gut kommentiert (in Englisch) und logisch strukturiert sein.
</core_principles>

<technology_stack>

Frontend (Öffentliche Seiten): Astro.js für maximale Performance und SEO.

Frontend (Mitgliederbereich): React (innerhalb von Astro) für dynamische, App-ähnliche Interaktionen.

Styling: Tailwind CSS für das gesamte Projekt.

Backend-as-a-Service (BaaS): Supabase für die PostgreSQL-Datenbank, Authentifizierung und Storage.

Backend (Custom Logic): Node.js mit NestJS. Dieses Framework dient als sichere, separate API-Schicht zwischen dem Frontend und Supabase. Es verarbeitet alle komplexe Geschäftslogik (Bewertungen, Webhooks, Zugriffssteuerung) und stellt sicher, dass sensible Operationen nicht direkt vom Client aus aufgerufen werden.

Authentifizierung: Supabase Auth (basiert auf JWTs).
</technology_stack>

<design_system>

Das Kerngefühl (The Vibe): Stell dir vor, du betrittst einen exklusiven, schummrig beleuchteten Raum. Schwere Samtvorhänge, leise Jazz-Musik, der Duft von edlem Holz und Parfüm. Die App muss dieses Gefühl digital einfangen. Hier lässt du den Alltag los. Hier beginnt das Fühlen. Die UI ist dein persönlicher Concierge, der dich diskret und intuitiv durch die Möglichkeiten führt. Jede Interaktion muss sich wertig und mühelos anfühlen.

Primär-Theme: Dark Mode. Elegant, nicht nur schwarz. Nutze tiefe Anthrazit- oder Marineblau-Töne (#1a1a2e) mit einer subtilen Textur oder einem leichten Gradienten, um Tiefe zu erzeugen.

Light-Mode-Toggle: Implementiere eine Option zum Umschalten in ein helles, aber ebenso edles Design (z.B. ein cremefarbener "Pergament"-Hintergrund mit schwarzen und goldenen Akzenten).

Akzentfarbe: Ein warmer, matter Goldton (#D4AF37), der nicht schreit, sondern flüstert. Er wird für Buttons, Links und wichtige Hervorhebungen verwendet.

Typografie: Eine elegante Serifenschrift (z.B. "Playfair Display" oder "Lora") für Überschriften. Eine sehr gut lesbare, saubere Sans-Serif-Schrift (z.B. "Inter" oder "Lato") für den Fließtext. Die Schriftgröße ist eher großzügig, um ein entspanntes Lesen zu ermöglichen.

Komponenten & Interaktion: Karten und Container haben abgerundete Ecken und einen dezenten, leuchtenden Schatteneffekt in der Akzentfarbe bei Hover. Buttons haben eine sanfte "Fade-in/Fade-out"-Übergangsanimation. Bilder laden mit einem leichten "Blur-in"-Effekt. Die Navigation ist intuitiv und folgt dem Prinzip "weniger ist mehr".

Logo: Das bereitgestellte Logo [LOGO: club-logo.svg] muss prominent, aber elegant platziert werden.
</design_system>

<tools>

context7 mcp: Nutze dieses Tool aktiv (use context7), um sicherzustellen, dass der gesamte generierte Code für die Bibliotheken auf der absolut neuesten, stabilen Dokumentation basiert.

UI Design: Das visuelle Design wird durch Screenshots bereitgestellt. Deine Aufgabe ist die pixelgenaue Umsetzung dieser visuellen Vorlagen unter Berücksichtigung des oben definierten Design-Systems und des Kerngefühls.
</tools>

<feature_implementation>
Setze die folgenden Module und Features exakt nach Beschreibung um.

Modul 1: Öffentlicher Auftritt & SEO
Die Visitenkarte des Clubs. Schnell, elegant und für Google optimiert.

<feature id="M1.1_VISUAL_DESIGN">
Aufgabe: Umsetzung der öffentlichen Seiten.
Anforderungen: Umsetzung basierend auf [SCREENSHOT: homepage.png], [SCREENSHOT: philosophy.png], [SCREENSHOT: blog-overview.png]. Vollständig responsiv.
</feature>

<feature id="M1.2_ONPAGE_SEO">
Aufgabe: Implementierung technischer On-Page SEO-Grundlagen.
Anforderungen: Automatische Metatags, Schema.org-Markup, optimierte Ladezeiten.
</feature>

<feature id="M1.3_BLOG_SYSTEM">
Aufgabe: Aufbau eines voll funktionsfähigen Blog-Systems.
Anforderungen: Übersichts- und Detailseiten ([SCREENSHOT: blog-article.png]), angebunden an ein Headless CMS.
</feature>

<feature id="M1.4_BILINGUAL">
Aufgabe: Implementierung der Zweisprachigkeit.
Anforderungen: Ein DE/EN-Umschalter, der alle öffentlichen Inhalte ändert.
</feature>

Modul 2: Das Erlebnis (Kern-Buchungsflow)
Der interaktive Kern der App. Die Usability muss so einfach wie bei Airbnb sein, aber die Ästhetik ist die eines Luxus-Events.

<feature id="M2.1_ROOM_SELECTION">
Aufgabe: Entwicklung der Zimmerauswahl.
Anforderungen:
-   Eine elegante Übersicht aller verfügbaren Zimmer ([SCREENSHOT: room-selection.png]).
-   Drei Zimmerkategorien mit hochwertigen, stimmungsvollen Bildern und sinnlichen Beschreibungen:
1.  "Le Petit Amour": Kleines, intimes Zimmer.
2.  "L'Oasis du Plaisir": Großes Zimmer mit luxuriösem Badezimmer (Whirlpool).
3.  "Le Sanctuaire": Riesiges Zimmer für mehrere Personen.
-   Ein Kalender zur Auswahl des Datums und der Dauer.
</feature>

<feature id="M2.2_LADY_SELECTION">
Aufgabe: Entwicklung der Lady-Auswahl.
Anforderungen:
-   Eine Galerieansicht der verfügbaren Ladies ([SCREENSHOT: lady-gallery.png]).
-   Detailprofile, die die Persönlichkeit in den Vordergrund stellen ([SCREENSHOT: lady-profile.png]). Fokus auf Hobbies, Charaktereigenschaften, Gesprächs-Themen – nicht nur auf Optik.
-   Die Auswahl einer Lady wird zur Buchung hinzugefügt.
</feature>

<feature id="M2.3_EXPERIENCE_CUSTOMIZER">
Aufgabe: (Neues Feature) Entwicklung eines "Erlebnis-Konfigurators".
Anforderungen:
-   Ein optionaler Schritt, in dem der Gentleman die Stimmung des Dates festlegen kann (z.B. "Sinnlich & Langsam", "Verspielt & Abenteuerlich", "Tiefgründige Gespräche").
-   Zusatzoptionen wie Champagner, spezielle Musikwünsche etc. können hier ausgewählt werden.
</feature>

Modul 3: Exklusivbereich & Community
Der Bereich für Mitglieder mit hohem Vertrauenslevel.

<feature id="M3.1_EXCLUSIVE_EVENTS">
Aufgabe: Entwicklung des Bereichs für exklusive Events.
Anforderungen:
-   Eine Seite, die nur für Gentlemen mit Level 2 oder 3 zugänglich ist.
-   Elegante Darstellung der kommenden Events mit Beschreibung, Datum und Dresscode ([SCREENSHOT: exclusive-events.png]).
-   Anmeldefunktion für Events.
</feature>

<feature id="M3.2_MEMBER_PROFILES_AND_RATINGS">
Aufgabe: Implementierung der Nutzerprofile und des Bewertungssystems.
Anforderungen:
-   Sicherer Bereich, in dem Nutzer ihr eigenes Profil bearbeiten können.
-   Diskretes, beidseitiges Bewertungssystem nach einem Date. Bewertungen sind nur für Admins und die bewertete Person sichtbar.
</feature>

Modul 4: Admin-Kontrollzentrum
Das Cockpit für den Betreiber. Funktional, übersichtlich und sicher. Dieser gesamte Bereich ist nur für Nutzer mit der Rolle "ADMIN" sichtbar und zugänglich.

<feature id="M4.1_AUTHENTICATION_AND_MANAGEMENT">
Aufgabe: Entwicklung des passwortgeschützten Admin-Dashboards.
Anforderungen:
-   Login-Seite ([SCREENSHOT: login-page.png]).
-   Implementierung des kompletten Nutzer-Authentifizierungs-Flows.
-   Übersichtliche Darstellung aller Mitglieder ([SCREENSHOT: admin-dashboard.png]).
-   Funktionen zum Suchen, Filtern, Editieren, Freischalten, Sperren und Löschen von Nutzern.
</feature>

<feature id="M4.2_LEVEL_MANAGEMENT">
Aufgabe: Programmierung des Interfaces zur manuellen Änderung der Gentleman-Stufen.
Anforderungen:
-   Im Admin-Profil eines Gentleman muss das Level (1, 2, 3) per Klick änderbar sein.
</feature>

<feature id="M4.3_GOHIGHLEVEL_INTEGRATION">
Aufgabe: Konfiguration der Webhook-Schnittstelle zu GoHighLevel.
Anforderungen:
-   Ein sicherer Endpunkt im NestJS-Backend.
-   Webhook-Auslösung bei Aktionen wie "Neuer Gentleman freigeschaltet" oder "Gentleman erreicht Level 2".
</feature>
</feature_implementation>

<output_format>
Generiere den vollständigen, produktionsreifen Code. Strukturiere das Projekt in einem logischen Monorepo (Frontend- und Backend-Ordner). Kommentiere komplexe Logikblöcke auf Englisch. Das Ergebnis muss ein sofort lauffähiges Projekt sein.
</output_format>

/Users/fabian/Desktop/Reactprojekte/tabu/ui.png ist ein ui-beispiel, dies sollte aber noch deutlich eleganter werden 
/Users/fabian/Desktop/Reactprojekte/tabu/tabu-logo.jpg dies ist unser firmenlogo.
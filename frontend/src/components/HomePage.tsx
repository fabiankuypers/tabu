import React, { useState, useEffect } from 'react';
import { useGlobalLanguage } from '../hooks/useGlobalLanguage';
import { mockEvents, mockLadies } from '../data/mock-data';
import Navigation from './Navigation';
import TableBookingModal from './TableBookingModal';

const HomePage: React.FC = () => {
  const { t, language } = useGlobalLanguage();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = ['/intro-video.mp4', '/club-video.mp4'];

  const testimonials = [
    {
      quote: language === 'de' 
        ? "Ein Abend wie aus einem Traum. Die Atmosphäre, der Service, die Diskretion - alles perfekt." 
        : "An evening like a dream. The atmosphere, the service, the discretion - everything perfect.",
      author: language === 'de' ? "Alexander M., Stammgast" : "Alexander M., Regular Guest"
    },
    {
      quote: language === 'de'
        ? "TABU hat meine Erwartungen übertroffen. Ein Ort, an dem man sich fallenlassen kann."
        : "TABU exceeded my expectations. A place where you can truly let go.",
      author: language === 'de' ? "Marcus K., VIP Mitglied" : "Marcus K., VIP Member"
    },
    {
      quote: language === 'de'
        ? "Die Eleganz und der Geschmack sind unvergleichlich. Hier fühlt man sich wie ein König."
        : "The elegance and taste are incomparable. Here you feel like a king.",
      author: language === 'de' ? "Stefan W., Premium Gast" : "Stefan W., Premium Guest"
    }
  ];

  const faqs = [
    {
      question: language === 'de' ? "Was ist das Mindestalter für den Clubbesuch?" : "What is the minimum age for club visits?",
      answer: language === 'de' 
        ? "Das Mindestalter beträgt 21 Jahre. Ein gültiger Ausweis ist erforderlich."
        : "The minimum age is 21 years. Valid ID is required."
    },
    {
      question: language === 'de' ? "Wie erfolgt die Anmeldung?" : "How does registration work?",
      answer: language === 'de'
        ? "Die Anmeldung erfolgt diskret über unser Kontaktformular oder persönlich nach Terminvereinbarung."
        : "Registration is done discreetly through our contact form or in person by appointment."
    },
    {
      question: language === 'de' ? "Gibt es einen Dresscode?" : "Is there a dress code?",
      answer: language === 'de'
        ? "Ja, wir erwarten elegante Abendkleidung. Business Casual ist das Minimum."
        : "Yes, we expect elegant evening wear. Business casual is the minimum."
    },
    {
      question: language === 'de' ? "Wie wird die Diskretion gewährleistet?" : "How is discretion ensured?",
      answer: language === 'de'
        ? "Absolute Diskretion ist unser höchstes Gebot. Alle Mitarbeiter sind zur Verschwiegenheit verpflichtet."
        : "Absolute discretion is our highest priority. All staff are bound by confidentiality."
    },
    {
      question: language === 'de' ? "Kann ich Events im Voraus buchen?" : "Can I book events in advance?",
      answer: language === 'de'
        ? "Ja, Reservierungen sind bis zu 4 Wochen im Voraus möglich. Empfohlen für exklusive Events."
        : "Yes, reservations are possible up to 4 weeks in advance. Recommended for exclusive events."
    }
  ];

  return (
    <div className="pb-20">
      <Navigation currentPage="home" />
      
      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            key={currentVideoIndex}
            autoPlay
            muted
            className="w-full h-full object-cover"
            onEnded={() => {
              setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
            }}
          >
            <source src={videos[currentVideoIndex]} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight">
              <span className="block">TABU</span>
              <span 
                className="text-transparent bg-clip-text block text-5xl md:text-6xl mt-4"
                style={{
                  background: `linear-gradient(to right, var(--color-accent-primary), var(--color-accent-light))`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
              >
                {language === 'de' ? 'Gentleman\'s Club' : 'Gentleman\'s Club'}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-12 leading-relaxed max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Erleben Sie diskrete Eleganz und unvergessliche Momente in unserem privaten Refugium für kultivierte Herren.'
                : 'Experience discreet elegance and unforgettable moments in our private refuge for cultured gentlemen.'
              }
            </p>
            
            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/events"
                className="font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 border-2"
                style={{
                  borderColor: 'var(--color-accent-primary)',
                  color: 'var(--color-accent-primary)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
                  e.currentTarget.style.color = 'var(--color-text-on-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-accent-primary)';
                }}
              >
                {language === 'de' ? 'Events ansehen' : 'View Events'}
              </a>
              <a
                href="/ladies"
                className="font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-accent-primary)',
                  color: 'var(--color-text-on-accent)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {language === 'de' ? 'Ladies ansehen' : 'View Ladies'}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Current Events Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              {language === 'de' ? 'Aktuelle' : 'Current'}
              <span 
                className="text-transparent bg-clip-text block"
                style={{
                  background: `linear-gradient(to right, var(--color-accent-primary), var(--color-accent-light))`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
              >
                Events
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {language === 'de'
                ? 'Entdecken Sie unsere sorgfältig kuratierten Veranstaltungen für anspruchsvolle Gentlemen.'
                : 'Discover our carefully curated events for discerning gentlemen.'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mockEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                <div className="relative h-48">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-serif text-white mb-2">{event.title}</h3>
                    <p className="text-slate-300 text-sm">{new Date(event.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-300 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-semibold" style={{ color: 'var(--color-accent-primary)' }}>
                      €{event.price}
                    </span>
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="px-4 py-2 rounded-lg font-medium transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--color-accent-primary)',
                        color: 'var(--color-text-on-accent)'
                      }}
                    >
                      {language === 'de' ? 'Tisch buchen' : 'Book Table'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/events"
              className="inline-flex items-center font-semibold py-3 px-6 rounded-lg transition-all duration-300 border-2"
              style={{
                borderColor: 'var(--color-accent-primary)',
                color: 'var(--color-accent-primary)'
              }}
            >
              {language === 'de' ? 'Alle Events ansehen' : 'View All Events'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-white mb-6">
              {language === 'de' ? 'Was unsere Gäste sagen' : 'What Our Guests Say'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/40 hover:border-gray-700/60 transition-all duration-500">
                  <div className="mb-6">
                    <svg className="w-8 h-8 mx-auto" style={{ color: 'var(--color-accent-primary)' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                  <blockquote className="text-lg text-slate-300 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <cite className="text-sm font-medium" style={{ color: 'var(--color-accent-primary)' }}>
                    {testimonial.author}
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif text-white mb-4">
            {language === 'de' ? 'Bereit für Ihr exklusives Erlebnis?' : 'Ready for Your Exclusive Experience?'}
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {language === 'de'
              ? 'Reservieren Sie Ihren Tisch für einen unvergesslichen Abend voller Eleganz und Diskretion.'
              : 'Reserve your table for an unforgettable evening full of elegance and discretion.'
            }
          </p>
          <button
            onClick={() => setShowBookingModal(true)}
            className="font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-xl"
            style={{
              backgroundColor: 'var(--color-accent-primary)',
              color: 'var(--color-text-on-accent)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
              e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            {language === 'de' ? 'Tisch buchen - €500' : 'Book Table - €500'}
          </button>
        </div>
      </section>

      {/* Ladies Preview Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              {language === 'de' ? 'Elegante' : 'Elegant'}
              <span 
                className="text-transparent bg-clip-text block"
                style={{
                  background: `linear-gradient(to right, var(--color-accent-primary), var(--color-accent-light))`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
              >
                {language === 'de' ? 'Begleitung' : 'Companionship'}
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {language === 'de'
                ? 'Entdecken Sie faszinierende Persönlichkeiten für unvergessliche Momente.'
                : 'Discover fascinating personalities for unforgettable moments.'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {mockLadies.map((lady) => (
              <div key={lady.id} className="group relative overflow-hidden rounded-2xl">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={lady.imageUrl} 
                    alt={lady.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-serif mb-2">{lady.name}</h3>
                    <p className="text-sm text-slate-300 line-clamp-2">{lady.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/ladies"
              className="inline-flex items-center font-semibold py-3 px-6 rounded-lg transition-all duration-300 border-2"
              style={{
                borderColor: 'var(--color-accent-primary)',
                color: 'var(--color-accent-primary)'
              }}
            >
              {language === 'de' ? 'Alle Ladies anzeigen' : 'View All Ladies'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif text-white mb-6">
            {language === 'de' ? 'Exklusive Räumlichkeiten' : 'Exclusive Rooms'}
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            {language === 'de'
              ? 'Perfekt gestaltete Refugien für Ihre intimsten Momente - vom intimen Nest bis zur opulenten Suite.'
              : 'Perfectly designed refuges for your most intimate moments - from intimate nests to opulent suites.'
            }
          </p>
          <a
            href="/rooms"
            className="inline-flex items-center font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-accent-primary)',
              color: 'var(--color-text-on-accent)'
            }}
          >
            {language === 'de' ? 'Räume ansehen' : 'View Rooms'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-white mb-6">
              {language === 'de' ? 'Häufige Fragen' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {language === 'de'
                ? 'Alles was Sie über Ihren Besuch wissen müssen.'
                : 'Everything you need to know about your visit.'
              }
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-black/60 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden">
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-medium text-white group-open:text-accent-primary transition-colors">
                    {faq.question}
                  </h3>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <img src="/tabu-logo.jpg" alt="TABU" className="h-16 w-auto rounded-2xl" />
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                {language === 'de'
                  ? 'Ein exklusiver Gentleman\'s Club, der diskrete Eleganz und unvergessliche Erlebnisse für kultivierte Herren bietet.'
                  : 'An exclusive gentleman\'s club offering discreet elegance and unforgettable experiences for cultured gentlemen.'
                }
              </p>
              <div className="text-sm text-slate-400">
                {language === 'de' ? 'Diskret • Exklusiv • Elegant' : 'Discreet • Exclusive • Elegant'}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6" style={{ color: 'var(--color-accent-primary)' }}>
                {language === 'de' ? 'Navigation' : 'Navigation'}
              </h4>
              <ul className="space-y-3">
                <li><a href="/rooms" className="text-slate-300 hover:text-white transition-colors">{language === 'de' ? 'Räume' : 'Rooms'}</a></li>
                <li><a href="/ladies" className="text-slate-300 hover:text-white transition-colors">{language === 'de' ? 'Ladies' : 'Ladies'}</a></li>
                <li><a href="/events" className="text-slate-300 hover:text-white transition-colors">{language === 'de' ? 'Events' : 'Events'}</a></li>
                <li><a href="/profile" className="text-slate-300 hover:text-white transition-colors">{language === 'de' ? 'Profil' : 'Profile'}</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6" style={{ color: 'var(--color-accent-primary)' }}>
                {language === 'de' ? 'Kontakt' : 'Contact'}
              </h4>
              <ul className="space-y-3 text-slate-300">
                <li>{language === 'de' ? 'Telefon: +43 1 XXX XXXX' : 'Phone: +43 1 XXX XXXX'}</li>
                <li>Email: contact@tabu-club.at</li>
                <li>{language === 'de' ? 'Öffnungszeiten:' : 'Opening Hours:'}</li>
                <li className="text-sm">
                  {language === 'de' ? 'Di-Sa: 20:00 - 04:00' : 'Tue-Sat: 8:00 PM - 4:00 AM'}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 TABU Gentleman's Club. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>

      {/* Table Booking Modal */}
      <TableBookingModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
};

export default HomePage;
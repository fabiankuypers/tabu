import React, { useState } from 'react';
import { useGlobalLanguage } from '../hooks/useGlobalLanguage';
import { mockEvents } from '../data/mock-data';

interface TableBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TableBookingModal: React.FC<TableBookingModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useGlobalLanguage();
  const [selectedEvent, setSelectedEvent] = useState('');
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Close modal and reset form
    setIsSubmitting(false);
    setSelectedEvent('');
    setGuestName('');
    setEmail('');
    setPhone('');
    onClose();
    
    // Show success message (you could implement a toast notification here)
    alert(language === 'de' ? 'Tischreservierung erfolgreich! Wir kontaktieren Sie in Kürze.' : 'Table reservation successful! We will contact you shortly.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif mb-2" style={{ color: 'var(--color-accent-primary)' }}>
            {language === 'de' ? 'Tisch Reservieren' : 'Reserve Table'}
          </h2>
          <p className="text-slate-300">
            {language === 'de' 
              ? 'Sichern Sie sich Ihren exklusiven Platz für einen unvergesslichen Abend'
              : 'Secure your exclusive spot for an unforgettable evening'
            }
          </p>
        </div>

        {/* Price Display */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 text-center border border-slate-700/30">
          <div className="text-4xl font-serif mb-2" style={{ color: 'var(--color-accent-primary)' }}>
            €500
          </div>
          <div className="text-slate-300">
            {language === 'de' ? 'pro Nacht & Tisch' : 'per night & table'}
          </div>
          <div className="text-sm text-slate-400 mt-2">
            {language === 'de' 
              ? 'Inklusive Premium-Service & Concierge'
              : 'Including premium service & concierge'
            }
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              {language === 'de' ? 'Event auswählen *' : 'Select Event *'}
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-colors"
            >
              <option value="">
                {language === 'de' ? 'Bitte wählen Sie ein Event...' : 'Please select an event...'}
              </option>
              {mockEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} - {new Date(event.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              {language === 'de' ? 'Vollständiger Name *' : 'Full Name *'}
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-colors"
              placeholder={language === 'de' ? 'Herr Max Mustermann' : 'Mr. John Doe'}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              {language === 'de' ? 'E-Mail Adresse *' : 'Email Address *'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-colors"
              placeholder={language === 'de' ? 'ihre@email.com' : 'your@email.com'}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              {language === 'de' ? 'Telefonnummer *' : 'Phone Number *'}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-colors"
              placeholder={language === 'de' ? '+49 XXX XXXXXXX' : '+1 XXX XXX XXXX'}
            />
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-slate-400 leading-relaxed">
            {language === 'de' 
              ? 'Mit der Reservierung stimmen Sie unseren Nutzungsbedingungen zu. Alle Angaben werden vertraulich behandelt. Eine Bestätigung erhalten Sie innerhalb von 24 Stunden.'
              : 'By making a reservation, you agree to our terms of service. All information is treated confidentially. You will receive confirmation within 24 hours.'
            }
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{
              backgroundColor: 'var(--color-accent-primary)',
              color: 'var(--color-text-on-accent)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
                e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
                e.currentTarget.style.boxShadow = '';
              }
            }}
          >
            {isSubmitting 
              ? (language === 'de' ? 'Wird reserviert...' : 'Reserving...')
              : (language === 'de' ? 'Tisch Reservieren - €500' : 'Reserve Table - €500')
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default TableBookingModal;
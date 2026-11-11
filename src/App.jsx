import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureBadges } from './components/FeatureBadges';
import { PortfolioSection } from './components/PortfolioSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CareGuideSection } from './components/CareGuideSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CatalogModal } from './components/CatalogModal';
import { TattooDetailModal } from './components/TattooDetailModal';
import { StudioInfoModal } from './components/StudioInfoModal';
import { AdminAppointmentsModal } from './components/AdminAppointmentsModal';
import { sampleAppointments } from './data/initialAppointments';
import { MessageCircle, Phone, Calendar, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function App() {
  // Contact Information state (customizable via Admin Panel)
  const [contactInfo, setContactInfo] = useState(() => {
    const saved = localStorage.getItem('aeterum_contact') || localStorage.getItem('efra_tattos_contact');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      whatsapp: '+52 779 172 8192',
      callPhone: '+52 779 172 8192',
      email: 'contacto@aeterumtattoos.com',
      location: 'Tizayuca, Hgo.',
    };
  });

  // Appointments state with persistence in localStorage
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('aeterum_appointments') || localStorage.getItem('efra_tattos_appointments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return sampleAppointments;
  });

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedTattoo, setPreselectedTattoo] = useState(null);
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [selectedTattooDetail, setSelectedTattooDetail] = useState(null);
  const [studioInfoOpen, setStudioInfoOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [referenceModalOpen, setReferenceModalOpen] = useState(false);

  // Save appointments changes to localStorage
  useEffect(() => {
    localStorage.setItem('aeterum_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Save contactInfo changes to localStorage
  useEffect(() => {
    localStorage.setItem('aeterum_contact', JSON.stringify(contactInfo));
  }, [contactInfo]);

  // Appointment actions
  const handleSaveAppointment = (newApp) => {
    setAppointments(prev => [newApp, ...prev]);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setAppointments(prev =>
      prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
    );
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
  };

  const handleOpenBooking = (tattoo = null) => {
    setPreselectedTattoo(tattoo);
    setBookingModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050506] text-silver-200 selection:bg-neutral-800 selection:text-white">
      
      {/* Navbar with brand, links, and booking trigger */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking(null)}
        onOpenAdmin={() => setAdminPanelOpen(true)}
        appointmentsCount={appointments.filter(a => a.status === 'pendiente').length}
      />

      {/* Main Sections matching 1:1 the uploaded flyer design */}
      <main>
        {/* 1. Hero with tattooed figure, metallic gothic title and CTA */}
        <Hero 
          onOpenBooking={() => handleOpenBooking(null)} 
        />

        {/* 2. Feature Badges (Diseños Personalizados, Estilos, etc.) */}
        <FeatureBadges />

        {/* 3. Portfolio / Nuestro Trabajo */}
        <PortfolioSection 
          onSelectTattoo={(tattoo) => setSelectedTattooDetail(tattoo)}
          onOpenCatalog={() => setCatalogModalOpen(true)}
          onOpenBooking={handleOpenBooking}
        />

        {/* 4. Por qué elegir Efra Tattos */}
        <WhyChooseUs 
          onOpenBooking={() => handleOpenBooking(null)}
          onOpenStudioInfo={() => setStudioInfoOpen(true)}
        />

        {/* 5. Lo que dicen nuestros clientes */}
        <TestimonialsSection />

        {/* 6. Guía de Cuidados (sección de valor añadido) */}
        <CareGuideSection 
          onOpenBooking={() => handleOpenBooking(null)}
        />
      </main>

      {/* Footer matching exact contact strip and bottom slogan */}
      <Footer 
        onOpenBooking={() => handleOpenBooking(null)}
        contactInfo={contactInfo}
      />

      {/* Floating Action Buttons for instant WhatsApp, Call & Booking */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Compare with Original Flyer Button */}
        <button
          onClick={() => setReferenceModalOpen(true)}
          title="Ver imagen original del diseño para comparar"
          className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-900/90 border border-white/20 text-silver-300 hover:text-white hover:border-white/50 text-[11px] shadow-lg backdrop-blur-md transition-all hover:scale-105"
        >
          <ImageIcon className="w-3.5 h-3.5 text-silver-400" />
          <span className="hidden sm:inline">Ver Flyer Original</span>
        </button>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Quick Call */}
          <a
            href={`tel:${contactInfo.callPhone.replace(/[^0-9+]/g, '')}`}
            title="Llamada directa al estudio"
            className="w-11 h-11 rounded-full bg-black/80 hover:bg-white hover:text-black text-silver-200 border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          >
            <Phone className="w-5 h-5" />
          </a>

          {/* Quick WhatsApp */}
          <a
            href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, te contacto desde la página web de Aeterum Ink Tattoo para información sobre un tatuaje.')}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Escribir por WhatsApp"
            className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all hover:scale-110 active:scale-95 animate-pulse hover:animate-none"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Gestor de Citas Modal (WhatsApp, Correo, Llamada) */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setPreselectedTattoo(null);
        }}
        onSaveAppointment={handleSaveAppointment}
        preselectedTattoo={preselectedTattoo}
        contactInfo={contactInfo}
      />

      {/* 2. Catálogo Interactivo Completo */}
      <CatalogModal
        isOpen={catalogModalOpen}
        onClose={() => setCatalogModalOpen(false)}
        onSelectTattoo={(tattoo) => setSelectedTattooDetail(tattoo)}
        onBookTattoo={handleOpenBooking}
        contactInfo={contactInfo}
      />

      {/* 3. Detalle de Tatuaje / Lightbox */}
      <TattooDetailModal
        tattoo={selectedTattooDetail}
        onClose={() => setSelectedTattooDetail(null)}
        onBookTattoo={handleOpenBooking}
        contactInfo={contactInfo}
      />

      {/* 4. Conoce más sobre el estudio */}
      <StudioInfoModal
        isOpen={studioInfoOpen}
        onClose={() => setStudioInfoOpen(false)}
        onOpenBooking={() => handleOpenBooking(null)}
        contactInfo={contactInfo}
      />

      {/* 5. Panel de Administración de Citas para Efra */}
      <AdminAppointmentsModal
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        appointments={appointments}
        onUpdateStatus={handleUpdateStatus}
        onDeleteAppointment={handleDeleteAppointment}
        onAddManualAppointment={handleSaveAppointment}
        contactInfo={contactInfo}
        onUpdateContactInfo={(updated) => setContactInfo(updated)}
      />

      {/* 6. Modal para ver la imagen original de referencia */}
      {referenceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setReferenceModalOpen(false)}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/80 border border-white/30 text-white z-10"
            >
              ✕
            </button>
            <div className="text-center mb-2">
              <span className="font-heading text-xs uppercase tracking-widest text-silver-300">
                Diseño Base Original Anexado
              </span>
            </div>
            <div className="overflow-auto max-h-[80vh] rounded-xl border border-white/20">
              <img
                src="/assets/reference_original.jpg"
                alt="Flyer Original Aeterum Ink Tattoo"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

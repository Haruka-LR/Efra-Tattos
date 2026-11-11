import React, { useState } from 'react';
import { Calendar, Menu, X, ShieldAlert, Sparkles, PhoneCall } from 'lucide-react';

export function Navbar({ onOpenBooking, onOpenAdmin, appointmentsCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/85 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand matching the image */}
          <div 
            onClick={() => scrollTo('inicio')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <img 
                src="/assets/gothic_cross_transparent.png" 
                alt="Aeterum Ink Tattoo Emblem" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading tracking-[0.25em] text-white text-base sm:text-lg font-bold uppercase leading-none group-hover:text-silver-100 transition-colors">
                AETERUM
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-silver-400 uppercase font-light mt-0.5">
                INK TATTOO
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs lg:text-sm tracking-widest uppercase font-light text-silver-300">
            <button 
              onClick={() => scrollTo('inicio')} 
              className="hover:text-white transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white after:scale-x-100 hover:after:scale-x-100"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollTo('portafolio')} 
              className="hover:text-white transition-colors duration-200 py-1 hover:border-b hover:border-white/50"
            >
              Portafolio
            </button>
            <button 
              onClick={() => scrollTo('servicios')} 
              className="hover:text-white transition-colors duration-200 py-1 hover:border-b hover:border-white/50"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollTo('cuidados')} 
              className="hover:text-white transition-colors duration-200 py-1 hover:border-b hover:border-white/50"
            >
              Cuidados
            </button>
            <button 
              onClick={() => scrollTo('contacto')} 
              className="hover:text-white transition-colors duration-200 py-1 hover:border-b hover:border-white/50"
            >
              Contacto
            </button>
          </nav>

          {/* Action Buttons: Booking Pill + Admin Access */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Admin Manager link for Efra */}
            <button
              onClick={onOpenAdmin}
              title="Panel de Gestión de Citas (Admin)"
              className="relative p-2 rounded-full border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-silver-400 hover:text-white transition-all text-xs flex items-center gap-1.5"
            >
              <span className="text-[11px] font-sans px-1 text-silver-400">Gestor</span>
              {appointmentsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>

            {/* Agendar Cita Button Pill exactly as shown in image */}
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-silver-400/50 bg-black/40 hover:bg-white hover:text-black text-silver-100 text-xs sm:text-sm tracking-wider uppercase font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95"
            >
              <span>Agendar Cita</span>
              <Calendar className="w-4 h-4 opacity-80" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-full border border-silver-400/60 text-xs text-white"
            >
              Cita
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-silver-300 hover:text-white focus:outline-none"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-dark-900/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 text-sm tracking-widest uppercase">
            <button 
              onClick={() => scrollTo('inicio')} 
              className="text-left py-2 text-white border-b border-white/5"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollTo('portafolio')} 
              className="text-left py-2 text-silver-300 hover:text-white border-b border-white/5"
            >
              Portafolio
            </button>
            <button 
              onClick={() => scrollTo('servicios')} 
              className="text-left py-2 text-silver-300 hover:text-white border-b border-white/5"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollTo('cuidados')} 
              className="text-left py-2 text-silver-300 hover:text-white border-b border-white/5"
            >
              Cuidados
            </button>
            <button 
              onClick={() => scrollTo('contacto')} 
              className="text-left py-2 text-silver-300 hover:text-white border-b border-white/5"
            >
              Contacto
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Agendar Cita Ahora
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 rounded-full border border-neutral-700 text-silver-400 text-xs tracking-wider"
            >
              Acceso a Gestor de Citas ({appointmentsCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

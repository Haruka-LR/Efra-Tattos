import React from 'react';
import { Calendar, Phone, MapPin, MessageCircle } from 'lucide-react';

export function Footer({ onOpenBooking, contactInfo }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="border-t border-white/10 bg-[#060608] pt-14 pb-10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row matching exactly the image bottom layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-center pb-12 border-b border-white/10">
          
          {/* 1. Brand Logo */}
          <div className="lg:col-span-1 flex items-center gap-3">
            <div className="w-9 h-9 relative flex-shrink-0">
              <img 
                src="/assets/gothic_cross_transparent.png" 
                alt="Logo Cross" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              />
            </div>
            <div>
              <span className="font-heading text-sm tracking-[0.2em] text-white font-bold block uppercase leading-tight">
                AETERUM
              </span>
              <span className="text-[9px] tracking-[0.25em] text-silver-400 uppercase font-light block">
                INK TATTOO
              </span>
            </div>
          </div>

          {/* 2. Social Media Links */}
          <div className="lg:col-span-1 flex items-center gap-4 text-silver-300">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:text-white hover:border-white/50 transition-all hover:scale-110"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            
            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:text-white hover:border-white/50 transition-all hover:scale-110"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.86-4.49V8.58a8.28 8.28 0 0 0 4.91 1.6v-3.5z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:text-white hover:border-white/50 transition-all hover:scale-110"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>

          {/* 3. WhatsApp Direct Contact */}
          <div className="lg:col-span-1">
            <a 
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, vi la página web de Aeterum Ink Tattoo y me interesa agendar una cita o cotizar un tatuaje.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-left"
            >
              <div className="w-9 h-9 rounded-full border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="font-sans text-xs sm:text-sm text-white font-medium block group-hover:text-emerald-300 transition-colors">
                  {contactInfo.whatsapp}
                </span>
                <span className="text-[10px] text-silver-400 block font-light">
                  Agenda tu cita por WhatsApp
                </span>
              </div>
            </a>
          </div>

          {/* 4. Location matching flyer */}
          <div className="lg:col-span-1 flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-silver-300">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-sans text-xs sm:text-sm text-white font-medium block">
                {contactInfo.location}
              </span>
              <span className="text-[10px] text-silver-400 block font-light">
                (Citas únicamente)
              </span>
            </div>
          </div>

          {/* 5. Agendar Cita Pill Button */}
          <div className="lg:col-span-1 flex justify-start lg:justify-end">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-silver-400/60 bg-black/50 hover:bg-white hover:text-black text-silver-100 text-xs sm:text-sm tracking-wider uppercase font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95"
            >
              <span>Agendar Cita</span>
              <Calendar className="w-4 h-4 opacity-80" />
            </button>
          </div>

        </div>

        {/* Bottom Bar: Star divider & slogan */}
        <div className="pt-8 text-center space-y-3">
          <div className="divider-ornament max-w-sm mx-auto">
            <span className="text-white/40 text-xs tracking-widest">✦</span>
          </div>

          <p className="font-heading text-xs sm:text-sm tracking-[0.25em] text-silver-400 uppercase font-light">
            AETERUM INK TATTOO <span className="mx-2 text-white/30">•</span> <span className="font-cormorant italic lowercase tracking-wider text-sm sm:text-base text-silver-300">Arte eterno, en manos expertas.</span>
          </p>

          <p className="text-[10px] text-silver-400 tracking-wider font-light">
            © {currentYear} Aeterum Ink Tattoo. Todos los derechos reservados. Diseñado para artistas y clientes que buscan la excelencia.
          </p>
        </div>

      </div>
    </footer>
  );
}

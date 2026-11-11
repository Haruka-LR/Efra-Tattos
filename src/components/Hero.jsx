import React from 'react';
import { ChevronRight, Calendar, Sparkles } from 'lucide-react';

export function Hero({ onOpenBooking }) {
  return (
    <section id="inicio" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
      {/* Background with the moody tattooed figure and smoke extracted from the original artwork */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/hero_model.jpg" 
          alt="Tattoo Art Atmosphere" 
          className="w-full h-full object-cover object-center sm:object-right-top opacity-35 filter contrast-125 brightness-90 scale-105"
        />
        {/* Gradients to blend smoothly into deep black */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050506] via-[#050506]/85 to-transparent sm:to-[#050506]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-transparent to-[#050506]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Top Ornate Cross & Star */}
        <div className="flex flex-col items-center mb-3 sm:mb-4 animate-in fade-in duration-700">
          <div className="w-12 h-12 sm:w-16 sm:h-16 relative mb-2">
            <img 
              src="/assets/gothic_cross_transparent.png" 
              alt="Gothic Cross" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-pulse"
            />
          </div>
          <span className="text-white/40 text-xs sm:text-sm tracking-[0.5em]">✦</span>
        </div>

        {/* Main Title: AETERUM with metallic gothic aesthetic */}
        <div className="mb-4 sm:mb-6">
          <h1 className="font-gothic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.12em] text-white uppercase text-metallic drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
            AETERUM
          </h1>
          <div className="flex items-center justify-center gap-3 mt-1 sm:mt-2">
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-white/60"></span>
            <span className="text-xs sm:text-sm tracking-[0.45em] text-silver-300 font-heading uppercase font-semibold">
              INK TATTOO
            </span>
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-white/60"></span>
          </div>
        </div>

        {/* Tagline exactly as in image: TU HISTORIA, EN TU PIEL */}
        <h2 className="font-heading text-lg sm:text-2xl md:text-3xl tracking-[0.3em] sm:tracking-[0.35em] text-silver-100 uppercase font-light mb-2 drop-shadow-md">
          TU HISTORIA, EN TU PIEL.
        </h2>

        {/* Sub-tagline: Arte eterno. Diseño sin límites. */}
        <p className="font-cormorant italic text-lg sm:text-2xl md:text-3xl text-silver-400 font-normal tracking-wider mb-8 sm:mb-10 max-w-xl">
          Arte eterno. Diseño sin límites.
        </p>

        {/* Pill CTA Button: Agendar Cita > */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => onOpenBooking()}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-silver-400/60 bg-black/60 hover:bg-white hover:text-black text-silver-100 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <Calendar className="w-4 h-4 text-silver-300 group-hover:text-black transition-colors" />
            <span>Agendar Cita</span>
            <ChevronRight className="w-4 h-4 text-silver-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        {/* Subtle scroll down indicator */}
        <div className="mt-12 sm:mt-16 text-white/30 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-[10px] tracking-widest uppercase">Explorar</span>
          <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

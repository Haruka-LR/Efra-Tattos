import React, { useState } from 'react';
import { ChevronRight, Eye, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { initialTattoos, studioProcessPhotos } from '../data/tattoos';

export function PortfolioSection({ onSelectTattoo, onOpenCatalog, onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('efrain'); // 'efrain' | 'estudio' | 'todos'

  // Real works by Efraín
  const realWorks = initialTattoos.filter(t => t.isRealWork);
  // Original artwork designs
  const studioDesigns = initialTattoos.filter(t => !t.isRealWork && t.id <= 5);

  const displayedTattoos = activeTab === 'efrain' 
    ? realWorks 
    : activeTab === 'estudio' 
      ? studioDesigns 
      : initialTattoos.slice(0, 10);

  return (
    <section id="portafolio" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Star Divider & Title */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="divider-ornament max-w-md mx-auto mb-4">
            <span className="text-white/60 text-sm tracking-widest">✦</span>
          </div>
          
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl tracking-[0.2em] text-white uppercase font-bold mb-2">
            NUESTRO TRABAJO
          </h2>
          
          <p className="font-cormorant italic text-lg sm:text-2xl text-silver-400 font-normal">
            Arte que perdura en la piel.
          </p>

          {/* Sub-tabs to toggle between real tattoo works by Efraín and studio designs */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('efrain')}
              className={`px-4 py-2 rounded-full text-xs font-heading uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'efrain'
                  ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                  : 'bg-white/5 text-silver-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              ★ Obras en Piel (Efraín)
            </button>
            <button
              onClick={() => setActiveTab('estudio')}
              className={`px-4 py-2 rounded-full text-xs font-heading uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'estudio'
                  ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                  : 'bg-white/5 text-silver-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Diseños de Estudio
            </button>
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-4 py-2 rounded-full text-xs font-heading uppercase tracking-wider transition-all duration-300 hidden sm:inline-block ${
                activeTab === 'todos'
                  ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                  : 'bg-white/5 text-silver-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Ver Colección
            </button>
          </div>
        </div>

        {/* 5 Portfolio Cards Grid - Matching Flyer Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-14">
          {displayedTattoos.slice(0, 5).map((item, index) => (
            <div
              key={item.id}
              onClick={() => onSelectTattoo(item)}
              className="group relative cursor-pointer overflow-hidden rounded-lg sm:rounded-xl border border-white/10 bg-dark-900 transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-1.5"
            >
              {/* Aspect ratio container matching vertical flyer cards */}
              <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[1/1.4] w-full overflow-hidden bg-black/60 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-out"
                />

                {/* Subtle vignette shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Badge if it's an authentic work by Efraín */}
                {item.isRealWork && (
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[9px] uppercase tracking-wider text-emerald-300 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Realizado</span>
                  </div>
                )}

                {/* Hover overlay with title and quick action */}
                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-silver-400 font-sans">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-xs sm:text-sm text-white font-semibold leading-tight mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-white font-medium">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver detalle</span>
                  </div>
                </div>

                {/* Number index badge in gothic style */}
                <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-[10px] text-silver-300 font-heading">
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Showcase: Proceso y Técnica en el Estudio --- */}
        <div className="mb-14 rounded-2xl border border-white/10 bg-gradient-to-b from-dark-900/60 to-black/80 p-6 sm:p-8 relative overflow-hidden backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-silver-400 text-xs uppercase tracking-widest font-heading mb-1">
                <span>✦</span>
                <span>Detrás de Cada Pieza</span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl text-white font-bold tracking-wider">
                EFRAÍN EN EL ESTUDIO • TÉCNICA & BIOSEGURIDAD
              </h3>
            </div>
            <span className="text-xs text-silver-400 font-light max-w-sm">
              Fotografías reales del estudio durante sesiones de tatuaje, asepsia de instrumental y trazado milimétrico.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {studioProcessPhotos.map((proc) => (
              <div 
                key={proc.id} 
                className="group rounded-xl border border-white/10 bg-black/60 overflow-hidden hover:border-white/30 transition-all duration-500"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-black/80 relative">
                  <img
                    src={proc.image}
                    alt={proc.title}
                    className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] uppercase tracking-wider text-silver-400 font-sans block">
                      {proc.subtitle}
                    </span>
                    <h4 className="font-heading text-sm text-white font-semibold">
                      {proc.title}
                    </h4>
                  </div>
                </div>
                <div className="p-3.5">
                  <p className="text-xs text-silver-300 font-light leading-relaxed">
                    {proc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ver más trabajos Button */}
        <div className="text-center">
          <button
            onClick={onOpenCatalog}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-silver-400/50 bg-black/40 hover:bg-white hover:text-black text-silver-200 text-xs sm:text-sm tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95"
          >
            <span>Ver Catálogo Completo</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}

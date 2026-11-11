import React from 'react';
import { ChevronRight, Eye, Sparkles } from 'lucide-react';
import { initialTattoos } from '../data/tattoos';

export function PortfolioSection({ onSelectTattoo, onOpenCatalog, onOpenBooking }) {
  // Take the 5 featured tattoos matching the flyer
  const featured = initialTattoos.filter(t => t.featured).slice(0, 5);

  return (
    <section id="portafolio" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Star Divider & Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="divider-ornament max-w-md mx-auto mb-4">
            <span className="text-white/60 text-sm tracking-widest">✦</span>
          </div>
          
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl tracking-[0.2em] text-white uppercase font-bold mb-2">
            NUESTRO TRABAJO
          </h2>
          
          <p className="font-cormorant italic text-lg sm:text-2xl text-silver-400 font-normal">
            Arte que perdura.
          </p>
        </div>

        {/* 5 Portfolio Cards Grid - Exactly matching the image composition */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-12">
          {featured.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onSelectTattoo(item)}
              className="group relative cursor-pointer overflow-hidden rounded-lg sm:rounded-xl border border-white/10 bg-dark-900 transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-1.5"
            >
              {/* Aspect ratio container matching vertical flyer cards */}
              <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[1/1.4] w-full overflow-hidden bg-black/50 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-out"
                />

                {/* Subtle vignette shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
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
                <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-[10px] text-silver-300 font-heading">
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ver más trabajos Button */}
        <div className="text-center">
          <button
            onClick={onOpenCatalog}
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full border border-silver-400/50 bg-black/40 hover:bg-white hover:text-black text-silver-200 text-xs sm:text-sm tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
          >
            <span>Ver más trabajos</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}

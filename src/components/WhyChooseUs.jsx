import React from 'react';
import { ChevronRight, Gem, ShieldCheck, UserCheck } from 'lucide-react';

export function WhyChooseUs({ onOpenBooking, onOpenStudioInfo }) {
  const highlights = [
    {
      icon: <Gem className="w-6 h-6 text-silver-300" strokeWidth={1.5} />,
      title: 'Diseño 100% personalizado',
      desc: 'Tu idea, nuestra creatividad.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-silver-300" strokeWidth={1.5} />,
      title: 'Estudio higiénico y seguro',
      desc: 'Tu salud es lo primero.',
    },
    {
      icon: <UserCheck className="w-6 h-6 text-silver-300" strokeWidth={1.5} />,
      title: 'Atención cercana y profesional',
      desc: 'Acompañamiento en todo el proceso.',
    },
  ];

  return (
    <section id="servicios" className="py-20 sm:py-28 relative border-t border-white/5 bg-[#070709]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Paragraph & Conoce más */}
          <div className="lg:col-span-5 text-left space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-[0.18em] text-white uppercase font-bold leading-tight">
              ¿POR QUÉ <br className="hidden sm:inline" />
              ELEGIR AETERUM?
            </h2>

            <div className="space-y-4 text-silver-400 text-sm sm:text-base font-light leading-relaxed">
              <p className="font-medium text-silver-200">
                Más que un tatuaje, una experiencia.
              </p>
              <p>
                En Aeterum combinamos técnica, estilo y pasión para crear piezas únicas, 
                en un espacio seguro, cómodo y profesional. Cada trazo está pensado para perdurar con nitidez y fuerza a través de los años.
              </p>
            </div>

            <div>
              <button
                onClick={onOpenStudioInfo}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full border border-silver-400/50 bg-black/40 hover:bg-white hover:text-black text-silver-200 text-xs sm:text-sm tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer"
              >
                <span>Conoce más</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center Column: Large Ornate Gothic Cross Emblem */}
          <div className="lg:col-span-3 flex justify-center items-center py-4 sm:py-0">
            <div className="relative w-44 sm:w-56 lg:w-64 max-w-full flex items-center justify-center group">
              {/* Radial glow backdrop */}
              <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors pointer-events-none" />
              <img
                src="/assets/gothic_cross_transparent.png"
                alt="Emblema Cruz Gótica Aeterum Ink Tattoo"
                className="w-full h-auto object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: 3 Icon Highlights matching the image */}
          <div className="lg:col-span-4 space-y-8">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center flex-shrink-0 group-hover:border-white/50 group-hover:bg-white/[0.08] transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading text-sm sm:text-base text-white font-semibold tracking-wider mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-silver-400 font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

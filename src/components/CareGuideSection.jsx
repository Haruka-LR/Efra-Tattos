import React from 'react';
import { Droplets, Sparkles, SunDim, ShieldCheck, HeartHandshake } from 'lucide-react';

export function CareGuideSection({ onOpenBooking }) {
  const steps = [
    {
      step: '01',
      title: 'Primeras 3 a 5 horas',
      icon: <ShieldCheck className="w-5 h-5 text-silver-300" />,
      desc: 'Mantén el parche adhesivo o plástico protector colocado. Evita tocarlo con las manos sucias.',
    },
    {
      step: '02',
      title: 'Lavado con jabón neutro',
      icon: <Droplets className="w-5 h-5 text-silver-300" />,
      desc: 'Lava la zona con agua templada y jabón neutro antibacterial. Seca suavemente con toques de papel absorbente.',
    },
    {
      step: '03',
      title: 'Hidratación controlada',
      icon: <Sparkles className="w-5 h-5 text-silver-300" />,
      desc: 'Aplica una capa muy fina de ungüento cicatrizante recomendado (3 veces al día). Menos es más; la piel necesita respirar.',
    },
    {
      step: '04',
      title: 'Evitar sol y agua estancada',
      icon: <SunDim className="w-5 h-5 text-silver-300" />,
      desc: 'Prohibido albercas, mar, saunas y exposición solar directa durante al menos 15 a 20 días. No arranques costras.',
    },
  ];

  return (
    <section id="cuidados" className="py-20 sm:py-24 border-t border-white/5 bg-black/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Star Divider & Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="divider-ornament max-w-md mx-auto mb-4">
            <span className="text-white/60 text-sm tracking-widest">✦</span>
          </div>
          
          <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl tracking-[0.2em] text-white uppercase font-bold mb-2">
            GUÍA DE CUIDADOS Y CICATRIZACIÓN
          </h2>
          <p className="font-cormorant italic text-base sm:text-xl text-silver-400 font-normal">
            El 50% del resultado depende de cómo cuides tu pieza.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/10 bg-dark-900/40 relative overflow-hidden group hover:border-white/30 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-gothic text-2xl text-white/30 group-hover:text-white/70 transition-colors">
                  {st.step}
                </span>
                <div className="p-2 rounded-full border border-white/10 bg-white/5">
                  {st.icon}
                </div>
              </div>
              <h3 className="font-heading text-sm sm:text-base text-white font-semibold mb-2">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-silver-400 font-light leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Direct consultation prompt */}
        <div className="mt-12 text-center p-6 rounded-2xl border border-white/10 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
          <p className="text-xs sm:text-sm text-silver-300 mb-3">
            ¿Tienes dudas sobre un tatuaje que te realizaste con nosotros o requieres retoque?
          </p>
          <button
            onClick={() => onOpenBooking()}
            className="text-xs uppercase tracking-widest text-white border-b border-white hover:text-silver-300 transition-colors pb-1 inline-flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Consultar directamente con Efra</span>
          </button>
        </div>

      </div>
    </section>
  );
}

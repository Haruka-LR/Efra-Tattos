import React from 'react';
import { ShieldCheck, Plus, Sparkles } from 'lucide-react';

export function FeatureBadges() {
  const features = [
    {
      icon: (
        <span className="text-xl leading-none font-serif text-silver-300">†</span>
      ),
      label: 'Diseños Personalizados',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-silver-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Rose SVG silhouette */}
          <path d="M12 4c2-2 5-1 6 1s0 4-2 5c2 1 3 4 1 6-2 2-5 2-7 0-2 2-5 2-7 0-2-2-1-5 1-6-2-1-3-4-2-5s4-3 6-1z" />
          <path d="M12 16v6" />
          <path d="M9 19c2 1 3-1 3-1" />
        </svg>
      ),
      label: 'Estilos Variados',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-silver-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Skull SVG silhouette */}
          <circle cx="9" cy="11" r="1.5" fill="currentColor" />
          <circle cx="15" cy="11" r="1.5" fill="currentColor" />
          <path d="M12 2a9 9 0 0 0-9 9c0 3.2 1.7 6 4.3 7.6.4.2.7.7.7 1.2v1.2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1.2c0-.5.3-1 .7-1.2A9 9 0 0 0 21 11a9 9 0 0 0-9-9z" />
          <path d="M10 18v3" />
          <path d="M14 18v3" />
        </svg>
      ),
      label: 'Atención Profesional',
    },
    {
      icon: (
        <ShieldCheck className="w-5 h-5 text-silver-300" strokeWidth={1.5} />
      ),
      label: 'Higiene Garantizada',
    },
  ];

  return (
    <section className="border-y border-white/10 bg-[#08080a]/90 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className="py-4 sm:py-5 px-4 flex items-center justify-center gap-3 text-center group hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-silver-400 group-hover:text-white group-hover:scale-110 transition-all">
                {feat.icon}
              </div>
              <span className="text-xs sm:text-sm tracking-wider text-silver-200 group-hover:text-white font-heading font-medium">
                {feat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

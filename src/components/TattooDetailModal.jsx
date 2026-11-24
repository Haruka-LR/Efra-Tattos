import React from 'react';
import { X, Calendar, MessageCircle, Clock, MapPin, Sparkles, Share2 } from 'lucide-react';

export function TattooDetailModal({ tattoo, onClose, onBookTattoo, contactInfo }) {
  if (!tattoo) return null;

  const handleWhatsAppQuote = () => {
    const text = `*CONSULTA DE PIEZA - AETERUM INK TATTOO*\n\nHola, me encantó este trabajo de su catálogo:\n- *Pieza:* ${tattoo.title}\n- *Estilo:* ${tattoo.style}\n- *Zona sugerida:* ${tattoo.recommendedZone}\n\n¿Podrían darme un costo estimado y disponibilidad para agendar?`;
    const cleanPhone = contactInfo.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b0b0e] border border-white/20 rounded-2xl max-w-3xl w-full relative shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-silver-300 hover:text-white rounded-full bg-black/60 backdrop-blur-md border border-white/20 transition-colors"
          aria-label="Cerrar detalle"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Large Image */}
        <div className="md:w-1/2 bg-black flex items-center justify-center relative overflow-hidden max-h-[50vh] md:max-h-full">
          <img
            src={tattoo.image}
            alt={tattoo.title}
            className="w-full h-full object-cover md:object-contain filter contrast-110"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-wider text-silver-200">
              {tattoo.category}
            </span>
            {tattoo.isRealWork && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md border border-emerald-500/40 text-[10px] uppercase tracking-wider text-emerald-300 font-semibold">
                ✓ Trabajo Real en Estudio
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Information & Quick Booking */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-silver-400 font-heading block">
                {tattoo.style}
              </span>
              <h2 className="font-heading text-xl sm:text-2xl text-white font-bold tracking-wide mt-1">
                {tattoo.title}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-silver-300 font-light leading-relaxed">
              {tattoo.description}
            </p>

            <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-silver-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-silver-400 flex-shrink-0" />
                <span><strong>Zona recomendada:</strong> {tattoo.recommendedZone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-silver-400 flex-shrink-0" />
                <span><strong>Tiempo estimado:</strong> {tattoo.approxSessions}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-silver-400 flex-shrink-0" />
                <span><strong>Diseño:</strong> 100% esterilizado & aguja premium</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                onClose();
                onBookTattoo(tattoo);
              }}
              className="w-full py-3 rounded-full bg-white text-black font-semibold hover:bg-silver-200 text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Cita Para Esta Pieza</span>
            </button>

            <button
              onClick={handleWhatsAppQuote}
              className="w-full py-2.5 rounded-full border border-emerald-500/50 bg-emerald-950/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Cotizar Directo por WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

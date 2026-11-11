import React from 'react';
import { X, ShieldCheck, Sparkles, HeartHandshake, Award, Clock, MapPin, CheckCircle } from 'lucide-react';

export function StudioInfoModal({ isOpen, onClose, onOpenBooking, contactInfo }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b0b0e] border border-white/20 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-silver-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Cerrar información"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-silver-400 text-xs uppercase tracking-widest font-heading mb-1">
            <span>✦</span>
            <span>Estudio Profesional</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl text-white font-bold tracking-wider">
            CONOCE EFRA TATTOS
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-silver-400 mt-1">
            Donde la devoción por el detalle y el arte eterno se unen.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-5 text-xs sm:text-sm text-silver-300 font-light leading-relaxed">
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <h3 className="font-heading text-white font-semibold flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-silver-400" />
              Nuestra Filosofía
            </h3>
            <p>
              Entendemos que cada tatuaje es un compromiso para toda la vida. Por ello, no hacemos tatuajes en serie: 
              cada cliente recibe un trato personalizado, bocetaje previo adaptado a la anatomía de su cuerpo y asesoría sincera sobre viabilidad, envejecimiento de la tinta y tamaño adecuado.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <h3 className="font-heading text-white font-semibold flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Protocolo Estricto de Bioseguridad
            </h3>
            <ul className="space-y-1.5 text-silver-400 list-disc list-inside">
              <li>Material 100% estéril y desechable (agujas abiertas en presencia del cliente).</li>
              <li>Tintas premium certificadas y libres de metales nocivos.</li>
              <li>Desinfección de grado hospitalario y campo estéril antes de cada sesión.</li>
              <li>Instalaciones climatizadas y privadas para mayor confort y concentración.</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-white/10 bg-black/40">
              <div className="flex items-center gap-2 text-white font-heading text-xs font-semibold mb-1">
                <Clock className="w-4 h-4 text-silver-400" />
                <span>Horarios de Atención</span>
              </div>
              <p className="text-silver-400 text-xs">
                Lunes a Sábado: 11:00 AM - 08:00 PM<br />
                Domingos: Sesiones especiales bajo reserva previa.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-white/10 bg-black/40">
              <div className="flex items-center gap-2 text-white font-heading text-xs font-semibold mb-1">
                <MapPin className="w-4 h-4 text-silver-400" />
                <span>Ubicación</span>
              </div>
              <p className="text-silver-400 text-xs">
                {contactInfo.location}<br />
                Atención exclusivamente con cita previa confirmada.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/20 text-silver-300 hover:text-white text-xs uppercase tracking-wider"
          >
            Entendido
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="flex-1 py-3 rounded-xl bg-white text-black font-semibold hover:bg-silver-200 text-xs uppercase tracking-wider transition-colors"
          >
            Agendar Mi Cita
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, MessageCircle, Mail, Phone, Calendar, Clock, Image as ImageIcon, CheckCircle2, Sparkles, Send, ArrowRight, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BUSINESS_HOURS = [
  { value: '09:00', label: '09:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '01:00 PM' },
  { value: '14:00', label: '02:00 PM' },
  { value: '15:00', label: '03:00 PM' },
  { value: '16:00', label: '04:00 PM' },
  { value: '17:00', label: '05:00 PM' },
  { value: '18:00', label: '06:00 PM' },
];

export function BookingModal({ 
  isOpen, 
  onClose, 
  onSaveAppointment, 
  preselectedTattoo, 
  contactInfo,
  existingAppointments = [] 
}) {
  if (!isOpen) return null;

  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'email' | 'call'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselectedTattoo ? `Pieza: ${preselectedTattoo.title}` : 'Tatuaje Personalizado',
    style: preselectedTattoo?.category || 'Black & Grey',
    bodyZone: preselectedTattoo?.recommendedZone || 'Antebrazo',
    size: '12 x 8 cm',
    description: preselectedTattoo ? `Me interesa una pieza similar a "${preselectedTattoo.title}" (${preselectedTattoo.style}).` : '',
    preferredDate: '',
    preferredTime: '',
    referenceImage: null,
    notes: '',
  });

  const [timeWarning, setTimeWarning] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');

  const todayDate = new Date().toISOString().split('T')[0];

  // Normalizes any time representation to HH:00 format
  const normalizeHour = (t) => {
    if (!t) return '';
    const clean = String(t).trim().split(' ')[0];
    const parts = clean.split(':');
    if (!parts[0]) return '';
    const h = String(parseInt(parts[0], 10)).padStart(2, '0');
    return `${h}:00`;
  };

  // Checks if a given time slot is already taken on a specific date
  const isTimeOccupied = (timeValue, date = formData.preferredDate) => {
    if (!date || !timeValue) return false;
    const target = normalizeHour(timeValue);
    return (existingAppointments || []).some((app) => {
      if (app.status === 'cancelada') return false;
      if (app.preferredDate !== date) return false;
      return normalizeHour(app.preferredTime) === target;
    });
  };

  // Date change handler to re-validate selected hour
  const handleDateChange = (newDate) => {
    setTimeWarning('');
    if (formData.preferredTime && isTimeOccupied(formData.preferredTime, newDate)) {
      setFormData(prev => ({ ...prev, preferredDate: newDate, preferredTime: '' }));
      setTimeWarning('El horario que tenías seleccionado no está disponible en esta nueva fecha. Por favor elige uno disponible.');
    } else {
      setFormData(prev => ({ ...prev, preferredDate: newDate }));
    }
  };

  // Handle image upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, referenceImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate WhatsApp pre-formatted message
  const generateWhatsAppMessage = () => {
    const timeLabel = BUSINESS_HOURS.find(h => h.value === formData.preferredTime)?.label || formData.preferredTime || 'Por coordinar';
    return `*SOLICITUD DE CITA - AETERUM INK TATTOO*
---------------------------------------
👤 *Cliente:* ${formData.name || 'No especificado'}
📱 *Teléfono:* ${formData.phone || 'No especificado'}
✉️ *Email:* ${formData.email || 'No especificado'}
🎨 *Servicio / Estilo:* ${formData.service} (${formData.style})
📍 *Zona del cuerpo:* ${formData.bodyZone || 'A convenir'}
📏 *Tamaño aprox:* ${formData.size || 'A convenir'}
📅 *Fecha preferida:* ${formData.preferredDate || 'Por coordinar'} a las ${timeLabel}
💡 *Idea / Descripción:* ${formData.description || 'Consulta general'}
${formData.notes ? `📝 *Notas:* ${formData.notes}\n` : ''}---------------------------------------
_Enviado desde el Gestor Web de Aeterum Ink Tattoo_`;
  };

  // Generate Email subject and body
  const generateEmailData = () => {
    const timeLabel = BUSINESS_HOURS.find(h => h.value === formData.preferredTime)?.label || formData.preferredTime || 'Por coordinar';
    const subject = `[CITA AETERUM INK TATTOO] Solicitud de Cita - ${formData.name || 'Nuevo Cliente'}`;
    const body = `Hola equipo de Aeterum Ink Tattoo,\n\nMe gustaría solicitar una cita para un tatuaje con los siguientes datos:\n\n` +
      `- Nombre: ${formData.name}\n` +
      `- Teléfono: ${formData.phone}\n` +
      `- Correo: ${formData.email}\n` +
      `- Servicio: ${formData.service}\n` +
      `- Estilo: ${formData.style}\n` +
      `- Zona del cuerpo: ${formData.bodyZone}\n` +
      `- Medida aprox: ${formData.size}\n` +
      `- Fecha tentativa: ${formData.preferredDate} a las ${timeLabel}\n` +
      `- Descripción: ${formData.description}\n` +
      `- Notas adicionales: ${formData.notes}\n\n` +
      `Quedo en espera de su respuesta para confirmar disponibilidad.\n\nSaludos.`;
    return { subject, body };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.preferredDate) {
      alert('Por favor selecciona una fecha tentativa para tu cita.');
      return;
    }

    if (!formData.preferredTime) {
      alert('Por favor selecciona uno de los horarios disponibles (de 9:00 AM a 6:00 PM).');
      return;
    }

    if (isTimeOccupied(formData.preferredTime, formData.preferredDate)) {
      alert('El horario seleccionado ya no está disponible. Por favor elige otro horario.');
      return;
    }

    // Create appointment object
    const newAppointment = {
      id: `cita-${Date.now()}`,
      ...formData,
      contactMethod: channel,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
    };

    onSaveAppointment(newAppointment);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#c0c0c0', '#777777', '#d4af37'],
      });
    } catch (err) {
      // ignore if confetti fails
    }

    if (channel === 'whatsapp') {
      const cleanPhone = contactInfo.whatsapp.replace(/[^0-9]/g, '');
      const text = encodeURIComponent(generateWhatsAppMessage());
      const waUrl = `https://wa.me/${cleanPhone}?text=${text}`;
      setGeneratedUrl(waUrl);
      window.open(waUrl, '_blank');
    } else if (channel === 'email') {
      const { subject, body } = generateEmailData();
      const mailtoUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setGeneratedUrl(mailtoUrl);
      window.location.href = mailtoUrl;
    } else if (channel === 'call') {
      const cleanTel = contactInfo.callPhone.replace(/[^0-9+]/g, '');
      window.location.href = `tel:${cleanTel}`;
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0b0b0e] border border-white/20 rounded-2xl max-w-2xl w-full p-5 sm:p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.9)] my-auto max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-silver-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation View */
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl sm:text-2xl text-white font-bold tracking-wider">
                ¡SOLICITUD REGISTRADA CON ÉXITO!
              </h3>
              <p className="text-sm text-silver-300 max-w-md mx-auto">
                Tu solicitud ha sido guardada en nuestro gestor de citas y se abrió la vía de contacto correspondiente ({channel.toUpperCase()}).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-black/60 text-left max-w-md mx-auto text-xs space-y-1.5 text-silver-400">
              <p><strong className="text-white">Cliente:</strong> {formData.name}</p>
              <p><strong className="text-white">Servicio:</strong> {formData.service}</p>
              <p><strong className="text-white">Fecha y Horario:</strong> {formData.preferredDate} a las {BUSINESS_HOURS.find(h => h.value === formData.preferredTime)?.label || formData.preferredTime}</p>
              <p><strong className="text-white">Medio elegido:</strong> {channel === 'whatsapp' ? 'WhatsApp Directo' : channel === 'email' ? 'Correo Electrónico' : 'Llamada Telefónica'}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              {channel === 'whatsapp' && (
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4" />
                  Abrir WhatsApp nuevamente
                </a>
              )}
              {channel === 'call' && (
                <a
                  href={`tel:${contactInfo.callPhone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-silver-200 text-xs font-semibold uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4" />
                  Llamar ahora al estudio
                </a>
              )}
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-full border border-white/20 text-silver-300 hover:text-white text-xs uppercase tracking-wider"
              >
                Cerrar ventana
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <div className="space-y-6">
            
            {/* Header */}
            <div className="text-left border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-silver-400 text-xs uppercase tracking-widest font-heading mb-1">
                <span>✦</span>
                <span>Gestor de Citas & Cotizaciones</span>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl text-white font-bold tracking-wider">
                AGENDA TU CITA CON AETERUM INK TATTOO
              </h2>
              <p className="text-xs sm:text-sm text-silver-400 mt-1">
                Elige tu canal de contacto preferido (WhatsApp, correo o llamada directa) y envíanos los detalles de tu pieza.
              </p>
            </div>

            {/* Step 1: Channel Selector Tabs */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-silver-400 mb-2 font-medium">
                1. ¿Por qué medio deseas coordinar tu cita?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setChannel('whatsapp')}
                  className={`py-3 px-2 rounded-xl border text-xs sm:text-sm font-medium flex flex-col sm:flex-row items-center justify-center gap-2 transition-all ${
                    channel === 'whatsapp'
                      ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'border-white/10 bg-black/40 text-silver-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  <MessageCircle className={`w-4 h-4 ${channel === 'whatsapp' ? 'text-emerald-400' : ''}`} />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel('email')}
                  className={`py-3 px-2 rounded-xl border text-xs sm:text-sm font-medium flex flex-col sm:flex-row items-center justify-center gap-2 transition-all ${
                    channel === 'email'
                      ? 'border-blue-400 bg-blue-950/40 text-white shadow-[0_0_15px_rgba(96,165,250,0.2)]'
                      : 'border-white/10 bg-black/40 text-silver-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  <Mail className={`w-4 h-4 ${channel === 'email' ? 'text-blue-400' : ''}`} />
                  <span>Correo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel('call')}
                  className={`py-3 px-2 rounded-xl border text-xs sm:text-sm font-medium flex flex-col sm:flex-row items-center justify-center gap-2 transition-all ${
                    channel === 'call'
                      ? 'border-silver-200 bg-white/15 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                      : 'border-white/10 bg-black/40 text-silver-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  <Phone className={`w-4 h-4 ${channel === 'call' ? 'text-white' : ''}`} />
                  <span>Llamada</span>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-silver-300 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre y apellido"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/60"
                  />
                </div>
                <div>
                  <label className="block text-xs text-silver-300 mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+52 779 000 0000"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/60"
                  />
                </div>
              </div>

              {/* Row 2: Email & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-silver-300 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@correo.com"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/60"
                  />
                </div>
                <div>
                  <label className="block text-xs text-silver-300 mb-1">Tipo de Servicio</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-white/60"
                  >
                    <option value="Tatuaje Personalizado">Tatuaje Personalizado (Desde Cero)</option>
                    <option value="Flash Tattoo">Flash Tattoo (Diseño del Catálogo)</option>
                    <option value="Cover-Up / Arreglo">Cover-Up / Cobertura de Tatuaje</option>
                    <option value="Retoque / Detalle">Retoque / Restauración de Tinta</option>
                    <option value="Consulta / Asesoría Previa">Valoración / Asesoría Previa</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Placement & Approximate Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-silver-300 mb-1">Zona del Cuerpo</label>
                  <input
                    type="text"
                    value={formData.bodyZone}
                    onChange={(e) => setFormData({ ...formData, bodyZone: e.target.value })}
                    placeholder="Ej: Antebrazo, Hombro, Espalda, Pierna"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/60"
                  />
                </div>
                <div>
                  <label className="block text-xs text-silver-300 mb-1">Medida Aproximada (cm)</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="Ej: 10 x 15 cm o Manga Completa"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/60"
                  />
                </div>
              </div>

              {/* Row 4: Date Picker */}
              <div>
                <label className="block text-xs text-silver-300 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-silver-400" />
                    <span>Fecha Tentativa Preferida *</span>
                  </span>
                  <span className="text-[10px] text-silver-400 font-light">
                    Selecciona día para consultar disponibilidad
                  </span>
                </label>
                <input
                  type="date"
                  required
                  min={todayDate}
                  value={formData.preferredDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-white/60 [color-scheme:dark]"
                />
              </div>

              {/* Row 5: Hourly Slots Selection (9:00 AM - 6:00 PM) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-silver-300 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-silver-400" />
                    <span>Horario de Cita (de 9:00 AM a 6:00 PM) *</span>
                  </label>
                  {formData.preferredDate && (
                    <span className="text-[10px] text-silver-400 font-light">
                      {BUSINESS_HOURS.filter(h => !isTimeOccupied(h.value)).length} de {BUSINESS_HOURS.length} disponibles
                    </span>
                  )}
                </div>

                {timeWarning && (
                  <p className="text-[11px] text-amber-300 mb-2 bg-amber-950/40 border border-amber-500/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{timeWarning}</span>
                  </p>
                )}

                {!formData.preferredDate ? (
                  <div className="p-3.5 rounded-xl border border-dashed border-white/15 bg-white/[0.02] text-center text-xs text-silver-400 flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4 text-silver-500" />
                    <span>Selecciona primero una fecha para consultar los horarios disponibles.</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {BUSINESS_HOURS.map((hour) => {
                        const occupied = isTimeOccupied(hour.value);
                        const isSelected = formData.preferredTime === hour.value;

                        return (
                          <button
                            key={hour.value}
                            type="button"
                            disabled={occupied}
                            onClick={() => {
                              setTimeWarning('');
                              setFormData({ ...formData, preferredTime: hour.value });
                            }}
                            className={`p-2.5 rounded-xl border text-xs flex flex-col items-center justify-center transition-all ${
                              occupied
                                ? 'border-red-900/30 bg-red-950/20 text-neutral-500 cursor-not-allowed opacity-60'
                                : isSelected
                                  ? 'border-white bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] ring-1 ring-white/60 scale-[1.02]'
                                  : 'border-white/15 bg-black/60 text-silver-200 hover:border-white/40 hover:bg-white/5 hover:text-white'
                            }`}
                            title={occupied ? `El horario de las ${hour.label} ya está ocupado` : `Seleccionar horario ${hour.label}`}
                          >
                            <span className={`font-semibold tracking-wide ${occupied ? 'line-through decoration-red-500/70' : ''}`}>
                              {hour.label}
                            </span>
                            <span className={`text-[9px] mt-0.5 tracking-wider uppercase font-medium ${
                              occupied
                                ? 'text-red-400'
                                : isSelected
                                  ? 'text-black font-semibold'
                                  : 'text-emerald-400'
                            }`}>
                              {occupied ? '✕ No disponible' : isSelected ? '✓ Seleccionado' : 'Disponible'}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {!formData.preferredTime && (
                      <p className="text-[11px] text-silver-400 mt-1 italic">
                        Haz clic en uno de los horarios marcados como <span className="text-emerald-400 font-medium">Disponible</span>.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Description & Reference Idea */}
              <div>
                <label className="block text-xs text-silver-300 mb-1">Describe tu Idea o Proyecto</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalla elementos que deseas, significado, referencias o estilo específico..."
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/60"
                />
              </div>

              {/* Upload Reference Image (Optional) */}
              <div>
                <label className="block text-xs text-silver-300 mb-1">
                  Foto o Referencia (Opcional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 border border-dashed border-white/20 rounded-xl hover:border-white/40 bg-white/[0.02] text-xs text-silver-400 hover:text-white transition-colors">
                    <ImageIcon className="w-4 h-4" />
                    <span>{formData.referenceImage ? 'Cambiar imagen' : 'Seleccionar imagen de referencia'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {formData.referenceImage && (
                    <div className="w-12 h-12 rounded-lg border border-white/20 overflow-hidden flex-shrink-0">
                      <img
                        src={formData.referenceImage}
                        alt="Previsualización"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Channel specific action prompt */}
              <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03] text-xs text-silver-400">
                {channel === 'whatsapp' && (
                  <p className="flex items-center gap-2 text-emerald-400">
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Al hacer clic se registrará la cita y se abrirá WhatsApp con el mensaje estructurado listo para enviar.</span>
                  </p>
                )}
                {channel === 'email' && (
                  <p className="flex items-center gap-2 text-blue-400">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>Se generará un correo formal a {contactInfo.email} con todos los datos organizados.</span>
                  </p>
                )}
                {channel === 'call' && (
                  <p className="flex items-center gap-2 text-silver-200">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>Se registrará tu solicitud de cita y se iniciará la llamada directa al estudio: {contactInfo.callPhone}.</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-3 rounded-xl border border-white/20 text-silver-300 hover:text-white text-xs uppercase tracking-wider font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-white hover:bg-silver-200 text-black text-xs sm:text-sm uppercase tracking-wider font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {channel === 'whatsapp' ? 'Enviar por WhatsApp' : channel === 'email' ? 'Enviar por Correo' : 'Registrar y Llamar'}
                  </span>
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}

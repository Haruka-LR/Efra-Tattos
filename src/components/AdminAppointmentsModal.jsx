import React, { useState } from 'react';
import { 
  X, MessageCircle, Phone, Mail, Trash2, Calendar, 
  Download, Plus, Search, Filter, Settings, Check, Clock, User, CheckCircle
} from 'lucide-react';

export function AdminAppointmentsModal({ 
  isOpen, 
  onClose, 
  appointments, 
  onUpdateStatus, 
  onDeleteAppointment, 
  onAddManualAppointment,
  contactInfo,
  onUpdateContactInfo 
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('citas'); // 'citas' | 'nueva' | 'ajustes'
  const [filterStatus, setFilterStatus] = useState('todas');
  const [search, setSearch] = useState('');

  // Form state for adding manual appointment
  const [manualForm, setManualForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Tatuaje Personalizado',
    style: 'Black & Grey',
    bodyZone: 'Brazo',
    size: '10 x 15 cm',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '16:00',
    notes: '',
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({ ...contactInfo });
  const [savedSettingsAlert, setSavedSettingsAlert] = useState(false);

  // Filtered appointments
  const filteredAppointments = appointments.filter((app) => {
    const matchesStatus = filterStatus === 'todas' || app.status === filterStatus;
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
                          app.phone.includes(search) ||
                          (app.service && app.service.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Direct WhatsApp contact generator
  const handleOpenWhatsAppChat = (app) => {
    const cleanPhone = app.phone.replace(/[^0-9]/g, '');
    const message = `Hola ${app.name}, te saludo desde *Efra Tattos*. 
Te contacto respecto a tu solicitud de cita para tu *${app.service}* programada tentativamente para el día *${app.preferredDate}* a las *${app.preferredTime} hrs*.
¿Podemos confirmar tu asistencia o requieres ajustar el horario? Quedo a tus órdenes.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Cliente', 'Telefono', 'Email', 'Servicio', 'Estilo', 'Zona', 'Medida', 'Fecha', 'Hora', 'Canal', 'Estado', 'Notas'];
    const rows = appointments.map(a => [
      `"${a.id}"`,
      `"${a.name || ''}"`,
      `"${a.phone || ''}"`,
      `"${a.email || ''}"`,
      `"${a.service || ''}"`,
      `"${a.style || ''}"`,
      `"${a.bodyZone || ''}"`,
      `"${a.size || ''}"`,
      `"${a.preferredDate || ''}"`,
      `"${a.preferredTime || ''}"`,
      `"${a.contactMethod || ''}"`,
      `"${a.status || ''}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `citas_efra_tattos_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualForm.name || !manualForm.phone) return;

    const newApp = {
      id: `cita-manual-${Date.now()}`,
      ...manualForm,
      contactMethod: 'manual',
      status: 'confirmada',
      createdAt: new Date().toISOString(),
    };

    onAddManualAppointment(newApp);
    setActiveTab('citas');
    setManualForm({
      name: '',
      phone: '',
      email: '',
      service: 'Tatuaje Personalizado',
      style: 'Black & Grey',
      bodyZone: 'Brazo',
      size: '10 x 15 cm',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '16:00',
      notes: '',
    });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    onUpdateContactInfo(settingsForm);
    setSavedSettingsAlert(true);
    setTimeout(() => setSavedSettingsAlert(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b0b0e] border border-white/20 rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between flex-shrink-0 bg-dark-900/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading text-lg sm:text-xl text-white font-bold tracking-wider">
                PANEL DE GESTIÓN DE CITAS • EFRA TATTOS
              </h2>
              <p className="text-[11px] text-silver-400">
                Administra citas recibidas por WhatsApp, correo y llamadas en tiempo real.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-silver-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Cerrar panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation & Global Actions */}
        <div className="px-4 sm:px-6 py-3 border-b border-white/5 bg-black/50 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('citas')}
              className={`px-4 py-2 rounded-lg text-xs font-heading uppercase tracking-wider transition-all ${
                activeTab === 'citas'
                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'bg-white/5 text-silver-400 hover:text-white border border-white/10'
              }`}
            >
              Lista de Citas ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab('nueva')}
              className={`px-4 py-2 rounded-lg text-xs font-heading uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'nueva'
                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'bg-white/5 text-silver-400 hover:text-white border border-white/10'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Registrar Cita</span>
            </button>
            <button
              onClick={() => setActiveTab('ajustes')}
              className={`px-4 py-2 rounded-lg text-xs font-heading uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'ajustes'
                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'bg-white/5 text-silver-400 hover:text-white border border-white/10'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Configuración</span>
            </button>
          </div>

          {activeTab === 'citas' && (
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-silver-200 hover:text-white text-xs font-sans transition-colors"
              title="Descargar base de datos en formato Excel/CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Excel / CSV</span>
            </button>
          )}
        </div>

        {/* Tab 1: Citas List */}
        {activeTab === 'citas' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filter & Search Bar */}
            <div className="p-4 border-b border-white/5 bg-dark-900/40 flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['todas', 'pendiente', 'confirmada', 'completada', 'cancelada'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider transition-all whitespace-nowrap ${
                      filterStatus === st
                        ? 'bg-silver-200 text-black font-semibold'
                        : 'bg-white/5 text-silver-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64 sm:ml-auto">
                <Search className="w-3.5 h-3.5 text-silver-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por cliente o teléfono..."
                  className="w-full bg-black/50 border border-white/15 rounded-full pl-8 pr-3 py-1 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/50"
                />
              </div>
            </div>

            {/* List / Table */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredAppointments.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-white/10 bg-dark-900/60 hover:border-white/20 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Left Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-heading text-sm text-white font-bold">
                        {app.name}
                      </span>

                      {/* Status Badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
                        app.status === 'confirmada' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30' :
                        app.status === 'completada' ? 'bg-blue-950/80 text-blue-400 border border-blue-500/30' :
                        app.status === 'cancelada' ? 'bg-red-950/80 text-red-400 border border-red-500/30' :
                        'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                      }`}>
                        {app.status}
                      </span>

                      {/* Contact Channel badge */}
                      <span className="text-[10px] text-silver-400 bg-white/5 px-2 py-0.5 rounded">
                        Vía: {app.contactMethod?.toUpperCase() || 'WEB'}
                      </span>
                    </div>

                    <div className="text-xs text-silver-300 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span><strong>Servicio:</strong> {app.service} ({app.style || 'Black & Grey'})</span>
                      <span><strong>Zona:</strong> {app.bodyZone || 'A convenir'} ({app.size || 'Tamaño libre'})</span>
                      <span><strong>Fecha:</strong> {app.preferredDate} ({app.preferredTime} hrs)</span>
                    </div>

                    {app.description && (
                      <p className="text-[11px] text-silver-400 italic">
                        "{app.description}"
                      </p>
                    )}
                    {app.notes && (
                      <p className="text-[11px] text-emerald-400/90">
                        Notas: {app.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex items-center gap-2 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                    {/* Status Changer */}
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app.id, e.target.value)}
                      className="bg-black/60 border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white/50"
                    >
                      <option value="pendiente">🟡 Pendiente</option>
                      <option value="confirmada">🟢 Confirmada</option>
                      <option value="completada">⚪ Completada</option>
                      <option value="cancelada">🔴 Cancelada</option>
                    </select>

                    {/* Quick WhatsApp Contact Button */}
                    <button
                      onClick={() => handleOpenWhatsAppChat(app)}
                      title="Chatear por WhatsApp con este cliente"
                      className="p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-600 border border-emerald-500/30 text-emerald-300 hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>

                    {/* Quick Phone Call Button */}
                    <a
                      href={`tel:${app.phone.replace(/[^0-9+]/g, '')}`}
                      title="Llamar directamente al cliente"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/20 border border-white/10 text-silver-300 hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>

                    {/* Delete appointment button */}
                    <button
                      onClick={() => {
                        if (confirm(`¿Deseas eliminar la cita de ${app.name}?`)) {
                          onDeleteAppointment(app.id);
                        }
                      }}
                      title="Eliminar cita"
                      className="p-2 rounded-lg bg-red-950/40 hover:bg-red-700 border border-red-500/20 text-red-400 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredAppointments.length === 0 && (
                <div className="text-center py-16 text-silver-400">
                  <p className="text-sm">No hay citas registradas en esta vista.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Nueva Cita Manual */}
        {activeTab === 'nueva' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">
            <h3 className="font-heading text-base text-white font-bold mb-4">
              Registrar Nueva Cita en el Estudio
            </h3>
            <form onSubmit={handleManualSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-silver-300 mb-1">Nombre del Cliente *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.name}
                    onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                    placeholder="Ej: Marcos Silva"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-silver-300 mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    placeholder="+52 779 123 4567"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-silver-300 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    placeholder="opcional@correo.com"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-silver-300 mb-1">Tipo de Servicio</label>
                  <select
                    value={manualForm.service}
                    onChange={(e) => setManualForm({ ...manualForm, service: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/50"
                  >
                    <option value="Tatuaje Personalizado">Tatuaje Personalizado</option>
                    <option value="Flash Tattoo">Flash Tattoo</option>
                    <option value="Cover-Up / Arreglo">Cover-Up / Arreglo</option>
                    <option value="Retoque">Retoque</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-silver-300 mb-1">Zona del Cuerpo</label>
                  <input
                    type="text"
                    value={manualForm.bodyZone}
                    onChange={(e) => setManualForm({ ...manualForm, bodyZone: e.target.value })}
                    placeholder="Ej: Antebrazo"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-silver-300 mb-1">Medida Aprox.</label>
                  <input
                    type="text"
                    value={manualForm.size}
                    onChange={(e) => setManualForm({ ...manualForm, size: e.target.value })}
                    placeholder="Ej: 15 x 10 cm"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-silver-300 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={manualForm.preferredDate}
                    onChange={(e) => setManualForm({ ...manualForm, preferredDate: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-silver-300 mb-1">Hora</label>
                  <input
                    type="time"
                    value={manualForm.preferredTime}
                    onChange={(e) => setManualForm({ ...manualForm, preferredTime: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-silver-300 mb-1">Notas Internas (Anticipo, Requerimientos)</label>
                <textarea
                  rows={2}
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  placeholder="Ej: Dejó $500 de anticipo en efectivo..."
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/50"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-silver-200 transition-colors"
                >
                  Guardar Cita en el Sistema
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Ajustes del Estudio */}
        {activeTab === 'ajustes' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-xl mx-auto w-full">
            <h3 className="font-heading text-base text-white font-bold mb-1">
              Datos de Contacto del Estudio
            </h3>
            <p className="text-xs text-silver-400 mb-6">
              Actualiza el número de WhatsApp, teléfono de llamadas, correo y dirección que se muestran a los clientes.
            </p>

            {savedSettingsAlert && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>¡Datos del estudio actualizados con éxito!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-silver-300 mb-1">Número de WhatsApp (con lada)</label>
                <input
                  type="text"
                  required
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  placeholder="+52 779 172 8192"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-silver-300 mb-1">Teléfono para Llamadas</label>
                <input
                  type="text"
                  required
                  value={settingsForm.callPhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, callPhone: e.target.value })}
                  placeholder="+52 779 172 8192"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-silver-300 mb-1">Correo Electrónico para Solicitudes</label>
                <input
                  type="email"
                  required
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  placeholder="contacto@efratattoos.com"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-silver-300 mb-1">Ubicación / Ciudad</label>
                <input
                  type="text"
                  required
                  value={settingsForm.location}
                  onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                  placeholder="Tizayuca, Hgo."
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/50"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-silver-200 transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

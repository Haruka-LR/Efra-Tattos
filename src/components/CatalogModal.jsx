import React, { useState } from 'react';
import { X, Search, Sparkles, Calendar, MessageCircle, Eye } from 'lucide-react';
import { initialTattoos } from '../data/tattoos';

export function CatalogModal({ isOpen, onClose, onSelectTattoo, onBookTattoo, contactInfo }) {
  if (!isOpen) return null;

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Todos', 'Realismo', 'Black & Grey', 'Dark Fantasy', 'Ornamental', 'Letras & Flash'];

  const filtered = initialTattoos.filter((t) => {
    const matchesCategory = selectedCategory === 'Todos' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b0b0e] border border-white/20 rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between flex-shrink-0 bg-dark-900/80">
          <div>
            <div className="flex items-center gap-2 text-silver-400 text-xs uppercase tracking-widest font-heading">
              <span>✦</span>
              <span>Catálogo Exclusivo de Piezas</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl text-white font-bold tracking-wider mt-0.5">
              GALERÍA & ESTILOS DE EFRA TATTOS
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-silver-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Cerrar catálogo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-4 sm:p-6 border-b border-white/5 bg-black/40 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading tracking-wider uppercase transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'bg-white/5 text-silver-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 sm:ml-auto">
            <Search className="w-4 h-4 text-silver-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar estilo, pieza..."
              className="w-full bg-black/50 border border-white/15 rounded-full pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/50"
            />
          </div>

        </div>

        {/* Catalog Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tattoo) => (
            <div
              key={tattoo.id}
              className="group rounded-xl border border-white/10 bg-dark-900/40 hover:border-white/30 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
            >
              <div 
                className="aspect-[4/3] w-full overflow-hidden bg-black/60 relative cursor-pointer"
                onClick={() => onSelectTattoo(tattoo)}
              >
                <img
                  src={tattoo.image}
                  alt={tattoo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider text-silver-300">
                  {tattoo.category}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> Ver Detalles
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-heading text-sm sm:text-base text-white font-bold tracking-wide">
                    {tattoo.title}
                  </h3>
                  <p className="text-[11px] text-silver-400 font-sans mt-0.5">
                    {tattoo.style} • {tattoo.recommendedZone}
                  </p>
                  <p className="text-xs text-silver-300 mt-2 line-clamp-2 font-light">
                    {tattoo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                  <button
                    onClick={() => onSelectTattoo(tattoo)}
                    className="flex-1 py-2 rounded-lg border border-white/15 text-silver-300 hover:text-white hover:border-white/30 text-[11px] uppercase tracking-wider transition-colors"
                  >
                    Detalles
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onBookTattoo(tattoo);
                    }}
                    className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white hover:text-black text-white text-[11px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Agendar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-silver-400">
              <p className="text-sm">No se encontraron piezas con ese criterio de búsqueda.</p>
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-white border-b border-white"
              >
                Ver todas las piezas
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

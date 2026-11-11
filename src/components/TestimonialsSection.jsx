import React, { useState } from 'react';
import { Star, MessageSquarePlus } from 'lucide-react';

export function TestimonialsSection() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Daniel R.',
      avatar: '/assets/avatar_daniel.jpg',
      quote: 'Una experiencia increíble, el estudio se siente muy cómodo y el tatuaje superó mis expectativas.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Valeria M.',
      avatar: '/assets/avatar_valeria.jpg',
      quote: 'Gran trabajo, atención de primera y un resultado brutal. 100% recomendado.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Rodrigo T.',
      avatar: '/assets/avatar_rodrigo.jpg',
      quote: 'El mejor estudio de tatuajes en la zona. Profesionalismo y un estilo único.',
      rating: 5,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', quote: '', rating: 5 });

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.quote) return;
    setReviews([
      ...reviews,
      {
        id: Date.now(),
        name: newReview.name,
        avatar: '/assets/avatar_daniel.jpg',
        quote: newReview.quote,
        rating: Number(newReview.rating) || 5,
      }
    ]);
    setNewReview({ name: '', quote: '', rating: 5 });
    setModalOpen(false);
  };

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Star Divider & Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="divider-ornament max-w-md mx-auto mb-4">
            <span className="text-white/60 text-sm tracking-widest">✦</span>
          </div>
          
          <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl tracking-[0.2em] text-white uppercase font-bold mb-2">
            LO QUE DICEN NUESTROS CLIENTES
          </h2>
        </div>

        {/* 3 Review Cards matching flyer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative p-6 sm:p-7 rounded-xl border border-white/10 bg-dark-900/60 backdrop-blur-sm flex flex-col justify-between hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-white/20 flex-shrink-0 bg-neutral-800">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-full h-full object-cover filter contrast-125"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-cormorant italic text-sm sm:text-base text-silver-300 leading-snug">
                    "{rev.quote}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="font-heading text-xs tracking-wider text-white font-medium">
                  — {rev.name}
                </span>
                <div className="flex text-amber-300/90 text-xs gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} className="text-sm leading-none">★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add review trigger */}
        <div className="text-center">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs text-silver-400 hover:text-white transition-colors tracking-widest uppercase py-2 px-4 rounded-full border border-white/10 hover:border-white/30"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Compartir mi experiencia</span>
          </button>
        </div>

        {/* Modal for adding review */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-dark-900 border border-white/20 rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-4">
              <h3 className="font-heading text-lg text-white font-bold tracking-wider">
                Dejar una Reseña
              </h3>
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div>
                  <label className="block text-silver-300 mb-1">Tu Nombre o Iniciales</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="Ej: Daniel R."
                    className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-silver-300 mb-1">Tu Opinión / Experiencia</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.quote}
                    onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                    placeholder="Cuéntanos cómo fue tu sesión con Efra..."
                    className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-silver-300 mb-1">Calificación (Estrellas)</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/50"
                  >
                    <option value={5}>★★★★★ (5 Estrellas - Excelente)</option>
                    <option value={4}>★★★★☆ (4 Estrellas - Muy Bueno)</option>
                    <option value={3}>★★★☆☆ (3 Estrellas - Bueno)</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-2.5 rounded-lg border border-white/15 text-silver-300 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-silver-200"
                  >
                    Publicar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

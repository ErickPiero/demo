import { useState } from 'react';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import { Star, ThumbsUp } from 'lucide-react';

export const NpsSurvey: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [internalFeedback, setInternalFeedback] = useState('');
  const [hover, setHover] = useState(0);

  const handleRating = (stars: number) => {
    setRating(stars);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (rating === 5) {
      setTimeout(() => {
        alert("Simulación: Redirigiendo a Google Maps para dejar reseña de 5 estrellas...");
      }, 500);
    } else {
      setTimeout(() => {
        alert("Simulación: Alerta urgente enviada por WhatsApp al gerente. 'Cliente inconforme, atención requerida.'");
      }, 500);
    }
  };

  if (submitted) {
    return (
      <Card className="text-center bg-success/10 border-success/30 flex flex-col items-center">
        <ThumbsUp className="text-success mb-3" size={40} />
        <h3 className="text-xl font-bold text-success mb-2">¡Gracias por tu feedback!</h3>
        <p className="text-sm text-gray-300">
          {rating === 5 
            ? "Te estamos redirigiendo a Google Maps para que nos dejes tu comentario y ganes un cupón." 
            : "Lamentamos que tu experiencia no haya sido la mejor. Un gerente se acercará en breve."}
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-bold text-center mb-4">¿Qué tal tu experiencia hoy?</h3>
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button 
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={`transition-transform hover:scale-110 focus:outline-none ${
              (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-600'
            }`}
          >
            <Star size={36} fill={(hover || rating) >= star ? 'currentColor' : 'none'} strokeWidth={1.5} />
          </button>
        ))}
      </div>
      
      {rating > 0 && rating < 5 && (
        <div className="mb-4">
          <textarea 
            placeholder="Cuéntanos qué pasó para mejorar (solo el gerente lo verá)"
            className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            rows={3}
            value={internalFeedback}
            onChange={(e) => setInternalFeedback(e.target.value)}
          />
        </div>
      )}

      {rating > 0 && (
        <Button onClick={handleSubmit} fullWidth variant="primary">
          Enviar Calificación
        </Button>
      )}
    </Card>
  );
};

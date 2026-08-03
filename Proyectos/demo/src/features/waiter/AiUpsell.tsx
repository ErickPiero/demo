import { Card } from '../../shared/Card';
import type { Customer } from '../../core/store';
import { Bot, Sparkles } from 'lucide-react';

interface Props {
  customer: Customer;
}

export const AiUpsell: React.FC<Props> = ({ customer }) => {
  // Simple deterministic AI logic mock based on visits
  const getRecommendation = () => {
    if (customer.visits === 1) {
      return "Sugiérele probar nuestra Jalea Mixta personal para acompañar su ceviche.";
    } else if (customer.tier === 'VIP') {
      return "Cliente VIP: Ofrécele cortesía de Leche de Tigre por su lealtad, y ofrécele una jarra de Chicha Morada helada.";
    } else {
      return "Historial: Favorito Ceviche Mixto. Sugiérele agrandar su porción o pedir un Chilcano clásico.";
    }
  };

  return (
    <Card className="border-secondary/30 bg-secondary/10 mt-6 relative overflow-hidden animate-pulse">
      <Bot className="absolute top-4 right-4 text-secondary/20" size={80} />
      <h3 className="text-xl font-bold text-secondary mb-3 flex items-center gap-2 relative z-10">
        <Sparkles className="text-secondary" size={24} /> Sugerencia IA para Mozo
      </h3>
      <p className="text-gray-200 font-medium relative z-10 text-lg leading-relaxed">
        {getRecommendation()}
      </p>
    </Card>
  );
};

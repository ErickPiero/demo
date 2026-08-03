import React from 'react';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import type { Customer } from '../../core/store';
import { Share2, Users, Gift } from 'lucide-react';

interface Props {
  customer: Customer;
}

export const ReferralProgram: React.FC<Props> = ({ customer }) => {
  const handleShare = () => {
    const text = `¡Hey! Acompáñame a comer a la Cevichería y usa mi código VIP: ${customer.dni} para que nos regalen una ronda de Leche de Tigre a ambos. 🐟🔥`;
    // Simulamos compartir, idealmente abriría whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`
    alert(`Simulación: Abriendo WhatsApp con el texto:\n\n"${text}"`);
  };

  return (
    <Card className="bg-gradient-to-br from-dark-surface to-primary/10 border-primary/20 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-10 -right-10 opacity-10">
        <Users size={120} />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary">
          <Gift className="text-accent" /> Comparte y Gana
        </h3>
        <p className="text-sm text-gray-300 mb-5 leading-relaxed">
          ¿Te gustó tu experiencia? Invita a un amigo usando tu código VIP. Si vienen juntos, 
          <strong className="text-white"> ambos ganan una ronda de Leche de Tigre de cortesía</strong>.
        </p>
        
        <div className="bg-black/40 p-4 rounded-xl flex items-center justify-between mb-5 border border-white/5">
          <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Tu Código</span>
          <span className="font-mono font-bold text-accent tracking-widest text-lg">{customer.dni}</span>
        </div>

        <Button onClick={handleShare} variant="accent" fullWidth className="flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,107,53,0.3)] hover:shadow-[0_0_30px_rgba(255,107,53,0.5)]">
          <Share2 size={18} /> Invitar por WhatsApp
        </Button>
      </div>
    </Card>
  );
};

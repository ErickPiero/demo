import { useState } from 'react';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import { Gift, Sparkles } from 'lucide-react';

const PRIZES = ['10% Dcto Próxima Visita', 'Ceviche de Cortesía', 'Sigue Intentando', 'Chicha Morada Gratis', 'Ronda de Leche de Tigre'];

interface Props {
  onPrizeWon: (prize: string) => void;
}

export const Roulette: React.FC<Props> = ({ onPrizeWon }) => {
  const [spinning, setSpinning] = useState(false);
  const [currentPrize, setCurrentPrize] = useState('Gira para ganar');
  const [won, setWon] = useState(false);

  const spin = () => {
    if (spinning || won) return;
    setSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setCurrentPrize(PRIZES[count % PRIZES.length]);
      count++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalPrize = PRIZES[Math.floor(Math.random() * (PRIZES.length - 1))];
      setCurrentPrize(finalPrize);
      setSpinning(false);
      setWon(true);
      setTimeout(() => onPrizeWon(finalPrize), 2000);
    }, 3000);
  };

  return (
    <Card className="text-center overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 z-0" />
      <div className="relative z-10 flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
          <Gift className="text-accent" /> ¡Ruleta de Cortesías!
        </h3>
        <div 
          className={`w-48 h-48 rounded-full border-[6px] border-primary flex flex-col items-center justify-center p-4 bg-dark shadow-[0_0_40px_rgba(0,119,182,0.6)] mb-6 transition-all duration-100 ${spinning ? 'scale-110 border-accent shadow-[0_0_40px_rgba(255,107,53,0.6)]' : ''}`}
        >
          {won && <Sparkles className="text-yellow-400 mb-2 animate-bounce" />}
          <span className="font-bold text-lg text-center text-white drop-shadow-md leading-tight">
            {currentPrize}
          </span>
        </div>
        <Button onClick={spin} disabled={spinning || won} variant="accent" className="w-full text-lg">
          {spinning ? 'Girando...' : won ? '¡Ganaste!' : 'Girar Ruleta'}
        </Button>
      </div>
    </Card>
  );
};

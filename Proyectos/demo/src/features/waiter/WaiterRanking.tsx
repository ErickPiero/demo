import { useEffect, useState } from 'react';
import { Card } from '../../shared/Card';
import { getWaiters } from '../../core/store';
import type { Waiter } from '../../core/store';
import { Trophy, Medal, Award } from 'lucide-react';

export const WaiterRanking: React.FC = () => {
  const [waiters, setWaiters] = useState<Waiter[]>([]);

  useEffect(() => {
    // Poll or just load once (in a real app this would use websockets or context)
    const load = () => setWaiters(getWaiters());
    load();
    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="text-yellow-400" size={28} />;
    if (index === 1) return <Medal className="text-gray-400" size={26} />;
    return <Award className="text-orange-400" size={24} />;
  }

  return (
    <Card className="bg-gradient-to-br from-dark-surface to-dark">
      <h3 className="text-lg font-bold mb-5 flex items-center gap-3 text-warning">
        <Trophy size={22} /> Ranking de Mozos (En vivo)
      </h3>
      <div className="flex flex-col gap-3">
        {waiters.map((w, index) => (
          <div key={w.id} className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8">
                {getRankIcon(index)}
              </div>
              <span className="font-semibold text-lg">{w.name}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-primary font-black text-xl">{w.scans}</span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">clientes</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

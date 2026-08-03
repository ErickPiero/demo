import { Card } from '../../shared/Card';
import type { Customer } from '../../core/store';

interface Props {
  customer: Customer;
}

export const LoyaltyTier: React.FC<Props> = ({ customer }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'VIP': return 'from-yellow-400 to-yellow-600';
      case 'Silver': return 'from-gray-300 to-gray-500';
      default: return 'from-orange-700 to-orange-900';
    }
  };

  const getNextTierText = (visits: number) => {
    if (visits < 5) return `Faltan ${5 - visits} visitas para Silver`;
    if (visits < 10) return `Faltan ${10 - visits} visitas para VIP`;
    return '¡Eres nivel máximo!';
  };

  return (
    <Card className={`bg-gradient-to-br ${getTierColor(customer.tier)} border-none text-white shadow-xl`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm opacity-80 uppercase tracking-widest font-bold">Nivel Actual</p>
          <h2 className="text-3xl font-black">{customer.tier}</h2>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-80">Visitas</p>
          <p className="text-2xl font-bold">{customer.visits}</p>
        </div>
      </div>
      
      <div className="w-full bg-black/30 rounded-full h-2 mb-2">
        <div 
          className="bg-white h-2 rounded-full" 
          style={{ width: `${Math.min(100, (customer.visits / 10) * 100)}%` }}
        />
      </div>
      <p className="text-xs font-medium opacity-90 text-center">
        {getNextTierText(customer.visits)}
      </p>

      <div className="mt-6 pt-4 border-t border-white/20">
        <h4 className="font-bold text-sm mb-2">Beneficios Activos:</h4>
        <ul className="text-sm opacity-90 list-disc list-inside">
          {customer.tier === 'Bronze' && <li>Acumulación de puntos</li>}
          {customer.tier === 'Silver' && (
            <>
              <li>5% de descuento en caja</li>
              <li>Bebida de cortesía</li>
            </>
          )}
          {customer.tier === 'VIP' && (
            <>
              <li>Reserva prioritaria</li>
              <li>Postre gratis en cada visita</li>
              <li>Atención preferencial</li>
            </>
          )}
        </ul>
      </div>
    </Card>
  );
};

import React from 'react';
import QRCode from 'react-qr-code';
import { Card } from '../../shared/Card';
import type { Customer } from '../../core/store';
import { QrCode } from 'lucide-react';

interface Props {
  customer: Customer;
}

export const CustomerQr: React.FC<Props> = ({ customer }) => {
  return (
    <Card className="flex flex-col items-center text-center bg-gradient-to-b from-dark-surface to-dark">
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-primary">
        <QrCode /> Mi Código VIP
      </h3>
      <p className="text-sm text-gray-300 mb-6">
        Muestra este código al mozo en tu próxima visita para registrarte sin dar tus datos.
      </p>
      <div className="bg-white p-4 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">
        <QRCode value={customer.dni} size={160} />
      </div>
      <p className="mt-4 font-mono font-bold tracking-widest text-lg text-accent">
        {customer.dni}
      </p>
    </Card>
  );
};

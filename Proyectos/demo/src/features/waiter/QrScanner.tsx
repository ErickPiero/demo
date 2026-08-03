import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import { QrCode, X } from 'lucide-react';

interface Props {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

export const QrScanner: React.FC<Props> = ({ onScanSuccess, onClose }) => {
  useEffect(() => {
    // We add a delay to ensure the DOM element exists
    const timer = setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (text) => {
          scanner.clear();
          onScanSuccess(text);
        },
        () => {
          // Ignore frequent scanning errors (e.g. no QR found yet)
        }
      );

      return () => {
        scanner.clear().catch(e => console.error("Failed to clear scanner", e));
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [onScanSuccess]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-dark-surface/90 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
          <QrCode /> Escanear QR
        </h3>
        <p className="text-sm text-gray-300 mb-4">
          Apunta la cámara al código QR personal del cliente o a su DNI físico.
        </p>
        
        {/* Container for html5-qrcode */}
        <div id="qr-reader" className="w-full overflow-hidden rounded-xl border-2 border-primary/30" />
        
        <Button onClick={() => onScanSuccess("76543210")} variant="ghost" className="mt-6 text-xs mx-auto opacity-50">
          (Modo Prueba: Simular Escaneo Exitoso)
        </Button>
      </Card>
    </div>
  );
};

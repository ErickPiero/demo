import { useState } from 'react';
import { Card } from '../../shared/Card';
import { Input } from '../../shared/Input';
import { Button } from '../../shared/Button';
import { getCustomer, addCustomer, addVisit } from '../../core/store';
import type { Customer } from '../../core/store';
import { ScanLine, Search, UserCheck, QrCode, Loader2 } from 'lucide-react';
import { QrScanner } from './QrScanner';

interface Props {
  waiterId: string;
  onCustomerRegistered: (customer: Customer) => void;
}

export const WaiterCaptureForm: React.FC<Props> = ({ waiterId, onCustomerRegistered }) => {
  const [dni, setDni] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [existingCustomer, setExistingCustomer] = useState<Customer | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleDniSearch = (searchDni: string = dni) => {
    if (searchDni.length === 8) {
      setIsSearching(true);
      
      // Simulate network delay for API search
      setTimeout(() => {
        const customer = getCustomer(searchDni);
        if (customer) {
          setExistingCustomer(customer);
          setName(customer.name);
          setBirthday(customer.birthday);
        } else {
          // Mocking RENIEC API response for a new customer
          setExistingCustomer(null);
          const mockNames = ['Carlos Mendoza', 'Lucía Fernández', 'Jorge Silva', 'Andrea Castro'];
          setName(mockNames[Math.floor(Math.random() * mockNames.length)]);
          
          // Generate a random past date for birthday
          const pastDate = new Date();
          pastDate.setFullYear(pastDate.getFullYear() - (18 + Math.floor(Math.random() * 30)));
          pastDate.setMonth(Math.floor(Math.random() * 12));
          setBirthday(pastDate.toISOString().split('T')[0]);
        }
        setIsSearching(false);
      }, 600);
    }
  };

  const handleScanSuccess = (scannedText: string) => {
    setShowScanner(false);
    // Assuming the QR contains just the DNI for this demo
    const cleanDni = scannedText.trim();
    setDni(cleanDni);
    handleDniSearch(cleanDni);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dni || !name || !birthday) return;

    let customer: Customer;
    if (existingCustomer) {
      customer = existingCustomer;
    } else {
      customer = {
        dni,
        name,
        birthday,
        visits: 0,
        tier: 'Bronze',
      };
      addCustomer(customer);
    }
    
    // Log visit
    addVisit(dni, waiterId);
    
    // Pass to parent to show AI upsell / route to customer view
    onCustomerRegistered(getCustomer(dni)!);
    
    setDni('');
    setName('');
    setBirthday('');
    setExistingCustomer(null);
  };

  return (
    <>
      <Card className="max-w-md mx-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <ScanLine className="text-primary" size={28} /> Registrar Visita
        </h2>
        
        <Button 
          type="button" 
          onClick={() => setShowScanner(true)} 
          variant="secondary" 
          className="w-full mb-6 py-4 border border-secondary/50 shadow-[0_0_15px_rgba(0,180,216,0.3)]"
        >
          <QrCode size={22} /> Escanear QR del Cliente
        </Button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">O Ingresar Datos</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2 items-end">
            <Input 
              label="DNI del Cliente" 
              placeholder="Ej. 76543210" 
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              onBlur={() => handleDniSearch(dni)}
              maxLength={8}
            />
            <Button 
              type="button" 
              onClick={() => handleDniSearch(dni)} 
              variant="ghost" 
              className="mb-[2px] px-4 bg-white/5 border-white/10 w-[60px]"
              disabled={isSearching}
            >
              {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            </Button>
          </div>
          
          {existingCustomer && (
            <div className="bg-success/10 border border-success/30 text-success p-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <UserCheck size={18} />
              ¡Cliente encontrado! Nivel actual: {existingCustomer.tier}
            </div>
          )}

          <Input 
            label="Nombre Completo" 
            placeholder="Ej. Julio César" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!!existingCustomer}
          />
          <Input 
            label="Fecha de Cumpleaños" 
            type="date" 
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            disabled={!!existingCustomer}
          />
          <Button type="submit" variant="accent" className="mt-4">
            Completar Registro
          </Button>
        </form>
        
        {/* POS Sync Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 py-2 rounded-lg border border-emerald-400/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Sincronizado con POS (Facturación)
        </div>
      </Card>

      {showScanner && (
        <QrScanner 
          onScanSuccess={handleScanSuccess} 
          onClose={() => setShowScanner(false)} 
        />
      )}
    </>
  );
};

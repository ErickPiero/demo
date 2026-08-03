import { useState } from 'react';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import { getStore } from '../../core/store';
import { Settings, Play, MessageCircle, Users, Activity, Star, ToggleLeft, ToggleRight, Server } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [posSync, setPosSync] = useState(true);

  // Mocked Metrics for the demo
  const metrics = [
    { label: 'Clientes en BD', value: '1,248', icon: <Users size={20} className="text-blue-400" />, trend: '+12% este mes' },
    { label: 'Visitas Hoy', value: '45', icon: <Activity size={20} className="text-green-400" />, trend: 'En tiempo real' },
    { label: 'NPS Promedio', value: '4.8', icon: <Star size={20} className="text-yellow-400" fill="currentColor" />, trend: 'Muy Saludable' }
  ];

  const runBirthdayScript = () => {
    setLogs(prev => [...prev, '[CRON START] Buscando cumpleaños próximos...']);
    const store = getStore();
    
    setTimeout(() => {
      if (store.customers.length === 0) {
        setLogs(prev => [...prev, 'No hay clientes registrados en la BD.']);
        return;
      }
      
      const target = store.customers[0];
      setLogs(prev => [...prev, `[ENCONTRADO] Cumpleaños próximo de: ${target.name} (${target.dni})`]);
      
      setTimeout(() => {
        setLogs(prev => [...prev, `[WHATSAPP API] Enviando promoción a ${target.name}...`]);
        setLogs(prev => [...prev, `📩 WHATSAPP ENVIADO: "¡Hola ${target.name}! Falta 1 semana para tu cumple 🎉. Ven a celebrarlo y te regalamos una Ronda Marítima si vienes acompañado de 4 personas o más. ¡Reserva ahora!"`]);
      }, 1500);

    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold flex items-center gap-2 text-primary">
          <Settings /> Panel de Gerencia
        </h3>
        
        {/* POS Toggle Simulator */}
        <button 
          onClick={() => setPosSync(!posSync)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all border ${posSync ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}
        >
          <Server size={16} />
          {posSync ? 'POS Sincronizado' : 'POS Desconectado'}
          {posSync ? <ToggleRight size={24} className="ml-1" /> : <ToggleLeft size={24} className="ml-1" />}
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <Card key={idx} className="bg-dark-surface/60 border border-white/5 py-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 text-sm font-semibold">{metric.label}</span>
              <div className="p-2 bg-dark/50 rounded-lg">{metric.icon}</div>
            </div>
            <h4 className="text-3xl font-bold text-white mb-1">{metric.value}</h4>
            <span className="text-xs text-primary/80 font-medium">{metric.trend}</span>
          </Card>
        ))}
      </div>

      {/* Automation Console */}
      <Card className="bg-dark-surface/90 border-primary/20">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-semibold text-gray-200 flex items-center gap-2">
            Automatización (CRON Jobs)
          </h4>
          <Button onClick={runBirthdayScript} variant="secondary" className="text-sm py-2">
            <Play size={16} fill="currentColor" /> Ejecutar Script de Cumpleaños
          </Button>
        </div>

        <div className="bg-black/60 p-4 rounded-xl min-h-[160px] border border-white/5 font-mono text-xs md:text-sm text-green-400 flex flex-col gap-2 overflow-y-auto max-h-[300px] custom-scrollbar shadow-inner">
          {logs.length === 0 && <span className="text-gray-600 italic">Esperando ejecución manual de scripts...</span>}
          {logs.map((log, i) => (
            <div key={i} className="flex gap-2 items-start opacity-0 animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="text-gray-500 select-none">{'>'}</span>
              <span className={log.includes('WHATSAPP') ? 'text-emerald-300 font-bold' : ''}>
                {log.includes('WHATSAPP ENVIADO') && <MessageCircle size={14} className="inline mr-1 text-emerald-400" />}
                {log}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

import { useState } from 'react'
import { WaiterCaptureForm } from './features/waiter/WaiterCaptureForm'
import { WaiterRanking } from './features/waiter/WaiterRanking'
import { AiUpsell } from './features/waiter/AiUpsell'
import { Roulette } from './features/gamification/Roulette'
import { LoyaltyTier } from './features/gamification/LoyaltyTier'
import { CustomerQr } from './features/gamification/CustomerQr'
import { ReferralProgram } from './features/gamification/ReferralProgram'
import { NpsSurvey } from './features/reputation/NpsSurvey'
import { AdminDashboard } from './features/admin/AdminDashboard'
import type { Customer } from './core/store'
import { UserCircle, Smartphone, Settings } from 'lucide-react'

type ViewMode = 'WAITER' | 'CUSTOMER' | 'ADMIN'

function App() {
  const [view, setView] = useState<ViewMode>('WAITER')
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null)
  
  // Waiter selected (hardcoded for demo)
  const waiterId = 'w1';

  const handleCustomerRegistered = (customer: Customer) => {
    setActiveCustomer(customer);
  }

  const navigateToCustomer = () => {
    if (activeCustomer) setView('CUSTOMER');
    else alert("Primero registra un cliente en la Vista Mozo");
  }

  return (
    <div className="min-h-screen bg-dark text-light p-4 md:p-8 font-sans selection:bg-primary/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Bar */}
        <nav className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 bg-dark-surface/50 p-2 rounded-2xl backdrop-blur-md border border-white/5 w-max mx-auto shadow-2xl">
          <button 
            onClick={() => setView('WAITER')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${view === 'WAITER' ? 'bg-primary text-white shadow-[0_0_20px_rgba(0,119,182,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <UserCircle size={18} /> Vista Mozo
          </button>
          <button 
            onClick={navigateToCustomer}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${view === 'CUSTOMER' ? 'bg-secondary text-white shadow-[0_0_20px_rgba(0,180,216,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Smartphone size={18} /> Vista Cliente
          </button>
          <button 
            onClick={() => setView('ADMIN')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${view === 'ADMIN' ? 'bg-slate-700 text-white shadow-[0_0_20px_rgba(51,65,85,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Settings size={18} /> Admin / Cocina
          </button>
        </nav>

        {/* Views Rendering */}
        <main className="animate-in fade-in zoom-in-95 duration-300">
          
          {view === 'WAITER' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8">
                <WaiterCaptureForm waiterId={waiterId} onCustomerRegistered={handleCustomerRegistered} />
                {activeCustomer && (
                  <AiUpsell customer={activeCustomer} />
                )}
              </div>
              <div className="md:col-span-4">
                <WaiterRanking />
              </div>
            </div>
          )}

          {view === 'CUSTOMER' && activeCustomer && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col gap-6">
                <CustomerQr customer={activeCustomer} />
                <LoyaltyTier customer={activeCustomer} />
                <ReferralProgram customer={activeCustomer} />
              </div>
              <div className="flex flex-col gap-6">
                <Roulette onPrizeWon={(prize) => console.log('Prize won:', prize)} />
                <NpsSurvey />
              </div>
            </div>
          )}

          {view === 'ADMIN' && (
            <div className="max-w-3xl mx-auto">
              <AdminDashboard />
            </div>
          )}
          
        </main>
      </div>
    </div>
  )
}

export default App

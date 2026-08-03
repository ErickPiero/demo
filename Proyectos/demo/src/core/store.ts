export interface Waiter {
  id: string;
  name: string;
  scans: number;
}

export interface Customer {
  dni: string;
  name: string;
  birthday: string; // YYYY-MM-DD
  visits: number;
  tier: 'Bronze' | 'Silver' | 'VIP';
}

export interface VisitLog {
  id: string;
  customerDni: string;
  waiterId: string;
  timestamp: string;
}

export interface AppState {
  waiters: Waiter[];
  customers: Customer[];
  visitLogs: VisitLog[];
}

const defaultState: AppState = {
  waiters: [
    { id: 'w1', name: 'Julio (Barra)', scans: 145 },
    { id: 'w2', name: 'Carmen (Terraza)', scans: 112 },
    { id: 'w3', name: 'Miguel (Salón)', scans: 89 },
  ],
  customers: [],
  visitLogs: [],
};

export const getStore = (): AppState => {
  const stored = localStorage.getItem('gastronomic_crm');
  if (stored) {
    return JSON.parse(stored);
  }
  return defaultState;
};

export const saveStore = (state: AppState) => {
  localStorage.setItem('gastronomic_crm', JSON.stringify(state));
};

export const addCustomer = (customer: Customer) => {
  const state = getStore();
  const existingIndex = state.customers.findIndex((c) => c.dni === customer.dni);
  if (existingIndex >= 0) {
    state.customers[existingIndex] = customer;
  } else {
    state.customers.push(customer);
  }
  saveStore(state);
};

export const getCustomer = (dni: string): Customer | undefined => {
  return getStore().customers.find((c) => c.dni === dni);
};

export const addVisit = (customerDni: string, waiterId: string) => {
  const state = getStore();
  
  // Update customer
  const customer = state.customers.find((c) => c.dni === customerDni);
  if (customer) {
    customer.visits += 1;
    if (customer.visits >= 10) customer.tier = 'VIP';
    else if (customer.visits >= 5) customer.tier = 'Silver';
    else customer.tier = 'Bronze';
  }

  // Update waiter
  const waiter = state.waiters.find((w) => w.id === waiterId);
  if (waiter) {
    waiter.scans += 1;
  }

  // Log visit
  state.visitLogs.push({
    id: Date.now().toString(),
    customerDni,
    waiterId,
    timestamp: new Date().toISOString(),
  });

  saveStore(state);
};

export const getWaiters = () => {
  return getStore().waiters.sort((a, b) => b.scans - a.scans);
};

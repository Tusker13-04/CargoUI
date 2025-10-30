import { useState } from 'react';
import { LoginModule } from './components/auth/LoginModule';
import { ProductAvailability } from './components/products/ProductAvailability';
import { LotAllocation } from './components/allocation/LotAllocation';
import { TransactionRequest } from './components/transaction/TransactionRequest';
import { PaymentConfirmation } from './components/payment/PaymentConfirmation';
import { InsuranceSelection } from './components/insurance/InsuranceSelection';
import { Dashboard } from './components/dashboard/Dashboard';
import { BookingProvider } from './context/BookingContext';

export type Module = 'login' | 'dashboard' | 'products' | 'allocation' | 'transaction' | 'payment' | 'insurance' | 'success';

export default function App() {
  const [currentModule, setCurrentModule] = useState<Module>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentModule('dashboard');
  };

  const navigateToModule = (module: Module) => {
    setCurrentModule(module);
  };

  if (!isAuthenticated && currentModule === 'login') {
    return <LoginModule onLogin={handleLogin} />;
  }

  return (
    <BookingProvider>
      <div className="min-h-screen bg-gray-50">
        {currentModule === 'dashboard' && (
          <Dashboard onNavigate={navigateToModule} />
        )}
        {currentModule === 'products' && (
          <ProductAvailability onNext={() => navigateToModule('allocation')} onBack={() => navigateToModule('dashboard')} />
        )}
        {currentModule === 'allocation' && (
          <LotAllocation onNext={() => navigateToModule('transaction')} onBack={() => navigateToModule('products')} />
        )}
        {currentModule === 'transaction' && (
          <TransactionRequest onNext={() => navigateToModule('payment')} onBack={() => navigateToModule('allocation')} />
        )}
        {currentModule === 'payment' && (
          <PaymentConfirmation onNext={() => navigateToModule('insurance')} onBack={() => navigateToModule('transaction')} />
        )}
        {currentModule === 'insurance' && (
          <InsuranceSelection onComplete={() => navigateToModule('success')} onSkip={() => navigateToModule('success')} />
        )}
        {currentModule === 'success' && (
          <Dashboard onNavigate={navigateToModule} showSuccess={true} />
        )}
      </div>
    </BookingProvider>
  );
}

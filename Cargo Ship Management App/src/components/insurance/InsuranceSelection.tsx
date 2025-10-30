import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ArrowLeft, Shield, Check, X, HelpCircle, Bell, User } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface InsuranceSelectionProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface InsurancePlan {
  id: string;
  name: string;
  price: number;
  coverage: number;
  coveragePercent: number;
  deductible: number;
  features: { name: string; included: boolean }[];
  popular?: boolean;
}

const insurancePlans: InsurancePlan[] = [
  {
    id: 'basic',
    name: 'BASIC',
    price: 8000,
    coverage: 3500000,
    coveragePercent: 70,
    deductible: 25000,
    features: [
      { name: 'Damage', included: true },
      { name: 'Theft', included: true },
      { name: 'Delays', included: false },
      { name: 'Weather', included: false },
      { name: 'Piracy', included: false }
    ]
  },
  {
    id: 'standard',
    name: 'STANDARD',
    price: 12000,
    coverage: 5000000,
    coveragePercent: 100,
    deductible: 15000,
    features: [
      { name: 'Damage', included: true },
      { name: 'Theft', included: true },
      { name: 'Delays', included: false },
      { name: 'Weather', included: true },
      { name: 'Piracy', included: false }
    ]
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 18000,
    coverage: 5000000,
    coveragePercent: 100,
    deductible: 5000,
    popular: true,
    features: [
      { name: 'Damage', included: true },
      { name: 'Theft', included: true },
      { name: 'Delays', included: true },
      { name: 'Weather', included: true },
      { name: 'Piracy', included: true }
    ]
  }
];

export function InsuranceSelection({ onComplete, onSkip }: InsuranceSelectionProps) {
  const { bookingData, updateBooking } = useBooking();
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(insurancePlans[2]); // Default to Premium

  const cargoValue = bookingData.cargoDetails?.value || 5000000;

  const handleSelectPlan = (plan: InsurancePlan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      updateBooking({
        insurance: {
          plan: selectedPlan.name,
          premium: selectedPlan.price,
          coverage: selectedPlan.coverage
        }
      });
    }
    onComplete();
  };

  const handleSkip = () => {
    onSkip();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <h1 className="text-gray-900">PROTECT YOUR CARGO</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <HelpCircle className="w-5 h-5" />
                <span>Need Help?</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-gray-900 mb-2">🛡️ Secure Your Shipment with Insurance</h2>
          
          <div className="max-w-2xl mx-auto space-y-2 text-gray-600">
            <p>Your Cargo: <span className="text-gray-900">{bookingData.cargoDetails?.type || 'Electronics'}</span> | 
              Declared Value: <span className="text-gray-900">₹{cargoValue.toLocaleString('en-IN')}</span>
            </p>
            <p>Route: <span className="text-gray-900">{bookingData.product?.route || 'Mumbai → Singapore'}</span> | 
              Transit: <span className="text-gray-900">{bookingData.product?.transitTime || '7 days'}</span>
            </p>
          </div>

          <div className="mt-4 inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
            <p className="text-sm text-yellow-800">💡 95% of high-value cargo shippers choose insurance</p>
          </div>
        </div>

        {/* Insurance Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {insurancePlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative cursor-pointer transition-all hover:shadow-xl ${
                selectedPlan?.id === plan.id ? 'ring-2 ring-blue-600 shadow-lg' : ''
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-xs">
                    ⭐ MOST POPULAR
                  </div>
                </div>
              )}
              
              <CardContent className="p-6">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl text-gray-900">₹{plan.price.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-sm text-gray-600">One-time Premium</p>
                </div>

                {/* Coverage */}
                <div className="border-t border-b py-4 mb-4">
                  <p className="text-center text-gray-900 mb-1">COVERAGE</p>
                  <p className="text-center text-gray-900">{plan.coveragePercent}%</p>
                  <p className="text-center text-sm text-gray-600">
                    Up to ₹{(plan.coverage / 100000).toFixed(0)}L
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Deductible */}
                <div className="mb-6 text-center text-sm text-gray-600">
                  Deductible: <span className="text-gray-900">₹{plan.deductible.toLocaleString('en-IN')}</span>
                </div>

                {/* Select Button */}
                <Button 
                  className="w-full"
                  variant={selectedPlan?.id === plan.id ? 'default' : 'outline'}
                >
                  {selectedPlan?.id === plan.id ? 'Selected ✓' : 'Select'}
                </Button>

                <Button 
                  variant="link" 
                  className="w-full mt-2 text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Compare Plans */}
        <div className="text-center mb-8">
          <Button variant="link" className="text-blue-600">
            Compare All Plans →
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-gray-900 mb-3">📋 How to File a Claim</h3>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Report incident within 24 hours</li>
                <li>Submit required documents</li>
                <li>Receive payout within 7 business days</li>
              </ol>
              <Button variant="link" className="p-0 h-auto text-blue-600 mt-3">
                Learn More →
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-gray-900 mb-3">❓ Common Questions</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• What does the deductible mean?</p>
                <p>• Can I upgrade my plan later?</p>
                <p>• How long until I receive my payout?</p>
              </div>
              <Button variant="link" className="p-0 h-auto text-blue-600 mt-3">
                View FAQ →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="text-center sm:text-left">
                  {selectedPlan ? (
                    <>
                      <p className="text-gray-900">Selected: {selectedPlan.name} Protection</p>
                      <p className="text-sm text-gray-600">Premium: ₹{selectedPlan.price.toLocaleString('en-IN')} | Coverage: ₹{(selectedPlan.coverage / 100000).toFixed(0)}L</p>
                    </>
                  ) : (
                    <p className="text-gray-600">No insurance selected</p>
                  )}
                </div>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={handleSkip}
                  >
                    Continue Without Insurance
                  </Button>
                  <Button 
                    onClick={handleContinue}
                    disabled={!selectedPlan}
                  >
                    Confirm & Complete Booking →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning */}
          {!selectedPlan && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ Proceeding without insurance means you're responsible for any loss or damage during transit. We strongly recommend protecting your ₹{(cargoValue / 100000).toFixed(0)}L shipment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

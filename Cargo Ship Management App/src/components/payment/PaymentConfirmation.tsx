import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { ArrowLeft, CreditCard, Smartphone, Building2, Wallet, Lock, Shield, CheckCircle2, Loader2, HelpCircle } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface PaymentConfirmationProps {
  onNext: () => void;
  onBack: () => void;
}

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';
type PaymentStatus = 'idle' | 'processing' | 'success';

export function PaymentConfirmation({ onNext, onBack }: PaymentConfirmationProps) {
  const { bookingData, updateBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [saveCard, setSaveCard] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(585); // 9:45 in seconds

  const [cardDetails, setCardDetails] = useState({
    name: 'RAJESH KUMAR',
    number: '4532 1234 5678 9010',
    expiry: '12 / 26',
    cvv: ''
  });

  const subtotal = 55000;
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handlePayment = () => {
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      updateBooking({ 
        paymentMethod: 'Visa ending in 9010',
        transactionId: 'TXN20251130120847'
      });
      
      // After 2 seconds, move to insurance
      setTimeout(() => {
        onNext();
      }, 2000);
    }, 3000);
  };

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (paymentStatus === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-12 text-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
            <h2 className="text-gray-900 mb-4">Processing Your Payment...</h2>
            <p className="text-gray-600 mb-6">Please do not close this window or press back</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-gray-600">Verifying payment with your bank...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-gray-900 mb-4">Payment Successful! ✅</h2>
            </div>

            <div className="space-y-2 text-sm mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="text-gray-900">TXN20251130120847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="text-gray-900">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="text-gray-900">Visa ending in 9010</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-900">Nov 30, 2025, 12:08 PM IST</span>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="text-green-900 mb-2">BOOKING CONFIRMED! 🎉</h3>
                <div className="space-y-1 text-sm text-green-800">
                  <p>Booking Ref: MUMB-SING-1105-47</p>
                  <p>Vessel: {bookingData.product?.vessel || 'MV Ocean Pioneer'}</p>
                  <p>Departure: {bookingData.product?.departure || 'Dec 5, 2025'}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>📧 Confirmation email sent to {bookingData.shipper?.email}</p>
                <p>📱 SMS sent to {bookingData.shipper?.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button variant="outline">📄 Download Invoice</Button>
              <Button variant="outline">📥 Download Receipt</Button>
              <Button variant="outline">📱 Track Shipment</Button>
              <Button variant="outline">🏠 Go to Dashboard</Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-900 mb-3">Need Insurance? Protect your cargo from damage and loss</p>
              <Button onClick={onNext} className="w-full">
                Protect Your Cargo →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-gray-600" />
              <h1 className="text-gray-900">Secure Payment</h1>
              <span className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>PCI Compliant</span>
              </span>
            </div>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <HelpCircle className="w-5 h-5" />
              <span>Need Help?</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Booking</span>
        </button>

        <Card>
          <CardContent className="p-8">
            <div className="mb-6">
              <h2 className="text-gray-900 mb-2">Complete Your Payment</h2>
              <p className="text-gray-600">Booking Ref: MUMB-SING-1105-47</p>
            </div>

            {/* Timer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 flex items-center space-x-2">
              <span className="text-yellow-800">⏱️ Complete payment within {formatTime(timeRemaining)} minutes</span>
            </div>

            {/* Payment Summary */}
            <Card className="bg-gray-50 mb-6">
              <CardContent className="p-4">
                <h3 className="text-gray-900 mb-3">PAYMENT SUMMARY</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Amount:</span>
                    <span className="text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%):</span>
                    <span className="text-gray-900">₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t-2 border-gray-900 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-900">TOTAL AMOUNT:</span>
                      <span className="text-2xl text-gray-900">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button variant="link" className="p-0 h-auto text-blue-600 mb-6">
              View Detailed Bill ▾
            </Button>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">SELECT PAYMENT METHOD</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <Button
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className="h-16"
                >
                  <div className="flex flex-col items-center">
                    <CreditCard className="w-5 h-5 mb-1" />
                    <span className="text-xs">Credit/Debit Card</span>
                  </div>
                </Button>
                <Button
                  variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('upi')}
                  className="h-16"
                >
                  <div className="flex flex-col items-center">
                    <Smartphone className="w-5 h-5 mb-1" />
                    <span className="text-xs">UPI</span>
                  </div>
                </Button>
                <Button
                  variant={paymentMethod === 'netbanking' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('netbanking')}
                  className="h-16"
                >
                  <div className="flex flex-col items-center">
                    <Building2 className="w-5 h-5 mb-1" />
                    <span className="text-xs">Net Banking</span>
                  </div>
                </Button>
                <Button
                  variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('wallet')}
                  className="h-16"
                >
                  <div className="flex flex-col items-center">
                    <Wallet className="w-5 h-5 mb-1" />
                    <span className="text-xs">Wallet</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Card Details Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative mt-1">
                    <Input
                      id="cardNumber"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      className="pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">VISA 💳</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                    <Input
                      id="expiry"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative mt-1">
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="•••"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        maxLength={3}
                        className="pr-8"
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ?
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="saveCard"
                      checked={saveCard}
                      onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                    />
                    <label htmlFor="saveCard" className="text-sm cursor-pointer">
                      Save this card for future payments
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm text-blue-900">
              🔒 Your payment is secured with 256-bit encryption
            </div>

            {/* Pay Button */}
            <Button 
              size="lg" 
              className="w-full h-14 mb-4"
              onClick={handlePayment}
            >
              PAY ₹{total.toLocaleString('en-IN')} →
            </Button>

            <p className="text-xs text-center text-gray-600">
              By clicking Pay, you agree to our{' '}
              <button type="button" className="text-blue-600 hover:underline">Terms of Service</button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

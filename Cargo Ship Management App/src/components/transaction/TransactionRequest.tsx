import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { ArrowLeft, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { useBooking, ShipperData } from '../../context/BookingContext';

interface TransactionRequestProps {
  onNext: () => void;
  onBack: () => void;
}

export function TransactionRequest({ onNext, onBack }: TransactionRequestProps) {
  const { bookingData, updateBooking } = useBooking();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrice, setAgreePrice] = useState(false);
  const [specialRequirements, setSpecialRequirements] = useState('Handle with care - fragile electronics');
  const [submitted, setSubmitted] = useState(false);

  const [shipper] = useState<ShipperData>({
    company: 'ABC Electronics Pvt Ltd',
    contact: 'Rajesh Kumar',
    email: 'rajesh@abcelectronics.com',
    phone: '+91-9876543210',
    gst: '27AABCU9603R1ZX'
  });

  const [consignee] = useState<ShipperData>({
    company: 'XYZ Singapore Pte Ltd',
    contact: 'Li Wei',
    email: 'li.wei@xyzsg.com',
    phone: '+65-91234567',
    gst: ''
  });

  const documents = [
    'Commercial Invoice (invoice_2025.pdf)',
    'Packing List (packing_list.pdf)',
    'Certificate of Origin (coo.pdf)'
  ];

  const handleSubmit = () => {
    if (!agreeTerms || !agreePrice) return;

    updateBooking({ 
      shipper, 
      consignee, 
      specialRequirements,
      documents,
      transactionId: 'TXN2025110047'
    });
    setSubmitted(true);
  };

  const handleContinue = () => {
    onNext();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Request Submitted Successfully!</h2>
            <div className="space-y-2 text-gray-600 mb-6">
              <p>Booking Reference: <span className="text-gray-900">MUMB-SING-1105-47</span></p>
              <p>Request ID: <span className="text-gray-900">TXN2025110047</span></p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-600 border-t-transparent"></div>
                <p className="text-yellow-600">Status: Under Review</p>
              </div>
              <p className="text-sm">Estimated Approval: Within 2 hours</p>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              📧 Confirmation email sent to {shipper.email}
            </p>
            <div className="flex space-x-3 justify-center">
              <Button variant="outline">Track Request</Button>
              <Button variant="outline">View Details</Button>
              <Button onClick={handleContinue}>Continue to Payment →</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const subtotal = 55000;
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mr-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Lot Allocation</span>
            </button>
            <h1 className="text-gray-900">TRANSACTION REQUEST</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-gray-900 mb-6">📋 Confirm Your Booking Request</h2>

            {/* Progress */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">●</div>
                <span className="ml-2 text-sm">Details</span>
              </div>
              <div className="w-16 h-0.5 bg-blue-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">●</div>
                <span className="ml-2 text-sm">Shipper</span>
              </div>
              <div className="w-16 h-0.5 bg-blue-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">●</div>
                <span className="ml-2 text-sm">Review</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center">○</div>
                <span className="ml-2 text-sm text-gray-500">Submit</span>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">BOOKING SUMMARY</h3>
              <Card className="bg-gray-50">
                <CardContent className="p-4 space-y-2 text-sm">
                  <p><span className="text-gray-600">Route:</span> {bookingData.product?.route || 'Mumbai → Singapore'}</p>
                  <p><span className="text-gray-600">Vessel:</span> {bookingData.product?.vessel || 'MV Ocean Pioneer'}</p>
                  <p><span className="text-gray-600">Departure:</span> {bookingData.product?.departure || 'Dec 5, 2025'} | <span className="text-gray-600">Arrival:</span> Dec 12, 2025</p>
                  <div className="border-t pt-2 mt-2">
                    <p><span className="text-gray-600">Container:</span> {bookingData.product?.containerType || '20ft Standard'} (Qty: 1)</p>
                    <p><span className="text-gray-600">Lot Position:</span> {bookingData.lot?.position || 'A-03 (Front Deck, Port Side)'}</p>
                    <p><span className="text-gray-600">Cargo:</span> {bookingData.cargoDetails?.type || 'Electronics'} | Weight: {bookingData.cargoDetails?.weight || '12,500 kg'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shipper Details */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">SHIPPER DETAILS</h3>
              <Card className="bg-gray-50">
                <CardContent className="p-4 space-y-1 text-sm">
                  <p><span className="text-gray-600">Company:</span> {shipper.company}</p>
                  <p><span className="text-gray-600">Contact:</span> {shipper.contact} | {shipper.phone}</p>
                  <p><span className="text-gray-600">Email:</span> {shipper.email}</p>
                  <p><span className="text-gray-600">GST:</span> {shipper.gst}</p>
                  <Button variant="link" className="p-0 h-auto text-blue-600">Edit Details</Button>
                </CardContent>
              </Card>
            </div>

            {/* Consignee Details */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">CONSIGNEE DETAILS</h3>
              <Card className="bg-gray-50">
                <CardContent className="p-4 space-y-1 text-sm">
                  <p><span className="text-gray-600">Company:</span> {consignee.company}</p>
                  <p><span className="text-gray-600">Contact:</span> {consignee.contact} | {consignee.phone}</p>
                  <p><span className="text-gray-600">Email:</span> {consignee.email}</p>
                  <Button variant="link" className="p-0 h-auto text-blue-600">Edit Details</Button>
                </CardContent>
              </Card>
            </div>

            {/* Documents */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">DOCUMENTS UPLOADED</h3>
              <div className="space-y-2">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
              <Button variant="link" className="p-0 h-auto text-blue-600 mt-2">
                <Upload className="w-4 h-4 mr-1" />
                Add More Documents
              </Button>
            </div>

            {/* Special Requirements */}
            <div className="mb-6">
              <Label htmlFor="requirements">SPECIAL REQUIREMENTS (Optional)</Label>
              <Textarea
                id="requirements"
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder="Enter any special handling instructions..."
                className="mt-2 h-24"
                maxLength={250}
              />
              <p className="text-sm text-gray-500 mt-1">250 characters max</p>
            </div>

            {/* Cost Estimate */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">COST ESTIMATE</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Freight Charge:</span>
                  <span className="text-gray-900">₹45,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Port Charges:</span>
                  <span className="text-gray-900">₹8,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Documentation:</span>
                  <span className="text-gray-900">₹2,000</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%):</span>
                    <span className="text-gray-900">₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="border-t-2 border-gray-900 pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-900">TOTAL:</span>
                    <span className="text-gray-900">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic">(Final price confirmed after approval)</p>
              </div>
            </div>

            {/* Agreement Checkboxes */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  I agree to Terms & Conditions{' '}
                  <button type="button" className="text-blue-600 hover:underline">View Terms</button>
                </label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="price" 
                  checked={agreePrice}
                  onCheckedChange={(checked) => setAgreePrice(checked as boolean)}
                />
                <label htmlFor="price" className="text-sm text-gray-700 cursor-pointer">
                  I authorize the price quoted above
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                ← Previous
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!agreeTerms || !agreePrice}
                className="flex-1"
              >
                Submit Request →
              </Button>
            </div>

            {/* Info */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                💡 What happens next? Your request will be reviewed and confirmed within 2 hours.{' '}
                <button type="button" className="text-blue-600 hover:underline">Learn More</button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

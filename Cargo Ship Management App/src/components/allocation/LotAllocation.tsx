import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Ship, ArrowLeft, Bell, User, HelpCircle } from 'lucide-react';
import { useBooking, LotData } from '../../context/BookingContext';

interface LotAllocationProps {
  onNext: () => void;
  onBack: () => void;
}

const mockLots: LotData[] = [
  {
    id: 'A-03',
    position: 'A-03 (Front, Port)',
    deck: 'Front Deck',
    dimensions: '6m × 3m × 2.5m',
    weightCapacity: '30,000 kg',
    features: ['Easy Access', 'Corner Position', 'Standard Temperature']
  },
  {
    id: 'B-05',
    position: 'B-05 (Middle, Starboard)',
    deck: 'Middle Deck',
    dimensions: '6m × 3m × 2.5m',
    weightCapacity: '30,000 kg',
    features: ['Climate Control', 'Side Door Access']
  }
];

type LotStatus = 'available' | 'selected' | 'occupied' | 'unavailable';

interface LotCell {
  id: string;
  status: LotStatus;
}

const generateLotGrid = (): LotCell[][] => {
  const rows = ['A', 'B', 'C', 'D'];
  const cols = 7;
  
  return rows.map((row) => 
    Array.from({ length: cols }, (_, i) => {
      const id = `${row}${i + 1}`;
      // Set some lots as occupied or unavailable randomly
      let status: LotStatus = 'available';
      const rand = Math.random();
      if (rand < 0.4) status = 'occupied';
      else if (rand < 0.5) status = 'unavailable';
      
      return { id, status };
    })
  );
};

export function LotAllocation({ onNext, onBack }: LotAllocationProps) {
  const { bookingData, updateBooking } = useBooking();
  const [selectionMode, setSelectionMode] = useState<'auto' | 'manual'>('auto');
  const [selectedLot, setSelectedLot] = useState<LotData>(mockLots[0]);
  const [lotGrid, setLotGrid] = useState<LotCell[][]>(generateLotGrid());

  const handleLotClick = (rowIndex: number, colIndex: number) => {
    if (selectionMode !== 'manual') return;
    
    const lot = lotGrid[rowIndex][colIndex];
    if (lot.status !== 'available') return;

    // Update grid
    const newGrid = lotGrid.map((row, rIdx) =>
      row.map((cell, cIdx) => ({
        ...cell,
        status: (rIdx === rowIndex && cIdx === colIndex ? 'selected' : 
                cell.status === 'selected' ? 'available' : cell.status) as LotStatus
      }))
    );
    setLotGrid(newGrid);

    // Update selected lot
    const lotId = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
    const selectedLotData = mockLots.find(l => l.id === lotId) || mockLots[0];
    setSelectedLot(selectedLotData);
  };

  const handleConfirm = () => {
    updateBooking({ lot: selectedLot });
    onNext();
  };

  const getLotColor = (status: LotStatus) => {
    switch (status) {
      case 'available': return 'bg-green-500 hover:bg-green-600';
      case 'selected': return 'bg-blue-600';
      case 'occupied': return 'bg-red-500';
      case 'unavailable': return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <button 
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Products</span>
              </button>
              <h1 className="text-gray-900">LOT ALLOCATION</h1>
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
        {/* Cargo Info */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  Your Cargo: <span className="text-gray-900">20ft Standard | 5m × 2m × 2m | 12,500 kg</span>
                </p>
                <p className="text-sm text-gray-600">
                  Vessel: <span className="text-gray-900">{bookingData.product?.vessel || 'MV Ocean Pioneer'}</span> | 
                  Departure: <span className="text-gray-900">{bookingData.product?.departure || 'Dec 5, 2025'}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selection Mode */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <span className="text-gray-700">Selection Mode:</span>
              <RadioGroup 
                value={selectionMode} 
                onValueChange={(value) => setSelectionMode(value as 'auto' | 'manual')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="auto" id="auto" />
                  <Label htmlFor="auto" className="cursor-pointer">Auto-Allocate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manual" id="manual" />
                  <Label htmlFor="manual" className="cursor-pointer">Choose Position</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Legend & Recommended */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-4">AVAILABLE LOTS</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Available (45)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span>Your Selection (1)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Occupied (120)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <span>Unavailable (14)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-4">RECOMMENDED</h3>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-gray-900">✓ Lot A-03</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Front Deck</p>
                    <p className="text-sm text-gray-600 mb-1">Easy Access</p>
                    <p className="text-sm text-gray-600 mb-3">Corner Position</p>
                    <Button size="sm" className="w-full">
                      Selected ✓
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-3">
                  <CardContent className="p-4">
                    <h4 className="text-gray-900 mb-2">Lot B-05</h4>
                    <p className="text-sm text-gray-600 mb-1">Middle Deck</p>
                    <p className="text-sm text-gray-600 mb-3">Climate Ctrl 🌡️</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Select
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Main Area - Bay Visualization */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-4">CARGO BAY VISUALIZATION</h3>

                {/* Bay Diagram */}
                <div className="bg-gray-100 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">[BOW] Front Deck</p>
                  </div>

                  <div className="space-y-4">
                    {lotGrid.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex justify-center space-x-2">
                        {row.map((lot, colIndex) => (
                          <button
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleLotClick(rowIndex, colIndex)}
                            disabled={lot.status === 'occupied' || lot.status === 'unavailable' || selectionMode === 'auto'}
                            className={`w-12 h-12 rounded flex items-center justify-center text-xs text-white transition-colors ${getLotColor(lot.status)} ${
                              (lot.status === 'occupied' || lot.status === 'unavailable' || selectionMode === 'auto') ? 'cursor-not-allowed' : 'cursor-pointer'
                            }`}
                          >
                            {lot.id}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">[STERN] Rear Deck</p>
                  </div>
                </div>

                {/* Selected Lot Details */}
                <div className="mt-6 border-t pt-6">
                  <h4 className="text-gray-900 mb-4">SELECTED LOT DETAILS</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">📍 Position: {selectedLot.position}</p>
                      <p className="text-gray-600 mb-1">📏 Dimensions: {selectedLot.dimensions}</p>
                      <p className="text-gray-600 mb-1">⚖️ Weight Capacity: {selectedLot.weightCapacity}</p>
                    </div>
                    <div>
                      {selectedLot.features.map((feature, idx) => (
                        <p key={idx} className="text-gray-600 mb-1">✓ {feature}</p>
                      ))}
                      <p className="text-yellow-600 mt-2">⚠️ Note: Adjacent to heavy cargo</p>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <Button variant="outline" className="flex-1">
                      Change Selection
                    </Button>
                    <Button className="flex-1" onClick={handleConfirm}>
                      Confirm →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

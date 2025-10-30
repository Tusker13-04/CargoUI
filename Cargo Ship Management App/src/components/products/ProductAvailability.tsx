import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Ship, ArrowLeft, MapPin, Calendar, Package, Zap, RefreshCw, Bell, User, Search } from 'lucide-react';
import { useBooking, ProductData } from '../../context/BookingContext';

interface ProductAvailabilityProps {
  onNext: () => void;
  onBack: () => void;
}

const mockProducts: ProductData[] = [
  {
    id: '1',
    name: 'MV Ocean Pioneer',
    vessel: 'MV Ocean Pioneer',
    departure: 'Dec 5, 2025',
    arrival: 'Dec 12, 2025',
    route: 'Mumbai → Singapore',
    transitTime: '7 days',
    containerType: '20ft Standard Container',
    capacity: '30 m³ | 28,000 kg',
    available: 5,
    price: 45000
  },
  {
    id: '2',
    name: 'MV Cargo Express',
    vessel: 'MV Cargo Express',
    departure: 'Dec 7, 2025',
    arrival: 'Dec 13, 2025',
    route: 'Mumbai → Singapore',
    transitTime: '6 days',
    containerType: '20ft Standard Container',
    capacity: '30 m³ | 28,000 kg',
    available: 12,
    price: 52000
  }
];

export function ProductAvailability({ onNext, onBack }: ProductAvailabilityProps) {
  const { updateBooking } = useBooking();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [filters, setFilters] = useState({
    standard: true,
    refrigerated: false,
    highCube: false
  });

  const handleProductSelect = (product: ProductData) => {
    setSelectedProduct(product);
    updateBooking({ 
      product,
      cargoDetails: {
        type: 'Electronics',
        weight: '12,500 kg',
        value: 5000000
      }
    });
  };

  const handleBookNow = () => {
    if (selectedProduct) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Ship className="w-8 h-8 text-blue-600" />
              <h1 className="text-gray-900">Cargo Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="w-5 h-5" />
              </button>
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900">
                <User className="w-5 h-5" />
                <span>John Doe</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900">Find Available Cargo Spaces</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label>From</Label>
              <Select defaultValue="mumbai">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>To</Label>
              <Select defaultValue="singapore">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  <SelectItem value="dubai">Dubai</SelectItem>
                  <SelectItem value="hongkong">Hong Kong</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Date</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="text" placeholder="Dec 5" className="pl-10" />
              </div>
            </div>

            <div>
              <Label>Container</Label>
              <Select defaultValue="20ft">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20ft">20ft</SelectItem>
                  <SelectItem value="40ft">40ft</SelectItem>
                  <SelectItem value="40ft-hc">40ft High Cube</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1">
              Search Available Spaces →
            </Button>
            <Button variant="outline">
              Save Search
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-4">FILTERS</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700 mb-2">Container Type</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="standard" 
                          checked={filters.standard}
                          onCheckedChange={(checked) => setFilters({...filters, standard: checked as boolean})}
                        />
                        <label htmlFor="standard" className="text-sm cursor-pointer">Standard</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="refrigerated"
                          checked={filters.refrigerated}
                          onCheckedChange={(checked) => setFilters({...filters, refrigerated: checked as boolean})}
                        />
                        <label htmlFor="refrigerated" className="text-sm cursor-pointer">Refrigerated</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="highcube"
                          checked={filters.highCube}
                          onCheckedChange={(checked) => setFilters({...filters, highCube: checked as boolean})}
                        />
                        <label htmlFor="highcube" className="text-sm cursor-pointer">High Cube</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 mb-2">Price Range</p>
                    <div className="text-sm text-gray-600">₹0 — ₹100,000</div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 mb-2">Departure</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="thisweek" name="departure" />
                        <label htmlFor="thisweek" className="text-sm cursor-pointer">This Week</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="nextweek" name="departure" defaultChecked />
                        <label htmlFor="nextweek" className="text-sm cursor-pointer">Next Week</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="custom" name="departure" />
                        <label htmlFor="custom" className="text-sm cursor-pointer">Custom</label>
                      </div>
                    </div>
                  </div>

                  <Button variant="link" className="p-0 h-auto text-blue-600">
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-900">47 Available Spaces</span>
                <span className="text-sm text-gray-500">Last updated: 2 min ago</span>
                <button className="text-blue-600 hover:text-blue-700">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <Select defaultValue="price-low">
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="date">Departure Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {mockProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    selectedProduct?.id === product.id ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => handleProductSelect(product)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <Ship className="w-5 h-5 text-blue-600" />
                          <h3 className="text-gray-900">{product.vessel}</h3>
                          {product.id === '2' && (
                            <span className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                              <Zap className="w-3 h-3" />
                              <span>FASTEST</span>
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-gray-600">Departure: {product.departure}</p>
                            <p className="text-gray-600">Route: {product.route}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Transit Time: {product.transitTime}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                          <Package className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-900">{product.containerType}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Capacity: {product.capacity}</p>
                        <p className="text-sm">
                          Status: <span className="text-green-600">🟢 {product.available} spaces available</span>
                        </p>
                      </div>

                      <div className="text-right ml-6">
                        <p className="text-2xl text-gray-900 mb-4">₹{product.price.toLocaleString('en-IN')}</p>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            View Details
                          </Button>
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductSelect(product);
                            }}
                          >
                            {selectedProduct?.id === product.id ? 'Selected ✓' : 'Select'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedProduct && (
              <div className="mt-6 flex justify-end">
                <Button size="lg" onClick={handleBookNow}>
                  Continue to Lot Allocation →
                </Button>
              </div>
            )}

            <div className="text-center mt-6">
              <Button variant="link">Load More Results...</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Ship, ArrowLeft, MapPin, Calendar, Package, Zap, RefreshCw, Bell, User, Search, AlertTriangle } from 'lucide-react';
import { useBooking, ProductData } from '../../context/BookingContext';

interface ProductAvailabilityProps {
  onNext: () => void;
  onBack: () => void;
}

// VIOLATION H6: Complex IDs without context
const mockProducts: ProductData[] = [
  {
    id: 'PRD_0xA4F2',
    name: 'VESSEL_CONTAINER_SLOT_47291',
    vessel: 'IMO_9847562_MV_OCN_PIONEER',
    departure: '2025-12-05T14:30:00Z',
    arrival: '2025-12-12T08:45:00Z', 
    route: 'PORT_MUMBAI_IN → PORT_SINGAPORE_SG',
    transitTime: '168.25 hours',
    containerType: 'ISO_6346_20GP_STANDARD',
    capacity: '33.2 m³ | 28,230 kg',
    available: 5,
    price: 45000
  },
  {
    id: 'PRD_0xB7E9',
    name: 'VESSEL_CONTAINER_SLOT_38204',
    vessel: 'IMO_9673821_MV_CARGO_EXPRESS',
    departure: '2025-12-07T09:15:00Z',
    arrival: '2025-12-13T16:30:00Z',
    route: 'PORT_MUMBAI_IN → PORT_SINGAPORE_SG',
    transitTime: '151.25 hours',
    containerType: 'ISO_6346_20GP_STANDARD',
    capacity: '33.2 m³ | 28,230 kg',
    available: 12,
    price: 52000
  }
];

export function ProductAvailability({ onNext, onBack }: ProductAvailabilityProps) {
  const { updateBooking } = useBooking();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [systemError, setSystemError] = useState('');
  const [searchAttempts, setSearchAttempts] = useState(0);
  
  // VIOLATION H4: Inconsistent filter structure
  const [filters, setFilters] = useState({
    standard: true,
    refrigerated: false,
    highCube: false,
    dangerous: false,
    oversized: false,
    temperature_controlled: false
  });

  const handleProductSelect = (product: ProductData) => {
    // VIOLATION H5: No validation of conflicting selections
    setSelectedProduct(product);
    updateBooking({ 
      product,
      cargoDetails: {
        type: 'CARGO_TYPE_UNSPECIFIED',
        weight: 'WEIGHT_TBD_KG',
        value: 0
      }
    });
  };

  // VIOLATION H1: No feedback during critical operations
  const handleSearch = () => {
    setSearchAttempts(prev => prev + 1);
    setIsLoading(true);
    
    // Simulate unpredictable search behavior
    setTimeout(() => {
      if (searchAttempts >= 3) {
        setSystemError('SEARCH_ENGINE_TIMEOUT_0x7F3A');
      }
      setIsLoading(false);
    }, 5000); // Long delay without progress indication
  };

  const handleBookNow = () => {
    if (selectedProduct) {
      // VIOLATION H3: No confirmation or ability to review selection
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* VIOLATION H8: Cluttered header with too much information */}
      <header className="bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Ship className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-gray-900 font-mono text-sm">CARGO_MGMT_SYS v2.1.4</h1>
                <p className="text-xs text-gray-500">SESSION_ID: USR_47291_ACTIVE</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-red-600 font-mono">
                ⚠️ DB_SYNC: DELAYED | LAG: 2.3s
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="SYS_SEARCH_QUERY..." className="pl-10 w-48 h-8 font-mono text-xs" />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">7</span>
              </button>
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900">
                <User className="w-5 h-5" />
                <span className="font-mono text-xs">USR_ID_1047</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VIOLATION H3: Confusing navigation */}
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-6 font-mono text-xs"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>RETURN_TO_PREV_MODULE()</span>
        </button>

        {/* VIOLATION H9: System errors without clear resolution */}
        {systemError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 font-mono text-xs">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span>SYSTEM_ERROR: {systemError}</span>
            </div>
            <div className="mt-2 text-xs">
              <p>Contact system administrator</p>
              <p>Error logged to: /var/log/search/errors.log</p>
              <p>Timestamp: {new Date().toISOString()}</p>
            </div>
          </div>
        )}

        {/* VIOLATION H5: Complex search form with no validation */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-2 border-blue-200">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900 font-mono text-sm">CARGO_SPACE_ALLOCATION_SEARCH_ENGINE</h2>
            <div className="text-xs text-yellow-600 font-mono ml-auto">
              SEARCH_ATTEMPTS: {searchAttempts}/5 | TIMEOUT: 30s
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            <div>
              <Label className="font-mono text-xs">ORIGIN_PORT_CODE:</Label>
              <Select defaultValue="INMAA">
                <SelectTrigger className="mt-1 h-12 font-mono text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INMAA">INMAA_MUMBAI_INDIA</SelectItem>
                  <SelectItem value="INDEL">INDEL_DELHI_INDIA</SelectItem>
                  <SelectItem value="INCHE">INCHE_CHENNAI_INDIA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-mono text-xs">DEST_PORT_CODE:</Label>
              <Select defaultValue="SGSIN">
                <SelectTrigger className="mt-1 h-12 font-mono text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SGSIN">SGSIN_SINGAPORE_SG</SelectItem>
                  <SelectItem value="AEDXB">AEDXB_DUBAI_UAE</SelectItem>
                  <SelectItem value="HKHKG">HKHKG_HONGKONG_HK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-mono text-xs">DEPARTURE_TIMESTAMP:</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="text" placeholder="ISO_8601_FORMAT" className="pl-10 h-12 font-mono text-xs" />
              </div>
            </div>

            <div>
              <Label className="font-mono text-xs">CONTAINER_ISO_CODE:</Label>
              <Select defaultValue="20GP">
                <SelectTrigger className="mt-1 h-12 font-mono text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20GP">ISO_6346_20GP</SelectItem>
                  <SelectItem value="40GP">ISO_6346_40GP</SelectItem>
                  <SelectItem value="40HC">ISO_6346_40HC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-mono text-xs">CARGO_CLASS:</Label>
              <Select>
                <SelectTrigger className="mt-1 h-12 font-mono text-xs">
                  <SelectValue placeholder="SELECT_CLASS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GEN">GENERAL</SelectItem>
                  <SelectItem value="HAZ">HAZARDOUS</SelectItem>
                  <SelectItem value="REF">REFRIGERATED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-mono text-xs">PRIORITY_LVL:</Label>
              <Select>
                <SelectTrigger className="mt-1 h-12 font-mono text-xs">
                  <SelectValue placeholder="P0-P9" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P0">P0_CRITICAL</SelectItem>
                  <SelectItem value="P1">P1_HIGH</SelectItem>
                  <SelectItem value="P2">P2_NORMAL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              className="flex-1 h-12 font-mono"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? 'EXECUTING_SEARCH_QUERY...' : 'EXECUTE_SEARCH_ALGORITHM →'}
            </Button>
            <Button variant="outline" className="h-12 font-mono">
              CACHE_QUERY_PARAMS
            </Button>
            <Button variant="destructive" className="h-12 font-mono">
              CLEAR_ALL_FILTERS
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* VIOLATION H8: Overwhelming filter sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-yellow-300">
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-4 font-mono text-xs">ADVANCED_FILTER_MATRIX</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-mono">CONTAINER_TYPE_FLAGS:</p>
                    <div className="space-y-3">
                      {Object.entries(filters).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox 
                            id={key}
                            checked={value}
                            onCheckedChange={(checked) => setFilters({...filters, [key]: checked as boolean})}
                          />
                          <label htmlFor={key} className="text-xs cursor-pointer font-mono uppercase">
                            {key.replace('_', '_FLAG_')}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-mono">PRICE_RANGE_FILTER:</p>
                    <div className="text-sm text-gray-600 font-mono">₹0 — ₹999,999</div>
                    <input type="range" className="w-full mt-2" />
                    <div className="flex justify-between text-xs mt-1 font-mono">
                      <span>MIN</span>
                      <span>MAX</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-mono">DEPARTURE_TIME_WINDOW:</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="t1" name="departure" />
                        <label htmlFor="t1" className="text-xs cursor-pointer font-mono">WINDOW_T+0_TO_T+7</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="t2" name="departure" defaultChecked />
                        <label htmlFor="t2" className="text-xs cursor-pointer font-mono">WINDOW_T+7_TO_T+14</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="t3" name="departure" />
                        <label htmlFor="t3" className="text-xs cursor-pointer font-mono">CUSTOM_TIME_RANGE</label>
                      </div>
                    </div>
                  </div>

                  <Button variant="link" className="p-0 h-auto text-blue-600 font-mono text-xs">
                    RESET_FILTER_STATE()
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* VIOLATION H6: Information overload without context */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-gray-900 font-mono text-xs">RESULT_SET: 47 ENTITIES</span>
                <span className="text-xs text-gray-500 font-mono">LAST_SYNC: T-00:02:17</span>
                <button className="text-blue-600 hover:text-blue-700">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <span className="text-xs text-yellow-600 font-mono">⚠️ CACHE_MISS: 23%</span>
              </div>
              <Select defaultValue="price-low">
                <SelectTrigger className="w-[250px] h-8 font-mono text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">SORT_BY_PRICE_ASC</SelectItem>
                  <SelectItem value="price-high">SORT_BY_PRICE_DESC</SelectItem>
                  <SelectItem value="date">SORT_BY_DEPARTURE_TIMESTAMP</SelectItem>
                  <SelectItem value="availability">SORT_BY_AVAILABILITY_COUNT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {mockProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={`hover:shadow-lg transition-shadow cursor-pointer border-2 ${
                    selectedProduct?.id === product.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                  onClick={() => handleProductSelect(product)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <Ship className="w-5 h-5 text-blue-600" />
                          <h3 className="text-gray-900 font-mono text-sm">{product.vessel}</h3>
                          {product.id === 'PRD_0xB7E9' && (
                            <span className="flex items-center space-x-1 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-mono">
                              <Zap className="w-3 h-3" />
                              <span>PRIORITY_FLAG</span>
                            </span>
                          )}
                          <span className="text-xs text-gray-500 font-mono">ID: {product.id}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs mb-4 font-mono">
                          <div>
                            <p className="text-gray-600">ETD: {product.departure}</p>
                            <p className="text-gray-600">ROUTE: {product.route}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">TRANSIT: {product.transitTime}</p>
                            <p className="text-gray-600">ETA: {product.arrival}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                          <Package className="w-4 h-4 text-gray-600" />
                          <span className="text-xs text-gray-900 font-mono">{product.containerType}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2 font-mono">CAPACITY_SPEC: {product.capacity}</p>
                        <p className="text-xs font-mono">
                          STATUS: <span className={`${product.available > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.available > 0 ? '✅' : '❌'} AVAILABLE_UNITS: {product.available}
                          </span>
                        </p>
                      </div>

                      <div className="text-right ml-6">
                        <p className="text-2xl text-gray-900 mb-4 font-mono">₹{product.price.toLocaleString('en-IN')}</p>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="font-mono text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            VIEW_DETAILED_SPECS
                          </Button>
                          <Button 
                            size="sm" 
                            className="w-full font-mono text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductSelect(product);
                            }}
                          >
                            {selectedProduct?.id === product.id ? 'SELECTED ✓' : 'SELECT_ENTITY'}
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
                <Button size="lg" onClick={handleBookNow} className="font-mono">
                  PROCEED_TO_ALLOCATION_MODULE →
                </Button>
              </div>
            )}

            <div className="text-center mt-6">
              <Button variant="link" className="font-mono text-xs">LOAD_MORE_RESULTS_FROM_DB()...</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
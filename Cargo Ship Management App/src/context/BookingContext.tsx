import { createContext, useContext, useState, ReactNode } from 'react';

export interface ProductData {
  id: string;
  name: string;
  vessel: string;
  departure: string;
  arrival: string;
  route: string;
  transitTime: string;
  containerType: string;
  capacity: string;
  weight: string;
  available: number;
  price: number;
}

export interface LotData {
  id: string;
  position: string;
  deck: string;
  dimensions: string;
  weightCapacity: string;
  features: string[];
}

export interface ShipperData {
  company: string;
  contact: string;
  email: string;
  phone: string;
  gst: string;
}

export interface BookingData {
  product?: ProductData;
  lot?: LotData;
  shipper?: ShipperData;
  consignee?: ShipperData;
  cargoDetails?: {
    type: string;
    weight: string;
    value: number;
  };
  specialRequirements?: string;
  documents?: string[];
  transactionId?: string;
  paymentMethod?: string;
  insurance?: {
    plan: string;
    premium: number;
    coverage: number;
  };
}

interface BookingContextType {
  bookingData: BookingData;
  updateBooking: (data: Partial<BookingData>) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>({});

  const updateBooking = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setBookingData({});
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}

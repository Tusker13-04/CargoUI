import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Ship, Package, FileText, CreditCard, Shield, CheckCircle2, Bell, User } from 'lucide-react';
import { Module } from '../../App';

interface DashboardProps {
  onNavigate: (module: Module) => void;
  showSuccess?: boolean;
}

export function Dashboard({ onNavigate, showSuccess }: DashboardProps) {
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
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="text-green-900">Booking Completed Successfully! 🎉</h3>
                <p className="text-green-700 mt-1">
                  Your shipment has been confirmed. Booking reference: MUMB-SING-1105-47
                </p>
                <div className="mt-4 space-x-3">
                  <Button variant="outline" size="sm">
                    📄 Download Invoice
                  </Button>
                  <Button variant="outline" size="sm">
                    📱 Track Shipment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Welcome back, John! 👋</h2>
          <p className="text-gray-600">Ready to manage your cargo shipments?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('products')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Book New Shipment</CardTitle>
                  <CardDescription>Find available cargo spaces</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Get Started →
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Ship className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>Track Shipments</CardTitle>
                  <CardDescription>Monitor your active cargo</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View All
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>My Bookings</CardTitle>
                  <CardDescription>View booking history</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View History
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest shipments and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {showSuccess ? (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">Mumbai → Singapore</p>
                      <p className="text-sm text-gray-600">Booking confirmed • Dec 5, 2025</p>
                    </div>
                  </div>
                  <span className="text-green-600">Confirmed</span>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No recent activity</p>
                  <p className="text-sm">Start by booking a new shipment</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

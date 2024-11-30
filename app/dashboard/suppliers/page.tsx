"use client";

import { Card } from '@/components/ui/card';
import { Users, Plus, Search, MapPin, Phone, Mail } from 'lucide-react';

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Suppliers</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="h-5 w-5" />
          <span>Add Supplier</span>
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search suppliers..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="food">Food</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Supplier {item}</h3>
                <p className="text-sm text-gray-500">Electronics</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">123 Business Street, City, Country</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+1 234 567 890</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">supplier{item}@example.com</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Products Supplied</p>
                <p className="font-semibold">{25 * item}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded">Edit</button>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded">View</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

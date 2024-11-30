"use client";

import { Card } from '@/components/ui/card';
import { ClipboardList, Search, Filter } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Orders</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <ClipboardList className="h-5 w-5" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-6 bg-blue-50">
          <h3 className="text-sm font-medium text-blue-600">Pending</h3>
          <p className="text-2xl font-bold text-blue-900 mt-2">12</p>
        </Card>
        <Card className="p-6 bg-green-50">
          <h3 className="text-sm font-medium text-green-600">Completed</h3>
          <p className="text-2xl font-bold text-green-900 mt-2">45</p>
        </Card>
        <Card className="p-6 bg-yellow-50">
          <h3 className="text-sm font-medium text-yellow-600">Processing</h3>
          <p className="text-2xl font-bold text-yellow-900 mt-2">8</p>
        </Card>
        <Card className="p-6 bg-red-50">
          <h3 className="text-sm font-medium text-red-600">Cancelled</h3>
          <p className="text-2xl font-bold text-red-900 mt-2">3</p>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-6 gap-4 p-4 font-semibold text-gray-600 border-b">
          <div>Order ID</div>
          <div>Customer</div>
          <div>Date</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
            <div className="flex items-center">#ORD-{2023000 + item}</div>
            <div className="flex items-center">Customer {item}</div>
            <div className="flex items-center">2024-01-{10 + item}</div>
            <div className="flex items-center">$299.99</div>
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-full text-sm ${
                item === 1 ? 'bg-yellow-100 text-yellow-800' :
                item === 2 ? 'bg-green-100 text-green-800' :
                item === 3 ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {item === 1 ? 'Processing' :
                 item === 2 ? 'Completed' :
                 item === 3 ? 'Pending' :
                 'Delivered'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded">View</button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded">Print</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

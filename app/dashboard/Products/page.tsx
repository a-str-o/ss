"use client";

import { Card } from '@/components/ui/card';
import { Package, Plus, Search } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Products Management</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products..."
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

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-6 gap-4 p-4 font-semibold text-gray-600 border-b">
          <div>Product</div>
          <div>Category</div>
          <div>Stock</div>
          <div>Price</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-gray-600" />
              </div>
              <span>Product {item}</span>
            </div>
            <div className="flex items-center">Electronics</div>
            <div className="flex items-center">125 units</div>
            <div className="flex items-center">$299.99</div>
            <div className="flex items-center">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                In Stock
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded">Edit</button>
              <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

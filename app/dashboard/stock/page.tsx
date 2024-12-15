"use client"

import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../../contexts/LanguageContext'
import StockTable from './components/stock-table'

export default function StockPage() {
  const { isRtl } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-3xl font-bold text-gray-800 ${isRtl ? 'text-right' : 'text-left'}`}>
          Stock Management
        </h2>
        <div className="flex space-x-3">
          <Button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <Plus className="h-5 w-5" />
            <span>Stock In</span>
          </Button>
          <Button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            <Plus className="h-5 w-5" />
            <span>Stock Out</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Stock Value</h3>
          <p className="text-2xl font-bold mt-2">$45,231.89</p>
          <p className="text-sm text-green-600 mt-2">+2.5% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
          <p className="text-2xl font-bold mt-2">12</p>
          <p className="text-sm text-red-600 mt-2">Needs attention</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Stock Movements</h3>
          <p className="text-2xl font-bold mt-2">156</p>
          <p className="text-sm text-gray-600 mt-2">This month</p>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <StockTable />
      </div>
    </div>
  );
}

"use client";

import { Card } from '@/components/ui/card';
import { Boxes, Plus, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StockTable from './components/stock-table';
import { useLanguage, useTranslation } from '../../contexts/LanguageContext';

export default function StockPage() {
  const t = useTranslation();
  const { isRtl } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-3xl font-bold text-gray-800 ${isRtl ? 'text-right' : 'text-left'}`}>
          {t?.stockManagement || "Stock Management"}
        </h2>
        <div className="flex space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                <ArrowUp className="h-5 w-5" />
                <span>{t?.stockIn || "Stock In"}</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t?.stockIn || "Stock In Entry"}</DialogTitle>
              </DialogHeader>
              <form className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="product" className="text-sm font-medium">{t?.product || "Product"}</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">{t?.selectProduct || "Select product"}</option>
                    <option value="1">Product 1</option>
                    <option value="2">Product 2</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="quantity" className="text-sm font-medium">{t?.quantity || "Quantity"}</label>
                  <input
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder={t?.enterQuantity || "Enter quantity"}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="notes" className="text-sm font-medium">{t?.notes || "Notes"}</label>
                  <textarea
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder={t?.addNotes || "Add notes"}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button type="button" className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                    {t?.cancel || "Cancel"}
                  </button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    {t?.submit || "Submit"}
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                <ArrowDown className="h-5 w-5" />
                <span>{t?.stockOut || "Stock Out"}</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t?.stockOut || "Stock Out Entry"}</DialogTitle>
              </DialogHeader>
              <form className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="product" className="text-sm font-medium">{t?.product || "Product"}</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">{t?.selectProduct || "Select product"}</option>
                    <option value="1">Product 1</option>
                    <option value="2">Product 2</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="quantity" className="text-sm font-medium">{t?.quantity || "Quantity"}</label>
                  <input
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder={t?.enterQuantity || "Enter quantity"}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="reason" className="text-sm font-medium">{t?.reason || "Reason"}</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">{t?.selectReason || "Select reason"}</option>
                    <option value="sale">{t?.sale || "Sale"}</option>
                    <option value="damage">{t?.damage || "Damage"}</option>
                    <option value="return">{t?.return || "Return"}</option>
                    <option value="other">{t?.other || "Other"}</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="notes" className="text-sm font-medium">{t?.notes || "Notes"}</label>
                  <textarea
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder={t?.addNotes || "Add notes"}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button type="button" className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                    {t?.cancel || "Cancel"}
                  </button>
                  <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    {t?.submit || "Submit"}
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">{t?.totalStockValue || "Total Stock Value"}</h3>
          <p className="text-2xl font-bold mt-2">$45,231.89</p>
          <p className="text-sm text-green-600 mt-2">+2.5% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">{t?.lowStockItems || "Low Stock Items"}</h3>
          <p className="text-2xl font-bold mt-2">12</p>
          <p className="text-sm text-red-600 mt-2">{t?.needsAttention || "Needs attention"}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">{t?.stockMovements || "Stock Movements"}</h3>
          <p className="text-2xl font-bold mt-2">156</p>
          <p className="text-sm text-gray-600 mt-2">{t?.thisMonth || "This month"}</p>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <StockTable />
      </div>
    </div>
  );
}

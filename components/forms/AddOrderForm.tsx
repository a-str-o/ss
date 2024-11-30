"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function AddOrderForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="h-5 w-5" />
          <span>New Order</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="customer" className="text-sm font-medium">
              Customer Name
            </label>
            <input
              id="customer"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Enter customer name"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="product" className="text-sm font-medium">
              Product
            </label>
            <select
              id="product"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select product</option>
              <option value="1">Product 1</option>
              <option value="2">Product 2</option>
              <option value="3">Product 3</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="0"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="shipping" className="text-sm font-medium">
              Shipping Address
            </label>
            <textarea
              id="shipping"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Enter shipping address"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Order Notes
            </label>
            <textarea
              id="notes"
              className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Add any special instructions"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Order
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

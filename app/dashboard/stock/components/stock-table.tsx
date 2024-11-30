"use client";

import * as React from "react";
import { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StockForm from "./stock-form";
import { useLanguage, useTranslation } from "@/app/contexts/LanguageContext";

interface Stock {
  id: string;
  name: string;
  type: string;
  volumeSize: number;
  sizeLimit: number;
  address: string;
  lastUpdated: string;
}

const mockData: Stock[] = [
  {
    id: '1',
    name: 'Main Warehouse Storage',
    type: 'Raw Materials',
    volumeSize: 1000,
    sizeLimit: 1500,
    address: '123 Warehouse St, Industrial Zone',
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    name: 'Production Floor Storage',
    type: 'Work in Progress (WIP)',
    volumeSize: 500,
    sizeLimit: 800,
    address: '456 Storage Ave, Business Park',
    lastUpdated: '2024-01-14',
  },
  {
    id: '3',
    name: 'Cold Storage Facility',
    type: 'Cold Storage',
    volumeSize: 300,
    sizeLimit: 400,
    address: '789 Refrigeration Rd, Industrial District',
    lastUpdated: '2024-01-13',
  },
];

export default function StockTable() {
  const [stocks, setStocks] = useState<Stock[]>(mockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredStocks = stocks.filter(stock => 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setStocks(stocks.filter(stock => stock.id !== id));
    }
  };

  const handleSave = (data: Omit<Stock, 'id' | 'lastUpdated'>) => {
    if (editingStock) {
      setStocks(stocks.map(stock => 
        stock.id === editingStock.id 
          ? { 
              ...stock, 
              ...data, 
              lastUpdated: new Date().toISOString().split('T')[0] 
            } 
          : stock
      ));
    } else {
      setStocks([
        ...stocks, 
        { 
          ...data, 
          id: Date.now().toString(),
          lastUpdated: new Date().toISOString().split('T')[0]
        }
      ]);
    }
    setIsDialogOpen(false);
    setEditingStock(null);
  };

  const handleEdit = (stock: Stock) => {
    setEditingStock(stock);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder={t?.searchStocks || "Search stocks..."}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-[300px]"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingStock(null)}>
              <Plus className="h-4 w-4 mr-2" />
              {t?.addStock || "Add Stock"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-white">
            <DialogHeader className="space-y-3">
              <DialogTitle>
                {editingStock ? (t?.editStock || "Edit Stock") : (t?.addStock || "Add Stock")}
              </DialogTitle>
              <DialogDescription>
                {editingStock 
                  ? (t?.editStockDescription || "Make changes to the stock location details.")
                  : (t?.addStockDescription || "Add a new stock location to the system.")}
              </DialogDescription>
            </DialogHeader>
            <StockForm 
              initialData={editingStock ? {
                name: editingStock.name,
                type: editingStock.type,
                volumeSize: editingStock.volumeSize,
                sizeLimit: editingStock.sizeLimit,
                address: editingStock.address,
              } : undefined}
              onSubmit={handleSave}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingStock(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t?.name || "Name"}</TableHead>
              <TableHead>{t?.type || "Type"}</TableHead>
              <TableHead>{t?.volumeSize || "Volume Size"}</TableHead>
              <TableHead>{t?.sizeLimit || "Size Limit"}</TableHead>
              <TableHead>{t?.address || "Address"}</TableHead>
              <TableHead>{t?.lastUpdated || "Last Updated"}</TableHead>
              <TableHead>{t?.actions || "Actions"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.type}</TableCell>
                <TableCell>{stock.volumeSize}</TableCell>
                <TableCell>{stock.sizeLimit}</TableCell>
                <TableCell className="max-w-xs truncate">{stock.address}</TableCell>
                <TableCell>{stock.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(stock)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(stock.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

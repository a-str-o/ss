"use client"

import * as React from "react"
import { useEffect, useState } from 'react'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Search, Plus } from 'lucide-react'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import StockForm from "./stock-form"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { Stock, createStock, updateStock, deleteStock, getStocks } from "@/lib/stock"
import { toast } from "react-toastify"

export default function StockTable() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [editingStock, setEditingStock] = useState<Stock | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [stockToDelete, setStockToDelete] = useState<Stock | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    loadStocks()
  }, [])

  const loadStocks = async () => {
    try {
      setIsLoading(true)
      const data = await getStocks()
      setStocks(data)
    } catch (error: any) {
      console.error('Error loading stocks:', error)
      toast.error(error.message || 'Failed to load stocks')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const handleTypeFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeFilter(event.target.value.toLowerCase())
  }

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = 
      stock.name.toLowerCase().includes(searchTerm) ||
      stock.type.toLowerCase().includes(searchTerm) ||
      stock.address.toLowerCase().includes(searchTerm)
    
    const matchesType = !typeFilter || stock.type.toLowerCase().includes(typeFilter)
    
    return matchesSearch && matchesType
  })

  const handleDeleteClick = (stock: Stock) => {
    setStockToDelete(stock)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!stockToDelete) return

    try {
      await deleteStock(stockToDelete.id)
      toast.success('Stock deleted successfully')
      await loadStocks()
    } catch (error: any) {
      console.error('Error deleting stock:', error)
      toast.error(error.message || 'Failed to delete stock')
    } finally {
      setIsDeleteDialogOpen(false)
      setStockToDelete(null)
    }
  }

  const handleSave = async (data: Omit<Stock, 'id' | 'created_at' | 'last_updated' | 'user_id'>) => {
    try {
      if (editingStock) {
        await updateStock(editingStock.id, data)
        toast.success('Stock updated successfully')
      } else {
        await createStock(data)
        toast.success('Stock created successfully')
      }
      await loadStocks()
      setIsDialogOpen(false)
      setEditingStock(null)
    } catch (error: any) {
      console.error('Error saving stock:', error)
      toast.error(error.message || 'Failed to save stock')
    }
  }

  const handleEdit = (stock: Stock) => {
    setEditingStock(stock)
    setIsDialogOpen(true)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder={t?.searchStocks || "Search stocks..."}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-[300px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Input
              placeholder={t?.filterByType || "Filter by type..."}
              value={typeFilter}
              onChange={handleTypeFilterChange}
              className="w-[200px]"
            />
          </div>
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
                volume_size: editingStock.volume_size,
                size_limit: editingStock.size_limit,
                address: editingStock.address,
              } : undefined}
              onSubmit={handleSave}
              onCancel={() => {
                setIsDialogOpen(false)
                setEditingStock(null)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{stockToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false)
                setStockToDelete(null)
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
              <TableHead className="w-[100px]">{t?.actions || "Actions"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStocks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  {searchTerm
                    ? "No stocks found matching your search"
                    : "No stocks available. Add your first stock!"}
                </TableCell>
              </TableRow>
            ) : (
              filteredStocks.map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell className="font-medium">{stock.name}</TableCell>
                  <TableCell>{stock.type}</TableCell>
                  <TableCell>{stock.volume_size}</TableCell>
                  <TableCell>{stock.size_limit}</TableCell>
                  <TableCell className="max-w-xs truncate">{stock.address}</TableCell>
                  <TableCell>{new Date(stock.last_updated).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(stock)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(stock)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

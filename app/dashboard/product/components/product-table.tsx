"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { Product, deleteProduct, productCategories, productStatuses } from "@/lib/product"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Stock } from "@/lib/stock"

interface ProductTableProps {
  products: Product[]
  stocks: Stock[]
  onEdit: (product: Product) => void
  onRefresh: () => void
}

export default function ProductTable({ products, stocks, onEdit, onRefresh }: ProductTableProps) {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStock, setSelectedStock] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStock = !selectedStock || product.stock_id === selectedStock
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesStatus = !selectedStatus || product.status === selectedStatus

    return matchesSearch && matchesStock && matchesCategory && matchesStatus
  })

  const handleDelete = async (product: Product) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!productToDelete) return

    try {
      await deleteProduct(productToDelete.id)
      toast.success("Product deleted successfully")
      onRefresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product")
    } finally {
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 md:flex-1">
          <Input
            placeholder={t?.searchProducts || "Search products..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-[300px]"
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          <Select value={selectedStock} onValueChange={setSelectedStock}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t?.filterByStock || "Filter by stock"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Stocks</SelectItem>
              {stocks.map((stock) => (
                <SelectItem key={stock.id} value={stock.id}>
                  {stock.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t?.filterByCategory || "Filter by category"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {productCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t?.filterByStatus || "Filter by status"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {productStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">{t?.name || "Name"}</TableHead>
              <TableHead className="font-semibold">SKU</TableHead>
              <TableHead className="font-semibold">{t?.category || "Category"}</TableHead>
              <TableHead className="font-semibold">{t?.stock || "Stock"}</TableHead>
              <TableHead className="font-semibold">{t?.quantity || "Quantity"}</TableHead>
              <TableHead className="font-semibold">{t?.unitPrice || "Unit Price"}</TableHead>
              <TableHead className="font-semibold">{t?.status || "Status"}</TableHead>
              <TableHead className="text-right font-semibold">{t?.actions || "Actions"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                  {t?.noProductsFound || "No products found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {stocks.find(s => s.id === product.stock_id)?.name}
                  </TableCell>
                  <TableCell>
                    <span className={product.quantity <= product.minimum_quantity ? 'text-red-600 font-medium' : ''}>
                      {product.quantity}
                    </span>
                  </TableCell>
                  <TableCell>${product.unit_price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-green-100 text-green-800' :
                      product.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      product.status === 'out_of_stock' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {productStatuses.find(s => s.value === product.status)?.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                      className="mr-2 hover:bg-gray-100"
                    >
                      {t?.edit || "Edit"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      {t?.delete || "Delete"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t?.confirmDelete || "Confirm Delete"}</DialogTitle>
            <DialogDescription>
              {t?.deleteProductConfirmation || "Are you sure you want to delete this product? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {t?.cancel || "Cancel"}
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              {t?.delete || "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Product, ProductFormData, createProduct, getProducts, updateProduct } from "@/lib/product"
import { Stock, getStocks } from "@/lib/stock"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ProductForm from "./components/product-form"
import ProductTable from "./components/product-table"

export default function ProductPage() {
  const { t } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [stocks, setStocks] = useState<Stock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [productsData, stocksData] = await Promise.all([
        getProducts(),
        getStocks()
      ])
      setProducts(productsData)
      setStocks(stocksData)
    } catch (error: any) {
      toast.error(error.message || "Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmit = async (data: ProductFormData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data)
        toast.success("Product updated successfully")
      } else {
        await createProduct(data)
        toast.success("Product created successfully")
      }
      setFormOpen(false)
      setEditingProduct(null)
      loadData()
    } catch (error: any) {
      toast.error(error.message || "Failed to save product")
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormOpen(true)
  }

  const handleCancel = () => {
    setFormOpen(false)
    setEditingProduct(null)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t?.products || "Products"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t?.productsDescription || "Manage your products and inventory"}
          </p>
        </div>
        <Button 
          onClick={() => setFormOpen(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          {t?.addProduct || "Add Product"}
        </Button>
      </div>

      <ProductTable
        products={products}
        stocks={stocks}
        onEdit={handleEdit}
        onRefresh={loadData}
      />

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? (t?.editProduct || "Edit Product") : (t?.addProduct || "Add Product")}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            stocks={stocks}
            initialData={editingProduct || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

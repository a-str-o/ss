import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export interface Product {
  id: string
  name: string
  sku: string
  description: string
  category: string
  unit_price: number
  quantity: number
  minimum_quantity: number
  stock_id: string
  supplier: string
  brand: string
  barcode: string
  status: 'active' | 'inactive' | 'out_of_stock' | 'discontinued'
  expiry_date: string | null
  manufacturing_date: string | null
  last_updated: string
  created_at: string
  user_id: string
}

export type ProductFormData = Omit<Product, 'id' | 'created_at' | 'last_updated' | 'user_id'>

export async function createProduct(data: ProductFormData) {
  const supabase = createClientComponentClient()
  
  try {
    const { data: session } = await supabase.auth.getSession()
    if (!session?.session?.user?.id) {
      throw new Error('User not authenticated')
    }

    const { data: newProduct, error } = await supabase
      .from('products')
      .insert([
        {
          ...data,
          user_id: session.session.user.id,
          last_updated: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) throw error
    return newProduct
  } catch (error: any) {
    throw error
  }
}

export async function updateProduct(id: string, data: Partial<ProductFormData>) {
  const supabase = createClientComponentClient()
  
  try {
    const { data: session } = await supabase.auth.getSession()
    if (!session?.session?.user?.id) {
      throw new Error('User not authenticated')
    }

    const { data: updatedProduct, error } = await supabase
      .from('products')
      .update({
        ...data,
        last_updated: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', session.session.user.id)
      .select()
      .single()

    if (error) throw error
    return updatedProduct
  } catch (error: any) {
    throw error
  }
}

export async function deleteProduct(id: string) {
  const supabase = createClientComponentClient()
  
  try {
    const { data: session } = await supabase.auth.getSession()
    if (!session?.session?.user?.id) {
      throw new Error('User not authenticated')
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .eq('user_id', session.session.user.id)

    if (error) throw error
  } catch (error: any) {
    throw error
  }
}

export async function getProducts(stockId?: string) {
  const supabase = createClientComponentClient()
  
  try {
    const { data: session } = await supabase.auth.getSession()
    if (!session?.session?.user?.id) {
      throw new Error('User not authenticated')
    }

    let query = supabase
      .from('products')
      .select('*, stocks(name)')
      .eq('user_id', session.session.user.id)

    if (stockId) {
      query = query.eq('stock_id', stockId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error: any) {
    throw error
  }
}

export const productCategories = [
  'Electronics',
  'Clothing',
  'Food & Beverages',
  'Home & Garden',
  'Health & Beauty',
  'Sports & Outdoors',
  'Toys & Games',
  'Books & Media',
  'Automotive',
  'Office Supplies',
  'Pet Supplies',
  'Tools & Hardware',
  'Art & Craft Supplies',
  'Baby & Kids',
  'Jewelry & Accessories',
  'Industrial & Scientific',
  'Party Supplies',
  'Musical Instruments',
  'Other'
]

export const productStatuses = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'out_of_stock', label: 'Out of Stock' },
  { value: 'discontinued', label: 'Discontinued' }
]

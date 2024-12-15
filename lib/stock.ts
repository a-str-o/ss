import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export interface Stock {
  id: string
  name: string
  type: string
  volume_size: number
  size_limit: number
  address: string
  last_updated: string
  created_at: string
  user_id: string
}

export async function createStock(data: Omit<Stock, 'id' | 'created_at' | 'last_updated' | 'user_id'>) {
  const supabase = createClientComponentClient()
  
  try {
    const { data: session } = await supabase.auth.getSession()
    if (!session?.session?.user?.id) {
      throw new Error('User not authenticated')
    }

    const { data: newStock, error } = await supabase
      .from('stocks')
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
    return newStock
  } catch (error: any) {
    throw error
  }
}

export async function updateStock(id: string, data: Partial<Omit<Stock, 'id' | 'created_at' | 'user_id'>>) {
  const supabase = createClientComponentClient()
  
  try {
    const { data: session } = await supabase.auth.getSession()
    if (!session?.session?.user?.id) {
      throw new Error('User not authenticated')
    }

    const { data: updatedStock, error } = await supabase
      .from('stocks')
      .update({
        ...data,
        last_updated: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', session.session.user.id)
      .select()
      .single()

    if (error) throw error
    return updatedStock
  } catch (error: any) {
    throw error
  }
}

export async function deleteStock(id: string) {
  const supabase = createClientComponentClient()
  
  try {
    const { data: session } = await supabase.auth.getSession()
    if (!session?.session?.user?.id) {
      throw new Error('User not authenticated')
    }

    const { error } = await supabase
      .from('stocks')
      .delete()
      .eq('id', id)
      .eq('user_id', session.session.user.id)

    if (error) throw error
  } catch (error: any) {
    throw error
  }
}

export async function getStocks() {
  const supabase = createClientComponentClient()
  
  try {
    const { data: session } = await supabase.auth.getSession()
    if (!session?.session?.user?.id) {
      throw new Error('User not authenticated')
    }

    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .eq('user_id', session.session.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error: any) {
    throw error
  }
}

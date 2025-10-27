import { supabase } from '@/lib/supabase'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image_url: string | null
}

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name')
    
    if (error) {
      console.error('Error fetching products:', error)
      return []
    }
    
    return data || []
  },

  async getProductById(id: number): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching product:', error)
      return null
    }
    
    return data
  }
}
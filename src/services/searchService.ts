import { supabase } from '@/lib/supabase';

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'popularity' | 'newest';
}

export const searchService = {
  // Search products by text
  async searchProducts(query: string, filters: FilterOptions = {}) {
    let supabaseQuery = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    // Text search
    if (query) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%,search_tags.cs.{${query}}`);
    }

    // Category filter
    if (filters.category) {
      supabaseQuery = supabaseQuery.eq('category', filters.category);
    }

    // Price range filter
    if (filters.minPrice !== undefined) {
      supabaseQuery = supabaseQuery.gte('price', filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      supabaseQuery = supabaseQuery.lte('price', filters.maxPrice);
    }

    // Brand filter
    if (filters.brand) {
      supabaseQuery = supabaseQuery.eq('brand', filters.brand);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          supabaseQuery = supabaseQuery.order('price', { ascending: true });
          break;
        case 'price_desc':
          supabaseQuery = supabaseQuery.order('price', { ascending: false });
          break;
        case 'popularity':
          supabaseQuery = supabaseQuery.order('popularity', { ascending: false });
          break;
        case 'newest':
          supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
          break;
        default:
          supabaseQuery = supabaseQuery.order('name');
      }
    }

    const { data, error } = await supabaseQuery;
    
    if (error) throw error;
    return data;
  },

  // Get all unique categories for filters
  async getCategories() {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .eq('is_active', true);

    if (error) throw error;
    
    const uniqueCategories = [...new Set(data.map(item => item.category))];
    return uniqueCategories;
  },

  // Get all unique brands for filters
  async getBrands() {
    const { data, error } = await supabase
      .from('products')
      .select('brand')
      .eq('is_active', true)
      .not('brand', 'is', null);

    if (error) throw error;
    
    const uniqueBrands = [...new Set(data.map(item => item.brand))];
    return uniqueBrands;
  }
};
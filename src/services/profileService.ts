import { supabase } from '@/lib/supabase'

export interface Profile {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
}

export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    console.log('Fetching profile for user:', userId)
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    console.log('Get profile result:', data, error)
    
    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }
    
    return data
  },

  async createProfile(userId: string, email: string, fullName: string): Promise<Profile | null> {
    console.log('Creating profile for:', userId, email, fullName)
    
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          email: email,
          full_name: fullName
        }
      ])
      .select()
      .single()
    
    console.log('Create profile result:', data, error)
    
    if (error) {
      console.error('Error creating profile:', error)
      return null
    }
    
    return data
  },

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
    console.log('Updating profile for user:', userId, updates)
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    console.log('Update profile result:', data, error)
    
    if (error) {
      console.error('Error updating profile:', error)
      return null
    }
    
    return data
  }
}
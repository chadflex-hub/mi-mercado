// VERSION 5 - LOCALSTORAGE ONLY - NO SUPABASE
console.log('🎯 VERSION 5: orderService loaded - LOCALSTORAGE VERSION')

export interface Order {
  id: number
  user_id: string
  total_amount: number
  status: 'pending' | 'completed' | 'shipped'
  created_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  product_name: string
  product_price: number
  quantity: number
  product_image?: string
}

export const orderService = {
  async createOrder(userId: string, cartItems: any[], total: number): Promise<Order | null> {
    try {
      console.log('🎯 VERSION 5: Creating order in localStorage')
      
      // Create order object
      const order: Order = {
        id: Date.now(),
        user_id: userId,
        total_amount: total,
        status: 'completed',
        created_at: new Date().toISOString(),
        items: cartItems.map((item, index) => ({
          id: index + 1,
          order_id: Date.now(),
          product_id: item.id,
          product_name: item.name,
          product_price: parseFloat(item.price.replace('€', '').replace(',', '.')),
          quantity: item.quantity,
          product_image: item.image_url
        }))
      }

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('mi-mercado-orders') || '[]')
      existingOrders.push(order)
      localStorage.setItem('mi-mercado-orders', JSON.stringify(existingOrders))

      console.log('✅ VERSION 5: Order created successfully in localStorage')
      return order

    } catch (error) {
      console.error('❌ VERSION 5 Error:', error)
      return null
    }
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      console.log('🎯 VERSION 5: Getting orders from localStorage')
      const orders = JSON.parse(localStorage.getItem('mi-mercado-orders') || '[]')
      const userOrders = orders.filter((order: Order) => order.user_id === userId)
      console.log('✅ VERSION 5: Found orders:', userOrders)
      return userOrders
    } catch (error) {
      console.error('❌ VERSION 5 Error:', error)
      return []
    }
  },

  async getOrderById(orderId: number): Promise<Order | null> {
    try {
      const orders = JSON.parse(localStorage.getItem('mi-mercado-orders') || '[]')
      const order = orders.find((order: Order) => order.id === orderId)
      return order || null
    } catch (error) {
      console.error('❌ VERSION 5 Error:', error)
      return null
    }
  }
}
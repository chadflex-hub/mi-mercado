// VERSION 2 - COMPLETELY NEW FILE - LOCALSTORAGE ONLY
console.log('🔥 VERSION 2: orderServiceV2 loaded - NO SUPABASE')

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
      console.log('🔥 VERSION 2: Creating order in localStorage')
      
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

      const existingOrders = JSON.parse(localStorage.getItem('mi-mercado-orders') || '[]')
      existingOrders.push(order)
      localStorage.setItem('mi-mercado-orders', JSON.stringify(existingOrders))

      console.log('✅ VERSION 2: Order created successfully')
      return order
    } catch (error) {
      console.error('❌ VERSION 2 Error:', error)
      return null
    }
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const orders = JSON.parse(localStorage.getItem('mi-mercado-orders') || '[]')
      return orders.filter((order: Order) => order.user_id === userId)
    } catch (error) {
      console.error('❌ VERSION 2 Error:', error)
      return []
    }
  },

  async getOrderById(orderId: number): Promise<Order | null> {
    try {
      const orders = JSON.parse(localStorage.getItem('mi-mercado-orders') || '[]')
      return orders.find((order: Order) => order.id === orderId) || null
    } catch (error) {
      console.error('❌ VERSION 2 Error:', error)
      return null
    }
  }
}
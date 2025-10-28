'use client';

import { useAuth } from '@/context/AuthContext';
import { orderServiceV2, Order } from '@/services/orderServiceV2';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MisPedidosPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userOrders = orderServiceV2.getUserOrders(user.id);
      setOrders(userOrders);
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando pedidos...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
          <p className="text-gray-600 mb-4">Debes iniciar sesión para ver tus pedidos.</p>
          <Link href="/login" className="text-blue-600 hover:underline">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No tienes pedidos aún</h3>
          <p className="text-gray-500 mb-6">Realiza tu primera compra para ver tus pedidos aquí.</p>
          <Link 
            href="/productos" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Comprar Productos
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Pedido #{order.id.slice(-8)}</h3>
                  <p className="text-gray-600 text-sm">
                    Realizado el {new Date(order.createdAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">€{order.total.toFixed(2)}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {order.status === 'completed' ? 'Completado' : 
                     order.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                  </span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Productos:</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image_url || '/placeholder-product.jpg'}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span>{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-600">
                          {item.quantity} x €{item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
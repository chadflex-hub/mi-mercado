'use client';

import { useAuth } from '@/context/AuthContext';
import { orderService, Order } from '@/services/orderServiceV2';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MisPedidos() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        console.log('🔥 VERSION 2: Loading orders from localStorage');
        const ordersData = await orderService.getUserOrders(user.id);
        setOrders(ordersData);
      }
      setLoading(false);
    };

    loadOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'shipped': return 'Enviado';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Acceso Requerido</h2>
            <p className="text-gray-600 mb-6">Por favor, inicia sesion para ver tus pedidos.</p>
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-block"
            >
              Iniciar Sesion
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Mis Pedidos</h1>
          <div className="text-center">Cargando pedidos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Mis Pedidos</h1>

        {orders.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold mb-4">No tienes pedidos aun</h2>
            <p className="text-gray-600 mb-6">¡Realiza tu primera compra en Mi Mercado!</p>
            <Link
              href="/productos"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-block"
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Pedido #{order.id}</h3>
                    <p className="text-gray-600 text-sm">
                      Realizado el {new Date(order.created_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    <p className="text-2xl font-bold text-green-600 mt-2">{order.total_amount}€</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Productos:</h4>
                  <div className="space-y-2">
                    {order.items?.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {item.product_image && (
                            <img
                              src={item.product_image}
                              alt={item.product_name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          )}
                          <div>
                            <p className="font-medium">{item.product_name}</p>
                            <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold">{item.product_price}€</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
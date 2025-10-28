'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { orderServiceV2 } from '@/services/orderServiceV2';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PagoPage() {
  const { cartItems, clearCart } = useCart(); // REMOVED getTotalPrice from here
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Calculate total manually since getTotalPrice doesn't exist in your CartContext
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  useEffect(() => {
    if (cartItems.length === 0 && !orderCompleted) {
      router.push('/carrito');
    }
  }, [cartItems, orderCompleted, router]);

  const handlePaymentSuccess = async (paymentMethodId: string) => {
    setLoading(true);
    try {
      // Create order
      const order = orderServiceV2.createOrder(
        user?.id || 'guest',
        cartItems.map(item => ({
          productId: item.id.toString(),
          name: item.name,
          price: parseFloat(item.price),
          quantity: item.quantity,
          image_url: item.image_url || '/placeholder-product.jpg'
        })),
        getTotalPrice()
      );

      // Clear cart
      clearCart();
      setOrderCompleted(true);
      
      // Redirect to orders page after a delay
      setTimeout(() => {
        router.push('/mis-pedidos');
      }, 3000);
      
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (orderCompleted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-green-500 text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Pago Completado!
          </h1>
          <p className="text-gray-600 mb-8">
            Tu pedido ha sido procesado exitosamente. Serás redirigido a tus pedidos en unos momentos...
          </p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Inicia Sesión para Continuar
          </h1>
          <p className="text-gray-600 mb-8">
            Debes iniciar sesión para completar tu compra.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image_url || '/placeholder-product.jpg'}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm">Cantidad: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">€{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-600">€{getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Información de Pago</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              onSuccess={handlePaymentSuccess}
              loading={loading}
            />
          </Elements>
          
          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Modo Demo:</strong> Usa tarjeta de prueba: 4242 4242 4242 4242
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
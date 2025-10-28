'use client';

import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface CheckoutFormProps {
  total: number;
}

export default function CheckoutForm({ total }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrorMessage('Elemento de tarjeta no encontrado');
      setIsProcessing(false);
      return;
    }

    try {
      // In a real app, you would create a payment intent on your server
      // For demo purposes, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      clearCart();
      alert('¡Pago realizado con éxito! ¡Gracias por tu compra!');
      router.push('/');
      
    } catch (error) {
      setErrorMessage('Error procesando el pago. Inténtalo de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border border-gray-300 rounded-lg p-3">
        <CardElement options={cardElementOptions} />
      </div>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errorMessage}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Modo Demo:</strong> No se realizará ningún cargo real. 
          Puedes usar cualquier número de tarjeta de prueba de Stripe.
        </p>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Procesando Pago...' : `Pagar ${total.toFixed(2)}€`}
      </button>

      <div className="text-xs text-gray-500 text-center">
        Pago seguro procesado por Stripe. Tus datos están protegidos.
      </div>
    </form>
  );
}
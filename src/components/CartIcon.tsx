'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export function CartIcon() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link href="/carrito" className="relative">
      <div className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
        <span>🛒</span>
        <span>Carrito</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
}
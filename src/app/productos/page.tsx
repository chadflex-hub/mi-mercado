'use client';

import { useCart } from '@/context/CartContext'

export default function Productos() {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "Aceite de Oliva Virgen Extra", price: "12,50€", category: "Alimentos" },
    { id: 2, name: "Queso Manchego", price: "8,75€", category: "Lácteos" },
    { id: 3, name: "Jamón Ibérico", price: "24,90€", category: "Embutidos" },
    { id: 4, name: "Naranjas Valencianas", price: "4,50€", category: "Frutas" },
    { id: 5, name: "Vino Rioja", price: "15,20€", category: "Bebidas" },
    { id: 6, name: "Aceitunas Gordales", price: "6,80€", category: "Conservas" }
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    alert(`¡${product.name} añadido al carrito!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Nuestros Productos</h1>
        <p className="text-gray-600 text-center mb-12">Descubre los mejores productos españoles</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-amber-50 to-green-50 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-2xl font-bold text-green-600 mb-4">{product.price}</p>
              <button 
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Añadir al Carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
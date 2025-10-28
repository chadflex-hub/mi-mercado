'use client';

import { useCart } from '@/context/CartContext';
import { productService, Product } from '../../services/productService';
import { useEffect, useState } from 'react';

export default function Productos() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await productService.getAllProducts();
      setProducts(productsData);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: `${product.price}€`,
      category: product.category,
      image_url: product.image_url || undefined
    });
    alert(`¡${product.name} añadido al carrito!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Nuestros Productos</h1>
          <div className="text-center">Cargando productos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Nuestros Productos</h1>
        <p className="text-gray-600 text-center mb-12">Descubre los mejores productos españoles</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-4xl">🛒</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-2xl font-bold text-green-600 mb-4">{product.price}€</p>
              <p className="text-gray-500 text-sm mb-4">{product.description}</p>
              <button 
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Añadir al Carrito
              </button>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No hay productos disponibles en este momento.
          </div>
        )}
      </div>
    </div>
  );
}
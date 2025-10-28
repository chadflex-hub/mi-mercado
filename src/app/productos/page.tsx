'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { productService } from '@/services/productService';
import { searchService } from '@/services/searchService';
import { useCart } from '@/context/CartContext';

// Use the same Product interface as your CartContext
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image_url?: string;
  brand?: string;
}

// Main component that uses useSearchParams
function ProductosContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    // Get search query from URL
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
      handleSearch(search, selectedCategory);
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, products]);

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      // Convert the data to match our Product interface
      const convertedProducts: Product[] = (data || []).map(product => ({
        ...product,
        id: typeof product.id === 'string' ? parseInt(product.id) : product.id,
        price: typeof product.price === 'number' ? product.price.toString() : product.price,
        image_url: product.image_url || undefined
      }));
      setProducts(convertedProducts);
      setFilteredProducts(convertedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await searchService.getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleSearch = async (query: string, category: string = '') => {
    setLoading(true);
    try {
      let results;
      
      if (query.trim() || category) {
        // Use search service for advanced search
        results = await searchService.searchProducts(query, {
          category: category || undefined
        });
      } else {
        // Show all products
        results = await productService.getAllProducts();
      }
      
      // Convert the results to match our Product interface
      const convertedResults: Product[] = (results || []).map(product => ({
        ...product,
        id: typeof product.id === 'string' ? parseInt(product.id) : product.id,
        price: typeof product.price === 'number' ? product.price.toString() : product.price,
        image_url: product.image_url || undefined
      }));
      
      setFilteredProducts(convertedResults);
    } catch (error) {
      console.error('Error searching products:', error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    handleSearch(searchQuery, category);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setFilteredProducts(products);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando productos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Nuestros Productos
        </h1>
        <p className="text-gray-600">
          {searchQuery 
            ? `Resultados para "${searchQuery}"` 
            : 'Descubre nuestra selección de productos'
          }
        </p>
      </div>

      {/* Search Results Info */}
      {(searchQuery || selectedCategory) && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-medium">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </span>
              {searchQuery && (
                <span className="ml-2">para "{searchQuery}"</span>
              )}
              {selectedCategory && (
                <span className="ml-2">en {selectedCategory}</span>
              )}
            </div>
            <button
              onClick={handleClearFilters}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedCategory === '' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full border transition-colors ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-gray-500">
            {searchQuery 
              ? `No hay resultados para "${searchQuery}"` 
              : 'No hay productos disponibles en este momento'
            }
          </p>
          {(searchQuery || selectedCategory) && (
            <button
              onClick={handleClearFilters}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver todos los productos
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={product.image_url || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                {product.brand && (
                  <p className="text-gray-500 text-sm mb-2">
                    Marca: {product.brand}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    €{product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Loading component for Suspense fallback
function ProductosLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Cargando productos...</div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function ProductosPage() {
  return (
    <Suspense fallback={<ProductosLoading />}>
      <ProductosContent />
    </Suspense>
  );
}
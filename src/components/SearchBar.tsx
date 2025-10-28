'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/productos?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-4 pr-20 text-gray-900 bg-yellow-50 border-2 border-yellow-400 rounded-lg focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 text-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-200 font-medium"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};
'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export function AuthButtons() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link 
          href="/mis-pedidos" 
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          Mis Pedidos
        </Link>
        <Link 
          href="/perfil" 
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          Mi Perfil
        </Link>
        <span className="text-gray-600">Hola, {user.name}</span>
        <button
          onClick={logout}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <Link 
        href="/login" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Iniciar Sesión
      </Link>
      <Link 
        href="/registro" 
        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
      >
        Registrarse
      </Link>
    </div>
  );
}
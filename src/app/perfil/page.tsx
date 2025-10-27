'use client';

import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Perfil() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.name || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      // In a real app, we would update the user name here
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Acceso Requerido</h2>
            <p className="text-gray-600 mb-6">Por favor, inicia sesión para ver tu perfil.</p>
            <Link 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-block"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Perfil</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Información Personal</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Editar Perfil
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                />
                <p className="text-sm text-gray-500 mt-1">El email no se puede cambiar</p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Nombre Completo</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                    {user.name || 'No especificado'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">ID de Usuario</label>
                <p className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono">
                  {user.id}
                </p>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 transition-colors"
                >
                  {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFullName(user.name || '');
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Acciones de Cuenta</h2>
            <div className="space-y-4">
              <Link 
                href="/carrito"
                className="block w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors"
              >
                🛒 Ver Mi Carrito
              </Link>
              
              <Link 
                href="/productos"
                className="block w-full text-left bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg transition-colors"
              >
                🛍️ Seguir Comprando
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-50 hover:bg-red-100 text-red-700 px-4 py-3 rounded-lg transition-colors"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
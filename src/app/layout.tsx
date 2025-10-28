import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { CartProvider } from '@/context/CartContext'
import { CartIcon } from '@/components/CartIcon'
import { AuthProvider } from '@/context/AuthContext'
import { AuthButtons } from '@/components/AuthButtons'
import { SearchBar } from '@/components/SearchBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mi Mercado - Tu mercado español',
  description: 'Productos frescos y locales de España',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <nav className="bg-white shadow-lg border-b-4 border-yellow-400">
              <div className="container mx-auto px-4">
                {/* Top Row - Logo and User Actions */}
                <div className="flex justify-between items-center py-4">
                  <Link href="/" className="text-2xl font-bold text-gray-800">
                    🛒 Mi Mercado
                  </Link>
                  <div className="flex gap-6 items-center">
                    <AuthButtons />
                    <CartIcon />
                  </div>
                </div>
                
                {/* Bottom Row - Navigation and Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4">
                  {/* Navigation Links */}
                  <div className="flex gap-6">
                    <Link 
                      href="/" 
                      className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                    >
                      Inicio
                    </Link>
                    <Link 
                      href="/productos" 
                      className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                    >
                      Productos
                    </Link>
                    <Link 
                      href="/carrito" 
                      className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                    >
                      Carrito
                    </Link>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="w-full md:w-auto md:flex-1 max-w-2xl">
                    <SearchBar />
                  </div>
                </div>
              </div>
            </nav>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
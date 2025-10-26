import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { CartProvider } from '@/context/CartContext'
import { CartIcon } from '@/components/CartIcon'
import { AuthProvider } from '@/context/AuthContext'
import { AuthButtons } from '@/components/AuthButtons'

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
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <nav className="bg-white shadow-lg">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                  <Link href="/" className="text-2xl font-bold text-gray-800">
                    🛒 Mi Mercado
                  </Link>
                  <div className="flex gap-6 items-center">
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
                    <AuthButtons />
                    <CartIcon />
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
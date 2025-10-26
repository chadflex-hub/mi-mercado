export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            🛒 Mi Mercado
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tu mercado español online - Productos frescos y locales
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
              Comprar Ahora
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold">
              Vender Productos
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">🍎 Alimentos Frescos</h3>
            <p className="text-gray-600">Frutas, verduras y productos locales de calidad</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">🏠 Artesanías</h3>
            <p className="text-gray-600">Productos hechos a mano por artesanos españoles</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">🚚 Envío Rápido</h3>
            <p className="text-gray-600">Entrega en 24-48 horas en toda España</p>
          </div>
        </section>

        <footer className="text-center text-gray-500 mt-12">
          <p>© 2025 Mi Mercado - Todos los derechos reservados</p>
        </footer>
      </div>
    </main>
  );
}
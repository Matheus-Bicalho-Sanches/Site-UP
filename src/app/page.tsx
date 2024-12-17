export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Seu Site</h1>
        <p className="text-xl text-gray-600">
          Uma breve descrição do seu site e seus objetivos
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Cards de Destaque */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Serviço 1</h2>
          <p className="text-gray-600">Descrição do primeiro serviço ou recurso.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Serviço 2</h2>
          <p className="text-gray-600">Descrição do segundo serviço ou recurso.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Serviço 3</h2>
          <p className="text-gray-600">Descrição do terceiro serviço ou recurso.</p>
        </div>
      </section>
    </div>
  )
} 
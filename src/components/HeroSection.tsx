import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080/1a1a1a/ffffff"
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Overlay de fundo com efeito de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 z-10"></div>

      {/* Container principal */}
      <div className="relative z-20 container mx-auto px-4 py-32 sm:py-48">
        <div className="max-w-3xl mx-auto text-center">
          {/* Título principal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Transforme seu Patrimônio em Legado
          </h1>

          {/* Subtítulo */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            Assessoria financeira personalizada para maximizar seus investimentos com segurança e rentabilidade.
          </p>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-300">
              Fale com um Especialista
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg font-semibold transition duration-300">
              Conheça Nossos Serviços
            </button>
          </div>

          {/* Indicadores de credibilidade */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">+1000</div>
              <div className="text-gray-400">Clientes Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">R$ 500M+</div>
              <div className="text-gray-400">Sob Gestão</div>
            </div>
            <div className="text-center md:col-span-1 col-span-2">
              <div className="text-3xl font-bold text-white">15 Anos</div>
              <div className="text-gray-400">de Experiência</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 
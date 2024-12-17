'use client'

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

/**
 * Componente StatsSection
 * 
 * Exibe uma seção de estatísticas com números animados que incrementam quando
 * o componente se torna visível na viewport.
 * 
 * Características:
 * - Animação de números começando do zero
 * - Ativação baseada na visibilidade do elemento
 * - Layout responsivo com grid
 * - Cards com efeitos hover
 */
const StatsSection = () => {
  // Hook para detectar quando o elemento está visível
  // threshold: 0.3 significa que a animação começa quando 30% do elemento está visível
  // triggerOnce: true significa que a animação só acontece uma vez
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Título da seção com quebra de linha responsiva */}
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Contamos com uma equipe especializada<br />
            para trazer soluções personalizadas.
          </h2>

          {/* 
            Grid de estatísticas
            - ref: referência para o observer
            - grid-cols-2: 2 colunas em mobile
            - md:grid-cols-4: 4 colunas em desktop
          */}
          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Card: Valor mínimo */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <span className="text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <div className="text-4xl font-bold text-white text-center mb-1">
                <CountUp 
                  end={50} 
                  duration={2} 
                  start={inView ? 0 : undefined} 
                />{' '}
                <span className="text-2xl">mil</span>
              </div>
              <p className="text-gray-400 text-center text-sm">
                Valor mínimo<br />para investir
              </p>
            </div>

            {/* Card: Cashback */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <span className="text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </span>
              </div>
              <div className="text-4xl font-bold text-white text-center mb-1">
                <CountUp 
                  end={100} 
                  duration={2} 
                  start={inView ? 0 : undefined} 
                />
                <span className="text-2xl">%</span>
              </div>
              <p className="text-gray-400 text-center text-sm">
                de cashback<br />das comissões
              </p>
            </div>

            {/* Card: Custo zero */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <span className="text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <div className="text-4xl font-bold text-white text-center mb-1">
                <CountUp 
                  end={0} 
                  duration={1} 
                  start={inView ? 100 : undefined} 
                />
              </div>
              <p className="text-gray-400 text-center text-sm">
                Custo durante<br />período de teste
              </p>
            </div>

            {/* Card: Atendimento */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <span className="text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </span>
              </div>
              <div className="text-4xl font-bold text-white text-center mb-1">
                <CountUp 
                  end={10} 
                  duration={2} 
                  start={inView ? 0 : undefined} 
                />
              </div>
              <p className="text-gray-400 text-center text-sm">
                Nota do nosso<br />atendimento
              </p>
            </div>
          </div>

          {/* Botão CTA */}
          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-105 hover:shadow-lg">
              Agende uma consultoria gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 
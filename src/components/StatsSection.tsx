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
            {/* Card: Famílias atendidas */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              {/* Ícone */}
              <div className="flex items-center justify-center mb-2">
                <span className="text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
              </div>
              {/* Número animado */}
              <div className="text-4xl font-bold text-white text-center mb-1">
                +<CountUp 
                  end={1000} // Valor final
                  duration={2} // Duração da animação em segundos
                  start={inView ? 0 : undefined} // Começa do 0 quando visível
                />
              </div>
              <p className="text-gray-400 text-center text-sm">
                Famílias<br />atendidas
              </p>
            </div>

            {/* Card: Valor sob aconselhamento */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <span className="text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              {/* Número animado com sufixo */}
              <div className="text-4xl font-bold text-white text-center mb-1">
                +<CountUp 
                  end={5} 
                  duration={2} 
                  start={inView ? 0 : undefined} 
                />{' '}
                <span className="text-2xl">bilhões</span>
              </div>
              <p className="text-gray-400 text-center text-sm">
                Sob<br />aconselhamento
              </p>
            </div>

            {/* Card: Instituições parceiras */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <span className="text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
              </div>
              <div className="text-4xl font-bold text-white text-center mb-1">
                +<CountUp 
                  end={10} 
                  duration={2} 
                  start={inView ? 0 : undefined} 
                />
              </div>
              <p className="text-gray-400 text-center text-sm">
                Instituições parceiras<br />nacionais e internacionais
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
              {/* Número animado com sufixo */}
              <div className="text-4xl font-bold text-white text-center mb-1">
                +<CountUp 
                  end={8} 
                  duration={2} 
                  start={inView ? 0 : undefined} 
                />{' '}
                <span className="text-2xl">milhões</span>
              </div>
              <p className="text-gray-400 text-center text-sm">
                em cashback para<br />nossos clientes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 
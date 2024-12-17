'use client'

import { useState } from 'react';

/**
 * Componente ProcessSection
 * 
 * Exibe o processo de trabalho em um fluxo horizontal com cards interativos
 * que mostram informações adicionais no hover.
 */

// Definição dos dados do processo
const processSteps = [
  {
    title: 'Coleta',
    description: 'Levantamento inicial das informações do cliente',
    details: 'Entendemos seus objetivos e coletamos dados importantes para análise',
    duration: null
  },
  {
    title: 'Pré-Análise',
    description: 'Análise detalhada do perfil e objetivos',
    details: 'Avaliamos sua situação atual e definimos estratégias personalizadas',
    duration: null
  },
  {
    title: 'Reunião Inicial',
    description: 'Reunião com os consultores',
    details: 'Apresentação das análises iniciais e alinhamento de expectativas',
    duration: 'Duração Aprox. de 1h'
  },
  {
    title: 'Recomendações',
    description: 'Validação das informações e entendimentos',
    details: 'Apresentamos nossas recomendações personalizadas',
    duration: null
  },
  {
    title: 'Implementação',
    description: 'Execução das estratégias definidas',
    details: 'Implementamos as soluções de forma estruturada',
    duration: null
  },
  {
    title: 'Monitoramento',
    description: 'Acompanhamento contínuo',
    details: 'Monitoramento constante e ajustes quando necessário',
    duration: null
  }
];

const ProcessSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título da seção */}
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Conheça o nosso serviço
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Um processo estruturado para atender suas necessidades
          </p>

          {/* Grid do processo */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card principal */}
                <div
                  className={`h-32 rounded-lg p-4 transition-all duration-300 cursor-pointer
                    ${hoveredIndex === index 
                      ? 'bg-blue-600 transform -translate-y-2' 
                      : 'bg-blue-600/80 hover:bg-blue-600'}`}
                >
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Informações adicionais no hover */}
                {hoveredIndex === index && (
                  <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-lg shadow-xl z-10">
                    <p className="text-gray-800 text-sm mb-2">
                      {step.details}
                    </p>
                    {step.duration && (
                      <p className="text-blue-600 text-xs font-semibold">
                        {step.duration}
                      </p>
                    )}
                  </div>
                )}

                {/* Linha conectora (exceto no último item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-blue-400/50 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 
import React from 'react';
import Image from 'next/image';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  ShieldCheckIcon, 
  TrophyIcon 
} from '@heroicons/react/24/outline';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho da Seção */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Excelência em Gestão de Patrimônio
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Há mais de uma década, nos dedicamos a proteger e fazer crescer o patrimônio 
              de nossos clientes através de uma gestão profissional e personalizada.
            </p>
          </div>

          {/* Grid de Informações */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Coluna da Esquerda - Texto */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Nossa História
                </h3>
                <p className="text-gray-600">
                  Fundada em 2013, a UP Carteiras Administradas nasceu com o propósito 
                  de democratizar o acesso à gestão profissional de investimentos. 
                  Ao longo dos anos, construímos uma sólida reputação baseada em 
                  resultados consistentes e atendimento personalizado.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Nosso Objetivo
                </h3>
                <p className="text-gray-600">
                  Buscamos ser a principal referência em gestão de patrimônio no Brasil, 
                  oferecendo soluções de investimento que combinam segurança, rentabilidade 
                  e tranquilidade para nossos clientes.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Perfil dos Nossos Clientes
                </h3>
                <p className="text-gray-600">
                  Atendemos investidores que buscam uma gestão profissional de seus 
                  recursos, com patrimônio a partir de R$ 100 mil. Nosso público inclui 
                  profissionais liberais, empresários e famílias que valorizam uma 
                  abordagem personalizada e de longo prazo.
                </p>
              </div>
            </div>

            {/* Coluna da Direita - Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <ChartBarIcon className="w-10 h-10 text-cyan-500 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Retorno Médio</h4>
                <p className="text-gray-600">15,8% a.a. nos últimos 5 anos</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <UserGroupIcon className="w-10 h-10 text-cyan-500 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Clientes Ativos</h4>
                <p className="text-gray-600">Mais de 500 investidores</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <ShieldCheckIcon className="w-10 h-10 text-cyan-500 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Certificações</h4>
                <p className="text-gray-600">CVM, ANBIMA e ISO 9001</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <TrophyIcon className="w-10 h-10 text-cyan-500 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Premiações</h4>
                <p className="text-gray-600">Top 10 Gestoras Independentes</p>
              </div>
            </div>
          </div>

          {/* Diferenciais */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Nossos Diferenciais
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Gestão Ativa
                </h4>
                <p className="text-gray-600">
                  Monitoramento constante do mercado e ajustes táticos para 
                  aproveitar as melhores oportunidades.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Transparência Total
                </h4>
                <p className="text-gray-600">
                  Relatórios detalhados e comunicação clara sobre todas as 
                  decisões de investimento.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Atendimento Exclusivo
                </h4>
                <p className="text-gray-600">
                  Equipe dedicada e especializada para atender suas necessidades 
                  de forma personalizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 
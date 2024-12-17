import React from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function ContatoPage() {
  return (
    <main className="pt-24 sm:pt-28 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Entre em Contato
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Estamos prontos para ajudar você em seus investimentos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulário de Contato */}
            <div className="bg-white rounded-lg shadow-lg p-8 order-2 md:order-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <EnvelopeIcon className="w-6 h-6 mr-2 text-cyan-500" />
                Envie uma mensagem
              </h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Digite seu nome"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Digite seu e-mail"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Como podemos ajudar?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 text-white py-3 px-6 rounded-md hover:bg-cyan-600 transition duration-300"
                >
                  Enviar mensagem
                </button>
              </form>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col order-1 md:order-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <PhoneIcon className="w-6 h-6 mr-2 text-cyan-500" />
                Atendimento via WhatsApp
              </h2>
              <p className="text-gray-600 mb-8">
                Prefere uma conversa mais direta? Clique no botão abaixo para falar com a nossa equipe no WhatsApp.
              </p>
              
              <a
                href="https://wa.me/5543991811304"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  />
                </svg>
                Conversar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 
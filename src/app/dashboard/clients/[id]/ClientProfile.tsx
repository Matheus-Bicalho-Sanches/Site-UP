'use client'

import { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import app from '@/config/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  brokers?: string[];
  managementFee?: number;
  performanceFee?: number;
  investedAmount?: number;
  lastMeeting?: string;
  nextMeeting?: string;
  observations?: string;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  onEdit?: () => void;
}

function Section({ title, children, defaultExpanded = false, onEdit }: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-gray-800 rounded-lg shadow mb-6">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-700/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent section toggle when clicking edit
                onEdit();
              }}
              className="p-1.5 text-gray-400 hover:text-cyan-500 transition-colors"
              title="Editar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform text-gray-400 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {isExpanded && (
        <div className="p-6 border-t border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ClientProfilePageClient({ id }: { id: string }) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const docRef = doc(db, 'clients', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setClient({
            id: docSnap.id,
            ...docSnap.data(),
          } as Client);
        } else {
          router.push('/dashboard/clients');
        }
      } catch (error) {
        console.error('Error fetching client:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, db, router]);

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return 'Não informado';
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!client) {
    return null;
  }

  return (
    <div className="w-[95%] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Perfil do Cliente</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-300 hover:text-white"
        >
          Voltar
        </button>
      </div>

      {/* Informações Básicas */}
      <Section 
        title="Informações Básicas" 
        defaultExpanded={true}
        onEdit={() => router.push(`/dashboard/clients/${id}/edit`)}
      >
        <div className="space-y-0">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Nome</label>
              <p className="text-white text-lg">{client.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">WhatsApp</label>
              <a
                href={`https://wa.me/55${client.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 hover:text-cyan-400 text-lg"
              >
                {formatPhoneNumber(client.phone)}
              </a>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">E-mail</label>
              <p className="text-white text-lg">
                {client.email || <span className="text-gray-500">Não informado</span>}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Última Reunião
              </label>
              <p className="text-white text-lg">
                {client.lastMeeting || <span className="text-gray-500">Não informado</span>}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Próxima Reunião
              </label>
              <p className="text-white text-lg">
                {client.nextMeeting || <span className="text-gray-500">Não informado</span>}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Histórico de Conversas
              </label>
              <Link
                href={`/dashboard/clients/${id}/conversations`}
                className="text-cyan-500 hover:text-cyan-400 text-lg"
              >
                Ver histórico
              </Link>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Patrimônio Investido
              </label>
              <p className="text-white text-lg">
                {formatCurrency(client.investedAmount)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Taxa de Administração
              </label>
              <p className="text-white text-lg">
                {client.managementFee !== undefined && client.managementFee !== null ? (
                  `${client.managementFee}%`
                ) : (
                  <span className="text-gray-500">Não informado</span>
                )}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Taxa de Performance
              </label>
              <p className="text-white text-lg">
                {client.performanceFee !== undefined && client.performanceFee !== null ? (
                  `${client.performanceFee}%`
                ) : (
                  <span className="text-gray-500">Não informado</span>
                )}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Corretoras</label>
              <p className="text-white text-lg">
                {client.brokers?.length ? (
                  client.brokers.join(', ')
                ) : (
                  <span className="text-gray-500">Não informado</span>
                )}
              </p>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">Observações</label>
              <div className="bg-gray-700/50 rounded-lg p-4 min-h-[120px]">
                {client.observations ? (
                  <p className="text-white text-lg whitespace-pre-wrap">
                    {client.observations}
                  </p>
                ) : (
                  <p className="text-gray-500 text-lg">Não informado</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Alocação */}
      <Section 
        title="Alocação" 
        defaultExpanded={true}
        onEdit={() => router.push(`/dashboard/clients/${id}/allocation/edit`)}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Link
              href={`/dashboard/clients/${id}/allocation`}
              className="text-cyan-500 hover:text-cyan-400 text-lg flex items-center gap-2"
            >
              Ver detalhes da alocação
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <p className="text-gray-400">
            Gerencie a alocação mensal dos ativos do cliente, incluindo valores e histórico.
          </p>
        </div>
      </Section>
    </div>
  );
} 
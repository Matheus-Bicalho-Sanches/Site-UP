'use client'

import { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import app from '@/config/firebase';
import { useRouter } from 'next/navigation';

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  brokers?: string[];
  managementFee?: number;
  performanceFee?: number;
  investedAmount?: number;
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
        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/dashboard/clients/${id}/edit`)}
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            Editar
          </button>
          <button
            onClick={() => router.back()}
            className="text-gray-300 hover:text-white"
          >
            Voltar
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow p-6 space-y-6">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Nome</label>
          <p className="text-white text-lg">{client.name}</p>
        </div>

        {/* WhatsApp */}
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

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">E-mail</label>
          <p className="text-white text-lg">
            {client.email || <span className="text-gray-500">Não informado</span>}
          </p>
        </div>

        {/* Corretoras */}
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

        {/* Patrimônio Investido */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Patrimônio Investido
          </label>
          <p className="text-white text-lg">
            {formatCurrency(client.investedAmount)}
          </p>
        </div>

        {/* Taxa de Administração */}
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

        {/* Taxa de Performance */}
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
      </div>
    </div>
  );
} 
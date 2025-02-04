'use client'

import { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from '@/config/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Client {
  id: string;
  name: string;
  phone: string;
  brokers?: string[];
  investedAmount?: number;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsCollection = collection(db, 'clients');
        const clientsSnapshot = await getDocs(clientsCollection);
        const clientsList = clientsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Client));
        
        setClients(clientsList);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [db]);

  const formatPhoneNumber = (phone: string) => {
    // Remove non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as (XX) XXXXX-XXXX
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

  return (
    <div className="w-[95%] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Clientes</h1>
        <Link
          href="/dashboard/clients/new"
          className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
        >
          Adicionar Cliente
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow">
        {clients.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            Nenhum cliente cadastrado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="px-6 py-3 text-gray-300">Nome</th>
                  <th className="px-6 py-3 text-gray-300">WhatsApp</th>
                  <th className="px-6 py-3 text-gray-300">Corretoras</th>
                  <th className="px-6 py-3 text-gray-300">Patrimônio</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => router.push(`/dashboard/clients/${client.id}`)}
                    className="border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer"
                  >
                    <td className="px-6 py-4 text-white">{client.name}</td>
                    <td className="px-6 py-4 text-white">
                      <a
                        href={`https://wa.me/55${client.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-500 hover:text-cyan-400"
                        onClick={(e) => e.stopPropagation()} // Prevent row click when clicking WhatsApp link
                      >
                        {formatPhoneNumber(client.phone)}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {client.brokers?.length ? (
                        <span className="text-gray-300">
                          {client.brokers.join(', ')}
                        </span>
                      ) : (
                        <span className="text-gray-500">Não informado</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {formatCurrency(client.investedAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 
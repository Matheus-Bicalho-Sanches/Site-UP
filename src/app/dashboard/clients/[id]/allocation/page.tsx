'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import app from '@/config/firebase';

interface Investment {
  name: string;
  value: number;
}

interface Asset {
  type: string;
  investments: Investment[];
  date: string;
}

interface AllocationRecord {
  id: string;
  clientId: string;
  assets: Asset[];
  totalValue: number;
  date: string;
  lastUpdate: string;
}

export default function AllocationPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<{ name: string } | null>(null);
  const [allocations, setAllocations] = useState<AllocationRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch client data
        const clientDoc = await getDoc(doc(db, 'clients', params.id));
        if (!clientDoc.exists()) {
          router.push('/dashboard/clients');
          return;
        }
        setClient({ name: clientDoc.data().name });

        // Fetch all allocations for this client
        const allocationsRef = collection(db, 'allocations');
        const q = query(
          allocationsRef,
          where('clientId', '==', params.id),
          orderBy('date', 'desc')
        );
        const querySnapshot = await getDocs(q);
        
        const records = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AllocationRecord[];
        
        setAllocations(records);
        if (records.length > 0) {
          setSelectedDate(records[0].date);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, db, router]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const selectedAllocation = selectedDate
    ? allocations.find(a => a.date === selectedDate)
    : null;

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
        <div>
          <h1 className="text-2xl font-bold text-white">Alocação</h1>
          <p className="text-gray-400">Cliente: {client?.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(`/dashboard/clients/${params.id}/allocation/edit`)}
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
          >
            Nova Alocação
          </button>
          <button
            onClick={() => router.back()}
            className="text-gray-300 hover:text-white"
          >
            Voltar
          </button>
        </div>
      </div>

      {allocations.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-400">Nenhuma alocação registrada.</p>
          <button
            onClick={() => router.push(`/dashboard/clients/${params.id}/allocation/edit`)}
            className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
          >
            Adicionar Primeira Alocação
          </button>
        </div>
      ) : (
        <>
          {/* Date selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Selecione a Data
            </label>
            <select
              value={selectedDate || ''}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full md:w-auto px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {allocations.map((allocation) => (
                <option key={allocation.date} value={allocation.date}>
                  {formatDate(allocation.date)}
                </option>
              ))}
            </select>
          </div>

          {selectedAllocation && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="text-gray-400 mb-2">Patrimônio Total</div>
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(selectedAllocation.totalValue)}
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="text-gray-400 mb-2">Data de Referência</div>
                  <div className="text-2xl font-bold text-white">
                    {formatDate(selectedAllocation.date)}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="text-gray-400 mb-2">Última Atualização</div>
                  <div className="text-2xl font-bold text-white">
                    {new Date(selectedAllocation.lastUpdate).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>

              {/* Assets Table */}
              <div className="bg-gray-800 rounded-lg shadow">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-700">
                        <th className="px-6 py-3 text-gray-300">Tipo</th>
                        <th className="px-6 py-3 text-gray-300">Investimento</th>
                        <th className="px-6 py-3 text-gray-300">Valor</th>
                        <th className="px-6 py-3 text-gray-300">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedAllocation.assets.map((asset) => (
                        <>
                          {asset.investments.map((investment, investmentIndex) => (
                            <tr
                              key={`${asset.type}-${investmentIndex}`}
                              className="border-b border-gray-700 hover:bg-gray-700/50"
                            >
                              {investmentIndex === 0 && (
                                <td 
                                  className="px-6 py-4 text-white"
                                  rowSpan={asset.investments.length}
                                >
                                  {asset.type}
                                </td>
                              )}
                              <td className="px-6 py-4 text-white">
                                {investment.name || <span className="text-gray-500">Não informado</span>}
                              </td>
                              <td className="px-6 py-4 text-white">{formatCurrency(investment.value)}</td>
                              <td className="px-6 py-4 text-white">
                                {((investment.value / selectedAllocation.totalValue) * 100).toFixed(2)}%
                              </td>
                            </tr>
                          ))}
                          {/* Add subtotal row for each asset type */}
                          <tr className="bg-gray-700/30">
                            <td className="px-6 py-3 text-gray-300 font-medium" colSpan={2}>
                              Total {asset.type}
                            </td>
                            <td className="px-6 py-3 text-gray-300 font-medium">
                              {formatCurrency(asset.investments.reduce((sum, inv) => sum + inv.value, 0))}
                            </td>
                            <td className="px-6 py-3 text-gray-300 font-medium">
                              {((asset.investments.reduce((sum, inv) => sum + inv.value, 0) / selectedAllocation.totalValue) * 100).toFixed(2)}%
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Edit Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => router.push(`/dashboard/clients/${params.id}/allocation/edit?date=${selectedAllocation.date}`)}
                  className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
                >
                  Editar Alocação
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
} 
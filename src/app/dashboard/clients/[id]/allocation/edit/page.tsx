'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
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
  id?: string;
  clientId: string;
  assets: Asset[];
  totalValue: number;
  date: string;
  lastUpdate: string;
}

export default function AllocationEditPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [client, setClient] = useState<{ name: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [assets, setAssets] = useState<Asset[]>([
    { type: 'Renda Fixa', investments: [{ name: '', value: 0 }], date: selectedDate },
    { type: 'Renda Variável', investments: [{ name: '', value: 0 }], date: selectedDate },
    { type: 'Fundos Imobiliários', investments: [{ name: '', value: 0 }], date: selectedDate },
    { type: 'Internacional', investments: [{ name: '', value: 0 }], date: selectedDate },
    { type: 'Criptoativos', investments: [{ name: '', value: 0 }], date: selectedDate },
  ]);
  const [existingRecord, setExistingRecord] = useState<AllocationRecord | null>(null);
  
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

        // Fetch allocation data for selected date
        const allocationsRef = collection(db, 'allocations');
        const q = query(
          allocationsRef,
          where('clientId', '==', params.id),
          where('date', '==', selectedDate)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const record = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data()
          } as AllocationRecord;
          setExistingRecord(record);
          setAssets(record.assets);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, selectedDate, db, router]);

  const currencyToNumber = (value: string): number => {
    return Number(value.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
  };

  const handleInvestmentChange = (assetIndex: number, investmentIndex: number, field: keyof Investment, value: string | number) => {
    const newAssets = [...assets];
    if (field === 'value') {
      // Remove all non-numeric characters
      const numericValue = value.toString().replace(/\D/g, '');
      
      // Convert to number and divide by 100 to handle cents
      const finalValue = numericValue ? Number(numericValue) / 100 : 0;

      newAssets[assetIndex].investments[investmentIndex] = {
        ...newAssets[assetIndex].investments[investmentIndex],
        [field]: finalValue
      };
    } else {
      newAssets[assetIndex].investments[investmentIndex] = {
        ...newAssets[assetIndex].investments[investmentIndex],
        [field]: value
      };
    }
    setAssets(newAssets);
  };

  const addInvestment = (assetIndex: number) => {
    const newAssets = [...assets];
    newAssets[assetIndex].investments.push({ name: '', value: 0 });
    setAssets(newAssets);
  };

  const removeInvestment = (assetIndex: number, investmentIndex: number) => {
    const newAssets = [...assets];
    if (newAssets[assetIndex].investments.length > 1) {
      newAssets[assetIndex].investments.splice(investmentIndex, 1);
      setAssets(newAssets);
    }
  };

  const formatCurrency = (value: number) => {
    if (value === 0) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const totalValue = assets.reduce((sum, asset) => 
        sum + asset.investments.reduce((assetSum, inv) => assetSum + inv.value, 0), 0
      );
      
      const allocationData: Omit<AllocationRecord, 'id'> = {
        clientId: params.id,
        assets: assets.map(asset => ({
          ...asset,
          date: selectedDate
        })),
        totalValue,
        date: selectedDate,
        lastUpdate: new Date().toISOString()
      };

      if (existingRecord?.id) {
        // Update existing record
        await updateDoc(doc(db, 'allocations', existingRecord.id), allocationData);
      } else {
        // Create new record
        await addDoc(collection(db, 'allocations'), allocationData);
      }

      router.push(`/dashboard/clients/${params.id}/allocation`);
    } catch (error) {
      console.error('Error saving allocation:', error);
      alert('Erro ao salvar alocação. Por favor, tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const deleteAllocation = async () => {
    if (!existingRecord?.id || !confirm('Tem certeza que deseja excluir esta alocação?')) {
      return;
    }

    setSaving(true);
    try {
      await deleteDoc(doc(db, 'allocations', existingRecord.id));
      router.push(`/dashboard/clients/${params.id}/allocation`);
    } catch (error) {
      console.error('Error deleting allocation:', error);
      alert('Erro ao excluir alocação. Por favor, tente novamente.');
    } finally {
      setSaving(false);
    }
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
        <div>
          <h1 className="text-2xl font-bold text-white">Editar Alocação</h1>
          <p className="text-gray-400">Cliente: {client?.name}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Data de Referência
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="space-y-8">
            {assets.map((asset, assetIndex) => (
              <div key={asset.type} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">{asset.type}</h3>
                  <button
                    type="button"
                    onClick={() => addInvestment(assetIndex)}
                    className="text-sm text-cyan-500 hover:text-cyan-400"
                  >
                    + Adicionar Investimento
                  </button>
                </div>
                
                {asset.investments.map((investment, investmentIndex) => (
                  <div key={investmentIndex} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end border-b border-gray-700 pb-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Nome do Investimento
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: CDB Banco X"
                        value={investment.name}
                        onChange={(e) => handleInvestmentChange(assetIndex, investmentIndex, 'name', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Valor
                      </label>
                      <input
                        type="text"
                        placeholder="R$ 0,00"
                        value={investment.value > 0 ? formatCurrency(investment.value) : ''}
                        onChange={(e) => handleInvestmentChange(assetIndex, investmentIndex, 'value', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div className="flex justify-end">
                      {asset.investments.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInvestment(assetIndex, investmentIndex)}
                          className="px-3 py-2 text-red-500 hover:text-red-400"
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-between space-x-3">
            <div>
              {existingRecord?.id && (
                <button
                  type="button"
                  onClick={deleteAllocation}
                  className="px-4 py-2 text-red-500 hover:text-red-400"
                  disabled={saving}
                >
                  Excluir
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-gray-300 hover:text-white"
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 disabled:opacity-50"
                disabled={saving}
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import app from '@/config/firebase';

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    brokers: [''],
    investedAmount: '',
  });

  const db = getFirestore(app);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Remove formatting from phone number before saving
      const cleanPhone = formData.phone.replace(/\D/g, '');
      
      // Convert formatted amount to number
      const cleanAmount = formData.investedAmount 
        ? parseFloat(formData.investedAmount.replace(/[R$\s.]/g, '').replace(',', '.'))
        : null;

      const dataToSubmit = {
        ...formData,
        phone: cleanPhone,
        brokers: formData.brokers.filter(broker => broker.trim() !== ''),
        investedAmount: cleanAmount,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'clients'), dataToSubmit);
      router.push('/dashboard/clients');
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Erro ao adicionar cliente. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length <= 11) {
      // Format as (XX) XXXXX-XXXX
      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length > 10) {
        value = `${value.slice(0, 10)}-${value.slice(10)}`;
      }
      
      setFormData({ ...formData, phone: value });
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Convert to number with 2 decimal places
    const numberValue = parseInt(value) / 100;
    
    // Format as currency
    if (value) {
      const formatted = numberValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      setFormData({ ...formData, investedAmount: formatted });
    } else {
      setFormData({ ...formData, investedAmount: '' });
    }
  };

  const handleBrokerChange = (index: number, value: string) => {
    const newBrokers = [...formData.brokers];
    newBrokers[index] = value;
    setFormData({ ...formData, brokers: newBrokers });
  };

  const addBrokerField = () => {
    setFormData({ ...formData, brokers: [...formData.brokers, ''] });
  };

  const removeBrokerField = (index: number) => {
    if (formData.brokers.length > 1) {
      const newBrokers = formData.brokers.filter((_, i) => i !== index);
      setFormData({ ...formData, brokers: newBrokers });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Novo Cliente</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-300 hover:text-white"
        >
          Voltar
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              WhatsApp
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="(00) 00000-0000"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Corretoras
            </label>
            <div className="space-y-2">
              {formData.brokers.map((broker, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={broker}
                    onChange={(e) => handleBrokerChange(index, e.target.value)}
                    placeholder="Nome da corretora"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  {formData.brokers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBrokerField(index)}
                      className="px-3 py-2 text-red-500 hover:text-red-400"
                    >
                      Remover
                    </button>
                  )}
                  {index === formData.brokers.length - 1 && (
                    <button
                      type="button"
                      onClick={addBrokerField}
                      className="px-3 py-2 text-cyan-500 hover:text-cyan-400"
                    >
                      Adicionar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Patrimônio Investido
            </label>
            <input
              type="text"
              value={formData.investedAmount}
              onChange={handleAmountChange}
              placeholder="R$ 0,00"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-300 hover:text-white"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Adicionando...' : 'Adicionar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
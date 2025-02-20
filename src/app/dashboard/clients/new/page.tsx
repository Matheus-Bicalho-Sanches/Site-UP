'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import app from '@/config/firebase';
import type { CreateCustomerData } from '@/lib/asaas';

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brokers: [''],
    managementFee: '',
    performanceFee: '',
    investedAmount: '',
    cpf: '',
  });

  const db = getFirestore(app);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validação dos campos obrigatórios
      if (!formData.name || !formData.email || !formData.cpf) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
      }

      // Log dos dados que serão enviados
      console.log('Dados do formulário:', {
        name: formData.name,
        email: formData.email,
        cpfCnpj: formData.cpf,
        mobilePhone: formData.phone
      });

      // Cria o cliente no Asaas através da nossa API
      const response = await fetch('/api/asaas/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          cpfCnpj: formData.cpf,
          mobilePhone: formData.phone
        } as CreateCustomerData)
      });

      // Log da resposta
      console.log('Status da resposta:', response.status);
      
      const responseData = await response.json();
      console.log('Dados da resposta:', responseData);

      if (!response.ok) {
        throw new Error(responseData.error || 'Erro ao criar cliente');
      }

      // Salva no Firestore
      const docRef = await addDoc(collection(db, 'clients'), {
        ...formData,
        asaasId: responseData.id,
        createdAt: new Date().toISOString()
      });

      router.push(`/dashboard/clients/${docRef.id}`);
    } catch (error: any) {
      console.error('Erro ao criar cliente:', error);
      alert(error.message || 'Erro ao criar cliente. Por favor, tente novamente.');
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
              name="name"
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
              name="phone"
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
              E-mail
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              CPF
            </label>
            <input
              name="cpf"
              type="text"
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Taxa de Administração (%)
              </label>
              <input
                type="number"
                value={formData.managementFee}
                onChange={(e) => setFormData({ ...formData, managementFee: e.target.value })}
                placeholder="0.00"
                step="0.01"
                min="0"
                max="100"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Taxa de Performance (%)
              </label>
              <input
                type="number"
                value={formData.performanceFee}
                onChange={(e) => setFormData({ ...formData, performanceFee: e.target.value })}
                placeholder="0.00"
                step="0.01"
                min="0"
                max="100"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
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
              {loading ? 'Criando...' : 'Criar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
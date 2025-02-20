'use client'

import { useState } from 'react'
import { asaasClient } from '@/lib/asaas'

interface CreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (tokenizedCard: any) => void;
}

export function CreditCardModal({ isOpen, onClose, onSuccess }: CreditCardModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    holderName: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    ccv: ''
  });

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const formatExpiryMonth = (value: string) => {
    const month = value.replace(/\D/g, '');
    if (month && parseInt(month) > 12) return '12';
    return month;
  };

  const formatExpiryYear = (value: string) => {
    const year = value.replace(/\D/g, '');
    const currentYear = new Date().getFullYear();
    if (year.length === 4 && parseInt(year) < currentYear) {
      return currentYear.toString();
    }
    return year;
  };

  const formatCCV = (value: string) => {
    return value.replace(/\D/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Remove espaços do número do cartão antes de enviar
      const cardData = {
        ...formData,
        number: formData.number.replace(/\s/g, '')
      };

      const tokenizedCard = await asaasClient.tokenizeCard(cardData);
      onSuccess(tokenizedCard);
      onClose();
    } catch (error) {
      console.error('Erro ao tokenizar cartão:', error);
      alert('Erro ao cadastrar cartão. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1C2127] text-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Cadastrar Cartão de Crédito</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Nome no Cartão</label>
            <input
              value={formData.holderName}
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                holderName: e.target.value.toUpperCase() 
              }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="NOME COMO ESTÁ NO CARTÃO"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Número do Cartão</label>
            <input
              value={formData.number}
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                number: formatCardNumber(e.target.value) 
              }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              maxLength={19} // 16 dígitos + 3 espaços
              placeholder="0000 0000 0000 0000"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400">Mês</label>
              <input
                value={formData.expiryMonth}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  expiryMonth: formatExpiryMonth(e.target.value) 
                }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                maxLength={2}
                placeholder="MM"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Ano</label>
              <input
                value={formData.expiryYear}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  expiryYear: formatExpiryYear(e.target.value) 
                }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                maxLength={4}
                placeholder="AAAA"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">CCV</label>
              <input
                value={formData.ccv}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  ccv: formatCCV(e.target.value) 
                }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                maxLength={4}
                placeholder="123"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Cartão'}
          </button>
        </form>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (method: 'pix' | 'card') => Promise<void>
  hasCard: boolean
  value: number
}

export default function PaymentModal({ isOpen, onClose, onConfirm, hasCard, value }: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handlePayment = async (method: 'pix' | 'card') => {
    try {
      setLoading(true)
      setError(null)
      await onConfirm(method)
      onClose()
    } catch (error: any) {
      setError(error.message || 'Erro ao processar pagamento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4">Receber Pagamento</h2>
        
        <div className="space-y-4">
          <p className="text-gray-400">
            Valor a receber: {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>

          <div className="space-y-3">
            {hasCard && (
              <button
                onClick={() => handlePayment('card')}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h.01M11 15h.01M15 15h.01M19 15h.01M7 12h.01M11 12h.01M15 12h.01M19 12h.01" />
                </svg>
                Cartão Cadastrado
              </button>
            )}

            <button
              onClick={() => handlePayment('pix')}
              disabled={loading}
              className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              PIX
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full mt-4 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
} 
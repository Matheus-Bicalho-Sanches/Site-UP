'use client'

export default function PaymentsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Pagamentos</h1>

      {/* Card Status */}
      <div className="bg-[#1C2127] rounded-lg shadow p-6">
        <div className="pb-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Método de Pagamento</h2>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-4">
            <input 
              type="checkbox" 
              id="card-registered"
              className="w-4 h-4 rounded border-gray-700 bg-gray-800"
            />
            <label htmlFor="card-registered" className="text-sm text-gray-400">
              Cartão de crédito cadastrado
            </label>
          </div>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Cadastrar cartão
          </button>
        </div>
      </div>

      {/* Histórico de Cobranças */}
      <div className="bg-[#1C2127] rounded-lg shadow p-6">
        <div className="pb-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Histórico de Cobranças</h2>
        </div>
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Data</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Descrição</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-gray-300">10/03/2024</td>
                  <td className="py-3 px-4 text-gray-300">Mensalidade Março/2024</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-sm">
                      Pago
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-300">R$ 199,90</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-gray-300">10/02/2024</td>
                  <td className="py-3 px-4 text-gray-300">Mensalidade Fevereiro/2024</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-sm">
                      Pago
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-300">R$ 199,90</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 
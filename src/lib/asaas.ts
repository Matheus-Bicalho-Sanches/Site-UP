interface AsaasConfig {
  apiKey: string;
  environment: 'sandbox' | 'production';
}

interface CreditCardData {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
}

interface TokenizedCard {
  creditCardToken: string;
  creditCardNumber: string; // últimos 4 dígitos
  creditCardBrand: string;
  creditCardToken: string;
}

class AsaasClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(config: AsaasConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.environment === 'sandbox' 
      ? 'https://sandbox.asaas.com/api/v3'
      : 'https://api.asaas.com/api/v3';
  }

  async tokenizeCard(cardData: CreditCardData): Promise<TokenizedCard> {
    const response = await fetch(`${this.baseUrl}/creditCard/tokenize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': this.apiKey
      },
      body: JSON.stringify({
        customer: cardData.holderName,
        creditCard: {
          holderName: cardData.holderName,
          number: cardData.number,
          expiryMonth: cardData.expiryMonth,
          expiryYear: cardData.expiryYear,
          ccv: cardData.ccv
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao tokenizar cartão');
    }

    return response.json();
  }

  async createCustomer(data: {
    name: string;
    email: string;
    cpfCnpj: string;
  }) {
    const response = await fetch(`${this.baseUrl}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': this.apiKey
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar cliente');
    }

    return response.json();
  }
}

// Instância singleton do cliente
export const asaasClient = new AsaasClient({
  apiKey: process.env.NEXT_PUBLIC_ASAAS_API_KEY || '',
  environment: (process.env.NEXT_PUBLIC_ASAAS_ENVIRONMENT || 'sandbox') as 'sandbox' | 'production'
}); 
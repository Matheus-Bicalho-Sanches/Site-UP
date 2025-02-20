export interface CreateCustomerData {
  name: string;
  email: string;
  cpfCnpj: string;
  mobilePhone?: string;
}

export interface AsaasCustomerResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  mobilePhone: string;
  cpfCnpj: string;
  createdAt: string;
}

export interface TokenizeCardData {
  customer: string;
  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  }
}

const ASAAS_BASE_URL = process.env.ASAAS_ENVIRONMENT === 'production'
  ? 'https://api.asaas.com/v3'
  : 'https://api-sandbox.asaas.com/v3';

export async function createAsaasCustomer(data: CreateCustomerData): Promise<AsaasCustomerResponse> {
  try {
    const response = await fetch(`${ASAAS_BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': process.env.ASAAS_API_KEY || '',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        cpfCnpj: data.cpfCnpj.replace(/\D/g, ''),
        phone: data.mobilePhone?.replace(/\D/g, ''),
        notificationDisabled: false
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.description || error.message || 'Erro ao criar cliente');
    }

    return response.json();
  } catch (error: any) {
    console.error('Erro ao criar cliente no Asaas:', error);
    throw new Error(error.message || 'Erro ao criar cliente no Asaas');
  }
}

export async function tokenizeCard(data: TokenizeCardData) {
  try {
    const response = await fetch(`${ASAAS_BASE_URL}/creditCard/tokenize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': process.env.ASAAS_API_KEY || '',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.description || error.message || 'Erro ao tokenizar cartão');
    }

    return response.json();
  } catch (error: any) {
    console.error('Erro ao tokenizar cartão:', error);
    throw new Error(error.message || 'Erro ao tokenizar cartão');
  }
} 
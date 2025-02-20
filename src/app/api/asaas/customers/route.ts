import { NextResponse } from 'next/server'
import { CreateCustomerData } from '@/lib/asaas'

// Configuração do Asaas (APENAS PARA TESTE)
const config = {
  apiKey: '$aact_MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjVkMjI1OGY3LTQ5YmQtNDYzNi1hNGRhLTFjOWJjN2YzODg5YTo6JGFhY2hfOGYwNTc5YmUtMmFhYy00NTkzLWExZjYtNDI3MzFjNWYxMjM0',
  environment: 'production',
  baseUrl: 'https://api.asaas.com/v3'
}

export async function POST(request: Request) {
  try {
    // Log inicial para debug
    console.log('Configuração:', {
      baseUrl: config.baseUrl,
      apiKeyLength: config.apiKey.length,
      apiKeyStart: config.apiKey.substring(0, 20),
      environment: config.environment
    });

    const data: CreateCustomerData = await request.json();

    const payload = {
      name: data.name,
      email: data.email,
      cpfCnpj: data.cpfCnpj.replace(/\D/g, ''),
      phone: data.mobilePhone?.replace(/\D/g, ''),
      notificationDisabled: false,
      externalReference: `up_${Date.now()}` // Adicionando referência externa
    };

    // Teste primeiro com uma chamada GET para verificar a autenticação
    const testResponse = await fetch(`${config.baseUrl}/customers?limit=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access_token': config.apiKey
      }
    });

    console.log('Teste de autenticação:', {
      status: testResponse.status,
      ok: testResponse.ok
    });

    // Se o teste falhar, vamos tentar entender o erro
    if (!testResponse.ok) {
      const testText = await testResponse.text();
      console.error('Erro no teste de autenticação:', testText);
      throw new Error(`Falha na autenticação: ${testResponse.status}`);
    }

    // Se chegou aqui, a autenticação está ok
    const response = await fetch(`${config.baseUrl}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': config.apiKey
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    console.log('Resposta completa:', {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText
    });

    let responseData;
    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch (e) {
      console.error('Erro ao fazer parse da resposta:', e);
      throw new Error('Erro ao processar resposta do Asaas');
    }

    if (!response.ok) {
      throw new Error(
        responseData?.errors?.[0]?.description || 
        responseData?.message || 
        'Erro ao criar cliente'
      );
    }

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('Erro detalhado:', {
      message: error.message,
      cause: error.cause,
      stack: error.stack
    });

    return NextResponse.json(
      { error: error.message || 'Erro interno do servidor' },
      { status: error.status || 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ASAAS_API_KEY: process.env.ASAAS_API_KEY ? 'Presente' : 'Ausente',
    ASAAS_ENVIRONMENT: process.env.ASAAS_ENVIRONMENT || 'não definido'
  });
} 
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const ASAAS_BASE_URL = 'https://api.asaas.com/v3';

export async function POST(request: Request) {
  try {
    const { paymentId, method, clientId } = await request.json();
    console.log('Recebendo requisição:', { paymentId, method, clientId });

    // Buscar o pagamento no Firestore
    const paymentDoc = await adminDb.collection('payments').doc(paymentId).get();
    if (!paymentDoc.exists) {
      return NextResponse.json({ error: 'Pagamento não encontrado' }, { status: 404 });
    }
    const paymentData = paymentDoc.data();
    if (!paymentData) {
      return NextResponse.json({ error: 'Dados do pagamento não encontrados' }, { status: 404 });
    }
    console.log('Dados do pagamento:', paymentData);
    
    // Se for pagamento com cartão, processar via Asaas
    if (method === 'CREDIT_CARD') {
      const clientDoc = await adminDb.collection('clients').doc(clientId).get();
      if (!clientDoc.exists) {
        return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
      }

      const clientData = clientDoc.data();
      if (!clientData) {
        return NextResponse.json({ error: 'Dados do cliente não encontrados' }, { status: 404 });
      }
      console.log('Dados do cliente:', clientData);

      if (!clientData?.cardTokenId) {
        return NextResponse.json({ error: 'Cliente não possui cartão cadastrado' }, { status: 400 });
      }

      // Headers conforme documentação oficial
      const headers = {
        'Content-Type': 'application/json',
        'access_token': ASAAS_API_KEY,
        'User-Agent': 'UP Gestão'
      };

      // Simplificar o payload
      const asaasPayload = {
        customer: clientData.asaasId,
        billingType: 'CREDIT_CARD',
        value: paymentData.value || 0, // Valor padrão caso seja undefined
        dueDate: paymentData.dueDate || new Date().toISOString().split('T')[0], // Data atual como padrão
        description: 'Pagamento de serviços',
        externalReference: paymentId,
        creditCardToken: clientData.cardTokenId
      };

      console.log('Enviando para Asaas:', {
        method: 'POST',
        url: '/payments',
        headers: {
          ...headers,
          'access_token': `${ASAAS_API_KEY?.substring(0, 10)}...`
        },
        payload: asaasPayload
      });

      // Criar pagamento no Asaas
      const response = await fetch(`${ASAAS_BASE_URL}/payments`, {
        method: 'POST',
        headers,
        body: JSON.stringify(asaasPayload)
      });

      const responseText = await response.text();
      console.log('Resposta do Asaas:', {
        statusCode: response.status,
        url: '/payments',
        headers: Object.fromEntries(response.headers.entries()),
        body: responseText
      });

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.errors?.[0]?.description || 'Erro ao processar pagamento');
        } catch (e) {
          console.error('Erro ao parsear resposta do Asaas:', e);
          throw new Error('Erro ao processar pagamento com cartão');
        }
      }

      // Tentar parsear a resposta
      const asaasResponse = JSON.parse(responseText);
      
      // Atualizar o pagamento com o ID do Asaas
      await adminDb.collection('payments').doc(paymentId).update({
        asaasId: asaasResponse.id
      });
    }

    // Atualizar status no Firestore (tanto para PIX quanto para cartão)
    await adminDb.collection('payments').doc(paymentId).update({
      status: 'paid',
      paidAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paymentMethod: method
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao processar pagamento:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { ASAAS_CONFIG } from '@/lib/asaas';

export async function POST(request: Request) {
  try {
    console.log('Iniciando processamento de pagamento...');
    console.log('URL Base Asaas:', ASAAS_CONFIG.BASE_URL);
    
    const { paymentId, method, clientId } = await request.json();
    console.log('Dados recebidos:', { paymentId, method, clientId });

    // Verificar se a API key existe
    if (!ASAAS_CONFIG.API_KEY) {
      throw new Error('ASAAS_API_KEY não configurada');
    }

    // Buscar o pagamento no Firestore
    const paymentDoc = await adminDb.collection('payments').doc(paymentId).get();
    if (!paymentDoc.exists) {
      console.error('Pagamento não encontrado:', paymentId);
      return NextResponse.json({ error: 'Pagamento não encontrado' }, { status: 404 });
    }

    const paymentData = paymentDoc.data();
    if (!paymentData) {
      console.error('Dados do pagamento não encontrados');
      return NextResponse.json({ error: 'Dados do pagamento não encontrados' }, { status: 404 });
    }

    // Validar os campos necessários
    if (!paymentData.value || !paymentData.dueDate) {
      console.error('Dados do pagamento incompletos:', { value: paymentData.value, dueDate: paymentData.dueDate });
      return NextResponse.json({ error: 'Dados do pagamento incompletos' }, { status: 400 });
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

      // Headers do Asaas
      const headers = {
        ...ASAAS_CONFIG.HEADERS,
        'User-Agent': 'UP Gestão'
      };

      // Simplificar o payload
      const asaasPayload = {
        customer: clientData.asaasId,
        billingType: 'CREDIT_CARD',
        value: paymentData.value,
        dueDate: paymentData.dueDate,
        description: 'Pagamento de serviços',
        externalReference: paymentId,
        creditCardToken: clientData.cardTokenId
      };

      console.log('Enviando para Asaas:', {
        method: 'POST',
        url: '/payments',
        headers: {
          ...headers,
          'access_token': `${ASAAS_CONFIG.API_KEY?.substring(0, 10)}...`
        },
        payload: asaasPayload
      });

      // Criar pagamento no Asaas
      const response = await fetch(`${ASAAS_CONFIG.BASE_URL}/payments`, {
        method: 'POST',
        headers,
        body: JSON.stringify(asaasPayload)
      });

      // Se a resposta não for ok, tentar obter mais detalhes do erro
      if (!response.ok) {
        const responseText = await response.text();
        console.error('Erro na resposta do Asaas:', {
          status: response.status,
          statusText: response.statusText,
          body: responseText
        });

        try {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.errors?.[0]?.description || 'Erro ao processar pagamento');
        } catch (e) {
          if (response.status === 401) {
            throw new Error('Erro de autenticação com o Asaas. Verifique a chave API.');
          }
          throw new Error(`Erro ao processar pagamento: ${response.statusText}`);
        }
      }

      // Tentar parsear a resposta
      const asaasResponse = JSON.parse(await response.text());
      
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
    console.error('Erro detalhado ao processar pagamento:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: error.message.includes('autenticação') ? 401 : 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const ASAAS_BASE_URL = process.env.ASAAS_ENVIRONMENT === 'production'
  ? 'https://api.asaas.com/v3'
  : 'https://api-sandbox.asaas.com/v3';

export async function POST(request: Request) {
  try {
    const { paymentId, method, clientId } = await request.json();

    // Buscar o pagamento no Firestore primeiro
    const paymentDoc = await adminDb.collection('payments').doc(paymentId).get();
    if (!paymentDoc.exists) {
      return NextResponse.json({ error: 'Pagamento não encontrado' }, { status: 404 });
    }
    const paymentData = paymentDoc.data();
    
    // Buscar dados do cliente apenas se for pagamento com cartão
    if (method === 'card') {
      const clientDoc = await adminDb.collection('clients').doc(clientId).get();
      
      if (!clientDoc.exists) {
        return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
      }

      const clientData = clientDoc.data();
      console.log('Client Data:', clientData);

      if (!clientData?.cardTokenId) {
        return NextResponse.json({ error: 'Cliente não possui cartão cadastrado' }, { status: 400 });
      }

      if (!clientData?.asaasId) {
        return NextResponse.json({ error: 'Cliente não possui ID do Asaas' }, { status: 400 });
      }

      if (!paymentData?.asaasId) {
        return NextResponse.json({ error: 'Pagamento não possui ID do Asaas' }, { status: 400 });
      }

      try {
        // Processar pagamento com cartão via Asaas usando o asaasId do pagamento
        const response = await fetch(`${ASAAS_BASE_URL}/payments/${paymentData.asaasId}/payWithCreditCard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'access_token': ASAAS_API_KEY || ''
          },
          body: JSON.stringify({
            customer: clientData.asaasId,
            creditCard: {
              creditCardToken: clientData.cardTokenId
            },
            creditCardHolderInfo: {
              name: clientData.name,
              email: clientData.email,
              cpfCnpj: clientData.cpfCnpj,
              phone: clientData.phone
            }
          })
        });

        const responseText = await response.text();
        console.log('Asaas Response:', responseText);

        if (!response.ok) {
          let errorMessage = 'Erro ao processar pagamento com cartão';
          try {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.errors?.[0]?.description || errorMessage;
          } catch (e) {
            console.error('Erro ao parsear resposta do Asaas:', e);
          }
          throw new Error(errorMessage);
        }
      } catch (error: any) {
        console.error('Erro na chamada ao Asaas:', error);
        return NextResponse.json(
          { error: error.message || 'Erro ao processar pagamento com cartão' },
          { status: 500 }
        );
      }
    }

    try {
      // Atualizar status do pagamento no Firestore
      await adminDb.collection('payments').doc(paymentId).update({
        status: 'paid',
        paidAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Erro ao atualizar Firestore:', error);
      return NextResponse.json(
        { error: 'Erro ao atualizar status do pagamento' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao processar pagamento:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
} 
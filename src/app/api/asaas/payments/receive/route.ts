import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const ASAAS_BASE_URL = 'https://api.asaas.com/v3';

export async function POST(request: Request) {
  try {
    const { paymentId, method, clientId } = await request.json();

    // Buscar o pagamento no Firestore
    const paymentDoc = await adminDb.collection('payments').doc(paymentId).get();
    if (!paymentDoc.exists) {
      return NextResponse.json({ error: 'Pagamento não encontrado' }, { status: 404 });
    }
    const paymentData = paymentDoc.data();
    
    // Se for pagamento com cartão, processar via Asaas
    if (method === 'CREDIT_CARD') {
      const clientDoc = await adminDb.collection('clients').doc(clientId).get();
      if (!clientDoc.exists) {
        return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
      }

      const clientData = clientDoc.data();
      console.log('Client Data:', clientData);

      if (!clientData?.cardTokenId) {
        return NextResponse.json({ error: 'Cliente não possui cartão cadastrado' }, { status: 400 });
      }

      // Processar pagamento via Asaas
      const response = await fetch(`${ASAAS_BASE_URL}/payments/${paymentData.asaasId}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': ASAAS_API_KEY
        },
        body: JSON.stringify({
          billingType: 'CREDIT_CARD'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.description || 'Erro ao processar pagamento');
      }
    }

    // Atualizar status no Firestore (tanto para PIX quanto para cartão)
    await adminDb.collection('payments').doc(paymentId).update({
      status: 'paid',
      paidAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paymentMethod: method // Registrar o método usado
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
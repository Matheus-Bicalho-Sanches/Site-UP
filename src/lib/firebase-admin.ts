import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Verificar se todas as variáveis de ambiente necessárias estão presentes
if (
  !process.env.FIREBASE_PROJECT_ID ||
  !process.env.FIREBASE_PRIVATE_KEY_ID ||
  !process.env.FIREBASE_PRIVATE_KEY ||
  !process.env.FIREBASE_CLIENT_EMAIL ||
  !process.env.FIREBASE_CLIENT_ID ||
  !process.env.FIREBASE_CERT_URL
) {
  throw new Error('Credenciais do Firebase Admin não configuradas corretamente');
}

if (!getApps().length) {
  try {
    // Adicionar logs para debug
    console.log('Inicializando Firebase Admin...');
    
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    // Log para verificar as credenciais (não fazer isso em produção!)
    console.log('Service Account:', {
      projectId: serviceAccount.projectId,
      clientEmail: serviceAccount.clientEmail,
      privateKeyLength: serviceAccount.privateKey?.length
    });

    initializeApp({
      credential: cert(serviceAccount)
    });
    
    console.log('Firebase Admin inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar Firebase Admin:', error);
    throw error;
  }
}

export const adminDb = getFirestore(); 
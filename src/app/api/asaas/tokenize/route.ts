import { NextResponse } from 'next/server'
import { ASAAS_CONFIG } from '@/lib/asaas'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const response = await fetch(`${ASAAS_CONFIG.BASE_URL}/creditCard/tokenize`, {
      method: 'POST',
      headers: ASAAS_CONFIG.HEADERS,
      body: JSON.stringify(data)
    })

    const responseData = await response.json()
    return NextResponse.json(responseData)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erro ao tokenizar cartão' },
      { status: 500 }
    )
  }
} 
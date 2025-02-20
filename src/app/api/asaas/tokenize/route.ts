import { NextResponse } from 'next/server'
import { TokenizeCardData } from '@/lib/asaas'

const ASAAS_BASE_URL = process.env.ASAAS_ENVIRONMENT === 'production' 
  ? 'https://api.asaas.com/v3'
  : 'https://sandbox.asaas.com/api/v3'

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ASAAS_API_KEY
    
    if (!apiKey) {
      console.error('API Key não encontrada')
      return NextResponse.json(
        { error: 'Configuração do Asaas não encontrada' },
        { status: 500 }
      )
    }

    const data: TokenizeCardData = await request.json()
    
    if (!data.customer) {
      return NextResponse.json(
        { error: 'ID do cliente não fornecido' },
        { status: 400 }
      )
    }

    const response = await fetch(`${ASAAS_BASE_URL}/creditCard/tokenize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': apiKey
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: responseData.errors?.[0]?.description || responseData.message || 'Erro ao tokenizar cartão' },
        { status: response.status }
      )
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Erro detalhado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 
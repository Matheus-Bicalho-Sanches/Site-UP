import { NextResponse } from 'next/server'

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

    const cardData = await request.json()
    
    const response = await fetch(`${ASAAS_BASE_URL}/creditCard/tokenize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': apiKey
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
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.errors?.[0]?.description || data.message || 'Erro ao tokenizar cartão' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro detalhado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 
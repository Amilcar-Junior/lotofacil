import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/',
      headers: {
        'Cookie': '__uzma=9a51e2c6-79e4-4704-b853-4b8fb469f0e7; __uzmb=1746444613; __uzmc=212271046457; __uzmd=1746444613; __uzme=3895',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://loterias.caixa.gov.br/',
        'Origin': 'https://loterias.caixa.gov.br'
      }
    };

    const response = await axios.request(config);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar resultado da Lotofácil:', error);
    return NextResponse.json(
      { error: 'Não foi possível obter o resultado da Lotofácil' },
      { status: 500 }
    );
  }
} 
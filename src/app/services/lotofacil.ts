import axios from 'axios';

export interface LotofacilResult {
  acumulado: boolean;
  dataApuracao: string;
  dataProximoConcurso: string;
  dezenasSorteadasOrdemSorteio: string[];
  listaDezenas: string[];
  listaMunicipioUFGanhadores: {
    ganhadores: number;
    municipio: string;
    uf: string;
  }[];
  listaRateioPremio: {
    descricaoFaixa: string;
    faixa: number;
    numeroDeGanhadores: number;
    valorPremio: number;
  }[];
  localSorteio: string;
  nomeMunicipioUFSorteio: string;
}

export async function getLotofacilResult(): Promise<LotofacilResult> {
  try {
    const response = await axios.get('https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar resultado da Lotofácil:', error);
    throw new Error('Não foi possível obter o resultado da Lotofácil');
  }
} 
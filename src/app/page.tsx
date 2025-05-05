import { LotofacilResult } from './types/lotofacil';

async function getLotofacilResult(): Promise<LotofacilResult> {
  const response = await fetch('/api/lotofacil', {
    next: { revalidate: 60 } // Revalida a cada 1 minuto
  });
  if (!response.ok) {
    throw new Error('Não foi possível obter o resultado da Lotofácil');
  }
  return response.json();
}

export default async function Home() {
  try {
    const resultado = await getLotofacilResult();
    const dataAtualizacao = new Date().toLocaleTimeString('pt-BR');

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-purple-100">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-purple-800">
              Resultado Lotofácil
            </h1>
            <p className="text-sm text-gray-500">
              Atualizado em: {dataAtualizacao}
            </p>
          </div>

          <div className="mb-8 bg-purple-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">Informações do Concurso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-gray-700">
                <span className="font-semibold text-purple-600">Data da Apuração:</span> {resultado.dataApuracao}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-purple-600">Próximo Concurso:</span> {resultado.dataProximoConcurso}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-purple-600">Local do Sorteio:</span> {resultado.localSorteio}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-purple-600">Cidade:</span> {resultado.nomeMunicipioUFSorteio}
              </p>
            </div>
          </div>

          <div className="mb-8 bg-purple-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">Números Sorteados</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {resultado.listaDezenas.map((numero) => (
                <div
                  key={numero}
                  className="w-12 h-12 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold text-lg shadow-md hover:bg-purple-700 transition-colors"
                >
                  {numero}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 bg-purple-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">Premiação</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="px-4 py-3 text-left rounded-tl-lg">Faixa</th>
                    <th className="px-4 py-3 text-center">Ganhadores</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">Prêmio</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.listaRateioPremio.map((premio) => (
                    <tr key={premio.faixa} className="border-b border-purple-100 hover:bg-purple-50">
                      <td className="px-4 py-3 text-gray-700">{premio.descricaoFaixa}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{premio.numeroDeGanhadores}</td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        R$ {premio.valorPremio.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">Ganhadores por Cidade</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="px-4 py-3 text-left rounded-tl-lg">Cidade</th>
                    <th className="px-4 py-3 text-center">UF</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">Ganhadores</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.listaMunicipioUFGanhadores.map((ganhador, index) => (
                    <tr key={index} className="border-b border-purple-100 hover:bg-purple-50">
                      <td className="px-4 py-3 text-gray-700">{ganhador.municipio}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{ganhador.uf}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{ganhador.ganhadores}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro ao buscar resultado da Lotofácil:', error);
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-purple-100">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
            Resultado Lotofácil
          </h1>
          <div className="text-center text-red-600">
            <p className="text-xl mb-4">Não foi possível carregar os resultados no momento.</p>
            <p className="text-sm">Por favor, tente novamente mais tarde.</p>
            {error instanceof Error && (
              <p className="text-sm">Erro: {error.message}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

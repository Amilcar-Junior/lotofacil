import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-purple-800">
          Sistema de Loterias
        </h1>
        <div className="space-y-4">
          <Link
            href="/lotofacil"
            className="block bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Ver Resultado da Lotofácil
          </Link>
          <p className="text-gray-600 mt-4">
            Acesse os resultados mais recentes da Lotofácil
          </p>
        </div>
      </div>
    </div>
  );
}

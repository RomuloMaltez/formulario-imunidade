import Link from 'next/link';

export default function HomePage() {
  const tiposImunidade = [
    {
      tipo: 'reciproca',
      titulo: 'Imunidade Recíproca',
      descricao: 'União, Estados, Distrito Federal e Municípios',
      icon: '🏛️',
      fundamento: 'Art. 150, VI, "a", CF/88',
      cor: 'green',
    },
    {
      tipo: 'templos',
      titulo: 'Templos de Qualquer Culto',
      descricao: 'Patrimônio, renda ou serviços relacionados às finalidades essenciais',
      icon: '⛪',
      fundamento: 'Art. 150, VI, "b", CF/88',
      cor: 'purple',
    },
    {
      tipo: 'partidos',
      titulo: 'Partidos, Sindicatos, Educação e Assistência Social',
      descricao: 'Entidades sem fins lucrativos que atendem requisitos legais',
      icon: '🏫',
      fundamento: 'Art. 150, VI, "c", CF/88',
      cor: 'orange',
    },
    {
      tipo: 'livros',
      titulo: 'Livros, Jornais e Periódicos',
      descricao: 'Papel destinado à sua impressão',
      icon: '📰',
      fundamento: 'Art. 150, VI, "d", CF/88',
      cor: 'indigo',
    },
    {
      tipo: 'fonogramas',
      titulo: 'Fonogramas e Videofonogramas Musicais',
      descricao: 'Produzidos no Brasil com autores/artistas brasileiros',
      icon: '🎵',
      fundamento: 'Art. 150, VI, "e", CF/88',
      cor: 'pink',
    },
  ];

  const cores = {
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
    indigo: 'bg-indigo-500 hover:bg-indigo-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema Solicitação de Imunidade Tributária
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Prefeitura Municipal de Porto Velho
          </p>
          <p className="text-sm text-gray-500">
            <a
              href="https://semfaz.portovelho.ro.gov.br/uploads//arquivos/2025/10/67765/1761679049in-001-imunidade-2025.PDF"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Instrução Normativa SEMEC/SRM Nº 001/2025
            </a>
          </p>
        </div>

        {/* Instruções */}
        <div className="max-w-4xl mx-auto mb-10 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            📋 Como funciona:
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Selecione o tipo de imunidade tributária desejada</li>
            <li>Preencha o formulário com os dados solicitados</li>
            <li>Anexe os documentos obrigatórios</li>
            <li>Gere o requerimento em PDF e envie para análise</li>
          </ol>
        </div>

        {/* Cards de Tipos de Imunidade */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Selecione o tipo de imunidade:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiposImunidade.map((item) => (
              <Link
                key={item.tipo}
                href={`/formularios/${item.tipo}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`text-6xl ${cores[item.cor as keyof typeof cores]} bg-opacity-10 rounded-full w-24 h-24 flex items-center justify-center`}>
                      {item.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors">
                    {item.titulo}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 text-center flex-grow">
                    {item.descricao}
                  </p>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center font-medium">
                      {item.fundamento}
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <span className={`block text-center ${cores[item.cor as keyof typeof cores]} text-white py-2 rounded-lg font-semibold group-hover:scale-105 transition-transform`}>
                      Selecionar →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600 text-sm">
          <p className="mb-2">
            Secretaria Municipal de Economia (SEMEC) - Secretaria Executiva da Receita Municipal (SRM)
          </p>
          <p className="text-xs text-gray-500">
            Dúvidas? Entre em contato através do portal da prefeitura
          </p>
        </div>
      </div>
    </div>
  );
}

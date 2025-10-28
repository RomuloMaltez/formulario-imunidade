'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSchema } from '@/lib/validations';
import { DadosComuns } from '@/components/forms/DadosComuns';
import { ReciprocaFields } from '@/components/forms/ReciprocaFields';
import { TemplosFields } from '@/components/forms/TemplosFields';
import { PartidosFields } from '@/components/forms/PartidosFields';
import { LivrosFields } from '@/components/forms/LivrosFields';
import { FonogramasFields } from '@/components/forms/FonogramasFields';
import { DocumentosNecessarios } from '@/components/forms/DocumentosNecessarios';
import { Button } from '@/components/ui/Button';
import { gerarPDFRequerimento } from '@/lib/pdf-generator';
import Link from 'next/link';
import { useState } from 'react';

export default function FormularioPage() {
  const params = useParams();
  const router = useRouter();
  const tipo = params.tipo as string;
  const [isGenerating, setIsGenerating] = useState(false);

  // Validar se o tipo é válido
  const tiposValidos = ['reciproca', 'templos', 'partidos', 'livros', 'fonogramas'];
  if (!tiposValidos.includes(tipo)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Tipo de imunidade inválido</h1>
          <Link href="/">
            <Button>Voltar para página inicial</Button>
          </Link>
        </div>
      </div>
    );
  }

  const schema = getSchema(tipo);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      dataDeclaracao: new Date().toISOString().split('T')[0],
    }
  });

  const titulos: Record<string, string> = {
    reciproca: 'Imunidade Recíproca - Entes Federativos',
    templos: 'Imunidade - Templos de Qualquer Culto',
    partidos: 'Imunidade - Partidos, Sindicatos, Educação e Assistência Social',
    livros: 'Imunidade - Livros, Jornais e Periódicos',
    fonogramas: 'Imunidade - Fonogramas e Videofonogramas Musicais',
  };

  const onSubmit = async (data: any) => {
    setIsGenerating(true);
    
    try {
      // Adicionar o tipo ao objeto de dados
      const dadosCompletos = {
        ...data,
        tipo: tipo,
      };
      
      // Gerar o PDF
      gerarPDFRequerimento(dadosCompletos);
      
      // Feedback visual
      alert('PDF gerado com sucesso! Verifique seus downloads.');
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              ← Voltar
            </Button>
          </Link>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {titulos[tipo]}
            </h1>
            <p className="text-gray-600">
              Instrução Normativa SEMEC/SRM Nº 001/2025
            </p>
          </div>
        </div>

        {/* Lista de Documentos Necessários */}
        <div className="max-w-4xl mx-auto mb-8">
          <DocumentosNecessarios tipo={tipo} />
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Campos Comuns - Sempre aparecem */}
            <DadosComuns register={register} errors={errors} />

            {/* Campos Específicos - Renderização Condicional */}
            {tipo === 'reciproca' && (
              <ReciprocaFields register={register} errors={errors} />
            )}
            
            {tipo === 'templos' && (
              <TemplosFields register={register} errors={errors} />
            )}
            
            {tipo === 'partidos' && (
              <PartidosFields register={register} errors={errors} watch={watch} />
            )}
            
            {tipo === 'livros' && (
              <LivrosFields register={register} errors={errors} />
            )}
            
            {tipo === 'fonogramas' && (
              <FonogramasFields register={register} errors={errors} />
            )}

            {/* Botões de Ação */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push('/')}
                  disabled={isGenerating}
                >
                  Cancelar
                </Button>
                
                <Button 
                  type="submit" 
                  variant="primary"
                  disabled={isGenerating}
                >
                  {isGenerating ? '⏳ Gerando PDF...' : '📄 Gerar Requerimento em PDF'}
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Informações Adicionais */}
        <div className="max-w-4xl mx-auto mt-8 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
          <h3 className="font-semibold text-orange-900 mb-2">
            📋 Próximos Passos:
          </h3>
          <ol className="text-sm text-orange-800 space-y-2 list-decimal list-inside">
            <li>Gere o requerimento em PDF clicando no botão acima</li>
            <li>Reúna todos os documentos necessários listados</li>
            <li>Protocolize o requerimento e os documentos na Secretaria Executiva da Receita Municipal (SRM)</li>
            <li>Acompanhe a análise do processo</li>
          </ol>
        </div>

        {/* Avisos Importantes */}
        <div className="max-w-4xl mx-auto mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">
            ℹ️ Informações Importantes:
          </h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• O reconhecimento da imunidade não gera direito adquirido</li>
            <li>• A imunidade pode ser suspensa ou cancelada a qualquer tempo</li>
            <li>• O Certificado de Imunidade tem validade de 5 anos</li>
            <li>• Todos os documentos devem estar legíveis e atualizados</li>
            <li>• A falsidade de informações implica em sanções legais</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

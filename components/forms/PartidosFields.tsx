import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { Textarea } from '../ui/Textarea';

interface PartidosFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
}

export const PartidosFields: React.FC<PartidosFieldsProps> = ({ register, errors, watch }) => {
  const tipoEntidadeOptions = [
    { value: 'PartidoPolitico', label: 'Partido Político' },
    { value: 'EntidadeSindical', label: 'Entidade Sindical dos Trabalhadores' },
    { value: 'InstituicaoEducacao', label: 'Instituição de Educação' },
    { value: 'InstituicaoAssistencia', label: 'Instituição de Assistência Social' },
  ];

  const tipoEntidade = watch('tipoEntidade');
  const mostrarCEBAS = tipoEntidade === 'InstituicaoEducacao' || tipoEntidade === 'InstituicaoAssistencia';

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Dados da Entidade
        </h2>
        
        <Input
          label="Nome da Entidade *"
          {...register('nomeEntidade')}
          error={errors.nomeEntidade?.message as string}
          placeholder="Nome completo da entidade"
        />

        <Select
          label="Tipo de Entidade *"
          options={tipoEntidadeOptions}
          {...register('tipoEntidade')}
          error={errors.tipoEntidade?.message as string}
        />

        <Textarea
          label="Descrição do Bem/Serviço *"
          {...register('descricaoBem')}
          error={errors.descricaoBem?.message as string}
          placeholder="Descreva detalhadamente o patrimônio, renda ou serviço objeto da imunidade. Você pode listar múltiplos bens, patrimônios e serviços."
          rows={5}
        />

        <Textarea
          label="Endereço do Imóvel (se aplicável)"
          {...register('enderecoImovel')}
          error={errors.enderecoImovel?.message as string}
          placeholder="Endereço completo do imóvel. Se houver múltiplos imóveis, liste todos."
          rows={3}
        />

        <Textarea
          label="Matrícula(s) do Imóvel (se aplicável)"
          {...register('matriculaImovel')}
          error={errors.matriculaImovel?.message as string}
          placeholder="Número(s) da(s) matrícula(s) no cartório. Se houver múltiplos imóveis, liste todas as matrículas."
          rows={3}
        />

        {mostrarCEBAS && (
          <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
            <Checkbox
              label="Possuo Certificado de Entidade Beneficente de Assistência Social (CEBAS)"
              {...register('possuiCEBAS')}
            />
            <p className="text-sm text-blue-700 mt-2">
              * Se possuir, anexar o certificado na documentação física
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">
            ✓ Declarações Obrigatórias (Art. 14 do CTN):
          </h3>
          
          <Checkbox
            label="A entidade NÃO distribui qualquer parcela de seu patrimônio ou de suas rendas, a qualquer título."
            {...register('naoDistribuiPatrimonio')}
            error={errors.naoDistribuiPatrimonio?.message as string}
          />

          <Checkbox
            label="A entidade aplica integralmente, no País, os seus recursos na manutenção dos seus objetivos institucionais."
            {...register('aplicaRecursosNoPais')}
            error={errors.aplicaRecursosNoPais?.message as string}
          />

          <Checkbox
            label="A entidade mantém escrituração de suas receitas e despesas em livros revestidos de formalidades capazes de assegurar sua exatidão."
            {...register('mantemEscrituacao')}
            error={errors.mantemEscrituacao?.message as string}
          />

          <Checkbox
            label="Declaro que o patrimônio, renda ou serviços estão vinculados às suas finalidades essenciais ou às delas decorrentes."
            {...register('declaracaoVinculo')}
            error={errors.declaracaoVinculo?.message as string}
          />
        </div>
      </div>
    </>
  );
};

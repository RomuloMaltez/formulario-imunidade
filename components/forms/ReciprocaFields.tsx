import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { Textarea } from '../ui/Textarea';

interface ReciprocaFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const ReciprocaFields: React.FC<ReciprocaFieldsProps> = ({ register, errors }) => {
  const naturezaOptions = [
    { value: 'Uniao', label: 'União' },
    { value: 'Estado', label: 'Estado' },
    { value: 'Municipio', label: 'Município' },
    { value: 'DistritoFederal', label: 'Distrito Federal' },
  ];

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Imunidade Recíproca - Ente Federativo
        </h2>
        
        <Select
          label="Natureza Jurídica do Ente Federativo *"
          options={naturezaOptions}
          {...register('naturezaJuridica')}
          error={errors.naturezaJuridica?.message as string}
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
          placeholder="Endereço completo do imóvel com a respectiva inscrição municipal. Se houver múltiplos imóveis, liste todos."
          rows={3}
        />

        <Textarea
          label="Matrícula(s) do Imóvel (se aplicável)"
          {...register('matriculaImovel')}
          error={errors.matriculaImovel?.message as string}
          placeholder="Número(s) da(s) matrícula(s) no cartório. Se houver múltiplos imóveis, liste todas as matrículas."
          rows={3}
        />

        <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
          <Checkbox
            label="Declaro que o patrimônio, renda ou serviços estão vinculados às finalidades essenciais do ente federativo ou às delas decorrentes."
            {...register('declaracaoVinculo')}
            error={errors.declaracaoVinculo?.message as string}
          />
        </div>
      </div>
    </>
  );
};

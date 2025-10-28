import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { Textarea } from '../ui/Textarea';

interface TemplosFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const TemplosFields: React.FC<TemplosFieldsProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
        <h2 className="text-xl font-bold text-purple-900 mb-4">
          ⛪ Dados Específicos do Templo
        </h2>
        
        <Input
          label="Nome do Templo *"
          {...register('nomeTemplo')}
          error={errors.nomeTemplo?.message as string}
          placeholder="Nome completo do templo religioso"
        />

        <Textarea
          label="Endereço do Imóvel *"
          {...register('enderecoImovel')}
          error={errors.enderecoImovel?.message as string}
          placeholder="Endereço completo do imóvel onde funciona o templo. Se houver múltiplos imóveis, liste todos."
          rows={3}
        />

        <Textarea
          label="Matrícula(s) do Imóvel (se aplicável)"
          {...register('matriculaImovel')}
          error={errors.matriculaImovel?.message as string}
          placeholder="Número(s) da(s) matrícula(s) no cartório. Se houver múltiplos imóveis, liste todas as matrículas."
          rows={3}
        />

        <div className="mt-6 p-4 bg-white rounded border border-purple-200">
          <Checkbox
            label="Declaro que o patrimônio, renda ou serviços estão relacionados às finalidades essenciais do templo, conforme o art. 150, § 4º, da Constituição Federal de 1988."
            {...register('declaracaoFinalidade')}
            error={errors.declaracaoFinalidade?.message as string}
          />
        </div>
      </div>
    </div>
  );
};

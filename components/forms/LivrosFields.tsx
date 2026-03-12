import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { Textarea } from '../ui/Textarea';

interface LivrosFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const LivrosFields: React.FC<LivrosFieldsProps> = ({ register, errors }) => {
  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Livros, Jornais e Periódicos
        </h2>
        
        <Input
          label="Nome da Entidade *"
          {...register('nomeEntidade')}
          error={errors.nomeEntidade?.message as string}
          placeholder="Nome da empresa/entidade"
        />

        <Textarea
          label="Descrição da Atividade *"
          {...register('descricaoAtividade')}
          error={errors.descricaoAtividade?.message as string}
          placeholder="Descreva detalhadamente a atividade de edição, impressão ou comercialização de livros, jornais ou periódicos"
          rows={5}
        />

        <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
          <Checkbox
            label="Declaro que o patrimônio, renda ou serviços estão vinculados à produção ou circulação de livros, jornais ou periódicos, ou ao papel destinado à sua impressão."
            {...register('declaracaoVinculo')}
            error={errors.declaracaoVinculo?.message as string}
          />
        </div>
      </div>
    </>
  );
};

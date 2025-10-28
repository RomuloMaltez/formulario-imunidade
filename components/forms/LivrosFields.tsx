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
    <div className="space-y-6">
      <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
        <h2 className="text-xl font-bold text-indigo-900 mb-4">
          📰 Livros, Jornais e Periódicos
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

        <div className="mt-6 p-4 bg-white rounded border border-indigo-200">
          <Checkbox
            label="Declaro que o patrimônio, renda ou serviços estão vinculados à produção ou circulação de livros, jornais ou periódicos, ou ao papel destinado à sua impressão."
            {...register('declaracaoVinculo')}
            error={errors.declaracaoVinculo?.message as string}
          />
        </div>
      </div>
    </div>
  );
};

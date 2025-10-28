import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { Textarea } from '../ui/Textarea';

interface FonogramasFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const FonogramasFields: React.FC<FonogramasFieldsProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500">
        <h2 className="text-xl font-bold text-pink-900 mb-4">
          🎵 Fonogramas e Videofonogramas Musicais
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
          placeholder="Descreva detalhadamente a atividade de produção, edição ou comercialização de fonogramas e videofonogramas musicais"
          rows={5}
        />

        <div className="mt-6 p-4 bg-white rounded border border-pink-200">
          <Checkbox
            label="Declaro que os fonogramas/videofonogramas são produzidos no Brasil, contendo obras musicais ou literomusicais de autores brasileiros e/ou interpretadas por artistas brasileiros."
            {...register('declaracaoNacionalidade')}
            error={errors.declaracaoNacionalidade?.message as string}
          />

          <Checkbox
            label="Declaro que o patrimônio, renda ou serviços estão vinculados à produção ou circulação dos fonogramas e videofonogramas musicais, e que não se refere à etapa de replicação industrial de mídias ópticas de leitura a laser."
            {...register('declaracaoVinculo')}
            error={errors.declaracaoVinculo?.message as string}
          />
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-300">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Atenção:</strong> A imunidade NÃO abrange a etapa de replicação industrial de mídias ópticas de leitura a laser.
          </p>
        </div>
      </div>
    </div>
  );
};

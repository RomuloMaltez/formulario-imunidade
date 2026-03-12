import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { Textarea } from '../ui/Textarea';

interface DadosComunsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const DadosComuns: React.FC<DadosComunsProps> = ({ register, errors }) => {
  const dataAtual = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Dados do Declarante
        </h2>
        
        <Input
          label="Nome/Razão Social *"
          {...register('razaoSocial')}
          error={errors.razaoSocial?.message as string}
          placeholder="Digite o nome completo ou razão social"
        />

        <Input
          label="CNPJ *"
          mask="99.999.999/9999-99"
          {...register('cnpj')}
          error={errors.cnpj?.message as string}
          placeholder="00.000.000/0000-00"
        />

        <Textarea
          label="Endereço Completo *"
          {...register('endereco')}
          error={errors.endereco?.message as string}
          placeholder="Rua, Número, Bairro, Cidade, Estado, CEP"
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Telefone *"
            mask="(99) 99999-9999"
            {...register('telefone')}
            error={errors.telefone?.message as string}
            placeholder="(00) 00000-0000"
          />

          <Input
            label="Email *"
            type="email"
            {...register('email')}
            error={errors.email?.message as string}
            placeholder="email@exemplo.com"
          />
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Dados do Representante Legal (se aplicável)
        </h2>
        
        <Input
          label="Nome Completo"
          {...register('nomeRepresentante')}
          error={errors.nomeRepresentante?.message as string}
          placeholder="Nome do representante legal"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="CPF"
            mask="999.999.999-99"
            {...register('cpfRepresentante')}
            error={errors.cpfRepresentante?.message as string}
            placeholder="000.000.000-00"
          />

          <Input
            label="Cargo/Função"
            {...register('cargoRepresentante')}
            error={errors.cargoRepresentante?.message as string}
            placeholder="Ex: Diretor, Presidente"
          />
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Observações Adicionais
        </h2>
        
        <Textarea
          label="Observações (para mais esclarecimentos)"
          {...register('observacoes')}
          error={errors.observacoes?.message as string}
          placeholder="Escreva aqui o que julgar útil e necessário para a análise do pedido"
          rows={5}
        />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Declaração de Responsabilidade
        </h2>
        
        <Checkbox
          label="Declaro, sob as penas da lei, que as informações prestadas nesta autodeclaração são verdadeiras e que a entidade preenche todos os requisitos legais e constitucionais para o gozo da imunidade tributária pleiteada, estando ciente de que a falsidade das informações implicará na suspensão ou cancelamento da imunidade e na cobrança dos impostos devidos, com os acréscimos legais."
          {...register('aceitoTermos')}
          error={errors.aceitoTermos?.message as string}
        />

        <input
          type="hidden"
          {...register('dataDeclaracao')}
          value={dataAtual}
        />
      </div>
    </>
  );
};

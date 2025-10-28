import { z } from 'zod';

// Validação de CNPJ
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

// Schema de campos comuns a todos os formulários
const dadosComuns = z.object({
  razaoSocial: z.string().min(3, 'Razão social deve ter no mínimo 3 caracteres'),
  cnpj: z.string().regex(cnpjRegex, 'CNPJ inválido. Formato: 00.000.000/0000-00'),
  endereco: z.string().min(10, 'Endereço completo é obrigatório'),
  telefone: z.string().min(10, 'Telefone é obrigatório'),
  email: z.string().email('Email inválido'),
  nomeRepresentante: z.string().optional(),
  cpfRepresentante: z.string().optional(),
  cargoRepresentante: z.string().optional(),
  dataDeclaracao: z.string(),
  observacoes: z.string().optional(),
  aceitoTermos: z.literal(true, { 
    errorMap: () => ({ message: 'Você deve aceitar os termos da declaração' }) 
  }),
});

// Schema para Imunidade Recíproca
export const reciprocaSchema = dadosComuns.extend({
  naturezaJuridica: z.enum(['Uniao', 'Estado', 'Municipio', 'DistritoFederal'], {
    errorMap: () => ({ message: 'Selecione a natureza jurídica' })
  }),
  descricaoBem: z.string().min(10, 'Descrição do bem/serviço é obrigatória'),
  enderecoImovel: z.string().optional(),
  matriculaImovel: z.string().optional(),
  declaracaoVinculo: z.literal(true, {
    errorMap: () => ({ message: 'Declaração obrigatória' })
  }),
});

// Schema para Templos
export const templosSchema = dadosComuns.extend({
  nomeTemplo: z.string().min(3, 'Nome do templo é obrigatório'),
  enderecoImovel: z.string().min(10, 'Endereço do imóvel é obrigatório'),
  matriculaImovel: z.string().optional(),
  declaracaoFinalidade: z.literal(true, {
    errorMap: () => ({ message: 'Declaração de finalidade é obrigatória' })
  }),
});

// Schema para Partidos/Sindicatos/Educação/Assistência Social
export const partidosSchema = dadosComuns.extend({
  nomeEntidade: z.string().min(3, 'Nome da entidade é obrigatório'),
  tipoEntidade: z.enum(['PartidoPolitico', 'EntidadeSindical', 'InstituicaoEducacao', 'InstituicaoAssistencia'], {
    errorMap: () => ({ message: 'Selecione o tipo de entidade' })
  }),
  descricaoBem: z.string().min(10, 'Descrição do bem/serviço é obrigatória'),
  enderecoImovel: z.string().optional(),
  matriculaImovel: z.string().optional(),
  naoDistribuiPatrimonio: z.literal(true, {
    errorMap: () => ({ message: 'Declaração obrigatória' })
  }),
  aplicaRecursosNoPais: z.literal(true, {
    errorMap: () => ({ message: 'Declaração obrigatória' })
  }),
  mantemEscrituacao: z.literal(true, {
    errorMap: () => ({ message: 'Declaração obrigatória' })
  }),
  declaracaoVinculo: z.literal(true, {
    errorMap: () => ({ message: 'Declaração obrigatória' })
  }),
  possuiCEBAS: z.boolean().optional(),
});

// Schema para Livros/Jornais/Periódicos
export const livrosSchema = dadosComuns.extend({
  nomeEntidade: z.string().min(3, 'Nome da entidade é obrigatório'),
  descricaoAtividade: z.string().min(10, 'Descrição da atividade é obrigatória'),
  declaracaoVinculo: z.literal(true, {
    errorMap: () => ({ message: 'Declaração obrigatória' })
  }),
});

// Schema para Fonogramas/Videofonogramas
export const fonogramasSchema = dadosComuns.extend({
  nomeEntidade: z.string().min(3, 'Nome da entidade é obrigatório'),
  descricaoAtividade: z.string().min(10, 'Descrição da atividade é obrigatória'),
  declaracaoNacionalidade: z.literal(true, {
    errorMap: () => ({ message: 'Declaração de nacionalidade é obrigatória' })
  }),
  declaracaoVinculo: z.literal(true, {
    errorMap: () => ({ message: 'Declaração obrigatória' })
  }),
});

// Função para obter o schema correto baseado no tipo
export function getSchema(tipo: string) {
  const schemas: Record<string, z.ZodSchema> = {
    reciproca: reciprocaSchema,
    templos: templosSchema,
    partidos: partidosSchema,
    livros: livrosSchema,
    fonogramas: fonogramasSchema,
  };
  
  return schemas[tipo] || dadosComuns;
}

// Tipos TypeScript inferidos dos schemas
export type DadosComuns = z.infer<typeof dadosComuns>;
export type ReciprocaForm = z.infer<typeof reciprocaSchema>;
export type TemplosForm = z.infer<typeof templosSchema>;
export type PartidosForm = z.infer<typeof partidosSchema>;
export type LivrosForm = z.infer<typeof livrosSchema>;
export type FonogramasForm = z.infer<typeof fonogramasSchema>;

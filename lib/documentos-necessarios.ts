// Lista de documentos necessários para cada tipo de imunidade
// Baseado na IN 001/2025 - Anexo I

export const documentosNecessarios: Record<string, string[]> = {
  reciproca: [
    "Documento oficial que comprove a natureza jurídica do ente federativo",
    "Documentação que comprove a propriedade, posse ou titularidade do bem ou serviço",
    "Declaração de que o patrimônio, renda ou serviços estão vinculados às finalidades essenciais ou delas decorrentes",
  ],
  
  templos: [
    "Ato constitutivo da entidade religiosa (estatuto social, ata de fundação, etc.) devidamente registrado",
    "Comprovante de inscrição no CNPJ",
    "Documentação que comprove a propriedade, posse ou titularidade do bem imóvel (matrícula do imóvel, contrato de locação, etc.)",
    "Declaração de que o patrimônio, renda ou serviços estão relacionados às finalidades essenciais do templo",
  ],
  
  partidos: [
    "Ato constitutivo da entidade (estatuto social, ata de fundação, etc.) devidamente registrado",
    "Comprovante de inscrição no CNPJ",
    "Documentação que comprove a propriedade, posse ou titularidade do bem ou serviço",
    "Documentos contábeis que comprovem:",
    "• Não distribuição de patrimônio ou rendas",
    "• Aplicação integral dos recursos no País",
    "• Manutenção de escrituração de receitas e despesas",
    "Declaração de que o patrimônio está vinculado às finalidades essenciais",
    "Para Instituições de Educação/Assistência Social: Certificado CEBAS ou documento equivalente (quando aplicável)",
  ],
  
  livros: [
    "Comprovante de inscrição no CNPJ",
    "Documentação que comprove a atividade de edição, impressão ou comercialização de livros, jornais ou periódicos",
    "Declaração de que o patrimônio, renda ou serviços estão vinculados à produção ou circulação de livros, jornais, periódicos ou papel destinado à sua impressão",
  ],
  
  fonogramas: [
    "Comprovante de inscrição no CNPJ",
    "Documentação que comprove a produção, edição ou comercialização dos fonogramas/videofonogramas musicais",
    "Documentação que comprove a nacionalidade dos autores e artistas brasileiros",
    "Declaração de que o patrimônio está vinculado à produção ou circulação dos fonogramas/videofonogramas musicais",
    "Declaração de que NÃO se refere à etapa de replicação industrial de mídias ópticas de leitura a laser",
  ],
};

// Observações importantes por tipo
export const observacoesImportantes: Record<string, string[]> = {
  reciproca: [
    "O reconhecimento pode ser feito de ofício pela administração",
    "Caso não ocorra de ofício, o ente pode solicitar mediante autodeclaração",
  ],
  
  templos: [
    "A imunidade abrange apenas o patrimônio, renda ou serviços relacionados às finalidades essenciais",
    "Documentação irrefutável pode ter reconhecimento em até 5 dias",
  ],
  
  partidos: [
    "Deve atender aos requisitos do Art. 14 do CTN",
    "Instituições de educação/assistência podem necessitar do CEBAS",
    "Documentação clara pode ter reconhecimento em até 5 dias",
  ],
  
  livros: [
    "A imunidade abrange livros, jornais, periódicos e o papel destinado à sua impressão",
    "Documentação clara pode ter reconhecimento em até 5 dias",
  ],
  
  fonogramas: [
    "A imunidade NÃO abrange a replicação industrial de mídias ópticas",
    "Deve comprovar autoria/interpretação brasileira",
    "Documentação clara pode ter reconhecimento em até 5 dias",
  ],
};

// Prazo de validade do certificado
export const PRAZO_VALIDADE_CERTIFICADO = "5 (cinco) anos";

// Informações sobre renovação
export const INFO_RENOVACAO = "O Certificado de Imunidade deverá ser renovado ao final do período de validade mediante novo processo de autodeclaração.";

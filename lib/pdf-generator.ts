import jsPDF from 'jspdf';

interface DadosFormulario {
  tipo: string;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
  nomeRepresentante?: string;
  cpfRepresentante?: string;
  cargoRepresentante?: string;
  observacoes?: string;
  dataDeclaracao: string;
  [key: string]: any;
}

const tiposImunidade: Record<string, string> = {
  reciproca: 'Imunidade Recíproca (Art. 150, VI, "a", CF/88)',
  templos: 'Imunidade - Templos de Qualquer Culto (Art. 150, VI, "b", CF/88)',
  partidos: 'Imunidade - Partidos, Sindicatos, Educação e Assistência Social (Art. 150, VI, "c", CF/88)',
  livros: 'Imunidade - Livros, Jornais e Periódicos (Art. 150, VI, "d", CF/88)',
  fonogramas: 'Imunidade - Fonogramas e Videofonogramas Musicais (Art. 150, VI, "e", CF/88)',
};

export const gerarPDFRequerimento = (dados: DadosFormulario) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let currentY = margin;

  // Função auxiliar para adicionar nova página se necessário
  const checkPageBreak = (requiredSpace: number) => {
    if (currentY + requiredSpace > pageHeight - margin) {
      doc.addPage();
      currentY = margin;
    }
  };

  // Função auxiliar para adicionar texto com quebra automática
  const addText = (text: string, fontSize: number = 11, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
    const lineHeight = fontSize * 0.5;
    
    checkPageBreak(lines.length * lineHeight + 5);
    doc.text(lines, margin, currentY);
    currentY += lines.length * lineHeight;
  };

  // Cabeçalho
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('PREFEITURA MUNICIPAL DE PORTO VELHO', pageWidth / 2, currentY, { align: 'center' });
  currentY += 7;
  
  doc.setFontSize(14);
  doc.text('SECRETARIA MUNICIPAL DE ECONOMIA (SEMEC)', pageWidth / 2, currentY, { align: 'center' });
  currentY += 6;
  
  doc.text('SECRETARIA EXECUTIVA DA RECEITA MUNICIPAL (SRM)', pageWidth / 2, currentY, { align: 'center' });
  currentY += 10;
  
  doc.setFontSize(18);
  doc.text('REQUERIMENTO DE IMUNIDADE TRIBUTÁRIA', pageWidth / 2, currentY, { align: 'center' });
  currentY += 12;

  // Linha separadora
  doc.setDrawColor(0, 105, 180);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 10;

  // Tipo de Imunidade
  addText('Tipo de Imunidade Solicitada:', 12, true);
  currentY += 2;
  addText(tiposImunidade[dados.tipo] || dados.tipo, 11, false);
  currentY += 8;

  // 1. Identificação do Declarante
  checkPageBreak(60);
  addText('1. IDENTIFICAÇÃO DO DECLARANTE', 12, true);
  currentY += 3;
  
  addText(`Nome/Razão Social: ${dados.razaoSocial}`, 11);
  currentY += 2;
  addText(`CNPJ: ${dados.cnpj}`, 11);
  currentY += 2;
  addText(`Endereço: ${dados.endereco}`, 11);
  currentY += 2;
  addText(`Telefone: ${dados.telefone}`, 11);
  currentY += 2;
  addText(`Email: ${dados.email}`, 11);
  currentY += 8;

  // 2. Representante Legal (se houver)
  if (dados.nomeRepresentante) {
    checkPageBreak(30);
    addText('2. REPRESENTANTE LEGAL', 12, true);
    currentY += 3;
    
    addText(`Nome: ${dados.nomeRepresentante}`, 11);
    currentY += 2;
    
    if (dados.cpfRepresentante) {
      addText(`CPF: ${dados.cpfRepresentante}`, 11);
      currentY += 2;
    }
    
    if (dados.cargoRepresentante) {
      addText(`Cargo/Função: ${dados.cargoRepresentante}`, 11);
      currentY += 8;
    }
  }

  // 3. Dados Específicos por Tipo
  checkPageBreak(40);
  const numeroSecao = dados.nomeRepresentante ? '3' : '2';
  addText(`${numeroSecao}. DADOS ESPECÍFICOS`, 12, true);
  currentY += 3;

  // Adicionar campos específicos conforme o tipo
  switch (dados.tipo) {
    case 'reciproca':
      if (dados.naturezaJuridica) {
        const naturezaMap: Record<string, string> = {
          'Uniao': 'União',
          'Estado': 'Estado',
          'Municipio': 'Município',
          'DistritoFederal': 'Distrito Federal'
        };
        addText(`Natureza Jurídica: ${naturezaMap[dados.naturezaJuridica] || dados.naturezaJuridica}`, 11);
        currentY += 2;
      }
      if (dados.descricaoBem) {
        addText('Descrição do Bem/Serviço:', 11, true);
        currentY += 2;
        addText(dados.descricaoBem, 10);
        currentY += 2;
      }
      if (dados.enderecoImovel) {
        addText('Endereço do Imóvel:', 11, true);
        currentY += 2;
        addText(dados.enderecoImovel, 10);
        currentY += 2;
      }
      if (dados.matriculaImovel) {
        addText('Matrícula(s) do Imóvel:', 11, true);
        currentY += 2;
        addText(dados.matriculaImovel, 10);
        currentY += 2;
      }
      break;
      
    case 'templos':
      if (dados.nomeTemplo) {
        addText(`Nome do Templo: ${dados.nomeTemplo}`, 11);
        currentY += 2;
      }
      if (dados.enderecoImovel) {
        addText('Endereço do Imóvel:', 11, true);
        currentY += 2;
        addText(dados.enderecoImovel, 10);
        currentY += 2;
      }
      if (dados.matriculaImovel) {
        addText('Matrícula(s) do Imóvel:', 11, true);
        currentY += 2;
        addText(dados.matriculaImovel, 10);
        currentY += 2;
      }
      break;
      
    case 'partidos':
      if (dados.nomeEntidade) {
        addText(`Nome da Entidade: ${dados.nomeEntidade}`, 11);
        currentY += 2;
      }
      if (dados.tipoEntidade) {
        const tipoMap: Record<string, string> = {
          'PartidoPolitico': 'Partido Político',
          'EntidadeSindical': 'Entidade Sindical',
          'InstituicaoEducacao': 'Instituição de Educação',
          'InstituicaoAssistencia': 'Instituição de Assistência Social'
        };
        addText(`Tipo: ${tipoMap[dados.tipoEntidade] || dados.tipoEntidade}`, 11);
        currentY += 2;
      }
      if (dados.descricaoBem) {
        addText('Descrição do Bem/Serviço:', 11, true);
        currentY += 2;
        addText(dados.descricaoBem, 10);
        currentY += 2;
      }
      if (dados.enderecoImovel) {
        addText('Endereço do Imóvel:', 11, true);
        currentY += 2;
        addText(dados.enderecoImovel, 10);
        currentY += 2;
      }
      if (dados.matriculaImovel) {
        addText('Matrícula(s) do Imóvel:', 11, true);
        currentY += 2;
        addText(dados.matriculaImovel, 10);
        currentY += 2;
      }
      if (dados.possuiCEBAS) {
        addText('Possui CEBAS: Sim', 11);
        currentY += 2;
      }
      break;
      
    case 'livros':
    case 'fonogramas':
      if (dados.nomeEntidade) {
        addText(`Nome da Entidade: ${dados.nomeEntidade}`, 11);
        currentY += 2;
      }
      if (dados.descricaoAtividade) {
        addText('Descrição da Atividade:', 11, true);
        currentY += 2;
        addText(dados.descricaoAtividade, 10);
        currentY += 2;
      }
      break;
  }

  currentY += 5;

  // Observações (se houver)
  if (dados.observacoes && dados.observacoes.trim()) {
    checkPageBreak(30);
    let proxSecao = dados.nomeRepresentante ? '4' : '3';
    addText(`${proxSecao}. OBSERVAÇÕES ADICIONAIS`, 12, true);
    currentY += 3;
    addText(dados.observacoes, 10);
    currentY += 8;
  }

  // Declarações Específicas por Tipo
  checkPageBreak(60);
  let secaoDeclaracao = dados.nomeRepresentante ? '4' : '3';
  if (dados.observacoes && dados.observacoes.trim()) {
    secaoDeclaracao = dados.nomeRepresentante ? '5' : '4';
  }
  
  addText(`${secaoDeclaracao}. DECLARAÇÕES ESPECÍFICAS`, 12, true);
  currentY += 3;

  // Adicionar declarações específicas por tipo
  switch (dados.tipo) {
    case 'reciproca':
      addText('• Declaro que o patrimônio, renda ou serviços estão vinculados às finalidades essenciais do ente federativo ou às delas decorrentes.', 10);
      currentY += 3;
      break;
      
    case 'templos':
      addText('• Declaro que o patrimônio, renda ou serviços estão relacionados às finalidades essenciais do templo, conforme o art. 150, § 4º, da Constituição Federal de 1988.', 10);
      currentY += 3;
      break;
      
    case 'partidos':
      addText('• Declaro que a entidade NÃO distribui qualquer parcela de seu patrimônio ou de suas rendas, a qualquer título.', 10);
      currentY += 3;
      addText('• Declaro que a entidade aplica integralmente, no País, os seus recursos na manutenção dos seus objetivos institucionais.', 10);
      currentY += 3;
      addText('• Declaro que a entidade mantém escrituração de suas receitas e despesas em livros revestidos de formalidades capazes de assegurar sua exatidão.', 10);
      currentY += 3;
      addText('• Declaro que o patrimônio, renda ou serviços estão vinculados às suas finalidades essenciais ou às delas decorrentes.', 10);
      currentY += 3;
      break;
      
    case 'livros':
      addText('• Declaro que o patrimônio, renda ou serviços estão vinculados à produção ou circulação de livros, jornais ou periódicos, ou ao papel destinado à sua impressão.', 10);
      currentY += 3;
      break;
      
    case 'fonogramas':
      addText('• Declaro que os fonogramas/videofonogramas são produzidos no Brasil, contendo obras musicais ou literomusicais de autores brasileiros e/ou interpretadas por artistas brasileiros.', 10);
      currentY += 3;
      addText('• Declaro que o patrimônio, renda ou serviços estão vinculados à produção ou circulação dos fonogramas e videofonogramas musicais, e que não se refere à etapa de replicação industrial de mídias ópticas de leitura a laser.', 10);
      currentY += 3;
      break;
  }

  currentY += 5;

  // Declaração de Responsabilidade Geral
  checkPageBreak(60);
  addText('DECLARAÇÃO DE RESPONSABILIDADE GERAL', 12, true);
  currentY += 3;
  
  const declaracao = 'Declaro, sob as penas da lei, que as informações prestadas nesta autodeclaração são verdadeiras e que a entidade preenche todos os requisitos legais e constitucionais para o gozo da imunidade tributária pleiteada, estando ciente de que a falsidade das informações implicará na suspensão ou cancelamento da imunidade e na cobrança dos impostos devidos, com os acréscimos legais.';
  addText(declaracao, 10);
  currentY += 10;

  // Data e Local
  checkPageBreak(30);
  const dataFormatada = new Date(dados.dataDeclaracao).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  doc.setFontSize(11);
  doc.text(`Porto Velho, ${dataFormatada}`, pageWidth / 2, currentY, { align: 'center' });
  currentY += 20;

  // Assinatura
  checkPageBreak(30);
  doc.setDrawColor(150);
  doc.line(margin + 30, currentY, pageWidth - margin - 30, currentY);
  currentY += 5;
  doc.setFontSize(10);
  doc.text('Assinatura do Declarante ou Representante Legal', pageWidth / 2, currentY, { align: 'center' });
  currentY += 15;

  // Rodapé
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text('Instrução Normativa SEMEC/SRM Nº 001/2025', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Salvar PDF
  const nomeArquivo = `Requerimento_Imunidade_${dados.tipo}_${Date.now()}.pdf`;
  doc.save(nomeArquivo);
};

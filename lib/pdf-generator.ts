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

// 🎨 PALETA DE CORES DO SISTEMA (Baseada em pdf-styles.js)
const CORES_REF = {
  primaryBlue: [30, 58, 95] as RGBColor,    // #1e3a5f
  accentGreen: [112, 182, 67] as RGBColor,   // #70b643
  accentYellow: [242, 201, 76] as RGBColor,  // #f2c94c
  textDark: [55, 65, 81] as RGBColor,       // #374151
  textMedium: [107, 114, 128] as RGBColor,  // #6b7280
  borderLight: [229, 231, 235] as RGBColor, // #e5e7eb
  backgroundSection: [245, 245, 245] as RGBColor, // #f5f5f5
  white: [255, 255, 255] as RGBColor,
};

const CORES = {
  reciproca: { primaria: CORES_REF.accentGreen, clara: [240, 253, 244] as RGBColor, escura: [22, 163, 74] as RGBColor },
  templos: { primaria: [168, 85, 247] as RGBColor, clara: [250, 245, 255] as RGBColor, escura: [147, 51, 234] as RGBColor },
  partidos: { primaria: [249, 115, 22] as RGBColor, clara: [255, 247, 237] as RGBColor, escura: [234, 88, 12] as RGBColor },
  livros: { primaria: [99, 102, 241] as RGBColor, clara: [238, 242, 255] as RGBColor, escura: [79, 70, 229] as RGBColor },
  fonogramas: { primaria: [236, 72, 153] as RGBColor, clara: [253, 242, 248] as RGBColor, escura: [219, 39, 119] as RGBColor },
};

// Informações sobre cada tipo (SEM emojis para compatibilidade com jsPDF)
const tiposImunidade: Record<string, { titulo: string; fundamento: string }> = {
  reciproca: {
    titulo: 'Imunidade Recíproca (Entes Federativos)',
    fundamento: 'Art. 150, VI, "a", CF/88',
  },
  templos: {
    titulo: 'Imunidade - Templos de Qualquer Culto',
    fundamento: 'Art. 150, VI, "b", CF/88',
  },
  partidos: {
    titulo: 'Imunidade - Partidos, Sindicatos, Educação e Assistência Social',
    fundamento: 'Art. 150, VI, "c", CF/88',
  },
  livros: {
    titulo: 'Imunidade - Livros, Jornais e Periódicos',
    fundamento: 'Art. 150, VI, "d", CF/88',
  },
  fonogramas: {
    titulo: 'Imunidade - Fonogramas e Videofonogramas Musicais',
    fundamento: 'Art. 150, VI, "e", CF/88',
  },
};

// 🎨 Tipo para cores RGB (tuple de 3 números)
type RGBColor = [number, number, number];

export const gerarPDFRequerimento = async (dados: DadosFormulario) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let currentY = margin;
  let sectionStartY: number | null = null;

  // ========================================
  // FUNÇÕES AUXILIARES
  // ========================================

  // Desenha o contorno da seção atual
  const finalizeSectionBorder = () => {
    if (sectionStartY !== null && currentY > sectionStartY) {
      doc.setDrawColor(...CORES_REF.borderLight);
      doc.setLineWidth(0.4); // Traço fino conforme solicitado
      // A altura deve ser a diferença entre o ponto atual e o início da seção
      // Subtraímos um pequeno ajuste (ex: 2mm) para a caixa não ficar muito colada no próximo título
      const boxHeight = currentY - sectionStartY - 5;
      doc.rect(margin, sectionStartY, pageWidth - 2 * margin, boxHeight);
    }
  };

  // Verificar quebra de página
  const checkPageBreak = (requiredSpace: number) => {
    const footerReserve = 30;
    if (currentY + requiredSpace > pageHeight - footerReserve) {
      finalizeSectionBorder(); // Fecha borda na página atual
      doc.addPage();
      currentY = margin;
      if (sectionStartY !== null) {
        sectionStartY = margin; // Reinicia borda na nova página
      }
      return true;
    }
    return false;
  };

  // Adicionar texto com quebra automática
  const addText = (
    text: string,
    fontSize: number = 11,
    isBold: boolean = false,
    cor: RGBColor = CORES_REF.textDark
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(...cor);
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin - 4);
    const lineHeight = fontSize * 0.45;

    checkPageBreak(lines.length * lineHeight + 5);
    doc.text(lines, margin + 2, currentY);
    currentY += lines.length * lineHeight;
  };

  // Adicionar título de seção (Estilo pdf-styles.js)
  const addSectionTitle = (titulo: string) => {
    finalizeSectionBorder(); // Fecha a seção anterior

    checkPageBreak(30);
    sectionStartY = currentY; // Marca o início da nova seção

    // Fundo da seção (primaryBlue)
    doc.setFillColor(...CORES_REF.primaryBlue);
    doc.rect(margin, currentY, pageWidth - 2 * margin, 8, 'F');


    // Texto da seção (branco)
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...CORES_REF.white);
    doc.text(titulo.toUpperCase(), margin + 3, currentY + 5);

    currentY += 10;
  };

  // Adicionar campo com label e valor (Estilo makeFieldGrid)
  const addField = (label: string, valor: string) => {
    checkPageBreak(8);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...CORES_REF.primaryBlue);
    doc.text(`${label}:`, margin + 2, currentY);

    const labelWidth = doc.getTextWidth(`${label}:`);
    const valoPosx = margin + labelWidth + 4;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...CORES_REF.textDark);

    const disponivelValor = pageWidth - valoPosx - margin - 2;
    const valorTexto = valor || '---';
    const lines = doc.splitTextToSize(valorTexto, disponivelValor);

    doc.text(lines, valoPosx, currentY);
    currentY += (lines.length * 4) + 2;
  };

  // ========================================
  // CABEÇALHO INSTITUCIONAL (Estilo _makeHeaderInstitucional)
  // ========================================

  // Quadro de fundo
  doc.setFillColor(...CORES_REF.backgroundSection);
  doc.rect(margin, margin, pageWidth - 2 * margin, 20, 'F');

  // Linha inferior decorativa
  doc.setDrawColor(...CORES_REF.accentGreen);
  doc.setLineWidth(0.8);
  doc.line(margin, margin + 20, pageWidth - margin, margin + 20);

  // Texto do cabeçalho
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...CORES_REF.primaryBlue);
  doc.text('PREFEITURA MUNICIPAL DE PORTO VELHO', pageWidth / 2, margin + 9, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('SECRETARIA MUNICIPAL DE ECONOMIA', pageWidth / 2, margin + 14, { align: 'center' });

  currentY = margin + 30;


  // ========================================
  // TÍTULO DO DOCUMENTO
  // ========================================

  checkPageBreak(20);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...CORES_REF.accentGreen);
  doc.text('REQUERIMENTO – IMUNIDADE TRIBUTÁRIA', pageWidth / 2, currentY, { align: 'center' });
  currentY += 5;

  const infoTipo = tiposImunidade[dados.tipo] || tiposImunidade.reciproca;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...CORES_REF.textDark);
  doc.text(infoTipo.titulo.toUpperCase(), pageWidth / 2, currentY, { align: 'center' });
  currentY += 5;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...CORES_REF.textMedium);
  doc.text(infoTipo.fundamento, pageWidth / 2, currentY, { align: 'center' });
  currentY += 10;

  // ========================================
  // SEÇÃO 1: IDENTIFICAÇÃO DO DECLARANTE
  // ========================================

  addSectionTitle('1. IDENTIFICAÇÃO DO DECLARANTE');

  currentY += 3;
  addField('Razão Social', dados.razaoSocial);
  addField('CNPJ', dados.cnpj);
  addField('Endereço', dados.endereco);
  addField('Telefone', dados.telefone);
  addField('E-mail', dados.email);

  currentY += 3;

  // ========================================
  // SEÇÃO 2: REPRESENTANTE LEGAL
  // ========================================

  if (dados.nomeRepresentante) {
    addSectionTitle('2. REPRESENTANTE LEGAL');
    currentY += 3;
    addField('Nome', dados.nomeRepresentante);
    if (dados.cpfRepresentante) addField('CPF', dados.cpfRepresentante);
    if (dados.cargoRepresentante) addField('Cargo/Função', dados.cargoRepresentante);
    currentY += 5;
  }

  // ========================================
  // SEÇÃO 3: DADOS ESPECÍFICOS
  // ========================================

  const numeroSecaoDados = dados.nomeRepresentante ? '3' : '2';
  addSectionTitle(`${numeroSecaoDados}. DADOS ESPECÍFICOS DO PEDIDO`);

  currentY += 3;

  switch (dados.tipo) {
    case 'reciproca':
      if (dados.naturezaJuridica) addField('Natureza Jurídica', dados.naturezaJuridica);
      if (dados.descricaoBem) addField('Descrição', dados.descricaoBem);
      if (dados.enderecoImovel) addField('Endereço do Imóvel', dados.enderecoImovel);
      if (dados.matriculaImovel) addField('Matrícula(s)', dados.matriculaImovel);
      break;
    case 'templos':
      if (dados.nomeTemplo) addField('Nome do Templo', dados.nomeTemplo);
      if (dados.enderecoImovel) addField('Endereço do Imóvel', dados.enderecoImovel);
      if (dados.matriculaImovel) addField('Matrícula(s)', dados.matriculaImovel);
      break;
    case 'partidos':
      if (dados.nomeEntidade) addField('Nome da Entidade', dados.nomeEntidade);
      if (dados.tipoEntidade) addField('Tipo', dados.tipoEntidade);
      if (dados.descricaoBem) addField('Descrição', dados.descricaoBem);
      if (dados.enderecoImovel) addField('Endereço do Imóvel', dados.enderecoImovel);
      if (dados.matriculaImovel) addField('Matrícula(s)', dados.matriculaImovel);
      if (dados.possuiCEBAS) addField('Possui CEBAS', 'Sim');
      break;
    default:
      if (dados.nomeEntidade) addField('Nome da Entidade', dados.nomeEntidade);
      if (dados.descricaoAtividade) addField('Atividade', dados.descricaoAtividade);
  }

  currentY += 5;

  // ========================================
  // SEÇÃO 4: OBSERVAÇÕES
  // ========================================

  if (dados.observacoes && dados.observacoes.trim()) {
    let numeroSecaoObs = dados.nomeRepresentante ? '4' : '3';
    addSectionTitle(`${numeroSecaoObs}. OBSERVAÇÕES ADICIONAIS`);
    currentY += 3;
    addText(dados.observacoes, 9);
    currentY += 5;
  }

  // ========================================
  // SEÇÃO: DECLARAÇÕES
  // ========================================

  let numeroSecaoDecl = dados.nomeRepresentante ? '5' : '4';
  if (dados.observacoes && dados.observacoes.trim()) {
    numeroSecaoDecl = (parseInt(numeroSecaoDecl) + 1).toString();
  }

  addSectionTitle(`${numeroSecaoDecl}. DECLARAÇÕES ESPECÍFICAS`);

  currentY += 3;

  const textOptions = { fontSize: 8.5, color: CORES_REF.textDark };

  switch (dados.tipo) {
    case 'reciproca':
      addText('• Declaro que o patrimônio, renda ou serviços estão vinculados às finalidades essenciais do ente federativo.', 8.5);
      break;
    case 'templos':
      addText('• Declaro que o patrimônio, renda ou serviços estão relacionados às finalidades essenciais do templo.', 8.5);
      break;
    case 'partidos':
      addText('• Declaro que a entidade NÃO distribui qualquer parcela de seu patrimônio ou de suas rendas.', 8.5);
      addText('• Declaro que aplica integralmente seus recursos na manutenção dos objetivos institucionais no País.', 8.5);
      addText('• Declaro que mantém escrituração de suas receitas e despesas.', 8.5);
      break;
    default:
      addText('• Declaro que o patrimônio, renda ou serviços estão vinculados às finalidades essenciais da entidade.', 8.5);
  }

  currentY += 10;

  // ========================================
  // TERMO DE RESPONSABILIDADE (Estilo _makeTermo)
  // ========================================

  addSectionTitle('TERMO DE RESPONSABILIDADE');

  currentY += 3;

  const clausulas = [
    'As informações prestadas são verdadeiras e a entidade preenche os requisitos legais para imunidade.',
    'A falsidade das informações implicará na suspensão ou cancelamento da imunidade e cobrança de impostos.',
    'Estou ciente de que devo manter a documentação comprobatória à disposição do fisco municipal.',
  ];

  clausulas.forEach((c, i) => {
    addText(`${i + 1}. ${c}`, 8);
  });

  currentY += 4;

  finalizeSectionBorder();
  currentY += 10;

  // ========================================
  // ASSINATURAS
  // ========================================

  const yFixoAssinatura = pageHeight - 40;
  if (currentY > yFixoAssinatura - 15) {
    doc.addPage();
  }

  const boxHeight = 50;
  doc.rect(margin, yFixoAssinatura - 28, pageWidth - 2 * margin, boxHeight);

  doc.setDrawColor(...CORES_REF.borderLight);
  doc.setLineWidth(0.5);
  doc.line(margin + 20, yFixoAssinatura, pageWidth - margin - 20, yFixoAssinatura);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...CORES_REF.textMedium);
  doc.text('Assinatura do Declarante ou Representante Legal', pageWidth / 2, yFixoAssinatura + 5, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('Este documento pode ser assinado digitalmente pelo GOV.BR, SEI ou outro meio legal.', pageWidth / 2, yFixoAssinatura + 10, { align: 'center' });
  currentY += 7;
  // ========================================
  // RODAPÉ (Estilo makeDocFooter)
  // ========================================

  // Finaliza a borda da última seção antes de salvar


  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...CORES_REF.textMedium);
    doc.text(`Página ${i} de ${totalPages} | Gerado em ${new Date().toLocaleDateString('pt-BR')} | Porto Velho - RO`, pageWidth / 2, pageHeight - 5, { align: 'center' });
  }



  // ========================================
  // SALVAR PDF
  // ========================================

  const tipoFormatado = dados.tipo.charAt(0).toUpperCase() + dados.tipo.slice(1);
  const nomeArquivo = `Requerimento_Imunidade_${tipoFormatado}_${dados.razaoSocial.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.pdf`;
  doc.save(nomeArquivo);
};
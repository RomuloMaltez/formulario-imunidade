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

// 🎨 Tipo para cores RGB (tuple de 3 números)
type RGBColor = [number, number, number];

// 🎨 PALETA DE CORES DO SISTEMA
const CORES = {
  // Cores principais por tipo de imunidade
  reciproca: {
    primaria: [34, 197, 94] as RGBColor,      // green-500
    clara: [240, 253, 244] as RGBColor,        // green-50
    escura: [22, 163, 74] as RGBColor,         // green-600
    blackfull: [0, 0, 0] as RGBColor,          // black
  },
  templos: {
    primaria: [168, 85, 247] as RGBColor,      // purple-500
    clara: [250, 245, 255] as RGBColor,        // purple-50
    escura: [147, 51, 234] as RGBColor,        // purple-600
    blackfull: [0, 0, 0] as RGBColor,          // black
  },
  partidos: {
    primaria: [249, 115, 22] as RGBColor,      // orange-500
    clara: [255, 247, 237] as RGBColor,        // orange-50
    escura: [234, 88, 12] as RGBColor,         // orange-600
    blackfull: [0, 0, 0] as RGBColor,          // black
  },
  livros: {
    primaria: [99, 102, 241] as RGBColor,      // indigo-500
    clara: [238, 242, 255] as RGBColor,        // indigo-50
    escura: [79, 70, 229] as RGBColor,         // indigo-600
    blackfull: [0, 0, 0] as RGBColor,          // black
  },
  fonogramas: {
    primaria: [236, 72, 153] as RGBColor,      // pink-500
    clara: [253, 242, 248] as RGBColor,        // pink-50
    escura: [219, 39, 119] as RGBColor,
    blackfull: [0, 0, 0] as RGBColor,          // black

    // pink-600
  },
};

// Cores institucionais
const COR_AZUL: RGBColor = [59, 130, 246];      // blue-500
const COR_AZUL_ESCURO: RGBColor = [30, 64, 175]; // blue-800
const COR_CINZA: RGBColor = [107, 114, 128];     // gray-500
const COR_CINZA_CLARO: RGBColor = [249, 250, 251]; // gray-50

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

// Resultado do carregamento de imagem: base64 + dimensões reais
interface ImagemCarregada {
  base64: string;
  width: number;  // px
  height: number; // px
}

// Carrega imagem e retorna base64 junto com suas dimensões reais
const carregarImagem = async (url: string): Promise<ImagemCarregada> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  // Carregar em um elemento de imagem para ler as dimensões reais
  const dims = await new Promise<{ width: number; height: number }>((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve({ width: 1, height: 1 }); // fallback seguro
    img.src = base64;
  });
  return { base64, width: dims.width, height: dims.height };
};

export const gerarPDFRequerimento = async (dados: DadosFormulario) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let currentY = margin;

  // Obter cores do tipo específico
  const coresTipo = CORES[dados.tipo as keyof typeof CORES] || CORES.reciproca;

  // ========================================
  // FUNÇÕES AUXILIARES
  // ========================================

  // Verificar quebra de página (reserva espaço para o footer em todas as páginas)
  const checkPageBreak = (requiredSpace: number) => {
    const footerReserve = footerHeightReal > 0 ? footerHeightReal + 2 : margin;
    if (currentY + requiredSpace > pageHeight - footerReserve) {
      doc.addPage();
      currentY = margin;
      return true;
    }
    return false;
  };



  // Desenhar caixa colorida para seções
  const desenharCaixaSecao = (y: number, altura: number, destaque: boolean = false) => {
    if (destaque) {
      doc.setFillColor(...coresTipo.clara);
      doc.setDrawColor(...coresTipo.blackfull);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin - 5, y - 5, pageWidth - 2 * margin + 10, altura, 0.5, 0.5, 'FD');
    } else {
      doc.setFillColor(...COR_CINZA_CLARO);
      doc.roundedRect(margin - 5, y - 5, pageWidth - 2 * margin + 10, altura, 0.5, 0.5, 'F');
    }
  };

  // Adicionar texto com quebra automática
  const addText = (
    text: string,
    fontSize: number = 11,
    isBold: boolean = false,
    cor: RGBColor = [0, 0, 0]
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(...cor);
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin - 10);
    const lineHeight = fontSize * 0.5;

    checkPageBreak(lines.length * lineHeight + 5);
    doc.text(lines, margin, currentY);
    currentY += lines.length * lineHeight;
  };

  // Adicionar título de seção
  const addSectionTitle = (simbolo: string, titulo: string, destaque: boolean = false) => {
    checkPageBreak(15);

    if (destaque) {
      // Caixa de destaque para o título
      desenharCaixaSecao(currentY, 12, true);
    }

    // Titulo da seção em preto
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...coresTipo.blackfull);
    // Apenas o título, sem símbolo
    doc.text(titulo, margin, currentY + 2, { baseline: 'middle' });
    currentY += 10;
  };

  // Adicionar campo com label e valor
  const addField = (label: string, valor: string) => {
    checkPageBreak(10);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COR_CINZA);
    doc.text(`${label}:`, margin, currentY);
    currentY += 5;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const lines = doc.splitTextToSize(valor, pageWidth - 2 * margin - 5);
    doc.text(lines, margin + 5, currentY);
    currentY += lines.length * 4 + 3;
  };

  // ========================================
  // CARREGAR IMAGENS
  // ========================================

  let imgHeader: ImagemCarregada | null = null;
  let imgFooter: ImagemCarregada | null = null;

  try {
    imgHeader = await carregarImagem('/semec-timbrado-cabecalho.png');
  } catch (e) {
    console.warn('Não foi possível carregar a imagem do header:', e);
  }

  try {
    imgFooter = await carregarImagem('/semec-timbrado-rodape.png');
  } catch (e) {
    console.warn('Não foi possível carregar a imagem do footer:', e);
  }

  // Calcular alturas proporcionais (largura total da página = 210mm para A4)
  // Fórmula: alturaReal_mm = pageWidth_mm × (alturaImg_px / larguraImg_px)
  const headerHeightReal = imgHeader
    ? pageWidth * (imgHeader.height / imgHeader.width)
    : 0;
  const footerHeightReal = imgFooter
    ? pageWidth * (imgFooter.height / imgFooter.width)
    : 0;

  // ========================================
  // INÍCIO DO DOCUMENTO — borda lateral
  // ========================================



  // ========================================
  // CABEÇALHO — imagem apenas na página 1
  // ========================================

  if (imgHeader) {
    doc.addImage(imgHeader.base64, 'PNG', 0, 0, pageWidth, headerHeightReal);
    currentY = headerHeightReal + 5;
  } else {
    currentY = margin;
  }


  // ========================================
  // TÍTULO PRINCIPAL COM COR DO TIPO
  // ========================================

  checkPageBreak(20);

  // Caixa colorida para o título
  doc.setFillColor(...coresTipo.blackfull);
  doc.roundedRect(margin - 5, currentY - 8, pageWidth - 2 * margin + 10, 18, 0.5, 0.5, 'F');

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('REQUERIMENTO DE IMUNIDADE TRIBUTÁRIA', pageWidth / 2, currentY, { align: 'center', baseline: 'middle' });
  currentY += 15;

  // ========================================
  // TIPO DE IMUNIDADE (com fundamento legal)
  // ========================================

  checkPageBreak(25);

  const infoTipo = tiposImunidade[dados.tipo] || tiposImunidade.reciproca;

  // Caixa de destaque
  desenharCaixaSecao(currentY, 20, true);
  currentY += 2;

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...coresTipo.blackfull);
  doc.text(infoTipo.titulo, pageWidth / 2, currentY, { align: 'center', baseline: 'middle' });
  currentY += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COR_CINZA);
  doc.text(infoTipo.fundamento, pageWidth / 2, currentY, { align: 'center', baseline: 'middle' });
  currentY += 18;

  // ========================================
  // SEÇÃO 1: IDENTIFICAÇÃO DO DECLARANTE
  // ========================================

  checkPageBreak(60);
  addSectionTitle('', '1. IDENTIFICAÇÃO DO DECLARANTE');
  currentY += 2;

  addField('Nome/Razão Social', dados.razaoSocial);
  addField('CNPJ', dados.cnpj);
  addField('Endereço', dados.endereco);
  addField('Telefone', dados.telefone);
  addField('E-mail', dados.email);

  currentY += 5;

  // ========================================
  // SEÇÃO 2: REPRESENTANTE LEGAL (se houver)
  // ========================================

  if (dados.nomeRepresentante) {
    checkPageBreak(40);
    addSectionTitle('', '2. REPRESENTANTE LEGAL');
    currentY += 2;

    addField('Nome', dados.nomeRepresentante);

    if (dados.cpfRepresentante) {
      addField('CPF', dados.cpfRepresentante);
    }

    if (dados.cargoRepresentante) {
      addField('Cargo/Função', dados.cargoRepresentante);
    }

    currentY += 5;
  }

  // ========================================
  // SEÇÃO 3: DADOS ESPECÍFICOS
  // ========================================

  checkPageBreak(30);
  const numeroSecaoDados = dados.nomeRepresentante ? '3' : '2';
  addSectionTitle('', `${numeroSecaoDados}. DADOS ESPECÍFICOS DO PEDIDO`);
  currentY += 2;

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
        addField('Natureza Jurídica', naturezaMap[dados.naturezaJuridica] || dados.naturezaJuridica);
      }
      if (dados.descricaoBem) {
        addField('Descrição do Bem/Serviço', dados.descricaoBem);
      }
      if (dados.enderecoImovel) {
        addField('Endereço do Imóvel', dados.enderecoImovel);
      }
      if (dados.matriculaImovel) {
        addField('Matrícula(s) do Imóvel', dados.matriculaImovel);
      }
      break;

    case 'templos':
      if (dados.nomeTemplo) {
        addField('Nome do Templo', dados.nomeTemplo);
      }
      if (dados.enderecoImovel) {
        addField('Endereço do Imóvel', dados.enderecoImovel);
      }
      if (dados.matriculaImovel) {
        addField('Matrícula(s) do Imóvel', dados.matriculaImovel);
      }
      break;

    case 'partidos':
      if (dados.nomeEntidade) {
        addField('Nome da Entidade', dados.nomeEntidade);
      }
      if (dados.tipoEntidade) {
        const tipoMap: Record<string, string> = {
          'PartidoPolitico': 'Partido Político',
          'EntidadeSindical': 'Entidade Sindical',
          'InstituicaoEducacao': 'Instituição de Educação',
          'InstituicaoAssistencia': 'Instituição de Assistência Social'
        };
        addField('Tipo de Entidade', tipoMap[dados.tipoEntidade] || dados.tipoEntidade);
      }
      if (dados.descricaoBem) {
        addField('Descrição do Bem/Serviço', dados.descricaoBem);
      }
      if (dados.enderecoImovel) {
        addField('Endereço do Imóvel', dados.enderecoImovel);
      }
      if (dados.matriculaImovel) {
        addField('Matrícula(s) do Imóvel', dados.matriculaImovel);
      }
      if (dados.possuiCEBAS) {
        addField('Possui CEBAS', 'Sim');
      }
      break;

    case 'livros':
    case 'fonogramas':
      if (dados.nomeEntidade) {
        addField('Nome da Entidade', dados.nomeEntidade);
      }
      if (dados.descricaoAtividade) {
        addField('Descrição da Atividade', dados.descricaoAtividade);
      }
      break;
  }

  currentY += 5;

  // ========================================
  // SEÇÃO 4: OBSERVAÇÕES (se houver)
  // ========================================

  if (dados.observacoes && dados.observacoes.trim()) {
    checkPageBreak(35);
    let numeroSecaoObs = dados.nomeRepresentante ? '4' : '3';
    addSectionTitle('', `${numeroSecaoObs}. OBSERVAÇÕES ADICIONAIS`);
    currentY += 2;

    addText(dados.observacoes, 10);
    currentY += 5;
  }

  // ========================================
  // SEÇÃO: DECLARAÇÕES ESPECÍFICAS
  // ========================================

  checkPageBreak(70);
  let numeroSecaoDecl = dados.nomeRepresentante ? '4' : '3';
  if (dados.observacoes && dados.observacoes.trim()) {
    numeroSecaoDecl = dados.nomeRepresentante ? '5' : '4';
  }

  addSectionTitle('', `${numeroSecaoDecl}. DECLARAÇÕES ESPECÍFICAS`, true);
  currentY += 5;

  // Adicionar declarações específicas por tipo
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  switch (dados.tipo) {
    case 'reciproca':
      addText('• Declaro que o patrimônio, renda ou serviços estão vinculados às finalidades essenciais do ente federativo ou às delas decorrentes.', 10);
      currentY += 10;
      break;

    case 'templos':
      addText('• Declaro que o patrimônio, renda ou serviços estão relacionados às finalidades essenciais do templo, conforme o art. 150, § 4º, da Constituição Federal de 1988.', 10);
      currentY += 10;
      break;

    case 'partidos':
      addText('• Declaro que a entidade NÃO distribui qualquer parcela de seu patrimônio ou de suas rendas, a qualquer título.', 10);
      currentY += 3;
      addText('• Declaro que a entidade aplica integralmente, no País, os seus recursos na manutenção dos seus objetivos institucionais.', 10);
      currentY += 3;
      addText('• Declaro que a entidade mantém escrituração de suas receitas e despesas em livros revestidos de formalidades capazes de assegurar sua exatidão.', 10);
      currentY += 3;
      addText('• Declaro que o patrimônio, renda ou serviços estão vinculados às suas finalidades essenciais ou às delas decorrentes.', 10);
      currentY += 10;
      break;

    case 'livros':
      addText('• Declaro que o patrimônio, renda ou serviços estão vinculados à produção ou circulação de livros, jornais ou periódicos, ou ao papel destinado à sua impressão.', 10);
      currentY += 10;
      break;

    case 'fonogramas':
      addText('• Declaro que os fonogramas/videofonogramas são produzidos no Brasil, contendo obras musicais ou literomusicais de autores brasileiros e/ou interpretadas por artistas brasileiros.', 10);
      currentY += 3;
      addText('• Declaro que o patrimônio, renda ou serviços estão vinculados à produção ou circulação dos fonogramas e videofonogramas musicais, e que não se refere à etapa de replicação industrial de mídias ópticas de leitura a laser.', 10);
      currentY += 10;
      break;
  }

  // ========================================
  // DECLARAÇÃO DE RESPONSABILIDADE GERAL
  // ========================================

  checkPageBreak(70);

  // Caixa de destaque vermelha para a declaração importante
  doc.setFillColor(254, 242, 242); // red-50
  doc.setDrawColor(239, 68, 68); // red-500
  doc.setLineWidth(0.5);
  doc.roundedRect(margin - 5, currentY - 7, pageWidth - 2 * margin + 10, 40, 0.5, 0.5, 'FD');

  currentY += 2;

  // Título com fonte menor e margens maiores
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(185, 28, 28); // red-700
  const tituloDeclaracao = 'DECLARAÇÃO DE RESPONSABILIDADE GERAL';
  const linhasTitulo = doc.splitTextToSize(tituloDeclaracao, pageWidth - 2 * margin - 30);
  doc.text(linhasTitulo, pageWidth / 2, currentY, { align: 'center' });
  currentY += 10;

  // Texto da declaração com margem ainda maior
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  const declaracao = 'Declaro, sob as penas da lei, que as informações prestadas nesta autodeclaração são verdadeiras e que a entidade preenche todos os requisitos legais e constitucionais para o gozo da imunidade tributária pleiteada, estando ciente de que a falsidade das informações implicará na suspensão ou cancelamento da imunidade e na cobrança dos impostos devidos, com os acréscimos legais.';
  const larguraMax = pageWidth - 2 * margin - 10;

  doc.text(declaracao, margin + 5, currentY, { maxWidth: larguraMax, align: 'justify' });
  currentY += 35;

  // ========================================
  // DATA E LOCAL
  // ========================================

  checkPageBreak(40);
  const dataFormatada = new Date(dados.dataDeclaracao).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COR_CINZA);
  doc.text(`Porto Velho/RO, ${dataFormatada}`, pageWidth / 2, currentY, { align: 'center' });
  currentY += 20;

  // ========================================
  // ASSINATURA
  // ========================================

  // 1. Defina a distância do fim da folha (ex: 40 unidades)
  const margemSeguranca = 50;
  const yFixoAssinatura = pageHeight - margemSeguranca;

  // 2. IMPORTANTE: Se o texto anterior (currentY) já passou do ponto da assinatura,
  // precisamos de uma nova página para não encavalar.
  if (currentY > yFixoAssinatura - 10) {
    doc.addPage();
    // Se adicionou página, o currentY não importa mais para a assinatura fixa
  }

  // 3. Desenho da Linha (USANDO yFixoAssinatura em vez de currentY)
  doc.setDrawColor(...COR_CINZA);
  doc.setLineWidth(0.5);
  // Aqui está o segredo: trocamos 'currentY' por 'yFixoAssinatura'
  doc.line(margin + 35, yFixoAssinatura, pageWidth - margin - 35, yFixoAssinatura);

  // 4. Texto da Assinatura
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COR_CINZA);
  // Usamos o yFixoAssinatura + 5 para o texto ficar logo abaixo da linha
  doc.text('Assinatura do Declarante ou Representante Legal', pageWidth / 2, yFixoAssinatura + 5, { align: 'center' });


  // ========================================
  // RODAPÉ — imagem em todas as páginas
  // ========================================

  if (imgFooter) {
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.addImage(imgFooter.base64, 'PNG', 0, pageHeight - footerHeightReal, pageWidth, footerHeightReal);
    }
    // Volta para a última página antes de salvar
    doc.setPage(totalPages);
  }

  // ========================================
  // SALVAR PDF
  // ========================================

  const tipoFormatado = dados.tipo.charAt(0).toUpperCase() + dados.tipo.slice(1);
  const nomeArquivo = `Requerimento_Imunidade_${tipoFormatado}_${dados.razaoSocial.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.pdf`;
  doc.save(nomeArquivo);
};
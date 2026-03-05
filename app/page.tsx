"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
  };

  const tiposImunidade = [
    {
      tipo: 'reciproca',
      titulo: 'Imunidade Recíproca',
      descricao: 'União, Estados, Distrito Federal e Municípios',
      icon: '🏛️',
      fundamento: 'Art. 150, VI, "a", CF/88',
      cor: 'green',
    },
    {
      tipo: 'templos',
      titulo: 'Templos de Qualquer Culto',
      descricao: 'Patrimônio, renda ou serviços relacionados às finalidades essenciais',
      icon: '⛪',
      fundamento: 'Art. 150, VI, "b", CF/88',
      cor: 'purple',
    },
    {
      tipo: 'partidos',
      titulo: 'Partidos, Sindicatos, Educação e Assistência Social',
      descricao: 'Entidades sem fins lucrativos que atendem requisitos legais',
      icon: '🏫',
      fundamento: 'Art. 150, VI, "c", CF/88',
      cor: 'orange',
    },
    {
      tipo: 'livros',
      titulo: 'Livros, Jornais e Periódicos',
      descricao: 'Papel destinado à sua impressão',
      icon: '📰',
      fundamento: 'Art. 150, VI, "d", CF/88',
      cor: 'indigo',
    },
    {
      tipo: 'fonogramas',
      titulo: 'Fonogramas e Videofonogramas Musicais',
      descricao: 'Produzidos no Brasil com autores/artistas brasileiros',
      icon: '🎵',
      fundamento: 'Art. 150, VI, "e", CF/88',
      cor: 'pink',
    },
  ];

  const filteredTiposImunidade = tiposImunidade.filter(item =>
    item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cores = {
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
    indigo: 'bg-indigo-500 hover:bg-indigo-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header SEMEC */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-4 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_300px] lg:items-center lg:gap-8">
          {/* Logo */}
          <div className="order-1 flex w-full items-center justify-center self-center lg:order-1 lg:w-auto lg:justify-start lg:self-start lg:pr-4">
            <Link href="/" aria-label="Ir para a página inicial da SEMEC Porto Velho" className="shrink-0">
              <Image src="/logo-semec.svg" alt="Logotipo da Prefeitura de Porto Velho - SEMEC" width={200} height={200} className="object-contain" style={{ width: '200px', height: '200px' }} />
            </Link>
          </div>

          {/* Ilustração da Cidade */}
          <div className="order-3 flex w-full items-center lg:order-2">
            <div className="flex h-full w-full items-center justify-center overflow-visible">
              <div className="relative w-full max-w-[1280px]">
                <Image src="/PortoVelhoPintura.svg" alt="Ilustração linear destacando pontos turísticos de Porto Velho" width={1280} height={190} className="h-[190px] w-full object-cover" />
              </div>
            </div>
          </div>

          {/* Redes Sociais e Busca */}
          <div className="order-2 flex flex-col gap-3 lg:order-3 lg:items-end relative">
            <div className="flex w-full items-center justify-center gap-3 lg:w-[300px] lg:justify-end">
              <div className="flex items-center gap-2">
                {/* Instagram */}
                <a href="https://www.instagram.com/semec.pvh/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da SEMEC" className="inline-flex h-14 w-14 items-center justify-center rounded-md border border-rose-100 bg-rose-50 text-[#E1306C] shadow-sm transition hover:border-rose-200 hover:bg-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E1306C]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a href="https://api.whatsapp.com/send?phone=556999425251" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da SEMEC" className="inline-flex h-14 w-14 items-center justify-center rounded-md border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
              {/* Botão de busca */}
              <button
                id="search-toggle"
                aria-label="Toggle busca"
                onClick={handleSearchToggle}
                className="inline-flex h-14 w-14 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--pv-blue-900)]"
              >
                {isSearchOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                )}
              </button>
            </div>

            {/* Formulário de busca retrátil */}
            <form
              id="site-search-form"
              className={`${isSearchOpen ? 'block' : 'hidden'} absolute top-[12px] left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-[500px] lg:w-[500px] transition-all duration-300`}
              aria-label="Barra de busca do portal"
              onSubmit={handleSearchSubmit}
            >
              <div className="flex w-full items-center rounded-md border border-slate-200 bg-white shadow-lg focus-within:border-[color:var(--pv-blue-900)] focus-within:ring-2 focus-within:ring-[color:var(--pv-blue-900)]/10">
                <label htmlFor="site-search" className="sr-only">
                  O que você procura?
                </label>

                <span className="pl-3 text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </span>

                <input
                  id="site-search"
                  name="search"
                  type="search"
                  placeholder="O que você procura?"
                  className="w-full border-0 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="p-2 text-slate-400 hover:text-slate-600"
                    aria-label="Limpar busca"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                )}

                <button
                  type="submit"
                  className="rounded-r-md bg-[color:var(--pv-yellow-500)] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                >
                  Ir
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>
      <div aria-hidden="true" className="h-5 w-full border-b-4 border-[#FFDD00] bg-[#70B643]"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema Solicitação de Imunidade Tributária
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Prefeitura Municipal de Porto Velho
          </p>
          <p className="text-sm text-gray-500">
            <a
              href="https://semfaz.portovelho.ro.gov.br/uploads//arquivos/2025/10/67765/1761679049in-001-imunidade-2025.PDF"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Instrução Normativa SEMEC/SRM Nº 001/2025
            </a>
          </p>
        </div>

        {/* Instruções */}
        <div className="max-w-4xl mx-auto mb-10 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            📋 Como funciona:
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Selecione o tipo de imunidade tributária desejada</li>
            <li>Preencha o formulário com os dados solicitados</li>
            <li>Anexe os documentos obrigatórios</li>
            <li>Gere o requerimento em PDF e envie para análise</li>
          </ol>
        </div>

        {/* Cards de Tipos de Imunidade */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {searchTerm ? 'Resultados da busca:' : 'Selecione o tipo de imunidade:'}
          </h2>

          {filteredTiposImunidade.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTiposImunidade.map((item) => (
                <Link
                  key={item.tipo}
                  href={`/formularios/${item.tipo}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`text-6xl ${cores[item.cor as keyof typeof cores]} bg-opacity-10 rounded-full w-24 h-24 flex items-center justify-center`}>
                        {item.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors">
                      {item.titulo}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 text-center flex-grow">
                      {item.descricao}
                    </p>

                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 text-center font-medium">
                        {item.fundamento}
                      </p>
                    </div>

                    <div className="mt-4">
                      <span className={`block text-center ${cores[item.cor as keyof typeof cores]} text-white py-2 rounded-lg font-semibold group-hover:scale-105 transition-transform`}>
                        Selecionar →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="text-4xl mb-4 text-slate-300">🔍</div>
              <h3 className="text-lg font-semibold text-[color:var(--pv-blue-900)]">Nenhum resultado encontrado</h3>
              <p className="text-slate-500 mt-2">Tente buscar por termos diferentes ou confira o nome completo.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-6 text-[color:var(--pv-blue-700)] font-medium hover:underline"
              >
                Limpar busca
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 border-t-4 border-[#FFDD00] bg-[#70B643]">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-8 md:py-10">
          {/* Header do Footer */}
          <div className="mb-6 flex flex-col items-center gap-4 sm:mb-8 sm:flex-row sm:justify-between sm:gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/logo_semec_borda_branca.png"
                alt="Logo oficial da SEMEC Porto Velho"
                width={100}
                height={100}
                className="h-auto w-[80px] drop-shadow-md sm:w-[90px] md:w-[100px]"
              />
            </div>

            {/* Texto da Secretaria */}
            <div className="text-center sm:text-right">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/90 sm:text-xs sm:tracking-[0.25em]">
                Secretaria Municipal de Economia
              </p>
              <p className="text-[0.6rem] font-light uppercase tracking-[0.15em] text-white/70 sm:text-[0.7rem] sm:tracking-[0.2em]">
                Porto Velho — Rondônia
              </p>
            </div>
          </div>

          {/* Cards Grid - Responsivo */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Endereço */}
            <article className="flex flex-col rounded-xl border border-white/40 bg-white/95 p-4 text-[color:var(--pv-blue-900)] shadow-lg shadow-black/10 sm:p-5">
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3 sm:gap-3 sm:pb-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--pv-blue-900)] text-white shadow-md sm:h-11 sm:w-11 sm:rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--pv-blue-700)] sm:text-[0.65rem] sm:tracking-[0.15em]">
                    Endereço
                  </p>
                  <h3 className="text-sm font-bold leading-tight text-[color:var(--pv-blue-900)] sm:text-base">
                    Sede SEMEC
                  </h3>
                </div>
              </div>
              <div className="mt-3 flex-1 space-y-3 sm:mt-4 sm:space-y-4">
                <address className="not-italic text-[0.8rem] leading-relaxed text-[color:var(--pv-blue-900)]/80 sm:text-sm">
                  <span className="font-medium text-[color:var(--pv-blue-900)]">
                    Av. Sete de Setembro, 744
                  </span>
                  <br />
                  Bairro Centro — Porto Velho, RO
                </address>
                <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 sm:px-3" style={{ backgroundColor: '#1a237e0D' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[color:var(--pv-blue-900)]">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div className="flex items-center gap-2 rounded-lg bg-pv-blue-900/5 px-2.5 py-2 sm:px-3">
                    <span className="text-[0.7rem] font-semibold text-pv-blue-900 sm:text-xs">
                      Atendimento: 08h às 14h
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 2: Contatos */}
            <article className="flex flex-col rounded-xl border border-white/40 bg-white/95 p-4 text-[color:var(--pv-blue-900)] shadow-lg shadow-black/10 sm:p-5">
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3 sm:gap-3 sm:pb-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--pv-blue-900)] text-white shadow-md sm:h-11 sm:w-11 sm:rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--pv-blue-700)] sm:text-[0.65rem] sm:tracking-[0.15em]">
                    Contatos
                  </p>
                  <h3 className="text-sm font-bold leading-tight text-[color:var(--pv-blue-900)] sm:text-base">
                    Fale Conosco
                  </h3>
                </div>
              </div>
              <div className="mt-3 flex-1 space-y-2.5 sm:mt-4 sm:space-y-3">
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[color:var(--pv-blue-900)]/10 text-[color:var(--pv-blue-900)] sm:h-6 sm:w-6 sm:rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.55rem] font-semibold uppercase tracking-wider text-[color:var(--pv-blue-700)] sm:text-[0.6rem]">
                      Gabinete
                    </p>
                    <p className="text-[0.75rem] font-medium text-[color:var(--pv-blue-900)] sm:text-sm">
                      (69) 3901-6281
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[color:var(--pv-blue-900)]/10 text-[color:var(--pv-blue-900)] sm:h-6 sm:w-6 sm:rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.55rem] font-semibold uppercase tracking-wider text-[color:var(--pv-blue-700)] sm:text-[0.6rem]">
                      E-mail institucional
                    </p>
                    <a
                      href="mailto:gab.semec@portovelho.ro.gov.br"
                      className="block break-all text-[0.75rem] font-medium text-[color:var(--pv-blue-900)] underline-offset-2 hover:underline sm:text-sm sm:break-normal sm:truncate"
                    >
                      gab.semec@portovelho.ro.gov.br
                    </a>
                  </div>
                </div>
                <a href="https://api.whatsapp.com/send?phone=556999425251" target="_blank" rel="noopener noreferrer" className="group !mt-3 flex items-center gap-2.5 rounded-lg border border-[#70B643] bg-white p-2.5 transition hover:bg-[#70B643]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#70B643] sm:!mt-4 sm:gap-3 sm:p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#70B643] bg-white text-[#70B643] shadow-sm transition group-hover:scale-105 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.55rem] font-semibold uppercase tracking-wider text-pv-blue-700 sm:text-[0.6rem]">
                      WhatsApp
                    </p>
                    <p className="text-[0.7rem] font-medium text-pv-blue-900 sm:text-xs">
                      (69) 9 9942-5251
                    </p>
                  </div>
                </a>
              </div>
            </article>

            {/* Card 3: Redes Sociais */}
            <article className="flex flex-col rounded-xl border border-white/40 bg-white/95 p-4 text-[color:var(--pv-blue-900)] shadow-lg shadow-black/10 sm:p-5 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3 sm:gap-3 sm:pb-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--pv-blue-900)] text-white shadow-md sm:h-11 sm:w-11 sm:rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </span>
                <div>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--pv-blue-700)] sm:text-[0.65rem] sm:tracking-[0.15em]">
                    Redes Sociais
                  </p>
                  <h3 className="text-sm font-bold leading-tight text-[color:var(--pv-blue-900)] sm:text-base">
                    Siga a SEMEC
                  </h3>
                </div>
              </div>
              <div className="mt-3 flex-1 space-y-3 sm:mt-4 sm:space-y-4">
                <p className="text-[0.8rem] leading-relaxed text-[color:var(--pv-blue-900)]/80 sm:text-sm">
                  Acompanhe nossos canais oficiais e fique por dentro das novidades sobre a
                  <strong className="text-pv-blue-900"> Reforma Tributária do Consumo</strong>.
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <a href="https://www.instagram.com/semec.pvh/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 rounded-lg border border-[#F7A1C4] bg-[#FDE9F1] hover:bg-[#F9C5DA] px-3 py-2 shadow-sm transition hover:shadow-md sm:px-4 sm:py-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] p-[1px] transition group-hover:scale-110 sm:h-8 sm:w-8 sm:rounded-md">
                      <span className="flex h-full w-full items-center justify-center rounded bg-white text-[#C13584] sm:rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                      </span>
                    </span>
                    <span className="text-[0.8rem] font-semibold text-pv-blue-900 sm:text-sm">
                      @semec.pvh
                    </span>
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Copyright */}
          <div className="mt-6 border-t border-white/20 pt-4 text-center sm:mt-8">
            <p className="text-[0.6rem] text-white/60 sm:text-[0.65rem]">
              © {new Date().getFullYear()} Prefeitura Municipal de Porto Velho • Todos os direitos reservados
            </p>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="h-7 w-full bg-repeat-x sm:h-9"
          style={{
            backgroundImage: "url('footer-banner.png')",
            backgroundSize: "328px 48px",
            backgroundPosition: "left center"
          }}
        ></div>

      </footer>
    </div>
  );
}

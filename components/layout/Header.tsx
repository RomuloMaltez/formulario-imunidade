"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    if (searchTerm.trim()) {
      router.push(`/?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <header className="border-b border-slate-200 bg-white shadow-sm sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-4 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_300px] lg:items-center lg:gap-8">
          {/* Logo */}
          <div className="order-1 flex w-full items-center justify-center self-center lg:order-1 lg:w-auto lg:justify-start lg:self-start lg:pr-4">
            <Link href="/" aria-label="Ir para a página inicial da SEMEC Porto Velho" className="shrink-0">
              <Image src="/semec/formulario-imunidade/logo-semec.svg" alt="Logotipo da Prefeitura de Porto Velho - SEMEC" width={200} height={200} className="object-contain" style={{ width: '200px', height: '200px' }} />
            </Link>
          </div>

          {/* Ilustração da Cidade */}
          <div className="order-3 flex w-full items-center lg:order-2">
            <div className="flex h-full w-full items-center justify-center overflow-visible">
              <div className="relative w-full max-w-[1280px]">
                <Image src="/semec/formulario-imunidade/PortoVelhoPintura.svg" alt="Ilustração linear destacando pontos turísticos de Porto Velho" width={1280} height={190} className="h-[190px] w-full object-cover" />
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
      <div aria-hidden="true" className="h-5 w-full border-b-4 border-[#FFDD00] bg-[#70B643] sticky top-[232px] lg:top-[232px] z-40"></div>
    </>
  );
}

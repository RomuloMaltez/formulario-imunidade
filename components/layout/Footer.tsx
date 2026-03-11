"use client";

import Image from 'next/image';

export function Footer() {
  return (
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
          backgroundImage: "url('/footer-banner.png')",
          backgroundSize: "328px 48px",
          backgroundPosition: "left center"
        }}
      ></div>
    </footer>
  );
}

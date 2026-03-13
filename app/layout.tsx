import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema de Imunidade Tributária - Porto Velho',
  description: 'Sistema de Solicitação de imunidade tributária do Município de Porto Velho - IN 001/2025',
  icons: {
    icon: '/semec/formulario-imunidade/imagem_icon-removebg-preview.png',
  },
};

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Suspense fallback={<div className="h-20 bg-white" />}>
          <Header />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

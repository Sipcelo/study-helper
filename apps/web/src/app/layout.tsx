import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Study Helper — Cidade Financeira Interativa',
  description:
    'Plataforma educacional para estudar o mercado financeiro através de uma cidade visual interativa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
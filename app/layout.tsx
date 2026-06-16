import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CF Lapa Web',
  description: 'MVP do frontend para gestão de treinos da Crossfit Lapa',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

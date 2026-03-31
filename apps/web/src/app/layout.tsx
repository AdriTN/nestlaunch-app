import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'NestLaunch — Boilerplate SaaS',
    template: '%s | NestLaunch',
  },
  description:
    'Boilerplate premium para lanzar tu SaaS con NestJS y Next.js sin construir la base desde cero.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

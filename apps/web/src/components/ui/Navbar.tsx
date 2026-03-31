'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './Button';

interface NavbarProps {
  /** Si es true muestra links de usuario autenticado */
  authenticated?: boolean;
  onLogout?: () => void;
}

export function Navbar({ authenticated = false, onLogout }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-brand-700"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-sm font-black">
            NL
          </span>
          NestLaunch
        </Link>

        {/* Links */}
        <div className="flex items-center gap-2">
          {authenticated ? (
            <>
              <Link
                href="/dashboard"
                className={[
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  pathname === '/dashboard'
                    ? 'text-brand-700 bg-brand-50 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
                ].join(' ')}
              >
                Dashboard
              </Link>
              <Button variant="secondary" size="sm" onClick={onLogout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Registrarse</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

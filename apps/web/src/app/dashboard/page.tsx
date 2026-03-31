'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { Card } from '@/components/ui/Card';
import { getAccessToken, clearTokens } from '@/lib/auth';
import { usersApi } from '@/lib/api';
import type { UserDto } from '@nestlaunch/shared';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push('/login');
      return;
    }

    usersApi
      .me(token)
      .then((res) => {
        // La API devuelve el UserDto directamente (sin wrapper ApiResponse en este caso)
        setUser(res as unknown as UserDto);
      })
      .catch(() => {
        clearTokens();
        router.push('/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    clearTokens();
    document.cookie = 'nl_access_token=; path=/; max-age=0';
    router.push('/');
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar authenticated onLogout={handleLogout} />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hola, {user?.name ?? 'Usuario'} 👋
          </h1>
          <p className="mt-1 text-gray-500">
            Bienvenido a tu dashboard de NestLaunch
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tarjeta de perfil */}
          <Card>
            <h2 className="mb-4 font-semibold text-gray-900">Tu perfil</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Nombre</span>
                <span className="font-medium">{user?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rol</span>
                <span className="inline-block rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                  {user?.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Miembro desde</span>
                <span className="font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('es-ES')
                    : '—'}
                </span>
              </div>
            </div>
          </Card>

          {/* Placeholder — Analytics */}
          <Card className="flex flex-col items-center justify-center text-center">
            <p className="mb-2 text-3xl">📊</p>
            <h3 className="font-semibold text-gray-900">Analytics</h3>
            <p className="mt-1 text-sm text-gray-400">Próximamente</p>
          </Card>

          {/* Placeholder — Configuración */}
          <Card className="flex flex-col items-center justify-center text-center">
            <p className="mb-2 text-3xl">⚙️</p>
            <h3 className="font-semibold text-gray-900">Configuración</h3>
            <p className="mt-1 text-sm text-gray-400">Próximamente</p>
          </Card>
        </div>
      </main>
    </div>
  );
}

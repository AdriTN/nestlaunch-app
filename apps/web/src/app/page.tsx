import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Features del boilerplate
const features = [
  {
    icon: '🔐',
    title: 'Auth completa',
    desc: 'JWT + Refresh tokens + Roles (USER / ADMIN). Listo para producción.',
  },
  {
    icon: '🗃️',
    title: 'Prisma + PostgreSQL',
    desc: 'Schema definido, migraciones configuradas. Empieza a modelar tu negocio.',
  },
  {
    icon: '⚡',
    title: 'Monorepo Turborepo',
    desc: 'API y Web en el mismo repo. Tipos compartidos sin duplicar código.',
  },
  {
    icon: '🐳',
    title: 'Docker listo',
    desc: 'docker-compose.yml con API, Web y PostgreSQL. Un comando y funciona.',
  },
  {
    icon: '🎨',
    title: 'UI base con Tailwind',
    desc: 'Componentes: Button, Input, Card, Navbar. Personaliza con tu branding.',
  },
  {
    icon: '🛡️',
    title: 'TypeScript strict',
    desc: 'noImplicitAny, strictNullChecks. Tipos compartidos entre front y back.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
        <span className="inline-block mb-4 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-brand-200">
          v0.1 — Foundation
        </span>

        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Lanza tu SaaS{' '}
          <span className="text-brand-600">sin construir la base</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-500">
          NestLaunch es un boilerplate premium con NestJS, Next.js, Prisma y
          Docker. Todo lo que necesitas para enfocarte en tu producto desde el
          día uno.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/register">
            <Button size="lg">Empezar ahora</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="lg">
              Ver demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <p className="mb-3 text-3xl">{f.icon}</p>
              <h3 className="mb-1 font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

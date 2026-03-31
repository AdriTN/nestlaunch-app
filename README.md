# NestLaunch — Boilerplate SaaS Premium

Monorepo con **NestJS + Next.js** para lanzar un SaaS sin construir la base desde cero.

## Stack

| Capa | Tecnología |
|------|-----------|
| Backend | NestJS 10, Passport JWT, class-validator |
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Base de datos | PostgreSQL 16 + Prisma 5 |
| Monorepo | pnpm workspaces + Turborepo |
| Infra | Docker + docker-compose |
| Tipos compartidos | `@nestlaunch/shared` |

---

## Estructura

```
nestlaunch/
├── apps/
│   ├── api/          ← NestJS — puerto 3001
│   └── web/          ← Next.js — puerto 3000
├── packages/
│   └── shared/       ← Tipos TS compartidos
├── docker-compose.yml
├── pnpm-workspace.yaml
└── turbo.json
```

---

## Setup rápido

### 1. Prerrequisitos

- Node.js 20+
- pnpm 9+
- Docker Desktop

### 2. Variables de entorno

```bash
cp .env.example .env
```

Edita `.env` y cambia al menos:
- `JWT_SECRET` — mínimo 32 caracteres aleatorios
- `JWT_REFRESH_SECRET` — mínimo 32 caracteres aleatorios

### 3. Instalar dependencias

```bash
pnpm install
```

### 4. Levantar con Docker (recomendado)

```bash
docker-compose up -d
```

Esto arranca PostgreSQL, la API y el Web simultáneamente.

### 5. Levantar en desarrollo (sin Docker)

Primero necesitas PostgreSQL corriendo. Luego:

```bash
# Aplicar migraciones de Prisma
cd apps/api
pnpm prisma migrate dev --name init
cd ../..

# Levantar todo en paralelo
pnpm dev
```

---

## API — Endpoints

Base URL: `http://localhost:3001/api`

### Auth

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/auth/register` | Registrar usuario |
| `POST` | `/auth/login` | Iniciar sesión |
| `POST` | `/auth/refresh` | Renovar access token |
| `POST` | `/auth/logout` | Cerrar sesión (requiere JWT) |

### Users

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/users/me` | Perfil propio | USER |
| `PATCH` | `/users/me` | Editar perfil | USER |
| `GET` | `/users` | Listar todos | ADMIN |
| `GET` | `/users/:id` | Ver usuario | ADMIN |
| `PATCH` | `/users/:id` | Editar usuario | ADMIN |
| `DELETE` | `/users/:id` | Soft delete | ADMIN |

### Health

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/health` | Estado de la API y DB |

---

## Web — Páginas

| Ruta | Descripción | Auth |
|------|-------------|------|
| `/` | Landing page | Pública |
| `/login` | Inicio de sesión | Solo no autenticados |
| `/register` | Registro | Solo no autenticados |
| `/dashboard` | Panel principal | Protegida |

---

## Comandos útiles

```bash
# Desarrollo
pnpm dev                    # Levanta API + Web en paralelo

# Build
pnpm build                  # Compila todo

# Prisma (desde apps/api)
pnpm prisma migrate dev     # Nueva migración
pnpm prisma studio          # GUI de la base de datos
pnpm prisma generate        # Regenerar cliente

# Docker
docker-compose up -d        # Levantar servicios
docker-compose down         # Detener servicios
docker-compose logs -f api  # Ver logs de la API
```

---

## Arquitectura de Auth

```
POST /auth/login
  → Valida credenciales
  → Genera accessToken (15m) + refreshToken (7d)
  → Guarda sesión en DB (tabla sessions)

POST /auth/refresh
  → Valida refreshToken en DB
  → Genera nuevo accessToken

POST /auth/logout
  → Elimina sesión de DB
```

Los tokens de sesión no se almacenan en el accessToken — solo en la tabla `sessions`. Esto permite invalidar sesiones desde el servidor.

---

## Variables de entorno

| Variable | Descripción | Por defecto |
|----------|-------------|-------------|
| `DATABASE_URL` | Cadena de conexión PostgreSQL | — |
| `API_PORT` | Puerto de la API | `3001` |
| `JWT_SECRET` | Secreto para access tokens | — |
| `JWT_EXPIRES_IN` | Duración del access token | `15m` |
| `JWT_REFRESH_SECRET` | Secreto para refresh tokens | — |
| `JWT_REFRESH_EXPIRES_IN` | Duración del refresh token | `7d` |
| `CORS_ORIGIN` | Origen permitido en CORS | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | URL de la API desde el browser | `http://localhost:3001` |

---

## Roadmap v0.2

- [ ] Módulo de billing con Stripe
- [ ] Emails transaccionales (Resend)
- [ ] Verificación de email
- [ ] OAuth (Google / GitHub)
- [ ] Rate limiting por IP
- [ ] Swagger/OpenAPI auto-generado
- [ ] Tests E2E (Playwright)

---

## Licencia

MIT — Úsalo como base para tu propio SaaS.

# Control Gastos Web

Frontend de Control Gastos construido con Next.js, TypeScript, pnpm y shadcn/ui.

## Desarrollo

1. Copiá `.env.example` como `.env.local` y completá la URL interna del servidor Go.
2. Instalá dependencias con `pnpm install`.
3. Iniciá Next.js con `pnpm dev`.

## Comandos

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Integración con Go

Next.js funciona como BFF: el navegador se comunica con los Route Handlers de Next y estos reenvían las solicitudes al servidor Go.

El backend debe exponer:

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

El login y el registro deben devolver la cookie de sesión mediante `Set-Cookie`. Para producción se recomienda una cookie host-only con `HttpOnly`, `Secure`, `SameSite=Lax` y `Path=/`. Los UUID son identificadores de dominio y no reemplazan la validación de permisos en Go.

## Estructura

- `src/app`: rutas, layouts y Route Handlers.
- `src/core/_components`: componentes reutilizables para todas las vistas.
- `components.json`: configuración de shadcn/ui; los nuevos componentes se generan en `src/core/_components`.
- `src/features/auth`: formularios específicos de autenticación.
- `src/lib/api`: cliente server-side hacia Go y controles CSRF.
- `src/lib/auth`: lectura y validación server-side de la sesión.
- `src/types`: contratos TypeScript del frontend.

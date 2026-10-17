# Librerías utilizadas

## Dependencias de producción

### Next.js `16.4.2`

Framework principal de la aplicación.

Se utiliza para:

- App Router.
- Server Components.
- Route Handlers para el BFF hacia Go.
- Middleware de redirección.
- Renderizado del dashboard protegido.

### React `19.3.0` y React DOM `19.3.0`

Base de la interfaz de usuario.

React se usa para formularios interactivos, estados de carga, errores y navegación del cliente. Los componentes se mantienen como Server Components por defecto y solo los formularios o controles interactivos usan `"use client"`.

### Zod `4.6.7`

Validación de datos de entrada.

Se utiliza para validar login y registro tanto en los formularios como en los Route Handlers. La validación del frontend mejora la experiencia, pero Go debe validar nuevamente todos los datos.

## Dependencias de desarrollo

### TypeScript `5.9.3`

Tipado estático para contratos de usuarios, respuestas de autenticación y componentes.

### ESLint `9.39.5`

Análisis estático y detección de problemas de calidad en el código.

### `eslint-config-next` `16.4.2`

Reglas específicas para Next.js, React y App Router.

### Tailwind CSS `4.3.3`

Sistema de estilos utilizado para construir la interfaz responsive sin agregar una librería visual externa. Permite mantener los componentes reutilizables dentro de `src/core/_components`.

### shadcn/ui `4.22.0`

Sistema de componentes reutilizables basado en código fuente dentro del proyecto, no en una dependencia visual cerrada.

Se utiliza para disponer de componentes accesibles y consistentes como `Button`, `Input`, `Label` y `Card`. Los componentes se generan directamente en `src/core/_components` mediante los aliases definidos en `components.json`, por lo que pueden personalizarse según el diseño de Control Gastos.

shadcn/ui utiliza además:

- `@base-ui/react`: primitivas accesibles para controles interactivos.
- `class-variance-authority`: variantes tipadas de componentes.
- `lucide-react`: íconos para futuras vistas.
- `tw-animate-css`: utilidades de animación compatibles con Tailwind.

### `@tailwindcss/turbopack` `4.3.3`

Integración de Tailwind con el bundler Turbopack de Next.js.

### Tipos de Node, React y React DOM

- `@types/node`
- `@types/react`
- `@types/react-dom`

Proveen tipos para TypeScript durante el desarrollo y la compilación.

## Herramientas y decisiones

### pnpm

Es el administrador de paquetes oficial del proyecto. Se debe utilizar para instalar dependencias y ejecutar scripts:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

No se deben agregar `package-lock.json` ni `yarn.lock`; el lockfile oficial es `pnpm-lock.yaml`.

### Sin librería de autenticación externa

No se utiliza Auth.js, Clerk ni un proveedor externo porque el servidor Go es la autoridad de autenticación. Next.js actúa como BFF y maneja únicamente la comunicación, validación de entrada y propagación segura de cookies.

### Sin librería de íconos por ahora

La primera versión utiliza elementos visuales simples para evitar sumar dependencias antes de definir el sistema visual completo. Se puede incorporar una librería de íconos cuando se establezcan las necesidades de las vistas futuras.

## Criterios para agregar nuevas librerías

Antes de sumar una dependencia se debe documentar:

1. Qué problema resuelve.
2. Por qué no alcanza la plataforma o las librerías existentes.
3. Impacto en el bundle y mantenimiento.
4. Riesgos de seguridad y licencia.
5. Comando `pnpm` utilizado y actualización del lockfile.

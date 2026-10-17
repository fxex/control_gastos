# Bitácora interna de desarrollo

Este documento registra cambios relevantes del proyecto. Las modificaciones grandes deben explicar qué se cambió, por qué se tomó la decisión y qué impacto tiene sobre el frontend o el backend Go.

## 17 de octubre de 2026

### Inicio del proyecto frontend

Se generó el proyecto base con Next.js 16, TypeScript, App Router, Tailwind CSS y pnpm.

La aplicación se organizó con estas decisiones:

- `src/app` contiene las rutas y los Route Handlers.
- `src/core/_components` contiene componentes reutilizables para todas las vistas futuras.
- `src/features/auth` contiene componentes específicos del dominio de autenticación.
- `src/lib` contiene validaciones, cliente HTTP hacia Go, sesión y protección CSRF.
- `src/types` contiene los contratos de TypeScript.

### Autenticación

Se implementaron las pantallas de login y registro, junto con un dashboard inicial protegido.

La autenticación utiliza el flujo:

```text
Navegador → Next.js → Go
```

Next.js no almacena tokens en el navegador. La sesión se propaga mediante una cookie `HttpOnly` recibida desde Go. El backend Go continúa siendo responsable de generar UUIDs, validar credenciales, crear o invalidar sesiones y autorizar recursos.

### Contrato inicial con Go

Se definieron los endpoints esperados:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

El detalle completo está en [`endpoints.md`](./endpoints.md).

### Seguridad considerada

- Validación de datos con Zod.
- Cookies `HttpOnly` y `SameSite=Lax`.
- `Secure` en producción.
- Validación de origen para operaciones mutables.
- Limpieza de cookie durante logout aunque Go no esté disponible.
- Errores públicos genéricos para no filtrar información interna.
- El middleware solo realiza una redirección de experiencia de usuario; la autorización real se realiza consultando la sesión en Go.

### Verificación realizada

Los siguientes comandos finalizaron correctamente:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

### Pendientes para el próximo cambio grande

- Confirmar con el equipo Go el formato definitivo de respuestas y cookies.
- Agregar pruebas unitarias e integración para los Route Handlers.
- Agregar pruebas E2E de registro, login, sesión expirada y logout.
- Implementar los módulos de gastos, categorías y presupuestos cuando el contrato del backend esté definido.

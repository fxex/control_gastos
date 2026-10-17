# Endpoints y contratos

## Arquitectura de comunicación

```text
Navegador → Route Handler de Next.js → Servidor Go
```

El navegador consume los endpoints `/api/auth/*`. Next.js valida los datos, reenvía la solicitud al backend Go y propaga la cookie de sesión.

## Módulo: Autenticación

| Endpoint | Qué enviás | Qué recibís |
| --- | --- | --- |
| `POST /api/auth/login`<br>→ `POST /api/v1/auth/login` | JSON:<br>`email`<br>`password`<br><br>El navegador no envía tokens. | Éxito: HTTP `200`, JSON del backend y `Set-Cookie` con la sesión.<br><br>Error: JSON `{ "message": "..." }` con `401`, `422`, `429`, `502` o `403`. |
| `POST /api/auth/register`<br>→ `POST /api/v1/auth/register` | JSON:<br>`name`<br>`email`<br>`password`<br><br>`confirmPassword` se valida solo en Next.js y no se envía a Go. | Éxito: HTTP `201`, JSON del backend y opcionalmente `Set-Cookie` con la sesión.<br><br>Error: JSON `{ "message": "..." }` con `409`, `422`, `429`, `502` o `403`. |
| `GET /api/auth/me`<br>→ `GET /api/v1/auth/me` | Cookie de sesión `session` en desarrollo o `__Host-session` en producción. | Éxito: HTTP `200` con el usuario, directamente o dentro de `{ "user": ... }`.<br><br>Error: HTTP `401` si la sesión no existe o expiró; `503` si Go no responde. |
| `POST /api/auth/logout`<br>→ `POST /api/v1/auth/logout` | Cookie de sesión actual. | HTTP `204` sin contenido.<br><br>Go invalida la sesión y Next.js expira la cookie localmente. Si Go está caído, Next también elimina la cookie local. |

### Contrato de usuario

Respuesta esperada para el usuario autenticado:

```json
{
  "id": "uuid",
  "name": "Nombre del usuario",
  "email": "usuario@ejemplo.com",
  "createdAt": "2026-10-17T12:00:00Z"
}
```

También se acepta:

```json
{
  "user": {
    "id": "uuid",
    "name": "Nombre del usuario",
    "email": "usuario@ejemplo.com"
  }
}
```

### Contrato de errores

```json
{
  "message": "Descripción segura para el usuario"
}
```

No se deben enviar al navegador trazas, errores SQL, contraseñas, tokens ni detalles internos del servidor.

## Reglas de sesión y seguridad

- La cookie debe tener `HttpOnly`, `Path=/`, `SameSite=Lax` y `Secure` en producción.
- La sesión debe ser opaca, aleatoria y revocable.
- El UUID del usuario no es un token ni reemplaza la autorización.
- Go realiza la autenticación y autorización definitiva.
- No se almacenan tokens en `localStorage` ni `sessionStorage`.
- Las operaciones mutables deben ser same-origin; Next.js valida `Origin` y `Referer`.
- El logout debe ser `POST`, nunca `GET`.
- Los UUIDs persistidos se generan en Go.

## Próximos módulos

Cuando se implementen gastos, categorías o presupuestos, cada módulo deberá agregarse con un título propio y una tabla con estas mismas columnas:

| Endpoint | Qué enviás | Qué recibís |
| --- | --- | --- |
| `Método /ruta` | Parámetros, body y cookies requeridas | Estado HTTP, body y errores |

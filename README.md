# 4 Puentes — Web

Landing de captación de **Cuatro Puentes** (Valdivia): importación integral
desde cualquier parte del mundo, con bodegaje en Valdivia y seguro de carga.

Next.js 16 (App Router) + TypeScript + Tailwind v4, desplegado en Vercel.
Estándar Main Brain.

## Instalación

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

Requiere Node 20 o superior. El repositorio es la aplicación: no hay
subcarpeta `web/`.

El sitio levanta sin variables de entorno. Lo único que se pierde es el envío
de las cotizaciones por correo: sin las tres variables de Resend el endpoint
valida, responde `202` con `"enviado": false` y el lead sólo queda en el log de
la función. Copia `.env.example` a `.env.local` y complétalas para probar el
envío de verdad.

## Documentación

| Archivo | Para qué |
|---|---|
| **[GUIA-EDICION.md](./GUIA-EDICION.md)** | Cambiar textos, contactos e imágenes sin romper nada. **Empieza acá si no vas a programar.** (Desfasada, ver PENDIENTES.md.) |
| **[PENDIENTES.md](./PENDIENTES.md)** | Lo que falta antes de publicar: correo, contraste, datos reales, persistencia. |
| **[ARQUITECTURA.md](./ARQUITECTURA.md)** | Cómo está armado por dentro y por qué. Para quien vaya a tocar código. |

## Estructura

```
app/
  page.tsx                 la landing: ordena las secciones
  layout.tsx               metadatos, fuente y cortina de entrada
  globals.css              sistema de diseño completo
  icon.png                 favicon
  apple-icon.png           icono de iOS
  fonts/                   Poppins auto-hospedada
  health/route.ts          GET  /health
  meta/route.ts            GET  /meta
  api/v1/leads/route.ts    POST /api/v1/leads
  robots.ts                cierra el sitio a buscadores mientras haya placeholders
components/                una por sección, más Revelar, EscenaCotizador e Icons
lib/
  site.ts                  contactos y navegación      <- editable
  contenido.ts             textos de las secciones     <- editable
  cotizador.ts             pasos del formulario y validación
  mapa-datos.ts            generado, no editar
```

Las secciones, en orden: hero, Servicios, Cómo funciona, Modalidades
(marítimo/aéreo), Rutas, Cobertura y el cotizador.

`lib/mapa-datos.ts` lo escribe `scripts/mapa/generar.py`, que **no está
versionado en este repositorio**. Para regenerarlo hay que recuperar el
generador aparte.

## Contrato de módulo

| Ruta | Respuesta |
|---|---|
| `GET /health` | `{ status, uptime }` |
| `GET /meta` | módulo, versión, entorno, commit, rutas de la API y estado de persistencia |
| `POST /api/v1/leads` | `202` con `{ ok: true, enviado }` si valida; `422` con `{ ok: false, errores }` por campo; `400` si el cuerpo no es JSON |

`enviado` dice si el correo salió por Resend, no si el lead es válido: un `202`
con `enviado: false` significa que la solicitud está bien pero no llegó a
ningún buzón. La API va versionada desde el día uno: nunca rutas sin `/v1`.

## Estado

**No publicable todavía.** Los datos de contacto son placeholders, las
cotizaciones no llegan a ningún buzón mientras falten las variables de Resend,
los leads no se guardan en base de datos, el rojo de marca no cumple el
contraste AA con texto blanco encima y el sitio está cerrado a buscadores a
propósito. Lee [PENDIENTES.md](./PENDIENTES.md).

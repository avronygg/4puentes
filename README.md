# 4 Puentes — Web

Landing de captación de **Cuatro Puentes** (Valdivia): importación integral
desde China y Medio Oriente, con bodegaje y seguro de carga.

Next.js 16 (App Router) + TypeScript + Tailwind v4, desplegado en Vercel.
Estándar Main Brain.

## Instalación

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

Requiere Node 20 o superior. No hace falta configurar nada para levantarlo en
local: el sitio funciona sin variables de entorno (los leads todavía no se
guardan, ver PENDIENTES.md).

Copia `.env.example` a `.env.local` cuando conectes Supabase.

## Documentación

| Archivo | Para qué |
|---|---|
| **[GUIA-EDICION.md](./GUIA-EDICION.md)** | Cambiar textos, contactos e imágenes sin romper nada. **Empieza acá si no vas a programar.** |
| **[PENDIENTES.md](./PENDIENTES.md)** | Lo que falta antes de publicar: Supabase, datos reales, GitHub. |
| **[ARQUITECTURA.md](./ARQUITECTURA.md)** | Cómo está armado por dentro y por qué. Para quien vaya a tocar código. |

## Estructura

```
app/
  page.tsx                 la landing: ordena las secciones
  layout.tsx               metadatos, fuente y robots
  globals.css              sistema de diseño completo
  fonts/                   Poppins auto-hospedada
  health/route.ts          GET  /health
  meta/route.ts            GET  /meta
  api/v1/leads/route.ts    POST /api/v1/leads
  robots.ts                cierra el sitio a buscadores mientras haya placeholders
components/                una por sección, más Icons
lib/
  site.ts                  contactos y navegación      <- editable
  contenido.ts             textos de las secciones     <- editable
  leads.ts                 validación del formulario
  mapa-datos.ts            generado, no editar
scripts/mapa/              generador del mapa (Python)
```

## Contrato de módulo

| Ruta | Respuesta |
|---|---|
| `GET /health` | `{ status, uptime }` |
| `GET /meta` | módulo, versión, entorno, commit y estado de persistencia |
| `POST /api/v1/leads` | `202` si valida, `422` con errores por campo si no |

La API va versionada desde el día uno: nunca rutas sin `/v1`.

## Estado

**No publicable todavía.** Los datos de contacto son placeholders, los leads
no se guardan en base de datos y el sitio está cerrado a buscadores a
propósito. Lee [PENDIENTES.md](./PENDIENTES.md).

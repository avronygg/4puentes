# 4 Puentes — Web

Landing de captación de **Cuatro Puentes** (Valdivia): importación integral desde
China y Medio Oriente, con bodegaje y seguro de carga.

Stack estándar Main Brain: **Next.js (App Router) + TypeScript + Tailwind v4**,
desplegado en **Vercel**.

## Correr en local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Estructura

```
app/
  page.tsx                 la landing completa
  layout.tsx               metadatos + Poppins auto-hospedada
  globals.css              sistema de diseño (tokens, hero, bloques de color)
  health/route.ts          GET  /health          sonda de vida
  meta/route.ts            GET  /meta            identidad del módulo
  api/v1/leads/route.ts    POST /api/v1/leads    recepción de cotizaciones
components/                una por sección + Icons
lib/
  site.ts                  datos de contacto y navegación   <- editar acá
  contenido.ts             todos los textos                 <- editar acá
  leads.ts                 contrato y validación del lead (cliente + servidor)
```

Para cambiar textos o datos de contacto **no hace falta tocar componentes**:
todo vive en `lib/site.ts` y `lib/contenido.ts`.

## Contrato de módulo

| Ruta | Qué hace |
|---|---|
| `GET /health` | `{ status: "ok", uptime }` |
| `GET /meta` | módulo, versión, entorno, commit y estado de persistencia |
| `POST /api/v1/leads` | valida el lead; `202` si es válido, `422` con errores por campo si no |

La API va versionada desde el día uno: nunca rutas sin `/v1`.

## Estado

**Prototipo funcional, no publicable todavía.** Los datos de contacto son
placeholders y los leads no se guardan en base de datos.
Lee **[PENDIENTES.md](./PENDIENTES.md)** antes de tocar nada.

## Notas de diseño

- El hero son **tres capas independientes**: cielo (parallax), texto y container
  (entrada + balanceo colgando de la grúa). El container pivota en `50% 0%`,
  justo donde las eslingas salen de cuadro.
- **Fondos blancos.** Los únicos dos bloques de color son "Cómo funciona"
  (terracota) y el footer. El terracota es acento, no relleno.
- El sitio está **fijado en modo claro** a propósito (ver PENDIENTES.md §6).

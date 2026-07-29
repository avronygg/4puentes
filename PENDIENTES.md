# Pendientes — 4 Puentes Web

Estado al 27-07-2026. Ordenado por lo que bloquea el lanzamiento.

---

## 1. Supabase: persistir los leads (BLOQUEANTE para producción)

**Hoy:** `POST /api/v1/leads` valida el lead, lo deja en el log de la función de
Vercel y responde `202`. **No se guarda en ninguna base de datos.** El canal real
de captación es WhatsApp, que el formulario abre igual — por eso un fallo de la
API no le rompe nada al visitante. Pero no hay registro histórico ni forma de
recuperar un lead si la persona no completa el envío en WhatsApp.

`GET /meta` lo reporta explícitamente:

```json
"persistencia": { "supabase": false, "estado": "pendiente" }
```

### Qué falta hacer

**a) Crear el proyecto en Supabase.** Uno propio para este módulo — el contrato
Main Brain dice que cada módulo tiene su propia base y nunca lee la de otro.
Región: `sa-east-1` (São Paulo) es la más cercana a Chile.

**b) Crear la tabla.**

```sql
create table public.leads (
  id           uuid primary key default gen_random_uuid(),
  creado_en    timestamptz not null default now(),
  nombre       text not null,
  empresa      text,
  email        text not null,
  telefono     text,
  origen       text not null,
  carga        text not null,
  mensaje      text,
  -- trazabilidad de campañas
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  -- operación comercial
  estado       text not null default 'nuevo'
               check (estado in ('nuevo','contactado','cotizado','ganado','perdido')),
  notas        text
);

create index leads_creado_en_idx on public.leads (creado_en desc);
create index leads_estado_idx    on public.leads (estado);
```

**c) Activar RLS.** Sin esto la tabla queda abierta a cualquiera con la clave
anónima. La landing escribe con la `service_role` desde el servidor, así que
**ninguna política pública de insert es necesaria**:

```sql
alter table public.leads enable row level security;
-- Sin políticas: solo service_role (que salta RLS) puede leer y escribir.
-- Cuando exista un panel interno, agregar una política de select por rol.
```

**d) Variables de entorno en Vercel** (las tres, en Production y Preview):

| Variable | De dónde sale | Notas |
|---|---|---|
| `SUPABASE_URL` | Project Settings → API → Project URL | |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → service_role | **Secreta.** Nunca con prefijo `NEXT_PUBLIC_`, nunca en el cliente. |
| `NEXT_PUBLIC_SITE_URL` | El dominio final | Para metadatos y Open Graph. |

**e) Conectar el endpoint.** En `app/api/v1/leads/route.ts`, después de validar,
insertar y **seguir devolviendo 202 aunque la inserción falle**: el lead ya se va
por WhatsApp y no queremos romper la conversión por un problema de base de datos.
Registrar el error para revisarlo aparte.

**f) Aviso al equipo comercial.** Guardar el lead no sirve si nadie lo mira. Las
opciones, de menor a mayor esfuerzo: un Database Webhook de Supabase a un correo,
Resend desde el mismo endpoint, o un mensaje a un grupo de WhatsApp Business.
**Decidir con el cliente.**

### Riesgo abierto: nada impide el spam

El endpoint no tiene rate limiting ni captcha. Con el formulario público, un bot
puede llenar la tabla. Antes de conectar la base conviene resolverlo — Vercel
tiene rate limiting propio, y un honeypot oculto en el formulario frena la mayor
parte del ruido con cero fricción para el usuario.

---

## 2. Datos reales del cliente (BLOQUEANTE)

Todo esto está como placeholder y se ve en la web con subrayado punteado. Vive en
`lib/site.ts`:

- Teléfono / WhatsApp: hoy `+56 9 XXXX XXXX` y `wa.me/56900000000`.
  **El número de WhatsApp es el que recibe todos los leads: sin él la landing no
  capta nada.**
- Email de contacto: hoy `contacto@4puentes.cl`.
- Dirección: hoy "Valdivia, Región de Los Ríos".
- Dominio definitivo, para `NEXT_PUBLIC_SITE_URL`.

## 3. Validar el copy comercial con el cliente

Los textos los redacté yo y contienen afirmaciones que 4 Puentes tiene que
confirmar (están en `lib/contenido.ts`):

- Los puertos listados en China (Shenzhen, Ningbo, Shanghái, Qingdao, Guangzhou)
  y en Medio Oriente (Jebel Ali, Abu Dabi, Sharjah).
- "Conocemos a los proveedores" y la verificación de proveedor en origen.
- "Te respondemos dentro de un día hábil".
- Las regiones y puertos de entrada de la sección Cobertura.

A propósito **no hay cifras** (años de experiencia, número de importaciones,
volumen): no correspondía inventarlas.

## 4. Assets

- **Container en mayor resolución.** El PNG del cliente es 766×907 y en el hero
  se muestra a ~660 CSS px: en pantallas retina se ve blando. Pedir un export
  al doble.
- **Avión.** Listo, con el PNG definitivo del cliente
  (`public/avion.webp`, 1221x358, transparencia real).

  Nota para futuros assets: la **primera** versión que llegó traía el damero de
  transparencia *pintado dentro de la imagen* — 0% de píxeles realmente
  transparentes, aunque a la vista pareciera recortada. Si vuelve a pasar, la
  técnica para recortarlo (relleno desde el borde sobre los grises del patrón +
  conservar solo la región conectada más grande, porque los artefactos de
  compresión dejan moteado) está en el historial de git, en `scripts/avion.py`.
  Siempre conviene verificar el canal alfa antes de dar por buena una imagen
  "con fondo transparente".
- **Océano.** Se generó un mar por código derivado del cielo, pero quedó fuera
  de la página: la banda del avión ocupa ese lugar. El archivo sigue en
  `public/oceano.webp` por si se quiere recuperar.
- **Favicon y og:image.** No existen todavía.

## 5. Infraestructura

- **GitHub.** `gh` ya está instalado (2.96.0, en `~/.local/bin/gh`) pero **falta
  autenticar**, que requiere las credenciales del dueño de la cuenta:

  ```bash
  export PATH="$HOME/.local/bin:$PATH"
  gh auth login                    # elegir GitHub.com > HTTPS > browser
  cd web
  gh repo create 4puentes-web --private --source=. --remote=origin --push
  ```

  Después, en el panel de Vercel: Settings → Git → conectar el repo, para tener
  previews automáticos por PR.
- **Dominio.** Apuntar `4puentes.cl` (o el que sea) al proyecto de Vercel.
- **Analítica.** No hay nada instalado. Decidir entre Vercel Analytics
  (una línea, sin cookies) o GA4.
- **`npm audit`** reporta 12 vulnerabilidades altas, **todas de desarrollo y
  ninguna en el sitio publicado.** Vienen de `brace-expansion` / `minimatch`,
  que entran por la cadena de ESLint:

  ```
  eslint-config-next -> eslint-plugin-import -> minimatch -> brace-expansion
  ```

  ESLint solo corre en el equipo de quien programa; no forma parte del bundle
  que Vercel sirve. `npm audit fix --force` bajaría `eslint-config-next` a una
  versión incompatible con Next 16: **no hacerlo.** Se resuelven solas cuando
  Next publique una versión de `eslint-config-next` con las dependencias al día.
  Revisar con `npm audit --omit=dev`, que es lo que efectivamente se despliega.

## 6. Decisiones tomadas que conviene recordar

- **El sitio está fijado en modo claro** (`color-scheme: light`). Se construyó
  sobre una foto de cielo brillante. Reactivar el modo oscuro implica rediseñar
  el hero.
- **`npm run build` no está roto.** La primera compilación tras borrar `.next`
  tarda 4-5 minutos por el chequeo de TypeScript desde cero, y Next no imprime
  nada hasta terminar. No borres `.next` para "limpiar" y no mates el proceso
  por impaciencia. Detalle en ARQUITECTURA.md.
- **El container va a su saturación original.** Se probó bajarlo a la saturación
  de la paleta (66%) y el cliente lo vio apagado respecto de su foto.
- **El rojo de marca es `#FA382B`**, definido por el cliente. Con texto blanco da
  3.71:1: cumple el mínimo AA **solo para texto grande**, por eso las etiquetas de
  los botones van a 19px en negrita y no al tamaño de cuerpo. Si alguien las achica,
  el botón deja de cumplir.

### Riesgo aceptado: el titular "SIN LÍMITES"

`#FA382B` sobre el cielo del hero mide **1.06:1**. El mínimo para texto grande es
3.0. El rojo y el azul del cielo tienen casi la misma luminancia (0.233 contra
0.251), así que el ojo casi no los separa.

**El cliente lo decidió con el dato a la vista** y prefirió mantener el rojo. Para
suavizarlo, el velo del titular pasó de aclarar a **oscurecer** la columna de
texto: con este rojo, oscurecer el fondo es lo único que suma contraste; aclararlo
lo empeora.

Si en algún momento se quiere que cumpla, hay dos caminos y ninguno es un ajuste
menor: poner el titular sobre una placa clara (como la primera referencia que
envió el cliente, con la línea en rojo sobre fondo claro), o volver la segunda
línea al azul marino, que medía 4.82:1.

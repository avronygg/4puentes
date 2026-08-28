# Pendientes — 4 Puentes Web

Estado al 07-08-2026. Ordenado por lo que bloquea el lanzamiento.

---

## 1. Correo: que las cotizaciones lleguen a alguien (BLOQUEANTE)

**Hoy:** `POST /api/v1/leads` arma el resumen del lead y lo manda por correo con
Resend, atacando su API HTTP directo. Pero **las tres variables de entorno están
vacías**, así que el endpoint valida, registra en el log de la función de Vercel
y responde `202` con `"enviado": false`. Es decir: la cotización no llega a
ningún buzón. El visitante no se entera —la pantalla de cierre le ofrece
WhatsApp igual, que es el canal real— pero el lead se pierde.

### Qué falta hacer

**a) Verificar `comex4puentes.cl` en Resend.** El remitente de `RESEND_FROM`
tiene que estar en un dominio verificado o el envío falla con 403. La cuenta ya
existe y el dominio está dado de alta; faltan los registros DNS.

El DNS del dominio está en **Route 53** (nameservers `awsdns`), no en el
registrador ni en Rackspace. Los cinco registros de Resend **son puramente
aditivos**: el MX y el SPF van en el subdominio `send.comex4puentes.cl`, así que
no tocan el MX del raíz (`mx1/mx2.emailsrvr.com`, Rackspace Email) ni el SPF del
raíz (`v=spf1 include:emailsrvr.com ~all`), que son los que hacen funcionar el
correo de la empresa. **No fusionar el SPF de Resend con el del raíz:** son dos
dominios distintos y el `include` de Resend no va en el raíz.

**a bis) Mientras tanto se puede recibir igual.** Con
`RESEND_FROM=onboarding@resend.dev` el envío funciona sin dominio verificado,
con una limitación: Resend sólo entrega al correo del dueño de la cuenta, así
que `LEADS_TO` tiene que ser ése. Sirve para probar la cadena completa y para no
perder leads mientras el DNS propaga.

**b) Cargar las tres variables en Vercel** (Production y Preview):

| Variable | De dónde sale | Notas |
|---|---|---|
| `RESEND_API_KEY` | Resend → API Keys | **Secreta.** Solo servidor, nunca con prefijo `NEXT_PUBLIC_`. |
| `RESEND_FROM` | El buzón remitente | Formato `Nombre <buzon@dominio.cl>`. El dominio debe estar verificado. |
| `LEADS_TO` | Destinatarios comerciales | Varios separados por coma. |

**c) Crear el buzón `contacto@comex4puentes.cl` en Rackspace** y reenviarlo al
Gmail central del equipo. Es la dirección que muestra el pie del sitio y la que
va en `LEADS_TO`; hasta que exista, quien le escriba recibe un rebote.

Ese reenvío tiene una consecuencia que conviene saber: para Gmail el mensaje
llega desde un servidor de Rackspace y no de Resend, así que **la alineación de
SPF se rompe en el segundo salto y lo único que sostiene DMARC es la firma
DKIM**. Sobrevive intacta mientras nada reescriba el mensaje —ni un antivirus
que añada un pie, ni una regla que reetiquete el asunto—, y es la razón por la
que el registro DKIM no se puede omitir.

**Configurar "Enviar como" en el Gmail central.** Sin esto, quien cotizó recibe
la respuesta desde una dirección `@gmail.com` que no reconoce. Gmail manda el
correo por el SMTP de Rackspace, así que la respuesta sale autenticada por el
SPF del raíz que ya existe (`include:emailsrvr.com`): no hace falta ningún
registro DNS más.

Ajustes → Cuentas e importación → "Enviar como" → Añadir otra dirección.
Servidor `secure.emailsrvr.com`, puerto `465` con SSL, usuario y contraseña los
del buzón. El código de verificación que pide Gmail llega al propio buzón, que
reenvía al mismo Gmail. Después, activar "Responder desde la misma dirección a
la que se envió el mensaje": las cotizaciones llegan dirigidas a `contacto@`,
así que Gmail elige el remitente correcto solo.

`LEADS_TO` acepta varios destinatarios separados por coma, por si en algún
momento conviene sumar un segundo buzón. El asunto ya viene como
`Cotización — Nombre · Producto`, útil para filtrar o etiquetar.

**d) Probar el envío de punta a punta** antes de publicar, incluyendo un caso de
cada perfil: el cuerpo del correo se arma con `resumen()`, que sólo incluye los
pasos visibles de esa rama.

### Riesgo abierto: nada impide el spam

El endpoint no tiene rate limiting ni captcha, y el formulario es público. Con
el envío por correo conectado, un bot puede llenar el buzón comercial. Vercel
tiene rate limiting propio, y un honeypot oculto en el último paso frena la
mayor parte del ruido con cero fricción para el usuario. **Resolverlo antes de
abrir el sitio a buscadores.**

---

## 2. Contraste del rojo de marca (BLOQUEANTE de accesibilidad)

El color de marca es el rojo `#FD190F`. Es el color de los botones, del CTA del
nav, del botón del cotizador y del vidrio de la barra.

Los números, sin adornos:

| Combinación | Contraste | Mínimo AA para texto normal |
|---|---|---|
| Blanco sobre `#FD190F` | 3,95:1 | 4,5:1 |
| `#FD190F` sobre blanco (el CTA del nav se invierte al bajar) | 3,95:1 | 4,5:1 |
| Blanco sobre `#D5150D` (`terra-500`, ya usado como hover) | 5,38:1 | 4,5:1 |
| Blanco sobre el vidrio del nav (`--nav-glass`, rojo al 85% sobre fondo claro) | 3,58:1 | 4,5:1 |

**El rojo de marca no cumple AA con texto blanco encima.** Cumple el 3:1 de
texto grande y de componentes de interfaz, y nada más. Las etiquetas de los
botones y los enlaces del nav son texto normal, así que quedan por debajo.
Invertir no sirve de nada: el contraste es una razón entre luminancias y no
depende de cuál color va encima, así que el CTA blanco con texto rojo mide
exactamente lo mismo.

**Salida propuesta:** usar `#D5150D` (5,38:1) en todo lo que conviva con texto
blanco —botones, CTA del nav en sus dos estados, el vidrio de la barra, el botón
del cotizador— y dejar `#FD190F` para lo que no lleva texto: iconos, líneas del
mapa, puntos, filetes, el acento del titular. El tono ya está en la escala y ya
se usa como hover, así que el cambio es de asignación, no de paleta.

Está sin resolver porque implica repintar el hover (habría que bajar al
`terra-600`) y revisar cada superficie roja del CSS. **Decidir con el cliente
antes de publicar**: es lo único de la landing que hoy incumple una norma.

### Sin medir: todo lo que se apoya en la foto del cielo

Se quitó `.hero__scrim` y todas las sombras de texto del hero, y la segunda
línea del titular pasó del cobrizo al rojo. Las mediciones que había en
ARQUITECTURA.md eran de antes de esos dos cambios y ya no valen. **Hay que
volver a medir sobre capturas del sitio desplegado** el titular y el párrafo del
hero antes de afirmar que cumplen. La franja de confianza que también estaba sin
medir ya no existe: la pidió quitar el cliente el 07-08-2026.

El `.sello` que la reemplazó **no hereda el problema**: su texto va en
`terra-600` y `terra-700` sobre un disco blanco al 93%, no blanco sobre rojo.

---

## 3. Datos reales del cliente (BLOQUEANTE)

Lo que sigue como placeholder se ve en la web con subrayado punteado. Vive en
`lib/site.ts`:

- Dirección: dice "Valdivia, Región de Los Ríos", **sin la calle**. Ya no
  bloquea nada —es cierto, es donde está la bodega— pero si algún día hay una
  oficina con dirección pública, completarla ayuda al posicionamiento local.

Ya resueltos: teléfono y WhatsApp (`+56 9 9835 9091`), el nombre del fundador
(Gianpiero Traverso), el correo de contacto (`contacto@comex4puentes.cl`) y el
dominio (`comex4puentes.cl`; `4puentes.cl` ni siquiera resolvía, y el sitemap
apuntaba ahí).

**`contacto.porConfirmar` pasó a `false`**: el sitio está abierto a buscadores.
Ponerla en `true` vuelve a cerrarlo de una vez —robots.txt, la metadata y el
anuncio del sitemap— si hiciera falta.

## 3 bis. Medición y aviso de cookies

Search Console y GA4 (`G-057Y9F32KH`) están puestos en `lib/site.ts` y se
inyectan desde `app/layout.tsx`. GA4 sólo carga cuando `VERCEL_ENV` es
`production`, para que las previsualizaciones no ensucien el informe.

**PENDIENTE: GA4 deja cookies y el sitio no tiene aviso.** Con la Ley 21.719 en
Chile, un sitio que mide visitantes debería informarlo y, según cómo se
interprete, pedir consentimiento antes de cargar el script. Hoy no hay banner ni
política de privacidad. Es lo mismo que ya estaba anotado para el formulario:
conviene resolver las dos cosas juntas, con una página de privacidad y, si se
opta por pedir consentimiento, moviendo la carga de GA4 detrás de esa
aceptación.

## 4. Persistencia de los leads en Supabase

Ya no es bloqueante —con el correo conectado el lead llega a alguien— pero sigue
sin haber registro histórico ni forma de recuperar una solicitud que nadie
respondió. `GET /meta` lo reporta explícitamente:

```json
"persistencia": { "supabase": false, "estado": "pendiente" }
```

**a) Crear el proyecto en Supabase.** Uno propio para este módulo — el contrato
Main Brain dice que cada módulo tiene su propia base y nunca lee la de otro.
Región: `sa-east-1` (São Paulo) es la más cercana a Chile.

**b) Crear la tabla.** Ojo: el esquema del lead **ya no es fijo**. El cotizador
por pasos devuelve un `Record<string, string>` cuyas claves dependen de la rama
que recorrió la persona (`costoActual` sólo existe para quien ya importa,
`gastoLocal` sólo para quien compra en Chile, y cualquier campo puede traer su
`…Otro`). Guardar columna por pregunta obliga a migrar la tabla cada vez que se
edita `lib/cotizador.ts`. Conviene columnas fijas para lo que siempre está y un
`jsonb` para el resto:

```sql
create table public.leads (
  id           uuid primary key default gen_random_uuid(),
  creado_en    timestamptz not null default now(),
  -- siempre presentes: el paso de contacto y el de logística son comunes
  nombre       text not null,
  empresa      text,
  email        text not null,
  telefono     text,
  perfil       text not null,
  origen       text not null,
  carga        text not null,
  -- el resto del recorrido, tal como lo devuelve el cotizador
  respuestas   jsonb not null default '{}'::jsonb,
  enviado_mail boolean not null default false,
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
create index leads_perfil_idx    on public.leads (perfil);
```

Los campos UTM todavía **no los captura nadie**: el formulario no lee la query
más allá de `?perfil=`. Si se quiere trazabilidad de campañas hay que agregarlo
en `Cotizar.tsx` junto a la lectura del perfil.

**c) Activar RLS.** Sin esto la tabla queda abierta a cualquiera con la clave
anónima. La landing escribe con la `service_role` desde el servidor, así que
**ninguna política pública de insert es necesaria**:

```sql
alter table public.leads enable row level security;
-- Sin políticas: solo service_role (que salta RLS) puede leer y escribir.
-- Cuando exista un panel interno, agregar una política de select por rol.
```

**d) Variables de entorno en Vercel** (Production y Preview):

| Variable | De dónde sale | Notas |
|---|---|---|
| `SUPABASE_URL` | Project Settings → API → Project URL | También es lo que hace que `GET /meta` reporte "conectado". |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → service_role | **Secreta.** Nunca con prefijo `NEXT_PUBLIC_`, nunca en el cliente. |
| `NEXT_PUBLIC_SITE_URL` | El dominio final | Para metadatos y Open Graph. |

**e) Conectar el endpoint.** En `app/api/v1/leads/route.ts`, después de validar
y en paralelo al envío del correo, insertar y **seguir devolviendo `202` aunque
la inserción falle**. Registrar el error para revisarlo aparte.

## 5. Validar el copy comercial con el cliente

Los textos los redacté yo y contienen afirmaciones que 4 Puentes tiene que
confirmar. Viven en `lib/contenido.ts`, `lib/cotizador.ts` y en los títulos de
cada componente:

- Los puertos y regiones del mapa (`lib/mapa-datos.ts` más `rutasExtra`) y sobre
  todo **el estado comercial de cada uno**: `Rutas.tsx` los declara como "En
  operación", "Abriendo ruta" o "A pedido". Eso es una promesa de servicio.
- Los tres perfiles del cotizador y las preguntas comerciales: los rangos de
  costo en dólares por embarque, los de gasto local en pesos y los de peso.
- "Conocemos a los proveedores" y la verificación de proveedor en origen.
- "Te respondemos dentro de un día hábil", que aparece en el último paso y en la
  pantalla de cierre.
- Las regiones y puertos de entrada de la sección Cobertura.
- Que se ofrece **vía aérea** de verdad, con la promesa de "semanas menos de
  tránsito" de la sección Modalidades.

A propósito **no hay cifras** (años de experiencia, número de importaciones,
volumen): no correspondía inventarlas.

## 6. Assets

- **Container en mayor resolución.** El asset del cliente es 766×907 y en
  escritorio el hero lo dibuja a unos 600 CSS px de ancho o más, según el alto
  de la pantalla: en retina se ve blando. Pedir un export al doble. Vale igual
  para `container-movil.webp`, el render vertical con los cables largos.
- **`og:image`.** No existe. `app/layout.tsx` declara Open Graph sin imagen, así
  que cualquier enlace compartido en WhatsApp o LinkedIn sale sin miniatura.
  Se resuelve con un `app/opengraph-image.png` (1200×630).
- **Favicon.** Resuelto: `app/icon.png` y `app/apple-icon.png`.
- **Foto propia de la operación (con dos reparos).** La sección "Quién te
  asesora" muestra `operacion-bodega.webp`, que **es una imagen generada**, no
  una foto de la bodega de 4 Puentes. Dos cosas que conviene tener presentes
  antes de publicar:
  1. **No es documental.** La escena, el equipo y el recinto no existen. Como
     ilustración de ambiente pasa; presentada como "así trabajamos" no.
  2. **Lleva un contenedor MAERSK y otro NYK con sus logos visibles.** Son
     marcas de navieras reales. En una web comercial puede leerse como que hay
     relación con ellas.

  Reemplazar por una sesión propia en terreno: la bodega de Valdivia, carga
  llegando, revisión de mercadería. El retrato real de Gianpiero sigue en
  `public/gianpiero-puerto.webp` por si se decide volver a él.
- **Sin usar en `public/`.** `gianpiero-puerto.webp` ya no lo referencia ningún
  componente; se conserva a propósito por lo anterior.

  Nota para futuros assets con transparencia: una vez llegó un PNG con el damero
  de transparencia *pintado dentro de la imagen* — 0% de píxeles realmente
  transparentes, aunque a la vista pareciera recortado. Siempre conviene
  verificar el canal alfa antes de dar por buena una imagen "con fondo
  transparente".

## 7. Infraestructura

- **GitHub y Vercel.** Resuelto: el repo está en `origin`
  (`avronygg/4puentes`) y `upstream` (`mainbrain-cl/4-puentes-web`), y Vercel
  publica desde ahí.
- **Dominio.** Apuntar `4puentes.cl` (o el que sea) al proyecto de Vercel. Es
  requisito para verificar el remitente de Resend (punto 1).
- **Sitemap.** `app/robots.ts` anuncia `${site.url}/sitemap.xml` cuando el sitio
  se abre a buscadores, pero **ese archivo no existe**: no hay `app/sitemap.ts`.
  Hay que crearlo o quitar la línea antes de poner `porConfirmar` en `false`.
- **Analítica.** No hay nada instalado. Decidir entre Vercel Analytics
  (una línea, sin cookies) o GA4.
- **`npm audit`** reporta 9 vulnerabilidades altas, **todas de desarrollo y
  ninguna en el sitio publicado**: `npm audit --omit=dev` da cero. Vienen de
  `brace-expansion` / `minimatch`, que entran por la cadena de ESLint:

  ```
  eslint-config-next -> eslint-plugin-import -> minimatch -> brace-expansion
  ```

  ESLint solo corre en el equipo de quien programa; no forma parte del bundle
  que Vercel sirve. `npm audit fix --force` bajaría `eslint-config-next` a una
  versión incompatible con Next 16: **no hacerlo.** Se resuelven solas cuando
  Next publique una versión de `eslint-config-next` con las dependencias al día.

## 8. Limpieza pendiente

Nada de esto se ve en la web, pero desorienta a quien llegue después:

- **`GUIA-EDICION.md` quedó desfasada.** Habla de una lista `mercados` que ya no
  existe, de iconos `"caja"`/`"galpon"`/`"escudo"` que ya no son los nombres
  válidos, de `lib/leads.ts` que fue eliminado, de una banda del avión y un
  `components/Avion.tsx` que ya no están, y manda a hacer `cd web`, que no es la
  estructura del repositorio. **Tampoco conoce `marca` ni los `tramos`, que son
  de hoy.** Reescribirla contra el estado actual.
- **El correo sigue en el color anterior.** La plantilla HTML de
  `app/api/v1/leads/route.ts` rotula "4 Puentes" en el cobrizo `#9c403b`, que ya
  no es color de marca. Cambiarlo cuando se decida el punto 2, para no tocarlo
  dos veces.

## 9. Decisiones tomadas que conviene recordar

- **La sección de testimonios se eliminó el 07-08-2026**, a pedido del cliente:
  "no se entiende nada". Con ella se fue el riesgo que arrastraba desde que se
  diseñó: las cinco citas, con sus nombres, cargos y empresas, estaban
  inventadas y sólo los hechos y los porcentajes venían del cliente. Iban
  marcadas con `pendiente: true` justamente para que no se publicaran así.
  **Si alguna vez vuelve a montarse esa sección, hace falta la cita textual de
  cada empresa, su autorización escrita para nombrarla y el respaldo de cada
  porcentaje.** Publicar reseñas firmadas por quien no las dijo es publicidad
  engañosa ante el SERNAC.
- **El sitio está fijado en modo claro** (`color-scheme: light`). Se construyó
  sobre una foto de cielo brillante y toda la paleta de superficies asume
  blanco. Reactivar el modo oscuro implica rediseñar el hero y las tarjetas.
- **`npm run build` no está roto.** La primera compilación tras borrar `.next`
  tarda 4-5 minutos por el chequeo de TypeScript desde cero, y Next no imprime
  nada hasta terminar. No borres `.next` para "limpiar" y no mates el proceso
  por impaciencia. Detalle en ARQUITECTURA.md.
- **El container va a su saturación original.** Se probó bajarlo a la saturación
  de la paleta (66%) y el cliente lo vio apagado respecto de su foto.
- **En móvil el container es otro archivo, no el mismo escalado.**
  `container-movil.webp` trae los cables largos para que la cuerda entre por el
  borde superior de la pantalla. Reemplazar uno sin el otro deja el hero
  descalzado.
- **`overflow-x` va en `clip`, no en `hidden`.** Con `hidden` el recorte se
  propaga al viewport y Chrome mide los elementos `position: fixed` contra el
  ancho con scroll: el nav quedaba 14px más ancho que la pantalla y abría scroll
  horizontal en móvil.
- **La cortina de entrada no depende de JavaScript.** Se retira con una
  animación CSS que termina siempre. Si se la ata a un evento de hidratación, un
  fallo del JS deja el sitio tapado.

### Historial del color de marca

Es la decisión que más veces se dio vuelta, y siempre por lo mismo: el contraste.

1. **`#FA382B`** (rojo brillante). Sobre el cielo medía 1,06:1 en el titular
   —rojo y azul tienen casi la misma luminancia y el ojo no los separaba—. Se
   sostuvo con un velo oscuro que lo llevaba a 4,57.
2. **`#9C403B`** (cobrizo). Al ser oscuro contrastaba contra fondo claro, y con
   texto blanco encima daba 6,46:1, que quitaba toda restricción en los botones.
3. **`#FD190F`** (rojo, el actual). Se volvió al rojo por decisión de marca. El
   problema del punto 1 volvió con él, y hoy está sin resolver: ver el punto 2 de
   este documento.

Queda anotado porque es la trampa a la que vuelve cualquiera que toque este
color: **cambiar el tono de marca es cambiar el contraste de media página**, no
sólo el de un botón.

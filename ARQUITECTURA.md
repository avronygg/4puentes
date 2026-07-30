# Arquitectura — 4 Puentes Web

Para quien vaya a tocar código. Explica **por qué** está armado así, que es lo
que no se deduce leyendo los archivos.

---

## Sistema de diseño

Todo vive en `app/globals.css`. Dos capas:

- **`@theme`** — los tokens que Tailwind convierte en utilidades: colores de
  marca, escala de espaciado (`s1`…`s10`), radios y fuentes. Escribir
  `gap-s5` en vez de `gap-6` mantiene la escala.
- **`:root`** — los colores de superficie como variables CSS, para que un
  cambio de tema sea un cambio de token y no de componentes.

**El sitio está fijado en modo claro** (`color-scheme: light`). No es un
descuido: toda la paleta de superficies asume blanco —las tarjetas de vidrio se
apoyan en él, y el ritmo de la página lo dan dos bloques oscuros aislados—.
`--sky-filter` quedó como gancho para oscurecer las dos fotos de fondo si algún
día se reactiva; hoy vale `none`. Reactivar el modo oscuro implica rediseñar el
hero y las tarjetas.

### Reglas de color que no se pueden romper

- **El rojo `#FD190F`** es el color de marca: `--color-terra-400` y
  `--color-accent-btn` son el mismo tono. **Toda la escala `terra` se deriva de
  él** (hsl 3, 98%, 53%): el 300 es la mezcla con blanco y del 500 para abajo se
  oscurece el mismo tono. Cambiar el 400 obliga a rehacer la escala completa.
- **Con texto blanco encima da 3,95:1**, por debajo del 4,5:1 que pide AA para
  texto normal. Cumple el 3:1 de texto grande y de componentes de interfaz, y
  nada más. Es deuda abierta, no una decisión cerrada: ver PENDIENTES.md.
- El hover (`--color-accent-btn-hover`, `#D5150D`, que es el `terra-500`) sí
  llega a **5,38:1**. Es el candidato natural para donde haya texto blanco.
- **El vidrio del nav es ese mismo rojo al 85%** (`--nav-glass`). Sobre una
  sección clara el texto blanco queda en **3,58:1**. Subir la opacidad no lo
  arregla —a 100% son los 3,95:1 del rojo puro—: lo que hay que cambiar es el
  tono, no la transparencia. Invertir tampoco: sobre el vidrio el CTA pasa a
  fondo blanco con texto rojo, y el contraste es el mismo 3,95:1, porque la
  razón entre dos luminancias no depende de cuál va encima.
- **Dos bloques oscuros y el pie en toda la página**: "Cómo funciona"
  (`--color-terra-900` sólido) y Cobertura (`.section--sea`, foto de mar).
  Están alternados a propósito —blanco, oscuro, blanco, blanco, oscuro, blanco,
  pie— y agregar un tercero rompe ese ritmo.
- **Cobertura es un bloque de foto para cortar la seguidilla de secciones
  blancas** que quedaba entre el mapa de rutas y el formulario. El velo de `.sea-bg`
  es fuerte y va más cargado abajo: la textura del agua es clara y muy movida, y
  con menos velo el texto blanco se pierde en las crestas. Si se reemplaza la
  foto, lo primero a revisar es el velo, no el texto.

## El hero: tres capas

Es la pieza central y la que más cuesta tocar sin romper.

```
.hero
├── .hero__sky      capa 1 — foto de cielo, parallax lento
├── .hero__ship     capa 3 — container, va DELANTE del texto
└── .hero__body     capa 2 — texto
```

**El container va delante del texto a propósito**, y las eslingas cruzan el
titular: así lo pidió el cliente. El asset trae los cables hasta el borde
superior, por eso la capa sangra fuera del viewport (`top: -4%`) y el giro
pivota en `transform-origin: 50% 0%` — justo donde los cables salen de cuadro.
Si se pivotea desde el centro, el container parece girar en el aire en vez de
colgar.

### Ya no hay velo ni sombras de texto

`.hero__scrim` fue eliminado y **en todo el proyecto no queda ninguna
`text-shadow`**. Lo único que separa el texto de la foto es el degradado de
`.hero__sky::after`: una capa azul marino que carga a la izquierda (donde está
la columna de texto) y se disuelve hacia la derecha, más una segunda pasada
vertical que oscurece arriba y abajo.

Consecuencias para quien toque el hero:

- **El titular ya no tiene una capa propia que lo proteja.** Mover la columna de
  texto hacia la derecha lo saca de la zona cargada del degradado.
- La segunda línea del titular es el rojo de marca sobre la foto. **Ese
  contraste no está medido contra el sitio desplegado** desde que se quitó el
  velo y cambió el color; hasta que se mida no se puede afirmar que cumpla.
- En vertical el degradado es otro: sólo vertical, más cargado abajo, porque ahí
  el texto y el CTA quedan en la mitad inferior.

### El container en vertical es otro archivo

Por debajo de 900px un `<picture>` sirve `/container-movil.webp` en vez de
`/container.webp`. No es la misma imagen escalada: **es otro render, con los
cables largos**, para que la cuerda entre por el borde superior de la pantalla
en vez de aparecer cortada a media altura.

Las proporciones están declaradas a mano en el CSS (`766 / 907` en escritorio,
`680 / 1390` en vertical). Si se reemplaza cualquiera de los dos assets por otro
con distinta relación, hay que corregir el `aspect-ratio` o la pieza se deforma.

### Tres trampas del hero

- **No declarar `width` en `.hero__body`.** Pisa el ancho de `.wrap` (misma
  especificidad, gana el que va después) y el hero pierde los márgenes
  laterales en todos los tamaños.
- **El container se dimensiona por el menor de dos presupuestos**
  (`min(44vw - 42px, 72svh)`), no sólo por el alto. El texto tiene ancho fijo y
  el container crecía con la altura de pantalla: a 1440×950 ya se comía la "N"
  de IMPORTACIÓN.
- **En vertical manda el `svh`** (`min(82vw, 36svh)`): el tope por altura deja
  el container siempre al ~68% del alto y libre del párrafo. El `82vw` sólo
  evita que en pantallas muy altas se vaya de ancho.

En pantallas bajas (`max-height: 800px`) ya no hace falta redimensionar nada: el
tope en `svh` lo resuelve y sólo se recorta el padding superior del bloque de
texto.

## La cortina de entrada

`.cargador` va en el HTML que emite el servidor (`app/layout.tsx`) y se retira
con una animación CSS. **No depende de ningún evento de JavaScript**: así no hay
parpadeo entre el primer pintado y la hidratación, y si el JS fallara la cortina
igual desaparece en vez de dejar el sitio tapado.

El ciclo termina siempre a los ~1,45 s (0,85 s de espera más 0,6 s de salida),
mientras el container todavía está bajando: `--drop-dur` son 2,1 s, así que el
primer cuadro visible del sitio ya tiene movimiento en vez de una foto quieta.

## Aparición por scroll

`components/Revelar.tsx` envuelve una sección y observa a todos sus
descendientes marcados con `data-revelar`. Es un observador por bloque, no un
componente por tarjeta.

Dos decisiones que no se ven en el archivo:

- **El estado oculto vive en CSS** (`[data-revelar]` en `globals.css`), no en el
  componente. Si viviera en React habría un destello entre el HTML del servidor
  y la hidratación. El respaldo está en el `<noscript>` del layout, que anula el
  estado inicial: sin JavaScript el contenido se ve igual.
- **El escalonado se calcula por tanda**, no por índice global. Los elementos que
  entran juntos en pantalla se ordenan entre ellos, así el retardo no crece
  indefinidamente cuando alguien cae a mitad de la página desde un enlace.

## `overflow-x: clip`, no `hidden`

En `html` y `body`. Con `hidden` el recorte se propaga al viewport y Chrome pasa
a medir los elementos `position: fixed` contra el ancho con scroll y no contra
el visible: el nav y el menú terminaban 14px más anchos que la pantalla y eso
abría un scroll horizontal en móvil. `clip` no crea contenedor de scroll, así
que el problema no existe. **No volver a `hidden`.**

## El mapa de rutas

`lib/mapa-datos.ts` está **generado** por `scripts/mapa/generar.py`. No editarlo.
El generador no está versionado en este repositorio.

La base es `BlankMap-World.svg` de Wikimedia (dominio público) en **proyección
Robinson**. El generador no rota el ráster — eso deformaría la geometría — sino
que por cada punto de la grilla invierte Robinson para obtener lat/lon, corrige
el meridiano central y vuelve a proyectar sobre el ráster fuente.

**El meridiano central es 168°, no América exactamente al centro.** Con América
centrada, los orígenes asiáticos caen en bordes opuestos del mapa y las rutas se
parten en dos. Centrado en el Pacífico, Asia queda a la izquierda, América a la
derecha, y las rutas entran limpias a Chile. Además los bordes caen en el
Atlántico, así África no aparece dos veces.

**El alto no se fija a mano**: se calcula de la proporción real de Robinson para
la banda de latitudes elegida (`LAT_TOP`/`LAT_BOT`). Ponerlo a mano deforma el
mapa.

**El punto de destino está mar adentro a propósito** para que se lea sobre el
Pacífico y no encima de la costa.

Cada ruta se dibuja dos veces: una línea fija siempre visible (`.mapa__ruta`) y
un tramo que la recorre (`.mapa__flujo`). Antes era un solo trazo animado que
aparecía y desaparecía, y parecía que le disparaban a América.

**Los orígenes americanos no salen del generador.** Los Ángeles, Houston y
Manzanillo viven en `rutasExtra`, en `lib/contenido.ts`, y `Rutas.tsx` los
concatena a `MAPA.rutas`. Se hizo así para no editar a mano un archivo marcado
como generado; el comentario de `contenido.ts` trae la fórmula para calcular las
coordenadas de un origen nuevo en el sistema del mapa.

**La lista va debajo del mapa, agrupada por región** (`.rutas-lista`), no en
columna al costado: con once puertos, la columna estiraba la sección entera.
Agrupar además permite colgar de cada región su estado comercial (en operación,
abriendo ruta, a pedido), que se define en `Rutas.tsx` y **el cliente todavía no
confirma**.

La proyección está verificada contra ciudades conocidas: Valdivia cae a 0,4px
de la costa en el ráster de 3840px.

## El cotizador

`lib/leads.ts` ya no existe. El formulario dejó de ser una sola pantalla: hoy es
un recorrido por pasos definido **como datos** en `lib/cotizador.ts`, y
`components/Cotizar.tsx` sólo lo dibuja. Agregar una pregunta es editar un
arreglo, no tocar JSX.

**La misma definición la usan el navegador y el servidor.** `validarPaso` corre
en cada "Continuar" y `validarCotizacion` corre en el endpoint, que no confía en
el cliente. Si cambias la validación, cambia en los dos lados a la vez — ese es
el punto.

Decisiones que conviene conocer antes de editar los pasos:

- **El perfil se pregunta primero** porque de él dependen los pasos siguientes:
  cada rama declara su `cuando`, y `pasosVisibles` arma el recorrido. Son tres
  perfiles a propósito: tres tarjetas se comparan de un vistazo y una cuarta ya
  obliga a leer.
- **Los rangos de cantidad, peso y frecuencia se definen una sola vez** y se
  reutilizan entre ramas. Si cada rama tuviera su escala, dos leads del mismo
  volumen quedarían en categorías distintas y no se podrían comparar.
- **La opción «Otro» guarda el texto libre en `${id}Otro`**, con clave propia.
  Así el valor del rango sigue siendo cerrado y agrupable, y el resumen que ve
  el comercial muestra lo que la persona escribió y no la palabra "Otro".
- `validarCotizacion` **sólo conserva los campos declarados** en los pasos y
  **sólo valida los pasos visibles** para esas respuestas: nada de basura extra,
  y una rama que el visitante no recorrió no puede bloquear el envío.

Dos detalles del componente que parecen rodeos y no lo son:

- **El enlace `?perfil=…`** de las tarjetas de Servicios se lee en un efecto y
  no en el estado inicial: la página se prerenderiza estática, el servidor no
  conoce la query y arrancar con el perfil puesto daría discrepancia de
  hidratación. Se lee de `window` en vez de `useSearchParams` para no envolver
  la sección en un `Suspense`.
- **Al cambiar de paso el foco se mueve al encabezado** del paso. Sin eso el
  lector de pantalla sigue leyendo donde estaba y en móvil la vista no acompaña
  el salto.

## El endpoint de leads

`POST /api/v1/leads` **envía la cotización por correo con Resend**. Se ataca
directo su API HTTP en vez de usar el SDK: es una sola petición y no suma una
dependencia al bundle del servidor.

| Situación | Respuesta |
|---|---|
| Cuerpo válido | `202` con `{ ok: true, enviado }` |
| Falla la validación | `422` con `{ ok: false, errores }` por campo |
| El cuerpo no es JSON | `400` |
| `GET` | `405` con `Allow: POST` |

**El endpoint nunca debe romper el flujo del visitante**: el canal real es
WhatsApp, que la pantalla de cierre ofrece igual con el resumen ya armado. De
ahí que sin `RESEND_API_KEY`, `RESEND_FROM` o `LEADS_TO` no falle: valida,
registra y devuelve `202` con `enviado: false`. Del lado del cliente, lo único
que se trata como error es el `422` —que además devuelve al paso donde está el
campo rechazado—; cualquier otro fallo, incluida una caída de red, termina en la
pantalla de cierre.

Cuando se conecte la persistencia, **mantener ese comportamiento**: devolver
`202` aunque la inserción falle, y registrar el error aparte.

Dos cosas sobre datos personales: el correo del interesado viaja en `reply_to`,
para que responder desde el buzón comercial vaya directo a él; y en el log de la
función queda recortado (`ab***@dominio`), porque ese log vive en Vercel.

## Favicon

`app/icon.png` y `app/apple-icon.png`. Es la convención de archivo del App
Router: Next genera las etiquetas solo, no hay que declarar ningún `<link>`.

## Rendimiento

- **Poppins vive en `app/fonts/`**, no se descarga de Google en cada build. El
  build queda determinista y sin depender de la red.
- **El espaciado entre secciones** sale de `--gap-section`, hoy en
  `clamp(64px, 7.2vw, 109px)` — un 20% menos que el valor original.
- Las imágenes son WebP y pasan por `next/image` salvo los dos fondos (el cielo
  del hero y el mar de Cobertura), que van por CSS porque necesitan
  `background-size: cover`.
- **`next.config.ts` declara `qualities: [75, 90]`.** Next 16 exige declarar
  cada calidad que se use, y el container va a 90: es la pieza más grande de la
  página y el original ya venía comprimido, así que recomprimirlo a 75 se notaba.
- El parallax del hero corre en `requestAnimationFrame` con un flag para no
  encolar frames, y se desactiva completo con `prefers-reduced-motion`.

## Accesibilidad

Los ratios que están fijados en el CSS y valen para cualquier pantalla:

| Elemento | Contraste | Mínimo AA | Estado |
|---|---|---|---|
| Texto blanco sobre el rojo de marca `#FD190F` (botones, CTA, cotizador) | 3,95 | 4,5 | No cumple |
| Rojo de marca sobre blanco (CTA invertido del nav al bajar) | 3,95 | 4,5 | No cumple |
| Texto blanco sobre el hover `#D5150D` | 5,38 | 4,5 | Cumple |
| Texto blanco sobre el vidrio del nav, sobre sección clara | 3,58 | 4,5 | No cumple |

Los "no cumple" son la deuda abierta que describe PENDIENTES.md.

**Lo que se apoya en la foto del cielo no está medido con el diseño actual.** La
tabla anterior de este archivo venía de mediciones sobre capturas del sitio
desplegado, con el velo del titular puesto y con el cobrizo como color de marca.
Las dos cosas cambiaron: hay que volver a medir sobre capturas antes de afirmar
nada del titular, el párrafo del hero y la franja de confianza.

Lo que sí está resuelto:

- Todas las animaciones respetan `prefers-reduced-motion`, incluida la regla
  general del final del CSS que corta duraciones e iteraciones.
- El mapa tiene `role="img"` con descripción, y las rutas se dibujan fijas
  cuando se pide menos movimiento.
- El cotizador conserva los `input[type=radio]` reales en el DOM aunque se
  dibujen a mano, mueve el foco al encabezado en cada paso, expone el avance con
  `role="progressbar"`, anuncia los errores con `role="alert"` y el paso actual
  con `aria-live`.

## Sobre los tiempos de build

`npm run build` funciona con normalidad, pero **la primera compilación después
de borrar `.next` tarda entre 4 y 5 minutos**: casi todo ese tiempo se lo lleva
el chequeo de TypeScript desde cero. Con la caché de `.next` presente baja a
unos 15 segundos.

Dos consecuencias prácticas:

- **No borres `.next` para "limpiar"** salvo que haya una razón concreta. Es la
  caché que hace rápido el build.
- Next **no imprime nada hasta terminar**: durante esos minutos no verás salida
  y el proceso aparece a 0% de CPU en varios momentos. Eso es normal, no está
  colgado. Si lo matas por impaciencia y vuelves a empezar sin caché, entras en
  un ciclo que parece un cuelgue y no lo es.

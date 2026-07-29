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
descuido: la landing se construyó sobre una foto de cielo brillante y el
titular en azul marino no sobrevive a un fondo oscurecido. Reactivar el modo
oscuro implica rediseñar el hero.

### Reglas de color que no se pueden romper

- **El rojo de marca es `#FA382B`** (`--color-accent-btn`), definido por el
  cliente. Con texto blanco da **3.71:1**: cumple el mínimo AA **solo para texto
  grande**. Por eso las etiquetas de los botones van a **19px en negrita**
  (`text-[1.12rem] font-bold`) y no al tamaño de cuerpo. **Si alguien las achica,
  el botón deja de cumplir.**
- El coral `#F2645C` (`--color-terra-400`) queda para donde no lleva texto
  encima: iconos, líneas base del mapa, detalles.
- **Solo dos bloques de color en toda la página**: la sección "Cómo funciona"
  (terracota sólido) y el pie. Todo lo demás va blanco. Agregar un tercero
  rompe el ritmo que el cliente aprobó.

## El hero: tres capas

Es la pieza central y la que más cuesta tocar sin romper.

```
.hero
├── .hero__sky      capa 1 — foto de cielo, parallax lento
├── .hero__scrim    velo tonal (ver abajo)
├── .hero__ship     capa 3 — container, va DELANTE del texto
└── .hero__body     capa 2 — texto
```

**El container va delante del texto a propósito**, y las eslingas cruzan el
titular: así lo pidió el cliente. El PNG trae los cables hasta el borde
superior, por eso la capa sangra fuera del viewport (`top: -4%`) y el giro
pivota en `transform-origin: 50% 0%` — justo donde los cables salen de cuadro.
Si se pivotea desde el centro, el container parece girar en el aire en vez de
colgar.

### El velo del titular

Las dos líneas son blanca y roja `#FA382B`, sobre una foto de cielo. El rojo es
de **luminancia media**, casi idéntica a la del azul del cielo (0.233 contra
0.251): sobre el cielo sin tratar mide **1.06:1**, es decir, se pierde.

La clave, y es contraintuitiva: **con este rojo, aclarar el fondo lo empeora y
oscurecerlo lo salva.** Por eso `.hero__scrim` aplica un velo oscuro parejo
sobre la columna de texto, y se disuelve hacia la derecha con `mask-image` para
no ensuciar la foto donde no hay texto. Con el velo, el rojo llega a **4.57:1**.

No cambies el velo por uno claro ni lo quites "porque tapa la foto": el titular
depende de él para leerse.

### Dos trampas del hero

- **No declarar `width` en `.hero__body`.** Pisa el ancho de `.wrap` (misma
  especificidad, gana el que va después) y el hero pierde los márgenes
  laterales en todos los tamaños.
- **En vertical el container se dimensiona por ancho, no por alto.** Con la
  proporción del PNG, dimensionarlo por alto lo deja más ancho que la pantalla.

El hero tiene tres juegos de medidas: escritorio, vertical, y un tercero para
**pantallas bajas** (`max-height: 800px`). En un 360×740 el CTA quedaba cortado
por el borde; ahí el eje que manda es el alto, no el ancho.

## El mapa de rutas

`lib/mapa-datos.ts` está **generado** por `scripts/mapa/generar.py`. No editarlo.

La base es `BlankMap-World.svg` de Wikimedia (dominio público) en **proyección
Robinson**. El generador no rota el ráster — eso deformaría la geometría — sino
que por cada punto de la grilla invierte Robinson para obtener lat/lon, corrige
el meridiano central y vuelve a proyectar sobre el ráster fuente.

**El meridiano central es 168°, no América exactamente al centro.** Con América
centrada, los orígenes asiáticos caen en bordes opuestos del mapa y las rutas se
parten en dos. Centrado en el Pacífico, Asia queda a la izquierda, América a la
derecha, y las ocho rutas entran limpias a Chile. Además los bordes caen en el
Atlántico, así África no aparece dos veces.

**El alto no se fija a mano**: se calcula de la proporción real de Robinson para
la banda de latitudes elegida (`LAT_TOP`/`LAT_BOT`). Ponerlo a mano deforma el
mapa.

**El punto de destino está mar adentro a propósito** (lon -77.6 en vez de la
posición real de Valdivia) para que se lea sobre el Pacífico y no encima de la
costa.

Cada ruta se dibuja dos veces: una línea fija siempre visible (`.mapa__ruta`) y
un tramo que la recorre (`.mapa__flujo`). Antes era un solo trazo animado que
aparecía y desaparecía, y parecía que le disparaban a América.

La proyección está verificada contra ciudades conocidas: Valdivia cae a 0.4px
de la costa en el ráster de 3840px.

## El formulario

`lib/leads.ts` define el contrato del lead y **la misma función valida en el
navegador y en el servidor**. Si cambias la validación, cambia en los dos lados
a la vez — ese es el punto.

`POST /api/v1/leads` **no guarda nada todavía** (ver PENDIENTES.md). Valida,
registra en el log y responde 202. El canal real es WhatsApp, que el formulario
abre igual — por eso el endpoint nunca debe romper el flujo del visitante: si
falla la API, el lead se va igual por WhatsApp.

Cuando se conecte Supabase, **mantener ese comportamiento**: devolver 202
aunque la inserción falle, y registrar el error aparte.

## Rendimiento

- **Poppins vive en `app/fonts/`**, no se descarga de Google en cada build. El
  build queda determinista y sin depender de la red.
- **El espaciado entre secciones** sale de `--gap-section`, hoy en
  `clamp(64px, 7.2vw, 109px)` — un 20% menos que el valor original.
- Las imágenes son WebP y pasan por `next/image` salvo los fondos, que van por
  CSS porque necesitan `background-size: cover`.
- El parallax del hero corre en `requestAnimationFrame` con un flag para no
  encolar frames, y se desactiva completo con `prefers-reduced-motion`.

## Accesibilidad

Se verificó midiendo el contraste sobre capturas reales del sitio desplegado,
no sobre los valores del CSS. Los números que importan:

| Elemento | Contraste | Mínimo |
|---|---|---|
| Titular línea 1 (blanca) | 16.92 | 3.0 |
| Titular línea 2 (`#FA382B`) | 4.57 | 3.0 |
| Párrafo del hero | 15.09 | 4.5 |
| Botón CTA (texto blanco) | 3.71 | 3.0 (texto grande) |
| Números de paso | 6.19 | 4.5 |
| Texto del pie | 7.28 | 4.5 |

Todas las animaciones respetan `prefers-reduced-motion`. El mapa tiene
`role="img"` con descripción, y las rutas se dibujan fijas cuando se pide menos
movimiento.

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

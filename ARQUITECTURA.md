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

- **El relleno de botones es `--color-accent-btn` (#B8443D), no el coral
  #F2645C.** El coral con texto blanco da 3.11:1 y no cumple el mínimo AA de
  4.5:1. El coral se usa donde no lleva texto encima: iconos, puntos del mapa,
  detalles.
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

El titular tiene dos líneas de colores opuestos: blanca y azul marino. **La
blanca necesita fondo oscuro y la marino necesita fondo claro — con un solo
tono de fondo es matemáticamente imposible que ambas cumplan contraste.**

`.hero__scrim` resuelve eso con bandas horizontales: oscurece la franja de la
línea blanca, aclara la de la línea marino, y se disuelve hacia la derecha con
`mask-image` para no ensuciar la foto donde no hay texto.

Si mueves el titular verticalmente, **hay que mover las paradas del gradiente**
o la línea marino queda ilegible. Los porcentajes del velo están calzados con
las posiciones reales del texto.

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
centrada, China y Emiratos caen en bordes opuestos del mapa y las rutas se
parten en dos. Centrado en el Pacífico, Asia queda a la izquierda, América a la
derecha, y todas las rutas entran limpias a Chile. Además los bordes caen en el
Atlántico, así África no aparece dos veces.

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
- Las imágenes son WebP y pasan por `next/image` salvo los fondos, que van por
  CSS porque necesitan `background-size: cover`.
- El parallax del hero corre en `requestAnimationFrame` con un flag para no
  encolar frames, y se desactiva completo con `prefers-reduced-motion`.

## Accesibilidad

Se verificó midiendo el contraste sobre capturas reales del sitio desplegado,
no sobre los valores del CSS. Los números que importan:

| Elemento | Contraste |
|---|---|
| Titular línea 1 | 13.85 |
| Párrafo del hero | 5.47 |
| Botón CTA | 5.22 |
| Números de paso | 6.19 |
| Texto del pie | 7.28 |

Todas las animaciones respetan `prefers-reduced-motion`. El mapa tiene
`role="img"` con descripción, y las rutas se dibujan fijas cuando se pide menos
movimiento.

## Nota sobre el entorno de desarrollo

En la máquina donde se construyó esto, `next build` y `next dev` se cuelgan a
0% de CPU dentro del bootstrap de Node, antes de ejecutar código de Next. No es
del proyecto: **Vercel compila sin problemas**. Si te pasa lo mismo, verifica
en el deploy de Vercel en vez de pelear con el build local.

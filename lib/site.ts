/**
 * Configuración del sitio. Todo lo que el cliente puede querer cambiar sin tocar
 * componentes vive acá. Los datos de contacto son PLACEHOLDERS: reemplazar antes
 * de publicar en producción (ver PENDIENTES.md).
 */

export const site = {
  nombre: "Cuatro Puentes",
  nombreCorto: "4 Puentes",
  titulo: "4 Puentes — Importación integral al sur de Chile",
  descripcion:
    "Importación puerta a puerta desde cualquier parte del mundo, con bodegaje " +
    "en Valdivia y seguro de carga incluidos. Cobertura en todo el sur de Chile.",
  /**
   * Dominio canónico. Manda `NEXT_PUBLIC_SITE_URL` si está; el valor por
   * defecto es `comex4puentes.cl` porque es el dominio real de la empresa: es
   * el del correo, su zona ya está en Route 53 y `www` tiene un CNAME al raíz
   * esperando el sitio. `4puentes.cl`, que era el valor anterior, ni siquiera
   * resuelve, así que el sitemap y las URL canónicas apuntaban a la nada.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://comex4puentes.cl",
} as const;

/**
 * Códigos de Google. No son secretos —viajan en el HTML de todas formas—, así
 * que viven acá y no en variables de entorno: quien los cambie los encuentra
 * donde está el resto de la configuración del sitio.
 */
export const google = {
  /** La etiqueta que Search Console busca para dar por verificado el dominio. */
  verificacion: "eoLitotsXyLgBpv-Z75SWop0JX3X7dNohVkz0Se7oG8",
  /** GA4. Se carga sólo en producción: los despliegues de previsualización
   *  ensuciarían el informe con visitas que no son de nadie. */
  analytics: "G-057Y9F32KH",
} as const;

/**
 * `porConfirmar` es la bandera que cierra el sitio a los buscadores desde
 * app/robots.ts y desde el `robots` de la metadata. Existía para que Google no
 * llegara a guardar un "+56 9 XXXX XXXX" como el teléfono de la empresa.
 *
 * Ya no hay ningún dato inventado: teléfono, WhatsApp y correo son los reales,
 * y "Valdivia, Región de Los Ríos" es cierto —es donde está la bodega—, sólo
 * que sin calle. Por eso pasa a `false`.
 *
 * Para volver a cerrarlo basta con ponerla en `true`: se cierran de una vez el
 * robots.txt, la metadata y el anuncio del sitemap.
 */
export const contacto = {
  telefono: "+56 9 9835 9091",
  telefonoHref: "tel:+56998359091",
  email: "contacto@comex4puentes.cl",
  direccion: "Valdivia, Región de Los Ríos",
  /** Solo dígitos, formato wa.me. */
  whatsapp: "56998359091",
  porConfirmar: false,
} as const;

export function whatsappUrl(texto: string): string {
  return `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(texto)}`;
}

/**
 * Sólo las cuatro que el visitante necesita para decidir, en el orden en que
 * aparecen en la página. Rutas y Cobertura salieron del menú a propósito: son
 * respaldo, no etapas de la decisión, y con siete enlaces la barra obligaba a
 * leer en vez de reconocer. Las secciones siguen ahí y se llega scrolleando.
 */
export const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#proceso", label: "Cómo funciona" },
  { href: "#cotizar", label: "Cotizar" },
] as const;

/* Acá vivían `origenes` y `tiposCarga`, del formulario de una sola pantalla.
   Ya no los importa nadie: esas listas ahora son opciones dentro de
   lib/cotizador.ts. Se eliminaron porque seguían acotadas a Asia y quien las
   editara creyendo que cambiaba el formulario no habría visto ningún efecto. */

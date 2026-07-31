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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://4puentes.cl",
} as const;

/**
 * Teléfono y WhatsApp ya son los reales. Siguen pendientes el correo y la
 * dirección exacta, y por eso `porConfirmar` no se apaga todavía: es la bandera
 * que mantiene el sitio cerrado a buscadores desde app/robots.ts.
 */
export const contacto = {
  telefono: "+56 9 9835 9091",
  telefonoHref: "tel:+56998359091",
  email: "contacto@4puentes.cl",
  direccion: "Valdivia, Región de Los Ríos",
  /** Solo dígitos, formato wa.me. */
  whatsapp: "56998359091",
  porConfirmar: true,
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

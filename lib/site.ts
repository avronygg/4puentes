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

/** PENDIENTE: datos reales del cliente. */
export const contacto = {
  telefono: "+56 9 XXXX XXXX",
  telefonoHref: "tel:+56900000000",
  email: "contacto@4puentes.cl",
  direccion: "Valdivia, Región de Los Ríos",
  /** Solo dígitos, formato wa.me. PENDIENTE: número real. */
  whatsapp: "56900000000",
  porConfirmar: true,
} as const;

export function whatsappUrl(texto: string): string {
  return `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Cómo funciona" },
  { href: "#rutas", label: "Rutas" },
  { href: "#cobertura", label: "Cobertura" },
  { href: "#cotizar", label: "Cotizar" },
] as const;

/* Acá vivían `origenes` y `tiposCarga`, del formulario de una sola pantalla.
   Ya no los importa nadie: esas listas ahora son opciones dentro de
   lib/cotizador.ts. Se eliminaron porque seguían acotadas a Asia y quien las
   editara creyendo que cambiaba el formulario no habría visto ningún efecto. */

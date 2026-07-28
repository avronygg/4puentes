/**
 * Configuración del sitio. Todo lo que el cliente puede querer cambiar sin tocar
 * componentes vive acá. Los datos de contacto son PLACEHOLDERS: reemplazar antes
 * de publicar en producción (ver PENDIENTES.md).
 */

export const site = {
  nombre: "Cuatro Puentes",
  nombreCorto: "4 Puentes",
  titulo: "4 Puentes — Importación integral desde Asia al sur de Chile",
  descripcion:
    "Importación puerta a puerta desde China y Medio Oriente, con bodegaje y " +
    "seguro de carga incluidos. Base en Valdivia, cobertura en todo el sur de Chile.",
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
  { href: "#mercados", label: "Mercados" },
  { href: "#cobertura", label: "Cobertura" },
  { href: "#cotizar", label: "Contacto" },
] as const;

export const origenes = [
  "China",
  "Emiratos Árabes Unidos",
  "Otro mercado asiático",
  "Todavía no lo defino",
] as const;

export const tiposCarga = [
  "Contenedor completo (FCL)",
  "Carga consolidada (LCL)",
  "Aéreo",
  "No estoy seguro",
] as const;

import type { MetadataRoute } from "next";
import { contacto, site } from "@/lib/site";

/**
 * Mientras los datos de contacto sean placeholders el sitio se cierra a los
 * buscadores: no queremos que Google indexe "+56 9 XXXX XXXX" como el teléfono
 * de 4 Puentes. Al poner los datos reales en lib/site.ts y cambiar
 * `porConfirmar` a false, esto se abre solo.
 */
export default function robots(): MetadataRoute.Robots {
  if (contacto.porConfirmar) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}

import type { MetadataRoute } from "next";
import { contacto, site } from "@/lib/site";

/**
 * `contacto.porConfirmar` decide si el sitio está abierto a los buscadores.
 * Nació para que Google no indexara un "+56 9 XXXX XXXX" mientras los datos
 * eran de mentira; hoy son reales y está en `false`.
 *
 * CUIDADO al volver a ponerla en `true`: un `Disallow: /` no rompe nada
 * visible —la web se ve igual— pero saca el sitio de Google, y además impide
 * que Search Console lea la etiqueta de verificación. Si se cierra, hay que
 * saber por cuánto tiempo y acordarse de reabrirlo. `GET /meta` publica el
 * estado en `indexable` para poder comprobarlo sin adivinar.
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

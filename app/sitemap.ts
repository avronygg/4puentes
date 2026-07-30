import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * `app/robots.ts` anuncia este sitemap cuando el sitio se abre a buscadores.
 * Sin este archivo esa URL respondía 404 el día que `porConfirmar` pasara a
 * false, así que el anuncio y el recurso van juntos.
 *
 * Es una landing de una sola página: el sitemap tiene una entrada. Las
 * secciones son anclas dentro de la misma URL y no se listan por separado.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

import { NextResponse } from "next/server";
import pkg from "@/package.json";
import { contacto, site } from "@/lib/site";

export const dynamic = "force-dynamic";

/**
 * GET /meta — identidad y capacidades del módulo. Contrato Main Brain.
 *
 * `persistencia` dice si los leads se están guardando: hoy no (ver PENDIENTES.md).
 * `correo` dice si el envío está configurado, y existe para poder comprobarlo
 * sin mandar un correo de prueba al buzón comercial. Sólo publica booleanos y
 * el número de destinatarios: ni la clave ni las direcciones salen de acá.
 */
export function GET() {
  return NextResponse.json(
    {
      modulo: "4puentes-web",
      version: pkg.version,
      descripcion: "Landing de captación de 4 Puentes (importación integral)",
      entorno: process.env.VERCEL_ENV ?? "development",
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
      api: { v1: ["POST /api/v1/leads"] },
      persistencia: {
        supabase: Boolean(process.env.SUPABASE_URL),
        estado: process.env.SUPABASE_URL ? "conectado" : "pendiente",
      },
      /**
       * Si el sitio se deja cerrado a los buscadores, no se nota: la web sigue
       * viéndose igual y simplemente nunca aparece en Google. Publicarlo acá
       * hace que ese estado se pueda mirar de un vistazo, sin leer robots.txt
       * ni el HTML, y que una regresión salte a la vista.
       */
      indexable: {
        estado: contacto.porConfirmar ? "CERRADO a buscadores" : "abierto",
        robots: contacto.porConfirmar ? "Disallow: /" : "Allow: /",
        sitemap: `${site.url}/sitemap.xml`,
      },
      correo: {
        clave: Boolean(process.env.RESEND_API_KEY),
        remitente: Boolean(process.env.RESEND_FROM),
        destinatarios: (process.env.LEADS_TO ?? "")
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean).length,
        estado:
          process.env.RESEND_API_KEY && process.env.RESEND_FROM && process.env.LEADS_TO
            ? "configurado"
            : "pendiente",
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

import { NextResponse } from "next/server";
import pkg from "@/package.json";

export const dynamic = "force-dynamic";

/**
 * GET /meta — identidad y capacidades del módulo. Contrato Main Brain.
 * `persistencia` dice si los leads se están guardando: hoy no (ver PENDIENTES.md).
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
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

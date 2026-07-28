import { NextResponse } from "next/server";
import { validarLead } from "@/lib/leads";

export const dynamic = "force-dynamic";

/**
 * POST /api/v1/leads — recibe una solicitud de cotización.
 *
 * ESTADO: sin persistencia. Valida y deja el lead en el log de la función.
 * Conectar Supabase es el pendiente #1 (ver PENDIENTES.md). Mientras tanto el
 * canal real es WhatsApp, que el formulario abre igual: por eso este endpoint
 * nunca debe romper el flujo del visitante.
 */
export async function POST(req: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "El cuerpo debe ser JSON válido." },
      { status: 400 },
    );
  }

  const r = validarLead(cuerpo);
  if (!r.ok) {
    return NextResponse.json({ ok: false, errores: r.errores }, { status: 422 });
  }

  // El correo se recorta en el log: es dato personal y esto queda en Vercel.
  const [usuario] = r.lead.email.split("@");
  console.info("[lead]", {
    nombre: r.lead.nombre,
    empresa: r.lead.empresa || null,
    email: `${usuario.slice(0, 2)}***@${r.lead.email.split("@")[1]}`,
    origen: r.lead.origen,
    carga: r.lead.carga,
    recibido: new Date().toISOString(),
  });

  return NextResponse.json(
    {
      ok: true,
      persistido: false,
      nota: "Lead recibido. Persistencia en Supabase pendiente.",
    },
    { status: 202, headers: { "Cache-Control": "no-store" } },
  );
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Usa POST para enviar un lead." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

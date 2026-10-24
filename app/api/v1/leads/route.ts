import { NextResponse } from "next/server";
import { validarCotizacion, type Respuestas } from "@/lib/cotizador";
import { cuerpoHtml, cuerpoTexto } from "@/lib/correo-lead";
import { enviarPorResend } from "@/lib/resend";

export const dynamic = "force-dynamic";

/**
 * POST /api/v1/leads — recibe una solicitud de cotización del formulario paso
 * a paso y la envía por correo con Resend (ver lib/resend.ts).
 *
 * Sin las variables de entorno configuradas el endpoint NO falla: valida,
 * registra y devuelve 202 con `enviado: false`. El canal real sigue siendo
 * WhatsApp, así que este endpoint nunca debe romper el flujo del visitante.
 */

function enviarCorreo(datos: Respuestas) {
  return enviarPorResend({
    asunto: `Cotización — ${datos.nombre}${datos.producto ? ` · ${datos.producto}` : ""}`,
    html: cuerpoHtml(datos),
    texto: cuerpoTexto(datos),
    // Responder desde el correo va directo al interesado.
    responderA: datos.email,
  });
}

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

  const r = validarCotizacion(cuerpo);
  if (!r.ok) {
    return NextResponse.json({ ok: false, errores: r.errores }, { status: 422 });
  }

  const correo = await enviarCorreo(r.datos);

  // El correo se recorta en el log: es dato personal y esto queda en Vercel.
  const [usuario, dominio] = (r.datos.email ?? "").split("@");
  console.info("[lead]", {
    perfil: r.datos.perfil,
    origen: r.datos.origen,
    carga: r.datos.carga,
    email: usuario ? `${usuario.slice(0, 2)}***@${dominio}` : null,
    enviado: correo.enviado,
    motivo: correo.motivo ?? null,
    recibido: new Date().toISOString(),
  });

  return NextResponse.json(
    { ok: true, enviado: correo.enviado },
    { status: 202, headers: { "Cache-Control": "no-store" } },
  );
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Usa POST para enviar un lead." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

import { NextResponse } from "next/server";
import { validarCotizacion, type Respuestas } from "@/lib/cotizador";
import { cuerpoHtml, cuerpoTexto } from "@/lib/correo-lead";

export const dynamic = "force-dynamic";

/**
 * POST /api/v1/leads — recibe una solicitud de cotización del formulario paso
 * a paso y la envía por correo con Resend.
 *
 * Se llama por fetch desde el cliente y se ataca directo la API HTTP de Resend
 * en vez de su SDK: es una sola petición y evita sumar una dependencia al
 * bundle del servidor.
 *
 * Sin las variables de entorno configuradas el endpoint NO falla: valida,
 * registra y devuelve 202 con `enviado: false`. El canal real sigue siendo
 * WhatsApp, así que este endpoint nunca debe romper el flujo del visitante.
 */

const RESEND = "https://api.resend.com/emails";

async function enviarCorreo(datos: Respuestas): Promise<{ enviado: boolean; motivo?: string }> {
  const clave = process.env.RESEND_API_KEY;
  const desde = process.env.RESEND_FROM;
  const para = process.env.LEADS_TO;

  if (!clave || !desde || !para) {
    return { enviado: false, motivo: "faltan RESEND_API_KEY, RESEND_FROM o LEADS_TO" };
  }

  try {
    const res = await fetch(RESEND, {
      method: "POST",
      headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: desde,
        to: para.split(",").map((d) => d.trim()),
        // Responder desde el correo va directo al interesado.
        reply_to: datos.email,
        subject: `Cotización — ${datos.nombre}${datos.producto ? ` · ${datos.producto}` : ""}`,
        html: cuerpoHtml(datos),
        text: cuerpoTexto(datos),
      }),
    });

    if (!res.ok) {
      // El motivo importa: los fallos típicos al conectar son 403 por dominio
      // sin verificar y 422 por un remitente que no pertenece a ese dominio, y
      // sólo el cuerpo de la respuesta lo distingue.
      const detalle = await res.text().catch(() => "");
      return {
        enviado: false,
        motivo: `Resend respondió ${res.status}${detalle ? `: ${detalle.slice(0, 300)}` : ""}`,
      };
    }
    return { enviado: true };
  } catch (e) {
    return { enviado: false, motivo: e instanceof Error ? e.message : "error de red" };
  }
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

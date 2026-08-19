import { NextResponse } from "next/server";
import { resumen, validarCotizacion, type Respuestas } from "@/lib/cotizador";

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

function escapar(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cuerpoHtml(datos: Respuestas): string {
  const filas = resumen(datos)
    .map(
      (f) =>
        `<tr>
           <td style="padding:8px 16px 8px 0;color:#63615f;font-size:13px;vertical-align:top;white-space:nowrap">${escapar(f.etiqueta)}</td>
           <td style="padding:8px 0;color:#1a1a1b;font-size:14px;font-weight:500">${escapar(f.valor)}</td>
         </tr>`,
    )
    .join("");

  return `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#d5150d">4 Puentes</p>
    <h1 style="margin:0 0 20px;font-size:20px;color:#1a1a1b">Nueva solicitud de cotización</h1>
    <table style="border-collapse:collapse;width:100%">${filas}</table>
    <p style="margin:24px 0 0;font-size:12px;color:#63615f">
      Recibido el ${new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" })}.
    </p>
  </div>`;
}

async function enviarCorreo(datos: Respuestas): Promise<{ enviado: boolean; motivo?: string }> {
  const clave = process.env.RESEND_API_KEY;
  const desde = process.env.RESEND_FROM;
  const para = process.env.LEADS_TO;

  if (!clave || !desde || !para) {
    return { enviado: false, motivo: "faltan RESEND_API_KEY, RESEND_FROM o LEADS_TO" };
  }

  const texto = resumen(datos)
    .map((f) => `${f.etiqueta}: ${f.valor}`)
    .join("\n");

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
        text: texto,
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

import { NextResponse } from "next/server";
import { CAMPO_TRAMPA, ESPERA_MINIMA_MS, validarContacto } from "@/lib/contacto-landing";
import { cuerpoLandingHtml, cuerpoLandingTexto } from "@/lib/correo-landing";
import { enviarPorResend } from "@/lib/resend";

export const dynamic = "force-dynamic";

/**
 * POST /api/v1/leads/landing — el formulario corto de las landings de campaña.
 *
 * Tres defensas contra bots, de menor a mayor costo para quien las rodea:
 *
 *  1. Honeypot: un campo invisible que sólo un bot rellena.
 *  2. Tiempo mínimo: el formulario envía cuánto lleva en pantalla; menos de
 *     ESPERA_MINIMA_MS no lo escribió una persona.
 *  3. Límite por IP: unos pocos envíos por ventana.
 *
 * En los dos primeros casos se responde exactamente lo mismo que un envío que
 * salió bien (`enviado: true`): un bot que ve un error reintenta con otra
 * táctica, uno que ve éxito se va. Nada se envía ni se guarda.
 *
 * Si Resend falla se devuelve 202 con `enviado: false`. El formulario lo trata
 * como error y ofrece WhatsApp: acá el formulario es el canal, y un "¡Recibido!"
 * sin correo detrás sería un lead perdido.
 */

const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;

/**
 * Memoria de la instancia, no compartida entre instancias serverless: frena a
 * un script que martillea una misma función, no a un ataque distribuido. Es la
 * tercera capa, no la principal. Si hiciera falta algo estricto, Vercel tiene
 * rate limiting propio en el firewall.
 */
const intentos = new Map<string, number[]>();

function excedeLimite(ip: string, ahora: number): boolean {
  const recientes = (intentos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (recientes.length >= MAX_POR_VENTANA) {
    intentos.set(ip, recientes);
    return true;
  }
  recientes.push(ahora);
  intentos.set(ip, recientes);

  // Que el mapa no crezca sin tope en una instancia longeva.
  if (intentos.size > 500) {
    for (const [clave, marcas] of intentos) {
      if (marcas.every((t) => ahora - t >= VENTANA_MS)) intentos.delete(clave);
    }
  }
  return false;
}

const FINGIDO = () =>
  NextResponse.json(
    { ok: true, enviado: true },
    { status: 202, headers: { "Cache-Control": "no-store" } },
  );

/** El producto viene de un textarea: un salto de línea no cabe en un asunto. */
const enLinea = (s: string) => s.replace(/\s+/g, " ");

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
  const b = (cuerpo ?? {}) as Record<string, unknown>;

  // 1 · Honeypot.
  const trampa = b[CAMPO_TRAMPA];
  if (typeof trampa === "string" && trampa.trim() !== "") {
    console.info("[lead:landing] descartado", { motivo: "honeypot" });
    return FINGIDO();
  }

  // 2 · Tiempo mínimo. Si no viene el dato, tampoco es nuestro formulario.
  const t = b.t;
  if (typeof t !== "number" || !Number.isFinite(t) || t < ESPERA_MINIMA_MS) {
    console.info("[lead:landing] descartado", { motivo: "demasiado-rapido", t: t ?? null });
    return FINGIDO();
  }

  const r = validarContacto(cuerpo);
  if (!r.ok) {
    return NextResponse.json({ ok: false, errores: r.errores }, { status: 422 });
  }
  const d = r.datos;

  // 3 · Límite por IP. Va después de validar: sólo cuentan los envíos válidos,
  // así quien se equivoca en un campo no gasta su cupo.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconocida";
  if (excedeLimite(ip, Date.now())) {
    console.info("[lead:landing] descartado", { motivo: "limite-por-ip" });
    return NextResponse.json(
      { ok: false, error: "Demasiados envíos seguidos. Escríbenos por WhatsApp." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  const correo = await enviarPorResend({
    asunto: `Landing «Importa sin límites» — ${enLinea(d.nombre)} · ${enLinea(d.producto).slice(0, 60)}`,
    html: cuerpoLandingHtml(d),
    texto: cuerpoLandingTexto(d),
    responderA: d.email,
  });

  // El correo se recorta en el log: es dato personal y esto queda en Vercel.
  const [usuario, dominio] = (d.email ?? "").split("@");
  console.info("[lead:landing]", {
    campana: d.utm.utm_campaign ?? null,
    anuncio: d.utm.utm_content ?? null,
    clicMeta: d.clicMeta,
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

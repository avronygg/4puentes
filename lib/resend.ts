/**
 * Envío de correo por la API HTTP de Resend.
 *
 * Lo usan los dos endpoints de leads (el cotizador completo y la landing de
 * campaña). Se ataca la API directo en vez de usar el SDK: es una sola
 * petición y no suma una dependencia al bundle del servidor.
 *
 * Nunca lanza: si faltan las variables o Resend falla devuelve
 * `{ enviado: false, motivo }` para que el endpoint registre el motivo y siga.
 * El visitante no debe ver un error porque el correo no salió.
 */

const RESEND = "https://api.resend.com/emails";

export type Correo = {
  asunto: string;
  html: string;
  texto: string;
  /** Si viene, responder el correo va directo al interesado. */
  responderA?: string;
};

export async function enviarPorResend(
  correo: Correo,
): Promise<{ enviado: boolean; motivo?: string }> {
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
        ...(correo.responderA ? { reply_to: correo.responderA } : {}),
        subject: correo.asunto,
        html: correo.html,
        text: correo.texto,
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

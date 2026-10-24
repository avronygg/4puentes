import type { FilaResumen } from "./cotizador";
import type { DatosLanding } from "./contacto-landing";
import {
  boton,
  escapar,
  LINEA,
  ROJO,
  rotulo,
  seccion,
  tabla,
  telefonoWhatsApp,
  TENUE,
  TIPO,
  TINTA,
} from "./correo-lead";

/**
 * Correo de una solicitud que llegó por una landing de campaña. Reutiliza las
 * piezas de la plantilla del cotizador (mismo aspecto en la bandeja) y suma un
 * bloque con la campaña de origen, que es lo que permite saber qué anuncio
 * trajo a quién.
 */

export const ORIGEN_LANDING = "Landing «Importa sin límites»";

function filas(d: DatosLanding): {
  contacto: FilaResumen[];
  solicitud: FilaResumen[];
  campana: FilaResumen[];
} {
  const contacto: FilaResumen[] = [
    { id: "nombre", etiqueta: "Nombre", valor: d.nombre },
    { id: "telefono", etiqueta: "WhatsApp / teléfono", valor: d.telefono },
  ];
  if (d.email) contacto.push({ id: "email", etiqueta: "Correo", valor: d.email });

  const campana: FilaResumen[] = [{ id: "origen", etiqueta: "Origen", valor: ORIGEN_LANDING }];
  const rotulos: Record<string, string> = {
    utm_source: "Fuente",
    utm_medium: "Medio",
    utm_campaign: "Campaña",
    utm_content: "Anuncio",
    utm_term: "Término",
  };
  for (const [k, etiqueta] of Object.entries(rotulos)) {
    if (d.utm[k]) campana.push({ id: k, etiqueta, valor: d.utm[k] });
  }
  if (d.clicMeta) campana.push({ id: "fbclid", etiqueta: "Clic desde Meta", valor: "Sí" });

  return {
    contacto,
    solicitud: [{ id: "producto", etiqueta: "Qué quiere traer", valor: d.producto }],
    campana,
  };
}

export function cuerpoLandingHtml(d: DatosLanding): string {
  const f = filas(d);
  const bajada = `${d.nombre} quiere traer ${d.producto}.`;
  const wa = telefonoWhatsApp(d.telefono);

  const acciones =
    (wa ? boton(`https://wa.me/${wa}`, "Escribir por WhatsApp", ROJO, "#ffffff", ROJO) : "") +
    (d.email
      ? boton(
          `mailto:${d.email}?subject=${encodeURIComponent("Tu cotización — Cuatro Puentes")}`,
          "Responder por correo",
          "#ffffff",
          TINTA,
          LINEA,
        )
      : "");

  const fecha = new Date().toLocaleString("es-CL", {
    timeZone: "America/Santiago",
    dateStyle: "long",
    timeStyle: "short",
  });

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#f5f5f4">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapar(bajada)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f5f4">
    <tr><td align="center" style="padding:28px 12px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${LINEA};border-radius:14px;overflow:hidden">
        <tr><td style="height:4px;line-height:4px;font-size:0;background:${ROJO}">&nbsp;</td></tr>
        <tr><td style="padding:30px 32px 24px">
          <p style="margin:0 0 18px;font-family:${TIPO};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${ROJO}">Cuatro Puentes</p>
          <h1 style="margin:0;font-family:${TIPO};font-size:24px;line-height:1.25;font-weight:700;letter-spacing:-.02em;color:${TINTA}">Nuevo contacto desde la landing</h1>
          <p style="margin:8px 0 0;font-family:${TIPO};font-size:15px;line-height:1.5;color:${TENUE}">${escapar(bajada)}</p>
          ${acciones ? `<div style="margin-top:22px">${acciones}</div>` : ""}
        </td></tr>
        ${seccion(rotulo("Contacto") + tabla(f.contacto))}
        ${seccion(rotulo("La solicitud") + tabla(f.solicitud))}
        ${seccion(rotulo("De qué anuncio viene") + tabla(f.campana))}
        <tr><td style="padding:20px 32px 26px;border-top:1px solid ${LINEA};background:#fafaf9">
          <p style="margin:0;font-family:${TIPO};font-size:12px;line-height:1.6;color:${TENUE}">
            Enviado desde la landing de campaña · ${escapar(fecha)}${
              d.email ? `<br>Al responder este correo le llega directo a ${escapar(d.email)}.` : ""
            }
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function cuerpoLandingTexto(d: DatosLanding): string {
  const f = filas(d);
  const bloque = (titulo: string, xs: FilaResumen[]) => [
    titulo.toUpperCase(),
    ...xs.map((x) => `  ${x.etiqueta}: ${x.valor}`),
    "",
  ];
  return [
    "NUEVO CONTACTO DESDE LA LANDING",
    "",
    ...bloque("Contacto", f.contacto),
    ...bloque("La solicitud", f.solicitud),
    ...bloque("De qué anuncio viene", f.campana),
  ].join("\n");
}

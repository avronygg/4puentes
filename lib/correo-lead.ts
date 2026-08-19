import { resumen, type FilaResumen, type Respuestas } from "./cotizador";

/**
 * La plantilla del correo que recibe el equipo comercial cuando alguien cotiza.
 *
 * Vive fuera de la ruta y sin importar nada de Next a propósito: así se puede
 * renderizar en un script para mirarla, que es la única forma sensata de
 * trabajar un correo. Probarlo enviándolo cada vez ensucia la bandeja real.
 */

/** Los campos que identifican a la persona; el resto es la solicitud. */
const CAMPOS_CONTACTO = new Set(["nombre", "email", "telefono", "empresa"]);

/**
 * Opciones que significan «todavía no sé». Sirven en la tabla, pero metidas en
 * una frase la rompen: "quiere traer maquinaria desde Todavía no lo sé".
 */
const SIN_RESPUESTA = new Set(["no-se", "prefiero-no-decir", "otro"]);

function escapar(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Deja el teléfono como lo quiere wa.me: sólo dígitos y con el 56 delante. */
function telefonoWhatsApp(bruto: string | undefined): string | null {
  if (!bruto) return null;
  let d = bruto.replace(/\D/g, "");
  if (d.startsWith("0")) d = d.slice(1);
  if (!d.startsWith("56")) d = `56${d}`;
  // Un móvil chileno queda en 56 + 9 + ocho dígitos.
  return d.length >= 11 && d.length <= 13 ? d : null;
}

/* ── piezas de la plantilla ──────────────────────────────────────────────
   Todo va con estilos en línea y maquetado con tablas. No es nostalgia: es lo
   único que Gmail y Outlook respetan igual. Nada de flex, nada de grid, nada
   de <style> en la cabecera, que Gmail descarta en varios contextos. */

const TIPO =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const TINTA = "#1a1615";
const TENUE = "#78716c";
const LINEA = "#e7e5e4";
/* Rojo de marca oscurecido. Sobre blanco el #FD190F queda en 3,95:1 y acá hay
   texto normal encima; este llega a 6,1:1. */
const ROJO = "#c4130b";

function rotulo(texto: string): string {
  return `<p style="margin:0 0 14px;font-family:${TIPO};font-size:11px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:${TENUE}">${escapar(texto)}</p>`;
}

/**
 * Tabla de dos columnas. La etiqueta va acotada al 38% y sin `nowrap`: con
 * nowrap una pregunta larga empujaba el valor a una columna angosta y lo
 * partía en cuatro líneas, que es lo que se veía mal en Gmail.
 */
function tabla(filas: FilaResumen[]): string {
  if (!filas.length) return "";
  const tr = filas
    .map(
      (f) => `<tr>
        <td width="38%" valign="top" style="padding:0 16px 12px 0;font-family:${TIPO};font-size:13px;line-height:1.5;color:${TENUE}">${escapar(f.etiqueta)}</td>
        <td valign="top" style="padding:0 0 12px;font-family:${TIPO};font-size:14px;line-height:1.5;font-weight:600;color:${TINTA}">${escapar(f.valor)}</td>
      </tr>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${tr}</table>`;
}

/** Botón a prueba de clientes de correo: una tabla, no un enlace con padding. */
function boton(
  href: string,
  texto: string,
  relleno: string,
  tinta: string,
  borde: string,
): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-block;margin:0 8px 8px 0">
    <tr><td style="border-radius:8px;background:${relleno};border:1px solid ${borde}">
      <a href="${href}" style="display:inline-block;padding:11px 20px;font-family:${TIPO};font-size:14px;font-weight:600;color:${tinta};text-decoration:none">${escapar(texto)}</a>
    </td></tr>
  </table>`;
}

function seccion(contenido: string): string {
  return `<tr><td style="padding:26px 32px;border-top:1px solid ${LINEA}">${contenido}</td></tr>`;
}

export function cuerpoHtml(datos: Respuestas): string {
  const filas = resumen(datos, true);
  const contacto = filas.filter((f) => CAMPOS_CONTACTO.has(f.id));
  const solicitud = filas.filter((f) => !CAMPOS_CONTACTO.has(f.id) && f.id !== "mensaje");
  const mensaje = filas.find((f) => f.id === "mensaje");

  // Una línea que se entienda sin leer la tabla: quién, qué y de dónde. Los
  // valores salen de `filas` y no de `datos` porque ahí ya están resueltos:
  // el origen crudo es `china` y lo que se lee tiene que ser «China».
  const quien = datos.nombre ?? "Alguien";
  const queTrae = filas.find((f) => f.id === "producto")?.valor;
  const deDonde = SIN_RESPUESTA.has(datos.origen ?? "")
    ? undefined
    : filas.find((f) => f.id === "origen")?.valor;
  const bajada = queTrae
    ? `${quien} quiere traer ${queTrae}${deDonde ? ` desde ${deDonde}` : ""}.`
    : deDonde
      ? `${quien} quiere importar desde ${deDonde}.`
      : `${quien} pidió una cotización.`;

  const wa = telefonoWhatsApp(datos.telefono);
  const acciones =
    (datos.email
      ? boton(
          `mailto:${datos.email}?subject=${encodeURIComponent("Tu cotización — Cuatro Puentes")}`,
          "Responder por correo",
          ROJO,
          "#ffffff",
          ROJO,
        )
      : "") +
    (wa ? boton(`https://wa.me/${wa}`, "Escribir por WhatsApp", "#ffffff", TINTA, LINEA) : "");

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
          <h1 style="margin:0;font-family:${TIPO};font-size:24px;line-height:1.25;font-weight:700;letter-spacing:-.02em;color:${TINTA}">Nueva solicitud de cotización</h1>
          <p style="margin:8px 0 0;font-family:${TIPO};font-size:15px;line-height:1.5;color:${TENUE}">${escapar(bajada)}</p>
          ${acciones ? `<div style="margin-top:22px">${acciones}</div>` : ""}
        </td></tr>

        ${contacto.length ? seccion(rotulo("Contacto") + tabla(contacto)) : ""}
        ${solicitud.length ? seccion(rotulo("La solicitud") + tabla(solicitud)) : ""}
        ${
          mensaje
            ? seccion(
                rotulo("Lo que nos dejó dicho") +
                  `<p style="margin:0;padding:14px 18px;background:#fafaf9;border-left:3px solid ${ROJO};border-radius:0 8px 8px 0;font-family:${TIPO};font-size:14px;line-height:1.6;color:${TINTA}">${escapar(mensaje.valor)}</p>`,
              )
            : ""
        }

        <tr><td style="padding:20px 32px 26px;border-top:1px solid ${LINEA};background:#fafaf9">
          <p style="margin:0;font-family:${TIPO};font-size:12px;line-height:1.6;color:${TENUE}">
            Enviado desde el formulario de cotización del sitio · ${escapar(fecha)}<br>
            Al responder este correo le llega directo a ${escapar(datos.email ?? "quien cotizó")}.
          </p>
        </td></tr>

      </table>

    </td></tr>
  </table>
</body></html>`;
}

/** Versión en texto plano, en el mismo orden que la visual. */
export function cuerpoTexto(datos: Respuestas): string {
  const filas = resumen(datos, true);
  const bloque = (titulo: string, xs: FilaResumen[]) =>
    xs.length ? [titulo.toUpperCase(), ...xs.map((f) => `  ${f.etiqueta}: ${f.valor}`), ""] : [];

  return [
    "NUEVA SOLICITUD DE COTIZACIÓN",
    "",
    ...bloque(
      "Contacto",
      filas.filter((f) => CAMPOS_CONTACTO.has(f.id)),
    ),
    ...bloque(
      "La solicitud",
      filas.filter((f) => !CAMPOS_CONTACTO.has(f.id) && f.id !== "mensaje"),
    ),
    ...bloque(
      "Lo que nos dejó dicho",
      filas.filter((f) => f.id === "mensaje"),
    ),
  ].join("\n");
}

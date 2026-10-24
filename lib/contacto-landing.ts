/**
 * Formulario corto de las landings de campaña.
 *
 * Igual que el cotizador, la misma validación corre en el navegador y en el
 * servidor: el servidor no confía en el cliente, y el cliente no espera un
 * viaje de red para decirle a alguien que le falta el teléfono.
 *
 * Son cuatro datos a propósito. Cada campo extra en un formulario de campaña
 * cuesta conversiones; lo que falte se pregunta cuando el comercial responde.
 */

/**
 * Trampa para bots (honeypot). Es un campo que un humano nunca ve ni completa
 * —está fuera de pantalla— pero que un bot que rellena todo lo que encuentra
 * sí llena. Si llega con algo, el servidor finge éxito y descarta el lead.
 * El nombre se parece a algo que vale la pena rellenar.
 */
export const CAMPO_TRAMPA = "sitio_web";

/**
 * Tiempo mínimo entre que se dibuja el formulario y se envía. Una persona
 * tarda más que esto en leer y teclear cuatro datos; un script que postea de
 * inmediato, no. Cierra el paso a los bots que ignoran la trampa.
 */
export const ESPERA_MINIMA_MS = 2500;

/** Parámetros de campaña que viajan en el enlace del anuncio. */
export const CLAVES_UTM = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type EntradaContacto = {
  nombre?: string;
  telefono?: string;
  email?: string;
  producto?: string;
};

export type DatosLanding = {
  nombre: string;
  telefono: string;
  email?: string;
  producto: string;
  utm: Record<string, string>;
  /** El clic vino de un anuncio de Meta (el enlace trae `fbclid`). */
  clicMeta: boolean;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITES = { nombre: 120, telefono: 40, email: 160, producto: 300 } as const;

function recortar(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Errores por campo. Devuelve {} si está todo bien. */
export function validarCampos(r: EntradaContacto): Record<string, string> {
  const e: Record<string, string> = {};
  const nombre = (r.nombre ?? "").trim();
  const telefono = (r.telefono ?? "").trim();
  const email = (r.email ?? "").trim();
  const producto = (r.producto ?? "").trim();

  if (nombre.length < 2) e.nombre = "Escribe tu nombre.";

  const digitos = telefono.replace(/\D/g, "");
  if (!telefono) e.telefono = "Déjanos un WhatsApp o teléfono para responderte.";
  else if (digitos.length < 8 || digitos.length > 15)
    e.telefono = "Revisa el número: incluye el 9 del celular, por ejemplo +56 9 1234 5678.";

  // El correo es opcional: el canal real es WhatsApp. Pero si lo escriben,
  // tiene que servir, porque el comercial responde a esa dirección.
  if (email && !EMAIL.test(email)) e.email = "Revisa el correo: debe verse como nombre@empresa.cl.";

  if (producto.length < 2) e.producto = "Cuéntanos qué quieres traer, aunque sea en pocas palabras.";

  return e;
}

/** Valida el envío completo. Lo usa el servidor. */
export function validarContacto(
  entrada: unknown,
): { ok: true; datos: DatosLanding } | { ok: false; errores: Record<string, string> } {
  const b = (entrada ?? {}) as Record<string, unknown>;
  const crudo: EntradaContacto = {
    nombre: recortar(b.nombre, LIMITES.nombre),
    telefono: recortar(b.telefono, LIMITES.telefono),
    email: recortar(b.email, LIMITES.email),
    producto: recortar(b.producto, LIMITES.producto),
  };

  const errores = validarCampos(crudo);
  if (Object.keys(errores).length) return { ok: false, errores };

  // Sólo se conservan las claves de campaña conocidas: nada de basura extra.
  const bruto = (b.utm ?? {}) as Record<string, unknown>;
  const utm: Record<string, string> = {};
  for (const k of CLAVES_UTM) {
    const v = recortar(bruto[k], 100);
    if (v) utm[k] = v;
  }

  return {
    ok: true,
    datos: {
      nombre: crudo.nombre!,
      telefono: crudo.telefono!,
      email: crudo.email || undefined,
      producto: crudo.producto!,
      utm,
      clicMeta: b.clicMeta === true,
    },
  };
}

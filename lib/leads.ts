/**
 * Contrato del lead. Lo comparten el formulario y POST /api/v1/leads, así que
 * la validación es la misma en cliente y servidor.
 */

import { origenes, tiposCarga } from "./site";

export type Lead = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  origen: string;
  carga: string;
  mensaje: string;
};

export type ResultadoValidacion =
  | { ok: true; lead: Lead }
  | { ok: false; errores: Partial<Record<keyof Lead, string>> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = 2000;

function texto(v: unknown, limite = 200): string {
  return typeof v === "string" ? v.trim().slice(0, limite) : "";
}

export function validarLead(entrada: unknown): ResultadoValidacion {
  const d = (entrada ?? {}) as Record<string, unknown>;
  const errores: Partial<Record<keyof Lead, string>> = {};

  const nombre = texto(d.nombre, 120);
  const email = texto(d.email, 160);
  const origen = texto(d.origen, 60);
  const carga = texto(d.carga, 60);

  if (nombre.length < 2) errores.nombre = "Escribe tu nombre.";
  if (!EMAIL.test(email)) errores.email = "Revisa el correo: falta el @ o el dominio.";
  if (origen && !origenes.includes(origen as (typeof origenes)[number]))
    errores.origen = "Elige un origen de la lista.";
  if (carga && !tiposCarga.includes(carga as (typeof tiposCarga)[number]))
    errores.carga = "Elige un tipo de carga de la lista.";

  if (Object.keys(errores).length > 0) return { ok: false, errores };

  return {
    ok: true,
    lead: {
      nombre,
      empresa: texto(d.empresa, 160),
      email,
      telefono: texto(d.telefono, 40),
      origen: origen || origenes[0],
      carga: carga || tiposCarga[0],
      mensaje: texto(d.mensaje, MAX),
    },
  };
}

/** Mensaje de WhatsApp armado a partir del lead. */
export function mensajeWhatsApp(l: Lead): string {
  return [
    "Hola 4 Puentes, quiero cotizar una importación.",
    "",
    `Nombre: ${l.nombre}`,
    `Empresa: ${l.empresa || "—"}`,
    `Email: ${l.email}`,
    `Teléfono: ${l.telefono || "—"}`,
    `Origen: ${l.origen}`,
    `Tipo de carga: ${l.carga}`,
    `Detalle: ${l.mensaje || "—"}`,
  ].join("\n");
}

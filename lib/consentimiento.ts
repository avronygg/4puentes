"use client";

import { useSyncExternalStore } from "react";

/**
 * Consentimiento de cookies de medición y publicidad (GA4 y píxel de Meta).
 *
 * La decisión vive en localStorage, no en una cookie: así el aviso no necesita
 * una cookie para recordar que no queremos cookies. Si el navegador no deja
 * escribir (modo privado estricto), se guarda en memoria para que el aviso al
 * menos no reaparezca en cada clic dentro de la misma visita.
 *
 * Estados:
 *  - "cargando"    → el servidor, y el primer pintado del cliente. No se muestra
 *                    nada, para que quien ya decidió no vea parpadear el aviso.
 *  - "sin-decidir" → hay que mostrar el aviso. No se carga ningún script.
 *  - "aceptadas"   → se cargan GA4 y el píxel.
 *  - "rechazadas"  → no se carga nada.
 */
export type Consentimiento = "cargando" | "sin-decidir" | "aceptadas" | "rechazadas";

const CLAVE = "cp-cookies";
const EVENTO = "cp-cookies-cambio";

let memoria: "aceptadas" | "rechazadas" | null = null;

function leer(): Consentimiento {
  try {
    const v = window.localStorage.getItem(CLAVE);
    if (v === "aceptadas" || v === "rechazadas") return v;
    if (v === null && memoria) return memoria;
  } catch {
    if (memoria) return memoria;
  }
  return "sin-decidir";
}

function suscribir(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENTO, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENTO, cb);
  };
}

export function useConsentimiento(): Consentimiento {
  return useSyncExternalStore(suscribir, leer, () => "cargando");
}

/** Borra las cookies que dejan GA4 (`_ga`, `_ga_*`, `_gid`) y Meta (`_fbp`, `_fbc`). */
function borrarCookiesDeMedicion() {
  const dominios = [location.hostname, `.${location.hostname.replace(/^www\./, "")}`];
  for (const par of document.cookie.split(";")) {
    const nombre = par.split("=")[0]?.trim();
    if (!nombre || !/^(_ga|_gid|_gat|_fbp|_fbc)/.test(nombre)) continue;
    document.cookie = `${nombre}=; Max-Age=0; path=/`;
    for (const d of dominios) document.cookie = `${nombre}=; Max-Age=0; path=/; domain=${d}`;
  }
}

export function guardarConsentimiento(valor: "aceptadas" | "rechazadas") {
  const antes = leer();
  memoria = valor;
  try {
    window.localStorage.setItem(CLAVE, valor);
  } catch {
    // Sin almacenamiento: queda en memoria.
  }
  if (valor === "rechazadas") borrarCookiesDeMedicion();
  window.dispatchEvent(new Event(EVENTO));
  // Los scripts ya cargados no se pueden "descargar": si alguien se arrepiente
  // de haber aceptado, se recarga para que la página parta limpia.
  if (valor === "rechazadas" && antes === "aceptadas") window.location.reload();
}

/** Vuelve a mostrar el aviso (enlace "Preferencias de cookies" de los pies). */
export function reabrirConsentimiento() {
  memoria = null;
  try {
    window.localStorage.removeItem(CLAVE);
  } catch {
    // Nada que borrar.
  }
  window.dispatchEvent(new Event(EVENTO));
}

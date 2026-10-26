"use client";

import { reabrirConsentimiento } from "@/lib/consentimiento";

/** Enlace de los pies que vuelve a abrir el aviso para cambiar la decisión. */
export default function BotonCookies({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={reabrirConsentimiento}>
      Preferencias de cookies
    </button>
  );
}

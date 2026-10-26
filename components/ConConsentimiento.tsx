"use client";

import { useConsentimiento } from "@/lib/consentimiento";

/**
 * Renderiza a sus hijos sólo si la persona aceptó las cookies de medición.
 * Se usa para envolver los <Script> de GA4 y del píxel de Meta: mientras no
 * haya un "Aceptar", ninguno de los dos llega a pedirse a Google ni a Meta.
 */
export default function ConConsentimiento({ children }: { children: React.ReactNode }) {
  return useConsentimiento() === "aceptadas" ? <>{children}</> : null;
}

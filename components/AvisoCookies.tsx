"use client";

import Link from "next/link";
import { guardarConsentimiento, useConsentimiento } from "@/lib/consentimiento";

/**
 * Aviso de cookies. Aparece sólo si la persona no ha decidido. "Aceptar" y
 * "Rechazar" pesan lo mismo a propósito: rechazar no debe costar más clics ni
 * verse como la opción escondida.
 *
 * No bloquea la página: es un aviso, no un modal. Mientras no se acepte, GA4 y
 * el píxel de Meta no se cargan (ver ConConsentimiento).
 */
export default function AvisoCookies() {
  const estado = useConsentimiento();
  if (estado !== "sin-decidir") return null;

  return (
    <section className="cookies" role="region" aria-label="Aviso de cookies">
      <h2 className="cookies__titulo">Tu privacidad</h2>
      <p className="cookies__texto">
        Usamos cookies de medición y publicidad (Google Analytics y Meta) para entender qué
        anuncios y páginas funcionan. Solo las activamos si las aceptas.{" "}
        <Link href="/privacidad#cookies" className="cookies__enlace">
          Más información
        </Link>
      </p>
      <div className="cookies__acciones">
        <button type="button" className="cookies__btn" onClick={() => guardarConsentimiento("rechazadas")}>
          Rechazar
        </button>
        <button
          type="button"
          className="cookies__btn cookies__btn--si"
          onClick={() => guardarConsentimiento("aceptadas")}
        >
          Aceptar
        </button>
      </div>
    </section>
  );
}

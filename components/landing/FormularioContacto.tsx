"use client";

import { useEffect, useRef, useState } from "react";
import {
  CAMPO_TRAMPA,
  CLAVES_UTM,
  LIMITES,
  validarCampos,
  type EntradaContacto,
} from "@/lib/contacto-landing";
import { whatsappUrl } from "@/lib/site";
import { Flecha, WhatsApp } from "@/components/Icons";

/**
 * Formulario corto de la landing: cuatro datos, tres obligatorios.
 *
 * El visitante nunca debería quedarse sin camino: si el envío falla, la
 * pantalla de error le ofrece WhatsApp con el mensaje ya escrito, igual que la
 * de éxito. Lo único que se trata como error de validación es el 422.
 */

type Estado = "editando" | "enviando" | "listo" | "error";
type Campos = Required<EntradaContacto>;

const VACIO: Campos = { nombre: "", telefono: "", email: "", producto: "" };

/** Los eventos de conversión se disparan sólo si el script correspondiente está
 *  cargado: GA4 sólo en producción, y el Pixel de Meta cuando se instale. */
function registrarConversion() {
  const w = window as unknown as {
    gtag?: (...a: unknown[]) => void;
    fbq?: (...a: unknown[]) => void;
  };
  try {
    w.gtag?.("event", "generate_lead", { lead_source: "importa-sin-limites" });
    w.fbq?.("track", "Lead");
  } catch {
    // Medir nunca debe romper el formulario.
  }
}

function mensajeWhatsApp(c: Campos): string {
  return [
    "Hola 4 Puentes, vi su video y quiero cotizar una importación.",
    c.nombre && `Soy ${c.nombre}.`,
    c.producto && `Quiero traer: ${c.producto}.`,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function FormularioContacto() {
  const [c, setC] = useState<Campos>(VACIO);
  const [trampa, setTrampa] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<Estado>("editando");

  // Cuándo se dibujó el formulario: el servidor descarta envíos instantáneos.
  const desde = useRef<number>(0);
  // Parámetros del enlace del anuncio. Se leen de `window` en un efecto: la
  // página se prerenderiza estática y el servidor no conoce la query.
  const campana = useRef<{ utm: Record<string, string>; clicMeta: boolean }>({
    utm: {},
    clicMeta: false,
  });
  const remate = useRef<HTMLDivElement>(null);

  useEffect(() => {
    desde.current = Date.now();
    const q = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const k of CLAVES_UTM) {
      const v = q.get(k);
      if (v) utm[k] = v.slice(0, 100);
    }
    campana.current = { utm, clicMeta: q.has("fbclid") };
  }, []);

  const cambiar = (k: keyof Campos) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setC((a) => ({ ...a, [k]: e.target.value }));
    if (errores[k]) {
      setErrores((a) => {
        const copia = { ...a };
        delete copia[k];
        return copia;
      });
    }
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (estado === "enviando") return;

    const locales = validarCampos(c);
    if (Object.keys(locales).length) {
      setErrores(locales);
      // El foco va al primer campo con error: en móvil la vista acompaña.
      const primero = (["nombre", "telefono", "email", "producto"] as const).find((k) => locales[k]);
      if (primero) document.getElementById(`lp-${primero}`)?.focus();
      return;
    }

    setEstado("enviando");
    try {
      const res = await fetch("/api/v1/leads/landing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...c,
          [CAMPO_TRAMPA]: trampa,
          t: Date.now() - desde.current,
          utm: campana.current.utm,
          clicMeta: campana.current.clicMeta,
        }),
      });

      if (res.status === 422) {
        const cuerpo = await res.json().catch(() => ({}));
        setErrores((cuerpo?.errores as Record<string, string>) ?? {});
        setEstado("editando");
        return;
      }
      if (!res.ok) {
        setEstado("error");
        requestAnimationFrame(() => remate.current?.focus());
        return;
      }
    } catch {
      setEstado("error");
      requestAnimationFrame(() => remate.current?.focus());
      return;
    }

    registrarConversion();
    setEstado("listo");
    requestAnimationFrame(() => remate.current?.focus());
  };

  if (estado === "listo" || estado === "error") {
    const ok = estado === "listo";
    return (
      <div className="lp-form" id="contacto">
        <div ref={remate} tabIndex={-1} className="lp-remate" role="status" aria-live="polite">
          <span className={`lp-remate__marca ${ok ? "" : "lp-remate__marca--aviso"}`} aria-hidden>
            {ok ? "✓" : "!"}
          </span>
          <h2>{ok ? "¡Recibido!" : "No pudimos enviarlo"}</h2>
          <p>
            {ok
              ? "Te escribimos dentro de un día hábil. Si es urgente, no esperes: cuéntanos por WhatsApp y partimos de inmediato."
              : "Tu solicitud no salió, pero no pierdes nada: escríbenos por WhatsApp con el mensaje ya armado y te respondemos."}
          </p>
          <a
            href={whatsappUrl(mensajeWhatsApp(c))}
            target="_blank"
            rel="noopener noreferrer"
            className="lp-enviar"
          >
            <WhatsApp size={20} />
            Continuar por WhatsApp
          </a>
          {!ok && (
            <button type="button" className="lp-reintentar" onClick={() => setEstado("editando")}>
              Volver a intentar
            </button>
          )}
        </div>
      </div>
    );
  }

  const enviando = estado === "enviando";

  return (
    <form className="lp-form" id="contacto" onSubmit={enviar} noValidate>
      <h2>Cotiza tu próxima importación</h2>
      <p className="lp-form__sub">
        Cuatro datos y te respondemos dentro de un día hábil. Sin compromiso.
      </p>

      <div className="lp-campos">
        <Campo id="nombre" etiqueta="Nombre" error={errores.nombre}>
          <input
            id="lp-nombre"
            className="lp-campo"
            type="text"
            name="nombre"
            autoComplete="name"
            maxLength={LIMITES.nombre}
            placeholder="Tu nombre"
            value={c.nombre}
            onChange={cambiar("nombre")}
            aria-invalid={!!errores.nombre}
            aria-describedby={errores.nombre ? "lp-nombre-error" : undefined}
          />
        </Campo>

        <Campo id="telefono" etiqueta="WhatsApp o teléfono" error={errores.telefono}>
          <input
            id="lp-telefono"
            className="lp-campo"
            type="tel"
            name="telefono"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITES.telefono}
            placeholder="+56 9 1234 5678"
            value={c.telefono}
            onChange={cambiar("telefono")}
            aria-invalid={!!errores.telefono}
            aria-describedby={errores.telefono ? "lp-telefono-error" : undefined}
          />
        </Campo>

        <Campo id="email" etiqueta="Correo" opcional error={errores.email}>
          <input
            id="lp-email"
            className="lp-campo"
            type="email"
            name="email"
            autoComplete="email"
            maxLength={LIMITES.email}
            placeholder="tu@empresa.cl"
            value={c.email}
            onChange={cambiar("email")}
            aria-invalid={!!errores.email}
            aria-describedby={errores.email ? "lp-email-error" : undefined}
          />
        </Campo>

        <Campo id="producto" etiqueta="¿Qué quieres traer?" error={errores.producto}>
          <textarea
            id="lp-producto"
            className="lp-campo lp-campo--area"
            name="producto"
            rows={2}
            maxLength={LIMITES.producto}
            placeholder="Repuestos, maquinaria, insumos… y desde dónde, si lo sabes"
            value={c.producto}
            onChange={cambiar("producto")}
            aria-invalid={!!errores.producto}
            aria-describedby={errores.producto ? "lp-producto-error" : undefined}
          />
        </Campo>

        {/* Trampa para bots: fuera de pantalla, no `display:none` —algunos bots
            saltan lo oculto—, sin tabulación y sin autocompletado. Un humano no
            la ve. Si llega con algo, el servidor descarta el lead. */}
        <div className="lp-trampa" aria-hidden="true">
          <label htmlFor="lp-trampa">No completes este campo</label>
          <input
            id="lp-trampa"
            type="text"
            name={CAMPO_TRAMPA}
            tabIndex={-1}
            autoComplete="off"
            value={trampa}
            onChange={(e) => setTrampa(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="lp-enviar" disabled={enviando}>
        {enviando ? "Enviando…" : "Quiero mi cotización"}
        {!enviando && <Flecha />}
      </button>

      <p className="lp-nota">
        Usamos tus datos sólo para responder esta cotización.
      </p>
    </form>
  );
}

function Campo({
  id,
  etiqueta,
  opcional,
  error,
  children,
}: {
  id: string;
  etiqueta: string;
  opcional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="lp-etiqueta" htmlFor={`lp-${id}`}>
        {etiqueta}
        {opcional && <span className="lp-opcional">Opcional</span>}
      </label>
      {children}
      {error && (
        <p id={`lp-${id}-error`} role="alert" className="lp-error">
          {error}
        </p>
      )}
    </div>
  );
}

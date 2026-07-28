"use client";

import { useState } from "react";
import { contacto, origenes, tiposCarga, whatsappUrl } from "@/lib/site";
import { mensajeWhatsApp, validarLead, type Lead } from "@/lib/leads";
import { Check, Flecha, Pin, Sobre, Telefono } from "./Icons";

type Errores = Partial<Record<keyof Lead, string>>;

const campo =
  "w-full rounded-[9px] border-[1.5px] border-line bg-bg px-[13px] py-3 text-[0.94rem] text-fg transition-[border-color,box-shadow] focus:border-terra-400 focus:shadow-[0_0_0_3.5px_color-mix(in_srgb,var(--color-terra-400)_15%,transparent)] focus:outline-none";
const etiqueta = "text-[0.79rem] font-medium text-fg-muted";

export default function Cotizar() {
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const bruto = Object.fromEntries(fd.entries());

    const r = validarLead(bruto);
    if (!r.ok) {
      setErrores(r.errores);
      const primero = Object.keys(r.errores)[0];
      document.getElementById(`f-${primero}`)?.focus();
      return;
    }
    setErrores({});
    setEnviando(true);

    // El registro en base de datos queda pendiente (ver PENDIENTES.md): hoy el
    // endpoint acepta y registra en log. El WhatsApp se abre igual, así que el
    // lead nunca se pierde aunque la API falle.
    try {
      await fetch("/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(r.lead),
      });
    } catch {
      /* el canal de WhatsApp es el respaldo */
    }

    setEnviando(false);
    setOk(
      `Listo, ${r.lead.nombre.split(" ")[0]}. Abrimos WhatsApp con tu solicitud ` +
        `lista para enviar.`,
    );
    window.open(whatsappUrl(mensajeWhatsApp(r.lead)), "_blank", "noopener");
  }

  return (
    <section className="section" id="cotizar">
      <div className="wrap grid grid-cols-2 items-center gap-s9 max-[960px]:grid-cols-1 max-[960px]:gap-s7">
        <div>
          <h2>Cuéntanos qué necesitas traer</h2>
          <p className="lede">
            Te respondemos con un costo total puesto en tu bodega. Si prefieres
            hablarlo directamente, escríbenos por WhatsApp.
          </p>
          <ul className="mt-s7 grid list-none gap-s4 p-0">
            <li className="flex items-center gap-s4 text-[0.98rem] font-medium">
              <Telefono className="shrink-0 text-terra-500" />
              <a
                href={contacto.telefonoHref}
                className="tbd no-underline"
                title="Número por confirmar con el cliente"
              >
                {contacto.telefono}
              </a>
            </li>
            <li className="flex items-center gap-s4 text-[0.98rem] font-medium">
              <Sobre className="shrink-0 text-terra-500" />
              <a
                href={`mailto:${contacto.email}`}
                className="tbd no-underline"
                title="Correo por confirmar con el cliente"
              >
                {contacto.email}
              </a>
            </li>
            <li className="flex items-center gap-s4 text-[0.98rem] font-medium">
              <Pin className="shrink-0 text-terra-500" />
              <span className="tbd" title="Dirección por confirmar con el cliente">
                {contacto.direccion}
              </span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-card border border-line bg-surface px-s6 py-s7 shadow-[0_2px_4px_rgba(26,22,21,.04),0_18px_44px_-24px_rgba(26,22,21,.22)]"
        >
          <div className="grid grid-cols-2 gap-s5 max-[560px]:grid-cols-1">
            <Campo id="nombre" label="Nombre" placeholder="Tu nombre" error={errores.nombre} required />
            <Campo id="empresa" label="Empresa" placeholder="Nombre de tu empresa" autoComplete="organization" />
            <Campo id="email" label="Email" type="email" placeholder="tu@empresa.cl" error={errores.email} required />
            <Campo id="telefono" label="Teléfono" type="tel" placeholder="+56 9 ..." autoComplete="tel" />

            <div className="col-span-full flex flex-col gap-s2">
              <label htmlFor="f-origen" className={etiqueta}>Origen</label>
              <select id="f-origen" name="origen" className={`${campo} pr-10`} defaultValue={origenes[0]}>
                {origenes.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div className="col-span-full flex flex-col gap-s2">
              <label htmlFor="f-carga" className={etiqueta}>Tipo de carga</label>
              <select id="f-carga" name="carga" className={`${campo} pr-10`} defaultValue={tiposCarga[0]}>
                {tiposCarga.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="col-span-full flex flex-col gap-s2">
              <label htmlFor="f-mensaje" className={etiqueta}>¿Qué necesitas importar?</label>
              <textarea
                id="f-mensaje"
                name="mensaje"
                rows={3}
                placeholder="Producto, cantidades aproximadas y para cuándo lo necesitas."
                className={`${campo} min-h-[88px] resize-y leading-[1.55]`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="mt-s6 inline-flex w-full cursor-pointer items-center justify-center gap-s3 rounded-[10px] border-0 bg-accent-btn px-7 py-[15px] font-sans text-[0.97rem] font-semibold text-white transition-[background,transform] hover:-translate-y-px hover:bg-accent-btn-hover disabled:cursor-wait disabled:opacity-70"
          >
            {enviando ? "Enviando…" : "Enviar y continuar por WhatsApp"}
            {!enviando && <Flecha />}
          </button>

          <p className="mt-s4 mb-0 text-center text-[0.78rem] leading-[1.55] text-fg-muted">
            Te respondemos dentro de un día hábil. Tus datos se usan solo para
            preparar tu cotización.
          </p>

          {ok && (
            <p
              role="status"
              className="mt-s5 mb-0 flex items-start gap-s3 rounded-[10px] border border-terra-400/30 bg-accent-wash p-s4 text-[0.88rem] leading-[1.55] text-fg"
            >
              <Check size={17} className="mt-[3px] shrink-0 text-terra-600" />
              <span>{ok}</span>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Campo({
  id,
  label,
  error,
  ...rest
}: {
  id: string;
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-s2">
      <label htmlFor={`f-${id}`} className={etiqueta}>
        {label}
      </label>
      <input
        id={`f-${id}`}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `e-${id}` : undefined}
        className={`${campo} ${error ? "border-terra-500" : ""}`}
        {...rest}
      />
      {error && (
        <span id={`e-${id}`} className="text-[0.78rem] text-terra-600">
          {error}
        </span>
      )}
    </div>
  );
}

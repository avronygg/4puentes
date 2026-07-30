"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  PERFILES,
  idOtro,
  mensajeWhatsApp,
  pasosVisibles,
  resumen,
  validarPaso,
  type Campo,
  type NombreIcono,
  type Respuestas,
} from "@/lib/cotizador";
import { contacto } from "@/lib/site";
import EscenaCotizador from "./EscenaCotizador";
import {
  AvionCarga,
  Barco,
  Brujula,
  Cajas,
  Calendario,
  Check,
  Contenedor,
  Engranaje,
  Etiqueta,
  Flecha,
  Globo,
  Interrogacion,
  Pin,
  Rayo,
  Reloj,
  Repetir,
  Tendencia,
  WhatsApp,
} from "./Icons";

/** Traduce el nombre que viene del esquema al SVG correspondiente. */
const ICONOS: Record<NombreIcono, (p: { size?: number; className?: string }) => React.ReactElement> = {
  tendencia: Tendencia,
  brujula: Brujula,
  etiqueta: Etiqueta,
  engranaje: Engranaje,
  repetir: Repetir,
  calendario: Calendario,
  reloj: Reloj,
  rayo: Rayo,
  interrogacion: Interrogacion,
  contenedor: Contenedor,
  cajas: Cajas,
  avion: AvionCarga,
  barco: Barco,
  pin: Pin,
  globo: Globo,
  check: Check,
};

type Estado = "editando" | "enviando" | "listo";

export default function Cotizar() {
  const [r, setR] = useState<Respuestas>({});
  const [indice, setIndice] = useState(0);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<Estado>("editando");
  const encabezado = useRef<HTMLDivElement>(null);
  const remate = useRef<HTMLHeadingElement>(null);

  // Los pasos dependen de las respuestas: elegir un perfil cambia el recorrido.
  const pasos = useMemo(() => pasosVisibles(r), [r]);
  const paso = pasos[Math.min(indice, pasos.length - 1)];
  const ultimo = indice >= pasos.length - 1;
  const avance = Math.round(((indice + 1) / pasos.length) * 100);

  // Las tarjetas de la sección Servicios enlazan con ?perfil=… : quien llega
  // desde ahí ya respondió la primera pregunta al elegir la tarjeta, así que se
  // marca sola y el paso queda listo para continuar.
  //
  // Va en un efecto y no en el estado inicial a propósito: la página se
  // prerenderiza estática, el servidor no conoce la query y arrancar con el
  // perfil puesto daría discrepancia de hidratación. Se lee de `window` en vez
  // de useSearchParams para no tener que envolver la sección en un Suspense.
  useEffect(() => {
    const pedido = new URLSearchParams(window.location.search).get("perfil");
    if (!pedido || !PERFILES.some((p) => p.valor === pedido)) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- la query sólo existe en el navegador; leerla antes daría discrepancia de hidratación
    setR({ perfil: pedido });
  }, []);

  const set = (id: string, valor: string) => {
    setR((prev) => ({ ...prev, [id]: valor }));
    setErrores((prev) => {
      if (!prev[id]) return prev;
      const copia = { ...prev };
      delete copia[id];
      return copia;
    });
  };

  // Al cambiar de paso el foco queda huérfano: sin esto el lector de pantalla
  // sigue leyendo donde estaba y en móvil la vista no acompaña el salto.
  const irA = (n: number) => {
    setIndice(n);
    requestAnimationFrame(() => encabezado.current?.focus());
  };

  const enviar = async () => {
    setEstado("enviando");
    try {
      const res = await fetch("/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(r),
      });
      if (res.status === 422) {
        const cuerpo = await res.json();
        const e: Record<string, string> = cuerpo?.errores ?? {};
        setErrores(e);
        setEstado("editando");
        // El servidor puede rechazar un dato de un paso anterior: hay que volver.
        const fallo = pasos.findIndex((p) =>
          p.campos.some((c) => e[c.id] || e[idOtro(c.id)]),
        );
        if (fallo >= 0) irA(fallo);
        return;
      }
    } catch {
      // El canal real es WhatsApp; un fallo de red no debe bloquear al visitante.
    }
    setEstado("listo");
    requestAnimationFrame(() => remate.current?.focus());
  };

  const siguiente = () => {
    const e = validarPaso(paso, r);
    if (Object.keys(e).length) {
      setErrores(e);
      return;
    }
    if (ultimo) void enviar();
    else irA(indice + 1);
  };

  if (estado === "listo") {
    return (
      <section className="section" id="cotizar">
        <div className="wrap">
          <div className="mx-auto max-w-[620px] rounded-card border border-line bg-surface px-s6 py-s8 text-center">
            <span className="mx-auto mb-s5 grid h-14 w-14 place-items-center rounded-full bg-accent-wash text-terra-600">
              <Check size={26} />
            </span>
            <h2 ref={remate} tabIndex={-1} className="text-[1.7rem] outline-none">
              Recibimos tu solicitud
            </h2>
            <p className="lede mx-auto">
              Te respondemos con la cotización dentro de un día hábil. Si lo
              necesitas antes, escríbenos directo por WhatsApp.
            </p>
            <a
              href={`https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(mensajeWhatsApp(r))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-s6 inline-flex items-center gap-s3 rounded-[10px] bg-[#25D366] px-6 py-[14px] font-semibold text-white no-underline"
            >
              <WhatsApp size={20} />
              Continuar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    );
  }

  const yaRespondido = resumen(r).filter(
    (f) => !paso.campos.some((c) => c.etiqueta === f.etiqueta),
  );

  return (
    <section className="section" id="cotizar">
      <div className="wrap">
        <div className="section-head">
          <h2>Cuéntanos qué necesitas traer</h2>
          <p className="lede">
            Son unas pocas preguntas y cambian según tu caso. Al final te
            entregamos un costo total puesto en tu bodega.
          </p>
        </div>

        {/* 20% de acompañamiento y 80% de formulario. En vertical el panel pasa
            arriba y se encoge: ahí el ancho lo necesita el formulario. */}
        <div className="cotizador-doble">
          <aside className="cotizador-panel">
            <EscenaCotizador
              paso={paso.id}
              indice={indice}
              total={pasos.length}
              marcas={pasos.map((p) => ({ id: p.id, titulo: p.titulo }))}
            />
          </aside>

          <div className="cotizador">
            <div
              className="cotizador__barra"
              role="progressbar"
              aria-valuenow={indice + 1}
              aria-valuemin={1}
              aria-valuemax={pasos.length}
              aria-label="Avance del formulario"
            >
              <span style={{ width: `${avance}%` }} />
            </div>
            <p className="cotizador__contador">
              Paso {indice + 1} de {pasos.length}
            </p>

            <div
              ref={encabezado}
              tabIndex={-1}
              role="group"
              aria-labelledby={`paso-${paso.id}`}
              className="outline-none"
            >
              <h3 id={`paso-${paso.id}`} className="cotizador__titulo">
                {paso.titulo}
              </h3>
              {paso.bajada && <p className="cotizador__bajada">{paso.bajada}</p>}

              <div className="mt-s6 grid gap-s6">
                {paso.campos.map((campo) => (
                  <CampoFormulario
                    key={campo.id}
                    campo={campo}
                    valor={r[campo.id] ?? ""}
                    valorOtro={r[idOtro(campo.id)] ?? ""}
                    error={errores[campo.id]}
                    errorOtro={errores[idOtro(campo.id)]}
                    onChange={(v) => set(campo.id, v)}
                    onChangeOtro={(v) => set(idOtro(campo.id), v)}
                  />
                ))}
              </div>
            </div>

            {ultimo && yaRespondido.length > 0 && (
              <div className="cotizador__resumen">
                <p className="m-0 mb-s4 font-mono text-[0.66rem] tracking-[0.12em] text-fg-muted uppercase">
                  Lo que nos vas a enviar
                </p>
                <dl className="m-0 grid gap-s2">
                  {yaRespondido.map((f) => (
                    <div key={f.etiqueta} className="flex flex-wrap gap-x-s3 text-[0.88rem]">
                      <dt className="text-fg-muted">{f.etiqueta}:</dt>
                      <dd className="m-0 font-medium">{f.valor}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="cotizador__pie">
              <button
                type="button"
                onClick={() => irA(indice - 1)}
                disabled={indice === 0}
                className="cotizador__atras"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={siguiente}
                disabled={estado === "enviando"}
                className="cotizador__seguir"
              >
                {estado === "enviando" ? "Enviando…" : ultimo ? "Enviar solicitud" : "Continuar"}
                {estado !== "enviando" && <Flecha />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CampoFormulario({
  campo,
  valor,
  valorOtro,
  error,
  errorOtro,
  onChange,
  onChangeOtro,
}: {
  campo: Campo;
  valor: string;
  valorOtro: string;
  error?: string;
  errorOtro?: string;
  onChange: (v: string) => void;
  onChangeOtro: (v: string) => void;
}) {
  const idError = `${campo.id}-error`;
  const idAyuda = `${campo.id}-ayuda`;
  const descrito =
    [campo.ayuda ? idAyuda : null, error ? idError : null].filter(Boolean).join(" ") || undefined;

  if (campo.tipo === "opcion") {
    const eligioOtro = campo.otro?.valor === valor;
    const idCampoOtro = idOtro(campo.id);

    return (
      <fieldset className="m-0 border-0 p-0">
        <legend className="cotizador__etiqueta">
          {campo.etiqueta}
          {!campo.requerido && <span className="cotizador__opcional">opcional</span>}
        </legend>
        {campo.ayuda && (
          <p id={idAyuda} className="cotizador__ayuda">
            {campo.ayuda}
          </p>
        )}

        {/* Rejilla en vez de lista: con seis rangos, uno debajo de otro obligaba
            a scrollear el paso entero. */}
        <div className="cotizador__opciones">
          {campo.opciones.map((o) => {
            const Icono = o.icono ? ICONOS[o.icono] : null;
            return (
              <label
                key={o.valor}
                className={`cotizador__opcion ${valor === o.valor ? "esta-elegida" : ""}`}
              >
                <input
                  type="radio"
                  name={campo.id}
                  value={o.valor}
                  checked={valor === o.valor}
                  onChange={() => onChange(o.valor)}
                  aria-describedby={descrito}
                />
                {Icono && (
                  <span className="cotizador__pastilla" aria-hidden>
                    <Icono size={22} />
                  </span>
                )}
                <span className="min-w-0">
                  <span className="cotizador__opcion-titulo">{o.titulo}</span>
                  {o.detalle && <span className="cotizador__opcion-detalle">{o.detalle}</span>}
                </span>
                <span className="cotizador__marca" aria-hidden>
                  <Check size={13} />
                </span>
              </label>
            );
          })}
        </div>

        {eligioOtro && campo.otro && (
          <div className="cotizador__otro">
            <label htmlFor={idCampoOtro} className="cotizador__etiqueta">
              {campo.otro.etiqueta}
            </label>
            <input
              id={idCampoOtro}
              type="text"
              value={valorOtro}
              placeholder={campo.otro.marcador}
              autoFocus
              aria-invalid={errorOtro ? true : undefined}
              aria-describedby={errorOtro ? `${idCampoOtro}-error` : undefined}
              className={`cotizador__campo ${errorOtro ? "tiene-error" : ""}`}
              onChange={(e) => onChangeOtro(e.target.value)}
            />
            {errorOtro && (
              <p id={`${idCampoOtro}-error`} role="alert" className="cotizador__error">
                {errorOtro}
              </p>
            )}
          </div>
        )}

        {error && (
          <p id={idError} role="alert" className="cotizador__error">
            {error}
          </p>
        )}
      </fieldset>
    );
  }

  const autocompletar =
    campo.id === "nombre"
      ? "name"
      : campo.id === "email"
        ? "email"
        : campo.id === "telefono"
          ? "tel"
          : campo.id === "empresa"
            ? "organization"
            : "off";

  return (
    <div>
      <label htmlFor={campo.id} className="cotizador__etiqueta">
        {campo.etiqueta}
        {!campo.requerido && <span className="cotizador__opcional">opcional</span>}
      </label>
      {campo.ayuda && (
        <p id={idAyuda} className="cotizador__ayuda">
          {campo.ayuda}
        </p>
      )}
      {campo.tipo === "parrafo" ? (
        <textarea
          id={campo.id}
          value={valor}
          rows={4}
          placeholder={campo.marcador}
          aria-invalid={error ? true : undefined}
          aria-describedby={descrito}
          className={`cotizador__campo ${error ? "tiene-error" : ""}`}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={campo.id}
          type={campo.tipo === "texto" ? "text" : campo.tipo}
          value={valor}
          placeholder={campo.marcador}
          inputMode={campo.tipo === "tel" ? "tel" : undefined}
          autoComplete={autocompletar}
          aria-invalid={error ? true : undefined}
          aria-describedby={descrito}
          className={`cotizador__campo ${error ? "tiene-error" : ""}`}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && (
        <p id={idError} role="alert" className="cotizador__error">
          {error}
        </p>
      )}
    </div>
  );
}

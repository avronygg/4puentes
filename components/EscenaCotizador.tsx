"use client";

/**
 * Columna de acompañamiento del cotizador (20% del ancho en escritorio).
 *
 * A ese ancho la ilustración es lo secundario: lo que orienta de verdad es la
 * lista de pasos. Por eso la escena va chica y arriba, y el listado manda.
 */

type Marca = { id: string; titulo: string };

/** Las cuatro ramas del medio comparten escena: todas preguntan por la carga. */
function escenaDe(paso: string): "perfil" | "detalle" | "compra" | "logistica" | "contacto" {
  if (paso === "perfil") return "perfil";
  if (paso === "compra-local") return "compra";
  if (paso === "logistica") return "logistica";
  if (paso === "contacto") return "contacto";
  return "detalle";
}

/**
 * Los títulos de los pasos son preguntas completas ("¿Cuál de estas se parece
 * más a tu caso?") y no entran en una columna del 20%. Acá viven los rótulos
 * cortos; si aparece un paso nuevo sin rótulo, cae al título del esquema.
 */
const ROTULOS: Record<string, string> = {
  perfil: "Tu caso",
  actual: "Cómo importas",
  "compra-local": "Tu compra actual",
  interes: "Tu interés",
  logistica: "Origen y carga",
  contacto: "Contacto",
};

const TEXTOS = {
  perfil: { titulo: "Tu caso", apoyo: "Ajustamos las preguntas a tu situación." },
  detalle: { titulo: "La carga", apoyo: "Qué traes y en qué volumen." },
  compra: { titulo: "Tu compra", apoyo: "Qué compras hoy y cuánto gastas." },
  logistica: { titulo: "La ruta", apoyo: "Desde dónde sale y cómo viaja." },
  contacto: { titulo: "El contacto", apoyo: "A quién le mandamos la cotización." },
} as const;

export default function EscenaCotizador({
  paso,
  indice,
  total,
  marcas,
}: {
  paso: string;
  indice: number;
  total: number;
  /** Pasos del recorrido actual; cambia según el perfil elegido. */
  marcas: Marca[];
}) {
  const escena = escenaDe(paso);
  const { titulo, apoyo } = TEXTOS[escena];

  return (
    <div className="grid gap-s5">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (prefers-reduced-motion: no-preference) {
  .ec-entra { animation: ec-entra .5s cubic-bezier(.22,.7,.3,1) both; }
  .ec-viaja { animation: ec-viaja 3.4s ease-in-out infinite; }
  .ec-late  { animation: ec-late 2.6s ease-in-out infinite; }
  .ec-flota { animation: ec-flota 3.8s ease-in-out infinite; }
}
@keyframes ec-entra { from { opacity:0; transform: translateY(10px) } to { opacity:1; transform:none } }
@keyframes ec-viaja { 0% { offset-distance:0%; opacity:0 } 12%,88% { opacity:1 } 100% { offset-distance:100%; opacity:0 } }
@keyframes ec-late  { 0%,100% { transform: scale(1); opacity:.9 } 50% { transform: scale(1.12); opacity:.5 } }
@keyframes ec-flota { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
`,
        }}
      />

      {/* La escena se remonta con key para que la entrada se dispare en cada cambio */}
      <div
        key={escena}
        className="escena__dibujo ec-entra rounded-card border border-line bg-accent-wash p-s5"
        aria-hidden
      >
        <svg viewBox="0 0 120 90" className="h-auto w-full text-terra-400" fill="none">
          {escena === "perfil" && (
            <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <rect x="14" y="26" width="42" height="52" rx="5" opacity=".3" transform="rotate(-9 35 52)" />
              <rect x="32" y="21" width="42" height="52" rx="5" opacity=".55" transform="rotate(-3 53 47)" />
              <rect x="52" y="17" width="44" height="54" rx="5" fill="var(--color-surface)" />
              <path d="M62 34h24M62 43h18M62 52h21" strokeLinecap="round" opacity=".65" />
              <circle cx="86" cy="62" r="7" className="ec-late" />
              <path d="M83 62l2.4 2.4L89.6 60" strokeLinecap="round" strokeWidth="2" />
            </g>
          )}

          {escena === "detalle" && (
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <g className="ec-flota">
                <path d="M26 38l24-11 24 11v26l-24 11-24-11z" fill="var(--color-surface)" />
                <path d="M26 38l24 11 24-11M50 49v26" opacity=".6" />
              </g>
              <circle cx="78" cy="34" r="15" fill="var(--color-surface)" />
              <circle cx="78" cy="34" r="15" />
              <path d="M89 45l9 9" strokeWidth="2.4" />
              <path d="M72 34l4 4 8-8" strokeWidth="2" />
            </g>
          )}

          {escena === "logistica" && (
            <g stroke="currentColor" strokeLinecap="round">
              <path id="ec-ruta" d="M16 66C34 20 86 20 104 62" strokeWidth="1.6" strokeDasharray="3 6" opacity=".45" />
              <circle cx="16" cy="66" r="4.5" strokeWidth="1.8" fill="var(--color-surface)" />
              <circle cx="104" cy="62" r="6" className="ec-late" strokeWidth="1.6" />
              <circle cx="104" cy="62" r="3.4" fill="currentColor" stroke="none" />
              <circle
                r="3.2"
                fill="currentColor"
                stroke="none"
                className="ec-viaja"
                style={{ offsetPath: "path('M16 66C34 20 86 20 104 62')" }}
              />
            </g>
          )}

          {escena === "contacto" && (
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <g className="ec-flota">
                <rect x="22" y="26" width="76" height="50" rx="6" fill="var(--color-surface)" />
                <path d="M23 30l37 26 37-26" />
              </g>
              <circle cx="92" cy="68" r="12" fill="var(--color-surface)" />
              <circle cx="92" cy="68" r="12" />
              <path d="M86.5 68l4 4 7.5-8" strokeWidth="2.2" />
            </g>
          )}
        </svg>
      </div>

      <div key={`t-${escena}`} className="escena__texto ec-entra">
        <p className="m-0 text-[1.02rem] font-semibold tracking-[-0.015em] text-balance">{titulo}</p>
        <p className="mt-s2 mb-0 text-[0.84rem] leading-[1.45] text-pretty text-fg-muted">{apoyo}</p>
      </div>

      <ol className="escena__pasos m-0 grid list-none gap-s3 border-t border-line p-0 pt-s5">
        {marcas.map((m, i) => {
          const hecho = i < indice;
          const actual = i === indice;
          return (
            <li key={m.id} className="flex items-center gap-s3">
              <span
                aria-hidden
                className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border text-[0.62rem] font-semibold ${
                  actual
                    ? "border-terra-400 bg-terra-400 text-white"
                    : hecho
                      ? "border-terra-400/40 bg-accent-wash text-terra-600"
                      : "border-line text-fg-muted"
                }`}
              >
                {hecho ? "✓" : i + 1}
              </span>
              <span
                className={`min-w-0 truncate text-[0.83rem] ${
                  actual ? "font-semibold" : hecho ? "text-fg-muted" : "text-fg-muted/60"
                }`}
              >
                {ROTULOS[m.id] ?? m.titulo}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="sr-only" aria-live="polite">
        Paso {indice + 1} de {total}:{" "}
        {marcas[indice] ? (ROTULOS[marcas[indice].id] ?? marcas[indice].titulo) : ""}
      </p>
    </div>
  );
}

import { MAPA } from "@/lib/mapa-datos";

/** Se arman desde las rutas del mapa, agrupando por región. */
const REGIONES: Record<string, string> = {
  China: "En operación",
  "Corea del Sur": "En operación",
  Vietnam: "En operación",
  India: "Abriendo ruta",
  "Emiratos Árabes": "Abriendo ruta",
  Europa: "A pedido",
};

export default function Rutas() {
  const { ancho, alto, destino, puntos, rutas } = MAPA;

  const porRegion = rutas.reduce<Record<string, string[]>>((acc, r) => {
    (acc[r.region] ??= []).push(r.nombre);
    return acc;
  }, {});

  return (
    <section className="section" id="rutas">
      <div className="wrap">
        <div className="grid grid-cols-[minmax(240px,300px)_1fr] items-center gap-s8 max-[1000px]:grid-cols-1 max-[1000px]:gap-s7">
          <div>
            <h2>Todas las rutas terminan en tu bodega</h2>
            <p className="lede">
              Consolidamos en origen y traemos la carga hasta el sur de Chile.
              Un solo interlocutor de punta a punta, sea cual sea el puerto de
              salida.
            </p>

            <ul className="mt-s7 grid list-none gap-s4 p-0">
              {Object.entries(porRegion).map(([region, puertos]) => (
                <li key={region} className="border-t border-line pt-s3">
                  <div className="flex items-baseline gap-s3">
                    <span className="h-2 w-2 shrink-0 translate-y-[-2px] rounded-full bg-terra-400" />
                    <span className="font-semibold">{region}</span>
                    <span className="ml-auto font-mono text-[0.66rem] tracking-[0.08em] text-fg-muted uppercase">
                      {REGIONES[region] ?? ""}
                    </span>
                  </div>
                  <p className="mt-s1 mb-0 pl-[20px] font-mono text-[0.72rem] tracking-[0.03em] text-fg-muted">
                    {puertos.join(" · ")}
                  </p>
                </li>
              ))}
              <li className="border-t border-line pt-s3">
                <div className="flex items-baseline gap-s3">
                  <span className="h-2 w-2 shrink-0 translate-y-[-2px] rounded-full bg-accent-btn" />
                  <span className="font-semibold">Chile</span>
                  <span className="ml-auto font-mono text-[0.66rem] tracking-[0.08em] text-fg-muted uppercase">
                    Destino
                  </span>
                </div>
                <p className="mt-s1 mb-0 pl-[20px] font-mono text-[0.72rem] tracking-[0.03em] text-fg-muted">
                  Valdivia · Todo el sur
                </p>
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <svg
              viewBox={`0 0 ${ancho} ${alto}`}
              className="h-auto w-full"
              role="img"
              aria-label={`Mapa mundial con las rutas de importación hacia el sur de Chile desde ${rutas
                .map((r) => r.nombre)
                .join(", ")}.`}
            >
              {/* Los continentes, como una trama de puntos */}
              <path
                d={puntos}
                stroke="var(--color-line)"
                strokeWidth={4.2}
                strokeLinecap="round"
                fill="none"
              />

              {/* Cada ruta: una línea fija siempre visible y un tramo que la recorre */}
              {rutas.map((r, i) => {
                const d = `M${r.ox} ${r.oy} Q${r.cx} ${r.cy} ${destino.x} ${destino.y}`;
                return (
                  <g key={r.nombre}>
                    <path d={d} className="mapa__ruta" />
                    <path
                      d={d}
                      className="mapa__flujo"
                      style={{ animationDelay: `${i * 1.3}s` }}
                    />
                  </g>
                );
              })}

              {rutas.map((r) => (
                <circle key={r.nombre} cx={r.ox} cy={r.oy} r={6} className="mapa__origen" />
              ))}

              <circle cx={destino.x} cy={destino.y} r={26} className="mapa__pulso" />
              <circle cx={destino.x} cy={destino.y} r={10} className="mapa__destino" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

import { MAPA } from "@/lib/mapa-datos";

const ESTADO: Record<string, string> = {
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

  const items = [
    ...Object.entries(porRegion).map(([region, puertos]) => ({
      region,
      puertos: puertos.join(" · "),
      estado: ESTADO[region] ?? "",
      destino: false,
    })),
    { region: "Chile", puertos: "Valdivia · Todo el sur", estado: "Destino", destino: true },
  ];

  return (
    <section className="section" id="rutas">
      <div className="wrap">
        {/* Encabezado y mapa arriba; los orígenes van abajo en una rejilla
            compacta, para que la sección no crezca con la lista. */}
        <div className="grid grid-cols-[minmax(240px,320px)_1fr] items-center gap-s8 max-[1000px]:grid-cols-1 max-[1000px]:gap-s6">
          <div>
            <h2>Todas las rutas terminan en tu bodega</h2>
            <p className="lede">
              Consolidamos en origen y traemos la carga hasta el sur de Chile.
              Un solo interlocutor de punta a punta, sea cual sea el puerto de
              salida.
            </p>
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
              <path
                d={puntos}
                stroke="var(--color-line)"
                strokeWidth={4.2}
                strokeLinecap="round"
                fill="none"
              />

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

        <ul className="rutas-lista">
          {items.map((i) => (
            <li key={i.region}>
              <span className={`rutas-lista__punto ${i.destino ? "es-destino" : ""}`} />
              <div className="min-w-0">
                <div className="flex items-baseline gap-s2">
                  <span className="font-semibold">{i.region}</span>
                  <span className="ml-auto shrink-0 font-mono text-[0.62rem] tracking-[0.08em] text-fg-muted uppercase">
                    {i.estado}
                  </span>
                </div>
                <p className="mt-[2px] mb-0 font-mono text-[0.7rem] leading-[1.45] tracking-[0.02em] text-fg-muted">
                  {i.puertos}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

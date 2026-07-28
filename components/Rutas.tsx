import { MAPA } from "@/lib/mapa-datos";

const ETIQUETAS = [
  { nombre: "Shenzhen · Ningbo · Qingdao", region: "China", estado: "En operación" },
  { nombre: "Jebel Ali · Dubái", region: "Emiratos Árabes", estado: "Abriendo ruta" },
];

export default function Rutas() {
  const { ancho, alto, destino, puntos, rutas } = MAPA;

  return (
    <section className="section" id="rutas">
      <div className="wrap">
        <div className="grid grid-cols-[minmax(260px,340px)_1fr] items-center gap-s9 max-[1000px]:grid-cols-1 max-[1000px]:gap-s7">
          <div>
            <h2>Todas las rutas terminan en tu bodega</h2>
            <p className="lede">
              Consolidamos en origen y traemos la carga hasta el sur de Chile.
              Un solo interlocutor de punta a punta, sea cual sea el puerto de
              salida.
            </p>

            <ul className="mt-s7 grid list-none gap-s5 p-0">
              {ETIQUETAS.map((e) => (
                <li key={e.region} className="border-t border-line pt-s4">
                  <div className="flex items-center gap-s3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-terra-400" />
                    <span className="font-semibold">{e.region}</span>
                    <span className="ml-auto font-mono text-[0.68rem] tracking-[0.08em] text-fg-muted uppercase">
                      {e.estado}
                    </span>
                  </div>
                  <p className="mt-s1 mb-0 pl-[20px] font-mono text-[0.73rem] tracking-[0.03em] text-fg-muted">
                    {e.nombre}
                  </p>
                </li>
              ))}
              <li className="border-t border-line pt-s4">
                <div className="flex items-center gap-s3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent-btn" />
                  <span className="font-semibold">Chile</span>
                  <span className="ml-auto font-mono text-[0.68rem] tracking-[0.08em] text-fg-muted uppercase">
                    Destino
                  </span>
                </div>
                <p className="mt-s1 mb-0 pl-[20px] font-mono text-[0.73rem] tracking-[0.03em] text-fg-muted">
                  Valdivia · Todo el sur
                </p>
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <svg
              viewBox={`0 0 ${ancho} ${alto}`}
              className="mapa h-auto w-full"
              role="img"
              aria-label="Mapa mundial con las rutas de importación desde China y Emiratos Árabes hacia el sur de Chile."
            >
              {/* Los continentes, como una trama de puntos */}
              <path
                d={puntos}
                stroke="var(--color-line)"
                strokeWidth={4.2}
                strokeLinecap="round"
                fill="none"
              />

              {rutas.map((r, i) => (
                <path
                  key={r.nombre}
                  d={`M${r.ox} ${r.oy} Q${r.cx} ${r.cy} ${destino.x} ${destino.y}`}
                  className="mapa__ruta"
                  style={{ animationDelay: `${i * 0.7}s` }}
                />
              ))}

              {rutas.map((r) => (
                <circle key={r.nombre} cx={r.ox} cy={r.oy} r={7} className="mapa__origen" />
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

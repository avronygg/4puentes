import { pasos } from "@/lib/contenido";

export default function Proceso() {
  return (
    <section className="section section--terra" id="proceso">
      <div className="wrap">
        <div className="section-head">
          <h2>Cinco pasos entre tu pedido y tu bodega</h2>
          <p className="lede">
            Un solo interlocutor en toda la cadena. Tú apruebas; nosotros
            ejecutamos y te informamos en cada tramo.
          </p>
        </div>

        {/* La lista se acota a 860px para que los filetes terminen donde
            termina el texto y no crucen el ancho completo. */}
        <ol className="grid max-w-[860px] list-none p-0">
          {pasos.map((p, i) => (
            <li
              key={p.n}
              className={`grid grid-cols-[64px_1fr] items-baseline gap-s6 border-t border-terra-300/25 py-s6 max-[640px]:grid-cols-1 max-[640px]:gap-s2 max-[640px]:py-s5 ${
                i === pasos.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="font-mono text-[0.86rem] leading-[1.6] font-semibold tracking-[0.06em] text-terra-300 tabular-nums">
                {p.n}
              </div>
              <div>
                <h3 className="text-white">{p.titulo}</h3>
                <p className="mt-s2 mb-0 max-w-[62ch] text-[0.97rem] text-[#d6ada6]">
                  {p.texto}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

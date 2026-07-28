import { mercados } from "@/lib/contenido";

export default function Mercados() {
  return (
    <section className="section" id="mercados">
      <div className="wrap">
        <div className="section-head">
          <h2>De Asia y Medio Oriente al sur de Chile</h2>
          <p className="lede">
            Trabajamos donde ya sabemos movernos, y abrimos las rutas que le dan
            alternativas a tu abastecimiento.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-s5 max-[820px]:grid-cols-1">
          {mercados.map((m) => (
            <article
              key={m.titulo}
              className={`rounded-card border bg-surface px-s6 pt-s7 pb-s7 ${
                m.destacado ? "border-terra-400/35" : "border-line"
              }`}
            >
              <span
                className={`mb-s5 inline-block rounded-full border px-3 py-[5px] text-[0.72rem] font-medium ${
                  m.destacado
                    ? "border-terra-400/30 bg-accent-wash text-terra-600"
                    : "border-line bg-bg text-fg-muted"
                }`}
              >
                {m.etiqueta}
              </span>
              <h3 className="text-[1.42rem] tracking-[-0.022em]">{m.titulo}</h3>
              <p className="mt-s3 mb-0 text-[0.97rem] text-fg-muted">{m.texto}</p>
              {/* Separadores por gap, no como texto: un "·" escrito quedaba
                  huérfano al final de línea. */}
              <ul className="mt-s6 flex list-none flex-wrap gap-s2 gap-x-s5 border-t border-line-soft p-0 pt-s5">
                {m.puertos.map((p) => (
                  <li
                    key={p}
                    className="py-1 font-mono text-[0.72rem] tracking-[0.04em] text-fg-muted"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

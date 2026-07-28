import { regiones } from "@/lib/contenido";

export default function Cobertura() {
  return (
    <section className="section" id="cobertura">
      <div className="wrap grid grid-cols-2 items-start gap-s9 max-[900px]:grid-cols-1 max-[900px]:gap-s7">
        <div>
          <h2>Base en Valdivia. Operación en todo el sur.</h2>
          <p className="mt-s5 mb-0 text-[1.06rem] leading-[1.6] font-medium text-balance text-fg-muted">
            Valdivia se cruza por puentes.{" "}
            <em className="not-italic text-terra-600">
              Nosotros cruzamos océanos.
            </em>
          </p>
          <p className="lede">
            Somos de acá. Hablas con alguien que conoce tu ciudad, tu puerto de
            entrada y los tiempos reales de llegada a tu bodega, con la red y los
            costos de un operador internacional.
          </p>
        </div>

        <ul className="m-0 list-none p-0">
          {regiones.map((r, i) => (
            <li
              key={r.zona}
              className={`flex items-baseline justify-between gap-s5 border-b border-line py-s5 text-base font-medium max-[560px]:flex-col max-[560px]:gap-s2 ${
                i === 0 ? "border-t" : ""
              }`}
            >
              {r.zona}
              <span className="text-right font-mono text-[0.71rem] font-normal tracking-[0.07em] text-fg-muted uppercase max-[560px]:text-left">
                {r.ciudades}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

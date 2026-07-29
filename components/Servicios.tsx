import { servicios } from "@/lib/contenido";
import Revelar from "./Revelar";
import { Caja, Check, EscudoCheck, Galpon } from "./Icons";

const iconos = { caja: Caja, galpon: Galpon, escudo: EscudoCheck } as const;

export default function Servicios() {
  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <Revelar className="section-head">
          <h2 data-revelar>Tú compras. Nosotros hacemos el resto.</h2>
          <p className="lede" data-revelar>
            No necesitas un departamento de comercio exterior. Nos hacemos cargo
            de la cadena completa: desde el contacto con el proveedor en origen
            hasta que la carga queda en tu bodega.
          </p>
        </Revelar>

        {/* vidrio-ambiente pone las manchas de color detrás de la rejilla: sin
            ellas el desenfoque de las tarjetas no tendría nada que refractar. */}
        <Revelar className="vidrio-ambiente grid gap-s5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] max-[900px]:grid-cols-1">
          {servicios.map((s) => {
            const Icono = iconos[s.icono];
            return (
              <article
                key={s.titulo}
                data-revelar
                className="tarjeta-vidrio flex flex-col px-s6 pt-s7 pb-s6"
              >
                <span className="tarjeta-vidrio__icono mb-s5">
                  <Icono />
                </span>
                <h3 className="mb-s3">{s.titulo}</h3>
                <p className="m-0 mb-s6 text-[0.95rem] leading-[1.65] text-fg-muted">
                  {s.texto}
                </p>
                {/* mt-auto alinea los separadores de las tres tarjetas aunque
                    los párrafos midan distinto */}
                <ul className="mt-auto grid list-none gap-s3 border-t border-line-soft p-0 pt-s5 text-[0.9rem]">
                  {s.items.map((i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-s3 leading-[1.5] text-fg-muted"
                    >
                      <Check className="shrink-0 translate-y-px text-terra-400" />
                      {i}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </Revelar>
      </div>
    </section>
  );
}

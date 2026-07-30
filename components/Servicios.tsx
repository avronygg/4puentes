import { servicios } from "@/lib/contenido";
import Revelar from "./Revelar";
import { Brujula, Check, Etiqueta, Flecha, Tendencia } from "./Icons";

const iconos = { tendencia: Tendencia, etiqueta: Etiqueta, brujula: Brujula } as const;

export default function Servicios() {
  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <Revelar className="section-head">
          <h2 data-revelar>Tres formas de trabajar con nosotros</h2>
          <p className="lede" data-revelar>
            No necesitas un departamento de comercio exterior. Elige el caso que
            se parece al tuyo y te devolvemos un costo total puesto en tu bodega.
          </p>
        </Revelar>

        {/* vidrio-ambiente pone las manchas de color detrás de la rejilla: sin
            ellas el desenfoque de las tarjetas no tendría nada que refractar. */}
        <Revelar className="vidrio-ambiente grid gap-s5 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] max-[900px]:grid-cols-1">
          {servicios.map((s) => {
            const Icono = iconos[s.icono];
            return (
              <article
                key={s.titulo}
                data-revelar
                className="tarjeta-vidrio flex flex-col px-s6 pt-s6 pb-s6"
              >
                <span className="mb-s5 inline-flex w-fit items-center gap-s2 rounded-full border border-terra-400/25 bg-accent-wash px-3 py-[5px] font-mono text-[0.65rem] tracking-[0.12em] text-terra-600 uppercase">
                  {s.etiqueta}
                </span>
                <span className="tarjeta-vidrio__icono mb-s5">
                  <Icono />
                </span>
                <h3 className="mb-s3 text-[1.24rem] tracking-[-0.018em]">{s.titulo}</h3>
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
                {/* El perfil viaja en la URL y el formulario lo deja marcado, así
                    quien llega desde acá no repite la pregunta que ya respondió
                    al elegir la tarjeta. */}
                <a href={`/?perfil=${s.perfil}#cotizar`} className="servicio__cta">
                  Cotizar este caso
                  <Flecha size={15} />
                </a>
              </article>
            );
          })}
        </Revelar>
      </div>
    </section>
  );
}

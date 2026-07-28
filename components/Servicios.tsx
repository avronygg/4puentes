import { servicios } from "@/lib/contenido";
import { Caja, Check, EscudoCheck, Galpon } from "./Icons";

const iconos = { caja: Caja, galpon: Galpon, escudo: EscudoCheck } as const;

export default function Servicios() {
  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <div className="section-head">
          <h2>Tú compras. Nosotros hacemos el resto.</h2>
          <p className="lede">
            No necesitas un departamento de comercio exterior. Nos hacemos cargo
            de la cadena completa: desde el contacto con el proveedor en origen
            hasta que la carga queda en tu bodega.
          </p>
        </div>

        <div className="grid gap-s5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] max-[900px]:grid-cols-1">
          {servicios.map((s) => {
            const Icono = iconos[s.icono];
            return (
              <article
                key={s.titulo}
                className="flex flex-col rounded-card border border-line bg-surface px-s6 pt-s7 pb-s6 transition-[border-color,box-shadow,transform] duration-250 hover:-translate-y-[3px] hover:border-terra-400/40 hover:shadow-[0_2px_4px_rgba(26,22,21,.04),0_12px_28px_-16px_rgba(26,22,21,.18)]"
              >
                <span className="mb-s5 grid h-11 w-11 place-items-center rounded-[11px] bg-accent-wash text-terra-600">
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
        </div>
      </div>
    </section>
  );
}

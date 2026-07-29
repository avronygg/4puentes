import { regiones } from "@/lib/contenido";
import Revelar from "./Revelar";
import { Pin } from "./Icons";

export default function Cobertura() {
  return (
    // Bloque de foto: corta la seguidilla de secciones blancas entre el mapa de
    // rutas y el formulario, y el océano acompaña al mensaje de la sección.
    <section className="section section--sea" id="cobertura">
      <div className="sea-bg" aria-hidden />
      <Revelar className="wrap grid grid-cols-2 items-start gap-s9 max-[900px]:grid-cols-1 max-[900px]:gap-s7">
        <div>
          <p
            data-revelar
            className="m-0 mb-s5 flex items-center gap-s3 font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-terra-300 uppercase"
          >
            <Pin size={15} className="shrink-0" />
            Valdivia · Región de Los Ríos
          </p>
          <h2 data-revelar>Base en Valdivia. Operación en todo el sur.</h2>
          <p
            data-revelar
            className="mt-s5 mb-0 text-[1.12rem] leading-[1.55] font-medium text-balance text-white"
          >
            Valdivia se cruza por puentes.{" "}
            <em className="not-italic text-terra-300">Nosotros cruzamos océanos.</em>
          </p>
          <p data-revelar className="lede">
            Somos de acá. Hablas con alguien que conoce tu ciudad, tu puerto de
            entrada y los tiempos reales de llegada a tu bodega, con la red y los
            costos de un operador internacional.
          </p>
        </div>

        {/* Panel de vidrio sobre la foto: sin él la lista se pierde en el oleaje. */}
        <ul
          data-revelar
          className="m-0 list-none rounded-card border border-white/15 bg-[rgba(6,28,54,.34)] p-s6 backdrop-blur-md max-[900px]:p-s5"
        >
          {regiones.map((r, i) => (
            <li
              key={r.zona}
              className={`flex items-baseline justify-between gap-s5 py-s4 text-base font-medium text-white max-[560px]:flex-col max-[560px]:gap-s2 ${
                i > 0 ? "border-t border-white/12" : ""
              }`}
            >
              {r.zona}
              <span className="text-right font-mono text-[0.71rem] font-normal tracking-[0.07em] text-[#cfe2f2] uppercase max-[560px]:text-left">
                {r.ciudades}
              </span>
            </li>
          ))}
        </ul>
      </Revelar>
    </section>
  );
}

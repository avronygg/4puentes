import { marca } from "@/lib/contenido";
import CtaSeccion from "./CtaSeccion";
import Revelar from "./Revelar";

/**
 * De dónde viene el nombre. Va justo después del proceso a propósito: el
 * lector acaba de ver los cinco pasos, así que los cuatro tramos que dan
 * nombre a la marca aterrizan sobre algo que ya entendió.
 */
export default function Marca() {
  return (
    <section className="section" id="marca">
      <div className="wrap">
        <Revelar className="section-head">
          <p className="marca__etiqueta" data-revelar>
            {marca.etiqueta}
          </p>
          <h2 data-revelar>
            <span className="suave">Un puente une dos puntos</span>{" "}
            <em className="destacado">que solos no se alcanzan</em>
          </h2>
          {marca.parrafos.map((t, i) => (
            <p key={i} className="lede" data-revelar>
              {t}
            </p>
          ))}
        </Revelar>

        {/* El tablero es el borde superior de la lista; de él baja un pilar a
            cada tramo. Dibujarlo así evita un SVG que habría que reescalar. */}
        <Revelar paso={110}>
          <ol className="puente">
            {marca.tramos.map((t, i) => (
              <li key={t.nombre} data-revelar>
                <span className="puente__pilar" aria-hidden />
                <span className="puente__n" aria-hidden>
                  {i + 1}
                </span>
                <span className="puente__nombre">{t.nombre}</span>
                <span className="puente__detalle">{t.detalle}</span>
              </li>
            ))}
          </ol>
        </Revelar>

        <CtaSeccion
          texto="Da lo mismo qué necesites o de dónde venga: los cuatro tramos los cruzamos nosotros."
          boton="Cotizar mi importación"
          mensaje="Hola, quiero que se hagan cargo de traer algo desde el extranjero. Les cuento qué."
        />
      </div>
    </section>
  );
}

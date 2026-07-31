import { casos } from "@/lib/contenido";
import CtaSeccion from "./CtaSeccion";
import Revelar from "./Revelar";
import { Check } from "./Icons";

export default function Casos() {
  return (
    <section className="section section--terra" id="casos">
      <div className="wrap">
        <Revelar className="section-head">
          <h2 data-revelar>
            <span className="suave">Lo que pasó cuando</span>{" "}
            <em className="destacado">dejaron de comprar acá</em>
          </h2>
          <p className="lede" data-revelar>
            Empresas que ya compraban el mismo insumo en Chile y lo trajeron
            directo desde origen. <strong>Estos son los números reales</strong>,
            no un promedio de folleto.
          </p>
        </Revelar>

        <Revelar paso={130} className="casos">
          {casos.map((c) => (
            <article key={c.rubro} data-revelar className="caso">
              <p className="caso__rubro">{c.rubro}</p>
              <p className="caso__cifra">
                {c.cifra}
                <span className="caso__logro">{c.logro}</span>
              </p>
              <p className="caso__texto">{c.texto}</p>

              {c.extras.length > 0 && (
                <ul className="caso__extras">
                  {c.extras.map((e) => (
                    <li key={e}>
                      <Check size={13} className="shrink-0 translate-y-px" />
                      {e}
                    </li>
                  ))}
                </ul>
              )}

              {/* Presentar una empresa propia como caso de cliente sin decirlo
                  sería engañar a quien lo lee. */}
              {c.propio && <p className="caso__aviso">Emprendimiento propio del equipo</p>}
            </article>
          ))}
        </Revelar>

        <CtaSeccion
          texto="¿Cuánto estás pagando de más hoy? Con tu costo actual te lo decimos."
          boton="Comparar mi costo"
          mensaje="Hola 4 Puentes, quiero comparar lo que pago hoy contra importar directo."
        />
      </div>
    </section>
  );
}

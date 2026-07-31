import { pasos } from "@/lib/contenido";
import CtaSeccion from "./CtaSeccion";
import Revelar from "./Revelar";
import { Barco, Calculadora, Camion, Lupa, Sello } from "./Icons";

// Un ícono por paso, en el mismo orden que `pasos` en contenido.ts.
const iconos = [Calculadora, Lupa, Barco, Sello, Camion];

export default function Proceso() {
  return (
    <section className="section section--terra" id="proceso">
      <div className="wrap">
        <Revelar className="section-head">
          <h2 data-revelar>
            <span className="suave">Cinco pasos entre tu pedido y</span>{" "}
            <em className="destacado">tu bodega</em>
          </h2>
          <p className="lede" data-revelar>
            <strong>Un solo interlocutor en toda la cadena.</strong> Tú apruebas;
            nosotros ejecutamos y te informamos en cada tramo, sin que tengas que
            perseguir a nadie.
          </p>
        </Revelar>

        {/* Mapa de procesos: cada paso es un nodo y el riel que baja hacia el
            siguiente se dibuja cuando el paso entra en pantalla, así la línea
            avanza al ritmo de la lectura. */}
        <Revelar paso={140}>
          <ol className="proceso">
            {pasos.map((p, i) => {
              const Icono = iconos[i];
              const ultimo = i === pasos.length - 1;
              return (
                <li key={p.n} className="proceso__paso" data-revelar>
                  <div className="proceso__nodo">
                    <Icono />
                    <span className="proceso__numero" aria-hidden>
                      {p.n}
                    </span>
                  </div>
                  <div className="proceso__cuerpo">
                    <h3 className="text-white">{p.titulo}</h3>
                    <p className="mt-s2 mb-0 max-w-[70ch] text-[0.97rem] text-[#d9a9a4]">
                      {p.texto}
                    </p>
                    {ultimo && (
                      <p className="mt-s5 mb-0 inline-flex items-center gap-s3 rounded-full border border-terra-300/25 px-4 py-2 font-mono text-[0.7rem] tracking-[0.08em] text-terra-300 uppercase">
                        Carga entregada
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </Revelar>

        <CtaSeccion
          texto="Ese es todo el proceso. Tú solo apruebas y recibes."
          boton="Empezar mi cotización"
          mensaje="Hola 4 Puentes, vi el proceso en la web y quiero cotizar una importación."
        />
      </div>
    </section>
  );
}

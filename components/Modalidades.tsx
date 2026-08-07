import Image from "next/image";
import Revelar from "./Revelar";
import { AvionCarga, Barco, Flecha } from "./Icons";

/**
 * Las dos vías por las que puede viajar la carga. Las fotos ya traen su propio
 * titular incrustado, así que acá no se les encima más texto: sólo se enmarcan
 * y el detalle va debajo.
 */
const modalidades = [
  {
    src: "/modalidad-maritima.webp",
    // El alt describe lo que se ve, sin afirmar que la naviera sea propia.
    alt: "Buque portacontenedores navegando en alta mar",
    Icono: Barco,
    titulo: "Vía marítima",
    texto:
      "Un contenedor entero para ti, o compartido con otros si tu carga es " +
      "chica. Es la forma más barata y la que usamos casi siempre.",
    puntos: ["Contenedor entero o compartido", "Te avisamos dónde va", "Lo más económico"],
  },
  {
    src: "/modalidad-aerea.webp",
    alt: "Avión de carga sobrevolando las nubes",
    Icono: AvionCarga,
    titulo: "Vía aérea",
    texto:
      "Para lo urgente, las muestras y lo que es poco pero caro. Llega semanas " +
      "antes, cuando el tiempo importa más que el precio.",
    puntos: ["Lo urgente", "Muestras y repuestos", "Poco volumen, alto valor"],
  },
];

export default function Modalidades() {
  return (
    <section className="section" id="modalidades">
      <div className="wrap">
        {/* --ancho suelta el tope de 60ch para que el titular entre en una sola
            línea en escritorio. En vertical vuelve a partirse, que es lo suyo. */}
        <Revelar className="section-head section-head--ancho">
          <h2 data-revelar>
            <span className="suave">Marítimo o aéreo,</span> según{" "}
            <em className="destacado">lo que necesites</em>
          </h2>
          <p className="lede" data-revelar>
            No tienes que decidirlo tú. <strong>Te decimos cuál te conviene</strong> y
            por qué: casi siempre gana el barco por precio, pero si tienes prisa la
            respuesta cambia.
          </p>
        </Revelar>

        <Revelar
          paso={150}
          className="grid grid-cols-2 gap-s6 max-[900px]:grid-cols-1"
        >
          {modalidades.map((m) => (
            <article key={m.titulo} data-revelar className="modalidad">
              <div className="modalidad__foto">
                <Image
                  src={m.src}
                  alt={m.alt}
                  width={1536}
                  height={1024}
                  quality={90}
                  sizes="(max-width: 900px) 92vw, 46vw"
                />
              </div>

              <div className="modalidad__cuerpo">
                <h3 className="flex items-center gap-s3 text-[1.3rem] tracking-[-0.02em]">
                  <span className="modalidad__icono">
                    <m.Icono size={20} />
                  </span>
                  {m.titulo}
                </h3>
                <p className="mt-s3 mb-0 text-[0.96rem] text-fg-muted">{m.texto}</p>
                <ul className="mt-s5 flex list-none flex-wrap gap-s2 p-0">
                  {m.puntos.map((p) => (
                    <li key={p} className="modalidad__punto">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#cotizar" className="modalidad__enlace">
                Cotizar por esta vía
                <Flecha size={15} />
              </a>
            </article>
          ))}
        </Revelar>
      </div>
    </section>
  );
}

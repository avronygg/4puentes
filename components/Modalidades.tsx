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
      "Contenedor completo o carga consolidada. Es la opción de mejor costo por " +
      "kilo y la que usamos para el grueso de las importaciones.",
    puntos: ["FCL y LCL", "Seguimiento por tramo", "Consolidado en origen"],
  },
  {
    src: "/modalidad-aerea.webp",
    alt: "Avión de carga sobrevolando las nubes",
    Icono: AvionCarga,
    titulo: "Vía aérea",
    texto:
      "Para carga urgente, muestras o volúmenes bajos de alto valor. Semanas " +
      "menos de tránsito cuando el tiempo manda sobre el costo.",
    puntos: ["Carga urgente", "Muestras y repuestos", "Alto valor por kilo"],
  },
];

export default function Modalidades() {
  return (
    <section className="section" id="modalidades">
      <div className="wrap">
        <Revelar className="section-head">
          <h2 data-revelar>Marítimo o aéreo, según lo que necesites</h2>
          <p className="lede" data-revelar>
            Te decimos cuál conviene: casi siempre decide el costo por
            kilo, pero cuando el plazo aprieta la respuesta cambia.
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

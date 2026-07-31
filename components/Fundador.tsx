import Image from "next/image";
import { fundador } from "@/lib/contenido";
import CtaSeccion from "./CtaSeccion";
import Revelar from "./Revelar";

export default function Fundador() {
  return (
    <section className="section" id="quien-asesora">
      <div className="wrap">
        <Revelar className="fundador">
          <div className="fundador__retrato" data-revelar>
            {fundador.foto ? (
              <Image
                src={fundador.foto}
                alt={`${fundador.nombre}, ${fundador.rol}`}
                width={640}
                height={800}
              />
            ) : (
              // Marcador mientras no haya foto. No es un hueco vacío: sostiene
              // la composición y deja claro que falta un dato, no un bloque.
              <div className="fundador__marcador" aria-hidden>
                <Image src="/logo.webp" alt="" width={120} height={117} />
                <span>Foto pendiente</span>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="fundador__etiqueta" data-revelar>
              Quién te asesora
            </p>
            <h2 data-revelar>
              <span className="suave">No empecé importando para</span>{" "}
              <em className="destacado">vender el servicio</em>
            </h2>
            <p className="fundador__entrada" data-revelar>
              Empecé importando para mi propio negocio.
            </p>

            {fundador.parrafos.map((t, i) => (
              <p key={i} className="fundador__parrafo" data-revelar>
                {t}
              </p>
            ))}

            <p className="fundador__firma" data-revelar>
              <span className="tbd" title="Por confirmar">
                {fundador.nombre}
              </span>
              <span>{fundador.rol}</span>
            </p>

            <ul className="fundador__credenciales" data-revelar>
              {fundador.credenciales.map((c) => (
                <li key={c.detalle}>
                  <span className="fundador__dato">
                    {c.dato}
                    <span className="fundador__unidad">{c.unidad}</span>
                  </span>
                  <span className="fundador__detalle">{c.detalle}</span>
                </li>
              ))}
            </ul>
          </div>
        </Revelar>

        <CtaSeccion
          texto="Cuéntame qué necesitas traer y te digo con franqueza si conviene."
          boton="Hablar de mi caso"
          mensaje="Hola, quiero conversar sobre una importación para mi negocio y que me digan con franqueza si me conviene."
        />
      </div>
    </section>
  );
}

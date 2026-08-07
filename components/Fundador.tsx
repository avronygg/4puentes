import Image from "next/image";
import { fundador } from "@/lib/contenido";
import CtaSeccion from "./CtaSeccion";
import Revelar from "./Revelar";
import { Pin } from "./Icons";

export default function Fundador() {
  return (
    <section className="section" id="quienes-somos">
      <div className="wrap">
        <Revelar className="fundador">
          {/* La foto y las credenciales viajan juntas: la imagen es apaisada y
              sola dejaba media columna vacía frente a un texto largo. */}
          <div className="fundador__columna">
            <div className="fundador__retrato" data-revelar>
              <div className="fundador__marco">
                {fundador.foto ? (
                  <Image
                    src={fundador.foto}
                    alt={fundador.fotoAlt}
                    width={660}
                    height={495}
                    sizes="(max-width: 900px) 92vw, 450px"
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

              {/* Dos piezas flotantes y nada más: rompen el rectángulo y dan
                  profundidad. Cargan datos que no se repiten en el resto de la
                  sección, si no serían decoración. */}
              <span className="fundador__sello" aria-hidden>
                <Image src="/logo.webp" alt="" width={80} height={78} />
              </span>

              <div className="fundador__ficha">
                <p className="fundador__ficha-nombre">{fundador.nombre}</p>
                <p className="fundador__ficha-rol">{fundador.rol}</p>
                <p className="fundador__ficha-lugar">
                  <Pin size={15} className="shrink-0" />
                  Valdivia, Chile
                </p>
              </div>
            </div>

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
          </div>
        </Revelar>

        <CtaSeccion
          texto="Dime qué quieres traer y nos encargamos: buscamos la mejor opción y hacemos todo el proceso hasta dejártelo en Chile."
          boton="Contarle mi caso a Gianpiero"
          mensaje="Hola Gianpiero, quiero contarte qué necesito traer y que me digas cómo lo hacemos."
        />
      </div>
    </section>
  );
}

import Image from "next/image";
import { Flecha } from "./Icons";

/**
 * Banda de cierre: cielo a todo el ancho con el avión al frente, planeando
 * hacia el texto. Misma idea de capas que el hero.
 */
export default function Avion() {
  return (
    <section className="avion" aria-labelledby="avion-titulo">
      <div className="avion__cielo" aria-hidden />

      <div className="avion__nave" aria-hidden>
        <Image
          src="/avion.webp"
          alt=""
          width={1221}
          height={358}
          sizes="(max-width: 900px) 96vw, 58vw"
        />
      </div>

      <div className="wrap avion__cuerpo">
        <div className="avion__texto">
          <h2 id="avion-titulo">
            Tu carga,
            <br />
            en las mejores manos
          </h2>
          <p className="lede">
            Kilos, pallets o contenedores completos. Marítimo cuando el volumen
            manda, aéreo cuando manda el plazo.
          </p>
          <a href="#cotizar" className="avion__cta">
            Cotiza ahora
            <Flecha />
          </a>
        </div>
      </div>
    </section>
  );
}

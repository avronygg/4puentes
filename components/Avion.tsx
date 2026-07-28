import { Flecha } from "./Icons";

/**
 * Banda de cierre: cielo a todo el ancho con el avión al frente.
 *
 * PENDIENTE: falta el PNG del avión recortado (`/public/avion.webp`). Mientras
 * no esté, la banda funciona igual con el cielo y el texto. Al dejar el archivo
 * en public/, descomentar el bloque de abajo — la capa ya está montada igual
 * que el container del hero.
 */
export default function Avion() {
  return (
    <section className="avion" aria-labelledby="avion-titulo">
      <div className="avion__cielo" aria-hidden />

      {/* Cuando llegue el PNG del avión:
      <div className="avion__nave" aria-hidden>
        <Image src="/avion.webp" alt="" width={1200} height={600} sizes="(max-width:900px) 90vw, 55vw" />
      </div>
      */}

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

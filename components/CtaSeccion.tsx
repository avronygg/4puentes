import { whatsappUrl } from "@/lib/site";
import { Flecha, WhatsApp } from "./Icons";

/**
 * Cierre de sección con las dos salidas: cotizar o escribir por WhatsApp.
 *
 * Se repite en varias secciones a propósito. Antes había que llegar al pie o
 * volver arriba para dar el paso, y la decisión de contactar no ocurre siempre
 * en el mismo punto de la lectura.
 */
export default function CtaSeccion({
  texto,
  boton = "Cotizar mi importación",
  mensaje,
}: {
  texto: string;
  boton?: string;
  /** Mensaje con el que se abre WhatsApp; cambia según lo que se acaba de leer. */
  mensaje: string;
}) {
  return (
    <div className="cta-seccion">
      <p className="cta-seccion__texto">{texto}</p>
      <a href="#cotizar" className="cta-seccion__btn">
        {boton}
        <Flecha size={15} />
      </a>
      <a
        href={whatsappUrl(mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-seccion__wa"
      >
        <WhatsApp size={18} />
        Hablar por WhatsApp
      </a>
    </div>
  );
}

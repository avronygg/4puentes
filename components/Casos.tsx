import { casos } from "@/lib/contenido";
import Revelar from "./Revelar";
import { Comillas, Flecha, WhatsApp } from "./Icons";
import { whatsappUrl } from "@/lib/site";

export default function Casos() {
  return (
    <section className="section section--terra" id="casos">
      <div className="wrap">
        <Revelar className="section-head">
          <h2 data-revelar>
            <span className="suave">Lo que dicen los que</span>{" "}
            <em className="destacado">dejaron de comprar acá</em>
          </h2>
          <p className="lede" data-revelar>
            Empresas que ya compraban el mismo insumo en Chile y lo trajeron
            directo desde origen. <strong>Cada cifra es de un caso real</strong>,
            no un promedio de folleto.
          </p>
        </Revelar>

        <Revelar paso={120} className="casos">
          {casos.map((c) => (
            <article key={c.rubro} data-revelar className="caso">
              <Comillas className="caso__comillas" />

              <p className="caso__cifra">
                {c.cifra}
                <span className="caso__logro">{c.logro}</span>
              </p>

              <blockquote className="caso__cita">
                <p className={c.pendiente ? "tbd" : undefined}>{c.cita}</p>
              </blockquote>

              <footer className="caso__pie">
                <span className="caso__avatar" aria-hidden>
                  {c.iniciales}
                </span>
                <span className="min-w-0">
                  <span className={`caso__autor ${c.pendiente ? "tbd" : ""}`}>{c.autor}</span>
                  <span className="caso__cargo">
                    {c.cargo} · <span className={c.pendiente ? "tbd" : ""}>{c.empresa}</span>
                  </span>
                </span>
              </footer>

              <p className="caso__rubro">{c.rubro}</p>

              {/* Declarar el vínculo es la única forma de que el caso siga
                  siendo creíble si alguien lo descubre después. */}
              {c.propio && <p className="caso__aviso">Emprendimiento propio del equipo</p>}
            </article>
          ))}

          {/* Sexta tarjeta: cierra la rejilla de 3×2 y convierte el hueco en la
              salida de la sección. Sin ella queda un vacío en escritorio. */}
          <article data-revelar className="caso caso--marca">
            <p className="caso__marca-titulo">
              ¿El próximo caso <em className="destacado">es el tuyo?</em>
            </p>
            <p className="caso__marca-texto">
              Dinos qué compras hoy y cuánto pagas. Te decimos si trayéndolo
              directo te conviene, y si no, también.
            </p>
            <div className="caso__marca-acciones">
              <a href="#cotizar" className="caso__marca-btn">
                Comparar mi costo
                <Flecha size={15} />
              </a>
              <a
                href={whatsappUrl("Hola, quiero saber cuánto podría ahorrar trayendo mi insumo directo desde origen. Hoy lo compro en Chile.")}
                target="_blank"
                rel="noopener noreferrer"
                className="caso__marca-wa"
              >
                <WhatsApp size={18} />
                WhatsApp
              </a>
            </div>
          </article>
        </Revelar>
      </div>
    </section>
  );
}

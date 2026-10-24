import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import FormularioContacto from "@/components/landing/FormularioContacto";
import VideoLanding from "@/components/landing/VideoLanding";
import { Check, Flecha, Pin, Sobre, Telefono, WhatsApp } from "@/components/Icons";
import { contacto, whatsappUrl } from "@/lib/site";
import "./landing.css";

/**
 * /importa-sin-limites — landing de campaña, pensada para recibir el tráfico
 * del video "Importación atrapada".
 *
 * Es angosta a propósito: un solo mensaje (la carga atrapada en el puerto), un
 * solo formulario y una sola salida alternativa (WhatsApp). Sin menú: quien
 * llega desde un anuncio no necesita más caminos que el de cotizar.
 *
 * Los textos conservan la idea del video (atrapada en el puerto → gasto, flete
 * y espera → directo a las bodegas, logística descentralizada, más rápido y más
 * barato) pero con las palabras que la gente busca: importación, Valdivia, sur
 * de Chile, bodegaje, seguro de carga. Solo afirma lo que ya dice la web
 * principal: no hay plazos, precios ni cifras inventadas.
 */

export const viewport: Viewport = {
  themeColor: "#490704",
};

export const metadata: Metadata = {
  title: "Importación a Valdivia y el sur de Chile | Cuatro Puentes",
  description:
    "Importa desde cualquier parte del mundo con entrega directa en nuestras bodegas de Valdivia. Logística descentralizada, bodegaje y seguro de carga para el sur de Chile. Cotiza tu importación.",
  alternates: { canonical: "/importa-sin-limites" },
  // Página de campaña: cerrada a buscadores para no competir con la home
  // (mismos temas: importación, Valdivia, sur de Chile). Tampoco figura en el
  // sitemap. Para abrirla basta cambiar `index` a true y sumarla al sitemap.
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/importa-sin-limites",
    siteName: "Cuatro Puentes",
    title: "Importación a Valdivia y el sur de Chile",
    description:
      "Recibimos tu carga desde cualquier parte del mundo en bodegas de Valdivia. Logística descentralizada para el sur de Chile.",
    images: [
      { url: "/importa-sin-limites-poster.jpg", width: 720, height: 1280, alt: "Cuatro Puentes: importación directa a bodegas en Valdivia" },
    ],
  },
};

const MENSAJE_WA = "Hola 4 Puentes, vi su video y quiero cotizar una importación.";

const dolores = ["Costos extra en puerto", "Fletes que se acumulan", "Esperas por tu carga"] as const;

const diferencias = [
  {
    antes: "Carga retenida en el puerto",
    titulo: "Entrega directa en bodegas de Valdivia",
    texto:
      "Traemos tu importación desde cualquier parte del mundo directamente a nuestras bodegas, en el corazón del sur de Chile.",
  },
  {
    antes: "Gastos y fletes que se suman",
    titulo: "Una importación más económica",
    texto:
      "Con logística descentralizada reduces traslados y costos de flete hacia el sur del país.",
  },
  {
    antes: "Esperas que frenan tu negocio",
    titulo: "Una importación más rápida",
    texto:
      "Menos pasos entre el puerto y tu destino: tu mercadería llega antes a quienes la necesitan en el sur de Chile.",
  },
] as const;

const incluye = [
  {
    titulo: "Importación puerta a puerta",
    texto: "Nos encargamos del proceso completo, desde el origen hasta la entrega de tu carga.",
  },
  {
    titulo: "Bodegaje en Valdivia",
    texto: "Tu mercadería queda resguardada en nuestras bodegas, lista para distribuir en la zona sur.",
  },
  {
    titulo: "Seguro de carga incluido",
    texto: "Tu importación viaja protegida durante el traslado.",
  },
  {
    titulo: "Cobertura en el sur de Chile",
    texto: "Atendemos a empresas e importadores de Valdivia y de todo el sur del país.",
  },
] as const;

export default function ImportaSinLimites() {
  return (
    <div className="lp">
      <main>
        <section className="lp-hero">
          <div className="wrap">
            <header className="lp-top">
              <Link href="/" className="lp-top__logo" aria-label="Cuatro Puentes — sitio principal">
                <Image src="/logo-cuatro-puentes.webp" alt="Cuatro Puentes" width={132} height={129} priority />
              </Link>
              <a
                href={whatsappUrl(MENSAJE_WA)}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-pill-wa"
              >
                <WhatsApp size={18} />
                WhatsApp
              </a>
            </header>

            <div className="lp-hero__grid">
              <div>
                <p className="lp-eyebrow">Importación integral · Valdivia</p>
                <h1 className="lp-h1">
                  Importación al sur de Chile, <em>sin quedar atrapado en el puerto</em>
                </h1>

                <ul className="lp-dolores" aria-label="Problemas habituales de una importación detenida">
                  {dolores.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>

                {/* En celular el formulario queda debajo del texto: este botón
                    lo deja a un toque desde la primera pantalla. En escritorio
                    el formulario ya está al lado y no hace falta. */}
                <a href="#contacto" className="lp-ir-form">
                  Cotizar ahora
                  <Flecha className="lp-ir-form__flecha" />
                </a>

                <p className="lp-lede">
                  <strong>En Cuatro Puentes lo hacemos distinto.</strong> Gestionamos tu importación
                  desde cualquier parte del mundo y la entregamos directo en nuestras bodegas de
                  Valdivia.
                </p>
                <p className="lp-lede lp-lede--2">
                  Logística descentralizada para el sur de Chile:{" "}
                  <strong>más rápido y más económico</strong>.
                </p>
              </div>

              <FormularioContacto />
            </div>
          </div>
        </section>

        <section className="lp-confianza" aria-label="Qué incluye">
          <div className="wrap">
            <ul>
              <li>
                <Check size={18} />
                Bodegaje en Valdivia
              </li>
              <li>
                <Check size={18} />
                Seguro de carga incluido
              </li>
              <li>
                <Check size={18} />
                Importación puerta a puerta
              </li>
            </ul>
          </div>
        </section>

        <section className="lp-dif" aria-labelledby="lp-dif-titulo">
          <div className="wrap lp-dif__grid">
            <VideoLanding />

            <div>
              <h2 id="lp-dif-titulo">
                Importar con logística <span className="destacado">descentralizada</span>
              </h2>
              <ol className="lp-pasos">
                {diferencias.map((d, i) => (
                  <li key={d.titulo} className="lp-paso">
                    <span className="lp-paso__n" aria-hidden>
                      {i + 1}
                    </span>
                    <div>
                      <span className="lp-paso__antes">{d.antes}</span>
                      <h3>{d.titulo}</h3>
                      <p>{d.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="lp-incluye" aria-labelledby="lp-incluye-titulo">
          <div className="wrap">
            <h2 id="lp-incluye-titulo">Importación integral para empresas del sur de Chile</h2>
            <ul className="lp-incluye__lista">
              {incluye.map((i) => (
                <li key={i.titulo}>
                  <h3>{i.titulo}</h3>
                  <p>{i.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lp-cierre">
          <div className="wrap">
            <h2>Cotiza tu próxima importación a Valdivia y el sur de Chile</h2>
            <div className="lp-cierre__acciones">
              <a href="#contacto" className="lp-btn">
                Cotizar ahora
                <Flecha />
              </a>
              <a
                href={whatsappUrl(MENSAJE_WA)}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-btn lp-btn--claro"
              >
                <WhatsApp size={19} />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-pie">
        <div className="wrap lp-pie__in">
          <span>© {new Date().getFullYear()} Cuatro Puentes</span>
          <span className="lp-pie__datos">
            <a href={contacto.telefonoHref}>
              <Telefono size={15} />
              {contacto.telefono}
            </a>
            <a href={`mailto:${contacto.email}`}>
              <Sobre size={15} />
              {contacto.email}
            </a>
            <span>
              <Pin size={15} />
              {contacto.direccion}
            </span>
          </span>
          <Link href="/">Ver sitio completo</Link>
        </div>
      </footer>
    </div>
  );
}

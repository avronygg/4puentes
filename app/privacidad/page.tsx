import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BotonCookies from "@/components/BotonCookies";
import { contacto, legal, site } from "@/lib/site";

/**
 * /privacidad — política de privacidad y de cookies.
 *
 * Describe lo que el sitio hace HOY: el formulario de cotización envía los datos
 * por correo (Resend) y no los guarda en ninguna base; GA4 y el píxel de Meta
 * sólo se cargan si la persona acepta las cookies. Si eso cambia (por ejemplo,
 * al guardar leads en Supabase), este texto hay que actualizarlo junto con el
 * cambio, y mover `legal.actualizado` en lib/site.ts.
 */

export const metadata: Metadata = {
  title: "Política de privacidad | Cuatro Puentes",
  description:
    "Qué datos recoge Cuatro Puentes cuando cotizas una importación, para qué los usa, con quién los comparte y cómo manejar las cookies.",
  alternates: { canonical: "/privacidad" },
};

const cookies = [
  {
    nombre: "Preferencia de cookies",
    uso: "Recuerda si aceptaste o rechazaste las cookies, para no volver a preguntarte.",
    duracion: "Hasta que la cambies",
    tipo: "Necesaria",
  },
  {
    nombre: "Google Analytics (_ga, _ga_*)",
    uso: "Cuenta visitas y muestra qué páginas se usan, de forma agregada.",
    duracion: "Hasta 2 años",
    tipo: "Medición · solo si aceptas",
  },
  {
    nombre: "Meta (_fbp)",
    uso: "Mide cuántas personas que vieron un anuncio de Cuatro Puentes en Facebook o Instagram piden una cotización, y mejora a quién se le muestra.",
    duracion: "Hasta 3 meses",
    tipo: "Publicidad · solo si aceptas",
  },
] as const;

/** Resalta un texto que el cliente o su asesor aún deben confirmar. Mientras
 *  `legal.porRevisar` sea true se ve resaltado; al ponerlo en false, sale
 *  como texto normal. */
function Revisar({ children }: { children: React.ReactNode }) {
  return legal.porRevisar ? <mark className="legal__revisar">{children}</mark> : <>{children}</>;
}

export default function Privacidad() {
  return (
    <div className="legal">
      <header className="legal__top">
        <div className="wrap legal__top-in">
          <Link href="/" aria-label="Cuatro Puentes — sitio principal">
            <Image src="/logo-cuatro-puentes.webp" alt="Cuatro Puentes" width={88} height={86} priority />
          </Link>
          <Link href="/" className="legal__volver">
            Volver al sitio
          </Link>
        </div>
      </header>

      <main className="wrap legal__cuerpo">
        <p className="legal__eyebrow">Legal</p>
        <h1>Política de privacidad</h1>
        <p className="legal__fecha">Última actualización: {legal.actualizado}</p>

        <p>
          En {site.nombre} nos importa que sepas qué hacemos con tus datos. Esta página lo explica
          en palabras simples: qué recogemos cuando nos escribes o cotizas, para qué lo usamos, con
          quién lo compartimos y cómo puedes ejercer tus derechos.
        </p>

        <h2>1. Quién es responsable</h2>
        <p>
          {legal.razonSocial ?? site.nombre}
          {legal.rut ? `, RUT ${legal.rut}` : ""}, que opera como {site.nombre}, con domicilio en{" "}
          {contacto.direccion}. Puedes escribirnos a{" "}
          <a href={`mailto:${contacto.email}`}>{contacto.email}</a> o por WhatsApp y teléfono al{" "}
          <a href={contacto.telefonoHref}>{contacto.telefono}</a> por cualquier duda sobre tus datos.
        </p>

        <h2>2. Qué datos recogemos</h2>
        <ul>
          <li>
            <strong>Los que nos das en un formulario de cotización.</strong> En la página de campaña:
            tu nombre, tu WhatsApp o teléfono, tu correo (opcional) y qué quieres importar. En el
            formulario de la página principal, además, respondes preguntas sobre tu caso: tu
            situación (si ya importas, compras en Chile o estás partiendo), qué productos o insumos
            traes, cantidades y gasto aproximado, cada cuánto importas, desde dónde y lo que quieras
            agregar. Son datos de tu actividad comercial: responde solo lo que quieras compartir.
          </li>
          <li>
            <strong>Si nos escribes o llamas.</strong> Por WhatsApp o teléfono vemos tu número y lo
            que nos cuentes.
          </li>
          <li>
            <strong>De dónde llegaste</strong>, si venías de un anuncio: la campaña y el anuncio
            que te trajo (parámetros &quot;utm&quot;) y si el clic vino de Meta. Los usamos para saber
            qué publicidad funciona.
          </li>
          <li>
            <strong>Datos técnicos.</strong> El servidor registra tu dirección IP y datos del
            navegador para que el sitio funcione y para evitar el spam (por ejemplo, limitar envíos
            repetidos del formulario).
          </li>
          <li>
            <strong>Datos de navegación</strong>, solo si aceptas las cookies: páginas visitadas,
            tipo de dispositivo y navegador, y una identificación anónima de tu visita (ver
            sección 5).
          </li>
        </ul>

        <h2>3. Para qué los usamos</h2>
        <ul>
          <li>Responder tu solicitud de cotización y contactarte por WhatsApp, teléfono o correo.</li>
          <li>Preparar y dar seguimiento a la cotización y a una eventual importación.</li>
          <li>
            Medir y mejorar nuestra publicidad y nuestro sitio (solo con las cookies aceptadas).
          </li>
          <li>Proteger el sitio del spam y de usos abusivos.</li>
        </ul>
        <p>
          <Revisar>
            No vendemos tus datos ni los usamos para nada distinto de lo anterior. No te enviaremos
            publicidad ni boletines que no hayas pedido.
          </Revisar>
        </p>
        <p>
          <Revisar>
            Podemos tratar tus datos porque tú nos los entregas para pedir una cotización (sin ellos
            no podríamos responderte), porque nos das tu consentimiento (las cookies de medición y
            publicidad) y porque tenemos un interés legítimo en proteger el sitio del spam.
          </Revisar>
        </p>

        <h2>4. Con quién los compartimos</h2>
        <p>Usamos servicios de terceros para operar el sitio. Cada uno recibe solo lo necesario:</p>
        <ul>
          <li>
            <strong>Resend</strong>: envía a nuestro equipo el correo con los datos de tu
            cotización.
          </li>
          <li>
            <strong>Rackspace</strong>: aloja nuestro correo electrónico, donde se reciben y
            guardan esas solicitudes.
          </li>
          <li>
            <strong>Vercel</strong>: aloja el sitio y registra datos técnicos del servidor (como la
            dirección IP).
          </li>
          <li>
            <strong>WhatsApp (Meta)</strong>: si nos escribes por ahí, tu conversación pasa por
            WhatsApp, que tiene sus propias condiciones de privacidad.
          </li>
          <li>
            <strong>Google Analytics</strong> y <strong>Meta</strong> (Facebook e Instagram): solo
            si aceptas las cookies.
          </li>
        </ul>
        <p>
          Algunos de estos proveedores están fuera de Chile (por ejemplo, en Estados Unidos), por lo
          que tus datos pueden tratarse en otros países. Cada proveedor aplica sus propias políticas
          de protección de datos.
        </p>

        <h2 id="cookies">5. Cookies</h2>
        <p>
          Las cookies de medición y de publicidad <strong>no se cargan hasta que las aceptas</strong>.
          Si las rechazas, el sitio funciona igual. Estas son todas las que usamos:
        </p>
        <ul className="legal__cookies">
          {cookies.map((c) => (
            <li key={c.nombre}>
              <strong>{c.nombre}</strong>
              <span>{c.uso}</span>
              <em>
                {c.tipo} · {c.duracion}
              </em>
            </li>
          ))}
        </ul>
        <p>
          Puedes cambiar tu decisión cuando quieras:{" "}
          <BotonCookies className="legal__enlace-btn" />. También puedes borrar las cookies desde la
          configuración de tu navegador.
        </p>

        <h2>6. Cuánto tiempo guardamos tus datos</h2>
        <p>
          Guardamos los datos de tu cotización{" "}
          <Revisar>hasta 24 meses desde tu último contacto con nosotros</Revisar>, salvo que
          debamos conservarlos más tiempo por una obligación legal o por una importación en curso.
          Después los eliminamos o los dejamos anónimos.
        </p>

        <h2>7. Tus derechos</h2>
        <p>
          Conforme a la ley chilena de protección de datos personales, puedes pedirnos acceder a tus
          datos, corregirlos, eliminarlos, oponerte a su uso, limitar su tratamiento, recibirlos en
          un formato que puedas llevar a otro servicio (portabilidad) y no ser objeto de decisiones
          basadas solo en tratamientos automatizados.
        </p>
        <p>
          Escríbenos a <a href={`mailto:${contacto.email}`}>{contacto.email}</a> indicando qué
          necesitas y desde qué correo o teléfono nos contactaste. Te responderemos{" "}
          <Revisar>dentro de 30 días corridos</Revisar>. Si no quedas conforme con nuestra
          respuesta, puedes reclamar ante la Agencia de Protección de Datos Personales.
        </p>

        <h2>8. Cambios en esta política</h2>
        <p>
          Si cambiamos cómo tratamos tus datos, actualizaremos esta página y la fecha de arriba.
        </p>
      </main>

      <footer className="legal__pie">
        <div className="wrap legal__pie-in">
          <span>© {new Date().getFullYear()} Cuatro Puentes</span>
          <BotonCookies className="legal__enlace-btn legal__enlace-btn--claro" />
        </div>
      </footer>
    </div>
  );
}

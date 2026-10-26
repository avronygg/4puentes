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
            <strong>Los que nos das tú</strong> en el formulario de cotización: tu nombre, tu
            WhatsApp o teléfono, tu correo (opcional) y lo que quieres importar. Si nos escribes por
            WhatsApp, vemos tu número y lo que nos cuentes en el chat.
          </li>
          <li>
            <strong>De dónde llegaste</strong>, si venías de un anuncio: la campaña y el anuncio
            que te trajo (parámetros &quot;utm&quot;) y si el clic vino de Meta. Los usamos para saber
            qué publicidad funciona.
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
        </ul>
        <p>No vendemos tus datos ni los usamos para nada distinto de lo anterior.</p>

        <h2>4. Con quién los compartimos</h2>
        <p>Usamos servicios de terceros para operar el sitio. Cada uno recibe solo lo necesario:</p>
        <ul>
          <li>
            <strong>Resend</strong>: envía a nuestro equipo el correo con los datos de tu
            cotización.
          </li>
          <li>
            <strong>Vercel</strong>: aloja el sitio y registra datos técnicos del servidor (como la
            dirección IP) para que funcione y para prevenir abusos.
          </li>
          <li>
            <strong>Google Analytics</strong> y <strong>Meta</strong> (Facebook e Instagram): solo
            si aceptas las cookies.
          </li>
        </ul>
        <p>
          Algunos de estos proveedores están fuera de Chile, por lo que tus datos pueden tratarse en
          otros países.
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
          Guardamos los datos de tu cotización solo el tiempo necesario para atenderla y para la
          relación comercial que pueda venir después. Cuando ya no los necesitemos, los eliminamos.
        </p>

        <h2>7. Tus derechos</h2>
        <p>
          Conforme a la ley chilena de protección de datos personales, puedes pedirnos acceder a tus
          datos, corregirlos, eliminarlos, oponerte a su uso o pedir que dejemos de tratarlos.
          Escríbenos a <a href={`mailto:${contacto.email}`}>{contacto.email}</a> indicando qué
          necesitas y desde qué correo o teléfono nos contactaste, y te responderemos a la
          brevedad.
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

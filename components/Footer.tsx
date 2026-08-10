import Image from "next/image";
import { servicios as servicioCards } from "@/lib/contenido";
import { contacto, navLinks, whatsappUrl } from "@/lib/site";
import { Flecha, Pin, Sobre, Telefono, WhatsApp } from "./Icons";

// Los mismos tres servicios de la sección, no una lista de capacidades: antes
// el pie ofrecía otros nombres y los tres apuntaban al mismo ancla. Enlazan al
// cotizador con el perfil marcado, igual que las tarjetas.
const servicios = servicioCards.map((s) => ({
  href: `/?perfil=${s.perfil}#cotizar`,
  label: s.titulo,
}));

export default function Footer() {
  return (
    <footer className="pie">
      {/* Remate de conversión antes de los datos: el pie es el último lugar donde
          alguien que bajó todo puede dar el paso. */}
      <div className="wrap">
        <div className="pie__remate">
          <div>
            <h2 className="text-[clamp(1.6rem,1.1rem+1.7vw,2.3rem)] text-white">
              ¿Traemos tu próxima carga?
            </h2>
            <p className="mt-s4 mb-0 max-w-[46ch] text-[1rem] leading-[1.6] text-foot-fg-muted">
              Cuéntanos qué necesitas y te entregamos un costo total puesto en tu
              bodega.
            </p>
          </div>
          <div className="pie__acciones">
            <a href="#cotizar" className="pie__cta">
              Cotizar mi importación
              <Flecha />
            </a>
            <a
              href={whatsappUrl("Hola, quiero cotizar una importación puerta a puerta. ¿Me ayudan a ver si me conviene?")}
              target="_blank"
              rel="noopener noreferrer"
              className="pie__whatsapp"
            >
              <WhatsApp size={19} />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="pie__rejilla">
          <div>
            <Image
              src="/logo-cuatro-puentes.webp"
              alt="Cuatro Puentes"
              width={88}
              height={86}
              className="mb-s5 h-auto w-[88px]"
            />
            <p className="m-0 max-w-[34ch] text-[0.93rem] leading-[1.65] text-foot-fg-muted">
              Importación integral, bodegaje y seguros para empresas del sur de
              Chile. Del mundo a tu bodega.
            </p>
          </div>

          <div>
            <h3 className="pie__titulo">Servicios</h3>
            <ul className="m-0 grid list-none gap-s2 p-0">
              {servicios.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="pie__enlace">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="pie__titulo">Navegación</h3>
            <ul className="m-0 grid list-none gap-s2 p-0">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="pie__enlace">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="pie__titulo">Contacto</h3>
            <ul className="m-0 grid list-none gap-s2 p-0">
              <li>
                <a
                  href={contacto.telefonoHref}
                  className="pie__enlace pie__enlace--icono"
                >
                  <Telefono size={16} className="shrink-0 text-terra-400" />
                  {contacto.telefono}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contacto.email}`}
                  className="tbd pie__enlace pie__enlace--icono"
                  title="Por confirmar"
                >
                  <Sobre size={16} className="shrink-0 text-terra-400" />
                  {contacto.email}
                </a>
              </li>
              <li className="pie__enlace pie__enlace--icono pie__enlace--plano">
                <Pin size={16} className="shrink-0 text-terra-400" />
                <span className="tbd" title="Por confirmar">
                  {contacto.direccion}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pie__legal">
          <span>
            © {new Date().getFullYear()} Cuatro Puentes · Todos los derechos
            reservados
          </span>
          <span className="pie__firma">Main Brain</span>
        </div>
      </div>
    </footer>
  );
}

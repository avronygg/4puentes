import Image from "next/image";
import { contacto } from "@/lib/site";

const servicios = [
  { href: "#servicios", label: "Importación integral" },
  { href: "#servicios", label: "Bodegaje" },
  { href: "#servicios", label: "Seguros de carga" },
  { href: "#proceso", label: "Cómo funciona" },
];

export default function Footer() {
  return (
    <footer className="bg-foot-bg py-s9 text-foot-fg">
      <div className="wrap">
        <div className="grid grid-cols-[1.6fr_1fr_1fr] items-start gap-s8 max-[820px]:grid-cols-2 max-[820px]:gap-s7 max-[520px]:grid-cols-1">
          <div>
            <Image
              src="/logo.webp"
              alt="Cuatro Puentes"
              width={88}
              height={86}
              className="mb-s5 w-[88px]"
            />
            <p className="m-0 max-w-[36ch] text-[0.93rem] leading-[1.65] text-foot-fg-muted">
              Importación integral, bodegaje y seguros para empresas del sur de
              Chile. Desde Valdivia al mundo.
            </p>
          </div>

          <div>
            <h4 className="mb-s5 text-[0.82rem] font-semibold text-foot-fg">
              Servicios
            </h4>
            <ul className="m-0 grid list-none gap-s3 p-0">
              {servicios.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-[0.93rem] text-foot-fg-muted no-underline hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-s5 text-[0.82rem] font-semibold text-foot-fg">
              Contacto
            </h4>
            <ul className="m-0 grid list-none gap-s3 p-0 text-[0.93rem] text-foot-fg-muted">
              <li>
                <a
                  href={contacto.telefonoHref}
                  className="tbd text-foot-fg-muted no-underline hover:text-white"
                  title="Por confirmar"
                >
                  {contacto.telefono}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contacto.email}`}
                  className="tbd text-foot-fg-muted no-underline hover:text-white"
                  title="Por confirmar"
                >
                  {contacto.email}
                </a>
              </li>
              <li>
                <span className="tbd" title="Por confirmar">
                  {contacto.direccion}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-s8 flex flex-wrap justify-between gap-s4 border-t border-terra-300/20 pt-s5 text-[0.81rem] text-foot-fg-muted">
          <span>
            © {new Date().getFullYear()} Cuatro Puentes · Todos los derechos
            reservados
          </span>
          <span>Main Brain</span>
        </div>
      </div>
    </footer>
  );
}

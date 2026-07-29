"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Envoltorio de aparición por scroll. En vez de un componente por tarjeta,
 * observa a todos los descendientes marcados con `data-revelar` y los va
 * mostrando. El escalonado se calcula por tanda: los que entran juntos en
 * pantalla se ordenan entre ellos, así el retardo no crece indefinidamente
 * cuando alguien cae a mitad de la página desde un enlace.
 *
 * El estado oculto vive en CSS (`[data-revelar]` en globals.css) y hay un
 * respaldo en <noscript> para que sin JavaScript el contenido se vea igual.
 */
export default function Revelar({
  children,
  className,
  paso = 110,
}: {
  children: ReactNode;
  className?: string;
  /** Milisegundos entre un elemento y el siguiente de la misma tanda. */
  paso?: number;
}) {
  const cont = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = cont.current;
    if (!raiz) return;

    const items = Array.from(raiz.querySelectorAll<HTMLElement>("[data-revelar]"));
    if (!items.length) return;

    const mostrar = (el: HTMLElement, retardo: number) => {
      el.style.transitionDelay = `${retardo}ms`;
      el.classList.add("es-visible");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => mostrar(el, 0));
      return;
    }

    const io = new IntersectionObserver(
      (entradas) => {
        const tanda = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => items.indexOf(a.target as HTMLElement) - items.indexOf(b.target as HTMLElement));

        tanda.forEach((e, i) => {
          mostrar(e.target as HTMLElement, i * paso);
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [paso]);

  return (
    <div ref={cont} className={className}>
      {children}
    </div>
  );
}

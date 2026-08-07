"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Flecha, Globo } from "./Icons";

export default function Hero() {
  const hero = useRef<HTMLElement>(null);
  const sky = useRef<HTMLDivElement>(null);
  const ship = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  // Parallax: el cielo va lento, el container rápido. Se salta si el visitante
  // pidió menos movimiento.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;

    const frame = () => {
      ticking = false;
      const h = hero.current?.offsetHeight ?? 1;
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);
      if (sky.current)
        sky.current.style.transform = `translate3d(0,${p * 10}%,0) scale(${1 + p * 0.07})`;
      if (ship.current) {
        ship.current.style.transform = `translate3d(0,${-p * 28}%,0)`;
        ship.current.style.opacity = String(Math.max(0, 1 - p * 1.25));
      }
      if (content.current) {
        content.current.style.transform = `translate3d(0,${p * 30}px,0)`;
        content.current.style.opacity = String(Math.max(0, 1 - p * 1.5));
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="hero" id="inicio" ref={hero}>
      {/* capa 1 — cielo */}
      <div className="hero__sky" ref={sky} aria-hidden />

      {/* capa 3 — container, delante del texto */}
      <div className="hero__ship" ref={ship} aria-hidden>
        <div className="hero__hang">
          <div className="hero__bob">
            {/* En vertical va otro render, con los cables largos: entran por el
                borde de arriba en vez de aparecer cortados a media pantalla. */}
            <picture>
              <source media="(max-width: 900px)" srcSet="/container-movil.webp" />
              <Image
                src="/container.webp"
                alt=""
                width={766}
                height={907}
                priority
                quality={90}
                sizes="45vw"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* capa 2 — texto */}
      <div className="wrap hero__body">
        <div className="hero__content" ref={content}>
          <p className="order-0 m-0 mb-s5 font-mono text-[0.66rem] font-semibold tracking-[0.24em] text-white/90 uppercase">
            Valdivia · Todo el sur de Chile
          </p>

          <h1 className="order-1">
            {/* El espacio explícito importa: sin él JSX pega las dos líneas y
                el titular se anuncia como "Importaciónsin límites". */}
            <span className="block text-white">Importación</span>{" "}
            <span className="block text-terra-400">sin límites</span>
          </h1>

          {/* Empuja el copy bajo el container en vertical. */}
          <div className="order-2 hidden max-[900px]:block max-[900px]:min-h-[min(40vh,340px)] max-[900px]:flex-auto" />

          <p className="order-3 mt-s6 max-w-[34ch] text-[clamp(1rem,0.95rem+0.38vw,1.14rem)] leading-[1.58] text-[#edf5fc] max-[900px]:mt-0 max-[900px]:max-w-[38ch]">
            Te asesoramos y gestionamos tu importación desde cualquier parte del
            mundo.
            {/* En vertical el copy se queda en dos líneas: la segunda frase sólo
                aparece de tablet para arriba. */}
            <span className="max-[900px]:hidden">
              {" "}
              Tú solo nos dices qué necesitas; nosotros te lo dejamos en tu bodega.
            </span>
          </p>

          <div className="order-4 mt-s7 flex flex-wrap items-center gap-s5 gap-x-s6 max-[900px]:justify-center">
            <a
              href="#cotizar"
              className="inline-flex shrink-0 items-center justify-center gap-s3 rounded-[10px] bg-accent-btn px-7 py-[15px] text-[1rem] font-semibold text-white no-underline transition-[background,transform] hover:-translate-y-px hover:bg-accent-btn-hover"
            >
              Cotizar mi importación
              <Flecha />
            </a>
          </div>
        </div>
      </div>

      {/* Sello de alcance. Reemplaza a la línea suelta que iba junto al botón:
          el dato es el que más pesa comercialmente y perdido al lado del CTA no
          se leía. Va estampado sobre el cielo, como un timbre de aduana. */}
      <div className="sello" aria-label="Importamos desde todo el mundo">
        <Globo size={22} className="sello__globo" aria-hidden />
        <span className="sello__sobre">Importamos desde</span>
        <strong className="sello__foco">
          Todo el<br />
          mundo
        </strong>
        <span className="sello__marca">Cuatro Puentes</span>
      </div>
    </section>
  );
}

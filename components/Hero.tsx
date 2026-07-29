"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Auricular, Bodega, Escudo, Flecha, Globo, GloboFino } from "./Icons";

const confianza = [
  { Icono: Globo, texto: "Cobertura global" },
  { Icono: Escudo, texto: "Carga asegurada" },
  { Icono: Bodega, texto: "Bodegaje incluido" },
  { Icono: Auricular, texto: "Atención personalizada" },
];

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
      {/* velo que separa cada línea del titular de su fondo */}
      <div className="hero__scrim" aria-hidden />

      {/* capa 3 — container, delante del texto */}
      <div className="hero__ship" ref={ship} aria-hidden>
        <div className="hero__hang">
          <div className="hero__bob">
            <Image
              src="/container.webp"
              alt=""
              width={766}
              height={907}
              priority
              sizes="(max-width: 900px) 66vw, 45vw"
            />
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
            <span className="block text-white">Importación</span>
            <span className="block text-[#9C403B]">sin límites</span>
          </h1>

          {/* Empuja el copy bajo el container en vertical. */}
          <div className="order-2 hidden max-[900px]:block max-[900px]:min-h-[min(40vh,340px)] max-[900px]:flex-auto" />

          <p className="order-3 mt-s6 max-w-[33ch] text-[clamp(1rem,0.95rem+0.38vw,1.14rem)] leading-[1.58] text-[#edf5fc] [text-shadow:0_1px_12px_rgba(4,32,60,.45)] max-[900px]:mt-0 max-[900px]:max-w-[38ch]">
            Traemos tu carga desde China y Medio Oriente hasta tu bodega.
            Nosotros hacemos todo el proceso.
          </p>

          <div className="order-4 mt-s7 flex flex-wrap items-center gap-s5 gap-x-s6">
            <a
              href="#cotizar"
              className="inline-flex shrink-0 items-center justify-center gap-s3 rounded-[10px] bg-accent-btn px-7 py-[15px] text-[1rem] font-semibold text-white no-underline transition-[background,transform] hover:-translate-y-px hover:bg-accent-btn-hover"
            >
              Cotizar mi importación
              <Flecha />
            </a>
            <p className="m-0 flex items-center gap-s3 text-[0.87rem] leading-[1.35] font-medium text-white [text-shadow:0_1px_10px_rgba(4,32,60,.5)]">
              <GloboFino className="shrink-0 opacity-85" />
              <span className="max-w-[22ch]">Importamos desde todo el mundo</span>
            </p>
          </div>
        </div>
      </div>

      {/* franja de confianza */}
      <div className="absolute inset-x-0 bottom-0 z-3 border-t border-white/20 bg-gradient-to-t from-[rgba(6,40,74,.4)] to-transparent max-[900px]:hidden">
        <div className="wrap">
          <ul className="flex list-none justify-between gap-s5 p-0 py-s5">
            {confianza.map(({ Icono, texto }) => (
              <li
                key={texto}
                className="flex items-center gap-s3 text-[0.87rem] font-medium text-white [text-shadow:0_1px_10px_rgba(4,32,60,.5)]"
              >
                <Icono className="shrink-0 opacity-90" />
                {texto}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

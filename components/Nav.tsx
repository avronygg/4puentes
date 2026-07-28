"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";
import { Cerrar, Menu } from "./Icons";

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-100 transition-[background,box-shadow] duration-300 ${
          stuck
            ? "bg-bg/90 shadow-[0_1px_0_var(--line)] backdrop-blur-md backdrop-saturate-150"
            : ""
        }`}
      >
        <div
          className={`wrap flex items-center gap-s6 transition-[padding] duration-300 ${
            stuck ? "py-s4" : "py-s5"
          }`}
        >
          <a href="#inicio" aria-label="4 Puentes — inicio" className="shrink-0">
            <Image
              src="/logo.webp"
              alt="Cuatro Puentes"
              width={72}
              height={70}
              priority
              className={`w-[72px] transition-[filter] duration-300 ${
                stuck ? "brightness-0 dark:brightness-100" : ""
              }`}
            />
          </a>

          <ul className="ml-auto hidden list-none gap-s7 p-0 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`group relative py-s2 text-[0.83rem] font-medium tracking-[0.09em] uppercase no-underline ${
                    stuck ? "text-fg" : "text-white"
                  }`}
                >
                  {l.label}
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-terra-400 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#cotizar"
            className="hidden rounded-[10px] bg-accent-btn px-5 py-[11px] text-[0.83rem] font-semibold text-white no-underline transition-colors hover:bg-accent-btn-hover lg:inline-flex"
          >
            Cotiza ahora
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            className={`ml-auto cursor-pointer border-0 bg-transparent p-s2 lg:hidden ${
              stuck || open ? "text-fg" : "text-white"
            }`}
          >
            {open ? <Cerrar /> : <Menu />}
          </button>
        </div>
      </header>

      <nav
        id="menu-movil"
        aria-label="Menú principal"
        className={`fixed inset-0 z-99 grid content-center gap-0 bg-foot-bg px-s6 transition-transform duration-[420ms] ease-[cubic-bezier(.6,.05,.2,1)] lg:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="border-b border-terra-300/20 py-s5 text-[clamp(1.45rem,6vw,2rem)] font-semibold tracking-[-0.025em] text-foot-fg no-underline"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#cotizar"
          onClick={() => setOpen(false)}
          className="mt-s7 justify-self-start rounded-[10px] bg-accent-btn px-7 py-[15px] font-semibold text-white no-underline"
        >
          Cotiza ahora
        </a>
      </nav>
    </>
  );
}

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
      {/* Arriba del todo va transparente y a lo ancho; al bajar se recoge en una
          píldora centrada con vidrio esmerilado. */}
      <header className={`nav ${stuck ? "is-stuck" : ""}`}>
        <div className="nav__in">
          <a href="#inicio" aria-label="4 Puentes — inicio" className="nav__logo">
            <Image src="/logo.webp" alt="Cuatro Puentes" width={72} height={70} priority />
          </a>

          <ul className="nav__links">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>
                  {l.label}
                  <span className="nav__sub" />
                </a>
              </li>
            ))}
          </ul>

          <a href="#cotizar" className="nav__cta">
            Cotiza ahora
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="nav__toggle"
          >
            {open ? <Cerrar /> : <Menu />}
          </button>
        </div>
      </header>

      <nav
        id="menu-movil"
        aria-label="Menú principal"
        className={`menu ${open ? "is-open" : ""}`}
      >
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#cotizar" onClick={() => setOpen(false)} className="menu__cta">
          Cotiza ahora
        </a>
      </nav>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";
import { WhatsApp } from "./Icons";

export default function WhatsAppFab() {
  // El botón flotante se solapaba con el CTA del hero: en vertical los dos caen
  // en la misma esquina y el toque se iba a WhatsApp en vez de a "Cotizar".
  // Aparece recién al dejar atrás el hero, que ya tiene su propio CTA.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href={whatsappUrl("Hola, vengo de la web de Cuatro Puentes. Quiero cotizar una importación y saber cuánto me costaría puesta en mi bodega.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-s5 bottom-s5 z-90 grid h-[54px] w-[54px] place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_22px_-8px_rgba(37,211,102,.7)] transition-[transform,opacity] duration-300 hover:scale-105 ${
        visible ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
      }`}
    >
      <WhatsApp />
    </a>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fundador } from "@/lib/contenido";
import { whatsappUrl } from "@/lib/site";
import { Cerrar, Flecha, WhatsApp } from "./Icons";

const SALUDO = "¿Te ayudo con tu importación?";

/**
 * Asesor flotante. Reemplaza al botón suelto de WhatsApp porque un ícono verde
 * en una esquina no dice nada; una persona ofreciendo ayuda sí.
 *
 * Aparece recién al dejar atrás el hero: ahí abajo está el CTA principal y el
 * botón le robaba los toques. El saludo asoma una sola vez y se retira solo, y
 * si alguien lo cierra no vuelve en toda la sesión.
 */
export default function Asesor() {
  const [visible, setVisible] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [saludo, setSaludo] = useState(false);
  const [descartado, setDescartado] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);

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

  // El saludo asoma un rato después de que el asesor entra en pantalla, no de
  // inmediato: interrumpir la lectura apenas aparece se siente invasivo.
  useEffect(() => {
    if (!visible || descartado || abierto) return;
    const entra = setTimeout(() => setSaludo(true), 2600);
    const sale = setTimeout(() => setSaludo(false), 12000);
    return () => {
      clearTimeout(entra);
      clearTimeout(sale);
    };
  }, [visible, descartado, abierto]);

  // Escape cierra y devuelve el foco al botón, como cualquier diálogo.
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        panel.current &&
        !panel.current.contains(e.target as Node) &&
        !boton.current?.contains(e.target as Node)
      ) {
        setAbierto(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [abierto]);

  const cerrarSaludo = () => {
    setSaludo(false);
    setDescartado(true);
  };

  return (
    <div className={`asesor ${visible ? "esta-visible" : ""}`}>
      {saludo && !abierto && (
        <div className="asesor__saludo">
          <button
            type="button"
            onClick={cerrarSaludo}
            className="asesor__saludo-cerrar"
            aria-label="Cerrar el mensaje"
          >
            <Cerrar size={13} />
          </button>
          <span className="asesor__saludo-quien">{fundador.nombre.split(" ")[0]}</span>
          <p>{SALUDO}</p>
        </div>
      )}

      {abierto && (
        <div
          ref={panel}
          className="asesor__panel"
          role="dialog"
          aria-label="Hablar con un asesor"
        >
          <div className="asesor__cabecera">
            <span className="asesor__retrato">
              <Image src="/fundador-avatar.webp" alt="" width={240} height={240} />
            </span>
            <span className="min-w-0">
              <span className="asesor__nombre">{fundador.nombre}</span>
              <span className="asesor__estado">
                <i aria-hidden />
                Suele responder en minutos
              </span>
            </span>
          </div>

          <p className="asesor__texto">
            Cuéntame qué necesitas traer y te digo con franqueza si te conviene.
          </p>

          <a
            href={whatsappUrl(
              "Hola, vengo de la web de Cuatro Puentes. Quiero hablar sobre una importación.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="asesor__wa"
            onClick={() => setAbierto(false)}
          >
            <WhatsApp size={19} />
            <span>
              Hablar por WhatsApp
              <small>Respuesta directa, sin formularios</small>
            </span>
          </a>

          <a href="#cotizar" className="asesor__cotizar" onClick={() => setAbierto(false)}>
            <span>
              Cotizar ahora
              <small>Unas pocas preguntas y te respondo</small>
            </span>
            <Flecha size={15} />
          </a>
        </div>
      )}

      <button
        ref={boton}
        type="button"
        className="asesor__boton"
        onClick={() => {
          setAbierto((v) => !v);
          setSaludo(false);
        }}
        aria-expanded={abierto}
        aria-label={abierto ? "Cerrar" : "Hablar con un asesor"}
        tabIndex={visible ? 0 : -1}
      >
        {abierto ? (
          <span className="asesor__cara asesor__cara--cerrar">
            <Cerrar size={22} />
          </span>
        ) : (
          <>
            <span className="asesor__cara">
              <Image src="/fundador-avatar.webp" alt="" width={240} height={240} />
            </span>
            <span className="asesor__punto" aria-hidden />
          </>
        )}
      </button>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * El video de la campaña. Arranca solo y en silencio —los subtítulos van
 * quemados en el propio video, así que se entiende sin audio— y deja activar el
 * sonido con un toque. Con `prefers-reduced-motion` no arranca solo.
 *
 * No lleva `autoPlay`: con él el navegador baja los 3,4 MB apenas abre la
 * página, aunque el video esté más abajo, y en datos móviles eso le quita
 * ancho de banda al hero. Arranca recién cuando se acerca a la pantalla.
 */
export default function VideoLanding() {
  const video = useRef<HTMLVideoElement>(null);
  const [mudo, setMudo] = useState(true);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;

    const arrancar = () => {
      // Sin arranque automático queda el botón de reproducir a la vista.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPausado(true);
      else v.play().catch(() => setPausado(true));
    };

    if (!("IntersectionObserver" in window)) {
      arrancar();
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        arrancar();
      },
      { rootMargin: "200px 0px" },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  const alternarReproduccion = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const alternarSonido = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMudo(v.muted);
    // Quien pide sonido quiere ver el video desde el principio.
    if (!v.muted && v.currentTime > 0.5 && v.paused) void v.play();
  };

  return (
    <div className="lp-video">
      <video
        ref={video}
        src="/importa-sin-limites.mp4"
        poster="/importa-sin-limites-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-label="Video: ¿Tu importación quedó atrapada en el puerto? Así traemos tu carga directamente a nuestras bodegas."
        onClick={alternarReproduccion}
        onPlay={() => setPausado(false)}
        onPause={() => setPausado(true)}
      />

      {pausado && (
        <button
          type="button"
          className="lp-video__play"
          onClick={alternarReproduccion}
          aria-label="Reproducir video"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden fill="currentColor">
            <path d="M8 5.5v13a1 1 0 001.5.86l11-6.5a1 1 0 000-1.72l-11-6.5A1 1 0 008 5.5z" />
          </svg>
        </button>
      )}

      <button
        type="button"
        className="lp-video__sonido"
        onClick={alternarSonido}
        aria-pressed={!mudo}
        aria-label={mudo ? "Activar sonido" : "Silenciar"}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H3v6h3l5 4V5z" />
          {mudo ? <path d="M22 9l-6 6M16 9l6 6" /> : <path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />}
        </svg>
        {mudo ? "Activar sonido" : "Sonido activado"}
      </button>
    </div>
  );
}

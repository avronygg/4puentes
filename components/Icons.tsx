type P = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor" as const,
  "aria-hidden": true,
});

export const Globo = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.6} className={className}>
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="3.9" ry="9" />
    <path d="M3 12h18" />
  </svg>
);

export const Escudo = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.6} strokeLinejoin="round" className={className}>
    <path d="M12 3l7.5 3v5.4c0 4.5-3.1 8.2-7.5 9.6-4.4-1.4-7.5-5.1-7.5-9.6V6z" />
    <path d="M9 12l2.2 2.2L15.4 10" strokeLinecap="round" />
  </svg>
);

export const Bodega = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.6} strokeLinejoin="round" className={className}>
    <path d="M3 10.2L12 4l9 6.2V20a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
    <path d="M8 21v-6h8v6" />
  </svg>
);

export const Auricular = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 13v-1a8 8 0 0116 0v1" />
    <path d="M4 13h2.4a1 1 0 011 1v3.4a1 1 0 01-1 1H5.4A1.4 1.4 0 014 17V13z" />
    <path d="M20 13h-2.4a1 1 0 00-1 1v3.4a1 1 0 001 1h1a1.4 1.4 0 001.4-1.4z" />
  </svg>
);

export const Check = ({ size = 14, className }: P) => (
  <svg {...base(size)} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const Flecha = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Telefono = ({ size = 19, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 5.5A1.5 1.5 0 015.5 4h2.3a1 1 0 01.96.73l1 3.4a1 1 0 01-.5 1.16l-1.5.77a12.5 12.5 0 006.18 6.18l.77-1.5a1 1 0 011.16-.5l3.4 1a1 1 0 01.73.96v2.3A1.5 1.5 0 0118.5 20 14.5 14.5 0 014 5.5z" />
  </svg>
);

export const Sobre = ({ size = 19, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5l8.5 6 8.5-6" />
  </svg>
);

export const Pin = ({ size = 19, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const Menu = ({ size = 26, className }: P) => (
  <svg {...base(size)} strokeWidth={2} strokeLinecap="round" className={className}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const Cerrar = ({ size = 26, className }: P) => (
  <svg {...base(size)} strokeWidth={2} strokeLinecap="round" className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const GloboFino = ({ size = 28, className }: P) => (
  <svg {...base(size)} strokeWidth={1.3} className={className}>
    <circle cx="12" cy="12" r="9.2" />
    <ellipse cx="12" cy="12" rx="4" ry="9.2" />
    <path d="M3 12h18M4.6 7h14.8M4.6 17h14.8" />
  </svg>
);

/* ── íconos del mapa de procesos ───────────────────────────────────── */

export const Calculadora = ({ size = 24, className }: P) => (
  <svg {...base(size)} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="2.8" width="16" height="18.4" rx="2.4" />
    <rect x="7" y="6" width="10" height="3.6" rx="1" />
    <path d="M7.6 13h.01M12 13h.01M16.4 13h.01M7.6 17h.01M12 17h.01M16.4 17h.01" strokeWidth={2.4} />
  </svg>
);

export const Lupa = ({ size = 24, className }: P) => (
  <svg {...base(size)} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="10.6" cy="10.6" r="6.4" />
    <path d="M15.4 15.4L21 21" strokeWidth={1.9} />
    <path d="M8 10.6l1.9 1.9 3.4-3.6" />
  </svg>
);

/* Portacontenedores: casco trapezoidal, tres contenedores apilados y el oleaje
   debajo. El dibujo anterior salía como una fuente. */
export const Barco = ({ size = 24, className }: P) => (
  <svg {...base(size)} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.9 16.6l1.4-3.6h15.4l-2.1 3.6z" />
    <rect x="6" y="8.8" width="3.3" height="4.2" />
    <rect x="10.1" y="6.6" width="3.3" height="6.4" />
    <rect x="14.2" y="9.6" width="2.9" height="3.4" />
    <path d="M2.6 19.6c1.4 0 1.4-1.2 2.8-1.2s1.4 1.2 2.8 1.2 1.4-1.2 2.8-1.2 1.4 1.2 2.8 1.2 1.4-1.2 2.8-1.2 1.4 1.2 2.8 1.2" />
  </svg>
);

/* Sello de goma de aduana: línea de apoyo, cuerpo entintador y mango que se
   angosta hacia arriba. El mango anterior salía en punta y se leía como ampolleta. */
export const Sello = ({ size = 24, className }: P) => (
  <svg {...base(size)} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 20.8h16" />
    <rect x="5.2" y="14.8" width="13.6" height="4" rx="1.2" />
    <path d="M9.6 14.8l.7-6.2a1.85 1.85 0 0 1 3.4 0l.7 6.2" />
  </svg>
);

export const Camion = ({ size = 24, className }: P) => (
  <svg {...base(size)} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.8 15.6V6.8a1 1 0 011-1h9.4a1 1 0 011 1v8.8" />
    <path d="M14.2 9.4h3.3a1 1 0 01.83.44l2.2 3.3a1 1 0 01.17.56v1.9" />
    <circle cx="7.4" cy="17.4" r="1.9" />
    <circle cx="17.2" cy="17.4" r="1.9" />
    <path d="M9.3 17.4h6" />
  </svg>
);

/* ── íconos de las opciones del cotizador ──────────────────────────── */

export const Tendencia = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* la quebrada termina justo en el vértice de la punta para que no se vea un empalme en T */}
    <path d="M3.5 16.6l5.1-5.1 3.4 3.4 7.2-7.2" />
    <path d="M14.3 7.7h4.8v4.8" />
  </svg>
);

export const Brujula = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M15.2 8.8l-1.8 4.6-4.6 1.8 1.8-4.6z" />
  </svg>
);

export const Etiqueta = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3.6 11.3V4.8a1.2 1.2 0 011.2-1.2h6.5a1.2 1.2 0 01.85.35l8 8a1.2 1.2 0 010 1.7l-6.5 6.5a1.2 1.2 0 01-1.7 0l-8-8a1.2 1.2 0 01-.35-.85z" />
    <circle cx="7.9" cy="7.9" r="1.5" />
  </svg>
);

/* Engranaje: eje, cuerpo y 8 dientes como segmentos radiales que nacen sobre el
   círculo exterior. Un contorno dentado real se empasta a tamaño chico. */
export const Engranaje = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="2.8" />
    <circle cx="12" cy="12" r="7.2" />
    <path d="M12 4.8V2.6M12 19.2v2.2M4.8 12H2.6M19.2 12h2.2" />
    <path d="M6.9 6.9L5.4 5.4M17.1 6.9l1.5-1.5M17.1 17.1l1.5 1.5M6.9 17.1l-1.5 1.5" />
  </svg>
);

export const Repetir = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 9.5A5.5 5.5 0 019.5 4h8" />
    <path d="M15 1.6L17.9 4 15 6.4" />
    <path d="M20 14.5A5.5 5.5 0 0114.5 20h-8" />
    <path d="M9 17.6L6.1 20 9 22.4" />
  </svg>
);

export const Calendario = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3.4" y="5" width="17.2" height="15.6" rx="2.4" />
    <path d="M3.4 9.8h17.2M8.2 3.2v3.4M15.8 3.2v3.4" />
    <path d="M7.8 13.6h.01M12 13.6h.01M16.2 13.6h.01" strokeWidth={2.3} />
  </svg>
);

export const Reloj = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.2 1.9" />
  </svg>
);

export const Rayo = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12.9 2.4L4.8 13.2h5.5l-1.2 8.4 8.1-10.8h-5.5z" />
  </svg>
);

export const Interrogacion = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M9.6 9.4a2.5 2.5 0 114.4 1.7c-.8.9-1.6 1.3-1.9 2.2l-.1.5" />
    <path d="M12 17.2h.01" strokeWidth={2.4} />
  </svg>
);

/* Contenedor marítimo: los rieles superior e inferior acotan el corrugado y evitan
   que las verticales se lean como un código de barras. Van a opacidad plena. */
export const Contenedor = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Tres corrugados y el par de puertas a la derecha. Con cinco barras de
        lado a lado se leía como un radiador, no como un contenedor. */}
    <rect x="2.6" y="7.4" width="18.8" height="9.2" rx="1.3" />
    <path d="M6.6 7.4v9.2M10.1 7.4v9.2M13.6 7.4v9.2" />
    <path d="M17.1 7.4v9.2" />
    <path d="M19.3 11.2v1.6" strokeWidth={1.9} />
    <path d="M4.8 16.6v1.6M19.2 16.6v1.6" />
  </svg>
);

export const Cajas = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2.8" y="12.6" width="8.6" height="8.2" rx="1.2" />
    <rect x="12.6" y="12.6" width="8.6" height="8.2" rx="1.2" />
    <rect x="7.7" y="3.4" width="8.6" height="8.2" rx="1.2" />
    <path d="M10.6 3.4v2.6M15.4 12.6v2.6M5.6 12.6v2.6" opacity={0.55} />
  </svg>
);

export const AvionCarga = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.6 3.2a1.4 1.4 0 012.8 0v5.3l7.4 4.2v2.3l-7.4-2.2v4.4l2.6 1.9v1.8L12 20l-4 .9v-1.8l2.6-1.9v-4.4L3.2 15v-2.3l7.4-4.2z" />
  </svg>
);

export const WhatsApp = ({ size = 28, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.02a9.8 9.8 0 01-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.77 9.77 0 01-1.5-5.22c0-5.4 4.4-9.79 9.82-9.79a9.75 9.75 0 016.94 2.88 9.71 9.71 0 012.87 6.92c0 5.4-4.4 9.8-9.81 9.8M20.5 3.49A11.66 11.66 0 0012.05 0C5.6 0 .35 5.24.34 11.68c0 2.06.54 4.07 1.56 5.84L.24 24l6.63-1.74a11.7 11.7 0 005.18 1.32h.01c6.44 0 11.69-5.24 11.7-11.68a11.6 11.6 0 00-3.42-8.27" />
  </svg>
);

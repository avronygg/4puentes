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

export const Caja = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 17V8.6a1 1 0 01.6-.92l7.8-3.5a1.4 1.4 0 011.2 0l7.8 3.5a1 1 0 01.6.92V17" />
    <path d="M3 17l8.4 3.8a1.4 1.4 0 001.2 0L21 17" />
    <path d="M12 21V10.8M3.3 8.2L12 12l8.7-3.8" />
  </svg>
);

export const Galpon = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 10.4L12 4l9 6.4V20a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
    <rect x="7.5" y="13" width="9" height="8" />
    <path d="M7.5 17h9" />
  </svg>
);

export const EscudoCheck = ({ size = 22, className }: P) => (
  <svg {...base(size)} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3l7.6 3v5.5c0 4.6-3.2 8.4-7.6 9.8-4.4-1.4-7.6-5.2-7.6-9.8V6z" />
    <path d="M9 12.2l2.2 2.2 4.2-4.4" />
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

export const WhatsApp = ({ size = 28, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.02a9.8 9.8 0 01-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.77 9.77 0 01-1.5-5.22c0-5.4 4.4-9.79 9.82-9.79a9.75 9.75 0 016.94 2.88 9.71 9.71 0 012.87 6.92c0 5.4-4.4 9.8-9.81 9.8M20.5 3.49A11.66 11.66 0 0012.05 0C5.6 0 .35 5.24.34 11.68c0 2.06.54 4.07 1.56 5.84L.24 24l6.63-1.74a11.7 11.7 0 005.18 1.32h.01c6.44 0 11.69-5.24 11.7-11.68a11.6 11.6 0 00-3.42-8.27" />
  </svg>
);

import type { Metadata, Viewport } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import Script from "next/script";
import { contacto, google, site } from "@/lib/site";
import "./globals.css";

// Poppins vive en el repo (app/fonts) en vez de descargarse de Google en cada
// build: el build queda determinista y sin depender de la red. Subset latino.
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/poppins-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.titulo,
  description: site.descripcion,
  keywords: [
    "importación integral chile",
    "importar a chile",
    "agente de aduana valdivia",
    "bodegaje valdivia",
    "seguro de carga importación",
    "comercio exterior sur de chile",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: site.url,
    siteName: site.nombre,
    title: site.titulo,
    description: site.descripcion,
  },
  // Mientras los datos de contacto sean placeholders, el sitio NO debe
  // indexarse: un buscador guardaría "+56 9 XXXX XXXX" como el teléfono de la
  // empresa. Se abre solo cuando `contacto.porConfirmar` pase a false.
  robots: contacto.porConfirmar
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
  // Next la pinta como <meta name="google-site-verification">. Va por acá y no
  // a mano en el <head> para que no se duplique si algún día se toca la
  // metadata desde otro sitio.
  verification: { google: google.verificacion },
};

/** Producción de verdad; en previsualización y en local no se mide. */
const EN_PRODUCCION = process.env.VERCEL_ENV === "production";

export const viewport: Viewport = {
  themeColor: "#3c93d8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
        {/* Las apariciones por scroll parten ocultas en CSS. Sin JavaScript no
            hay quien las muestre, así que se anula el estado inicial. */}
        <noscript>
          <style>{`[data-revelar]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      {EN_PRODUCCION && (
        <>
          {/* GA4. `afterInteractive` lo deja fuera del camino crítico: el hero
              y la cortina de entrada pintan antes de que Google cargue nada. */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${google.analytics}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${google.analytics}');`}
          </Script>
        </>
      )}
      <body>
        {/* Cortina de entrada. Va en el HTML del servidor y se retira sola con
            una animación CSS: sin JavaScript de por medio no hay parpadeo entre
            el pintado y la hidratación, y si el JS fallara igual desaparece en
            vez de dejar el sitio tapado. Se levanta mientras el container del
            hero todavía está bajando, así el primer cuadro ya tiene movimiento. */}
        <div className="cargador" aria-hidden>
          <span className="cargador__marca">
            <Image src="/logo-cuatro-puentes.webp" alt="" width={132} height={129} priority />
          </span>
          <span className="cargador__linea" />
        </div>
        {children}
      </body>
    </html>
  );
}

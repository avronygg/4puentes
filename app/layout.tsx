import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { contacto, site } from "@/lib/site";
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
    "importación china chile",
    "importar desde china",
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
};

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
      <body>{children}</body>
    </html>
  );
}

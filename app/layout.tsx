import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// next/font descarga y auto-hospeda la fuente en build: sin peticiones a CDNs
// en tiempo de ejecución y sin salto de layout.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
  robots: { index: true, follow: true },
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
      <body>{children}</body>
    </html>
  );
}

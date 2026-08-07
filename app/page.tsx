import Asesor from "@/components/Asesor";
import Cobertura from "@/components/Cobertura";
import Cotizar from "@/components/Cotizar";
import Footer from "@/components/Footer";
import Fundador from "@/components/Fundador";
import Hero from "@/components/Hero";
import Marca from "@/components/Marca";
import Modalidades from "@/components/Modalidades";
import Nav from "@/components/Nav";
import Proceso from "@/components/Proceso";
import Productos from "@/components/Productos";
import Rutas from "@/components/Rutas";
import Servicios from "@/components/Servicios";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-200 focus:rounded-[12px] focus:bg-terra-400 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido">
        <Hero />
        <Servicios />
        <Fundador />
        <Proceso />
        <Marca />
        <Productos />
        <Modalidades />
        <Rutas />
        <Cobertura />
        <Cotizar />
      </main>
      <Footer />
      <Asesor />
    </>
  );
}

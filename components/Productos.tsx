import Image from "next/image";
import { productos } from "@/lib/contenido";
import Revelar from "./Revelar";
import CtaSeccion from "./CtaSeccion";

/** Rota la lista para que las dos filas no muestren lo mismo a la misma altura. */
function rotar<T>(xs: readonly T[], n: number): T[] {
  return [...xs.slice(n), ...xs.slice(0, n)];
}

function Tarjeta({ p, duplicada }: { p: (typeof productos)[number]; duplicada: boolean }) {
  return (
    <li className="vitrina__item">
      <div className="vitrina__foto">
        <Image
          src={p.foto}
          // El segundo juego existe sólo para cerrar el bucle: va sin texto
          // alternativo para no repetirle la lista entera al lector de pantalla.
          alt={duplicada ? "" : p.alt}
          width={600}
          height={600}
          sizes="240px"
          loading="lazy"
        />
      </div>
      <div className="vitrina__cuerpo">
        <span className="vitrina__nombre">{p.nombre}</span>
        <span className="vitrina__rubro">{p.rubro}</span>
      </div>
    </li>
  );
}

/** Una fila del desfile. La lista va duplicada para que el bucle no tenga corte. */
function Fila({ items, inversa }: { items: (typeof productos)[number][]; inversa?: boolean }) {
  return (
    <ul className={`vitrina__fila ${inversa ? "vitrina__fila--inversa" : ""}`}>
      {items.map((p) => (
        <Tarjeta key={p.nombre} p={p} duplicada={false} />
      ))}
      {items.map((p) => (
        <Tarjeta key={`bis-${p.nombre}`} p={p} duplicada />
      ))}
    </ul>
  );
}

export default function Productos() {
  return (
    <section className="section" id="productos">
      <div className="wrap">
        <Revelar className="section-head">
          <h2 data-revelar>
            <span className="suave">Podemos traer</span>{" "}
            <em className="destacado">todo lo que imagines</em>
          </h2>
          <p className="lede" data-revelar>
            Maquinaria, alimentos, herramientas, artículos deportivos. Cada tipo
            de producto tiene sus propias reglas para entrar al país y su forma
            de embalar, y <strong>ya pasamos por todas</strong>.
          </p>
        </Revelar>
      </div>

      {/* A ancho completo, fuera de .wrap: el desfile tiene que salirse por los
          bordes para que se lea como una lista que sigue. */}
      <div className="vitrina">
        <Fila items={rotar(productos, 0)} />
        <Fila items={rotar(productos, 5)} inversa />
      </div>

      <div className="wrap">
        <CtaSeccion
          texto="¿No ves lo tuyo? Cuéntanos qué necesitas y te decimos si se puede traer."
          boton="Cotizar mi producto"
          mensaje="Hola, quiero saber si pueden traer un producto específico. Les cuento cuál."
        />
      </div>
    </section>
  );
}

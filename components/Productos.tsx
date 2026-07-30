import { productos } from "@/lib/contenido";
import Revelar from "./Revelar";
import {
  Bobina,
  Botella,
  Copa,
  Exprimidor,
  Flecha,
  Frasco,
  Kayak,
  Llave,
  Monitor,
  Saco,
} from "./Icons";

const ICONOS = {
  monitor: Monitor,
  bobina: Bobina,
  exprimidor: Exprimidor,
  botella: Botella,
  kayak: Kayak,
  llave: Llave,
  copa: Copa,
  frasco: Frasco,
  saco: Saco,
} as const;

/** Rota la lista para que las dos filas no muestren lo mismo a la misma altura. */
function rotar<T>(xs: readonly T[], n: number): T[] {
  return [...xs.slice(n), ...xs.slice(0, n)];
}

function Tarjeta({ p }: { p: (typeof productos)[number] }) {
  const Icono = ICONOS[p.icono];
  return (
    <li className="vitrina__item">
      <span className="vitrina__icono" aria-hidden>
        <Icono size={22} />
      </span>
      <span className="min-w-0">
        <span className="vitrina__nombre">{p.nombre}</span>
        <span className="vitrina__rubro">{p.rubro}</span>
      </span>
    </li>
  );
}

/** Una fila del desfile. La lista va duplicada para que el bucle no tenga corte. */
function Fila({ items, inversa }: { items: (typeof productos)[number][]; inversa?: boolean }) {
  return (
    <ul
      className={`vitrina__fila ${inversa ? "vitrina__fila--inversa" : ""}`}
      // El desfile es decorativo: el listado accesible va aparte, más abajo.
      aria-hidden
    >
      {[...items, ...items].map((p, i) => (
        <Tarjeta key={`${p.nombre}-${i}`} p={p} />
      ))}
    </ul>
  );
}

export default function Productos() {
  return (
    <section className="section" id="productos">
      <div className="wrap">
        <Revelar className="section-head">
          <h2 data-revelar>¿Qué se puede traer? Casi cualquier cosa.</h2>
          <p className="lede" data-revelar>
            Estos son productos reales que hemos importado. Van desde maquinaria
            hasta alimentos, y la lista no es cerrada: si se puede embarcar, se
            puede traer.
          </p>
        </Revelar>
      </div>

      {/* A ancho completo, fuera de .wrap: el desfile tiene que salirse por los
          bordes para que se lea como una lista que sigue. */}
      <div className="vitrina">
        <Fila items={rotar(productos, 0)} />
        <Fila items={rotar(productos, 5)} inversa />
      </div>

      {/* Lo mismo en texto plano para lectores de pantalla y para quien tenga el
          movimiento desactivado, sin depender de la animación. */}
      <p className="sr-only">
        Ejemplos de productos importados: {productos.map((p) => p.nombre).join(", ")}.
      </p>

      <div className="wrap">
        <p className="vitrina__cierre">
          ¿No ves lo tuyo?
          <a href="#cotizar">
            Cuéntanos qué necesitas
            <Flecha size={15} />
          </a>
        </p>
      </div>
    </section>
  );
}

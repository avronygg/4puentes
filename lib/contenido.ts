/**
 * Textos de la landing. Separados de los componentes para que se puedan editar
 * sin tocar código.
 *
 * PENDIENTE: el cliente debe validar las afirmaciones comerciales (puertos
 * listados, "proveedores verificados", plazo de respuesta). Ver PENDIENTES.md.
 */

export const servicios = [
  {
    icono: "caja",
    titulo: "Importación integral",
    texto:
      "Gestionamos proveedor, compra en origen, flete internacional, " +
      "agenciamiento de aduana y transporte hasta tu puerta.",
    items: [
      "Marítimo FCL y LCL",
      "Aéreo para carga urgente",
      "Aduana y transporte nacional",
    ],
  },
  {
    icono: "galpon",
    titulo: "Bodegaje",
    texto:
      "Tu carga llega, se almacena y sale cuando la necesitas. Recepción, " +
      "control de inventario y despachos parciales.",
    items: ["Almacenaje en destino", "Control de inventario", "Despacho fraccionado"],
  },
  {
    icono: "escudo",
    titulo: "Seguros",
    texto:
      "Toda importación viaja cubierta. Contratamos y gestionamos el seguro " +
      "de tu carga puerta a puerta.",
    items: ["Cobertura todo riesgo", "Puerta a puerta", "Gestión de siniestros"],
  },
] as const;

export const pasos = [
  {
    n: "01",
    titulo: "Cotización",
    texto:
      "Nos cuentas qué necesitas importar. Te entregamos un costo total puesto " +
      "en tu bodega: producto, flete, derechos e IVA, seguro y transporte " +
      "interno. Sin sorpresas al final.",
  },
  {
    n: "02",
    titulo: "Compra y verificación en origen",
    texto:
      "Contactamos y validamos al proveedor en China o Medio Oriente, " +
      "negociamos condiciones y coordinamos la compra y la inspección antes " +
      "de embarcar.",
  },
  {
    n: "03",
    titulo: "Flete internacional",
    texto:
      "Consolidamos y embarcamos por vía marítima o aérea según urgencia y " +
      "volumen, con seguimiento del contenedor en cada tramo de la ruta.",
  },
  {
    n: "04",
    titulo: "Aduana y desconsolidación",
    texto:
      "Agenciamiento aduanero, pago de derechos e IVA y liberación de la carga " +
      "en puerto. Toda la documentación la preparamos nosotros.",
  },
  {
    n: "05",
    titulo: "Bodegaje y entrega",
    texto:
      "Almacenamos en destino y despachamos a tu bodega: en una sola entrega " +
      "o en despachos parciales, según cómo necesites la mercadería.",
  },
] as const;

export const mercados = [
  {
    destacado: true,
    etiqueta: "Mercado consolidado",
    titulo: "China",
    texto:
      "Es donde tenemos más camino recorrido. Conocemos a los proveedores, los " +
      "tiempos reales de producción y cómo se mueve la carga en los principales " +
      "puertos del país.",
    puertos: ["Shenzhen", "Ningbo", "Shanghái", "Qingdao", "Guangzhou"],
  },
  {
    destacado: false,
    etiqueta: "En expansión",
    titulo: "Emiratos Árabes y Medio Oriente",
    texto:
      "Nuestra línea nueva. Estamos abriendo rutas desde Emiratos Árabes Unidos " +
      "y mercados vecinos para que no dependas de un solo origen.",
    puertos: ["Jebel Ali · Dubái", "Abu Dabi", "Sharjah"],
  },
] as const;

export const regiones = [
  { zona: "La Araucanía", ciudades: "Temuco · Villarrica" },
  { zona: "Los Ríos", ciudades: "Valdivia · La Unión" },
  { zona: "Los Lagos", ciudades: "Osorno · Puerto Montt · Chiloé" },
  { zona: "Aysén", ciudades: "Coyhaique · Puerto Aysén" },
  { zona: "Puertos de entrada", ciudades: "San Antonio · Valparaíso · San Vicente" },
] as const;

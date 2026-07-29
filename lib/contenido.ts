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

/**
 * Orígenes que no vienen del generador del mapa. Se suman a MAPA.rutas en
 * Rutas.tsx en vez de tocar lib/mapa-datos.ts, que está marcado como generado.
 *
 * Coordenadas en el sistema del mapa (1600x680, Robinson recentrada en el
 * meridiano 168°, con Asia a la izquierda y América a la derecha):
 *   x = 800 + Δλ · 4,44 · X(φ)      y = 381,75 − 405,9 · Y(φ)
 * donde Δλ es la longitud relativa a 168° y X/Y son las tablas de Robinson.
 *
 * PENDIENTE: el cliente debe confirmar que estas rutas se ofrecen de verdad
 * antes de publicar. Ver PENDIENTES.md.
 */
export const rutasExtra = [
  { nombre: "Los Ángeles", region: "Estados Unidos", ox: 1110, oy: 212, cx: 1318, cy: 336 },
  { nombre: "Houston", region: "Estados Unidos", ox: 1212, oy: 232, cx: 1392, cy: 384 },
  { nombre: "Manzanillo", region: "México", ox: 1183, oy: 286, cx: 1350, cy: 428 },
] as const;

export const regiones = [
  { zona: "La Araucanía", ciudades: "Temuco · Villarrica" },
  { zona: "Los Ríos", ciudades: "Valdivia · La Unión" },
  { zona: "Los Lagos", ciudades: "Osorno · Puerto Montt · Chiloé" },
  { zona: "Aysén", ciudades: "Coyhaique · Puerto Aysén" },
  { zona: "Puertos de entrada", ciudades: "San Antonio · Valparaíso · San Vicente" },
] as const;

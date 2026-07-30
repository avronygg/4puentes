/**
 * Textos de la landing. Separados de los componentes para que se puedan editar
 * sin tocar código.
 *
 * PENDIENTE: el cliente debe validar las afirmaciones comerciales (puertos
 * listados, "proveedores verificados", plazo de respuesta). Ver PENDIENTES.md.
 */

/**
 * Los tres servicios están definidos por el tipo de cliente, no por la
 * capacidad técnica: son las tres situaciones con las que llega la gente. El
 * `perfil` de cada uno coincide con el del cotizador, así la tarjeta lleva al
 * formulario con la respuesta ya marcada.
 *
 * Bodegaje y seguro no son tarjetas propias porque van incluidos en los tres:
 * aparecen como viñetas dentro de cada uno.
 */
export const servicios = [
  {
    icono: "tendencia",
    perfil: "ya-importo",
    etiqueta: "Ya importas",
    titulo: "Operador logístico integral",
    texto:
      "Ya traes carga y no quieres seguir coordinando proveedores, navieras y " +
      "aduana. Tomamos la cadena completa y respondemos por ella.",
    items: [
      "Un solo interlocutor por embarque",
      "Comparamos contra tu costo actual",
      "Bodega en Valdivia y seguro incluidos",
    ],
  },
  {
    icono: "etiqueta",
    perfil: "compro-en-chile",
    etiqueta: "Compras en Chile",
    titulo: "Compra directa en origen",
    texto:
      "Hoy le compras a un intermediario local. Buscamos y verificamos al " +
      "proveedor en origen para que traigas el mismo insumo sin ese margen " +
      "encima.",
    items: [
      "Buscamos y verificamos al proveedor",
      "Costo puesto en bodega, comparable con el tuyo",
      "Bodega en Valdivia y seguro incluidos",
    ],
  },
  {
    icono: "brujula",
    perfil: "sin-experiencia",
    etiqueta: "Primera importación",
    titulo: "Importación asesorada",
    texto:
      "Nunca has importado y no sabes por dónde partir. Te acompañamos desde " +
      "la idea: qué conviene traer, cuánto cuesta de verdad y qué papeles se " +
      "necesitan.",
    items: [
      "Te explicamos cada paso antes de darlo",
      "No necesitas equipo propio",
      "Bodega en Valdivia y seguro incluidos",
    ],
  },
] as const;

/**
 * Vitrina de productos. La lista la dio el cliente y la variedad ES el mensaje:
 * no hay un rubro cerrado. Por eso el orden mezcla a propósito maquinaria,
 * alimentos y deporte en vez de agruparlos por categoría.
 *
 * PENDIENTE: confirmar que son importaciones ya realizadas y no ejemplos.
 */
export const productos = [
  {
    nombre: "Analizador de composición corporal",
    rubro: "Equipamiento médico",
    foto: "/prod-analizador.webp",
    alt: "Analizador de composición corporal junto a su caja, en un patio de contenedores",
  },
  {
    nombre: "Cable galvanizado",
    rubro: "Insumo industrial",
    foto: "/prod-cable.webp",
    alt: "Carrete de cable de acero galvanizado en una bodega",
  },
  {
    nombre: "Licor de cacao",
    rubro: "Bebidas",
    foto: "/prod-licor-cacao.webp",
    alt: "Botellas de licor de cacao junto a granos de cacao",
  },
  {
    nombre: "Kayaks",
    rubro: "Deporte y outdoor",
    foto: "/prod-kayaks.webp",
    alt: "Kayaks de colores apilados en un rack, en un patio de contenedores",
  },
  {
    nombre: "Botellas de plástico",
    rubro: "Envases",
    foto: "/prod-botellas.webp",
    alt: "Botellas de plástico transparentes en una línea de producción",
  },
  {
    nombre: "Exprimidora de jengibre",
    rubro: "Maquinaria",
    foto: "/prod-exprimidora.webp",
    alt: "Exprimidora industrial de jengibre en acero inoxidable",
  },
  {
    nombre: "Pasta de dátiles",
    rubro: "Alimentos",
    foto: "/prod-datiles.webp",
    alt: "Frascos de pasta de dátiles junto a dátiles frescos",
  },
  {
    nombre: "Equipos de ferretería",
    rubro: "Ferretería",
    foto: "/prod-ferreteria.webp",
    alt: "Herramientas eléctricas sobre un mesón de taller",
  },
  {
    nombre: "Soya proteica",
    rubro: "Alimentos a granel",
    foto: "/prod-soya.webp",
    alt: "Bolsas de soya proteica texturizada junto a un bol con el producto",
  },
] as const;

export const pasos = [
  {
    n: "01",
    titulo: "Cotización",
    texto:
      "Nos cuentas qué necesitas importar. Te entregamos un costo total puesto " +
      "en tu bodega: producto, flete, derechos e IVA, seguro y transporte " +
      "interno. Ningún costo aparece después.",
  },
  {
    n: "02",
    titulo: "Compra y verificación en origen",
    texto:
      "Contactamos y verificamos al proveedor en el país de origen, negociamos " +
      "condiciones y coordinamos la compra y la inspección antes de embarcar.",
  },
  {
    n: "03",
    titulo: "Flete internacional",
    texto:
      "Consolidamos y embarcamos por vía marítima o aérea según urgencia y " +
      "volumen, con seguimiento de la carga en cada tramo de la ruta.",
  },
  {
    n: "04",
    titulo: "Aduana y liberación",
    texto:
      "Agenciamiento aduanero, pago de derechos e IVA y liberación de la carga " +
      "en puerto, y traslado hasta nuestra bodega de Valdivia. Toda la " +
      "documentación la preparamos nosotros.",
  },
  {
    n: "05",
    titulo: "Bodegaje y entrega",
    texto:
      "Almacenamos en nuestra bodega de Valdivia y despachamos a tu bodega: en " +
      "una sola entrega o en despachos parciales, según cómo necesites la " +
      "mercadería.",
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
  { zona: "Puertos de entrada", ciudades: "San Antonio · Valparaíso · San Vicente · Lirquén" },
] as const;

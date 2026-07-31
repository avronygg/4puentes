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

/**
 * Quién asesora. Es la sección que más pesa para alguien que va a confiarle
 * dinero y mercadería a un desconocido, y el dato que la sostiene es que
 * empezó importando para su propio negocio: conoce el problema desde el lado
 * del cliente, no desde el del proveedor de servicios.
 *
 * PENDIENTE: nombre real, años exactos y foto. Ver PENDIENTES.md.
 */
export const fundador = {
  nombre: "Nombre Apellido",
  rol: "Fundador de Cuatro Puentes",
  /** Cuando exista la foto, poner acá la ruta y se reemplaza el marcador. */
  foto: null as string | null,
  entrada:
    "No empecé importando para vender el servicio. Empecé importando para mi " +
    "propio negocio.",
  parrafos: [
    "Hace más de diez años necesitaba traer insumos y no encontré a nadie que " +
      "me explicara el proceso completo sin dar vueltas. Aprendí haciéndolo: " +
      "los trámites de aduana, los costos que nadie menciona hasta el final y " +
      "dónde se puede negociar de verdad.",
    "Con los años eso dejó de ser un problema propio y pasó a ser el oficio. " +
      "He viajado a China y a otros orígenes a conocer fábricas, sentarme con " +
      "proveedores y entender cómo se negocia allá, que no es como se negocia " +
      "acá.",
    "Por eso cuando te cotizo sé exactamente dónde está el margen que se puede " +
      "bajar, y cuando te digo un plazo es el plazo real.",
  ],
  credenciales: [
    { dato: "+10", unidad: "años", detalle: "Importando, primero para mi propia empresa" },
    { dato: "China", unidad: "y más", detalle: "Visitas a fábricas y proveedores en origen" },
    { dato: "Red", unidad: "propia", detalle: "Proveedores verificados en terreno" },
  ],
} as const;

/**
 * Casos. Los porcentajes son el argumento de venta más fuerte del sitio y a la
 * vez el más delicado: cada uno tiene que poder respaldarse.
 *
 * PENDIENTE: el cliente debe (a) confirmar cada cifra, (b) conseguir permiso
 * de cada empresa para nombrarla, y (c) resolver el caso `propio: true`, que
 * es una empresa del propio fundador y no puede presentarse como cliente sin
 * decirlo. Ver PENDIENTES.md.
 */
export const casos = [
  {
    rubro: "Alimentación",
    cifra: "-10%",
    logro: "en el costo de su materia prima",
    texto:
      "Compraba su materia prima a un proveedor chileno. Se buscó el origen " +
      "directo y bajó el costo de adquisición.",
    extras: [
      "Después importamos un insumo que no se consigue en Chile",
      "Y una máquina para un proceso especial de su planta",
    ],
    propio: false,
  },
  {
    rubro: "Bebestibles",
    cifra: "-25%",
    logro: "por botella",
    texto:
      "Compraba sus botellas en el mercado chileno. Al traerlas directo desde " +
      "origen, el costo por unidad cayó un cuarto.",
    extras: [],
    propio: false,
  },
  {
    rubro: "Construcción de caminos",
    cifra: "-20%",
    logro: "en cable galvanizado",
    texto:
      "Usaba cable galvanizado comprado en el mercado local. Se gestionó la " +
      "importación directa del mismo insumo.",
    extras: [],
    propio: false,
  },
  {
    rubro: "Equipos acuáticos",
    cifra: "0",
    logro: "experiencia previa importando",
    texto:
      "Quería abrir un marketplace y partía desde cero. Se buscaron y " +
      "validaron proveedores, se gestionó la importación y hoy usa nuestro " +
      "bodegaje.",
    extras: [],
    // Empresa del propio fundador: si se publica, tiene que decirlo.
    propio: true,
  },
  {
    rubro: "Salud y nutrición",
    cifra: "1",
    logro: "máquina, puerta a puerta",
    texto:
      "Una nutricionista necesitaba un equipo especializado que no se vendía " +
      "en Chile. Se gestionó todo, desde la fábrica en China hasta su oficina.",
    extras: [],
    propio: false,
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

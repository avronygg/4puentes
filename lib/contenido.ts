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
    etiqueta: "Si ya importas",
    titulo: "Te bajamos el costo de lo que ya traes",
    texto:
      "Revisamos cómo importas hoy y te buscamos la mejor opción: otro proveedor, " +
      "otra ruta, otro costo. Te asesoramos en la decisión y después nos hacemos " +
      "cargo de toda la operación.",
    items: [
      "Comparamos contra lo que pagas hoy",
      "Una sola persona a quien preguntarle",
      "Bodega en Valdivia y seguro, incluidos",
    ],
  },
  {
    icono: "etiqueta",
    perfil: "compro-en-chile",
    etiqueta: "Si compras en Chile",
    titulo: "Cómpralo directo en origen y deja de pagar el sobreprecio",
    texto:
      "Hoy le compras a alguien que ya lo importó y le sumó su ganancia. Nosotros " +
      "buscamos al fabricante en el país de origen, lo verificamos, negociamos y " +
      "te asesoramos de principio a fin.",
    items: [
      "Buscamos y verificamos al proveedor por ti",
      "Un precio final que puedes comparar con el de hoy",
      "Bodega en Valdivia y seguro incluidos",
    ],
  },
  {
    icono: "brujula",
    perfil: "sin-experiencia",
    etiqueta: "Si nunca has importado",
    titulo: "No necesitas ser experto para importar",
    texto:
      "Si no sabes por dónde partir, te acompañamos durante todo el proceso: qué " +
      "conviene traer, cuánto cuesta de verdad y qué papeles hacen falta. No " +
      "tienes que aprenderte nada.",
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
 */
export const fundador = {
  nombre: "Gianpiero Traverso",
  rol: "Fundador de Cuatro Puentes",
  /**
   * Foto de la operación, no retrato: el cliente pidió que se viera el trabajo
   * antes que la persona. Recorte de la sesión en el puerto.
   * Si se pone en null, el componente vuelve a mostrar el marcador.
   *
   * PENDIENTE: reemplazar por una foto propia en terreno (bodega de Valdivia,
   * carga llegando, revisión de mercadería). Ver PENDIENTES.md.
   */
  foto: "/trabajo-terreno.webp" as string | null,
  fotoAlt:
    "Revisión de documentos de embarque junto a un camión con contenedor, en el puerto",
  entrada:
    "No empecé importando para vender el servicio. Empecé importando para mi " +
    "propio negocio.",
  parrafos: [
    "Hace unos cinco años necesitaba traer insumos y no encontré a nadie que " +
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
    { dato: "+5", unidad: "años", detalle: "Importando, primero para mi propia empresa" },
    { dato: "China", unidad: "y más", detalle: "Visitas a fábricas y proveedores en origen" },
    { dato: "Red", unidad: "propia", detalle: "Proveedores verificados en terreno" },
  ],
} as const;

/**
 * De dónde sale el nombre. El cliente pidió explicarlo en la web: Valdivia es
 * una ciudad partida por el agua y cosida por puentes, y un puente no es más
 * que la unión de dos puntos que solos no se alcanzan. Esa es la analogía de la
 * marca y por eso el texto vive acá, para poder citarlo desde varias secciones.
 */
export const marca = {
  etiqueta: "Por qué Cuatro Puentes",
  parrafos: [
    "Valdivia es una ciudad partida por el agua. Sin sus puentes, cada orilla " +
      "se queda sola: el puente no agrega nada, sólo conecta lo que ya estaba " +
      "ahí y no se podía juntar.",
    "Eso hacemos nosotros. De un lado hay una fábrica al otro extremo del " +
      "mundo; del otro, tu negocio. Cuatro Puentes es lo que va en medio: el " +
      "proveedor, el barco, la aduana y la bodega, los cuatro tramos que hay " +
      "que cruzar para que lo que necesitas llegue a tus manos.",
  ],
  /** Los cuatro tramos, en el mismo orden que se cuentan arriba. */
  tramos: [
    { nombre: "El proveedor", detalle: "Lo buscamos y lo verificamos en origen" },
    { nombre: "El viaje", detalle: "Por barco o por avión, según te convenga" },
    { nombre: "La aduana", detalle: "Trámites, impuestos y salida del puerto" },
    { nombre: "La bodega", detalle: "Guardamos y te lo entregamos en Valdivia" },
  ],
} as const;

export const pasos = [
  {
    n: "01",
    titulo: "Nos cuentas qué quieres traer",
    texto:
      "Te entregamos un precio final con todo adentro: el producto, el viaje, " +
      "los impuestos, el seguro y el traslado hasta tu bodega. Ningún costo " +
      "aparece después.",
  },
  {
    n: "02",
    titulo: "Buscamos y compramos en origen",
    texto:
      "Contactamos al proveedor, comprobamos que sea serio, negociamos el precio " +
      "y revisamos la mercadería antes de que suba al barco.",
  },
  {
    n: "03",
    titulo: "Tu carga viaja",
    texto:
      "Por barco o por avión, según lo que te convenga. Te vamos contando dónde " +
      "va en cada tramo, sin que tengas que preguntar.",
  },
  {
    n: "04",
    titulo: "Pasamos la aduana",
    texto:
      "Hacemos los trámites, pagamos los impuestos y sacamos la carga del puerto " +
      "rumbo a nuestra bodega en Valdivia. Todos los papeles los preparamos " +
      "nosotros.",
  },
  {
    n: "05",
    titulo: "Te lo entregamos",
    texto:
      "Guardamos tu mercadería en nuestra bodega de Valdivia y te la mandamos " +
      "cuando la necesites: todo de una vez o por partes.",
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

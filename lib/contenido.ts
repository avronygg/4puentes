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
    titulo: "Nos hacemos cargo de todo",
    texto:
      "Ya traes carga y no quieres seguir persiguiendo al proveedor, a la naviera " +
      "y a la aduana. Lo tomamos nosotros de principio a fin y respondemos por ello.",
    items: [
      "Una sola persona a quien preguntarle",
      "Comparamos contra tu costo actual",
      "Bodega en Valdivia y seguro, incluidos",
    ],
  },
  {
    icono: "etiqueta",
    perfil: "compro-en-chile",
    etiqueta: "Compras en Chile",
    titulo: "Compra directo en el país de origen",
    texto:
      "Hoy le compras a alguien que ya lo importó y le sumó su ganancia. " +
      "Buscamos y revisamos al fabricante afuera para que traigas lo mismo sin " +
      "ese sobreprecio.",
    items: [
      "Buscamos y revisamos al proveedor por ti",
      "Un precio final que puedes comparar con el que pagas hoy",
      "Bodega en Valdivia y seguro incluidos",
    ],
  },
  {
    icono: "brujula",
    perfil: "sin-experiencia",
    etiqueta: "Primera importación",
    titulo: "Tu primera importación",
    texto:
      "Nunca has importado y no sabes por dónde partir. Te acompañamos desde " +
      "la idea: qué conviene traer, cuánto cuesta de verdad y qué papeles hacen " +
      "falta. Sin que tengas que aprenderte nada.",
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
  /** Si se pone en null, el componente vuelve a mostrar el marcador. */
  foto: "/fundador.webp" as string | null,
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
 * Testimonios. Los hechos y las cifras son reales, los vino a dar el cliente.
 * Lo que está simulado es la voz: la cita, el nombre, el cargo y la empresa.
 *
 * Por eso van con `pendiente: true`, que los pinta con el subrayado punteado
 * del resto de los datos por confirmar. Publicar una reseña firmada por alguien
 * que no la dijo es una reseña falsa, y acá quedaría además con un porcentaje
 * al lado. El marcado hace que no se pueda publicar por descuido.
 *
 * Para dejarlos reales: pedir la cita textual a cada empresa, su autorización
 * para nombrarla, y poner `pendiente: false`.
 */
export const casos = [
  {
    rubro: "Alimentación",
    cifra: "-10%",
    logro: "en el costo de su materia prima",
    cita:
      "Llevábamos años comprándole al mismo proveedor acá sin cuestionarlo. Nos " +
      "mostraron cuánto costaba puesto en nuestra bodega trayéndolo directo y la " +
      "diferencia era evidente. Después trajimos un insumo que en Chile no existe " +
      "y una máquina para la planta.",
    autor: "Nombre Apellido",
    cargo: "Gerente de operaciones",
    empresa: "Empresa de alimentos",
    iniciales: "NA",
    propio: false,
    pendiente: true,
  },
  {
    rubro: "Bebestibles",
    cifra: "-25%",
    logro: "por botella",
    cita:
      "La botella es el segundo costo de nuestro producto. Bajarlo un cuarto no " +
      "es un ahorro puntual: cambió el margen de toda la línea.",
    autor: "Nombre Apellido",
    cargo: "Socio fundador",
    empresa: "Productora de bebestibles",
    iniciales: "NA",
    propio: false,
    pendiente: true,
  },
  {
    rubro: "Construcción de caminos",
    cifra: "-20%",
    logro: "en cable galvanizado",
    cita:
      "Comprábamos el cable en el mercado local y lo dábamos por hecho. Se " +
      "hicieron cargo de la importación completa y no tuvimos que aprender nada " +
      "del proceso.",
    autor: "Nombre Apellido",
    cargo: "Jefe de abastecimiento",
    empresa: "Constructora",
    iniciales: "NA",
    propio: false,
    pendiente: true,
  },
  {
    rubro: "Equipos acuáticos",
    cifra: "Desde cero",
    logro: "sin experiencia previa",
    cita:
      "Partimos sin saber nada de importar. Buscaron los proveedores, los " +
      "validaron uno por uno y hoy además nos guardan el stock en su bodega.",
    autor: "Nombre Apellido",
    cargo: "Socio",
    empresa: "Marketplace de equipos acuáticos",
    iniciales: "NA",
    // Empresa del propio fundador: si se publica, tiene que decirlo.
    propio: true,
    pendiente: true,
  },
  {
    rubro: "Salud y nutrición",
    cifra: "Puerta a puerta",
    logro: "desde China a su consulta",
    cita:
      "Necesitaba un equipo que no se vende en Chile y no tenía idea por dónde " +
      "partir. Me lo dejaron en la consulta sin que yo hiciera un solo trámite.",
    autor: "Nombre Apellido",
    cargo: "Nutricionista",
    empresa: "Consulta particular",
    iniciales: "NA",
    propio: false,
    pendiente: true,
  },
] as const;

export const pasos = [
  {
    n: "01",
    titulo: "Cotización",
    texto:
      "Nos cuentas qué necesitas traer. Te entregamos un precio final: el " +
      "producto, el viaje, los impuestos, el seguro y el traslado hasta tu " +
      "bodega. Ningún costo aparece después.",
  },
  {
    n: "02",
    titulo: "Compra y revisión en el país de origen",
    texto:
      "Contactamos al proveedor, comprobamos que sea serio, negociamos el precio " +
      "y revisamos la mercadería antes de que suba al barco.",
  },
  {
    n: "03",
    titulo: "El viaje",
    texto:
      "Tu carga viaja por barco o por avión, según lo que te convenga. Te vamos " +
      "contando dónde va en cada tramo.",
  },
  {
    n: "04",
    titulo: "Aduana",
    texto:
      "Hacemos los trámites, pagamos los impuestos y sacamos la carga del puerto " +
      "rumbo a nuestra bodega en Valdivia. Todos los papeles los preparamos " +
      "nosotros.",
  },
  {
    n: "05",
    titulo: "Bodega y entrega",
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

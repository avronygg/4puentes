/**
 * Cotizador paso a paso.
 *
 * Los pasos son datos, no JSX: se editan acá sin tocar el componente. La misma
 * definición la usan el formulario y POST /api/v1/leads, así que la validación
 * es idéntica en cliente y servidor y no hay forma de que se desincronicen.
 *
 * PENDIENTE: el cliente debe validar los perfiles y las preguntas comerciales.
 */

export type Respuestas = Record<string, string>;

type Base = {
  id: string;
  etiqueta: string;
  ayuda?: string;
  requerido?: boolean;
};

/**
 * Nombre del ícono de una opción. El componente lo traduce a un SVG; acá se
 * deja como texto para que este archivo siga siendo datos puros y editable sin
 * tocar React.
 */
export type NombreIcono =
  | "tendencia"
  | "brujula"
  | "etiqueta"
  | "engranaje"
  | "repetir"
  | "calendario"
  | "reloj"
  | "rayo"
  | "interrogacion"
  | "contenedor"
  | "cajas"
  | "avion"
  | "barco"
  | "pin"
  | "globo"
  | "check";

export type Opcion = {
  valor: string;
  titulo: string;
  detalle?: string;
  icono?: NombreIcono;
};

export type Campo =
  | (Base & {
      tipo: "opcion";
      opciones: readonly Opcion[];
      /**
       * Escape para lo que no entra en los rangos: al elegir `otro.valor` el
       * formulario pide un texto y lo guarda en `${id}Otro`, con clave propia
       * para que el rango elegido siga siendo un valor cerrado y agrupable.
       */
      otro?: { valor: string; etiqueta: string; marcador?: string };
    })
  | (Base & {
      tipo: "texto" | "email" | "tel";
      marcador?: string;
      /** Longitud máxima; también la aplica el servidor. */
      max?: number;
    })
  | (Base & { tipo: "parrafo"; marcador?: string; max?: number });

export type Paso = {
  id: string;
  titulo: string;
  bajada?: string;
  campos: readonly Campo[];
  /** Si existe, el paso sólo aparece cuando devuelve true. */
  cuando?: (r: Respuestas) => boolean;
};

/* ── perfiles ──────────────────────────────────────────────────────────
   El perfil es lo primero que se pregunta porque de él dependen los pasos
   siguientes. Son tres a propósito: en la primera pantalla, tres tarjetas se
   comparan de un vistazo y una cuarta ya obliga a leer. Para sumar un perfil
   hay que agregarlo acá y darle su paso en PASOS con el `cuando` que
   corresponda. */
export const PERFILES = [
  {
    valor: "ya-importo",
    titulo: "Ya importo y quiero delegarlo",
    detalle: "Busco un operador que se haga cargo de la cadena completa.",
    icono: "tendencia",
  },
  {
    valor: "compro-en-chile",
    titulo: "Compro en Chile y quiero traerlo directo",
    detalle: "Quiero bajar el costo de mis insumos comprando en origen.",
    icono: "etiqueta",
  },
  {
    valor: "sin-experiencia",
    titulo: "Nunca he importado",
    detalle: "Necesito que me asesoren de principio a fin.",
    icono: "brujula",
  },
] as const satisfies readonly Opcion[];

/* ── rangos ────────────────────────────────────────────────────────────
   Cantidad y peso se preguntan en más de una rama: se definen una sola vez
   para que dos perfiles distintos no terminen con escalas distintas y las
   respuestas se puedan comparar entre leads. Los cortes son los habituales
   en importación desde Asia al sur de Chile. */
const OPCIONES_CANTIDAD = [
  {
    valor: "menos-contenedor",
    titulo: "Menos de un contenedor",
    detalle: "Carga suelta o consolidada",
    icono: "cajas",
  },
  { valor: "un-contenedor", titulo: "1 contenedor", detalle: "20' o 40' completo", icono: "contenedor" },
  { valor: "2-5-contenedores", titulo: "Entre 2 y 5 contenedores", icono: "barco" },
  {
    valor: "mas-5-contenedores",
    titulo: "Más de 5 contenedores",
    detalle: "Volumen recurrente",
    icono: "tendencia",
  },
  { valor: "otro", titulo: "Otro", detalle: "Lo describo yo", icono: "etiqueta" },
] as const satisfies readonly Opcion[];

const OTRO_CANTIDAD = {
  valor: "otro",
  etiqueta: "¿Qué cantidad, aproximadamente?",
  marcador: "Ej: 300 cajas, 12 pallets…",
} as const;

const OPCIONES_PESO = [
  { valor: "menos-1t", titulo: "Menos de 1 tonelada", icono: "cajas" },
  { valor: "1-5t", titulo: "Entre 1 y 5 toneladas", icono: "contenedor" },
  { valor: "5-20t", titulo: "Entre 5 y 20 toneladas", detalle: "Un contenedor bien cargado", icono: "barco" },
  {
    valor: "mas-20t",
    titulo: "Más de 20 toneladas",
    detalle: "Puede necesitar carga especial",
    icono: "engranaje",
  },
  {
    valor: "no-se",
    titulo: "No lo sé",
    detalle: "Lo estimamos con los datos del proveedor",
    icono: "interrogacion",
  },
  { valor: "otro", titulo: "Otro", detalle: "Lo describo yo", icono: "etiqueta" },
] as const satisfies readonly Opcion[];

/** La frecuencia se pregunta en dos ramas: misma escala para poder comparar. */
const OPCIONES_FRECUENCIA = [
  { valor: "mensual", titulo: "Todos los meses", icono: "repetir" },
  { valor: "trimestral", titulo: "Cada 2 o 3 meses", icono: "calendario" },
  { valor: "semestral", titulo: "Un par de veces al año", icono: "reloj" },
  { valor: "puntual", titulo: "Es puntual, sin periodicidad", icono: "cajas" },
] as const satisfies readonly Opcion[];

const OTRO_PESO = {
  valor: "otro",
  etiqueta: "¿Cuánto pesa o cuánto mide?",
  marcador: "Ej: 2,5 toneladas · 3×1,8×2 m",
} as const;

export const PASOS: readonly Paso[] = [
  {
    id: "perfil",
    titulo: "¿Cuál de estas se parece más a tu caso?",
    bajada: "Con esto ajustamos las preguntas a lo que realmente necesitas.",
    campos: [
      { tipo: "opcion", id: "perfil", etiqueta: "Tu situación", requerido: true, opciones: PERFILES },
    ],
  },

  // ── ramas ────────────────────────────────────────────────────────────
  {
    id: "actual",
    titulo: "Cuéntanos cómo importas hoy",
    bajada: "Es la información que necesitamos para comparar contra tu costo actual.",
    cuando: (r) => r.perfil === "ya-importo",
    campos: [
      {
        tipo: "texto",
        id: "producto",
        etiqueta: "¿Qué traes principalmente?",
        marcador: "Repuestos, textil, insumos…",
        requerido: true,
      },
      {
        tipo: "opcion",
        id: "costoActual",
        etiqueta: "¿Cuánto te cuesta hoy puesto en bodega?",
        ayuda: "Un aproximado por embarque basta: es la cifra contra la que comparamos.",
        requerido: true,
        opciones: [
          { valor: "menos-3000", titulo: "Menos de USD 3.000", detalle: "Por embarque", icono: "cajas" },
          { valor: "3000-8000", titulo: "Entre USD 3.000 y USD 8.000", icono: "contenedor" },
          { valor: "8000-20000", titulo: "Entre USD 8.000 y USD 20.000", icono: "barco" },
          { valor: "mas-20000", titulo: "Más de USD 20.000", icono: "tendencia" },
          { valor: "prefiero-no-decir", titulo: "Prefiero no decirlo", icono: "interrogacion" },
          { valor: "otro", titulo: "Otro", detalle: "Lo indico yo", icono: "etiqueta" },
        ],
        otro: {
          valor: "otro",
          etiqueta: "¿Cuánto, aproximadamente?",
          marcador: "Ej: USD 12.500 por embarque",
        },
      },
      {
        tipo: "opcion",
        id: "cantidad",
        etiqueta: "¿Qué cantidad traes por embarque?",
        requerido: true,
        opciones: OPCIONES_CANTIDAD,
        otro: OTRO_CANTIDAD,
      },
      {
        tipo: "opcion",
        id: "peso",
        etiqueta: "¿Cuánto peso, aproximadamente?",
        opciones: OPCIONES_PESO,
        otro: OTRO_PESO,
      },
      {
        tipo: "opcion",
        id: "frecuencia",
        etiqueta: "¿Cada cuánto importas?",
        requerido: true,
        opciones: OPCIONES_FRECUENCIA,
      },
    ],
  },
  {
    id: "compra-local",
    titulo: "¿Qué estás comprando hoy en Chile?",
    bajada:
      "Con lo que gastas hoy podemos estimar cuánto bajaría el costo trayéndolo directo.",
    cuando: (r) => r.perfil === "compro-en-chile",
    campos: [
      {
        tipo: "texto",
        id: "producto",
        etiqueta: "¿Qué insumo o producto compras?",
        marcador: "Descríbelo lo más concreto que puedas",
        requerido: true,
      },
      {
        // En esta rama el gasto se piensa en pesos y por período, no en dólares
        // por embarque como en la rama de quien ya importa.
        tipo: "opcion",
        id: "gastoLocal",
        etiqueta: "¿Cuánto gastas hoy en ese insumo?",
        ayuda: "Un aproximado mensual basta. Es la cifra contra la que comparamos.",
        requerido: true,
        opciones: [
          { valor: "menos-2m", titulo: "Menos de $2 millones", detalle: "Al mes", icono: "cajas" },
          { valor: "2-10m", titulo: "Entre $2 y $10 millones", icono: "contenedor" },
          { valor: "10-30m", titulo: "Entre $10 y $30 millones", icono: "barco" },
          { valor: "mas-30m", titulo: "Más de $30 millones", icono: "tendencia" },
          { valor: "prefiero-no-decir", titulo: "Prefiero no decirlo", icono: "interrogacion" },
          { valor: "otro", titulo: "Otro", detalle: "Lo indico yo", icono: "etiqueta" },
        ],
        otro: {
          valor: "otro",
          etiqueta: "¿Cuánto, aproximadamente?",
          marcador: "Ej: $6 millones al mes",
        },
      },
      {
        tipo: "opcion",
        id: "frecuencia",
        etiqueta: "¿Cada cuánto lo compras?",
        requerido: true,
        opciones: OPCIONES_FRECUENCIA,
      },
      {
        tipo: "texto",
        id: "proveedor",
        etiqueta: "¿Sabes de dónde podría venir?",
        marcador: "País, proveedor o enlace, si lo tienes",
        ayuda: "Si no lo tienes, lo buscamos y lo verificamos nosotros.",
      },
    ],
  },
  {
    id: "interes",
    titulo: "¿Qué te gustaría importar?",
    bajada: "No necesitas tenerlo definido. Con el rubro nos basta para orientarte.",
    cuando: (r) => r.perfil === "sin-experiencia",
    campos: [
      {
        tipo: "texto",
        id: "producto",
        etiqueta: "¿Qué rubro o tipo de producto?",
        marcador: "Ferretería, alimentos, tecnología…",
        requerido: true,
      },
      {
        tipo: "opcion",
        id: "etapa",
        etiqueta: "¿En qué etapa estás?",
        requerido: true,
        opciones: [
          { valor: "explorando", titulo: "Explorando", detalle: "Quiero entender costos y plazos.", icono: "brujula" },
          { valor: "decidido", titulo: "Decidido", detalle: "Quiero importar este año.", icono: "check" },
          { valor: "urgente", titulo: "Con urgencia", detalle: "Lo necesito lo antes posible.", icono: "rayo" },
        ],
      },
    ],
  },

  // ── común ────────────────────────────────────────────────────────────
  {
    id: "logistica",
    titulo: "Origen y tipo de carga",
    bajada: "Si no lo tienes claro, elige «Todavía no lo sé» y lo vemos juntos.",
    campos: [
      {
        tipo: "opcion",
        id: "origen",
        etiqueta: "¿Desde dónde?",
        requerido: true,
        opciones: [
          { valor: "china", titulo: "China", detalle: "Shenzhen, Ningbo, Shanghái…", icono: "barco" },
          { valor: "emiratos", titulo: "Emiratos Árabes / Medio Oriente", detalle: "Jebel Ali, Abu Dabi…", icono: "pin" },
          { valor: "otro-asia", titulo: "Otro mercado asiático", icono: "globo" },
          { valor: "no-se", titulo: "Todavía no lo sé", detalle: "Nos cuentas y lo definimos juntos.", icono: "interrogacion" },
        ],
      },
      {
        tipo: "opcion",
        id: "carga",
        etiqueta: "¿Cómo debería viajar?",
        requerido: true,
        opciones: [
          { valor: "fcl", titulo: "Contenedor completo", detalle: "FCL", icono: "contenedor" },
          { valor: "lcl", titulo: "Carga consolidada", detalle: "LCL, comparto contenedor", icono: "cajas" },
          { valor: "aereo", titulo: "Aéreo", detalle: "Urgente o de bajo volumen", icono: "avion" },
          { valor: "no-se", titulo: "No estoy seguro", detalle: "Recomiéndenme ustedes", icono: "interrogacion" },
        ],
      },
    ],
  },
  {
    id: "contacto",
    titulo: "¿A quién le respondemos?",
    bajada: "Te contactamos con la cotización dentro de un día hábil.",
    campos: [
      { tipo: "texto", id: "nombre", etiqueta: "Nombre", marcador: "Tu nombre", requerido: true, max: 120 },
      { tipo: "texto", id: "empresa", etiqueta: "Empresa", marcador: "Opcional", max: 160 },
      { tipo: "email", id: "email", etiqueta: "Correo", marcador: "tu@empresa.cl", requerido: true, max: 160 },
      { tipo: "tel", id: "telefono", etiqueta: "Teléfono o WhatsApp", marcador: "+56 9 ...", max: 40 },
      {
        tipo: "parrafo",
        id: "mensaje",
        etiqueta: "¿Algo más que debamos saber?",
        marcador: "Opcional",
        max: 2000,
      },
    ],
  },
];

/** Pasos visibles para un conjunto de respuestas. */
export function pasosVisibles(r: Respuestas): Paso[] {
  return PASOS.filter((p) => !p.cuando || p.cuando(r));
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Clave donde vive el texto libre de la opción «Otro» de un campo. */
export function idOtro(campoId: string): string {
  return `${campoId}Otro`;
}

/** Tope del texto libre de «Otro»: es una precisión, no un relato. */
const MAX_OTRO = 120;

function recortar(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Errores de un paso. Devuelve {} si está completo. */
export function validarPaso(paso: Paso, r: Respuestas): Record<string, string> {
  const errores: Record<string, string> = {};

  for (const campo of paso.campos) {
    const valor = (r[campo.id] ?? "").trim();

    if (campo.requerido && !valor) {
      errores[campo.id] =
        campo.tipo === "opcion" ? "Elige una opción para seguir." : "Completa este dato.";
      continue;
    }
    if (!valor) continue;

    if (campo.tipo === "opcion" && !campo.opciones.some((o) => o.valor === valor)) {
      errores[campo.id] = "Elige una de las opciones.";
    }
    if (campo.tipo === "opcion" && campo.otro?.valor === valor && !recortar(r[idOtro(campo.id)])) {
      errores[idOtro(campo.id)] = "Elegiste «Otro»: escríbelo para poder seguir.";
    }
    if (campo.tipo === "email" && !EMAIL.test(valor)) {
      errores[campo.id] = "Revisa el correo: falta el @ o el dominio.";
    }
  }

  return errores;
}

/** Valida el envío completo. Lo usa el servidor, que no confía en el cliente. */
export function validarCotizacion(
  entrada: unknown,
): { ok: true; datos: Respuestas } | { ok: false; errores: Record<string, string> } {
  const bruto = (entrada ?? {}) as Record<string, unknown>;
  const r: Respuestas = {};

  // Sólo se conservan los campos declarados en los pasos: nada de basura extra.
  for (const paso of PASOS) {
    for (const campo of paso.campos) {
      const v = recortar(bruto[campo.id], "max" in campo && campo.max ? campo.max : 200);
      if (v) r[campo.id] = v;
      if (campo.tipo === "opcion" && campo.otro) {
        const otro = recortar(bruto[idOtro(campo.id)], MAX_OTRO);
        if (otro) r[idOtro(campo.id)] = otro;
      }
    }
  }

  const errores: Record<string, string> = {};
  for (const paso of pasosVisibles(r)) Object.assign(errores, validarPaso(paso, r));

  return Object.keys(errores).length ? { ok: false, errores } : { ok: true, datos: r };
}

/** Busca el texto legible de una opción para mostrarlo en el resumen y el correo. */
export function etiquetaDe(campoId: string, valor: string): string {
  for (const paso of PASOS) {
    for (const campo of paso.campos) {
      if (campo.id !== campoId || campo.tipo !== "opcion") continue;
      const o = campo.opciones.find((x) => x.valor === valor);
      if (o) return o.detalle ? `${o.titulo} (${o.detalle})` : o.titulo;
    }
  }
  return valor;
}

/** Resumen del lead en pares etiqueta/valor, en el orden de los pasos. */
export function resumen(r: Respuestas): { etiqueta: string; valor: string }[] {
  const filas: { etiqueta: string; valor: string }[] = [];
  for (const paso of pasosVisibles(r)) {
    for (const campo of paso.campos) {
      const v = r[campo.id];
      if (!v) continue;
      // Al comercial le sirve lo que escribió la persona, no la palabra «Otro».
      const escrito =
        campo.tipo === "opcion" && campo.otro?.valor === v ? recortar(r[idOtro(campo.id)]) : "";
      filas.push({
        etiqueta: campo.etiqueta,
        valor: escrito || (campo.tipo === "opcion" ? etiquetaDe(campo.id, v) : v),
      });
    }
  }
  return filas;
}

export function mensajeWhatsApp(r: Respuestas): string {
  return [
    "Hola 4 Puentes, quiero cotizar una importación.",
    "",
    ...resumen(r).map((f) => `${f.etiqueta}: ${f.valor}`),
  ].join("\n");
}

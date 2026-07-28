# Guía de edición — 4 Puentes Web

Para quien tenga que cambiar textos, datos o imágenes **sin romper nada**.
No necesitas saber programar: todo lo editable vive en tres archivos.

> Regla de oro: si un archivo no aparece en esta guía, no lo toques.
> Si algo se rompe, `git checkout .` deshace todos los cambios no guardados.

---

## 1. Datos de contacto → `lib/site.ts`

Es lo primero que hay que cambiar antes de publicar.

```ts
export const contacto = {
  telefono: "+56 9 XXXX XXXX",           // como se ve en pantalla
  telefonoHref: "tel:+56900000000",      // el enlace real, sin espacios
  email: "contacto@4puentes.cl",
  direccion: "Valdivia, Región de Los Ríos",
  whatsapp: "56900000000",               // solo dígitos, con código de país
  porConfirmar: true,                    // <- IMPORTANTE, leer abajo
};
```

**`whatsapp` es el dato más importante de todo el sitio**: ahí llegan todas
las solicitudes de cotización. Va sin `+`, sin espacios y sin guiones. Para
Chile: `56` + `9` + los ocho dígitos. Ejemplo: `56912345678`.

**`porConfirmar`** controla si Google puede indexar el sitio:

| Valor | Qué pasa |
|---|---|
| `true` | El sitio queda **oculto** para los buscadores. Es el estado actual. |
| `false` | El sitio se abre a Google. |

Déjalo en `true` mientras los datos sean de mentira. Cuando pongas los
reales, cámbialo a `false` **en el mismo cambio**. Si lo abres antes, Google
puede guardar "+56 9 XXXX XXXX" como el teléfono de la empresa.

## 2. Textos de la página → `lib/contenido.ts`

Todos los textos de las secciones están ahí, en listas ordenadas igual que
en la pantalla: `servicios`, `pasos`, `mercados`, `regiones`.

```ts
{
  icono: "caja",                    // no cambiar: elige el dibujito
  titulo: "Importación integral",   // sí cambiar
  texto: "Gestionamos proveedor…",  // sí cambiar
  items: ["Marítimo FCL y LCL", …], // sí cambiar
}
```

- Cambia lo que va **entre comillas**. Nunca borres las comillas ni las comas.
- Puedes agregar o quitar elementos de una lista; la página se ajusta sola.
- **`icono` no es texto libre**: solo acepta `"caja"`, `"galpon"` o `"escudo"`.
- Los títulos de sección (los grandes) están dentro de cada componente en
  `components/`. Si necesitas cambiarlos, busca el texto y reemplázalo — están
  escritos tal cual se ven.

**Antes de dar por buenos los textos**, el cliente tiene que confirmar las
afirmaciones comerciales: los puertos listados, "conocemos a los proveedores"
y "respondemos dentro de un día hábil".

## 3. Imágenes → carpeta `public/`

Reemplaza el archivo manteniendo **exactamente el mismo nombre**:

| Archivo | Dónde se ve | Qué debe ser |
|---|---|---|
| `cielo.webp` | Fondo del hero y de la banda del avión | Foto de cielo horizontal |
| `container.webp` | El contenedor colgando del hero | PNG/WebP **con fondo transparente** |
| `logo.webp` | Barra superior y pie de página | Logo **blanco** con fondo transparente |
| `avion.webp` | *(falta)* Banda del avión | PNG **con fondo transparente** |

Dos cosas que sí importan:

- **La transparencia no es opcional** en el contenedor, el logo y el avión. Si
  el archivo trae fondo blanco, se va a ver un rectángulo blanco sobre el cielo.
- **El contenedor debe conservar las eslingas hasta el borde superior** de la
  imagen. El diseño las corta a propósito, como si la grúa estuviera fuera de
  la pantalla.

Para activar el avión cuando llegue la imagen: guárdala como
`public/avion.webp` y en `components/Avion.tsx` quita las marcas de comentario
(`{/*` y `*/}`) del bloque que dice "Cuando llegue el PNG del avión".

## 4. El mapa de rutas

El mapa **no se edita a mano**. `lib/mapa-datos.ts` está generado por
`scripts/mapa/generar.py` y trae dentro las coordenadas de los continentes.

Para cambiar los puertos de origen, edita la lista `ORIGENES` en
`scripts/mapa/generar.py` (nombre, latitud, longitud) y vuelve a correrlo:

```bash
cd scripts/mapa && python3 generar.py && cp mapa-datos.ts ../../web/lib/
```

Las etiquetas que se leen al lado del mapa sí son texto normal, en
`components/Rutas.tsx`, lista `ETIQUETAS`.

---

## Cómo probar antes de publicar

```bash
cd web
npm install     # solo la primera vez
npm run dev     # abre http://localhost:3000
```

Revisa siempre en teléfono además de computador: el diseño cambia bastante.
En el navegador se simula con F12 → el icono de celular.

## Cómo publicar

```bash
git add -A
git commit -m "describe qué cambiaste"
git push
```

Vercel publica solo, en 1-2 minutos. Si conectaste el repo a Vercel, cada
`push` a `main` actualiza el sitio.

## Qué NO tocar

- `app/globals.css` — el sistema de diseño. Un color cambiado ahí afecta a
  toda la página y puede dejar textos ilegibles.
- `app/layout.tsx`, `app/api/`, `app/health/`, `app/meta/` — configuración y
  servicios.
- `lib/leads.ts` — la validación del formulario. La usan el navegador y el
  servidor a la vez; si cambias uno se rompe el otro.
- `lib/mapa-datos.ts` — generado, se sobrescribe.
- `package.json`, `node_modules/`, `.next/`.

## Si algo se rompió

```bash
git checkout .        # deshace todo lo no guardado
git log --oneline     # ver los últimos cambios
git revert <código>   # deshace un cambio ya guardado
```

En Vercel también puedes volver a la versión anterior desde el panel del
proyecto → Deployments → los tres puntos → *Promote to Production*.

# Aprender Angular con este portafolio

Guía de estudio. Cada concepto se explica con código **real de este proyecto**, comparándolo con
cómo se hacía en el HTML original (`frontend-html/`). Ábrelos lado a lado.

Para ejecutar: `cd frontend && npm install && npm start` → http://localhost:4200.
Con el servidor corriendo, cada cambio que guardes se refleja al instante.

## Ruta de lectura sugerida

1. `src/main.ts` → `src/app/app.config.ts` → `src/app/app.ts` (cómo arranca todo)
2. `layout/footer.ts` (el componente más simple)
3. `shared/marquee.ts` y `shared/hero.ts` (inputs y proyección)
4. `pages/portfolio/portfolio.ts` (la página única: secciones, `@for`, `@defer`)
5. `app.routes.ts` (rutas y redirecciones)
6. `services/i18n.ts` + `data/ui.ts` (idioma ES/EN con señales)
7. `layout/status-bar.ts` (señales + RxJS) y `layout/section-nav.ts` (menú lateral)
8. `services/portfolio-api.service.ts` (HTTP; hoy ninguna pantalla lo usa, ver ejercicio 12)

---

## 1. Qué es Angular y qué cambia

En el HTML original, **cada página es un archivo** y navegar = pedir otro archivo al servidor.
En Angular hay **una sola página** (`src/index.html` con `<app-root>`) y JavaScript pinta distintas
"pantallas" según la URL: es una **SPA** (Single Page Application). Navegar no recarga el sitio.

Angular se compone de piezas pequeñas que encajan:

| Pieza | Para qué | Ejemplo aquí |
|---|---|---|
| **Componente** | Un trozo de UI (HTML + lógica + estilo) | `Footer`, `Hero`, `Portfolio` |
| **Plantilla** | El HTML del componente, con sintaxis extra | `@for`, `{{ }}`, `[words]` |
| **Servicio** | Lógica reutilizable sin UI | `PortfolioApiService` |
| **Router** | URL → componente | `app.routes.ts` |
| **Inyección de dependencias** | Pedir lo que necesitas con `inject()` | `inject(HttpClient)` |
| **Señales (signals)** | Valores reactivos: si cambian, la UI se actualiza | `clock()` |

## 2. Componentes

Un componente es una **clase TypeScript con un decorador `@Component`**. El más simple del proyecto,
`layout/footer.ts`:

```ts
@Component({
  selector: 'app-footer',          // la etiqueta HTML que lo representa: <app-footer />
  template: `<footer class="footer"> … </footer>`,   // su HTML
})
export class Footer {}
```

Se usa escribiendo `<app-footer />` en otra plantilla (ver `app.ts`). **Antes:** copiar el `<footer>`
en 6 archivos. **Ahora:** un componente, un lugar.

> Convención de este proyecto: HTML en línea (`template`) para ver todo en un archivo. Angular también
> permite `templateUrl: './footer.html'` y `styleUrl: './footer.css'` por separado; es lo que usa
> `ng generate component` por defecto.

**Standalone:** el componente declara en `imports: [...]` los otros componentes/directivas que usa
en su plantilla. Si usas `<app-hero>` y no lo importas, el compilador te avisa. (Versiones antiguas
usaban `NgModule`; hoy ya no hace falta.)

## 3. Plantillas: la sintaxis que debes dominar

| Sintaxis | Significado | Dónde verla |
|---|---|---|
| `{{ expr }}` | Interpolación: muestra un valor | `{{ i18n.t(p.name) }}` en `portfolio.ts` |
| `[prop]="expr"` | Enlazar una propiedad (datos → hijo/DOM) | `<app-marquee [words]="tech" />` |
| `(evento)="fn()"` | Escuchar un evento (no hay ejemplo aún; ver ejercicio 3) | `(click)="…"` |
| `@for` | Repetir | tarjetas de `portfolio.ts` |
| `@if / @else` | Condicional | `@if (card.interestedIn)` en `portfolio.ts` |
| `\| pipe` | Transformar para mostrar | `{{ hello.value() \| json }}` |

### `@for` y el `track`

```html
@for (p of projects; track p.id) {
  <article class="card"> … {{ p.name }} … </article>
}
```

`track` le dice a Angular cómo identificar cada elemento para no repintar todo cuando la lista cambia.
Usa un id único. Variables útiles: `$index`, `$first`, `$last` (se usa `$last` en `portfolio.ts` para no
poner el separador `·` después de la última etiqueta).

> Antes: 4 bloques `<article>` copiados a mano. Ahora: 1 plantilla + 4 objetos en `data/`.

### `@if`

En `portfolio.ts`, cada tarjeta del stack muestra el bloque "Interesado en:" solo si el dato existe:

```html
@if (card.interestedIn) { … }
```

`@if` admite `@else if` y `@else` para estados mutuamente excluyentes (por ejemplo cargando / error /
datos, ver `rxResource` más abajo).

## 4. Datos tipados: `models/` y `data/`

```ts
export interface Project { id: string; name: string; year: number; status: 'ACTIVO' | 'ARCHIVO'; … }
```

Una `interface` describe la forma de un objeto. Si en `data/portfolio.data.ts` escribes
`status: 'ACTIVOO'`, el compilador falla antes de que lo veas en el navegador. Es la gran ventaja de
TypeScript sobre el JS plano del original. (Para ti, que vienes de C#: es muy parecido a una clase/record
con tipos.)

## 5. Comunicación entre componentes

### Padre → hijo: `input()`

`shared/marquee.ts`:

```ts
readonly words = input.required<string[]>();
```

El padre lo pasa así: `<app-marquee [words]="tech" />`. Los corchetes significan "enlaza a una
expresión TypeScript"; sin corchetes (`label="DEVELOPER · .NET / C#"` en `<app-hero>`) pasas un texto literal.

### Proyección de contenido: `<ng-content>`

`shared/hero.ts` tiene `<p class="hero-tagline"><ng-content /></p>`. Lo que el padre escribe **dentro**
de `<app-hero>…</app-hero>` aparece en ese hueco. Con `select="[cta]"` se define un segundo hueco para
los elementos que lleven el atributo `cta` (los botones del inicio en `portfolio.ts`).

### Hijo → padre: `output()`

No se usa aún en el proyecto (ver ejercicio 3). Forma: el hijo declara `clicked = output<string>()` y
hace `this.clicked.emit('x')`; el padre escucha con `(clicked)="algo($event)"`.

## 6. Señales (signals) y `computed`

Una señal es un contenedor de valor que **avisa a la UI cuando cambia**. Se lee **llamándola como
función**: `clock()`.

```ts
const count = signal(0);          // crear
count.set(5); count.update(n => n + 1);   // modificar
const double = computed(() => count() * 2);  // derivada: se recalcula sola
```

En `marquee.ts`: `looped = computed(() => [...this.words(), ...this.words()])` duplica la lista para
el bucle infinito de la animación. Si `words` cambia, `looped` se recalcula automáticamente.

## 7. Rutas

El sitio ahora es **una sola página con secciones** (inicio, stack, proyectos, experimentos y sobre mí). `app.routes.ts`:

```ts
const toSection = (id: string) => () => inject(Router).parseUrl(`/#${id}`);

export const routes: Routes = [
  { path: '', title: 'MATEO IGUA / DEV TERMINAL', component: Portfolio },
  { path: 'proyectos', redirectTo: toSection('projects') },   // URL antigua → /#projects
  …
  { path: '**', title: '404 / MATEO IGUA', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) },
];
```

- `redirectTo` puede ser una **función** (se ejecuta con inyección de dependencias): aquí devuelve un
  `UrlTree`, así las URL antiguas (`/proyectos`…) siguen funcionando y bajan a la sección.
- `loadComponent` + `import()` = **lazy loading**: la página 404 es un archivo JS aparte que solo se
  descarga si hace falta. (Mira la salida de `npm run build`.)
- `path: '**'` captura cualquier URL desconocida → página 404 (reemplaza a `404.html`).
- En `app.ts`, `<router-outlet />` marca dónde se pinta la página actual.

Cuando una app tiene varias páginas se navega con `routerLink` (no `href="/proyectos"`, que
recargaría todo) y `routerLinkActive` marca el enlace activo. Aquí, dentro de la página única, el
menú usa **anclas** (`#projects`) y el scroll.

## 7b. La página única y el menú lateral

**Secciones.** `pages/portfolio/portfolio.ts` contiene una `<section id="…">` por cada antigua página.
Los ids salen de la lista `SECTIONS` (`services/section-spy.ts`), que también genera el menú.

**Menú que se repliega a la derecha** (`layout/section-nav.ts`):

- Es una barra `position: fixed` a la derecha con una marca por sección. La activa se resalta
  (marca larga y etiqueta en amarillo); las demás quedan con `opacity: .35`. Al pasar el mouse o
  enfocar con teclado, todas las etiquetas se despliegan.
- Para saber qué sección se ve, escucha el `scroll` (dentro de `afterNextRender`) y llama a
  `SectionSpy.refresh()`: la activa es la última sección cuyo borde superior ya pasó el 40 % de la
  ventana. Al final de la página, siempre la última.
- El resultado se guarda en una **señal** (`SectionSpy.active`). Por eso la plantilla del menú y la
  ruta `cd: ~/projects` de la barra superior se actualizan solas.
- Al hacer clic, `SectionSpy.scrollTo(id)` usa `scrollIntoView({ behavior: 'smooth' })`; el CSS
  `scroll-margin-top` evita que la barra superior tape el título.

**Marquesina.** `<app-marquee>` aparece una sola vez, después de la última sección, en vez de
repetirse en cada una.

## 7c. Idioma ES / EN (`services/i18n.ts`, `data/ui.ts`)

- Cada texto visible es un objeto `{ es: '…', en: '…' }` (tipo `Localized`). Los datos
  (`portfolio.data.ts`) y los textos fijos de la interfaz (`ui.ts`) usan el mismo formato.
- `I18n` guarda el idioma en una señal `lang`. `i18n.t(texto)` devuelve el texto del idioma activo,
  y como lee la señal, **todas las plantillas que lo usan se actualizan al cambiar de idioma**, sin
  recargar.
- El idioma inicial es el que se eligió la última vez (`localStorage`) o, si no hay, el del navegador.
  Un `effect()` mantiene `<html lang>` sincronizado y guarda la elección.
- El selector ES | EN está en la barra superior (`layout/status-bar.ts`).
- Para agregar un texto: añade una clave a `ui.ts` con `l('español', 'english')` y úsala como
  `{{ i18n.t(ui.miClave) }}`.

**Diseño móvil.** Todo está en `styles.css` (sección "Responsive"): en pantallas de hasta 720 px el
menú lateral queda como marcas táctiles, el reloj se oculta, los botones ocupan todo el ancho y las
tablas se desplazan en horizontal dentro de su recuadro.

## 8. Servicios e inyección de dependencias

`services/portfolio-api.service.ts`:

```ts
@Injectable({ providedIn: 'root' })
export class PortfolioApiService {
  private readonly http = inject(HttpClient);
  getHello() { return this.http.get<HelloResponse>(`${this.base}/api/hello`); }
}
```

- `@Injectable({ providedIn: 'root' })` → Angular crea **una instancia compartida** de la clase.
- `inject(X)` → "dame esa instancia". No haces `new`. (Mismo concepto que la DI de ASP.NET Core
  en tu backend: constructor injection ≈ `inject()`.)
- `API_BASE` (`services/api.config.ts`) es un `InjectionToken`: para inyectar valores simples (un
  string) en vez de clases.
- `provideHttpClient(withFetch())` en `app.config.ts` es lo que habilita `HttpClient`. Sin eso,
  `inject(HttpClient)` falla.

## 9. RxJS y Observables en 5 minutos

`HttpClient.get()` devuelve un **Observable**: una "promesa que puede emitir varios valores" y que
**no hace nada hasta que alguien se suscribe**. Ideas mínimas:

- Una petición HTTP emite un valor y termina.
- `timer(0, 1000)` emite 0,1,2,… cada segundo, indefinidamente.
- `.pipe(map(...))` transforma cada valor emitido.
- Suscribirse manualmente exige desuscribirse; por eso en este proyecto se usan **puentes a señales**:

### `toSignal` — `layout/status-bar.ts`

```ts
clock = toSignal(timer(0, 1000).pipe(map(() => new Date().toLocaleTimeString('en-GB'))), { initialValue: '--:--:--' });
```

Compara con `main.js` original: `setInterval` + `getElementById` + `textContent`. Aquí solo declaras
"el reloj es esto" y la plantilla muestra `{{ clock() }}`. Angular limpia la suscripción solo.

### `rxResource` — patrón para llamar a la API

La pantalla de demostración que lo usaba se retiró del sitio, pero `PortfolioApiService` sigue
disponible. Así se usaría en un componente:

```ts
private readonly api = inject(PortfolioApiService);
hello = rxResource({ stream: () => this.api.getHello() });
```

```html
@if (hello.isLoading()) { … } @else if (hello.error()) { … } @else { {{ hello.value() | json }} }
```

Ofrece señales `value()`, `error()`, `isLoading()`. Es el reemplazo de los `try/catch` + manipular el
DOM a mano del original: el estado de error aparece sin que escribas código para "mostrarlo", solo
la plantilla `@if` reacciona.

## 10. Estilos

Aquí los estilos son globales (`src/styles.css`, copiados de `reset.css` + `main.css`), por eso los
componentes usan las mismas clases (`card`, `hero`, `section`…). Angular también soporta **estilos por
componente** (`styles: [...]` o `styleUrl`), que quedan encapsulados al componente. Ver ejercicio 5.

## 11. Comandos del CLI

```bash
npm start                              # ng serve: desarrollo con recarga
npm run build                          # build de producción (dist/)
npx ng generate component shared/card  # crea shared/card/card.ts (+ html/css)
npx ng generate service services/x     # crea un servicio
```

## 12. Caso práctico: el fondo de puntos (`layout/dot-background.ts`)

Un componente que dibuja en un `<canvas>` en vez de usar HTML. Sirve para ver cómo Angular se lleva
con APIs del navegador:

| Técnica | Dónde | Para qué |
|---|---|---|
| `viewChild.required('canvas')` | `canvasRef` | Obtener el elemento del DOM de la plantilla (`<canvas #canvas>`) |
| `afterNextRender(() => …)` | constructor | Ejecutar código **solo cuando el DOM ya existe** y en el navegador (el canvas no existe antes) |
| `DestroyRef.onDestroy(…)` | final de `start()` | Quitar listeners y cancelar el `requestAnimationFrame` cuando el componente se destruye |
| `styles` | decorador | Estilos **encapsulados** del componente (solo afectan a su `<canvas>`) |

Cómo funciona el efecto:

1. Se dibuja una grilla de puntos tenues (uno cada 28 px).
2. `window` escucha `pointermove` (el canvas tiene `pointer-events: none`, el mouse lo atraviesa).
3. En cada frame, cada punto calcula su distancia al cursor. Si está dentro de 170 px, su
   **intensidad objetivo** sube (más cerca = más intensa).
4. La intensidad real se acerca a la objetivo un 14 % por frame (`EASE`), por eso los puntos se
   encienden y se apagan con una "estela" suave en lugar de saltar.
5. Más intensidad = más opaco, más grande y un verde algo más claro.

Detalles que vale la pena notar:

- `z-index: -1` deja el canvas **detrás** del contenido; solo se ve donde no hay un fondo propio
  (hero y secciones), no detrás de las tarjetas ni de la barra de navegación.
- El bucle de animación solo corre mientras hay algo que animar. En reposo no gasta CPU.
- Respeta `prefers-reduced-motion`: si el usuario lo activa en su sistema, se dibuja la grilla
  estática sin el efecto.
- Esta app **no usa zone.js** (es *zoneless*, el modo por defecto de Angular nuevo): Angular solo
  actualiza la pantalla cuando cambia una señal, así que un `requestAnimationFrame` a 60 fps no
  dispara trabajo de Angular. En proyectos antiguos con zone.js habría que envolver el bucle en
  `NgZone.runOutsideAngular()`.
- Constantes ajustables al inicio del archivo: `SPACING`, `INFLUENCE`, `EASE`, `BASE_ALPHA`,
  `MAX_GROWTH`. Prueba a cambiarlas con `npm start` abierto.

---

## Ejercicios (de fácil a difícil)

1. **Agregar un proyecto.** Añade un objeto en `PROJECTS` (`data/portfolio.data.ts`) con sus textos en
   los dos idiomas. Verifica que aparece en la tabla y en las fichas, y que el contador `05 ENTRIES` cambia.
2. **Nueva sección "Contacto".** Agrega un `<section id="contact">` en `portfolio.ts` y una entrada
   en `SECTIONS` (`services/section-spy.ts`): el menú lateral la incluye solo. Añade sus textos a `ui.ts`.
3. **Interactividad con eventos.** En la sección Experimentos, añade botones de filtro por etiqueta (`C#`, `LINQ`…).
   Necesitarás una `signal` con el filtro seleccionado, `(click)="filtro.set('LINQ')"` y un `computed`
   que devuelva la lista filtrada. Es el ejercicio clave: junta señales + eventos + `@for`.
4. **Extraer un componente `Card`.** Las secciones Stack, Proyectos y Experimentos repiten el `<article class="card">`.
   Crea `shared/card.ts` con `input()`s y proyección de contenido.
5. **Estilos encapsulados.** Mueve las reglas de `.marquee` desde `styles.css` a `marquee.ts` usando
   `styles: [...]`. Observa en las DevTools los atributos `_ngcontent-*` que Angular añade.
6. **Pipe propio.** Crea un pipe `padZero` que reemplace `length.toString().padStart(2, '0')`
   (aparece en `project-registry.ts` y `portfolio.ts`).
7. **Formulario.** Una página con formulario de contacto usando `FormsModule` o formularios reactivos
   (`@angular/forms` ya está instalado).
8. **Tests.** Añade una prueba para `Marquee` (`npm test`; el proyecto se generó sin tests).
9. **Personalizar el fondo.** Haz que el color de los puntos se lea de la variable CSS `--text`
   (`getComputedStyle(document.documentElement).getPropertyValue('--text')`) en vez de estar
   escrito en el código; o añade una señal para activar/desactivar el efecto con un botón.
10. **Desplegar.** Sigue [DESPLIEGUE-AZURE.md](DESPLIEGUE-AZURE.md) para publicar el sitio.
11. **Un tercer idioma.** Añade `'fr'` al tipo `Lang`, una clave `fr` en `Localized` y un botón en el
    selector. El compilador te señalará cada texto al que le falta la traducción.
12. **Volver a usar la API.** Crea un componente con `rxResource` que llame a
    `PortfolioApiService.getHello()` y muéstralo en una sección nueva (ejercicio 2). Necesitas el backend
    corriendo (`dotnet run --urls http://localhost:5050` en `backend/`) y revisar `API_BASE`.

## Glosario rápido

- **SPA:** una sola página HTML; el router cambia el contenido sin recargar.
- **Standalone:** componente que declara sus propias dependencias (sin `NgModule`).
- **Signal:** valor reactivo que se lee con `()`.
- **Observable:** flujo de valores en el tiempo (RxJS); `HttpClient` los devuelve.
- **DI (inyección de dependencias):** pedir objetos a Angular con `inject()` en vez de crearlos.
- **Lazy loading:** descargar el código de una ruta solo cuando se visita.
- **Pipe:** transformador de presentación dentro de una plantilla (`| json`).

## Para seguir estudiando

- Documentación oficial: https://angular.dev (tutoriales interactivos en "Learn Angular").
- Orden recomendado después de esta guía: formularios → pruebas → interceptores HTTP → guards de ruta.

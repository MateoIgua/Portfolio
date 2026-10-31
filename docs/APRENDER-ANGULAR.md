# Aprender Angular con este portafolio

Guía de estudio. Cada concepto se explica con código **real de este proyecto**, comparándolo con
cómo se hacía en el HTML original (`frontend/`). Ábrelos lado a lado.

Para ejecutar: `cd frontend-angular && npm install && npm start` → http://localhost:4200.
Con el servidor corriendo, cada cambio que guardes se refleja al instante.

## Ruta de lectura sugerida

1. `src/main.ts` → `src/app/app.config.ts` → `src/app/app.ts` (cómo arranca todo)
2. `layout/footer.ts` (el componente más simple)
3. `shared/marquee.ts` y `shared/hero.ts` (inputs y proyección)
4. `layout/navbar.ts` (rutas y `@for`)
5. `app.routes.ts` y `pages/projects/projects.ts`
6. `layout/status-bar.ts` (señales + RxJS)
7. `services/` y `pages/widget-demo/widget-demo.ts` (HTTP)

---

## 1. Qué es Angular y qué cambia

En el HTML original, **cada página es un archivo** y navegar = pedir otro archivo al servidor.
En Angular hay **una sola página** (`src/index.html` con `<app-root>`) y JavaScript pinta distintas
"pantallas" según la URL: es una **SPA** (Single Page Application). Navegar no recarga el sitio.

Angular se compone de piezas pequeñas que encajan:

| Pieza | Para qué | Ejemplo aquí |
|---|---|---|
| **Componente** | Un trozo de UI (HTML + lógica + estilo) | `Footer`, `Hero`, `Home` |
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
| `{{ expr }}` | Interpolación: muestra un valor | `{{ p.name }}` en `projects.ts` |
| `[prop]="expr"` | Enlazar una propiedad (datos → hijo/DOM) | `<app-marquee [words]="tech" />` |
| `(evento)="fn()"` | Escuchar un evento (no hay ejemplo aún; ver ejercicio 3) | `(click)="…"` |
| `@for` | Repetir | tarjetas de `home.ts` |
| `@if / @else` | Condicional | estados del widget en `widget-demo.ts` |
| `\| pipe` | Transformar para mostrar | `{{ hello.value() \| json }}` |

### `@for` y el `track`

```html
@for (p of projects; track p.id) {
  <article class="card"> … {{ p.name }} … </article>
}
```

`track` le dice a Angular cómo identificar cada elemento para no repintar todo cuando la lista cambia.
Usa un id único. Variables útiles: `$index`, `$first`, `$last` (se usa `$last` en `projects.ts` para no
poner el separador `·` después de la última etiqueta).

> Antes: 4 bloques `<article>` copiados a mano. Ahora: 1 plantilla + 4 objetos en `data/`.

### `@if`

En `widget-demo.ts` hay tres estados mutuamente excluyentes:

```html
@if (hello.isLoading()) { … } @else if (hello.error()) { … } @else { … }
```

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
los elementos que lleven el atributo `cta` (los botones de `home.ts`).

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

`app.routes.ts` es una tabla `URL → componente`:

```ts
{ path: 'proyectos', title: 'PROYECTOS / MATEO IGUA', loadComponent: () => import('./pages/projects/projects').then(m => m.Projects) }
```

- `loadComponent` + `import()` = **lazy loading**: ese componente se compila a un archivo JS aparte
  que solo se descarga al visitar la ruta. (Mira la salida de `npm run build`: un chunk por página.)
- `title` cambia el `<title>` de la pestaña.
- `path: '**'` captura cualquier URL desconocida → página 404 (reemplaza a `404.html`).
- En `app.ts`, `<router-outlet />` marca dónde se pinta la página actual.

En plantillas **no uses `href="/proyectos"`** (recargaría todo): usa `routerLink`:

```html
<a [routerLink]="item.path" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
```

`routerLinkActive` añade la clase `active` al enlace de la ruta actual. En el HTML original esa clase
se escribía a mano en cada archivo. `exact: true` evita que "HOME" (`/`) se marque activo en todas las rutas.

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

### `rxResource` — `pages/widget-demo/widget-demo.ts`

```ts
hello = rxResource({ stream: () => this.api.getHello() });
```

Ofrece señales `value()`, `error()`, `isLoading()`. Es el reemplazo de los `try/catch` + manipular el
DOM a mano del original. Observa cómo el estado de error (✗) aparece sin que escribas código para
"mostrarlo": solo la plantilla `@if` reacciona.

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

---

## Ejercicios (de fácil a difícil)

1. **Agregar un proyecto.** Añade un objeto en `PROJECTS` (`data/portfolio.data.ts`). Verifica que
   aparece en la tabla de Home, en la de Proyectos y en las fichas, y que el contador `05 ENTRIES` cambia.
2. **Nueva página "Contacto".** Crea `pages/contact/contact.ts`, agrega la ruta en `app.routes.ts` y el
   ítem en `Navbar.items`. Reutiliza `<app-hero>`.
3. **Interactividad con eventos.** En Experimentos, añade botones de filtro por etiqueta (`C#`, `LINQ`…).
   Necesitarás una `signal` con el filtro seleccionado, `(click)="filtro.set('LINQ')"` y un `computed`
   que devuelva la lista filtrada. Es el ejercicio clave: junta señales + eventos + `@for`.
4. **Extraer un componente `Card`.** Home, Proyectos y Experimentos repiten el `<article class="card">`.
   Crea `shared/card.ts` con `input()`s y proyección de contenido.
5. **Estilos encapsulados.** Mueve las reglas de `.marquee` desde `styles.css` a `marquee.ts` usando
   `styles: [...]`. Observa en las DevTools los atributos `_ngcontent-*` que Angular añade.
6. **Pipe propio.** Crea un pipe `padZero` que reemplace `length.toString().padStart(2, '0')`
   (aparece en `project-registry.ts` y `experiments.ts`).
7. **Formulario.** Una página con formulario de contacto usando `FormsModule` o formularios reactivos
   (`@angular/forms` ya está instalado).
8. **Tests.** Añade una prueba para `Marquee` (`npm test`; el proyecto se generó sin tests).
9. **Desplegar.** Sigue la sección "Despliegue" de [ARQUITECTURA.md](ARQUITECTURA.md) para publicar la
   versión Angular en GitHub Pages.

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

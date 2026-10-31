# Arquitectura del portafolio

## Vista general

```
 Navegador
    │
    ├── frontend/            sitio estático (HTML/CSS/JS)         ──┐
    ├── frontend-angular/    SPA Angular (compila a archivos       ├─ se publican como archivos
    │                        estáticos en dist/)                  ──┘   estáticos (GitHub Pages)
    │
    └── fetch / HttpClient ──►  backend/  Portfolio.Api (ASP.NET Core, :5050)
                                  GET /api/hello
                                  GET /api/hello/now
```

El sitio es 100 % contenido estático; el backend solo lo usa la página `widget-demo` como ejemplo
de integración frontend ↔ API.

## Frontend original (`frontend/`)

- 6 páginas HTML (`index`, `proyectos`, `experimentos`, `sobre-mi`, `widget-demo`, `404`).
- Cada página repite a mano la status bar, la navegación y el footer.
- Estilos: `assets/css/reset.css` + `assets/css/main.css` (variables CSS en `:root`, diseño AS400).
- JS: `main.js` (reloj de la status bar) y `api-client.js` (`fetch` al backend).

**Problema que resuelve Angular:** el contenido (la tabla de proyectos, la barra de navegación, el
footer) está copiado en varios HTML. Cambiar un dato implica editar varios archivos.

## Frontend Angular (`frontend-angular/`)

```
src/
├── index.html               única página HTML; contiene <app-root>
├── styles.css               reset.css + main.css originales, sin cambios
├── main.ts                  arranque: bootstrapApplication(App, appConfig)
└── app/
    ├── app.ts               componente raíz: status-bar + navbar + <router-outlet> + footer
    ├── app.config.ts        providers globales (router, HttpClient)
    ├── app.routes.ts        URL → página (carga perezosa)
    ├── models/              interfaces TypeScript (Project, Skill, HelloResponse…)
    ├── data/                el contenido del sitio como datos (PROJECTS, SKILLS…)
    ├── services/            PortfolioApiService (HTTP) + API_BASE (URL del backend)
    ├── layout/              status-bar, navbar, footer (parte fija)
    ├── shared/              piezas reutilizables: hero, marquee, big-statement, project-registry
    └── pages/               una carpeta por ruta: home, projects, experiments, about, widget-demo, not-found
```

### Mapa HTML original → Angular

| Antes | Ahora |
|---|---|
| `index.html` | `pages/home/home.ts` en la ruta `/` |
| `proyectos.html` | `pages/projects/projects.ts` en `/proyectos` |
| `experimentos.html` | `pages/experiments/experiments.ts` en `/experimentos` |
| `sobre-mi.html` | `pages/about/about.ts` en `/sobre-mi` |
| `widget-demo.html` | `pages/widget-demo/widget-demo.ts` en `/widget-demo` |
| `404.html` | `pages/not-found/not-found.ts` en `**` (cualquier ruta desconocida) |
| `<header class="statusbar">` + `main.js` (reloj) | `layout/status-bar.ts` |
| `<nav>` copiado en cada HTML | `layout/navbar.ts` (una sola vez) |
| `<footer>` copiado | `layout/footer.ts` |
| `<section class="hero">` | `shared/hero.ts` |
| `<div class="marquee">` | `shared/marquee.ts` |
| tabla "PROJECT REGISTRY" (duplicada en Home y Proyectos) | `shared/project-registry.ts` |
| tarjetas escritas a mano | `@for` sobre `data/portfolio.data.ts` |
| `assets/js/api-client.js` | `services/portfolio-api.service.ts` |

### Decisiones de diseño

- **CSS global.** Se reutilizó el CSS tal cual en `styles.css` para que la migración sea visualmente
  idéntica y el foco esté en aprender Angular. Una evolución natural (ejercicio) es mover estilos a
  cada componente (ver la guía de estudio).
- **Contenido como datos.** Proyectos, experimentos, skills y stack están en `data/portfolio.data.ts`,
  tipados por `models/portfolio.models.ts`. Para agregar un proyecto se añade un objeto al arreglo.
- **Rutas con carga perezosa.** Cada página es un chunk JS separado que se descarga al visitarla.
- **Componentes standalone.** No hay `NgModule`; cada componente declara lo que usa en `imports`.

## Backend (`backend/`)

ASP.NET Core con un `HelloController` de prueba:

| Ruta | Respuesta |
|---|---|
| `GET /api/hello` | `{ message, from, timestamp }` |
| `GET /api/hello/now` | `{ iso, human, unix }` |

**CORS** (`Program.cs`, política `FrontendCorsPolicy`): solo los orígenes listados pueden llamar a la
API desde el navegador. En esta rama se añadió `http://localhost:4200` (el puerto de `ng serve`).
Si cambias de puerto o publicas en otro dominio, agrégalo ahí.

## URL del backend

`frontend-angular/src/app/services/api.config.ts` define el token `API_BASE`:

- en `localhost` / `127.0.0.1` → `http://localhost:5050`
- en cualquier otro host → `https://TU-BACKEND-EN-PRODUCCION.com` (**pendiente**: poner la URL real
  cuando el backend esté desplegado; hoy es un marcador, igual que en el sitio original).

## Despliegue

`.github/workflows/deploy.yml` publica la carpeta `frontend/` en GitHub Pages cuando hay push a
`master`. **No se modificó**, así que sigue publicando la versión HTML.

Para publicar la versión Angular harían falta estos cambios (no aplicados):

1. Instalar y compilar: `npm ci && npm run build` dentro de `frontend-angular`.
2. Subir `frontend-angular/dist/portfolio-angular/browser` como artefacto de Pages.
3. Como el sitio vive en `https://mateoigua.github.io/<repo>/`, compilar con
   `ng build --base-href /<repo>/`.
4. GitHub Pages no conoce las rutas de la SPA: copiar `index.html` como `404.html` en el build
   para que recargar `/proyectos` no dé error.

## Pendientes conocidos

- URL de producción del backend (`api.config.ts` y el workflow).
- No hay pruebas automáticas (se generó con `--skip-tests`).
- El enlace "ES" de la status bar es decorativo (no hay otros idiomas).

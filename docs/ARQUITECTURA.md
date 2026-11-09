# Arquitectura del portafolio

## Vista general

```
 Navegador
    │
    ├── frontend/            SPA Angular (compila a archivos       ──► Azure Static Web Apps
    │                        estáticos en dist/)
    │
    ├── frontend-html/       versión HTML de revisión (no se publica)
    │
    └── fetch / HttpClient ──►  backend/  Portfolio.Api (ASP.NET Core, :5050)
                                  GET /api/hello
                                  GET /api/hello/now
```

El sitio es 100 % contenido estático: hoy ninguna pantalla llama al backend. La API y el servicio de
Angular que la consume (`PortfolioApiService`) se conservan listos para futuros widgets.

## Versión HTML de revisión (`frontend-html/`)

Solo para comparar con la versión Angular. **No se publica en ningún lado.**

- 6 páginas HTML (`index`, `proyectos`, `experimentos`, `sobre-mi`, `widget-demo`, `404`).
- Cada página repite a mano la status bar, la navegación y el footer.
- Estilos: `assets/css/reset.css` + `assets/css/main.css` (variables CSS en `:root`, diseño AS400).
- JS: `main.js` (reloj de la status bar) y `api-client.js` (`fetch` al backend).

**Problema que resuelve Angular:** el contenido (la tabla de proyectos, la barra de navegación, el
footer) está copiado en varios HTML. Cambiar un dato implica editar varios archivos.

## Frontend Angular (`frontend/`)

El sitio es **una sola página** con cinco secciones (inicio, stack, proyectos, experimentos y sobre
mí), un menú vertical fijo a la derecha que resalta la sección visible, selector de idioma ES/EN y
diseño adaptable a móvil.

```
src/
├── index.html               única página HTML; contiene <app-root> (favicon en public/favicon.svg)
├── styles.css               reset + estilos globales (incluye el menú lateral y el responsive)
├── main.ts                  arranque: bootstrapApplication(App, appConfig)
└── app/
    ├── app.ts               componente raíz: dot-background + status-bar + <router-outlet> + footer
    ├── app.config.ts        providers globales (router, HttpClient)
    ├── app.routes.ts        '' → Portfolio; URL antiguas → /#seccion; '**' → 404
    ├── models/              interfaces TypeScript (Localized, Project, Experiment…)
    ├── data/                portfolio.data.ts (contenido bilingüe) y ui.ts (textos de la interfaz)
    ├── services/            I18n (idioma), SectionSpy (sección activa), PortfolioApiService, API_BASE
    ├── layout/              status-bar (marca, ruta, reloj, idioma), section-nav (menú derecho),
    │                        footer, dot-background
    ├── shared/              hero, marquee, big-statement
    └── pages/               portfolio (la página única), not-found
```

### Mapa HTML original → Angular

| Antes | Ahora |
|---|---|
| `index.html`, `proyectos.html`, `experimentos.html`, `sobre-mi.html` | Una sección cada una dentro de `pages/portfolio/portfolio.ts` (`#home`, `#stack`/`#projects`, `#experiments`, `#about`) |
| `widget-demo.html` | Retirada (la demo de API ya no está en el sitio) |
| `404.html` | `pages/not-found/not-found.ts` en `**` |
| `<header class="statusbar">` + `main.js` (reloj) | `layout/status-bar.ts` |
| `<nav>` copiado en cada HTML | `layout/section-nav.ts`: menú lateral derecho con scroll-spy |
| `<footer>` copiado | `layout/footer.ts` |
| (no existía) selector de idioma | `services/i18n.ts` + `data/ui.ts` |
| (no existía) fondo de puntos que reacciona al mouse | `layout/dot-background.ts` |
| `<section class="hero">` | `shared/hero.ts` (solo en el inicio) |
| `<div class="marquee">` (una por página) | `shared/marquee.ts`, una sola vez al final de la página |
| tabla "PROJECT REGISTRY" y tarjetas de proyectos | Lista fecha · título · código + panel de vista previa, dentro de `portfolio.ts` |
| tabla de skills | Retirada |
| tarjetas escritas a mano | `@for` sobre `data/portfolio.data.ts` |
| `assets/js/api-client.js` | `services/portfolio-api.service.ts` (sin uso en la interfaz por ahora) |

Las URL antiguas (`/proyectos`, `/experimentos`, `/sobre-mi`) redirigen a la sección equivalente
(`/#projects`, …); `/widget-demo` redirige al inicio.

### Decisiones de diseño

- **CSS global.** Se reutilizó el CSS original en `styles.css`; el foco está en aprender Angular. Una
  evolución natural (ejercicio) es mover estilos a cada componente.
- **Contenido como datos, en dos idiomas.** Proyectos, experimentos y stack están en
  `data/portfolio.data.ts`; cada texto es `{ es, en }`. Los textos fijos están en `data/ui.ts`.
  `I18n.t()` elige el del idioma activo (señal), así que cambiar de idioma repinta sin recargar.
- **Menú lateral con scroll-spy.** Se escucha el `scroll` y se calcula la sección activa
  (`SectionSpy.refresh()`); el resultado es una señal que leen el menú y la barra superior.
- **Marquesina única.** La cinta de tecnologías aparece una sola vez, al final de la página.
- **Favicon.** `public/favicon.svg` dibuja el `[MI]` de la barra superior; `favicon-64.png` es el respaldo para
  navegadores sin soporte de favicon SVG.
- **Proyectos 60 / 40.** Lista de filas (fecha de última modificación · título · enlace al código) a la
  izquierda y, a la derecha, vista previa + descripción del proyecto seleccionado. Si el proyecto no
  tiene `image`, el panel muestra su id como logo. Los datos están en `PROJECTS` (`updated`,
  `codeUrl`, `image`).
- **Hoja de vida.** El botón del bloque de contacto descarga `cv/Mateo-Igua-CV.pdf`; el archivo vive en
  `frontend/public/cv/` (cámbialo por tu PDF).
- **Título de la pestaña.** "Mateo Igua" (`index.html` y `app.routes.ts`).
- **Móvil.** Hasta 720 px: menú de marcas táctiles (la etiqueta aparece sobre cada línea al tocar),
  reloj oculto, botones a ancho completo y proyectos en una sola columna.
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

`frontend/src/app/services/api.config.ts` define el token `API_BASE` (hoy lo usa solo
`PortfolioApiService`, que ninguna pantalla consume):

- en `localhost` / `127.0.0.1` → `http://localhost:5050`
- en cualquier otro host → `https://TU-BACKEND-EN-PRODUCCION.com` (**pendiente**: poner la URL real
  cuando el backend esté desplegado; hoy es un marcador, igual que en el sitio original).

## Despliegue

**Plan elegido: Azure** (Static Web Apps + App Service + Azure SQL cuando haya datos). Guía completa en
[DESPLIEGUE-AZURE.md](DESPLIEGUE-AZURE.md). Lo que sigue describe el despliegue actual en GitHub Pages.

El sitio se publica con `.github/workflows/deploy-azure-frontend.yml` (Static Web Apps) y la API con
`.github/workflows/deploy-azure-api.yml` (App Service). Ambos se disparan con push a `master`.

El despliegue en GitHub Pages (`deploy.yml`) se eliminó: publicaba la carpeta `frontend/` y ahora
contiene la versión Angular, así que dejaría de funcionar.

## Pendientes conocidos

- URL de producción del backend (`api.config.ts` y el workflow).
- No hay pruebas automáticas (se generó con `--skip-tests`).
- El enlace "ES" de la status bar es decorativo (no hay otros idiomas).

# Portfolio — Mateo Igua

Portafolio personal con estética de terminal AS400 (verde sobre negro, fuentes VT323 y Space Mono).
Es un monorepo con tres piezas:

| Carpeta | Qué es | Tecnología |
|---|---|---|
| `frontend/` | Versión original del sitio | HTML + CSS + JS planos |
| `frontend-angular/` | Misma web reescrita para aprender Angular | Angular 22, TypeScript |
| `backend/` | API de ejemplo (`Portfolio.Api`) | ASP.NET Core, .NET 10 |

> Esta rama (`feature/frontend-angular`) existe para **estudiar Angular con un proyecto conocido**.
> `frontend/` se deja intacto para poder comparar lado a lado cada página HTML con su componente Angular.

## Documentación

- [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) — cómo está armado todo el portafolio (frontend, backend, CORS, despliegue).
- [docs/DESPLIEGUE-AZURE.md](docs/DESPLIEGUE-AZURE.md) — cómo publicar frontend + API + base de datos en Azure.
- [docs/APRENDER-ANGULAR.md](docs/APRENDER-ANGULAR.md) — guía de estudio: cada concepto de Angular explicado con el código real de este proyecto, y ejercicios.

## Cómo ejecutarlo

Requisitos: Node 20+ (probado con 26), npm, y .NET SDK para el backend.

### Frontend Angular

```bash
cd frontend-angular
npm install
npm start          # http://localhost:4200
```

### Backend (opcional; solo lo usa la página `/widget-demo`)

```bash
cd backend
dotnet run --urls http://localhost:5050
```

### Frontend original (HTML)

Cualquier servidor estático sirve, por ejemplo `npx live-server frontend --port=8080`.

## Comandos útiles de Angular

```bash
npm start                      # servidor de desarrollo con recarga automática
npm run build                  # build de producción en frontend-angular/dist/
npx ng generate component pages/contacto   # crea un componente nuevo
```

## Historia del proyecto

1. Blazor (primera versión)
2. HTML + CSS + JS puros (`frontend/`)
3. Angular (`frontend-angular/`, esta rama)

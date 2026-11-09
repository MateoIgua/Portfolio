# Portfolio — Mateo Igua

Portafolio personal con estética de terminal AS400 (verde sobre negro, fuentes VT323 y Space Mono).
Es un monorepo con tres carpetas:

| Carpeta | Qué es | Tecnología | ¿Producción? |
|---|---|---|---|
| `frontend/` | El sitio | Angular 22, TypeScript | Sí (Azure Static Web Apps) |
| `frontend-html/` | Versión original en HTML, solo como referencia | HTML + CSS + JS planos | **No** |
| `backend/` | API (`Portfolio.Api`) | ASP.NET Core, .NET 10 | Sí (Azure App Service) |

> `frontend-html/` se conserva para comparar cada página HTML con su componente Angular. No se publica.

## Documentación

- [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) — cómo está armado todo el portafolio (frontend, backend, CORS, despliegue).
- [docs/DESPLIEGUE-AZURE.md](docs/DESPLIEGUE-AZURE.md) — cómo publicar frontend + API + base de datos en Azure.
- [docs/APRENDER-ANGULAR.md](docs/APRENDER-ANGULAR.md) — guía de estudio: cada concepto de Angular explicado con el código real de este proyecto, y ejercicios.

## Hoja de vida

El botón "Descargar hoja de vida" (sección Sobre mí) descarga `frontend/public/cv/Mateo-Igua-CV.pdf`.
Coloca ahí tu PDF con ese nombre.

## Cómo ejecutarlo

Requisitos: Node 22+ (probado con 26), npm, y .NET SDK para el backend.

### Frontend (Angular)

```bash
cd frontend
npm install
npm start          # http://localhost:4200
```

### Backend (opcional; la interfaz actual no lo usa)

```bash
cd backend
dotnet run --urls http://localhost:5050
```

### Versión HTML de revisión

Cualquier servidor estático sirve, por ejemplo `npx live-server frontend-html --port=8080`.

## Comandos útiles de Angular

```bash
npm start                      # servidor de desarrollo con recarga automática
npm run build                  # build de producción en frontend/dist/
npx ng generate component pages/contacto   # crea un componente nuevo
```

## Historia del proyecto

1. Blazor (primera versión)
2. HTML + CSS + JS puros (`frontend-html/`, revisión)
3. Angular (`frontend/`, versión de producción)

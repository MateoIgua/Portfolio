# Publicar el portafolio en Azure (frontend + API + base de datos)

Objetivo: que el sitio esté en internet y sea **dinámico**: el frontend Angular llama a la API .NET,
y la API puede leer/escribir una base de datos. Así, cualquier widget nuevo (API → servicio Angular →
componente) funciona en producción igual que en tu máquina.

> **Estado:** el repositorio ya está preparado (workflows, CORS configurable, ruteo de la SPA), pero
> **nada se ha desplegado**: los recursos de Azure hay que crearlos desde tu cuenta, y los workflows
> nunca se han ejecutado. Los nombres de pantallas y las capas gratuitas de Azure cambian con el
> tiempo: verifícalos en el portal antes de contar con ellos.

## Arquitectura destino

```
 Navegador
    │
    ├── https://<tu-sitio>.azurestaticapps.net     Azure Static Web Apps   ← frontend (archivos estáticos)
    │
    └── https://<tu-api>.azurewebsites.net/api/…   Azure App Service       ← backend/ (ASP.NET Core, .NET 10)
                                                        │
                                                        └── Azure SQL Database (cuando agregues datos)
```

El frontend y la API están en **dominios distintos**, por eso la API necesita CORS (ya configurable) y el
frontend necesita saber la URL de la API (`API_BASE`).

## Qué ya está listo en el repo

| Pieza | Archivo | Para qué |
|---|---|---|
| Workflow del frontend | `.github/workflows/deploy-azure-frontend.yml` | Compila Angular y lo sube a Static Web Apps (push a `master` que toque `frontend/`) |
| Workflow de la API | `.github/workflows/deploy-azure-api.yml` | Publica `backend/` en App Service (push a `master` que toque `backend/`) |
| Ruteo de la SPA | `frontend/public/staticwebapp.config.json` | Que recargar `/proyectos` sirva `index.html` en vez de dar 404 |
| CORS por configuración | `backend/Program.cs`, `backend/appsettings.json` | Los orígenes permitidos se definen en configuración; en Azure añades el tuyo sin editar código |
| Health check | `GET /health` en la API | Para verificar que la API vive |
| Parche de seguridad | `backend/Portfolio.Api.csproj` | `Microsoft.OpenApi` fijado a 2.7.5 (la 2.0.0 transitiva tenía una vulnerabilidad conocida) |

## Paso a paso

### 0. Antes de empezar

- Cuenta de Azure y el repositorio en GitHub con esta rama fusionada a `master` (o ajusta `branches:` en los workflows).
- En Azure: crea un **presupuesto con alerta** (Cost Management → Budgets) por un monto bajo, para que
  un error no te cueste dinero sin enterarte.

### 1. Grupo de recursos

Crea un *resource group* (por ejemplo `rg-portfolio`) que contendrá todo; borrarlo elimina todo junto.

### 2. API: App Service

1. Crear recurso → **Web App** → *Publish: Code*, *Runtime stack: .NET 10*, *OS: Linux*.
2. Plan: el gratuito (F1) o uno básico (B1). El gratuito se "duerme" tras inactividad (la primera
   petición tarda) y tiene cuota de CPU; B1 tiene costo mensual. Confirma que **.NET 10** aparece
   disponible en tu región.
3. Cuando exista, anota la URL: `https://<nombre>.azurewebsites.net`.
4. *Settings → Environment variables*: añade `Cors__ExtraOrigins` = la URL del frontend del paso 3
   (puedes separar varias con comas). El doble guion bajo equivale a `:` en la configuración de .NET.
5. Descarga el **perfil de publicación** (*Overview → Get publish profile*). Si no te deja, habilita
   *Basic authentication* para SCM en *Settings → Configuration → General settings*.
6. En GitHub (*Settings → Secrets and variables → Actions*):
   - Secret `AZURE_WEBAPP_PUBLISH_PROFILE` = contenido completo del archivo descargado.
   - Variable `AZURE_WEBAPP_NAME` = el nombre de la Web App.

### 3. Frontend: Static Web Apps

1. Crear recurso → **Static Web App**, plan **Free**.
2. En *Deployment source* elige **Other** (los workflows de este repo ya hacen el despliegue; si eliges
   GitHub, Azure crea un workflow propio y tendrías dos).
3. Anota la URL (`https://<algo>.azurestaticapps.net`) y copia el **deployment token** (*Overview → Manage deployment token*).
4. En GitHub, secret `AZURE_STATIC_WEB_APPS_API_TOKEN` = ese token.
5. Vuelve al paso 2.4 y pon esta URL en `Cors__ExtraOrigins` si aún no lo hiciste.

### 4. Decirle al frontend dónde está la API

Edita `frontend/src/app/services/api.config.ts` y reemplaza el marcador
`https://TU-BACKEND-EN-PRODUCCION.com` por la URL de la API del paso 2.3. Haz commit.

### 5. Desplegar y verificar

1. Fusiona a `master` (o lanza cada workflow a mano desde la pestaña *Actions* → *Run workflow*).
2. Comprueba:
   - `https://<api>/health` → `{"status":"ok"}`
   - `https://<api>/api/hello` → JSON con `message`, `from` y `timestamp`
   - Recargar `https://<sitio>/proyectos` directamente → carga (no da 404)
3. Cuando un widget del sitio llame a la API y falle: abre las DevTools (F12) → *Console*. Un error de **CORS** significa que
   `Cors__ExtraOrigins` no coincide exactamente con el origen del sitio (esquema + dominio, sin ruta).

### 6. Retirar la publicación antigua

`.github/workflows/deploy.yml` publica la versión HTML en GitHub Pages. Cuando Azure funcione, elimínalo
(o desactívalo) para no tener dos sitios distintos públicos, y quita `https://mateoigua.github.io` de
`Cors:AllowedOrigins` si ya no lo usas.

## Base de datos (cuando la necesites)

Hoy la API **no usa base de datos**: todo lo anterior funciona sin ella. Cuando agregues una:

1. **Azure SQL Database**: crea el servidor y la base. Azure ofrece una capa gratuita con límites
   (verifícala en el portal). Permite el acceso desde servicios de Azure en el firewall del servidor.
2. En la API: `Microsoft.EntityFrameworkCore.SqlServer`, un `DbContext` y migraciones (`dotnet ef`).
3. **La cadena de conexión nunca va en el repositorio.**
   - En Azure: App Service → *Environment variables → Connection strings* (tipo `SQLAzure`).
   - En tu máquina: `dotnet user-secrets set "ConnectionStrings:Default" "…"` dentro de `backend/`.
4. Flujo para un widget con datos: tabla → entidad EF → endpoint en un controlador → método en
   `PortfolioApiService` → componente con `rxResource` (ver [APRENDER-ANGULAR.md](APRENDER-ANGULAR.md), sección 9).

Si prefieres MongoDB (está en tu stack): MongoDB Atlas tiene capa gratuita; el cambio es el paquete
(`MongoDB.Driver`) en vez de EF Core, y el mismo manejo de secretos.

## Seguridad básica para una API pública

- Cualquiera en internet puede llamar a tu API; CORS solo limita a **navegadores**, no a `curl`.
  No expongas endpoints que escriban datos sin autenticación.
- Mantén secretos solo en GitHub Secrets / variables de App Service, nunca en el código.
- Fuerza HTTPS (en App Service: *Settings → Configuration → HTTPS Only*).
- Considera límite de peticiones (*rate limiting*, incluido en ASP.NET Core) antes de exponer escrituras.

## Dominio propio (opcional)

Static Web Apps permite dominio personalizado con certificado gratuito (*Custom domains*). Si lo
usas, agrégalo también a `Cors__ExtraOrigins`.

## Pendientes y lo que no está verificado

- Ningún recurso de Azure se creó y ningún workflow se ejecutó: el primer despliegue puede requerir ajustes.
- Disponibilidad de .NET 10 en App Service y condiciones de las capas gratuitas: confirmar en el portal.
- `API_BASE` de producción sigue siendo un marcador hasta el paso 4.
- No hay pruebas automáticas que corran en el pipeline.

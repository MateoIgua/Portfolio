// =====================================================================
// Portfolio.Api — backend del portafolio personal de Mateo Igua.
// Stack: ASP.NET Core (Web API, controllers) sobre .NET 10.
//
// Flujo del archivo:
//   1) Configurar servicios (DI container, CORS, controllers, OpenAPI).
//   2) Construir la app.
//   3) Configurar el pipeline HTTP (orden importa).
//   4) Arrancar.
// =====================================================================

var builder = WebApplication.CreateBuilder(args);

// ---------------------------------------------------------------------
// 1) SERVICIOS
// ---------------------------------------------------------------------

// CORS — permite que el navegador del frontend nos llame desde otro origen.
// Sin esto, el navegador bloquea las peticiones (mismo-origen por defecto).
const string FrontendCorsPolicy = "FrontendCorsPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy =>
    {
        policy
            .WithOrigins(
                "https://mateoigua.github.io",  // producción (GitHub Pages)
                "http://localhost:8080",         // live-server por defecto
                "http://127.0.0.1:8080",
                "http://localhost:4200",         // Angular (ng serve)
                "http://localhost:5099",         // por si usás python http.server
                "http://127.0.0.1:5099"
            )
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Controllers — habilita las clases [ApiController] que viven en /Controllers.
builder.Services.AddControllers();

// OpenAPI — UI interactiva en /openapi/v1.json para explorar endpoints.
builder.Services.AddOpenApi();

var app = builder.Build();


// ---------------------------------------------------------------------
// 2) PIPELINE HTTP (el orden importa)
// ---------------------------------------------------------------------

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// CORS debe ir ANTES de UseAuthorization y MapControllers.
app.UseCors(FrontendCorsPolicy);

app.MapControllers();


// ---------------------------------------------------------------------
// 3) ARRANCAR
// ---------------------------------------------------------------------
app.Run();

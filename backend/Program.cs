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
//
// Los orígenes viven en la configuración, no en el código:
//   - Cors:AllowedOrigins  → lista fija (appsettings.json): GitHub Pages y localhost.
//   - Cors:ExtraOrigins    → texto separado por comas; sirve para añadir el dominio
//                            de producción sin tocar el repo. En Azure App Service se
//                            define como variable de entorno: Cors__ExtraOrigins
const string FrontendCorsPolicy = "FrontendCorsPolicy";

var allowedOrigins = (builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [])
    .Concat((builder.Configuration["Cors:ExtraOrigins"] ?? "")
        .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
    .Select(origin => origin.TrimEnd('/'))   // el navegador envía el origen sin "/" final
    .Distinct()
    .ToArray();

builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
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

// Health check — Azure (y cualquier monitor) puede consultarlo para saber si la API vive.
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));


// ---------------------------------------------------------------------
// 3) ARRANCAR
// ---------------------------------------------------------------------
app.Run();

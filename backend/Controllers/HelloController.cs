using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Controllers;

// =====================================================================
// HelloController — endpoint de prueba para verificar:
//   - Que el backend responde.
//   - Que CORS está bien configurado (lo llamamos desde el frontend).
//   - Que el formato JSON funciona.
//
// Rutas resultantes (por [Route("api/[controller]")]):
//   GET /api/hello       → mensaje genérico
//   GET /api/hello/now   → hora del servidor
// =====================================================================

[ApiController]
[Route("api/[controller]")]
public class HelloController : ControllerBase
{
    [HttpGet]
    public object Get()
    {
        return new
        {
            message = "Hola desde Portfolio.Api 👋",
            from = "ASP.NET Core sobre .NET 10",
            timestamp = DateTime.UtcNow
        };
    }

    [HttpGet("now")]
    public object Now()
    {
        var now = DateTime.Now;
        return new
        {
            iso = now.ToString("o"),
            human = now.ToString("dddd, dd 'de' MMMM 'de' yyyy, HH:mm:ss"),
            unix = DateTimeOffset.Now.ToUnixTimeSeconds()
        };
    }
}

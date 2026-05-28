# Mi primer proyecto serio en C#: lo que aprendí

Después de varios ejercicios pequeños, decidí construir algo un poco más grande: un sistema de gestión para un parqueadero. Suena simple, pero me hizo enfrentarme a decisiones que un "hello world" nunca obliga a tomar.

## El problema

Tenía un archivo `Program.cs` con más de 400 líneas. Toda la lógica vivía allí: registrar vehículos, calcular tarifas, mostrar reportes, leer del usuario. Funcionaba, pero modificar algo era doloroso.

## Aplicando SOLID

Empecé con el primer principio: **Single Responsibility**. Cada clase debería tener una sola razón para cambiar.

Esto me llevó a separar:

- `Vehiculo` — representa el dato.
- `RegistroVehiculo` — maneja entradas/salidas.
- `CalculadorTarifa` — calcula precios.
- `ReporteService` — genera reportes.
- `ConsolaUI` — interactúa con el usuario.

```csharp
public class CalculadorTarifa
{
    private readonly decimal _tarifaPorHora;

    public CalculadorTarifa(decimal tarifaPorHora)
    {
        _tarifaPorHora = tarifaPorHora;
    }

    public decimal Calcular(TimeSpan duracion)
    {
        return (decimal)duracion.TotalHours * _tarifaPorHora;
    }
}
```

De repente, escribir tests se volvió posible: cada pieza puede probarse aislada.

## Lo que aprendí

1. **No optimices antes de tiempo, pero tampoco esperes a tener un monstruo.** Si tu archivo pasa de 200 líneas, probablemente ya hay clases dentro esperando salir.
2. **La inyección por constructor es más simple de lo que parece.** No necesitas un framework de DI para empezar.
3. **Nombrar bien es más difícil que programar bien.** Pasé más tiempo decidiendo nombres que escribiendo lógica, y valió la pena.

## Siguiente paso

Ahora quiero migrar la UI de consola a Blazor, para que la misma lógica sirva en web. Como mantuve los servicios aislados, debería ser casi solo crear las páginas.

> El código limpio no es un destino, es una práctica diaria.

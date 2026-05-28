# Hola mundo: por qué armé mi portafolio en Blazor

Cuando decidí construir mi portafolio personal, sabía dos cosas: quería que **mostrara mis skills reales** y quería **disfrutar el proceso**. Como trabajo principalmente con C#, la pregunta natural fue: ¿se puede hacer un sitio web entero en C#?

La respuesta es sí, y se llama **Blazor**.

## ¿Qué es Blazor?

Blazor es un framework de Microsoft que permite construir aplicaciones web interactivas usando C# en lugar de JavaScript. Tiene varios sabores:

- **Blazor WebAssembly**: el código C# se compila a WASM y corre directamente en el navegador.
- **Blazor Server**: el código corre en el servidor y se comunica con el navegador vía SignalR.
- **Blazor Hybrid / SSR**: combina renderizado en servidor con interactividad en cliente.

Para un portafolio personal elegí **WebAssembly** porque:

1. Hosting gratis en GitHub Pages o Cloudflare Pages.
2. Cero servidor que mantener.
3. Es una buena forma de demostrar conocimiento de .NET moderno.

## El stack final

```text
- Blazor WebAssembly (.NET 10)
- CSS custom (sin frameworks UI)
- Markdig para renderizar Markdown
- GitHub Pages para hosting
```

Sin Bootstrap, sin Tailwind, sin JavaScript adicional. **Todo en C#.**

## Lo que viene

En siguientes posts voy a documentar cosas que aprenda mientras programo: refactorizaciones, patrones que me parezcan útiles y los errores en los que caiga. La idea es que este blog sea también una forma de consolidar lo que estudio.

> Si lo puedes explicar, lo entiendes. Si no, todavía no.

Nos leemos pronto.

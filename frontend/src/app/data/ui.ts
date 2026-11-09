import { Localized } from '../models/portfolio.models';

const l = (es: string, en: string = es): Localized => ({ es, en });

// Textos fijos de la interfaz (los que no son "datos" como proyectos o experimentos).
// Para añadir un idioma habría que agregar una clave más a cada l(...) y a `Lang`.
export const UI = {
  // Barra superior / pie
  langLabel: l('Idioma', 'Language'),
  railLabel: l('Secciones de la página', 'Page sections'),
  footerUpdate: l('v3.0 · ÚLTIMA ACTUALIZACIÓN 2026-10-31', 'v3.0 · LAST UPDATE 2026-10-31'),

  // Inicio
  heroLabel: l('DEVELOPER · .NET / C#'),
  heroText: l(
    'Construyo backend y herramientas con C# y .NET. Práctico arquitectura limpia, refactorización y automatización. Acá vive lo que voy aprendiendo.',
    "I build backend services and tools with C# and .NET. I practice clean architecture, refactoring and automation. What I'm learning lives here.",
  ),
  ctaProjects: l('VER PROYECTOS →', 'VIEW PROJECTS →'),
  ctaAbout: l('SOBRE MÍ', 'ABOUT ME'),

  // Stack
  stackLabel: l('STACK'),
  stackTitle: l('EN QUÉ TRABAJO', 'WHAT I WORK WITH'),
  interestedIn: l('Interesado en:', 'Interested in:'),
  statementStackPre: l('EL CÓDIGO LIMPIO NO ES UN DESTINO, ES UNA ', "CLEAN CODE ISN'T A DESTINATION, IT'S A "),
  statementStackAccent: l('PRÁCTICA DIARIA', 'DAILY PRACTICE'),
  nowLabel: l('AHORA', 'NOW'),
  nowTitle: l('EN QUÉ ESTOY', "WHAT I'M DOING"),
  nowText: l(
    'Reconstruyendo este portafolio en Angular para aprender el framework a partir de un proyecto real que ya conozco: componentes, rutas, servicios y señales. Antes vivió en Blazor y en HTML/CSS puros.',
    'Rebuilding this portfolio in Angular to learn the framework from a real project I already know: components, routing, services and signals. It used to live in Blazor and in plain HTML/CSS.',
  ),

  // Proyectos
  projectsLabel: l('REGISTRO DE PROYECTOS', 'PROJECT REGISTRY'),
  projectsTitle: l('PROYECTOS', 'PROJECTS'),
  projectsIntro: l(
    'Cosas que he construido mientras aprendo. Cada uno fue un experimento con un objetivo claro: entender un concepto, practicar un patrón, o simplemente hacer algo útil.',
    'Things I have built while learning. Each one was an experiment with a clear goal: understanding a concept, practicing a pattern, or simply making something useful.',
  ),
  code: l('→ CÓDIGO', '→ CODE'),
  projectList: l('Lista de proyectos', 'Project list'),
  statementProjectsPre: l('CADA PROYECTO RESPONDE A UNA ', 'EVERY PROJECT ANSWERS A '),
  statementProjectsAccent: l('PREGUNTA', 'QUESTION'),

  // Experimentos
  expLabel: l('LAB · PIEZAS CORTAS', 'LAB · SHORT PIECES'),
  expTitle: l('EXPERIMENTOS', 'EXPERIMENTS'),
  expIntro: l(
    'Pruebas chicas, snippets, ejercicios y exploraciones. Lugar donde aterrizan ideas antes de ser "proyectos" hechos y derechos. Aquí lo que importa es probar, no terminar.',
    'Small tests, snippets, exercises and explorations. A place where ideas land before they become full "projects". What matters here is trying things, not finishing them.',
  ),
  expLog: l('LAB · LOG'),
  statementExpPre: l('APRENDER ES ', 'LEARNING IS '),
  statementExpAccent: l('EXPERIMENTAR', 'EXPERIMENTING'),
  statementExpPost: l(' Y DOCUMENTAR.', ' AND DOCUMENTING.'),
  legendLabel: l('LEYENDA', 'LEGEND'),
  legendTitle: l('QUÉ ES ESTO', 'WHAT IS THIS'),
  legendText: l(
    'Estos experimentos son ejercicios cortos — algunos completos, otros a medio terminar. Sirven para fijar conceptos y tener material de referencia para futuros proyectos.',
    'These experiments are short exercises — some complete, some half-finished. They help me lock in concepts and keep reference material for future projects.',
  ),
  statusHeader: l('STATUS'),
  statusEntries: l('entradas', 'entries'),
  statusSelfPublished: l('Auto-publicados', 'Self-published'),
  statusNoWarranty: l('Sin garantía', 'No warranty'),
  statusOpenSource: l('Open source'),

  // Sobre mí
  aboutLabel: l('EXTRACT FROM: ABOUT.TXT'),
  aboutTitle: l('SOBRE MÍ', 'ABOUT ME'),
  aboutIntro: l(
    'Desarrollador en formación, enfocado en C# y el ecosistema .NET. Me interesa el diseño de sistemas backend, la arquitectura limpia y construir cosas que sean fáciles de mantener.',
    'Developer in training, focused on C# and the .NET ecosystem. I care about backend system design, clean architecture and building things that are easy to maintain.',
  ),
  whoLabel: l('QUIÉN', 'WHO'),
  whoTitle: l('EL DESARROLLADOR', 'THE DEVELOPER'),
  whoP1Pre: l('Soy ', "I'm "),
  whoP1Post: l(
    '. Llevo un tiempo construyendo proyectos personales en C# para fortalecer mis bases: arquitectura por capas, OOP, LINQ, EF Core y patrones de diseño.',
    '. For a while now I have been building personal projects in C# to strengthen my foundations: layered architecture, OOP, LINQ, EF Core and design patterns.',
  ),
  whoP2Pre: l(
    'Estoy convencido de que los ejercicios pequeños bien hechos enseñan más que proyectos enormes a medias. Por eso este portafolio tiene una sección entera de ',
    'I am convinced that small, well-done exercises teach more than huge half-finished projects. That is why this portfolio has an entire section of ',
  ),
  whoP2Strong: l('experimentos', 'experiments'),
  whoP2Post: l(': piezas cortas pero bien documentadas.', ': short but well-documented pieces.'),
  whoP3: l(
    'Fuera del código, me interesa entender por qué las cosas funcionan: leer sobre patrones, ver cómo resuelven problemas otros desarrolladores, y aplicar eso en lo siguiente que construyo.',
    'Outside of code, I like understanding why things work: reading about patterns, seeing how other developers solve problems, and applying that to whatever I build next.',
  ),
  contact: l('CONTACTO', 'CONTACT'),
  cvDownload: l('DESCARGAR HOJA DE VIDA ↓', 'DOWNLOAD RÉSUMÉ ↓'),
  quoteHeader: l('EXTRACT FROM · CITA', 'EXTRACT FROM · QUOTE'),
  quote: l(
    '"La variedad de soluciones es infinita. Si hoy, cuando tenemos miles de bibliotecas distintas, podemos distinguir miles de patrones, mañana, cuando aparezcan nuevos paradigmas, podremos distinguir diez, veinte o treinta mil más — no de manera imitativa, sino para combinarlos según nuestra imaginación."',
    '"The variety of solutions is infinite. If today, when we have thousands of different libraries, we can tell thousands of patterns apart, tomorrow, when new paradigms appear, we will be able to tell ten, twenty or thirty thousand more — not imitatively, but to combine them according to our imagination."',
  ),
  quoteAuthor: l('— LIBREMENTE ADAPTADO DE LUIGI RUSSOLO, 1913', '— LOOSELY ADAPTED FROM LUIGI RUSSOLO, 1913'),
  statementAboutPre: l('ESCRIBIR CÓDIGO ES ', 'WRITING CODE IS '),
  statementAboutAccent: l('PENSAR', 'THINKING'),
  statementAboutPost: l(' CLARO POR ESCRITO.', ' CLEARLY IN WRITING.'),

  // 404
  nfLabel: l('ERROR · RUTA NO ENCONTRADA', 'ERROR · ROUTE NOT FOUND'),
  nfText: l(
    'El recurso solicitado no existe en este sistema. Verifique la ruta o vuelva al INDEX.',
    'The requested resource does not exist in this system. Check the path or go back to the INDEX.',
  ),
  nfBack: l('← VOLVER AL INICIO', '← BACK TO HOME'),
};

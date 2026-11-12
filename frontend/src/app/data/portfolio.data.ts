import { BuildNote, Experiment, Localized, Project, Service, StackCard } from '../models/portfolio.models';

// Datos de contenido. Viven en UN solo lugar y las plantillas los recorren con @for.
// `l(es, en)` crea un texto bilingüe; si no se pasa `en`, el mismo texto sirve
// para los dos idiomas (por ejemplo "C#" o "SQL").
const l = (es: string, en: string = es): Localized => ({ es, en });

// `updated` es la fecha de la última modificación del proyecto (AAAA-MM-DD); '—' mientras
// el proyecto no exista aún. `codeUrl` apunta al perfil de GitHub hasta tener el repositorio
// de cada proyecto. `description` es la razón por la que lo hago. `image` (opcional) es la
// vista previa: pon el archivo en public/projects/ y escribe 'projects/nombre.png'.
const GITHUB = 'https://github.com/MateoIgua';

export const PROJECTS: Project[] = [
  {
    id: 'A', name: l('Bot de registro contable desde WhatsApp', 'Bookkeeping bot for WhatsApp'), updated: '—', codeUrl: GITHUB,
    description: l(
      'Enseña cómo funcionan las APIs: recibir mensajes, interpretarlos y guardarlos como registros contables.',
      'It teaches how APIs work: receiving messages, interpreting them and storing them as bookkeeping records.',
    ),
    tags: [l('APIS'), l('WHATSAPP')],
  },
  {
    id: 'B', name: l('Adaptador de hoja de vida', 'Résumé adapter'), updated: '—', codeUrl: GITHUB,
    description: l(
      'Muestra cómo funciona la IA, puntualmente Ollama: adaptar una hoja de vida a cada oferta.',
      'It shows how AI works, specifically Ollama: tailoring a résumé to each job offer.',
    ),
    tags: [l('IA', 'AI'), l('OLLAMA')],
  },
  {
    id: 'C', name: l('Videojuegos cooperativos por Wi-Fi', 'Co-op video games over Wi-Fi'), updated: '—', codeUrl: GITHUB,
    description: l(
      'Una forma de aprender redes: conectar jugadores en la misma red local y mantener el juego sincronizado.',
      'A way to learn networking: connecting players on the same local network and keeping the game in sync.',
    ),
    tags: [l('REDES', 'NETWORKING'), l('WI-FI')],
  },
  {
    id: 'D', name: l('Matera Tamagotchi', 'Tamagotchi planter'), updated: '—', codeUrl: GITHUB,
    description: l(
      'Aquí entra el hardware: una matera que cuenta cómo está su planta.',
      'This is where hardware comes in: a planter that tells you how its plant is doing.',
    ),
    tags: [l('HARDWARE')],
  },
  {
    id: 'E', name: l('Reconocimiento de plantas', 'Plant recognition'), updated: '—', codeUrl: GITHUB,
    description: l(
      'Un problema de gran responsabilidad: equivocarse al identificar una planta puede tener consecuencias.',
      'A problem with great responsibility: misidentifying a plant can have consequences.',
    ),
    tags: [l('IA', 'AI')],
  },
  {
    id: 'F', name: l('Panel de monitoreo de servicios', 'Service monitoring dashboard'), updated: '—', codeUrl: GITHUB,
    description: l(
      'Proyecto de ejemplo: un panel que consulta el estado de varios servicios y avisa cuando uno falla.',
      'Sample project: a dashboard that checks the status of several services and warns when one fails.',
    ),
    tags: [l('API'), l('MONITOREO', 'MONITORING')],
  },
  {
    id: 'G', name: l('Automatizador de despliegues', 'Deployment automator'), updated: '—', codeUrl: GITHUB,
    description: l(
      'Proyecto de ejemplo: scripts y flujos que compilan, prueban y publican un cambio sin pasos manuales.',
      'Sample project: scripts and workflows that build, test and publish a change with no manual steps.',
    ),
    tags: [l('DEVOPS'), l('CI/CD')],
  },
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'EXP-001', title: l('FORMATEO DE JSON', 'JSON FORMATTING'),
    description: l(
      'Formateador de JSON desde cero: indentación, validación y manejo de errores con posición exacta.',
      'JSON formatter from scratch: indentation, validation and error handling with the exact position.',
    ),
    tags: [l('C#'), l('JSON')],
  },
  {
    id: 'EXP-002', title: l('FIRMA DE DOCUMENTOS', 'DOCUMENT SIGNING'),
    description: l(
      'Firmar un documento y verificar la firma para detectar cualquier cambio posterior.',
      'Signing a document and verifying the signature to detect any later change.',
    ),
    tags: [l('C#'), l('CRIPTOGRAFÍA', 'CRYPTOGRAPHY')],
  },
  {
    id: 'EXP-003', title: l('DESERIALIZACIÓN DE OBJETOS', 'OBJECT DESERIALIZATION'),
    description: l(
      'Convertir texto en objetos tipados: cómo funciona por dentro y qué riesgos tiene con datos no confiables.',
      'Turning text into typed objects: how it works inside and what risks it has with untrusted data.',
    ),
    tags: [l('C#'), l('SERIALIZACIÓN', 'SERIALIZATION')],
  },
  {
    id: 'EXP-004', title: l('CREACIÓN DE SERVIDOR (HOST)', 'SERVER (HOST) CREATION'),
    description: l(
      'Levantar un servidor propio: escuchar conexiones, atender solicitudes y cerrar con orden.',
      'Standing up my own server: listening for connections, handling requests and shutting down cleanly.',
    ),
    tags: [l('C#'), l('REDES', 'NETWORKING')],
  },
  {
    id: 'EXP-005', title: l('MÓDULO DE ENCRIPTADO RSA', 'RSA ENCRYPTION MODULE'),
    description: l(
      'Un módulo para generar claves, cifrar y descifrar con RSA, entendiendo cada paso del algoritmo.',
      'A module to generate keys, encrypt and decrypt with RSA, understanding each step of the algorithm.',
    ),
    tags: [l('C#'), l('RSA')],
  },
  {
    id: 'EXP-006', title: l('PERFILADO DE RENDIMIENTO', 'PERFORMANCE PROFILING'),
    description: l(
      'Medir antes de optimizar: benchmarks y perfiles para encontrar el cuello de botella real de un programa.',
      'Measure before optimizing: benchmarks and profiles to find the real bottleneck of a program.',
    ),
    tags: [l('OPTIMIZACIÓN', 'OPTIMIZATION'), l('BENCHMARKS')],
  },
  {
    id: 'EXP-007', title: l('OPTIMIZACIÓN DE CONSULTAS SQL', 'SQL QUERY OPTIMIZATION'),
    description: l(
      'Leer planes de ejecución, crear índices y comparar tiempos de una misma consulta antes y después.',
      'Reading execution plans, creating indexes and comparing the times of the same query before and after.',
    ),
    tags: [l('SQL'), l('OPTIMIZACIÓN', 'OPTIMIZATION')],
  },
  {
    id: 'EXP-008', title: l('LEYENDO IL DE .NET', 'READING .NET IL'),
    description: l(
      'Desensamblar un programa .NET para ver en qué código intermedio lo convierte el compilador.',
      'Disassembling a .NET program to see which intermediate code the compiler turns it into.',
    ),
    tags: [l('INGENIERÍA INVERSA', 'REVERSE ENGINEERING'), l('.NET')],
  },
  {
    id: 'EXP-009', title: l('ANÁLISIS DE BINARIOS CON GHIDRA', 'BINARY ANALYSIS WITH GHIDRA'),
    description: l(
      'Abrir un ejecutable sin su código fuente, seguir su flujo y entender qué hace, con un crackme sencillo.',
      'Opening an executable without its source code, following its flow and understanding what it does, using a simple crackme.',
    ),
    tags: [l('INGENIERÍA INVERSA', 'REVERSE ENGINEERING'), l('GHIDRA')],
  },
];

export const SERVICES: Service[] = [
  {
    icon: '[01]',
    title: l('Optimización de páginas', 'Page optimization'),
    description: l(
      'Mejoro la velocidad, el rendimiento y la experiencia de tu sitio o aplicación web.',
      'I improve the speed, performance and user experience of your website or web app.',
    ),
  },
  {
    icon: '[02]',
    title: l('Mantenimiento de software', 'Software maintenance'),
    description: l(
      'Corrijo errores, actualizo dependencias y mantengo tu software estable en el tiempo.',
      'I fix bugs, update dependencies and keep your software stable over time.',
    ),
  },
  {
    icon: '[03]',
    title: l('Consultoría', 'Consulting'),
    description: l(
      'Analizo tus problemas y propongo soluciones técnicas que aporten valor a tu negocio.',
      'I analyze your problems and propose technical solutions that add value to your business.',
    ),
  },
];

// Página "Cómo se hizo": borrador del contenido (se puede reescribir con libertad).
export const BUILD_NOTES: BuildNote[] = [
  {
    icon: '[01]',
    title: l('Frontend', 'Frontend'),
    description: l(
      'Angular con componentes standalone, señales y rutas. Una sola página con secciones, menú lateral que sigue el scroll, idioma ES/EN y diseño adaptable a móvil.',
      'Angular with standalone components, signals and routing. A single page with sections, a side menu that follows the scroll, ES/EN language switch and a mobile-friendly layout.',
    ),
    tags: ['Angular', 'TypeScript', 'CSS'],
  },
  {
    icon: '[02]',
    title: l('Backend', 'Backend'),
    description: l(
      'API en ASP.NET Core con CORS configurable y un endpoint de salud. Hoy el sitio es estático; la API queda lista para futuros widgets.',
      'ASP.NET Core API with configurable CORS and a health endpoint. Today the site is static; the API is ready for future widgets.',
    ),
    tags: ['C#', '.NET 10'],
  },
  {
    icon: '[03]',
    title: l('Nube y dominio', 'Cloud and domain'),
    description: l(
      'Frontend en Azure Static Web Apps y API en Azure App Service, con dominio propio y DNS en Cloudflare.',
      'Frontend on Azure Static Web Apps and API on Azure App Service, with a custom domain and DNS on Cloudflare.',
    ),
    tags: ['Azure', 'Cloudflare'],
  },
  {
    icon: '[04]',
    title: l('Despliegue', 'Deployment'),
    description: l(
      'GitHub Actions compila y publica cada cambio que llega a la rama principal.',
      'GitHub Actions builds and publishes every change that reaches the main branch.',
    ),
    tags: ['GitHub Actions', 'Git'],
  },
];

export const STACK_CARDS: StackCard[] = [
  { icon: '[01]', title: l('LENGUAJES', 'LANGUAGES'), tags: ['C#', 'RPGLE', 'Python', 'CSS', 'HTML', 'SQL'], interestedIn: ['Rust', 'COBOL', 'Bash'] },
  { icon: '[02]', title: l('FRAMEWORKS'), tags: ['.NET', 'Angular'] },
  { icon: '[03]', title: l('BASES DE DATOS', 'DATABASES'), tags: ['SQL Server'], interestedIn: ['MongoDB', 'MySQL'] },
  { icon: '[04]', title: l('CLOUD'), tags: ['Azure'], interestedIn: ['Google Cloud', 'AWS'] },
  { icon: '[05]', title: l('IA', 'AI'), tags: ['Claude Code', 'Codex', 'Copilot'], interestedIn: ['Hermes'] },
  { icon: '[06]', title: l('SISTEMAS OPERATIVOS', 'OPERATING SYSTEMS'), tags: ['Windows', 'Android', 'Linux', 'OS/400'] },
  {
    icon: '[07]', title: l('HERRAMIENTAS', 'TOOLS'), tags: ['GitHub', 'Azure DevOps', 'Visual Studio', 'Postman', 'Swagger', 'Umbraco', 'Figma'],
    interestedIn: ['Docker', 'XUnit', 'Apache', 'Ghidra', 'Nginx', 'Godot', 'Unity', 'Blender'],
  },
];

// Palabras de la marquesina que cierra la página.
export const MARQUEE_WORDS = [
  'HIRE ME', "LET'S TALK", 'OPEN TO COLLAB',
  // Tecnologías de Stack (solo las que uso; se ignoran las de "Interesado en")
  ...STACK_CARDS.flatMap(c => c.tags).map(t => t.toUpperCase()),
];

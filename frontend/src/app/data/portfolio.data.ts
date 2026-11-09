import { Experiment, Localized, Project, Skill, StackCard } from '../models/portfolio.models';

// Datos de contenido. Viven en UN solo lugar y las plantillas los recorren con @for.
// `l(es, en)` crea un texto bilingüe; si no se pasa `en`, el mismo texto sirve
// para los dos idiomas (por ejemplo "C#" o "SQL").
const l = (es: string, en: string = es): Localized => ({ es, en });

const ACTIVE = l('ACTIVO', 'ACTIVE');
const ARCHIVED = l('ARCHIVO', 'ARCHIVED');

export const PROJECTS: Project[] = [
  {
    id: 'A', name: l('Servidor de Cotización', 'Quote Server'), stack: l('C# · ASP.NET CORE'), year: 2025, status: ACTIVE,
    description: l(
      'Servicio backend en C# para gestionar cotizaciones, con persistencia y endpoints REST. Práctica de arquitectura por capas y separación de responsabilidades.',
      'Backend service in C# to manage quotes, with persistence and REST endpoints. Practice of layered architecture and separation of concerns.',
    ),
    tags: [l('C#'), l('ASP.NET CORE'), l('REST')],
  },
  {
    id: 'B', name: l('Práctica Refactor', 'Refactoring Practice'), stack: l('C# · SOLID'), year: 2025, status: ACTIVE,
    description: l(
      'Ejercicios de refactorización aplicando principios SOLID y patrones de diseño sobre código legado. Foco en testabilidad y nombrado.',
      'Refactoring exercises applying SOLID principles and design patterns to legacy code. Focus on testability and naming.',
    ),
    tags: [l('C#'), l('SOLID'), l('PATRONES', 'PATTERNS')],
  },
  {
    id: 'C', name: l('Sistema Parqueadero', 'Parking System'), stack: l('C# · OOP'), year: 2024, status: ARCHIVED,
    description: l(
      'Aplicación de consola para gestionar ingreso y salida de vehículos en un parqueadero, calculando tarifas por tiempo. Práctica de OOP clásico.',
      'Console application to manage vehicle entry and exit in a parking lot, calculating fees by time. Classic OOP practice.',
    ),
    tags: [l('C#'), l('CONSOLA', 'CONSOLE'), l('OOP')],
  },
  {
    id: 'D', name: l('Logs Pruebas', 'Test Logs'), stack: l('C# · CONSOLA', 'C# · CONSOLE'), year: 2024, status: ARCHIVED,
    description: l(
      'Sandbox de pruebas y experimentos cortos con C#. Notas y snippets para no perder lo aprendido en ejercicios sueltos.',
      'Sandbox of tests and short experiments with C#. Notes and snippets so nothing learned in loose exercises gets lost.',
    ),
    tags: [l('C#'), l('SANDBOX')],
  },
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'EXP-001', title: 'PATTERN OBSERVER',
    description: l(
      'Implementación mínima del patrón Observer en C# sin librerías externas. Notas sobre cuándo conviene y cuándo no.',
      "Minimal implementation of the Observer pattern in C# without external libraries. Notes on when it fits and when it doesn't.",
    ),
    tags: [l('C#'), l('PATRONES', 'PATTERNS')],
  },
  {
    id: 'EXP-002', title: 'LINQ DEEP DIVE',
    description: l(
      'Comparación entre query syntax y method syntax. Performance y legibilidad en consultas grandes.',
      'Comparison between query syntax and method syntax. Performance and readability in large queries.',
    ),
    tags: [l('C#'), l('LINQ')],
  },
  {
    id: 'EXP-003', title: 'ASYNC / AWAIT',
    description: l(
      'Mini playground de tareas concurrentes en C#. Errores comunes con deadlocks y CancellationToken.',
      'Mini playground of concurrent tasks in C#. Common mistakes with deadlocks and CancellationToken.',
    ),
    tags: [l('C#'), l('ASYNC')],
  },
  {
    id: 'EXP-004', title: 'CSV PARSER',
    description: l(
      'Lector de CSV desde cero, sin librerías. Manejo de comillas, escapes y archivos grandes con streaming.',
      'CSV reader from scratch, no libraries. Handling of quotes, escapes and large files with streaming.',
    ),
    tags: [l('C#'), l('I/O')],
  },
  {
    id: 'EXP-005', title: 'TERMINAL UI',
    description: l(
      'Menús interactivos en consola con flechas y colores. Práctica con Console.ReadKey y ANSI escapes.',
      'Interactive console menus with arrows and colors. Practice with Console.ReadKey and ANSI escapes.',
    ),
    tags: [l('C#'), l('CONSOLA', 'CONSOLE')],
  },
  {
    id: 'EXP-006', title: 'REGEX TOOLKIT',
    description: l(
      'Colección de regex prácticas para email, URL, fechas. Cada una con casos de prueba y notas de los gotchas.',
      'Collection of practical regexes for email, URL and dates. Each one with test cases and notes on the gotchas.',
    ),
    tags: [l('C#'), l('REGEX')],
  },
];

export const SKILLS: Skill[] = [
  { id: 1, name: 'C#', category: l('LENGUAJE', 'LANGUAGE'), focus: l('BACKEND'), level: l('SÓLIDO', 'SOLID') },
  { id: 2, name: '.NET / ASP.NET CORE', category: l('FRAMEWORK'), focus: l('API · WEB'), level: l('EN CURSO', 'IN PROGRESS') },
  { id: 3, name: 'SQL', category: l('CONSULTAS', 'QUERY'), focus: l('DATOS', 'DATA'), level: l('SÓLIDO', 'SOLID') },
  { id: 4, name: 'EF CORE', category: l('ORM'), focus: l('PERSISTENCIA', 'PERSISTENCE'), level: l('EN CURSO', 'IN PROGRESS') },
  { id: 5, name: 'OOP / SOLID', category: l('DISEÑO', 'DESIGN'), focus: l('ARQUITECTURA', 'ARCHITECTURE'), level: l('PRACTICANDO', 'PRACTICING') },
  { id: 6, name: 'HTML / CSS', category: l('FRONTEND'), focus: l('UI'), level: l('BÁSICO', 'BASIC') },
  { id: 7, name: 'GIT', category: l('HERRAMIENTA', 'TOOL'), focus: l('VERSIONADO', 'VERSIONING'), level: l('EN CURSO', 'IN PROGRESS') },
  { id: 8, name: 'BLAZOR', category: l('FRAMEWORK'), focus: l('FRONTEND C#'), level: l('EXPLORANDO', 'EXPLORING') },
  { id: 9, name: 'ANGULAR', category: l('FRAMEWORK'), focus: l('FRONTEND TS'), level: l('EXPLORANDO', 'EXPLORING') },
];

export const STACK_CARDS: StackCard[] = [
  { icon: '[01]', title: l('BACKEND'), tags: ['C#', '.NET 10', 'RPGLE', 'Python'], interestedIn: ['RUST', '.NET 10'] },
  { icon: '[02]', title: l('FRONTEND'), tags: ['HTML', 'CSS', 'JS', 'Angular'] },
  { icon: '[03]', title: l('BASES DE DATOS', 'DATABASES'), tags: ['SQL Server', 'MongoDB'] },
  { icon: '[04]', title: l('CLOUD'), tags: ['Azure', '.NET 10'] },
  { icon: '[05]', title: l('DEVOPS'), tags: ['Docker', 'Git + GitHub'] },
  { icon: '[06]', title: l('Herramientas', 'Tools'), tags: ['Visual Studio', 'Postman', 'Swagger', 'xUnit', 'Umbraco'] },
  { icon: '[07]', title: l('Sistemas operativos', 'Operating systems'), tags: ['Windows', 'Android', 'Linux', 'OS/400'] },
];

// Palabras de la marquesina que cierra la página.
export const MARQUEE_WORDS = [
  'HIRE ME', "LET'S TALK", 'OPEN TO COLLAB', 'C#', '.NET', 'BLAZOR', 'ANGULAR', 'SQL', 'EF CORE',
  'SOLID', 'OOP', 'REFACTORING', 'GIT', 'OPEN SOURCE', 'LEARNING', 'BUILDING',
];

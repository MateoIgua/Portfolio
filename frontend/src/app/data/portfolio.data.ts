import { Experiment, Project, Skill, StackCard } from '../models/portfolio.models';

// Datos de contenido. Antes estaban copiados dentro del HTML (dos veces: en
// Home y en Proyectos). Ahora viven en UN solo lugar y las plantillas los
// recorren con @for.

export const PROJECTS: Project[] = [
  {
    id: 'A', name: 'Servidor de Cotización', stack: 'C# · ASP.NET CORE', year: 2025, status: 'ACTIVO',
    description: 'Servicio backend en C# para gestionar cotizaciones, con persistencia y endpoints REST. Práctica de arquitectura por capas y separación de responsabilidades.',
    tags: ['C#', 'ASP.NET CORE', 'REST'],
  },
  {
    id: 'B', name: 'Práctica Refactor', stack: 'C# · SOLID', year: 2025, status: 'ACTIVO',
    description: 'Ejercicios de refactorización aplicando principios SOLID y patrones de diseño sobre código legado. Foco en testabilidad y nombrado.',
    tags: ['C#', 'SOLID', 'PATRONES'],
  },
  {
    id: 'C', name: 'Sistema Parqueadero', stack: 'C# · OOP', year: 2024, status: 'ARCHIVO',
    description: 'Aplicación de consola para gestionar ingreso y salida de vehículos en un parqueadero, calculando tarifas por tiempo. Práctica de OOP clásico.',
    tags: ['C#', 'CONSOLA', 'OOP'],
  },
  {
    id: 'D', name: 'Logs Pruebas', stack: 'C# · CONSOLA', year: 2024, status: 'ARCHIVO',
    description: 'Sandbox de pruebas y experimentos cortos con C#. Notas y snippets para no perder lo aprendido en ejercicios sueltos.',
    tags: ['C#', 'SANDBOX'],
  },
];

export const EXPERIMENTS: Experiment[] = [
  { id: 'EXP-001', title: 'PATTERN OBSERVER', description: 'Implementación mínima del patrón Observer en C# sin librerías externas. Notas sobre cuándo conviene y cuándo no.', tags: ['C#', 'PATRONES'] },
  { id: 'EXP-002', title: 'LINQ DEEP DIVE', description: 'Comparación entre query syntax y method syntax. Performance y legibilidad en consultas grandes.', tags: ['C#', 'LINQ'] },
  { id: 'EXP-003', title: 'ASYNC / AWAIT', description: 'Mini playground de tareas concurrentes en C#. Errores comunes con deadlocks y CancellationToken.', tags: ['C#', 'ASYNC'] },
  { id: 'EXP-004', title: 'CSV PARSER', description: 'Lector de CSV desde cero, sin librerías. Manejo de comillas, escapes y archivos grandes con streaming.', tags: ['C#', 'I/O'] },
  { id: 'EXP-005', title: 'TERMINAL UI', description: 'Menús interactivos en consola con flechas y colores. Práctica con Console.ReadKey y ANSI escapes.', tags: ['C#', 'CONSOLA'] },
  { id: 'EXP-006', title: 'REGEX TOOLKIT', description: 'Colección de regex prácticas para email, URL, fechas. Cada una con casos de prueba y notas de los gotchas.', tags: ['C#', 'REGEX'] },
];

export const SKILLS: Skill[] = [
  { id: 1, name: 'C#', category: 'LANGUAGE', focus: 'BACKEND', level: 'SÓLIDO' },
  { id: 2, name: '.NET / ASP.NET CORE', category: 'FRAMEWORK', focus: 'API · WEB', level: 'EN CURSO' },
  { id: 3, name: 'SQL', category: 'QUERY', focus: 'DATOS', level: 'SÓLIDO' },
  { id: 4, name: 'EF CORE', category: 'ORM', focus: 'PERSISTENCIA', level: 'EN CURSO' },
  { id: 5, name: 'OOP / SOLID', category: 'DISEÑO', focus: 'ARQUITECTURA', level: 'PRACTICANDO' },
  { id: 6, name: 'HTML / CSS', category: 'FRONTEND', focus: 'UI', level: 'BÁSICO' },
  { id: 7, name: 'GIT', category: 'TOOL', focus: 'VERSIONADO', level: 'EN CURSO' },
  { id: 8, name: 'BLAZOR', category: 'FRAMEWORK', focus: 'FRONTEND C#', level: 'EXPLORANDO' },
  { id: 9, name: 'ANGULAR', category: 'FRAMEWORK', focus: 'FRONTEND TS', level: 'EXPLORANDO' },
];

export const STACK_CARDS: StackCard[] = [
  { icon: '[01]', title: 'BACKEND', tags: ['C#', '.NET 10', 'RPGLE', 'Python'], interestedIn: ['RUST', '.NET 10'] },
  { icon: '[02]', title: 'FRONTEND', tags: ['HTML', 'CSS', 'JS', 'Angular'] },
  { icon: '[03]', title: 'BASES DE DATOS', tags: ['SQL Server', 'MongoDB'] },
  { icon: '[04]', title: 'CLOUD', tags: ['Azure', '.NET 10'] },
  { icon: '[05]', title: 'DEVOPS', tags: ['Docker', 'Git + GitHub'] },
  { icon: '[06]', title: 'Herramientas', tags: ['Visual Studio', 'Postman', 'Swagger', 'xUnit', 'Umbraco'] },
  { icon: '[07]', title: 'Sistemas operativos', tags: ['Windows', 'Android', 'Linux', 'OS/400'] },
];

export const MARQUEE_TECH = ['C#', '.NET', 'BLAZOR', 'ANGULAR', 'SQL', 'EF CORE', 'SOLID', 'OOP', 'REFACTORING', 'GIT', 'VISUAL STUDIO'];
export const MARQUEE_EXPERIMENTS = ['EXPERIMENT', 'BUILD', 'LEARN', 'BREAK', 'FIX', 'REPEAT', 'NOTE', 'SHIP', 'REVIEW', 'ITERATE'];
export const MARQUEE_ABOUT = ['HIRE ME', "LET'S TALK", 'OPEN TO COLLAB', 'BACKEND', '.NET', 'C#', 'SOLID', 'OPEN SOURCE', 'LEARNING', 'BUILDING'];

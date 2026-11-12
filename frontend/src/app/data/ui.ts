import { Localized } from '../models/portfolio.models';

const l = (es: string, en: string = es): Localized => ({ es, en });

// Textos fijos de la interfaz (los que no son "datos" como proyectos o experimentos).
// Para añadir un idioma habría que agregar una clave más a cada l(...) y a `Lang`.
export const UI = {
  // Barra superior / pie
  langLabel: l('Idioma', 'Language'),
  railLabel: l('Secciones de la página', 'Page sections'),
  footerHow: l('CÓMO SE HIZO ESTE SITIO →', 'HOW THIS SITE WAS BUILT →'),
  footerUpdate: l('v3.0 · ÚLTIMA ACTUALIZACIÓN 2026-10-31', 'v3.0 · LAST UPDATE 2026-10-31'),

  // Inicio
  heroLabel: l('DEVELOPER · .NET / C#'),
  heroText: l(
    'Soy un ingeniero de sistemas con experiencia en el sector bancario y aeronáutico.\nMe intereso por los problemas de tu proyecto para poder aportar valor a tu negocio.',
    "I'm a systems engineer with experience in the banking and aeronautics sectors.\nI'm interested in the problems behind your project so I can add value to your business.",
  ),
  ctaProjects: l('VER PROYECTOS →', 'VIEW PROJECTS →'),
  ctaAbout: l('SOBRE MÍ', 'ABOUT ME'),

  // Stack
  stackLabel: l('STACK'),
  stackTitle: l('EN QUÉ TRABAJO', 'WHAT I WORK WITH'),
  interestedIn: l('Interesado en:', 'Interested in:'),
  statementStackPre: l('EL CÓDIGO LIMPIO NO ES UN DESTINO, ES UNA ', "CLEAN CODE ISN'T A DESTINATION, IT'S A "),
  statementStackAccent: l('PRÁCTICA DIARIA', 'DAILY PRACTICE'),

  // Servicios
  servicesLabel: l('SERVICIOS', 'SERVICES'),
  servicesTitle: l('EN QUÉ TE PUEDO AYUDAR', 'HOW I CAN HELP'),

  // Proyectos
  projectsLabel: l('REGISTRO DE PROYECTOS', 'PROJECT REGISTRY'),
  projectsTitle: l('PROYECTOS', 'PROJECTS'),
  projectsIntro: l(
    'Cada proyecto apunta a un problema real y a algo que quiero entender mejor.',
    'Every project aims at a real problem and at something I want to understand better.',
  ),
  code: l('→ CÓDIGO', '→ CODE'),
  projectWhy: l('POR QUÉ', 'WHY'),
  projectList: l('Lista de proyectos', 'Project list'),
  statementProjectsPre: l('CADA PROYECTO RESPONDE A UNA ', 'EVERY PROJECT ANSWERS A '),
  statementProjectsAccent: l('PREGUNTA', 'QUESTION'),

  // Experimentos (subsección de Proyectos)
  expTitle: l('EXPERIMENTOS', 'EXPERIMENTS'),
  expIntro: l(
    'Pruebas chicas, snippets, ejercicios y exploraciones. Lugar donde aterrizan ideas antes de ser "proyectos" hechos y derechos. Aquí lo que importa es probar, no terminar.',
    'Small tests, snippets, exercises and explorations. A place where ideas land before they become full "projects". What matters here is trying things, not finishing them.',
  ),

  // Sobre mí
  aboutLabel: l('EXTRACT FROM: ABOUT.TXT'),
  aboutTitle: l('SOBRE MÍ', 'ABOUT ME'),
  aboutP1: l(
    'Soy Mateo Igua, ingeniero de sistemas con 4 años de experiencia desarrollando soluciones. Me interesa el diseño de sistemas reales y que entreguen valor a sus usuarios. Los proyectos personales que construyo no solamente son para fortalecer mis habilidades sino también para transmitir confianza.',
    "I'm Mateo Igua, a systems engineer with 4 years of experience building solutions. I care about designing real systems that deliver value to their users. The personal projects I build are not only to strengthen my skills but also to build trust.",
  ),
  aboutP2: l(
    'Estoy convencido de que los ejercicios pequeños bien hechos enseñan más que proyectos enormes a medias. Por eso este portafolio tendrá una sección entera de experimentos: piezas cortas pero bien documentadas.',
    'I am convinced that small, well-done exercises teach more than huge half-finished projects. That is why this portfolio will have an entire section of experiments: short but well-documented pieces.',
  ),
  aboutP3: l(
    'Fuera del código, me interesa entender por qué las cosas funcionan: leer sobre patrones, ver cómo resuelven problemas otros desarrolladores, y aplicar eso en los siguientes proyectos.',
    'Outside of code, I like understanding why things work: reading about patterns, seeing how other developers solve problems, and applying that to my next projects.',
  ),
  contact: l('CONTACTO', 'CONTACT'),
  cvDownload: l('DESCARGAR HOJA DE VIDA ↓', 'DOWNLOAD RÉSUMÉ ↓'),
  statementAboutPre: l('ESCRIBIR CÓDIGO ES ', 'WRITING CODE IS '),
  statementAboutAccent: l('PENSAR', 'THINKING'),
  statementAboutPost: l(' CLARO POR ESCRITO.', ' CLEARLY IN WRITING.'),

  // Página "Cómo se hizo"
  howLabel: l('DETRÁS DE ESCENA', 'BEHIND THE SCENES'),
  howTop: l('CÓMO SE', 'HOW IT'),
  howBottom: l('HIZO', 'WAS BUILT'),
  howIntro: l(
    'Un recorrido por las piezas de este portafolio: qué tecnologías usa, cómo está organizado y cómo se publica.',
    'A tour of the pieces behind this portfolio: which technologies it uses, how it is organized and how it is published.',
  ),
  howBack: l('← VOLVER AL INICIO', '← BACK TO HOME'),

  // En construcción
  ucLabel: l('ESTADO · EN OBRAS', 'STATUS · WORK IN PROGRESS'),
  ucTitle: l('EN CONSTRUCCIÓN', 'UNDER CONSTRUCTION'),
  ucText: l('Esta página todavía no está lista. Vuelve pronto.', 'This page is not ready yet. Come back soon.'),
  expMore: l('→ VER MÁS', '→ READ MORE'),

  // 404
  nfLabel: l('ERROR · RUTA NO ENCONTRADA', 'ERROR · ROUTE NOT FOUND'),
  nfText: l(
    'El recurso solicitado no existe en este sistema. Verifique la ruta o vuelva al INDEX.',
    'The requested resource does not exist in this system. Check the path or go back to the INDEX.',
  ),
  nfBack: l('← VOLVER AL INICIO', '← BACK TO HOME'),
};

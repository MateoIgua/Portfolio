import { Routes } from '@angular/router';

// Tabla de rutas: URL → componente. loadComponent = carga perezosa (lazy):
// el código de cada página se descarga solo cuando el usuario la visita.
export const routes: Routes = [
  { path: '', title: 'MATEO IGUA / DEV TERMINAL', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'proyectos', title: 'PROYECTOS / MATEO IGUA', loadComponent: () => import('./pages/projects/projects').then(m => m.Projects) },
  { path: 'experimentos', title: 'EXPERIMENTOS / MATEO IGUA', loadComponent: () => import('./pages/experiments/experiments').then(m => m.Experiments) },
  { path: 'sobre-mi', title: 'SOBRE MÍ / MATEO IGUA', loadComponent: () => import('./pages/about/about').then(m => m.About) },
  { path: 'widget-demo', title: 'WIDGET DEMO / MATEO IGUA', loadComponent: () => import('./pages/widget-demo/widget-demo').then(m => m.WidgetDemo) },
  { path: '**', title: '404 / MATEO IGUA', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) },
];

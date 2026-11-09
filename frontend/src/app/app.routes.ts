import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Portfolio } from './pages/portfolio/portfolio';

// Las URL antiguas (/proyectos, /experimentos…) siguen funcionando: redirigen a
// la página única y bajan hasta la sección correspondiente (/#projects, etc.).
const toSection = (id: string) => () => inject(Router).parseUrl(`/#${id}`);

// Tabla de rutas: URL → componente. Ahora el sitio es UNA página con secciones;
// solo la ruta "no encontrada" se carga de forma perezosa (loadComponent).
export const routes: Routes = [
  { path: '', title: 'Mateo Igua', component: Portfolio },
  { path: 'proyectos', redirectTo: toSection('projects') },
  { path: 'experimentos', redirectTo: toSection('experiments') },
  { path: 'sobre-mi', redirectTo: toSection('about') },
  { path: 'widget-demo', redirectTo: '' }, // la demo de API se retiró
  { path: '**', title: '404 · Mateo Igua', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) },
];

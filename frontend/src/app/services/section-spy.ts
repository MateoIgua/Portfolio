import { Injectable, signal } from '@angular/core';
import { Localized } from '../models/portfolio.models';

export interface SectionDef {
  id: string;
  label: Localized;
}

// Las secciones de la página única, en orden. El id coincide con el id del
// elemento en el HTML; el menú de la derecha se genera a partir de esta lista.
export const SECTIONS: SectionDef[] = [
  { id: 'home', label: { es: 'INICIO', en: 'HOME' } },
  { id: 'stack', label: { es: 'STACK', en: 'STACK' } },
  { id: 'projects', label: { es: 'PROYECTOS', en: 'PROJECTS' } },
  { id: 'experiments', label: { es: 'EXPERIMENTOS', en: 'EXPERIMENTS' } },
  { id: 'about', label: { es: 'SOBRE MÍ', en: 'ABOUT' } },
  { id: 'api', label: { es: 'API', en: 'API' } },
];

// Guarda qué sección se está viendo (la calcula SectionNav al hacer scroll) para
// que el menú y la barra superior puedan leerla.
@Injectable({ providedIn: 'root' })
export class SectionSpy {
  readonly active = signal(SECTIONS[0].id);

  // smooth=false: salto directo (al cargar la página con /#seccion).
  scrollTo(id: string, smooth = true): void {
    const behavior: ScrollBehavior = smooth ? 'smooth' : 'instant';
    if (id === SECTIONS[0].id) {
      window.scrollTo({ top: 0, behavior });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
    }
    // Un salto directo no siempre emite un evento de scroll a tiempo: se recalcula ya.
    if (!smooth) this.refresh();
  }

  // La sección activa es la última cuya parte superior ya pasó el 40 % de la
  // altura de la ventana; al final de la página, siempre la última (si es corta,
  // su parte superior nunca llegaría al 40 %).
  refresh(): void {
    const doc = document.documentElement;
    let current = SECTIONS[0].id;
    if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) {
      current = SECTIONS[SECTIONS.length - 1].id;
    } else {
      const line = window.innerHeight * 0.4;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
    }
    this.active.set(current);
  }
}

import { Injectable, effect, signal } from '@angular/core';
import { Localized } from '../models/portfolio.models';

export type Lang = 'es' | 'en';

const STORAGE_KEY = 'lang';

// Idioma inicial: el que el visitante eligió la última vez; si no hay, el del navegador.
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    // localStorage puede no estar disponible (modo privado, etc.): se ignora.
  }
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
}

// Servicio de idioma. `lang` es un signal: cualquier plantilla que llame a
// t(...) se vuelve a pintar sola cuando cambia el idioma.
@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<Lang>(initialLang());

  constructor() {
    // Mantiene <html lang="…"> sincronizado (accesibilidad y buscadores) y guarda la elección.
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // ver arriba
      }
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }

  // Devuelve el texto en el idioma activo. Es una función flecha para poder
  // usarla suelta en las plantillas: {{ t(ui.title) }}.
  readonly t = (text: Localized): string => text[this.lang()];
}

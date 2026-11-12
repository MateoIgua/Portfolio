import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UI } from '../../data/ui';
import { I18n } from '../../services/i18n';

// Página genérica "En construcción": a ella llevan los enlaces de los experimentos
// y de "Cómo se hizo este sitio" mientras esas páginas no existan.
@Component({
  selector: 'app-under-construction',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="container">
        <p class="hero-label">{{ i18n.t(ui.ucLabel) }}</p>
        <h1 class="hero-title"><span class="accent">{{ i18n.t(ui.ucTitle) }}</span></h1>
        <p class="hero-tagline">{{ i18n.t(ui.ucText) }}</p>
        <div class="hero-cta">
          <a routerLink="/" class="btn btn--primary">{{ i18n.t(ui.nfBack) }}</a>
        </div>
      </div>
    </section>
  `,
})
export class UnderConstruction {
  protected readonly i18n = inject(I18n);
  protected readonly ui = UI;
}

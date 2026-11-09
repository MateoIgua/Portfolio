import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UI } from '../../data/ui';
import { I18n } from '../../services/i18n';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="container">
        <p class="hero-label api-error">{{ i18n.t(ui.nfLabel) }}</p>
        <h1 class="hero-title"><span class="accent">404</span></h1>
        <p class="hero-tagline">{{ i18n.t(ui.nfText) }}</p>
        <div class="hero-cta">
          <a routerLink="/" class="btn btn--primary">{{ i18n.t(ui.nfBack) }}</a>
        </div>
      </div>
    </section>
  `,
})
export class NotFound {
  protected readonly i18n = inject(I18n);
  protected readonly ui = UI;
}

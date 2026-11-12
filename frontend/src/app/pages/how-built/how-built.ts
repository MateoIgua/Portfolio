import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUILD_NOTES } from '../../data/portfolio.data';
import { UI } from '../../data/ui';
import { I18n } from '../../services/i18n';
import { Hero } from '../../shared/hero';

// Página aparte (ruta /como-se-hizo) con el mismo estilo que el resto del sitio.
// Reutiliza <app-hero>, las tarjetas (.cards-grid / .card) y los textos bilingües.
@Component({
  selector: 'app-how-built',
  imports: [RouterLink, Hero],
  template: `
    <app-hero [label]="i18n.t(ui.howLabel)" [top]="i18n.t(ui.howTop)" [bottom]="i18n.t(ui.howBottom)">
      {{ i18n.t(ui.howIntro) }}
    </app-hero>

    <section class="section">
      <div class="container">
        <div class="cards-grid">
          @for (n of notes; track n.icon) {
            <article class="card">
              <p class="card-icon">{{ n.icon }}</p>
              <h3 class="card-title">{{ i18n.t(n.title) }}</h3>
              <p class="card-text">{{ i18n.t(n.description) }}</p>
              <div class="tag-list">
                @for (tag of n.tags; track tag) {
                  <span class="tag">{{ tag }}</span>
                }
              </div>
            </article>
          }
        </div>

        <div class="hero-cta page-back">
          <a routerLink="/" class="btn btn--primary">{{ i18n.t(ui.howBack) }}</a>
        </div>
      </div>
    </section>
  `,
})
export class HowBuilt {
  protected readonly i18n = inject(I18n);
  protected readonly ui = UI;
  protected readonly notes = BUILD_NOTES;
}

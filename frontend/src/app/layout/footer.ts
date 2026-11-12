import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { UI } from '../data/ui';
import { I18n } from '../services/i18n';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer-inner">
        <span>&copy; 2026 MATEO IGUA</span>
        <!-- El enlace solo aparece en la página principal -->
        @if (isHome()) {
          <a routerLink="/en-construccion" class="footer-link">{{ i18n.t(ui.footerHow) }}</a>
        }
        <span>{{ i18n.t(ui.footerUpdate) }}</span>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly i18n = inject(I18n);
  protected readonly ui = UI;
  private readonly router = inject(Router);

  // Se recalcula en cada navegación; la página principal es la ruta "/" (con o sin #sección).
  private readonly url = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );
  protected readonly isHome = () => this.url().split(/[#?]/)[0] === '/';
}

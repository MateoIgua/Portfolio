import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { map, timer } from 'rxjs';
import { UI } from '../data/ui';
import { I18n, Lang } from '../services/i18n';
import { SectionSpy } from '../services/section-spy';

// Barra superior fija: marca (izquierda), reloj (centro, fijo) y selector de idioma (derecha).
// timer(0, 1000) emite cada segundo; toSignal lo convierte en un signal que la
// plantilla lee con clock(). Angular cancela la suscripción al destruir el componente.
@Component({
  selector: 'app-status-bar',
  template: `
    <header class="statusbar">
      <div class="container statusbar-inner">
        <a href="#home" class="brand" (click)="goHome($event)">
          <span class="bracket">[</span>MI<span class="bracket">]</span>
        </a>

        <div class="statusbar-cell statusbar-time">
          <span class="label">TIME:</span>
          <span class="value">{{ clock() }}</span>
        </div>

        <div class="lang" role="group" [attr.aria-label]="i18n.t(ui.langLabel)">
          @for (l of langs; track l) {
            <button
              type="button"
              [class.active]="i18n.lang() === l"
              [attr.aria-pressed]="i18n.lang() === l"
              (click)="i18n.set(l)"
            >
              {{ l.toUpperCase() }}
            </button>
          }
        </div>
      </div>
    </header>
  `,
})
export class StatusBar {
  protected readonly i18n = inject(I18n);
  protected readonly spy = inject(SectionSpy);
  private readonly router = inject(Router);
  protected readonly ui = UI;
  protected readonly langs: Lang[] = ['es', 'en'];

  protected readonly clock = toSignal(
    timer(0, 1000).pipe(map(() => new Date().toLocaleTimeString('en-GB'))),
    { initialValue: '--:--:--' },
  );

  protected goHome(event: Event): void {
    event.preventDefault();
    // En la página principal sube al inicio; en cualquier otra, vuelve a la principal.
    if (this.router.url.split(/[#?]/)[0] === '/') {
      this.spy.scrollTo('home');
    } else {
      this.router.navigateByUrl('/');
    }
  }
}

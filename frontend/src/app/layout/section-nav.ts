import { Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { UI } from '../data/ui';
import { I18n } from '../services/i18n';
import { SECTIONS, SectionSpy } from '../services/section-spy';

// Menú vertical fijo a la derecha. Muestra una marca por sección; la sección
// que se está viendo se resalta (marca larga + etiqueta en amarillo) y las demás
// quedan atenuadas. Al pasar el mouse (o enfocar con teclado) se despliegan todas
// las etiquetas.
//
// Para saber qué sección se ve, se escucha el scroll y se llama a
// SectionSpy.refresh() (ver services/section-spy.ts).
@Component({
  selector: 'app-section-nav',
  template: `
    <nav class="rail" [attr.aria-label]="i18n.t(ui.railLabel)">
      <ul>
        @for (s of sections; track s.id; let i = $index) {
          <li>
            <a
              class="rail-item"
              [href]="'#' + s.id"
              [class.active]="spy.active() === s.id"
              [attr.aria-current]="spy.active() === s.id ? 'true' : null"
              (click)="go($event, s.id)"
            >
              <span class="rail-label"
                ><span class="rail-num">{{ pad(i + 1) }}</span> {{ i18n.t(s.label) }}</span
              >
              <span class="rail-tick"></span>
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
})
export class SectionNav {
  protected readonly i18n = inject(I18n);
  protected readonly spy = inject(SectionSpy);
  protected readonly ui = UI;
  protected readonly sections = SECTIONS;

  constructor() {
    const destroyRef = inject(DestroyRef);

    // afterNextRender: el código solo corre en el navegador, cuando el DOM ya existe.
    afterNextRender(() => {
      // Son solo 6 elementos: calcular en cada evento de scroll es barato.
      const update = () => this.spy.refresh();

      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();

      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
      });
    });
  }

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.spy.scrollTo(id);
  }
}

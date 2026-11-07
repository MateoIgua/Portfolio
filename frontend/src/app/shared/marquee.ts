import { Component, computed, input } from '@angular/core';

// Componente reutilizable con un input(): el padre le pasa las palabras.
// Se duplica la lista para que la animación CSS (scroll) haga un bucle continuo.
@Component({
  selector: 'app-marquee',
  template: `
    <div class="marquee">
      <div class="marquee-track">
        @for (word of looped(); track $index) {
          <span>{{ word }}</span>
        }
      </div>
    </div>
  `,
})
export class Marquee {
  readonly words = input.required<string[]>();
  protected readonly looped = computed(() => [...this.words(), ...this.words()]);
}

import { Component, DestroyRef, afterNextRender, computed, inject, input, signal } from '@angular/core';

// Texto que se "escribe" carácter a carácter la primera vez que se abre la página y
// deja un cursor (línea) parpadeando al final.
//
// Truco de maquetación: el texto completo se pinta invisible (reserva el alto y es
// lo que leen los lectores de pantalla) y el texto que se va escribiendo se coloca
// encima. Así el contenido de abajo no se mueve mientras se escribe.
// Si el idioma cambia cuando ya terminó, se muestra el texto nuevo completo, sin animar.
@Component({
  selector: 'app-typewriter',
  template: `
    <span class="tw">
      <span class="tw-full">{{ text() }}</span>
      <span class="tw-typed" aria-hidden="true"
        >{{ visible() }}<span class="tw-cursor" [class.typing]="!finished()"></span
      ></span>
    </span>
  `,
})
export class TypeWriter {
  readonly text = input.required<string>();
  /** Milisegundos entre caracteres. */
  readonly speed = input(30);

  private readonly typed = signal(0);
  protected readonly finished = signal(false);
  protected readonly visible = computed(() =>
    this.finished() ? this.text() : this.text().slice(0, this.typed()),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);

    // afterNextRender: solo corre en el navegador, con el DOM ya pintado.
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.finished.set(true); // sin animación: texto completo desde el inicio
        return;
      }

      let timer: ReturnType<typeof setTimeout>;
      const step = () => {
        const full = this.text();
        const next = this.typed() + 1;
        if (next > full.length) {
          this.finished.set(true);
          return;
        }
        this.typed.set(next);
        // pausa más larga en los saltos de línea
        timer = setTimeout(step, full[next - 1] === '\n' ? 450 : this.speed());
      };
      timer = setTimeout(step, 500);
      destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}

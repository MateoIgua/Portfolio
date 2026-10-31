import { Component, input } from '@angular/core';

// Hero reutilizable. Usa dos técnicas:
//  - input(): datos simples (etiqueta y las dos líneas del título).
//  - <ng-content>: "proyección de contenido"; lo que el padre escribe entre
//    <app-hero>…</app-hero> aparece donde está el <ng-content>.
@Component({
  selector: 'app-hero',
  template: `
    <section class="hero">
      <div class="container">
        <p class="hero-label">{{ label() }}</p>
        <h1 class="hero-title">
          {{ top() }}<br />
          {{ bottom() }}<span class="accent">.</span>
        </h1>
        <p class="hero-tagline"><ng-content /></p>
        <ng-content select="[cta]" />
      </div>
    </section>
  `,
})
export class Hero {
  readonly label = input.required<string>();
  readonly top = input.required<string>();
  readonly bottom = input.required<string>();
}

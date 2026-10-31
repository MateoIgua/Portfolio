import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="container">
        <p class="hero-label" style="color: var(--error)">ERROR · RUTA NO ENCONTRADA</p>
        <h1 class="hero-title"><span class="accent">404</span></h1>
        <p class="hero-tagline">
          El recurso solicitado no existe en este sistema. Verifique la ruta o vuelva al INDEX.
        </p>
        <div class="hero-cta">
          <a routerLink="/" class="btn btn--primary">← VOLVER AL HOME</a>
        </div>
      </div>
    </section>
  `,
})
export class NotFound {}

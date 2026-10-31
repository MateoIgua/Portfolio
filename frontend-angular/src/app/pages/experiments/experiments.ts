import { Component } from '@angular/core';
import { EXPERIMENTS, MARQUEE_EXPERIMENTS } from '../../data/portfolio.data';
import { BigStatement } from '../../shared/big-statement';
import { Hero } from '../../shared/hero';
import { Marquee } from '../../shared/marquee';

@Component({
  selector: 'app-experiments',
  imports: [Hero, BigStatement, Marquee],
  template: `
    <app-hero label="LAB · PIEZAS CORTAS" top="EXPERI" bottom="MENTOS">
      Pruebas chicas, snippets, ejercicios y exploraciones. Lugar donde aterrizan ideas antes de ser
      "proyectos" hechos y derechos. Aquí lo que importa es probar, no terminar.
    </app-hero>

    <section class="section">
      <div class="container">
        <p class="section-label">REGISTRO</p>
        <h2 class="section-title">LAB · LOG</h2>

        <div class="cards-grid">
          @for (e of experiments; track e.id) {
            <article class="card">
              <p class="card-icon">{{ e.id }}</p>
              <h3 class="card-title">{{ e.title }}</h3>
              <p class="card-text">{{ e.description }}</p>
              <div class="card-meta">
                @for (tag of e.tags; track tag; let last = $last) {
                  <span>{{ tag }}</span>
                  @if (!last) {
                    <span>·</span>
                  }
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <app-big-statement>
      APRENDER ES <span class="accent">EXPERIMENTAR</span> Y DOCUMENTAR.
    </app-big-statement>

    <section class="section">
      <div class="container two-col">
        <div>
          <p class="section-label">LEYENDA</p>
          <h2 class="section-title">QUÉ ES ESTO</h2>
          <p style="max-width: 60ch">
            Estos experimentos son ejercicios cortos — algunos completos, otros a medio terminar.
            Sirven para fijar conceptos y tener material de referencia para futuros proyectos.
          </p>
        </div>

        <div class="info-block">
          <p class="info-block-header">STATUS</p>
          <ul>
            <li>{{ experiments.length.toString().padStart(2, '0') }} entradas</li>
            <li>Auto-publicados</li>
            <li>Sin garantía</li>
            <li>Open source</li>
          </ul>
        </div>
      </div>
    </section>

    <app-marquee [words]="words" />
  `,
})
export class Experiments {
  protected readonly experiments = EXPERIMENTS;
  protected readonly words = MARQUEE_EXPERIMENTS;
}

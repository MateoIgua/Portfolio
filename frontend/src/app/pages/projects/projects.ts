import { Component } from '@angular/core';
import { MARQUEE_TECH, PROJECTS } from '../../data/portfolio.data';
import { BigStatement } from '../../shared/big-statement';
import { Hero } from '../../shared/hero';
import { Marquee } from '../../shared/marquee';
import { ProjectRegistry } from '../../shared/project-registry';

@Component({
  selector: 'app-projects',
  imports: [Hero, BigStatement, Marquee, ProjectRegistry],
  template: `
    <app-hero label="REGISTRO DE PROYECTOS" top="PROYEC" bottom="TOS">
      Cosas que he construido mientras aprendo. Cada uno fue un experimento con un objetivo claro:
      entender un concepto, practicar un patrón, o simplemente hacer algo útil.
    </app-hero>

    <section class="section">
      <div class="container">
        <p class="section-label">REGISTRO</p>
        <h2 class="section-title">TABLA DE CONTROL</h2>
        <app-project-registry />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="section-label">DETALLE</p>
        <h2 class="section-title">FICHAS</h2>

        <div class="cards-grid">
          @for (p of projects; track p.id) {
            <article class="card">
              <p class="card-icon">[{{ p.id }}] · {{ p.year }}</p>
              <h3 class="card-title">{{ p.name.toUpperCase() }}</h3>
              <p class="card-text">{{ p.description }}</p>
              <div class="card-meta">
                @for (tag of p.tags; track tag; let last = $last) {
                  <span>{{ tag }}</span>
                  @if (!last) {
                    <span>·</span>
                  }
                }
              </div>
              <div class="card-links">
                <a href="https://github.com/MateoIgua" target="_blank" rel="noopener">→ CÓDIGO</a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <app-big-statement>
      CADA PROYECTO RESPONDE A UNA <span class="accent">PREGUNTA</span>.
    </app-big-statement>

    <app-marquee [words]="tech" />
  `,
})
export class Projects {
  protected readonly projects = PROJECTS;
  protected readonly tech = MARQUEE_TECH;
}

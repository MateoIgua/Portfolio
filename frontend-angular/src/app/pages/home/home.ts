import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MARQUEE_TECH, STACK_CARDS } from '../../data/portfolio.data';
import { BigStatement } from '../../shared/big-statement';
import { Hero } from '../../shared/hero';
import { Marquee } from '../../shared/marquee';
import { ProjectRegistry } from '../../shared/project-registry';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Hero, BigStatement, Marquee, ProjectRegistry],
  template: `
    <app-hero label="DEVELOPER · .NET / C#" top="MATEO" bottom="IGUA">
      Construyo backend y herramientas con C# y .NET. Práctico arquitectura limpia, refactorización y
      automatización. Acá vive lo que voy aprendiendo.
      <div cta class="hero-cta">
        <a routerLink="/proyectos" class="btn btn--primary">VER PROYECTOS →</a>
        <a routerLink="/sobre-mi" class="btn btn--ghost">SOBRE MÍ</a>
      </div>
    </app-hero>

    <section class="section">
      <div class="container">
        <p class="section-label">STACK</p>
        <h2 class="section-title">EN QUÉ TRABAJO</h2>

        <div class="cards-grid">
          @for (card of stack; track card.title) {
            <article class="card">
              <p class="card-icon">{{ card.icon }}</p>
              <h3 class="card-title">{{ card.title }}</h3>
              <div class="tag-list">
                @for (tag of card.tags; track tag) {
                  <span class="tag">{{ tag }}</span>
                }
              </div>
              @if (card.interestedIn) {
                <h4 class="card-subtitle">Interesado en:</h4>
                <div class="tag-list">
                  @for (tag of card.interestedIn; track tag) {
                    <span class="tag">{{ tag }}</span>
                  }
                </div>
              }
            </article>
          }
        </div>
      </div>
    </section>

    <app-big-statement>
      EL CÓDIGO LIMPIO NO ES UN DESTINO, ES UNA <span class="accent">PRÁCTICA DIARIA</span>.
    </app-big-statement>

    <section class="section">
      <div class="container">
        <div>
          <p class="section-label">AHORA</p>
          <h2 class="section-title">EN QUÉ ESTOY</h2>
          <p style="max-width: 60ch">
            Reconstruyendo este portafolio en Angular para aprender el framework a partir de un
            proyecto real que ya conozco: componentes, rutas, servicios y señales. Antes vivió en
            Blazor y en HTML/CSS puros.
          </p>
        </div>
        <app-project-registry />
      </div>
    </section>

    <app-marquee [words]="tech" />
  `,
})
export class Home {
  protected readonly stack = STACK_CARDS;
  protected readonly tech = MARQUEE_TECH;
}

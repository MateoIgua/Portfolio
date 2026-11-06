import { Component } from '@angular/core';
import { MARQUEE_ABOUT, SKILLS } from '../../data/portfolio.data';
import { BigStatement } from '../../shared/big-statement';
import { Hero } from '../../shared/hero';
import { Marquee } from '../../shared/marquee';

@Component({
  selector: 'app-about',
  imports: [Hero, BigStatement, Marquee],
  template: `
    <app-hero label="EXTRACT FROM: ABOUT.TXT" top="SOBRE" bottom="MÍ">
      Desarrollador en formación, enfocado en C# y el ecosistema .NET. Me interesa el diseño de
      sistemas backend, la arquitectura limpia y construir cosas que sean fáciles de mantener.
    </app-hero>

    <section class="section">
      <div class="container two-col">
        <div>
          <p class="section-label">QUIÉN</p>
          <h2 class="section-title">EL DESARROLLADOR</h2>
          <p style="max-width: 62ch; margin-bottom: 1rem">
            Soy <strong>Mateo Igua</strong>. Llevo un tiempo construyendo proyectos personales en C#
            para fortalecer mis bases: arquitectura por capas, OOP, LINQ, EF Core y patrones de
            diseño.
          </p>
          <p style="max-width: 62ch; margin-bottom: 1rem">
            Estoy convencido de que los ejercicios pequeños bien hechos enseñan más que proyectos
            enormes a medias. Por eso este portafolio tiene una sección entera de
            <strong>experimentos</strong>: piezas cortas pero bien documentadas.
          </p>
          <p style="max-width: 62ch">
            Fuera del código, me interesa entender por qué las cosas funcionan: leer sobre patrones,
            ver cómo resuelven problemas otros desarrolladores, y aplicar eso en lo siguiente que
            construyo.
          </p>
        </div>

        <div class="info-block">
          <p class="info-block-header">CONTACTO</p>
          <ul>
            <li><a href="mailto:mateoigua.mg@gmail.com">EMAIL</a></li>
            <li><a href="https://github.com/MateoIgua" target="_blank" rel="noopener">GITHUB</a></li>
            <li>
              <a
                href="https://www.linkedin.com/in/mateo-andr%C3%A9s-gonz%C3%A1lez-igua-640638208/"
                target="_blank"
                rel="noopener"
                >LINKEDIN</a
              >
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="section-label">CAPACIDADES</p>
        <h2 class="section-title">SKILL TABLE</h2>

        <div class="terminal-table">
          <div class="terminal-table-header">SKILL CONTROL · NIVEL Y CATEGORÍA</div>
          <table>
            <thead>
              <tr>
                <th class="col-id">ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>FOCUS</th>
                <th class="col-status">LEVEL</th>
              </tr>
            </thead>
            <tbody>
              @for (s of skills; track s.id) {
                <tr>
                  <td class="col-id">{{ s.id }}</td>
                  <td>{{ s.name }}</td>
                  <td>{{ s.category }}</td>
                  <td>{{ s.focus }}</td>
                  <td class="col-status">{{ s.level }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="info-block">
          <p class="info-block-header">EXTRACT FROM · CITA</p>
          <p
            style="
              font-family: var(--font-mono);
              font-size: 1.3rem;
              line-height: 1.5;
              color: var(--text-bright);
              max-width: 62ch;
              text-transform: uppercase;
            "
          >
            "La variedad de soluciones es infinita. Si hoy, cuando tenemos miles de bibliotecas
            distintas, podemos distinguir miles de patrones, mañana, cuando aparezcan nuevos
            paradigmas, podremos distinguir diez, veinte o treinta mil más — no de manera
            imitativa, sino para combinarlos según nuestra imaginación."
          </p>
          <p class="mono dim" style="margin-top: 1rem">— LIBREMENTE ADAPTADO DE LUIGI RUSSOLO, 1913</p>
        </div>
      </div>
    </section>

    <app-big-statement>
      ESCRIBIR CÓDIGO ES <span class="accent">PENSAR</span> CLARO POR ESCRITO.
    </app-big-statement>

    <app-marquee [words]="words" />
  `,
})
export class About {
  protected readonly skills = SKILLS;
  protected readonly words = MARQUEE_ABOUT;
}

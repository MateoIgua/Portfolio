import { Component, afterNextRender, inject } from '@angular/core';
import {
  EXPERIMENTS,
  MARQUEE_ABOUT,
  MARQUEE_EXPERIMENTS,
  MARQUEE_TECH,
  PROJECTS,
  SKILLS,
  STACK_CARDS,
} from '../../data/portfolio.data';
import { ActivatedRoute } from '@angular/router';
import { UI } from '../../data/ui';
import { SectionNav } from '../../layout/section-nav';
import { I18n } from '../../services/i18n';
import { SECTIONS, SectionSpy } from '../../services/section-spy';
import { BigStatement } from '../../shared/big-statement';
import { Hero } from '../../shared/hero';
import { Marquee } from '../../shared/marquee';
import { ProjectRegistry } from '../../shared/project-registry';
import { WidgetDemo } from '../widget-demo/widget-demo';

// La página única: las antiguas Home, Proyectos, Experimentos, Sobre mí y
// Widget demo ahora son secciones de este mismo componente. Cada <section>
// lleva un id que coincide con SECTIONS (services/section-spy.ts); el menú de
// la derecha (<app-section-nav>) las enlaza y resalta la que se está viendo.
@Component({
  selector: 'app-portfolio',
  imports: [SectionNav, Hero, BigStatement, Marquee, ProjectRegistry, WidgetDemo],
  template: `
    <app-section-nav />

    <!-- 01 · INICIO -->
    <div id="home" class="spy">
      <app-hero [label]="i18n.t(ui.heroLabel)" top="MATEO" bottom="IGUA">
        {{ i18n.t(ui.heroText) }}
        <div cta class="hero-cta">
          <a href="#projects" class="btn btn--primary" (click)="go($event, 'projects')">{{
            i18n.t(ui.ctaProjects)
          }}</a>
          <a href="#about" class="btn btn--ghost" (click)="go($event, 'about')">{{
            i18n.t(ui.ctaAbout)
          }}</a>
        </div>
      </app-hero>
    </div>

    <!-- 02 · STACK -->
    <section id="stack" class="section spy">
      <div class="container">
        <p class="section-label">{{ i18n.t(ui.stackLabel) }}</p>
        <h2 class="section-title">{{ i18n.t(ui.stackTitle) }}</h2>

        <div class="cards-grid">
          @for (card of stack; track card.icon) {
            <article class="card">
              <p class="card-icon">{{ card.icon }}</p>
              <h3 class="card-title">{{ i18n.t(card.title) }}</h3>
              <div class="tag-list">
                @for (tag of card.tags; track tag) {
                  <span class="tag">{{ tag }}</span>
                }
              </div>
              @if (card.interestedIn) {
                <h4 class="card-subtitle">{{ i18n.t(ui.interestedIn) }}</h4>
                <div class="tag-list">
                  @for (tag of card.interestedIn; track tag) {
                    <span class="tag">{{ tag }}</span>
                  }
                </div>
              }
            </article>
          }
        </div>

        <h3 class="sub-title">{{ i18n.t(ui.nowTitle) }}</h3>
        <p class="section-intro">{{ i18n.t(ui.nowText) }}</p>
      </div>

      <app-big-statement>
        {{ i18n.t(ui.statementStackPre) }}<span class="accent">{{ i18n.t(ui.statementStackAccent) }}</span
        >.
      </app-big-statement>
      <app-marquee [words]="techWords" />
    </section>

    <!-- 03 · PROYECTOS -->
    <section id="projects" class="section spy">
      <div class="container">
        <p class="section-label">{{ i18n.t(ui.projectsLabel) }}</p>
        <h2 class="section-title">{{ i18n.t(ui.projectsTitle) }}</h2>
        <p class="section-intro">{{ i18n.t(ui.projectsIntro) }}</p>

        <app-project-registry />

        <h3 class="sub-title">{{ i18n.t(ui.projectsCards) }}</h3>
        <div class="cards-grid">
          @for (p of projects; track p.id) {
            <article class="card">
              <p class="card-icon">[{{ p.id }}] · {{ p.year }}</p>
              <h4 class="card-title">{{ i18n.t(p.name).toUpperCase() }}</h4>
              <p class="card-text">{{ i18n.t(p.description) }}</p>
              <div class="card-meta">
                @for (tag of p.tags; track $index; let last = $last) {
                  <span>{{ i18n.t(tag) }}</span>
                  @if (!last) {
                    <span>·</span>
                  }
                }
              </div>
              <div class="card-links">
                <a href="https://github.com/MateoIgua" target="_blank" rel="noopener">{{
                  i18n.t(ui.code)
                }}</a>
              </div>
            </article>
          }
        </div>
      </div>

      <app-big-statement>
        {{ i18n.t(ui.statementProjectsPre) }}<span class="accent">{{ i18n.t(ui.statementProjectsAccent) }}</span
        >.
      </app-big-statement>
    </section>

    <!-- 04 · EXPERIMENTOS -->
    <section id="experiments" class="section spy">
      <div class="container">
        <p class="section-label">{{ i18n.t(ui.expLabel) }}</p>
        <h2 class="section-title">{{ i18n.t(ui.expTitle) }}</h2>
        <p class="section-intro">{{ i18n.t(ui.expIntro) }}</p>

        <div class="cards-grid">
          @for (e of experiments; track e.id) {
            <article class="card">
              <p class="card-icon">{{ e.id }}</p>
              <h4 class="card-title">{{ e.title }}</h4>
              <p class="card-text">{{ i18n.t(e.description) }}</p>
              <div class="card-meta">
                @for (tag of e.tags; track $index; let last = $last) {
                  <span>{{ i18n.t(tag) }}</span>
                  @if (!last) {
                    <span>·</span>
                  }
                }
              </div>
            </article>
          }
        </div>

        <div class="two-col legend">
          <div>
            <p class="section-label">{{ i18n.t(ui.legendLabel) }}</p>
            <h3 class="sub-title sub-title--first">{{ i18n.t(ui.legendTitle) }}</h3>
            <p class="section-intro">{{ i18n.t(ui.legendText) }}</p>
          </div>
          <div class="info-block">
            <p class="info-block-header">{{ i18n.t(ui.statusHeader) }}</p>
            <ul>
              <li>{{ experiments.length.toString().padStart(2, '0') }} {{ i18n.t(ui.statusEntries) }}</li>
              <li>{{ i18n.t(ui.statusSelfPublished) }}</li>
              <li>{{ i18n.t(ui.statusNoWarranty) }}</li>
              <li>{{ i18n.t(ui.statusOpenSource) }}</li>
            </ul>
          </div>
        </div>
      </div>

      <app-big-statement>
        {{ i18n.t(ui.statementExpPre) }}<span class="accent">{{ i18n.t(ui.statementExpAccent) }}</span
        >{{ i18n.t(ui.statementExpPost) }}
      </app-big-statement>
      <app-marquee [words]="experimentWords" />
    </section>

    <!-- 05 · SOBRE MÍ -->
    <section id="about" class="section spy">
      <div class="container">
        <p class="section-label">{{ i18n.t(ui.aboutLabel) }}</p>
        <h2 class="section-title">{{ i18n.t(ui.aboutTitle) }}</h2>
        <p class="section-intro">{{ i18n.t(ui.aboutIntro) }}</p>

        <div class="two-col">
          <div class="prose">
            <h3 class="sub-title sub-title--first">{{ i18n.t(ui.whoTitle) }}</h3>
            <p>
              {{ i18n.t(ui.whoP1Pre) }}<strong>Mateo Igua</strong>{{ i18n.t(ui.whoP1Post) }}
            </p>
            <p>
              {{ i18n.t(ui.whoP2Pre) }}<strong>{{ i18n.t(ui.whoP2Strong) }}</strong
              >{{ i18n.t(ui.whoP2Post) }}
            </p>
            <p>{{ i18n.t(ui.whoP3) }}</p>
          </div>

          <div class="info-block">
            <p class="info-block-header">{{ i18n.t(ui.contact) }}</p>
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

        <h3 class="sub-title">{{ i18n.t(ui.skillsTitle) }}</h3>
        <div class="terminal-table">
          <div class="terminal-table-header">{{ i18n.t(ui.skillsHeader) }}</div>
          <table>
            <thead>
              <tr>
                <th class="col-id">ID</th>
                <th>{{ i18n.t(ui.skName) }}</th>
                <th>{{ i18n.t(ui.skCategory) }}</th>
                <th>{{ i18n.t(ui.skFocus) }}</th>
                <th class="col-status">{{ i18n.t(ui.skLevel) }}</th>
              </tr>
            </thead>
            <tbody>
              @for (s of skills; track s.id) {
                <tr>
                  <td class="col-id">{{ s.id }}</td>
                  <td>{{ s.name }}</td>
                  <td>{{ i18n.t(s.category) }}</td>
                  <td>{{ i18n.t(s.focus) }}</td>
                  <td class="col-status">{{ i18n.t(s.level) }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="info-block quote">
          <p class="info-block-header">{{ i18n.t(ui.quoteHeader) }}</p>
          <p class="quote-text">{{ i18n.t(ui.quote) }}</p>
          <p class="mono dim quote-author">{{ i18n.t(ui.quoteAuthor) }}</p>
        </div>
      </div>

      <app-big-statement>
        {{ i18n.t(ui.statementAboutPre) }}<span class="accent">{{ i18n.t(ui.statementAboutAccent) }}</span
        >{{ i18n.t(ui.statementAboutPost) }}
      </app-big-statement>
      <app-marquee [words]="aboutWords" />
    </section>

    <!-- 06 · API -->
    <section id="api" class="section spy">
      <div class="container">
        <p class="section-label">{{ i18n.t(ui.apiLabel) }}</p>
        <h2 class="section-title">{{ i18n.t(ui.apiTitle) }}</h2>

        <!-- @defer: el componente (y sus llamadas HTTP) solo se carga cuando el
             marcador entra en pantalla. -->
        @defer (on viewport) {
          <app-widget-demo />
        } @placeholder {
          <div class="defer-placeholder"></div>
        }
      </div>
    </section>
  `,
})
export class Portfolio {
  protected readonly i18n = inject(I18n);
  private readonly spy = inject(SectionSpy);
  private readonly route = inject(ActivatedRoute);
  protected readonly ui = UI;

  protected readonly stack = STACK_CARDS;
  protected readonly projects = PROJECTS;
  protected readonly experiments = EXPERIMENTS;
  protected readonly skills = SKILLS;
  protected readonly techWords = MARQUEE_TECH;
  protected readonly experimentWords = MARQUEE_EXPERIMENTS;
  protected readonly aboutWords = MARQUEE_ABOUT;

  constructor() {
    // Si se entra con una URL como /#projects (o desde /proyectos, que redirige
    // ahí), baja hasta esa sección una vez pintada la página.
    afterNextRender(() => {
      const id = this.route.snapshot.fragment;
      if (id && SECTIONS.some(s => s.id === id)) {
        setTimeout(() => this.spy.scrollTo(id, false));
      }
    });
  }

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.spy.scrollTo(id);
  }
}

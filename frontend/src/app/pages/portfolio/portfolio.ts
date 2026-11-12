import { Component, afterNextRender, computed, inject, signal } from '@angular/core';
import { EXPERIMENTS, MARQUEE_WORDS, PROJECTS, SERVICES, STACK_CARDS } from '../../data/portfolio.data';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UI } from '../../data/ui';
import { SectionNav } from '../../layout/section-nav';
import { I18n } from '../../services/i18n';
import { SECTIONS, SectionSpy } from '../../services/section-spy';
import { BigStatement } from '../../shared/big-statement';
import { Hero } from '../../shared/hero';
import { Marquee } from '../../shared/marquee';
import { TypeWriter } from '../../shared/typewriter';

// La página única: Inicio, Stack, Servicios, Proyectos (con Experimentos como
// subsección) y Sobre mí son secciones de este mismo componente. Cada <section>
// lleva un id que coincide con SECTIONS (services/section-spy.ts); el menú de
// la derecha (<app-section-nav>) las enlaza y resalta la que se está viendo.
@Component({
  selector: 'app-portfolio',
  imports: [RouterLink, SectionNav, Hero, BigStatement, Marquee, TypeWriter],
  template: `
    <app-section-nav />

    <!-- 01 · INICIO -->
    <div id="home" class="spy">
      <app-hero [label]="i18n.t(ui.heroLabel)" top="MATEO" bottom="IGUA">
        <app-typewriter [text]="i18n.t(ui.heroText)" />
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

        <div class="cards-grid cards-grid--4">
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
      </div>

      <app-big-statement>
        {{ i18n.t(ui.statementStackPre) }}<span class="accent">{{ i18n.t(ui.statementStackAccent) }}</span
        >.
      </app-big-statement>
    </section>

    <!-- 03 · SERVICIOS -->
    <section id="services" class="section spy">
      <div class="container">
        <p class="section-label">{{ i18n.t(ui.servicesLabel) }}</p>
        <h2 class="section-title">{{ i18n.t(ui.servicesTitle) }}</h2>

        <div class="cards-grid">
          @for (sv of services; track sv.icon) {
            <article class="card">
              <p class="card-icon">{{ sv.icon }}</p>
              <h3 class="card-title">{{ i18n.t(sv.title) }}</h3>
              <p class="card-text">{{ i18n.t(sv.description) }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- 04 · PROYECTOS (incluye la subsección de experimentos) -->
    <section id="projects" class="section spy">
      <div class="container">
        <!-- Dos columnas 60 / 40. A la izquierda: título de la sección, introducción y lista de
             proyectos (fecha · título · código). A la derecha, a la altura del título: la caja con
             la animación, el nombre y la descripción del proyecto seleccionado. -->
        <div class="project-split">
          <div class="project-main">
            <p class="section-label">{{ i18n.t(ui.projectsLabel) }}</p>
            <h2 class="section-title">{{ i18n.t(ui.projectsTitle) }}</h2>
            <p class="section-intro">{{ i18n.t(ui.projectsIntro) }}</p>

            <ul class="project-list" [attr.aria-label]="i18n.t(ui.projectList)">
              @for (p of projects; track p.id) {
                <li
                  class="project-row"
                  [class.selected]="p.id === selected()"
                  (mouseenter)="selected.set(p.id)"
                >
                  <span class="project-date">{{ p.updated }}</span>
                  <button
                    type="button"
                    class="project-title"
                    [attr.aria-pressed]="p.id === selected()"
                    (click)="selected.set(p.id)"
                    (focus)="selected.set(p.id)"
                  >
                    {{ i18n.t(p.name) }}
                  </button>
                  <a class="project-link" [href]="p.codeUrl" target="_blank" rel="noopener">{{
                    i18n.t(ui.code)
                  }}</a>
                </li>
              }
            </ul>
          </div>

          @let cur = current();
          <aside class="project-detail" aria-live="polite">
            <div class="project-detail-scroll">
              <div class="project-preview">
                <!-- GIF (no es texto: no se puede seleccionar). Si el proyecto tiene su propia imagen, se usa esa. -->
                <img
                  class="project-gif"
                  [src]="cur.image ?? defaultPreview"
                  alt=""
                  draggable="false"
                  loading="lazy"
                />
                <div class="project-overlay">
                  <span class="project-overlay-id">[{{ cur.id }}]</span>
                  <span class="project-overlay-name">{{ i18n.t(cur.name) }}</span>
                </div>
              </div>
              <p class="card-icon">{{ i18n.t(ui.projectWhy) }}</p>
              <p class="card-text">{{ i18n.t(cur.description) }}</p>
              <div class="card-meta">
                @for (tag of cur.tags; track $index; let last = $last) {
                  <span>{{ i18n.t(tag) }}</span>
                  @if (!last) {
                    <span>·</span>
                  }
                }
              </div>
            </div>
          </aside>
        </div>

        <!-- Subsección: Experimentos. Conserva id="experiments" para el enlace /#experiments -->
        <div id="experiments" class="spy subsection">
          <h3 class="sub-title">{{ i18n.t(ui.expTitle) }}</h3>
          <p class="section-intro">{{ i18n.t(ui.expIntro) }}</p>

          <div class="cards-grid">
            @for (e of experiments; track e.id) {
              <article class="card">
                <p class="card-icon">{{ e.id }}</p>
                <h4 class="card-title">{{ i18n.t(e.title) }}</h4>
                <p class="card-text">{{ i18n.t(e.description) }}</p>
                <div class="card-meta">
                  @for (tag of e.tags; track $index; let last = $last) {
                    <span>{{ i18n.t(tag) }}</span>
                    @if (!last) {
                      <span>·</span>
                    }
                  }
                </div>
                <!-- Por ahora todas las páginas de experimentos llevan a "En construcción" -->
                <a routerLink="/en-construccion" class="card-link">{{ i18n.t(ui.expMore) }}</a>
              </article>
            }
          </div>

        </div>
      </div>

      <app-big-statement>
        {{ i18n.t(ui.statementProjectsPre) }}<span class="accent">{{ i18n.t(ui.statementProjectsAccent) }}</span
        >.
      </app-big-statement>
    </section>

    <!-- 05 · SOBRE MÍ -->
    <section id="about" class="section spy">
      <div class="container">
        <p class="section-label">{{ i18n.t(ui.aboutLabel) }}</p>
        <h2 class="section-title">{{ i18n.t(ui.aboutTitle) }}</h2>

        <div class="two-col">
          <div class="prose">
            <p>{{ i18n.t(ui.aboutP1) }}</p>
            <p>{{ i18n.t(ui.aboutP2) }}</p>
            <p>{{ i18n.t(ui.aboutP3) }}</p>
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
            <!-- La hoja de vida se descarga desde public/cv/Mateo-Igua-CV.pdf -->
            <a class="btn btn--primary btn--block" href="cv/Mateo-Igua-CV.pdf" download="Mateo-Igua-CV.pdf">{{
              i18n.t(ui.cvDownload)
            }}</a>
          </div>
        </div>

      </div>

      <app-big-statement>
        {{ i18n.t(ui.statementAboutPre) }}<span class="accent">{{ i18n.t(ui.statementAboutAccent) }}</span
        >{{ i18n.t(ui.statementAboutPost) }}
      </app-big-statement>
    </section>

    <!-- Marquesina: aparece una sola vez, al final de la página -->
    <app-marquee [words]="marqueeWords" />
  `,
})
export class Portfolio {
  protected readonly i18n = inject(I18n);
  private readonly spy = inject(SectionSpy);
  private readonly route = inject(ActivatedRoute);
  protected readonly ui = UI;

  protected readonly stack = STACK_CARDS;
  // Vista previa por defecto de los proyectos sin imagen propia (public/preview-code.gif)
  protected readonly defaultPreview = 'preview-code.gif';
  protected readonly services = SERVICES;
  protected readonly projects = PROJECTS;
  // Proyecto seleccionado en la lista (al pasar el mouse, enfocar o tocar); computed lo busca.
  protected readonly selected = signal(PROJECTS[0].id);
  protected readonly current = computed(() => PROJECTS.find(p => p.id === this.selected()) ?? PROJECTS[0]);
  protected readonly experiments = EXPERIMENTS;
  protected readonly marqueeWords = MARQUEE_WORDS;

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

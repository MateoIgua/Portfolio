import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DotBackground } from './layout/dot-background';
import { Footer } from './layout/footer';
import { StatusBar } from './layout/status-bar';

// Componente raíz: el "marco" fijo. <router-outlet> es el hueco donde el
// router pinta la página (el portafolio de una sola página, o la 404).
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DotBackground, StatusBar, Footer],
  template: `
    <app-dot-background />
    <app-status-bar />
    <main class="page">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class App {}

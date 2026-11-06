import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DotBackground } from './layout/dot-background';
import { Footer } from './layout/footer';
import { Navbar } from './layout/navbar';
import { StatusBar } from './layout/status-bar';

// Componente raíz: el "marco" fijo. <router-outlet> es el hueco donde el
// router pinta la página que corresponda a la URL.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DotBackground, StatusBar, Navbar, Footer],
  template: `
    <app-dot-background />
    <app-status-bar />
    <app-navbar />
    <router-outlet />
    <app-footer />
  `,
})
export class App {}

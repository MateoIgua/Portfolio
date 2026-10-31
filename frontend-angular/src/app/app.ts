import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer';
import { Navbar } from './layout/navbar';
import { StatusBar } from './layout/status-bar';

// Componente raíz: el "marco" fijo. <router-outlet> es el hueco donde el
// router pinta la página que corresponda a la URL.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StatusBar, Navbar, Footer],
  template: `
    <app-status-bar />
    <app-navbar />
    <router-outlet />
    <app-footer />
  `,
})
export class App {}

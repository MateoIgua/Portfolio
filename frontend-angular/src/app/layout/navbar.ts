import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}

// routerLink navega SIN recargar la página; routerLinkActive pone la clase
// "active" en el enlace de la ruta actual (antes se escribía a mano en cada HTML).
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="nav">
      <div class="container nav-inner">
        <a routerLink="/" class="brand">
          <span class="bracket">[</span>MI<span class="bracket">]</span>
        </a>
        <ul class="nav-links">
          @for (item of items; track item.path) {
            <li>
              <a
                [routerLink]="item.path"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >{{ item.label }}</a
              >
            </li>
          }
        </ul>
      </div>
    </nav>
  `,
})
export class Navbar {
  protected readonly items: NavItem[] = [
    { label: 'HOME', path: '/' },
    { label: 'PROYECTOS', path: '/proyectos' },
    { label: 'EXPERIMENTOS', path: '/experimentos' },
    { label: 'SOBRE MÍ', path: '/sobre-mi' },
  ];
}

import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, timer } from 'rxjs';

// Reemplaza el setInterval + getElementById de main.js.
// timer(0, 1000) emite cada segundo; toSignal lo convierte en un signal que
// la plantilla lee con clock(). Angular se encarga de suscribirse y de
// cancelar la suscripción cuando el componente se destruye.
@Component({
  selector: 'app-status-bar',
  template: `
    <header class="statusbar">
      <div class="container statusbar-inner">
        <div class="statusbar-cell">
          <span class="label">cd:</span>
          <span class="value">~/Home</span>
          <span class="cursor"></span>
        </div>
        <div class="statusbar-cell">
          <span class="label">TIME:</span>
          <span class="value">{{ clock() }}</span>
        </div>
        <div class="nav-links">
          <li><a href="/" class="active">ES</a></li>
        </div>
      </div>
    </header>
  `,
})
export class StatusBar {
  protected readonly clock = toSignal(
    timer(0, 1000).pipe(map(() => new Date().toLocaleTimeString('en-GB'))),
    { initialValue: '--:--:--' },
  );
}

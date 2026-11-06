import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Hero } from '../../shared/hero';
import { PortfolioApiService } from '../../services/portfolio-api.service';

// rxResource convierte una llamada Observable en un "recurso" con señales:
//   .value()      → los datos (o undefined)
//   .error()      → el error, si lo hubo
//   .isLoading()  → true mientras espera
// Reemplaza los try/catch + getElementById + textContent del HTML original.
@Component({
  selector: 'app-widget-demo',
  imports: [Hero, JsonPipe],
  template: `
    <app-hero label="FRONTEND ↔ BACKEND" top="WIDGET" bottom="DEMO">
      Esta página llama al backend (Portfolio.Api en <code>http://localhost:5050</code>) y muestra
      la respuesta. Si ves los recuadros con datos abajo, la integración funciona.
    </app-hero>

    <section class="section">
      <div class="container">
        <p class="section-label">RESPUESTAS DE LA API</p>
        <h2 class="section-title">/api/hello</h2>

        <div class="info-block" style="margin-bottom: 2rem">
          @if (hello.isLoading()) {
            <p class="info-block-header">CARGANDO...</p>
            <pre style="color: var(--text-bright); font-size: 1.1rem">[esperando respuesta del servidor]</pre>
          } @else if (hello.error()) {
            <p class="info-block-header" style="color: var(--error)">✗ ERROR</p>
            <pre style="overflow-x: auto; color: var(--text-bright); font-size: 1.1rem">{{ hello.error()?.message }}

Verificá que el backend esté corriendo en localhost:5050</pre>
          } @else {
            <p class="info-block-header" style="color: var(--text-bright)">✓ 200 OK</p>
            <pre style="overflow-x: auto; color: var(--text-bright); font-size: 1.1rem">{{ hello.value() | json }}</pre>
          }
        </div>

        <h2 class="section-title">/api/hello/now</h2>
        <div class="info-block">
          @if (now.isLoading()) {
            <p class="info-block-header">CARGANDO...</p>
            <pre style="color: var(--text-bright); font-size: 1.1rem">[esperando respuesta del servidor]</pre>
          } @else if (now.error()) {
            <p class="info-block-header" style="color: var(--error)">✗ ERROR</p>
            <pre style="overflow-x: auto; color: var(--text-bright); font-size: 1.1rem">{{ now.error()?.message }}</pre>
          } @else {
            <p class="info-block-header" style="color: var(--text-bright)">✓ 200 OK</p>
            <pre style="overflow-x: auto; color: var(--text-bright); font-size: 1.1rem">{{ now.value() | json }}</pre>
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="section-label">CÓMO REUSAR</p>
        <h2 class="section-title">PATRÓN</h2>
        <p style="max-width: 60ch; margin-bottom: 1rem">
          Mirá el código de esta página + <code>services/portfolio-api.service.ts</code>. Para crear
          tus propios widgets:
        </p>
        <ol style="max-width: 60ch; padding-left: 1.5rem; list-style: decimal">
          <li>Agregá un endpoint en <code>backend/Controllers/</code></li>
          <li>Agregá un método (y su interface) en <code>PortfolioApiService</code></li>
          <li>En un componente, crea un <code>rxResource</code> que llame a ese método</li>
          <li>En la plantilla, usa <code>&#64;if</code> con <code>isLoading()</code>, <code>error()</code> y <code>value()</code></li>
        </ol>
      </div>
    </section>
  `,
})
export class WidgetDemo {
  private readonly api = inject(PortfolioApiService);

  protected readonly hello = rxResource({ stream: () => this.api.getHello() });
  protected readonly now = rxResource({ stream: () => this.api.getServerTime() });
}

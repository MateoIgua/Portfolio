import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { UI } from '../../data/ui';
import { API_BASE } from '../../services/api.config';
import { I18n } from '../../services/i18n';
import { PortfolioApiService } from '../../services/portfolio-api.service';

// Contenido de la sección "API" (ya no es una página propia). rxResource
// convierte una llamada Observable en un "recurso" con señales:
//   .value()      → los datos (o undefined)
//   .error()      → el error, si lo hubo
//   .isLoading()  → true mientras espera
// El portafolio lo carga con @defer: la petición solo se hace cuando la
// sección se acerca a la pantalla.
@Component({
  selector: 'app-widget-demo',
  imports: [JsonPipe],
  template: `
    <p class="section-intro">
      {{ i18n.t(ui.apiIntro) }}
      {{ i18n.t(ui.apiBackendAt) }} <code>{{ apiBase }}</code>
    </p>

    <h3 class="sub-title">/api/hello</h3>
    <div class="info-block">
      @if (hello.isLoading()) {
        <p class="info-block-header">{{ i18n.t(ui.apiLoading) }}</p>
        <pre class="api-out">{{ i18n.t(ui.apiWaiting) }}</pre>
      } @else if (hello.error()) {
        <p class="info-block-header api-error">{{ i18n.t(ui.apiError) }}</p>
        <pre class="api-out">{{ hello.error()?.message }}

{{ i18n.t(ui.apiCheck) }} {{ apiBase }}</pre>
      } @else {
        <p class="info-block-header api-ok">✓ 200 OK</p>
        <pre class="api-out">{{ hello.value() | json }}</pre>
      }
    </div>

    <h3 class="sub-title">/api/hello/now</h3>
    <div class="info-block">
      @if (now.isLoading()) {
        <p class="info-block-header">{{ i18n.t(ui.apiLoading) }}</p>
        <pre class="api-out">{{ i18n.t(ui.apiWaiting) }}</pre>
      } @else if (now.error()) {
        <p class="info-block-header api-error">{{ i18n.t(ui.apiError) }}</p>
        <pre class="api-out">{{ now.error()?.message }}</pre>
      } @else {
        <p class="info-block-header api-ok">✓ 200 OK</p>
        <pre class="api-out">{{ now.value() | json }}</pre>
      }
    </div>

    <h3 class="sub-title">{{ i18n.t(ui.apiHowTitle) }}</h3>
    <p class="section-intro">{{ i18n.t(ui.apiHowIntro) }}</p>
    <ol class="steps">
      <li>{{ i18n.t(ui.apiStep1) }}</li>
      <li>{{ i18n.t(ui.apiStep2) }}</li>
      <li>{{ i18n.t(ui.apiStep3) }}</li>
      <li>{{ i18n.t(ui.apiStep4) }}</li>
    </ol>
  `,
})
export class WidgetDemo {
  private readonly api = inject(PortfolioApiService);
  protected readonly i18n = inject(I18n);
  protected readonly ui = UI;
  protected readonly apiBase = inject(API_BASE);

  protected readonly hello = rxResource({ stream: () => this.api.getHello() });
  protected readonly now = rxResource({ stream: () => this.api.getServerTime() });
}

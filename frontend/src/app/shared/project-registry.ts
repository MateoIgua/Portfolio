import { Component, inject } from '@angular/core';
import { PROJECTS } from '../data/portfolio.data';
import { UI } from '../data/ui';
import { I18n } from '../services/i18n';

// Tabla de proyectos. Se escribe una vez y se usa con <app-project-registry />.
@Component({
  selector: 'app-project-registry',
  template: `
    <div class="terminal-table">
      <div class="terminal-table-header">
        {{ i18n.t(ui.regTitle) }} · {{ projects.length.toString().padStart(2, '0') }}
        {{ i18n.t(ui.regEntries) }}
      </div>
      <table>
        <thead>
          <tr>
            <th class="col-id">ID</th>
            <th>{{ i18n.t(ui.regName) }}</th>
            <th>STACK</th>
            <th>{{ i18n.t(ui.regYear) }}</th>
            <th class="col-status">{{ i18n.t(ui.regStatus) }}</th>
          </tr>
        </thead>
        <tbody>
          @for (p of projects; track p.id) {
            <tr>
              <td class="col-id">{{ p.id }}</td>
              <td>{{ i18n.t(p.name) }}</td>
              <td>{{ i18n.t(p.stack) }}</td>
              <td>{{ p.year }}</td>
              <td class="col-status">{{ i18n.t(p.status) }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class ProjectRegistry {
  protected readonly i18n = inject(I18n);
  protected readonly ui = UI;
  protected readonly projects = PROJECTS;
}

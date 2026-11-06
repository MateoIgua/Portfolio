import { Component } from '@angular/core';
import { PROJECTS } from '../data/portfolio.data';

// La tabla de proyectos aparecía copiada en Home y en Proyectos.
// Ahora es un componente: se escribe una vez y se usa con <app-project-registry />.
@Component({
  selector: 'app-project-registry',
  template: `
    <div class="terminal-table">
      <div class="terminal-table-header">PROJECT REGISTRY · {{ projects.length.toString().padStart(2, '0') }} ENTRIES</div>
      <table>
        <thead>
          <tr>
            <th class="col-id">ID</th>
            <th>NAME</th>
            <th>STACK</th>
            <th>YEAR</th>
            <th class="col-status">STATUS</th>
          </tr>
        </thead>
        <tbody>
          @for (p of projects; track p.id) {
            <tr>
              <td class="col-id">{{ p.id }}</td>
              <td>{{ p.name }}</td>
              <td>{{ p.stack }}</td>
              <td>{{ p.year }}</td>
              <td class="col-status">{{ p.status }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class ProjectRegistry {
  protected readonly projects = PROJECTS;
}

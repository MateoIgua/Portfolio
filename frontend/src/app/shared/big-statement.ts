import { Component } from '@angular/core';

@Component({
  selector: 'app-big-statement',
  template: `
    <section class="section">
      <div class="container">
        <h2 class="big-statement"><ng-content /></h2>
      </div>
    </section>
  `,
})
export class BigStatement {}

import { Component, inject } from '@angular/core';
import { UI } from '../data/ui';
import { I18n } from '../services/i18n';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="container footer-inner">
        <span>&copy; 2026 MATEO IGUA</span>
        <span>{{ i18n.t(ui.footerUpdate) }}</span>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly i18n = inject(I18n);
  protected readonly ui = UI;
}

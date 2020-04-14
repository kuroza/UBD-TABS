import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
  <span class="created-by">
    <b>Universiti Brunei Darussalam</b> @ 2020
  </span>
    <div class="socials">
      <a href="https://github.com/kuroza/UBD-TABS" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}

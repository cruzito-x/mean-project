import { Component } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AlertModule.forRoot()],
  templateUrl: './navbar.component.html',
  styles: `
  .example-spacer {
    flex: 1 1 auto;
  }

  img {
    width: 150px;
    height: 75px;
  }
  `
})
export class NavbarComponent {

}
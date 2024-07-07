import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faUser, faShoppingBag, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  faSearch = faSearch;
  faUser = faUser;
  faShoppingBag = faShoppingBag;
  faEnvelope = faEnvelope;
  faLock = faLock;
}

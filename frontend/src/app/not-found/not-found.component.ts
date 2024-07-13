import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './not-found.component.html',
  styles: ``
})
export class NotFoundComponent {
  faExclamationCircle = faExclamationCircle;
}

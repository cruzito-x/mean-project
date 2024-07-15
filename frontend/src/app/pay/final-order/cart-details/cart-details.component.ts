import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCreditCard, faAngleRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { PayStepsService } from '../../../services/pay-steps.service';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './cart-details.component.html',
  styles: ``
})
export class CartDetailsComponent implements OnInit {
  cartService = inject(CartService);
  stepsService = inject(PayStepsService);
  faCreditCard = faCreditCard;
  faAngleRight = faAngleRight;
  faTrash = faTrash;
  indexColor: number = 0;

  ngOnInit(): void {
    this.cartService.validateCart();
  }
}

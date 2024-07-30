import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faCreditCard, faAngleRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { OrderInfoComponent } from "../order-info/order-info.component";
import { PayStepsService } from '../../services/pay-steps.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, OrderInfoComponent],
  templateUrl: './cart.component.html',
  styles: ``
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  stepsService = inject(PayStepsService);
  faUser = faUser;
  faCreditCard = faCreditCard;
  faAngleRight = faAngleRight;
  faTrash = faTrash;
  indexColor: number = 0;

  ngOnInit(): void {
    this.cartService.validateCart();
  }
}

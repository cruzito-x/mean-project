import { Component, inject } from '@angular/core';
import { CartComponent } from "../cart/cart.component";
import { CartService } from '../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { CartDetailsComponent } from "./cart-details/cart-details.component";

@Component({
  selector: 'app-final-order',
  standalone: true,
  imports: [FontAwesomeModule, CartComponent, CartDetailsComponent],
  templateUrl: './final-order.component.html',
  styles: `
  textarea[disabled] {
    height: 150px;
    resize: none;
    background-color: #ffffff;
  }
  `
})
export class FinalOrderComponent {
  faPrint = faPrint;
  cartService = inject(CartService);

  shippingCost() {
    return this.cartService.shippingCost();
  }
}

import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-info',
  standalone: true,
  imports: [],
  templateUrl: './order-info.component.html',
  styles: ``
})
export class OrderInfoComponent {
  cartService = inject(CartService);
  
  getTotalPrice = () => {
    return this.cartService.getSubTotal();
  }

  shippingCost() {
    return this.cartService.shippingCost();
  }
}

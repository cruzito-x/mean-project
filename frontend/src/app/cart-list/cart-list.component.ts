import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-list.component.html',
  styles: ``
})
export class CartListComponent {
  cartService = inject(CartService);

  deleteItemFromCart = (item: any) => {
    this.cartService.deleteItemFromCart(item);
  }

  getTotalPrice = () => {
    return this.cartService.getSubTotal();
  }
}

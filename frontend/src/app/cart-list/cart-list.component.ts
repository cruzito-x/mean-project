import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './cart-list.component.html',
  styles: ``
})
export class CartListComponent implements OnInit {
  cartService = inject(CartService);
  faCreditCard = faCreditCard;

  ngOnInit(): void {
    this.cartService.validateCart();
  }

  deleteItemFromCart = (item: any) => {
    this.cartService.deleteItemFromCart(item);
  }

  getTotalPrice = () => {
    return this.cartService.getSubTotal();
  }
}

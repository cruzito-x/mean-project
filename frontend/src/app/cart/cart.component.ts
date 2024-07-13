import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { OrderInfoComponent } from "../pay/order-info/order-info.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, OrderInfoComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  faCreditCard = faCreditCard;
  indexColor: number = 0;

  ngOnInit(): void {
    this.cartService.validateCart();
  }

  deleteItemFromCart = (item: any) => {
    this.cartService.indexSelectedColor(this.indexColor);
    this.cartService.deleteItemFromCart(item);
  }

  getTotalPrice = () => {
    this.cartService.indexSelectedColor(this.indexColor);
    return this.cartService.getSubTotal();
  }
}

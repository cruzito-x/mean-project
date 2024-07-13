import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

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
}

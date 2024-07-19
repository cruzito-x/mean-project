import { Component, inject, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { ClientService } from '../../services/client.service';
import $ from 'jquery';

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
  `,
})
export class FinalOrderComponent implements OnInit {
  faPrint = faPrint;
  cartService = inject(CartService);
  clientService = inject(ClientService);

  ngOnInit(): void {
    this.getClientInfo();
  }

  shippingCost() {
    return this.cartService.shippingCost();
  }

  getClientInfo() {
    return this.clientService.getClientInfo();
  }

  printOrder() {
    var printContent = $('#order-content').html();
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
}

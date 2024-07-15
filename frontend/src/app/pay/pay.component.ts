import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartComponent } from './cart/cart.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { ClientInfoComponent } from "./client-info/client-info.component";
import { PayStepsService } from '../services/pay-steps.service';
import { PaymentComponent } from "./payment/payment.component";
import { FinalOrderComponent } from "./final-order/final-order.component";

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [FontAwesomeModule, CartComponent, OrderInfoComponent, ClientInfoComponent, PaymentComponent, FinalOrderComponent],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css',
})
export class PayComponent {
  faShoppingCart = faShoppingCart;
  pay_steps = inject(PayStepsService);
}

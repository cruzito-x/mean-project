import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartComponent } from './cart/cart.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { ClientInfoComponent } from "./client-info/client-info.component";
import { PayStepsService } from '../services/pay-steps.service';
import { PaymentComponent } from "./payment/payment.component";
import $ from "jquery";

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [FontAwesomeModule, CartComponent, OrderInfoComponent, ClientInfoComponent, PaymentComponent],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css',
})
export class PayComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  pay_steps = inject(PayStepsService);

  ngOnInit(): void {
    $("#step-3").on("click", () => {
      if(localStorage.getItem("clientInfo") === null) {
        this.pay_steps.currentStep = 2;
      }
    });
  }
}

import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { OrderInfoComponent } from "../order-info/order-info.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCreditCard, faAt, faMoneyBill, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { PayStepsService } from '../../services/pay-steps.service';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ FontAwesomeModule, OrderInfoComponent],
  templateUrl: './payment.component.html',
  styles: ``
})
export class PaymentComponent {
  faCreditCard = faCreditCard;
  faAt = faAt;
  faMoneyBill = faMoneyBill;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  amount = 0;
  cartService = inject(CartService);

  @ViewChild('paymentRef', { static: false }) paymentRef !: ElementRef;

  constructor(private payment: PaymentService) { }

  ngAfterViewInit(): void {
    this.amount = this.payment.amount;
    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.cartService.getSubTotal()
              }
            }
          ]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          this.pay_steps.nextStep();
        });
      },
      onError(error: any): void {
        console.log('Payment error ', error);
      }
    }).render(this.paymentRef.nativeElement);
  }

  pay_steps = inject(PayStepsService);
}

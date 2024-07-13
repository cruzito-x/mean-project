import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartComponent } from "../cart/cart.component";
import { OrderInfoComponent } from "./order-info/order-info.component";

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [FontAwesomeModule, CartComponent, OrderInfoComponent],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent {
  faShoppingCart = faShoppingCart;

  currentStep = 1;

  showStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    this.currentStep++;
    if (this.currentStep > 3) {
      this.currentStep = 3;
    }
  }

  prevStep() {
    this.currentStep--;
    if (this.currentStep < 1) {
      this.currentStep = 1;
    }
  }

  finishStep() {
    alert('Stepper Finished!');
  }

}

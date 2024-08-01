import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayStepsService {
  currentStep = 1;

  constructor() { }

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
  
}

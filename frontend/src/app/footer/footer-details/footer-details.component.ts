import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrademarkComponent } from "./trademark/trademark.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { WarrantyComponent } from "./warranty/warranty.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { OffersConditionsComponent } from "./offers-conditions/offers-conditions.component";
import { StoryComponent } from "./story/story.component";
import { ServicesComponent } from "./services/services.component";
import { TermsAndConditionsComponent } from "./terms-and-conditions/terms-and-conditions.component";

@Component({
  selector: 'app-footer-details',
  standalone: true,
  imports: [TrademarkComponent, PrivacyComponent, WarrantyComponent, DeliveryComponent, OffersConditionsComponent, StoryComponent, ServicesComponent, TermsAndConditionsComponent],
  templateUrl: './footer-details.component.html',
  styles: ``
})
export class FooterDetailsComponent {
  constructor(private route: ActivatedRoute) {}
  info: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.info = params['info'];
      return this.route;
    });
  }
}

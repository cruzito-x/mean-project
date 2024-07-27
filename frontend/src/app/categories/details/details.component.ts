import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faCartShopping, faInfoCircle, faTags } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, RouterLink } from '@angular/router';
import $ from 'jquery';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  faHome = faHome;
  faCartShopping = faCartShopping;
  faInfoCircle = faInfoCircle;
  faTags = faTags;
  product_id: string = '';
  activeTab: string = 'description';
  indexColor = 0;

  cartService = inject(CartService);
  productsService = inject(ProductsService);

  constructor(private route: ActivatedRoute, private titleService: Title) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.product_id = params['id'];

      const title = `CinnaTech Store | ${this.productsService.products[0].name} details`
      this.titleService.setTitle(title);

      return this.route;
    });

    this.productsService.getProductDetails(this.product_id);
  }

  getBorderColor(index: number): void {
    $("span[id^='color-']").css({
      border: "2px"
    });

    $("span .bg-white").css({
      border: "1px solid #cacbcf"
    });
    
    $("#color-"+index).css({
      border: "2px solid #007bff"
    });
  }

  indexSelectedColor(indexSelectedColor: number) {
    this.cartService.indexSelectedColor(indexSelectedColor);
    this.indexColor = indexSelectedColor;
  }

  addToCart(product: any) {
    this.cartService.quantity = parseInt($("#quantity").val() as string);
    this.cartService.indexSelectedColor(this.indexColor);
    this.cartService.addToCart(product);
  }
}

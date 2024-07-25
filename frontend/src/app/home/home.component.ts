import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  faCartShopping = faCartShopping;

  cartService = inject(CartService);
  productsService = inject(ProductsService);

  ngOnInit() {
    this.productsService.getAllProducts();
    this.productsService.getBestRatedProducts();
    this.isLoggedIn();
  }

  isLoggedIn() {
    return localStorage.getItem("isLoggedIn");
  }
}

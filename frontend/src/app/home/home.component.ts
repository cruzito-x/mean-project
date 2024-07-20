import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';

interface Brand {
  id: string;
  name: string;
}

interface Colors {
  name: string;
}

interface Product {
  id: string;
  name: string;
  brand: Brand[];
  category: string;
  created_at: string;
  description: string;
  photo: string;
  colors: Colors[];
  price: number;
  discount: number;
  rating: number;
  stock: number;
  sub_categorie: string;
  technical_specifications: string;
  updated_at: string | null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  bestRatedProducts: Product[] = [];
  faCartShopping = faCartShopping;

  cartService = inject(CartService);

  ngOnInit() {
    this.getAllProducts();
    this.getBestRatedProducts();
    this.isLoggedIn();
  }

  isLoggedIn() {
    return localStorage.getItem("isLoggedIn");
  }

  getAllProducts() {
    fetch('http://localhost:3000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error to get products');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data.slice(0, 6);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getBestRatedProducts() {
    fetch('http://localhost:3000/products/bestRated')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error to get best rated products');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.bestRatedProducts = data.slice(0, 6);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  generateRatingStars(rating: number) {
    let stars = '';

    for (let n = 0; n < rating; n++) {
      stars += '★';
    }

    return stars;
  }
}

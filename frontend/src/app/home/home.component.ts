import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: number;
  name: string;
  brand: string;
  categorie: string;
  created_at: string;
  description: string;
  photo: string;
  price: number;
  rating: number;
  stock: number;
  sub_categorie: string;
  technical_specifications: string;
  updated_at: string | null;
  _id: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  faShoppingBag = faShoppingBag;

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    fetch('http://localhost:3000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error to get products');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data.slice(0, 6);
        console.log('Products:', this.products);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

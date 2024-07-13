import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faInfoCircle, faTags } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Brand {
  id: string;
  name: string;
}

type Colors = {
  id: string;
  color: string;
};

interface Tags {
  name: string;
}

interface Product {
  id: string;
  name: string;
  brand: Brand[];
  category_id: string;
  category: string;
  created_at: string;
  description: string;
  photo: string;
  colors: Colors[];
  price: number;
  rating: number;
  stock: number;
  sub_category: string;
  tags: Tags[];
  technical_specifications: string;
  updated_at: string | null;
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  products: Product[] = [];
  faCartShopping = faCartShopping;
  faInfoCircle = faInfoCircle;
  faTags = faTags;
  cartService = inject(CartService);
  product_id: string = '';
  activeTab: string = 'description';
  indexColor = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.product_id = params['id'];

      this.getProductDetails(this.product_id);
      return this.route;
    });
  }

  getProductDetails(product: string) {
    fetch(`http://localhost:3000/products/details/${product}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error getting product details');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data;
      })
      .catch((error) => console.error('Error:', error));
  }

  generateRatingStars(rating: number) {
    let stars = '';

    for (let n = 0; n < rating; n++) {
      stars += '★';
    }

    return stars;
  }

  indexSelectedColor(indexSelectedColor: number) {
    this.cartService.indexSelectedColor(indexSelectedColor);
    this.indexColor = indexSelectedColor;
  }

  addToCart(product: Product) {
    this.cartService.indexSelectedColor(this.indexColor);
    this.cartService.addToCart(product);
  }
}

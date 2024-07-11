import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';

interface Brand {
  id: string;
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
  price: number;
  rating: number;
  stock: number;
  sub_category: string;
  technical_specifications: string;
  updated_at: string | null;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './category.component.html',
  styles: ``
})
export class CategoryComponent implements OnInit {
  category_id: string = '';
  category: string = '';
  subcategory: string = '';
  subsubcategory: string = '';
  products: Product[] = [];
  uniqueBrands: Brand[] = [];
  faSearch = faSearch;
  faCartShopping = faCartShopping;

  constructor(private route: ActivatedRoute) {}

  cartService = inject(CartService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category_id = params['id'];
      this.category = params['category'];
      this.subcategory = params['subcategory'];
      this.subsubcategory = params['subsubcategory'];

      this.getProductsByCategory(this.category_id);
    });
  }

  getProductsByCategory(category: string) {
    fetch(`http://localhost:3000/products/category/${category}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error getting products by category');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data;
        this.uniqueBrands = this.getUniqueBrands(data);
      })
      .catch((error) => console.error('Error:', error));
  }

  getUniqueBrands(products: Product[]): Brand[] {
    const brandSet: Set<string> = new Set();
    const uniqueBrands: Brand[] = [];

    products.forEach((product) => {
      product.brand.forEach((brand) => {
        if (brand.name && !brandSet.has(brand.name)) {
          brandSet.add(brand.name);
          uniqueBrands.push(brand);
        }
      });
    });
    
    return uniqueBrands;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}

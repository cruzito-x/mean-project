import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

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
  selector: 'app-products',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgxPaginationModule],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent {
  brands: Brand[] = [];
  products: Product[] = [];
  uniqueBrands: Brand[] = [];
  faCartShopping = faCartShopping;
  faSearch = faSearch;
  familyName: string = '';
  itemsPerPage = 9;
  page = 1;
  cartService = inject(CartService);

  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.familyName = params['category'];

      this.getProductsByFamilyName(this.familyName);
      return this.route;
    });

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .pipe(map(result => result.matches))
    .subscribe(isSmallScreen => {
      this.itemsPerPage = isSmallScreen ? 10 : 9;
    });
  }

  getProductsByFamilyName(familyName: string) {
    fetch(`http://localhost:3000/products/family/${familyName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error getting products by family name');
      }
      return response.json();
    })
    .then((data: Product[]) => {
      this.products = data;
      this.uniqueBrands = this.getUniqueBrands(data);
      }
    )
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

  handlePageChange(event: any) {
    this.page = event;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
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
  discount: number;
  rating: number;
  stock: number;
  sub_category: string;
  technical_specifications: string;
  updated_at: string | null;
}

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgxPaginationModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit {
  products: Product[] = [];
  brands: Brand[] = [];
  itemsPerPage: number = 8;
  page: number = 1;
  faSearch = faSearch;
  faCartShopping = faCartShopping;

  cartService = inject(CartService);

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.getOffersProducts();

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .pipe(map(result => result.matches))
    .subscribe(isSmallScreen => {
      this.itemsPerPage = isSmallScreen ? 6 : 12;
    });
  }

  getOffersProducts() {
    fetch("http://localhost:3000/products/products/offers")
    .then(response => {
      if (!response.ok) {
        throw new Error('Error getting offers products');
      }
      return response.json();
    })
    .then((data: Product[]) => {
      this.products = data;
      console.log(this.products);
    })
  }

  handlePageChange(event: any) {
    this.page = event;
  }
}

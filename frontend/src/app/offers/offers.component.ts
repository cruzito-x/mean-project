import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import $ from "jquery";

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgxPaginationModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit {
  itemsPerPage: number = 8;
  page: number = 1;
  faSearch = faSearch;
  faCartShopping = faCartShopping;
  cartService = inject(CartService);
  productsService = inject(ProductsService);

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.productsService.getOffersProducts();

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .pipe(map(result => result.matches))
    .subscribe(isSmallScreen => {
      this.itemsPerPage = isSmallScreen ? 6 : 12;
    });

    $("#searchBar").on("keyup", () => {
      this.productsService.searchProductByName();
    });

    $("#searchButton").on("click", () => {
      this.productsService.searchProductByName();
    });
  }

  handlePageChange(event: any) {
    this.page = event;
  }
}

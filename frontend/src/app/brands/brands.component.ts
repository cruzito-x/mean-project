import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from "ngx-pagination";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { BrandsService } from '../services/brands.service';
import $ from "jquery";

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgxPaginationModule],
  templateUrl: './brands.component.html',
  styles: ``
})
export class BrandsComponent implements OnInit {
  faSearch = faSearch;
  page = 1;
  itemsPerPage = 20;

  constructor(private breakpointObserver: BreakpointObserver) {}

  brandsService = inject(BrandsService);

  ngOnInit(): void {
    this.brandsService.getAllBrands();
    
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .pipe(map(result => result.matches))
      .subscribe(isSmallScreen => {
        this.itemsPerPage = isSmallScreen ? 10 : 20;
      });

      $("#searchBar").on("keyup", () => {
        this.brandsService.searchBrandByName();
      });
  
      $("#searchButton").on("click", () => {
        this.brandsService.searchBrandByName();
      });
  }

  handlePageChange(event: any) {
    this.page = event;
  }
}

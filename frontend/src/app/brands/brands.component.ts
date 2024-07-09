import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from "ngx-pagination";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

interface Brands {
  id: number;
  name: string;
  photo: String;
  created_at: Date;
  updated_at: Date;
}

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgxPaginationModule],
  templateUrl: './brands.component.html',
  styles: ``
})
export class BrandsComponent implements OnInit {
  brands: Brands[] = [];
  faSearch = faSearch;
  page = 1;
  itemsPerPage = 20;

  constructor(private breakpointObserver: BreakpointObserver) {}

  handlePageChange(event: any) {
    this.page = event;
  }

  ngOnInit(): void {
    this.getAllBrands();
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .pipe(map(result => result.matches))
      .subscribe(isSmallScreen => {
        this.itemsPerPage = isSmallScreen ? 10 : 20;
      });
  }

  getAllBrands() {
    fetch('http://localhost:3000/brands')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error to get brands');
        }
        return response.json();
      })
      .then((data: Brands[]) => {
        this.brands = data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

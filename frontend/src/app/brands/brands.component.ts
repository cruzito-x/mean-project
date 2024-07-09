import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from "ngx-pagination";

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
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  brands: Brands[] = [];
  faSearch = faSearch;
  page = 1;

  handlePageChange(event: any) {
    this.page = event;
  }

  ngOnInit(): void {
    this.getAllBrands();    
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

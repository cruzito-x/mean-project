import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Subcategory {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Categories {
  id: number;
  name: string;
  photo: string;
  subcategories: Subcategory[];
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: Categories[] = [];

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    fetch('http://localhost:3000/categories')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error to get categories');
        }
        return response.json();
      })
      .then((data: Categories[]) => {
        this.categories = data;
        console.log(this.categories);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

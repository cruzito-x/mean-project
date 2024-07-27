import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styles: ``
})
export class CategoriesComponent implements OnInit {
  categoriesService = inject(CategoriesService);

  ngOnInit() {
    this.categoriesService.getAllCategories();
  }
}

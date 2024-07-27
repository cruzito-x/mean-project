import { Injectable } from "@angular/core";

interface Subcategory {
  id: string;
  name: string;
  total_sold: number;
  subcategories: Subcategory[];
}

interface Categories {
  id: number;
  name: string;
  photo: string;
  subcategories: Subcategory[];
  total_sold: number;
}

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  categories: Categories[] = [];

  constructor() { }

  getAllCategories() {
    fetch("http://localhost:3000/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error to get categories");
        }
        return response.json();
      })
      .then((data: Categories[]) => {
        this.categories = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  getMostPopularCategories() {
    fetch("http://localhost:3000/categories/mostPopularCategories")
    .then((response) => {
      if(!response.ok) {
        throw new Error("Error to get most popular categories");
      }
      return response.json();
    })
    .then((data: Categories[]) => {
      this.categories = data;
    })
  }
}

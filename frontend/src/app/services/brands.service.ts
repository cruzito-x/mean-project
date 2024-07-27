import { Injectable } from "@angular/core";

interface Brands {
  id: number;
  name: string;
  photo: String;
  created_at: Date;
  updated_at: Date;
}

@Injectable({
  providedIn: "root",
})
export class BrandsService {
  brands: Brands[] = [];

  constructor() {}

  getAllBrands() {
    fetch("http://localhost:3000/brands")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error to get brands");
        }
        return response.json();
      })
      .then((data: Brands[]) => {
        this.brands = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  searchBrandByName() {
    let brand = $("#searchBar").val()?.toString() || "";

    if(brand !== "") {
      this.searchBrands(brand.trim());
    } else {
      this.getAllBrands();
    }
  }

  searchBrands(brand: string) {
    fetch(`http://localhost:3000/brands/search/${brand}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error searching brand");
        }

        return response.json();
      })
      .then((data: Brands[]) => {
        this.brands = data;
      });
  }
}

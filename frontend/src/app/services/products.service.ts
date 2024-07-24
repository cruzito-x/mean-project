import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = [];
  brands: Brand[] = [];
  uniqueBrands: Brand[] = [];
  productName: string = '';
  selectedBrand: string = 'all';

  constructor() {}

  getOffersProducts() {
    fetch('http://localhost:3000/products/products/offers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error getting offers products');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        console.log('Products offer: ', data);
        this.products = data;
      });
  }

  searchProductByName() {
    this.productName = $('#searchBar').val()?.toString() || '';

    if (this.productName !== '') {
      this.searchProducts(this.productName.trim());
    } else {
      this.getOffersProducts();
    }
  }

  searchProducts(productName: string) {
    fetch(`http://localhost:3000/products/search/${productName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error searching products');
        }

        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data;
      });
  }

  getProductsByCategory(category: string) {
    fetch(`http://localhost:3000/products/category/${category}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error getting products by category');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data;
        this.uniqueBrands = this.getUniqueBrands(data);
      })
      .catch((error) => console.error('Error:', error));
  }

  searchProductByCategory(category_id: string) {
    this.productName = $('#searchBar').val()?.toString() || '';

    if (this.productName !== '') {
      this.searchProducts(this.productName.trim());
    } else {
      this.getProductsByCategory(category_id);
    }
  }

  searchByBrand(category_id: string, brand: string) {
    console.log(category_id, brand);
    fetch(`http://localhost:3000/products/search/brand/${category_id}/${brand}`)
    .then((response) => {
      if(!response.ok) {
        throw new Error("Error getting products by brand");
      }

      return response.json();
    })
    .then((data: Product[]) => {
      this.products = data;
    });
  }

  searchByNameCategoryAndBrand(category_id: string) {
    this.productName = $("#searchBar").val()?.toString() || "";
    let brand: string = $("#"+this.selectedBrand).val()?.toString().toLowerCase() || "all";

    if(this.productName !== "") {
      if(brand === "all") {
        this.getProductsByCategory(category_id);
      } else {
        console.log(brand);
        this.searchInCategory(this.productName.trim(), category_id, brand);
      }
    } else {
      if(brand ===  "all") {
        this.getProductsByCategory(category_id);
      } else {
        this.searchByBrand(category_id, brand);
      }
    }
  }

  searchInCategory(productName: string, category_id: string, brand: string) {
    fetch(`http://localhost:3000/products/search/name/${productName}/category/${category_id}/brand/${brand}`)
    .then((response) => {
      if(!response.ok) {
        throw new Error("Error getting products");
      }

      return response.json();
    })
    .then((data: Product[]) => {
      this.products = data;
    });
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

  selectBrand(brand: string): void {
    this.selectedBrand = brand;
  }
}

import { inject, Injectable } from "@angular/core";
import { CartService } from "./cart.service";

interface Brand {
  id: string;
  name: string;
}

interface Colors {
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
  colors: Colors[];
  price: number;
  discount: number;
  rating: number;
  stock: number;
  sub_category: string;
  technical_specifications: string;
  updated_at: string | null;
}

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  products: Product[] = [];
  bestRatedProducts: Product[] = [];
  brands: Brand[] = [];
  uniqueBrands: Brand[] = [];
  productName: string = "";
  selectedBrand: string = "all";
  page: number = 1;

  cartService = inject(CartService);

  constructor() {}

  /* Functionallity for home view */

  getAllProducts() {
    fetch('http://localhost:3000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error to get products');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data.slice(0, 6);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getBestRatedProducts() {
    fetch('http://localhost:3000/products/bestRated')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error to get best rated products');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.bestRatedProducts = data.slice(0, 6);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /* Functionallity for offers view */
  getOffersProducts() {
    fetch("http://localhost:3000/products/products/offers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error getting offers products");
        }
        return response.json();
      })
      .then((data: Product[]) => {
        console.log("Products offer: ", data);
        this.products = data;
      });
  }

  searchProductByName() {
    this.productName = $("#searchBar").val()?.toString() || "";

    if (this.productName !== "") {
      this.searchProducts(this.productName.trim());
    } else {
      this.getOffersProducts();
    }
  }

  searchProducts(productName: string) {
    fetch(`http://localhost:3000/products/search/${productName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error searching products");
        }

        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data;
      });
  }

  /* Functionallity for category/:subcategory/:subsubcategory/:subsubcategoryId view */

  getProductsByCategory(category: string) {
    fetch(`http://localhost:3000/products/category/${category}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error getting products by category");
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data;
        this.uniqueBrands = this.getUniqueBrands(data);
      })
      .catch((error) => console.error("Error:", error));
  }

  searchProductByCategory(category_id: string) {
    this.productName = $("#searchBar").val()?.toString() || "";

    if (this.productName !== "") {
      this.searchProducts(this.productName.trim());
    } else {
      this.getProductsByCategory(category_id);
    }
  }

  searchByBrand(category_id: string, brand: string) {
    fetch(`http://localhost:3000/products/search/category/${category_id}/brand/${brand}`)
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
    let brand: string = $("#"+this.selectedBrand).val()?.toString().toLowerCase() || "";

    if(this.productName !== "") {
      if(brand === "all") {
        this.getProductsByCategory(category_id);
      } else {
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

  /* Functionallity for products/:subcategory view */
  searchByNameSubcategoryAndBrand(subcategory: string) {
    this.productName = $("#searchBar").val()?.toString() || "";
    let brand: string = $("#"+this.selectedBrand).val()?.toString().toLowerCase() || "";

    if(this.productName !== "") {
      if(brand === "all") {
        this.getProductsBySubcategory(subcategory);
      } else {
        this.searchInSubcategory(this.productName.trim(), subcategory, brand);
      }
    } else {
      if(brand ===  "all") {
        this.getProductsBySubcategory(subcategory);
      } else {
        this.searchBySubcategoryAndBrand(subcategory, brand);
      }
    }

    console.log("Subcategory:", subcategory, "Brand:", brand, "Product:", this.productName);
  }

  getProductsBySubcategory(subcategory: string) {
    fetch(`http://localhost:3000/products/subcategory/${subcategory}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error getting products by sub category");
      }
      return response.json();
    })
    .then((data: Product[]) => {
      this.products = data;
      this.uniqueBrands = this.getUniqueBrands(data);
      }
    );
  }

  searchBySubcategoryAndBrand(subcategory: string, brand: string) {
    fetch(`http://localhost:3000/products/search/subcategory/${subcategory}/brand/${brand}`)
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

  searchInSubcategory(productName: string, subcategory: string, brand: string) {
    fetch(`http://localhost:3000/products/search/name/${productName}/subcategory/${subcategory}/brand/${brand}`)
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

  /* Functionallity for brand/:brand view */
  getProductsByBrand(brand: string) {
    fetch(`http://localhost:3000/products/brand/${brand}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error getting product details");
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data;
      })
      .catch((error) => console.error("Error:", error));
  }

  /* Aditional functions */
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

  generateRatingStars(rating: number) {
    let stars = "";

    for (let n = 0; n < rating; n++) {
      stars += "★";
    }

    while (stars.length < 5) {
      stars += "☆";
    }

    return stars;
  }

  selectBrand(brand: string): void {
    this.selectedBrand = brand;
  }

  handlePageChange(event: any) {
    this.page = event;
  }
}

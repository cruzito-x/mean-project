import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  brand: string;
  categorie: string;
  created_at: string;
  description: string;
  photo: string;
  price: number;
  rating: number;
  stock: number;
  sub_categorie: string;
  technical_specifications: string;
  updated_at: string | null;
  _id: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styles: `
    .card {
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
    
    .card img {
      transition: opacity 0.3s ease;
    }
    
    .card .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .5);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-size: 1.25rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
        
    .card:hover img {
      opacity: 0.5;
    }

    .card:hover .overlay {
      opacity: 1;
    }

    .categorie {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 11px;
    }
  `
})
export class HomeComponent implements OnInit {
  name: string = '';
  description: string = '';
  categorie: string = '';
  brand: string = '';
  photo: string = '';
  price: number = 0;

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    fetch("http://localhost:3000/products")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error fetching products");
        }
        return response.json();
      })
      .then(data => {
        const product: Product = data[0];
        this.name = product.name;
        this.description = product.description;
        this.categorie = product.categorie;
        this.brand = product.brand;
        this.photo = product.photo;
        this.price = product.price;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

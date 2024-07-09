import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // private items: any[] = JSON.parse(localStorage.getItem('cartList') || '[]');
  private items: any[] = [];

  constructor() {}

  addToCart(item: any) {
    this.items.push({ ...item, quantity: 1 });
    // localStorage.setItem('cartList', JSON.stringify(this.items));
  }

  getItems() {
    return this.items;
  }

  deleteItemFromCart(item: any) {
    this.items = this.items.filter((n) => n.id !== item.id);
    // localStorage.setItem('cartList', JSON.stringify(this.items));
  }

  increaseQuantity(id: number) {
    let item = this.items.find((n) => n.id === id);
    
    if(item) item.quantity++;

    // localStorage.setItem('cartList', JSON.stringify(this.items));
  }

  decreaseQuantity(id: number) {
    let item = this.items.find((n) => n.id === id);
    
    if(item) if(item.quantity > 0) item.quantity--;

    // localStorage.setItem('cartList', JSON.stringify(this.items));
  }

  getSubTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

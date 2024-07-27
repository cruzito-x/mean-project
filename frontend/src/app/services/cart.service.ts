import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: any[] = [];
  indexColor: number = 0;
  amount: number = 0;
  quantity:number = 1;

  constructor() {}

  addToCart(item: any) {
    const existingItem = this.items.find((cartItem) => cartItem.id === item.id && cartItem.indexColor === this.indexColor);

    if (existingItem) {
      this.increaseQuantity(existingItem.id, this.indexColor);
    } else {
      this.items.push({ ...item, indexColor: this.indexColor, quantity: this.quantity });
      localStorage.setItem('cartList', JSON.stringify(this.items));
    }
  }

  isLoggedIn() {
    return localStorage.getItem("isLoggedIn");
  }

  getItems() {
    return this.items;
  }

  deleteItemFromCart(item: any) {
    this.items = this.items.filter((n) => !(n.id === item.id && n.indexColor === item.indexColor));
    localStorage.setItem('cartList', JSON.stringify(this.items));
  }

  increaseQuantity(id: number, indexColor: number) {
    let item = this.items.find((n) => n.id === id && n.indexColor === indexColor);

    if (item) item.quantity += this.quantity;

    localStorage.setItem('cartList', JSON.stringify(this.items));
  }

  indexSelectedColor(index: number) {
    this.indexColor = index;
  }

  decreaseQuantity(id: number, indexColor: number) {
    let item = this.items.find((n) => n.id === id && n.indexColor === indexColor);

    if (item) {
      if (item.quantity == 1) {
        this.deleteItemFromCart(item);
      } else {
        item.quantity--;
      }
      
      localStorage.setItem('cartList', JSON.stringify(this.items));
    }
  }

  getSubTotal() {
    console.log(this.items);

    if(this.items[0].discount === 0) {
      return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    } else {
      return this.items.reduce((total, item) => total + (item.price - (item.price * item.discount)) * item.quantity, 0);
    }
  }

  validateCart() {
    if (this.items != null) {
      this.items = JSON.parse(localStorage.getItem('cartList') || '[]');
    }
  }

  shippingCost() {
    return this.amount;
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('cartList');
  }
}

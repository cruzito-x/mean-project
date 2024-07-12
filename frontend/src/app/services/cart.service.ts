import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: any[] = [];
  indexColor: number = 0;

  constructor() {}

  addToCart(item: any) {
    if(this.items.find((cartItem) => cartItem.id === item.id)) {
      this.increaseQuantity(item.id);
    } else {
      this.items.push({ ...item, indexColor: this.indexColor, quantity: 1 });
      localStorage.setItem('cartList', JSON.stringify(this.items));
    }
  }

  getItems() {
    return this.items;
  }

  deleteItemFromCart(item: any) {
    this.items = this.items.filter((n) => n.id !== item.id);
    localStorage.setItem('cartList', JSON.stringify(this.items));
  }

  increaseQuantity(id: number) {
    let item = this.items.find((n) => n.id === id);

    if(item) item.quantity++;

    localStorage.setItem('cartList', JSON.stringify(this.items));
  }

  indexSelectedColor(index: number) {
    this.indexColor = index;
    console.log(this.indexColor);
  }

  decreaseQuantity(id: number) {
    let item = this.items.find((n) => n.id === id);

    if(item) if(item.quantity == 1) this.deleteItemFromCart(item); else item.quantity--;

    localStorage.setItem('cartList', JSON.stringify(this.items));
  }

  getSubTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  validateCart() {
    if(this.items != null) {
       this.items = JSON.parse(localStorage.getItem('cartList') || '[]');
    }
  }
}

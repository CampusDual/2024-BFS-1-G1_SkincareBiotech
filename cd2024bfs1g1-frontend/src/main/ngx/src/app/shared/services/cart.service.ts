import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any[] = [];
  localStorageCart = [];

  addProductToCart(product: any): void {
    this.cart.push(product);
    localStorage.setItem('product', JSON.stringify(product));
  }


  constructor() { 
  }
}

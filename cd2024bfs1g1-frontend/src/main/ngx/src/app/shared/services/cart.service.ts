import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any[] = [];


  addProductToCart(product: any) {
    let p = { id: product.PRO_ID, price: product.PRO_PRICE, units: 1 };
    this.loadLocalStorageCart();

    let p_ls = this.cart.find(x => x.id == p.id);

    if (p_ls) {
      p_ls.units += 1;
    } else {
      this.cart.push(p);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    
  }
  loadLocalStorageCart(): void {
    let localStorageCart = localStorage.getItem('cart');
    if (localStorageCart) {
      this.cart = JSON.parse(localStorageCart);
    } else {
      this.cart = [];
    }
  }

  constructor() {
  }
}

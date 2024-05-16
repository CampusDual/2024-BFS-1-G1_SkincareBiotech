import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any[] = [];


  addProductToCart(product: any) {
    let p = { id: product.PRO_ID, units: 1 };
    this.loadLocalStorageCart();

    let p_ls = this.cart.find(x => x.id === p.id);

    if (p_ls) {
      p_ls.units += 1;
    } else {
      this.cart.push(p);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));

  }

  removeItem(productID: any) {
    this.loadLocalStorageCart();

    let p_ls = this.cart.find(x => x.id === productID);

    if (p_ls === undefined) {
      return;
    }

    p_ls.units -= 1;
    if (p_ls.units === 0) {
      this.cart = this.cart.filter(x => x.id !== productID)
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

  getCart(): any[] {
    this.loadLocalStorageCart();
    return this.cart;

  }

  emptyCart(): void {
    localStorage.removeItem("cart");
  }

  deleteItem(productID: any) {
    this.loadLocalStorageCart();
    this.cart = this.cart.filter(x => x.id !== productID);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  constructor() {
  }


}

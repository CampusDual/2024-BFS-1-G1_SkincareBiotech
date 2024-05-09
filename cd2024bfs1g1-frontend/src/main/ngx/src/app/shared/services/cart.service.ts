import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any[] = [];
  

  addProductToCart(product: any){
    let p = {id:product.PRO_ID, price:product.PRO_PRICE, units: 0};
    this.loadLocalStorageCart();
    if (p.id) {
      p.units++;
      // this.updateProduct(p.id, p.units);
    }else{
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

  // updateProduct(p.id, p.units){
  //   p.units++;
  // }

  constructor() { 
  }
}

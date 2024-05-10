import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {

  @Input() item:any;

  cart : any[] = [];

  constructor(private cartService : CartService) {
    
    this.cart = this.cartService.getCart();
  } 

}
import { Component, OnInit } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit{

  service : OntimizeService;

  cart : any[] = [];

  constructor(private cartService : CartService) {
    
    this.cart = this.cartService.getCart();
    console.log(this.cart);
  } 

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
  }

}
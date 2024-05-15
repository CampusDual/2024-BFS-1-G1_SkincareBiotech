import { Component, OnInit } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit{

  service : OntimizeService;
  
  cart : any[] = [];

  constructor(
    private cartService : CartService,
    private router: Router
  ) {
    
    this.cart = this.cartService.getCart();
  } 

  ngOnInit(): void {
  }

  updateCart(): void {
    this.cart = this.cartService.getCart();
  }

  createOrder(): void {
    this.router.navigate(["/order/cart"]);
  }

  
  goBack(): void {
    this.router.navigate(["/"]);
  }
}
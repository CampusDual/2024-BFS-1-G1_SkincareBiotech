import { Component, OnInit } from '@angular/core';
import { AuthService, OntimizeService } from 'ontimize-web-ngx';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  service: OntimizeService;

  cart: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {

    this.cart = this.cartService.getCart();
  }

  ngOnInit(): void {
  }

  updateCart(): void {
    this.cart = this.cartService.getCart();
  }

  createOrder(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/order/cart"]);
    } else {
      this.router.navigate(
        ["/login"],
        { queryParams: { 'session-not-started': 'true' } }
      )
    }
  }


  goBack(): void {
    this.router.navigate(["/"]);
  }

}  

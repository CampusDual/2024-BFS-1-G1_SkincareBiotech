import { Component, OnInit } from '@angular/core';
import { AuthService, PermissionsService } from 'ontimize-web-ngx';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-public-component',
  templateUrl: './public-component.component.html',
  styleUrls: ['./public-component.component.scss']
})


export class PublicComponentComponent implements OnInit {
  isLoaded : boolean = false;
  isLogedIn : boolean = false;
  cartCount : Number = 0;

  constructor(
    private permissionService: PermissionsService,
    private authService : AuthService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.isLogedIn = this.authService.isLoggedIn();
    this.loadPermissions();
    this.cartService.number$.subscribe((count) => {
      this.cartCount = count;
    });
    this.cartService.updateCartItemsCount();
  }

  loadPermissions(){
    this.permissionService.getUserPermissionsAsPromise().then(() =>{
      this.isLoaded = true;
    });
  }

  logout(){
    this.authService.clearSessionData();
    this.isLogedIn = false;
    this.isLoaded = false;
    this.loadPermissions();
  }
  


}

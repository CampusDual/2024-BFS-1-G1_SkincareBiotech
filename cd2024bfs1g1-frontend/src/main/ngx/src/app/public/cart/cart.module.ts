import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartViewComponent } from './cart-view/cart-view.component';


@NgModule({
  declarations: [
    CartViewComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    OntimizeWebModule,
  ]
})
export class CartModule { }

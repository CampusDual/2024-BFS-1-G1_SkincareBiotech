import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartRoutingModule } from './cart-routing.module';


@NgModule({
  declarations: [
    CartItemComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    OntimizeWebModule,
  ],
  exports: [
    CartItemComponent
  ]
})
export class CartModule { }

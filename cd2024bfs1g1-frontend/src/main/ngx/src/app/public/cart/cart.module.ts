import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { CartRoutingModule } from './cart-routing.module';
import { CartViewComponent } from './cart-view/cart-view.component';


@NgModule({
  declarations: [
    CartViewComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    OntimizeWebModule,
  ]
})
export class CartModule { }

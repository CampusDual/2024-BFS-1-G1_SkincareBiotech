import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { ProductsComponent } from './products/products.component';
import { DetailsComponent } from './products/details/details.component';
import { NewOrderModule } from './products/details/new-order/new-order.module';


@NgModule({
  declarations: [
    ProductsComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    NewOrderModule
  ]
})
export class PublicModule { }

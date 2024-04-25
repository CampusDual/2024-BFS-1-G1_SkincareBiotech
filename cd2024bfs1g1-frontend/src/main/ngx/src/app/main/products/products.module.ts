import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ProductsHomeComponent } from './products-home/products-home.component';


@NgModule({
  declarations: [
    ProductsHomeComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }

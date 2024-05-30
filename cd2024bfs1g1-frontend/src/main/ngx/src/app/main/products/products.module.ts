import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsNewComponent } from './products-new/products-new.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsNewSaleComponent } from './products-new-sale/products-new-sale.component';



@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProductsNewComponent,
    ProductsDetailComponent,
    ProductsNewSaleComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }

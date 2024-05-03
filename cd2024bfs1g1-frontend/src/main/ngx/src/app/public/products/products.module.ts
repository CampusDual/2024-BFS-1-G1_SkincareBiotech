import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsViewComponent } from './products-view/products-view.component';


@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductsViewComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    OntimizeWebModule,
  ],
  providers: [
    {provide: 'tSale', useValue: "SALE"},
    {provide: 'tOriginal', useValue: "ORIGINAL"}
  ]
})
export class ProductsModule { }

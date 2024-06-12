import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { OntimizeService, OntimizeWebModule } from 'ontimize-web-ngx';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsNewComponent } from './products-new/products-new.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsNewSaleComponent } from './products-new-sale/products-new-sale.component';

import { OChartModule } from 'ontimize-web-ngx-charts';
import { ProductAllergenComponent } from './product-allergen/product-allergen.component';
import { ProductSkinComponent } from './product-skin/product-skin.component';


@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProductsNewComponent,
    ProductsDetailComponent,
    ProductsNewSaleComponent,
    ProductAllergenComponent,
    ProductSkinComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    ProductsRoutingModule,
    OChartModule
  ]
})
export class ProductsModule { }

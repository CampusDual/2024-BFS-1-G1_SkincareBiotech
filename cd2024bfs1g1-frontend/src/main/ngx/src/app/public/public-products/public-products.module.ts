import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { PublicProductsRoutingModule } from './public-products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ProductsFeaturedComponent } from './products-featured/products-featured.component';
import { ProductsRecentComponent } from './products-recent/products-recent.component';


@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductsViewComponent,
    ProductsFeaturedComponent,
    ProductsRecentComponent
  ],
  imports: [
    CommonModule,
    PublicProductsRoutingModule,
    OntimizeWebModule,
  ]
})
export class PublicProductsModule { }

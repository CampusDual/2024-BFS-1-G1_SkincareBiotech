import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { PublicProductsRoutingModule } from './public-products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ProductsRecentComponent } from './products-recent/products-recent.component';
import { ProductsFeaturedComponent } from './products-featured/products-featured.component';
import { ProductsDiscountComponent } from './products-discount/products-discount.component';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductsViewComponent,
    ProductsFeaturedComponent,
    ProductsRecentComponent,
    ProductsDiscountComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    PublicProductsRoutingModule,
    OntimizeWebModule,
  ]
})
export class PublicProductsModule { }

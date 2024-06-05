import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { OntimizeService, OntimizeWebModule } from 'ontimize-web-ngx';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsNewComponent } from './products-new/products-new.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { OChartModule } from 'ontimize-web-ngx-charts';


@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProductsNewComponent,
    ProductsDetailComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    ProductsRoutingModule,
    OChartModule
  ]
})
export class ProductsModule { }

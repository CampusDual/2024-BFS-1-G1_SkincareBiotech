import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';


import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsHomeComponent } from './brands-home/brands-home.component';
import { BrandNewComponent } from './brand-new/brand-new.component';


@NgModule({
  declarations: [
    BrandsHomeComponent,
    BrandNewComponent
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    OntimizeWebModule
  ]
})
export class BrandsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { CategoriesNewComponent } from './categories-new/categories-new.component';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';


@NgModule({
  declarations: [
    CategoriesHomeComponent,
    CategoriesNewComponent,
    CategoriesDetailComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    OntimizeWebModule
  ]
})
export class CategoriesModule { }

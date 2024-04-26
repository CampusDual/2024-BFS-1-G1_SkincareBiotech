import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { FilterComponent } from './components/filters/filters.component';
import { HomeToolbarComponent } from './components/home-toolbar/home-toolbar.component';
import { ProductsViewComponent } from '../main/products/products-view/products-view.component';

@NgModule({
  imports: [
    OntimizeWebModule

  ],
  declarations: [
    FilterComponent,
    HomeToolbarComponent,
    ProductsViewComponent
  ],
  exports: [
    CommonModule,
    FilterComponent,
    HomeToolbarComponent,
    ProductsViewComponent
  ]
})
export class SharedModule { }

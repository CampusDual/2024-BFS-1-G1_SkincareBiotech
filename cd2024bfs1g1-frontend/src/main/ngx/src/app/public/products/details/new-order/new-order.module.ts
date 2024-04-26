import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewOrderRoutingModule } from './new-order-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { NewOrderComponent } from './new-order.component';


@NgModule({
  declarations: [
    NewOrderComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    NewOrderRoutingModule
  ]
})
export class NewOrderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersHomeComponent } from './orders-home/orders-home.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [
    OrdersHomeComponent
  ],
  imports: [
    OntimizeWebModule,
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }

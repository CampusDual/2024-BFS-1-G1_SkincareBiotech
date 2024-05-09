import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { NewOrderComponent } from './new-order/new-order.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { NewOrderDetailsComponent } from './new-order-details/new-order-details.component';


@NgModule({
  declarations: [
    NewOrderComponent,
    NewOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    OntimizeWebModule
  ]
})
export class OrdersModule { }
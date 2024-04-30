import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersHomeComponent } from './orders-home/orders-home.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';


@NgModule({
  declarations: [
    OrdersHomeComponent,
    OrdersDetailComponent
  ],
  imports: [
    OntimizeWebModule,
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }

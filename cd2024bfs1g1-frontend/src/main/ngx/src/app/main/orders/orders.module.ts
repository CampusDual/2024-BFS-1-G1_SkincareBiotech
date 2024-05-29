import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersHomeComponent } from './orders-home/orders-home.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { OrdersLinesDetailComponent } from './orders-lines-detail/orders-lines-detail.component';


@NgModule({
  declarations: [
    OrdersHomeComponent,
    OrdersDetailComponent,
    OrdersLinesDetailComponent
  ],
  imports: [
    OntimizeWebModule,
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }

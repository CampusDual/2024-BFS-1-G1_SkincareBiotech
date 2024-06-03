import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { NewOrderComponent } from './new-order/new-order.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { NewOrderDetailsComponent } from './new-order-details/new-order-details.component';
import { OrderRejectedComponent } from './order-rejected/order-rejected.component';
import { CartModule } from '../cart/cart.module';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';


@NgModule({
  declarations: [
    NewOrderComponent,
    NewOrderDetailsComponent,
    OrderRejectedComponent,
    OrdersHistoryComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    OntimizeWebModule,
    CartModule
  ],
  exports: [
    OrdersHistoryComponent,
    NewOrderDetailsComponent
  ]
})
export class OrdersModule { }

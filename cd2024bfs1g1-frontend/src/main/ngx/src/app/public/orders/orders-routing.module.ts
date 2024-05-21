import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './new-order/new-order.component';
import { NewOrderDetailsComponent } from './new-order-details/new-order-details.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';

const routes: Routes = [
  {
    path: 'history',
    component: OrdersHistoryComponent
  },
  {
    path: 'details/:ORD_ID',
    component: NewOrderDetailsComponent
  },
  {
    path: 'cart',
    component: NewOrderComponent
  },
  {
    path: 'history/:ORD_ID',
    component: NewOrderDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

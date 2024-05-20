import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './new-order/new-order.component';
import { NewOrderDetailsComponent } from './new-order-details/new-order-details.component';
import { OrderRejectedComponent } from './order-rejected/order-rejected.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';

const routes: Routes = [

  {
    path: 'history',
    component: OrdersHistoryComponent
  },
  {
    path: 'rejected/:ORD_ID',
    component: OrderRejectedComponent
  },
  {
    path: 'accepted/:ORD_ID',
  },
  {
    path: 'details/:ORD_ID',
    component: NewOrderDetailsComponent
  },
  {
    path: ':PRO_ID',
    component: NewOrderComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

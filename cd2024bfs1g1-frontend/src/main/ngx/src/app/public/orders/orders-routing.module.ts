import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './new-order/new-order.component';
import { NewOrderDetailsComponent } from './new-order-details/new-order-details.component';
import { OrderRejectedComponent } from './order-rejected/order-rejected.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { ProductDetailComponent } from '../public-products/product-detail/product-detail.component';

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
    path: 'cart',
    component: NewOrderComponent
  },
  {
    path: 'history/:ORD_ID/:PRO_ID',
    redirectTo: '/:PRO_ID',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

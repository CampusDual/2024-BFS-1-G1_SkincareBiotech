import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './new-order/new-order.component';
import { NewOrderDetailsComponent } from './new-order-details/new-order-details.component';

const routes: Routes = [
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

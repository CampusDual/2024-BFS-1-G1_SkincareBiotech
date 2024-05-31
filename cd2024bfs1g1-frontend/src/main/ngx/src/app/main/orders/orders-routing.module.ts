import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersHomeComponent } from './orders-home/orders-home.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { OrdersLinesDetailComponent } from './orders-lines-detail/orders-lines-detail.component';

const routes: Routes = [
  {
  path:'',
  component: OrdersHomeComponent
  },
  {
    path:':ORD_ID',
    component: OrdersDetailComponent
  },
  {
    path:':ORD_ID/:OL_ID',
    component: OrdersLinesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

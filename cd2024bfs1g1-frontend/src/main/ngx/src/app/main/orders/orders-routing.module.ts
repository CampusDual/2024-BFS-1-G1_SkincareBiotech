import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersHomeComponent } from './orders-home/orders-home.component';

const routes: Routes = [
  {
  path:'',
  component: OrdersHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

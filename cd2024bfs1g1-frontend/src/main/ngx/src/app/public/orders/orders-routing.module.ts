import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './new-order/new-order.component';

const routes: Routes = [{
  path: '',
  component: NewOrderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

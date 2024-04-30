import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'order', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: '', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

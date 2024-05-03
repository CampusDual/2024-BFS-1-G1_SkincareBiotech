import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponentComponent } from './public-component/public-component.component';

const routes: Routes = [
  {
    component: PublicComponentComponent,
    path: '',
    children: [
      { path: '', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: 'order', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

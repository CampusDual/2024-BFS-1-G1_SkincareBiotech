import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponentComponent } from './public-component/public-component.component';

const routes: Routes = [{
  path: '',
  component: PublicComponentComponent,
  children: [
    { path: 'order', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
    { path: '', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

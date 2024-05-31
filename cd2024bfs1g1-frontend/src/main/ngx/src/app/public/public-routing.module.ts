import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponentComponent } from './public-component/public-component.component';

const routes: Routes = [
  {
    component: PublicComponentComponent,
    path: '',
    children: [
      { path: 'order', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
      { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
      { path: '', loadChildren: () => import('./public-products/public-products.module').then(m => m.PublicProductsModule) },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

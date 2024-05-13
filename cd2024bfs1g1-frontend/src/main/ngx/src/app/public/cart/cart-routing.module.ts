import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CartItemComponent } from './cart-item/cart-item.component';

const routes: Routes = [
  { path: 'cart', component: CartViewComponent},
  { path: 'view', component: CartItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }

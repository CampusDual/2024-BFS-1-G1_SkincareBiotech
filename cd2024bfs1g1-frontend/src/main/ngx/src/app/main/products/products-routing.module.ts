import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsHomeComponent } from './products-home/products-home.component';

const routes: Routes = [{
  path:'',
  component: ProductsHomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

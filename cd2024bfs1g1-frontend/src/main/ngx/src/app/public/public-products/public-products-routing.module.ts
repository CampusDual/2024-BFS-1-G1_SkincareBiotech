import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ProductsFeaturedComponent } from './products-featured/products-featured.component';

const routes: Routes = [
  
  { path: '', component: ProductsFeaturedComponent},
  { path: 'view', component: ProductsViewComponent },  
  { path: 'view/:prod_id', component: ProductDetailComponent},
  { path: ':prod_id', component: ProductDetailComponent } 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicProductsRoutingModule { }

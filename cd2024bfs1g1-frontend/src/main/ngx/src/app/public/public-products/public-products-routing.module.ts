import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ProductsFeaturedComponent } from './products-featured/products-featured.component';

const routes: Routes = [
  { path: '', component: ProductsViewComponent },
  { path: 'featured', component: ProductsFeaturedComponent},
  { path: 'featured/:prod_id', component: ProductDetailComponent},
  { path: ':prod_id', component: ProductDetailComponent }
 // { path: 'order', component:  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicProductsRoutingModule { }
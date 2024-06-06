import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsNewComponent } from './products-new/products-new.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsNewSaleComponent } from './products-new-sale/products-new-sale.component';
import { ProductSkinComponent } from './product-skin/product-skin.component';

const routes: Routes = [{
  path: '',
  component: ProductsHomeComponent
},
{
  path: "new",
  component: ProductsNewComponent
},
{
  path: ':PRO_ID',
  component: ProductsDetailComponent
},
{
  path: ':PRO_ID/new',
  component: ProductsNewSaleComponent
},
{
  path: ':PRO_ID/skin',
  component: ProductSkinComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

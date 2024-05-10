import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsHomeComponent } from './brands-home/brands-home.component';
import { BrandNewComponent } from './brand-new/brand-new.component';
import { BrandsDetailComponent } from './brands-detail/brands-detail.component';

const routes: Routes = [{
  path: '',
  component: BrandsHomeComponent
},
{
  path: 'new',
  component: BrandNewComponent
},
{
  path: ':BRA_ID',
  component: BrandsDetailComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }

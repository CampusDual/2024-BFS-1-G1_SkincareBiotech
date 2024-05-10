import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsHomeComponent } from './brands-home/brands-home.component';
import { BrandNewComponent } from './brand-new/brand-new.component';

const routes: Routes = [{
  path: '',
  component: BrandsHomeComponent
},
{
  path: 'new',
  component: BrandNewComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }

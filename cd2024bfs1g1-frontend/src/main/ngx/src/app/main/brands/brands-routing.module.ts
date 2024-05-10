import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsHomeComponent } from './brands-home/brands-home.component';

const routes: Routes = [{
  path: '',
  component: BrandsHomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }

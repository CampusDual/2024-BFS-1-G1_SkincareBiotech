import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkinTypesHomeComponent } from './skin-types-home/skin-types-home.component';

const routes: Routes = [
  {path: '', component: SkinTypesHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkinTypesRoutingModule { }

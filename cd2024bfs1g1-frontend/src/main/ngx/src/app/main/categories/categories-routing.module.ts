import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { CategoriesNewComponent } from './categories-new/categories-new.component';

const routes: Routes = [{
  path: '',
  component: CategoriesHomeComponent
},

{
  path: "new",
  component: CategoriesNewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { CategoriesNewComponent } from './categories-new/categories-new.component';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';

const routes: Routes = [{
  path: '',
  component: CategoriesHomeComponent
},

{
  path: "new",
  component: CategoriesNewComponent
},
{
  path: ':CAT_ID',
  component: CategoriesDetailComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }

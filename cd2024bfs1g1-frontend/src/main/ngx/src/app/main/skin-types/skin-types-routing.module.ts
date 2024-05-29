import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkinTypesHomeComponent } from './skin-types-home/skin-types-home.component';
import { SkinTypesDetailComponent } from './skin-types-detail/skin-types-detail.component';
import { SkinTypesNewComponent } from './skin-types-new/skin-types-new.component';

const routes: Routes = [
  {path: '', component: SkinTypesHomeComponent},
  {path: 'new', component: SkinTypesNewComponent},
  {path: ':SKIN_ID', component: SkinTypesDetailComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkinTypesRoutingModule { }

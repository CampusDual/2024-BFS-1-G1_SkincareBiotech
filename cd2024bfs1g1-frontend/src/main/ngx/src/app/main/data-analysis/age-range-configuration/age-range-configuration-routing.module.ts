import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgeRangeHomeComponent } from './age-range-home/age-range-home.component';
import { AgeRangeNewComponent } from './age-range-new/age-range-new.component';

const routes: Routes = [
  { path: '', component: AgeRangeHomeComponent }, 
  { path: 'new', component: AgeRangeNewComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgeRangeConfigurationRoutingModule { }

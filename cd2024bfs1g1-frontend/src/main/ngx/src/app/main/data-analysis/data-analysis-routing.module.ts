import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataAnalysisHomeComponent } from './data-analysis-home/data-analysis-home.component';
import { BilledAgeComponent } from './billed-age/billed-age.component';

const routes: Routes = [
  {
    path: '',
    component: DataAnalysisHomeComponent
  },
  {
    path: 'billed-age',
    component: BilledAgeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataAnalysisRoutingModule { }
